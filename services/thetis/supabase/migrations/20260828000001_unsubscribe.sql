-- ============================================================================
-- UNSUBSCRIBE SUPPORT
-- ============================================================================
-- email_course_enabled remains the consent flag checked before triggering
-- Knock workflows. This migration adds what a recipient needs to turn it off
-- themselves from an email footer link:
--   * unsubscribed_at - audit trail of when consent was withdrawn
--   * RPCs the public `unsubscribe` edge function calls as the service role
--
-- Link tokens are HMACs of the user id derived by the edge functions from
-- UNSUBSCRIBE_SECRET, deliberately not stored here: public.users is readable
-- by the anon role, so a token column would be world-readable.
-- ============================================================================
ALTER TABLE public.users
    ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz;

-- ============================================================================
-- KEEP unsubscribed_at IN SYNC
-- ============================================================================
-- Consent is also toggled by signup forms (anon upserts) and by the Shopify
-- webhook, so the timestamp is maintained by a trigger rather than at each
-- call site.
CREATE OR REPLACE FUNCTION public.sync_unsubscribed_at()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SET search_path = public
    AS $$
BEGIN
    IF NEW.email_course_enabled IS DISTINCT FROM OLD.email_course_enabled THEN
        IF NEW.email_course_enabled THEN
            NEW.unsubscribed_at := NULL;
        ELSE
            NEW.unsubscribed_at := NOW();
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_user_consent_changed ON public.users;

CREATE TRIGGER on_user_consent_changed
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_unsubscribed_at();

-- Backfill users who were already opted out before this migration
UPDATE
    public.users
SET
    unsubscribed_at = COALESCE(updated_at, created_at, NOW())
WHERE
    email_course_enabled IS FALSE
    AND unsubscribed_at IS NULL;

-- ============================================================================
-- UNSUBSCRIBE / RESUBSCRIBE RPCS
-- ============================================================================
-- Resolves a user by id (one-click links, after the caller has verified the
-- HMAC) or by email (typed into the unsubscribe page) and withdraws consent.
-- Returns the affected row so the caller knows which Knock workflows to
-- cancel, and whether this was a repeat click on an old link.
CREATE OR REPLACE FUNCTION public.unsubscribe_user(p_user_id uuid DEFAULT NULL, p_email text DEFAULT NULL)
    RETURNS TABLE(
        user_id uuid,
        user_email text,
        already_unsubscribed boolean)
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
DECLARE
    v_id uuid;
    v_email text;
    v_enabled boolean;
BEGIN
    IF p_user_id IS NULL AND (p_email IS NULL OR TRIM(p_email) = '') THEN
        RAISE EXCEPTION 'Either a user id or an email is required';
    END IF;
    SELECT
        u.id,
        u.email,
        u.email_course_enabled INTO v_id,
        v_email,
        v_enabled
    FROM
        public.users u
    WHERE (p_user_id IS NOT NULL
        AND u.id = p_user_id)
        OR (p_user_id IS NULL
            AND u.email = LOWER(TRIM(p_email)))
    LIMIT 1;
    -- Unknown recipient: return no rows so the caller can stay vague about
    -- whether the address is on file
    IF v_id IS NULL THEN
        RETURN;
    END IF;
    IF v_enabled IS FALSE THEN
        RETURN QUERY
        SELECT
            v_id,
            v_email,
            TRUE;
        RETURN;
    END IF;
    UPDATE
        public.users
    SET
        email_course_enabled = FALSE,
        updated_at = NOW()
    WHERE
        id = v_id;
    RETURN QUERY
    SELECT
        v_id,
        v_email,
        FALSE;
END;
$$;

REVOKE ALL ON FUNCTION public.unsubscribe_user(uuid, text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.unsubscribe_user(uuid, text) TO service_role;

-- Undo path for the "unsubscribed by mistake" link on the confirmation page.
-- Id only: re-enabling by email alone would let anyone opt a stranger back in.
CREATE OR REPLACE FUNCTION public.resubscribe_user(p_user_id uuid)
    RETURNS TABLE(
        user_id uuid,
        user_email text)
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
BEGIN
    RETURN QUERY UPDATE
        public.users u
    SET
        email_course_enabled = TRUE,
        updated_at = NOW()
    WHERE
        u.id = p_user_id
    RETURNING
        u.id,
        u.email;
END;
$$;

REVOKE ALL ON FUNCTION public.resubscribe_user(uuid) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.resubscribe_user(uuid) TO service_role;

