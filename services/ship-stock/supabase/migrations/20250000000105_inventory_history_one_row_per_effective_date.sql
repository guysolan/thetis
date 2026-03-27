-- One history row per (order_id, effective_date) so inbound lines use the arrival date and
-- outbound lines use the dispatch date. Previously GROUP BY order_id + min(effective_date)
-- pinned whole orders (e.g. builds) to the earliest movement date.
CREATE OR REPLACE VIEW public.inventory_history_by_address AS
WITH item_changes_with_dates AS (
  SELECT
    ic.id AS item_change_id,
    ic.item_id,
    i.name AS item_name,
    i.type AS item_type,
    ic.address_id,
    ic.quantity_change,
    oic.order_id,
    o_1.order_type,
    COALESCE(
      CASE
        WHEN ic.quantity_change < 0::numeric AND o_1.delivery_dates IS NOT NULL THEN lower(o_1.delivery_dates)
        WHEN ic.quantity_change > 0::numeric AND o_1.delivery_dates IS NOT NULL THEN upper(o_1.delivery_dates)
        ELSE o_1.order_date
      END,
      o_1.order_date
    ) AS effective_date
  FROM item_changes ic
    JOIN order_item_changes oic ON ic.id = oic.item_change_id
    JOIN orders o_1 ON oic.order_id = o_1.id
    JOIN items i ON ic.item_id = i.id
  WHERE ic.quantity_change IS NOT NULL
),
order_item_aggregates AS (
  SELECT
    icd.order_id,
    icd.address_id,
    icd.item_id,
    icd.item_name,
    icd.item_type,
    icd.effective_date,
    icd.order_type,
    sum(icd.quantity_change) AS total_change
  FROM item_changes_with_dates icd
  GROUP BY
    icd.order_id,
    icd.address_id,
    icd.item_id,
    icd.item_name,
    icd.item_type,
    icd.effective_date,
    icd.order_type
),
ordered_changes AS (
  SELECT
    oia.order_id,
    oia.address_id,
    oia.item_id,
    oia.item_name,
    oia.item_type,
    oia.effective_date,
    oia.order_type,
    oia.total_change,
    row_number() OVER (
      PARTITION BY oia.address_id, oia.item_id
      ORDER BY oia.effective_date, oia.order_id
    ) AS change_seq
  FROM order_item_aggregates oia
),
item_balances AS (
  SELECT
    oc.order_id,
    oc.address_id,
    oc.item_id,
    oc.item_name,
    oc.item_type,
    oc.effective_date,
    oc.order_type,
    oc.total_change,
    oc.change_seq,
    sum(oc.total_change) OVER (
      PARTITION BY oc.address_id, oc.item_id
      ORDER BY oc.change_seq ROWS UNBOUNDED PRECEDING
    ) AS balance
  FROM ordered_changes oc
),
orders_with_items AS (
  SELECT
    ib.order_id,
    ib.effective_date,
    min(ib.order_type) AS order_type,
    min(ib.address_id) AS address_id,
    jsonb_agg(
      jsonb_build_object(
        'id', ib.item_id,
        'name', ib.item_name,
        'type', ib.item_type,
        'quantity', ib.balance,
        'change', ib.total_change,
        'address_id', ib.address_id,
        'effective_date', ib.effective_date
      )
      ORDER BY ib.address_id, ib.item_id
    ) AS items
  FROM item_balances ib
  GROUP BY ib.order_id, ib.effective_date
)
SELECT
  o.order_id,
  o.address_id,
  o.effective_date AS transaction_date,
  o.order_type,
  lower(ord.delivery_dates) AS delivery_start,
  upper(ord.delivery_dates) AS delivery_end,
  o.items
FROM orders_with_items o
  LEFT JOIN orders ord ON ord.id = o.order_id
ORDER BY
  o.address_id,
  o.effective_date;
