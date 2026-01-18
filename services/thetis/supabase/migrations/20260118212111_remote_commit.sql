drop extension if exists "pg_net";

drop policy "Anon can view emails by email" on "public"."email_queue";

drop policy "Anon can view enrollments by email" on "public"."enrollments";

drop policy "Anon can insert progress by email" on "public"."user_progress";

drop policy "Anon can update progress by email" on "public"."user_progress";

drop policy "Anon can view progress by email" on "public"."user_progress";

drop policy "Anon can insert users" on "public"."users";

drop policy "Anon can update users by email" on "public"."users";

drop policy "Anon can view users by email" on "public"."users";

alter table "public"."user_progress" drop constraint "user_progress_user_email_section_slug_key";

alter table "public"."users" drop constraint "users_email_key";

drop index if exists "public"."idx_email_queue_user_email";

drop index if exists "public"."idx_enrollments_user_email";

drop index if exists "public"."idx_user_progress_email";

drop index if exists "public"."user_progress_user_email_section_slug_key";

drop index if exists "public"."users_email_key";

drop index if exists "public"."idx_user_progress_section";

alter table "public"."email_queue" drop column "user_email";

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'email_queue' AND column_name = 'user_id') THEN
        alter table "public"."email_queue" add column "user_id" uuid not null;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'user_email') THEN
        alter table "public"."enrollments" drop column "user_email";
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'user_id') THEN
        alter table "public"."enrollments" add column "user_id" uuid;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_progress' AND column_name = 'user_email') THEN
        alter table "public"."user_progress" drop column "user_email";
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_progress' AND column_name = 'user_id') THEN
        alter table "public"."user_progress" add column "user_id" uuid not null;
    END IF;
END $$;

alter table "public"."users" alter column "email" drop not null;

alter table "public"."users" alter column "id" drop default;

CREATE INDEX idx_email_queue_user ON public.email_queue USING btree (user_id, status);

CREATE INDEX idx_enrollments_user_id ON public.enrollments USING btree (user_id);

CREATE INDEX idx_user_progress_user_id ON public.user_progress USING btree (user_id);

CREATE UNIQUE INDEX user_progress_user_id_section_slug_key ON public.user_progress USING btree (user_id, section_slug);

CREATE INDEX idx_user_progress_section ON public.user_progress USING btree (user_id, section_slug);

alter table "public"."email_queue" add constraint "email_queue_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."email_queue" validate constraint "email_queue_user_id_fkey";

alter table "public"."enrollments" add constraint "enrollments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."enrollments" validate constraint "enrollments_user_id_fkey";

alter table "public"."user_progress" add constraint "user_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_progress" validate constraint "user_progress_user_id_fkey";

alter table "public"."user_progress" add constraint "user_progress_user_id_section_slug_key" UNIQUE using index "user_progress_user_id_section_slug_key";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_email(p_user_id uuid)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
    SELECT
        email
    FROM
        auth.users
    WHERE
        id = p_user_id;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.users(id, email)
        VALUES(NEW.id, NEW.email);
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.link_enrollments_to_user()
 RETURNS trigger
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
$function$
;


  create policy "Users can view own emails"
  on "public"."email_queue"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can link own enrollments"
  on "public"."enrollments"
  as permissive
  for update
  to public
using ((lower(public.get_user_email(auth.uid())) = lower(shopify_customer_email)))
with check (((auth.uid() = user_id) AND (lower(public.get_user_email(auth.uid())) = lower(shopify_customer_email))));



  create policy "Users can view own enrollments"
  on "public"."enrollments"
  as permissive
  for select
  to public
using (((auth.uid() = user_id) OR (lower(public.get_user_email(auth.uid())) = lower(shopify_customer_email))));



  create policy "Users can insert own progress"
  on "public"."user_progress"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own progress"
  on "public"."user_progress"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own progress"
  on "public"."user_progress"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can update own data"
  on "public"."users"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view own data"
  on "public"."users"
  as permissive
  for select
  to public
using ((auth.uid() = id));


CREATE TRIGGER on_user_created_link_enrollments AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.link_enrollments_to_user();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


