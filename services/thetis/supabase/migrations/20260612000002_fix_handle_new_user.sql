-- handle_new_user runs after INSERT on auth.users and syncs to public.users.
-- Previously it blind-inserted, which failed when the email already existed in
-- public.users (e.g. newsletter/course subscribers created via ensure_user).
-- Chat app auth only needs auth.users; public.users sync must not block signup.

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
BEGIN
    INSERT INTO public.users(id, email)
        VALUES (NEW.id, LOWER(TRIM(NEW.email)))
    ON CONFLICT (email) DO UPDATE
        SET updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
