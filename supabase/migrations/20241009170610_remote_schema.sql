SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = ON;

SELECT
    pg_catalog.set_config('search_path', '', FALSE);

SET check_function_bodies = FALSE;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = OFF;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."parts"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "quantity" integer NOT NULL,
    "price" numeric(10, 2) NOT NULL
);

ALTER TABLE "public"."parts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."product_parts"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "product_id" bigint NOT NULL,
    "part_id" bigint NOT NULL,
    "quantity" numeric(10, 4) NOT NULL
);

ALTER TABLE "public"."product_parts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "quantity" integer NOT NULL,
    "price" numeric(10, 2) NOT NULL
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."purchases"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "total_cost" numeric(10, 2) NOT NULL,
    "quantity" integer NOT NULL,
    "purchase_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."purchases" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."purchase_products"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "purchase_id" bigint,
    "product_id" bigint,
    "quantity" numeric(10, 4) NOT NULL
);

ALTER TABLE "public"."purchase_products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."purchase_parts"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "purchase_id" bigint,
    "part_id" bigint,
    "quantity" numeric(10, 4) NOT NULL
);

ALTER TABLE "public"."purchase_parts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."sales"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "total_cost" numeric(10, 2) NOT NULL,
    "sale_date" timestamp with time zone DEFAULT now()
);

ALTER TABLE "public"."sales" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."sale_products"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "sale_id" bigint,
    "product_id" bigint,
    "quantity" integer NOT NULL,
    "price" numeric(10, 2) NOT NULL
);

ALTER TABLE "public"."sale_products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."stock"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "product_id" bigint NOT NULL,
    "location_id" bigint NOT NULL,
    "quantity" integer NOT NULL
);

ALTER TABLE "public"."stock" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."stock_locations"(
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
    "country" text NOT NULL
);

ALTER TABLE "public"."stock_locations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."parts"
    ADD CONSTRAINT "parts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_parts"
    ADD CONSTRAINT "product_parts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."purchase_products"
    ADD CONSTRAINT "purchase_products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."purchase_parts"
    ADD CONSTRAINT "purchase_parts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sale_products"
    ADD CONSTRAINT "sale_products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."stock_locations"
    ADD CONSTRAINT "stock_locations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."stock"
    ADD CONSTRAINT "stock_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_parts"
    ADD CONSTRAINT "product_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "public"."parts"("id");

ALTER TABLE ONLY "public"."product_parts"
    ADD CONSTRAINT "product_parts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."purchase_products"
    ADD CONSTRAINT "purchase_products_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id");

ALTER TABLE ONLY "public"."purchase_products"
    ADD CONSTRAINT "purchase_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."purchase_parts"
    ADD CONSTRAINT "purchase_parts_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id");

ALTER TABLE ONLY "public"."purchase_parts"
    ADD CONSTRAINT "purchase_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "public"."parts"("id");

ALTER TABLE ONLY "public"."sale_products"
    ADD CONSTRAINT "sale_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."sale_products"
    ADD CONSTRAINT "sale_products_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "public"."sales"("id");

ALTER TABLE ONLY "public"."stock"
    ADD CONSTRAINT "stock_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."stock_locations"("id");

ALTER TABLE ONLY "public"."stock"
    ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "anon";

GRANT USAGE ON SCHEMA "public" TO "authenticated";

GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."parts" TO "anon";

GRANT ALL ON TABLE "public"."parts" TO "authenticated";

GRANT ALL ON TABLE "public"."parts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."parts_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."parts_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."parts_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."product_parts" TO "anon";

GRANT ALL ON TABLE "public"."product_parts" TO "authenticated";

GRANT ALL ON TABLE "public"."product_parts" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";

GRANT ALL ON TABLE "public"."products" TO "authenticated";

GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON SEQUENCE "public"."products_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."products_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."products_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."purchases" TO "anon";

GRANT ALL ON TABLE "public"."purchases" TO "authenticated";

GRANT ALL ON TABLE "public"."purchases" TO "service_role";

GRANT ALL ON SEQUENCE "public"."purchases_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."purchases_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."purchases_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."purchase_products" TO "anon";

GRANT ALL ON TABLE "public"."purchase_products" TO "authenticated";

GRANT ALL ON TABLE "public"."purchase_products" TO "service_role";

GRANT ALL ON SEQUENCE "public"."purchase_products_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."purchase_products_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."purchase_products_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."purchase_parts" TO "anon";

GRANT ALL ON TABLE "public"."purchase_parts" TO "authenticated";

GRANT ALL ON TABLE "public"."purchase_parts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."purchase_parts_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."purchase_parts_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."purchase_parts_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."sales" TO "anon";

GRANT ALL ON TABLE "public"."sales" TO "authenticated";

GRANT ALL ON TABLE "public"."sales" TO "service_role";

GRANT ALL ON SEQUENCE "public"."sales_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."sales_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."sales_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."sale_products" TO "anon";

GRANT ALL ON TABLE "public"."sale_products" TO "authenticated";

GRANT ALL ON TABLE "public"."sale_products" TO "service_role";

GRANT ALL ON SEQUENCE "public"."sale_products_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."sale_products_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."sale_products_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."stock" TO "anon";

GRANT ALL ON TABLE "public"."stock" TO "authenticated";

GRANT ALL ON TABLE "public"."stock" TO "service_role";

GRANT ALL ON SEQUENCE "public"."stock_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."stock_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."stock_id_seq"
    TO "service_role";

GRANT ALL ON TABLE "public"."stock_locations" TO "anon";

GRANT ALL ON TABLE "public"."stock_locations" TO "authenticated";

GRANT ALL ON TABLE "public"."stock_locations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."stock_locations_id_seq"
    TO "anon";

GRANT ALL ON SEQUENCE "public"."stock_locations_id_seq"
    TO "authenticated";

GRANT ALL ON SEQUENCE "public"."stock_locations_id_seq"
    TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";

RESET ALL;

-- Add unique constraints for uuid columns
ALTER TABLE ONLY "public"."parts"
    ADD CONSTRAINT "parts_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."product_parts"
    ADD CONSTRAINT "product_parts_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."purchase_products"
    ADD CONSTRAINT "purchase_products_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."purchase_parts"
    ADD CONSTRAINT "purchase_parts_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."sale_products"
    ADD CONSTRAINT "sale_products_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."stock"
    ADD CONSTRAINT "stock_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."stock_locations"
    ADD CONSTRAINT "stock_locations_uuid_key" UNIQUE ("uuid");

