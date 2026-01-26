-- Add lot_number column to order_item_changes table
ALTER TABLE public.order_item_changes
  ADD COLUMN IF NOT EXISTS lot_number text NULL;

-- Create index for lot_number column
CREATE INDEX IF NOT EXISTS idx_order_item_changes_lot_number ON public.order_item_changes USING btree(lot_number) TABLESPACE pg_default;

CREATE VIEW public.inventory_history_by_address AS
with item_changes_with_dates AS (
  SELECT
    ic.id AS item_change_id,
    ic.item_id,
    i.name AS item_name,
    i.type AS item_type,
    ic.address_id,
    a.name AS address_name,
    ic.quantity_change,
    oic.order_id,
    o_1.order_type,
    o_1.order_date,
    COALESCE(
      CASE WHEN ic.quantity_change < 0::numeric
        AND o_1.delivery_dates IS NOT NULL THEN
        lower(o_1.delivery_dates)
      WHEN ic.quantity_change > 0::numeric
        AND o_1.delivery_dates IS NOT NULL THEN
        upper(o_1.delivery_dates)
      ELSE
        o_1.order_date
      END, o_1.order_date) AS effective_date,
(
      SELECT
        companies.name
      FROM
        companies
      WHERE
        companies.id = o_1.from_company_id) AS from_company_name,
(
        SELECT
          companies.name
        FROM
          companies
        WHERE
          companies.id = o_1.to_company_id) AS to_company_name
      FROM
        item_changes ic
        JOIN order_item_changes oic ON ic.id = oic.item_change_id
        JOIN orders o_1 ON oic.order_id = o_1.id
        JOIN items i ON ic.item_id = i.id
        JOIN addresses a ON ic.address_id = a.id
      WHERE
        ic.quantity_change IS NOT NULL
),
order_item_aggregates AS (
  SELECT
    icd.order_id,
    icd.address_id,
    icd.address_name,
    icd.item_id,
    icd.item_name,
    icd.item_type,
    icd.effective_date,
    icd.order_date,
    icd.order_type,
    icd.from_company_name,
    icd.to_company_name,
    sum(icd.quantity_change) AS total_change
  FROM
    item_changes_with_dates icd
  GROUP BY
    icd.order_id,
    icd.address_id,
    icd.address_name,
    icd.item_id,
    icd.item_name,
    icd.item_type,
    icd.effective_date,
    icd.order_date,
    icd.order_type,
    icd.from_company_name,
    icd.to_company_name
),
ordered_changes AS (
  SELECT
    oia.order_id,
    oia.address_id,
    oia.address_name,
    oia.item_id,
    oia.item_name,
    oia.item_type,
    oia.effective_date,
    oia.order_date,
    oia.order_type,
    oia.from_company_name,
    oia.to_company_name,
    oia.total_change,
    row_number() OVER (PARTITION BY oia.address_id,
      oia.item_id ORDER BY oia.effective_date,
      oia.order_id) AS change_seq
  FROM
    order_item_aggregates oia
),
item_balances AS (
  SELECT
    oc.order_id,
    oc.address_id,
    oc.address_name,
    oc.item_id,
    oc.item_name,
    oc.item_type,
    oc.effective_date,
    oc.order_date,
    oc.order_type,
    oc.from_company_name,
    oc.to_company_name,
    oc.total_change,
    oc.change_seq,
    sum(oc.total_change) OVER (PARTITION BY oc.address_id,
      oc.item_id ORDER BY oc.change_seq ROWS UNBOUNDED PRECEDING) AS balance
  FROM
    ordered_changes oc
),
orders_with_items AS (
  SELECT
    ib.order_id,
    min(ib.effective_date) AS effective_date,
    min(ib.order_date) AS order_date,
    min(ib.order_type) AS order_type,
    min(ib.address_id) AS address_id,
    min(ib.address_name) AS address_name,
    min(ib.from_company_name) AS from_company_name,
    min(ib.to_company_name) AS to_company_name,
    jsonb_agg(jsonb_build_object('id', ib.item_id, 'name', ib.item_name, 'type', ib.item_type, 'quantity', ib.balance, 'change', ib.total_change, 'address_id', ib.address_id)) AS items,
    jsonb_object_agg(ib.item_id::text, ib.balance) AS item_quantities,
    count(DISTINCT ib.item_id) FILTER (WHERE ib.total_change <> 0::numeric) AS items_changed,
    sum(ib.total_change) AS net_change
  FROM
    item_balances ib
  GROUP BY
    ib.order_id
)
SELECT
  o.order_id,
  o.address_id,
  o.address_name,
  o.effective_date AS transaction_date,
  o.order_date,
  o.order_type,
  o.from_company_name AS from_company,
  o.to_company_name AS to_company,
  o.items,
  o.item_quantities,
  o.items_changed,
  o.net_change
FROM
  orders_with_items o
ORDER BY
  o.address_name,
  o.effective_date;

