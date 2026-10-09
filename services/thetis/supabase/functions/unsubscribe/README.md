# unsubscribe

Public endpoint behind the website's `/unsubscribe` page. Called with `verify_jwt = false`, because
recipients clicking a link in an email have no Supabase session — the link's HMAC is the auth.

## What one call does

Stopping future sends is not enough on its own: a subscriber half way through the 70-day sequence
already has queued Knock runs. So each unsubscribe does three things:

1. `users.email_course_enabled = false` (blocks future triggers; `unsubscribed_at` is stamped by the
   `on_user_consent_changed` trigger)
2. Cancels queued Knock workflow runs — `subscribe` keyed on the user id, and
   `post-purchase-course` / `post-purchase-splint` keyed on `order-<shopify_order_id>-<product_slug>`,
   rebuilt from the user's `purchases` rows. Cancelling a run stops its SMS steps too.
3. Sets `commercial_subscribed: false` on the recipient's `default` Knock preference set, so a
   workflow marked Commercial stays suppressed even if triggered again from elsewhere.

## Request

```jsonc
// One-click link from an email footer
{ "user_id": "<uuid>", "token": "<hmac>" }

// Email typed into the unsubscribe page
{ "email": "someone@example.com" }

// Undo, from the confirmation page. Signed links only: re-enabling by email
// alone would let anyone opt a stranger back in.
{ "user_id": "<uuid>", "token": "<hmac>", "action": "resubscribe" }
```

An unknown email returns `success: true` with no changes, so the page cannot be used to probe which
addresses are on file.

## Link tokens

`<website>/unsubscribe?u=<user_id>&t=<token>`, where the token is an HMAC-SHA256 of the user id keyed
by `UNSUBSCRIBE_SECRET` (see `_shared/unsubscribe-token.ts`). Nothing is persisted: `public.users` is
readable by the `anon` role, so a token column would let anyone mint a link for any address.

Rotating the secret invalidates links in emails already sent, so treat it as long-lived. Recipients
holding a dead link still get the email-entry form on the page.

## Environment

| Variable                    | Used by                                | Purpose                                        |
| --------------------------- | -------------------------------------- | ---------------------------------------------- |
| `UNSUBSCRIBE_SECRET`        | this function + the two trigger functions | HMAC key for link tokens. Any long random string. |
| `WEBSITE_URL`               | the two trigger functions              | Base for generated links. Defaults to `https://thetismedical.com`. |
| `KNOCK_API_KEY`             | this function                           | Cancelling runs and writing preferences. Without it, consent is still recorded and in-flight runs are left alone. |
| `SUPABASE_SERVICE_ROLE_KEY` | this function                           | Injected by the platform.                      |

```bash
supabase secrets set UNSUBSCRIBE_SECRET="$(openssl rand -base64 32)"

# --no-verify-jwt matches the config.toml entry; recipients have no Supabase session
supabase functions deploy unsubscribe --no-verify-jwt

# Redeploy the trigger functions so their emails carry the signed link
supabase functions deploy trigger-knock-subscribe --no-verify-jwt
supabase functions deploy shopify-order-webhook --no-verify-jwt
```

## Knock dashboard steps (not expressible in the CLI schema)

The layout already renders an unsubscribe link, preferring Knock's own URL when present. To get
RFC 8058 `List-Unsubscribe` headers on the drip emails as well, toggle **Commercial** on each
workflow: open the workflow, click *Manage workflow*, toggle Commercial, save, then commit. Do this
for `subscribe`, and for the post-purchase workflows if their review/affiliate asks count as
marketing in your reading.

## Testing

```bash
# Signed link (mint a token the same way the trigger functions do)
curl -X POST "$SUPABASE_URL/functions/v1/unsubscribe" \
  -H 'Content-Type: application/json' \
  -d '{"user_id":"<uuid>","token":"<hmac>"}'

# Typed email
curl -X POST "$SUPABASE_URL/functions/v1/unsubscribe" \
  -H 'Content-Type: application/json' \
  -d '{"email":"someone@example.com"}'
```
