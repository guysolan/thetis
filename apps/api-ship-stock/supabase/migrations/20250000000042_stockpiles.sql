DROP VIEW IF EXISTS stockpiles;

-- Create a view for addresses with their items
CREATE OR REPLACE VIEW stockpiles AS
SELECT
    a.id AS stockpile_id,
    a.name AS stockpile_name,
    a.created_at AS stockpile_created_at,
    -- Concatenate address fields
    CONCAT_WS(', ', NULLIF(a.line_1, ''), NULLIF(a.line_2, ''), NULLIF(a.city, ''), NULLIF(a.region, ''), NULLIF(a.code, ''), NULLIF(a.country, '')) AS stockpile_address,
    c.name AS company_name,
    COALESCE(jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_price', i.price, 'item_type', i.type, 'item_quantity', ic.quantity_change, 'item_value', ic.quantity_change * i.price)) FILTER (WHERE i.id IS NOT NULL
            AND ic.quantity_change != 0
            AND i.type NOT IN ('package', 'service')), '[]'::jsonb) AS items
FROM
    addresses a
    LEFT JOIN companies c ON a.company_id = c.id
    LEFT JOIN (
        SELECT
            address_id,
            item_id,
            SUM(quantity_change) AS quantity_change
        FROM
            item_changes
        GROUP BY
            address_id,
            item_id) ic ON a.id = ic.address_id
    LEFT JOIN items i ON ic.item_id = i.id
WHERE
    a.holds_stock = TRUE
GROUP BY
    a.id,
    a.name,
    a.created_at,
    a.line_1,
    a.line_2,
    a.city,
    a.region,
    a.code,
    a.country,
    c.name;

