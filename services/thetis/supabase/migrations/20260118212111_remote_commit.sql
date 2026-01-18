DROP EXTENSION IF EXISTS "pg_net";

DROP POLICY "Anon can view emails by email" ON "public"."email_queue";

DROP POLICY "Anon can view enrollments by email" ON "public"."enrollments";

DROP POLICY "Anon can insert progress by email" ON "public"."user_progress";

DROP POLICY "Anon can update progress by email" ON "public"."user_progress";

DROP POLICY "Anon can view progress by email" ON "public"."user_progress";

DROP POLICY "Anon can insert users" ON "public"."users";

DROP POLICY "Anon can update users by email" ON "public"."users";

DROP POLICY "Anon can view users by email" ON "public"."users";

ALTER TABLE "public"."user_progress"
  DROP CONSTRAINT "user_progress_user_email_section_slug_key";

ALTER TABLE "public"."users"
  DROP CONSTRAINT "users_email_key";

DROP INDEX IF EXISTS "public"."idx_email_queue_user_email";

DROP INDEX IF EXISTS "public"."idx_enrollments_user_email";

DROP INDEX IF EXISTS "public"."idx_user_progress_email";

DROP INDEX IF EXISTS "public"."user_progress_user_email_section_slug_key";

DROP INDEX IF EXISTS "public"."users_email_key";

DROP INDEX IF EXISTS "public"."idx_user_progress_section";

ALTER TABLE "public"."email_queue"
  DROP COLUMN "user_email";

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      information_schema.columns
    WHERE
      table_name = 'email_queue'
      AND column_name = 'user_id') THEN
  ALTER TABLE "public"."email_queue"
    ADD COLUMN "user_id" uuid NOT NULL;
END IF;
END
$$;

DO $$
BEGIN
  IF EXISTS(
    SELECT
      1
    FROM
      information_schema.columns
    WHERE
      table_name = 'enrollments'
      AND column_name = 'user_email') THEN
  ALTER TABLE "public"."enrollments"
    DROP COLUMN "user_email";
END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      information_schema.columns
    WHERE
      table_name = 'enrollments'
      AND column_name = 'user_id') THEN
  ALTER TABLE "public"."enrollments"
    ADD COLUMN "user_id" uuid;
END IF;
END
$$;

DO $$
BEGIN
  IF EXISTS(
    SELECT
      1
    FROM
      information_schema.columns
    WHERE
      table_name = 'user_progress'
      AND column_name = 'user_email') THEN
  ALTER TABLE "public"."user_progress"
    DROP COLUMN "user_email";
END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      information_schema.columns
    WHERE
      table_name = 'user_progress'
      AND column_name = 'user_id') THEN
  ALTER TABLE "public"."user_progress"
    ADD COLUMN "user_id" uuid NOT NULL;
END IF;
END
$$;

ALTER TABLE "public"."users"
  ALTER COLUMN "email" DROP NOT NULL;

ALTER TABLE "public"."users"
  ALTER COLUMN "id" DROP DEFAULT;

CREATE INDEX idx_email_queue_user ON public.email_queue USING btree(user_id, status);

CREATE INDEX idx_enrollments_user_id ON public.enrollments USING btree(user_id);

CREATE INDEX idx_user_progress_user_id ON public.user_progress USING btree(user_id);

CREATE UNIQUE INDEX user_progress_user_id_section_slug_key ON public.user_progress USING btree(user_id, section_slug);

CREATE INDEX idx_user_progress_section ON public.user_progress USING btree(user_id, section_slug);

ALTER TABLE "public"."email_queue"
  ADD CONSTRAINT "email_queue_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."email_queue" validate CONSTRAINT "email_queue_user_id_fkey";

ALTER TABLE "public"."enrollments"
  ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."enrollments" validate CONSTRAINT "enrollments_user_id_fkey";

ALTER TABLE "public"."user_progress"
  ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."user_progress" validate CONSTRAINT "user_progress_user_id_fkey";

ALTER TABLE "public"."user_progress"
  ADD CONSTRAINT "user_progress_user_id_section_slug_key" UNIQUE USING INDEX "user_progress_user_id_section_slug_key";

ALTER TABLE "public"."users"
  ADD CONSTRAINT "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."users" validate CONSTRAINT "users_id_fkey";

SET check_function_bodies = OFF;

CREATE OR REPLACE FUNCTION public.get_user_email(p_user_id uuid)
  RETURNS text
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  AS $function$
  SELECT
    email
  FROM
    auth.users
  WHERE
    id = p_user_id;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
BEGIN
  INSERT INTO public.users(id, email)
    VALUES(NEW.id, NEW.email);
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.link_enrollments_to_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
BEGIN
  -- Update any enrollments with matching email to link to this user
  UPDATE
    public.enrollments
  SET
    user_id = NEW.id,
    updated_at = NOW()
  WHERE
    shopify_customer_email = LOWER(NEW.email)
    AND user_id IS NULL;
  RETURN NEW;
END;
$function$;

CREATE POLICY "Users can view own emails" ON "public"."email_queue" AS permissive
  FOR SELECT TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can link own enrollments" ON "public"."enrollments" AS permissive
  FOR UPDATE TO public
    USING ((lower(public.get_user_email(auth.uid())) = lower(shopify_customer_email)))
    WITH CHECK (((auth.uid() = user_id) AND (lower(public.get_user_email(auth.uid())) = lower(shopify_customer_email))));

CREATE POLICY "Users can view own enrollments" ON "public"."enrollments" AS permissive
  FOR SELECT TO public
    USING (((auth.uid() = user_id) OR (lower(public.get_user_email(auth.uid())) = lower(shopify_customer_email))));

CREATE POLICY "Users can insert own progress" ON "public"."user_progress" AS permissive
  FOR INSERT TO public
    WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update own progress" ON "public"."user_progress" AS permissive
  FOR UPDATE TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can view own progress" ON "public"."user_progress" AS permissive
  FOR SELECT TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can update own data" ON "public"."users" AS permissive
  FOR UPDATE TO public
    USING ((auth.uid() = id));

CREATE POLICY "Users can view own data" ON "public"."users" AS permissive
  FOR SELECT TO public
    USING ((auth.uid() = id));

CREATE TRIGGER on_user_created_link_enrollments
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.link_enrollments_to_user();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

