ALTER TABLE "public"."item_components"
  DROP CONSTRAINT "item_components_component_item_id_fkey";

ALTER TABLE "public"."item_components"
  DROP CONSTRAINT "item_components_parent_item_id_fkey";

DROP VIEW IF EXISTS "public"."items_view";

ALTER TABLE "public"."item_components"
  DROP CONSTRAINT "item_components_pkey";

DROP INDEX IF EXISTS "public"."item_components_pkey";

ALTER TABLE "public"."item_components"
  DROP COLUMN "component_item_id";

ALTER TABLE "public"."item_components"
  DROP COLUMN "parent_item_id";

ALTER TABLE "public"."item_components"
  DROP COLUMN "quantity";

ALTER TABLE "public"."item_components"
  ADD COLUMN "component_id" bigint NOT NULL;

ALTER TABLE "public"."item_components"
  ADD COLUMN "component_quantity" numeric(10, 4) NOT NULL;

ALTER TABLE "public"."item_components"
  ADD COLUMN "item_id" bigint NOT NULL;

CREATE UNIQUE INDEX item_components_pkey ON public.item_components USING btree(item_id, component_id);

ALTER TABLE "public"."item_components"
  ADD CONSTRAINT "item_components_pkey" PRIMARY KEY USING INDEX "item_components_pkey";

ALTER TABLE "public"."item_components"
  ADD CONSTRAINT "item_components_component_id_fkey" FOREIGN KEY (component_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."item_components" validate CONSTRAINT "item_components_component_id_fkey";

ALTER TABLE "public"."item_components"
  ADD CONSTRAINT "item_components_item_id_fkey" FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."item_components" validate CONSTRAINT "item_components_item_id_fkey";

CREATE OR REPLACE VIEW "public"."items_view" AS
SELECT
  i.id AS item_id,
  i.name AS item_name,
  i.price AS item_price,
  i.type AS item_type,
  COALESCE(jsonb_agg(jsonb_build_object('component_id', ic.component_id, 'component_name', ci.name, 'component_type', ci.type, 'component_quantity', ic.component_quantity, 'component_price', ci.price)) FILTER (WHERE (ic.component_id IS NOT NULL)), '[]'::jsonb) AS components
FROM ((items i
  LEFT JOIN item_components ic ON (i.id = ic.item_id))
  LEFT JOIN items ci ON (ic.component_id = ci.id))
GROUP BY
  i.id,
  i.name,
  i.price,
  i.type;

