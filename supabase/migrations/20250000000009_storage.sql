DROP POLICY IF EXISTS "open-access avjr3q_0" ON "storage"."objects";

CREATE POLICY "open-access avjr3q_0" ON "storage"."objects" AS permissive
    FOR SELECT TO anon
        USING ((bucket_id = 'amazon-reports'::text));

DROP POLICY IF EXISTS "open-access avjr3q_1" ON "storage"."objects";

CREATE POLICY "open-access avjr3q_1" ON "storage"."objects" AS permissive
    FOR INSERT TO anon
        WITH CHECK ((bucket_id = 'amazon-reports'::text));

DROP POLICY IF EXISTS "open-access avjr3q_2" ON "storage"."objects";

CREATE POLICY "open-access avjr3q_2" ON "storage"."objects" AS permissive
    FOR UPDATE TO anon
        USING ((bucket_id = 'amazon-reports'::text));

DROP POLICY IF EXISTS "open-access avjr3q_3" ON "storage"."objects";

CREATE POLICY "open-access avjr3q_3" ON "storage"."objects" AS permissive
    FOR DELETE TO anon
        USING ((bucket_id = 'amazon-reports'::text));

