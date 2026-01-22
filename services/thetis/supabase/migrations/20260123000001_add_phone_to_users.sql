-- Add phone column to users table
ALTER TABLE public.users
    ADD COLUMN IF NOT EXISTS phone text;

-- Add index for phone lookups (optional, if needed)
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone)
WHERE
    phone IS NOT NULL;

