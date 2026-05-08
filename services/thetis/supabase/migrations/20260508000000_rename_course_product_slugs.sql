-- Rename course product_slug values for clearer condition-based naming.
UPDATE
    public.purchases
SET
    product_slug = 'achilles_rupture_course'
WHERE
    product_slug = 'standard_course';

UPDATE
    public.purchases
SET
    product_slug = 'achilles_rupture_professionals_course'
WHERE
    product_slug = 'premium_course';

