-- Drop enrollments table and its trigger (app and webhook now use purchases)
DROP TRIGGER IF EXISTS on_user_created_link_enrollments ON public.users;
DROP FUNCTION IF EXISTS public.link_enrollments_to_user();
DROP TABLE IF EXISTS public.enrollments;
