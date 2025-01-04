-- Create the reports storage bucket
INSERT INTO storage.buckets(id, name)
    VALUES ('amazon-reports', 'amazon-reports')
ON CONFLICT
    DO NOTHING;

-- Remove existing policies if they exist
DROP POLICY IF EXISTS "reports-access" ON "storage"."objects";

DROP POLICY IF EXISTS "reports-insert" ON "storage"."objects";

DROP POLICY IF EXISTS "reports-update" ON "storage"."objects";

DROP POLICY IF EXISTS "reports-delete" ON "storage"."objects";

-- Create new policies for the reports bucket
CREATE POLICY "reports-access" ON "storage"."objects" AS permissive
    FOR SELECT TO anon
        USING ((bucket_id = 'amazon-reports'::text));

CREATE POLICY "reports-insert" ON "storage"."objects" AS permissive
    FOR INSERT TO anon
        WITH CHECK ((bucket_id = 'amazon-reports'::text));

CREATE POLICY "reports-update" ON "storage"."objects" AS permissive
    FOR UPDATE TO anon
        USING ((bucket_id = 'amazon-reports'::text));

CREATE POLICY "reports-delete" ON "storage"."objects" AS permissive
    FOR DELETE TO anon
        USING ((bucket_id = 'amazon-reports'::text));

