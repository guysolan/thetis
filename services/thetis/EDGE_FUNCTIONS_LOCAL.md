# Local Edge Functions Setup

## Environment Variables

Create a `.env.local` file in `services/thetis/supabase/`:

```bash
# Supabase connection (local)
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz

# Shopify webhook secret
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_here

# Course URL (for email links)
COURSE_URL=http://localhost:2222

# Resend API key (optional - for sending emails locally)
# RESEND_API_KEY=your_resend_key_here
```

## Running Functions Locally

### Option 1: Using supabase functions serve (with env file)

```bash
cd services/thetis
supabase functions serve shopify-order-webhook --env-file supabase/.env.local
```

### Option 2: Using supabase secrets (for local)

```bash
cd services/thetis
supabase secrets set SHOPIFY_WEBHOOK_SECRET=your_secret --env-file supabase/.env.local
```

**Note:** Local Edge Functions don't automatically pick up secrets set via `supabase secrets set`. You need to either:
- Use `--env-file` flag when serving functions
- Or set environment variables in your shell before running

## Testing

Once the function is running locally, test it:

```bash
cd services/thetis/supabase/functions/shopify-order-webhook
./test-webhook.sh local 123456789 test@example.com "" "your_webhook_secret"
```

## Production

For production, set secrets via Supabase Dashboard or CLI:

```bash
supabase secrets set SHOPIFY_WEBHOOK_SECRET=your_secret
supabase secrets set RESEND_API_KEY=your_key
supabase secrets set COURSE_URL=https://course.thetismedical.com
```
