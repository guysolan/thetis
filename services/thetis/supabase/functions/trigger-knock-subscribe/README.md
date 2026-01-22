# Trigger Knock Subscribe Workflow

This edge function triggers the Knock "subscribe" email workflow when a new user is created.

## How It Works

1. A new user is inserted into the `public.users` table
2. The database trigger `trigger_knock_subscribe_on_user_insert` fires
3. The trigger calls this edge function via `pg_net.http_post`
4. This function triggers the Knock workflow with the user as a recipient
5. Knock sends the email sequence (11 emails over 70 days)

## Environment Variables

Required in Supabase Dashboard → Project Settings → Edge Functions:

- `KNOCK_API_KEY` - Your Knock API key (from Knock dashboard → Developers → API Keys)

## Deployment

```bash
# Deploy the edge function
supabase functions deploy trigger-knock-subscribe --project-ref kdgnytysuzxhnmpfvdfr

# Set the secret
supabase secrets set KNOCK_API_KEY=your_knock_api_key --project-ref kdgnytysuzxhnmpfvdfr
```

## Database Setup

The migration `20260123000004_knock_subscribe_trigger.sql` creates:

1. Enables `pg_net` extension
2. Creates `trigger_knock_subscribe()` function
3. Creates trigger on `users` table

**Important:** You may need to set database config for the trigger to work:

```sql
-- Run in SQL Editor to set the Supabase URL for the trigger
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://kdgnytysuzxhnmpfvdfr.supabase.co';
ALTER DATABASE postgres SET app.settings.service_role_key = 'your_service_role_key';
```

Or configure via `config.toml` for local development.

## Testing

```bash
# Test the edge function directly
curl -X POST \
  'https://kdgnytysuzxhnmpfvdfr.supabase.co/functions/v1/trigger-knock-subscribe' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "INSERT",
    "table": "users",
    "schema": "public",
    "record": {
      "id": "test-uuid-123",
      "email": "test@example.com",
      "email_course_enabled": true
    }
  }'
```

## Cancellation

To cancel a user's email sequence (e.g., if they unsubscribe):

```bash
curl -X DELETE \
  'https://api.knock.app/v1/workflows/subscribe/cancel' \
  -H 'Authorization: Bearer YOUR_KNOCK_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "cancellation_key": "user-uuid-here"
  }'
```

## Knock Workflow

The workflow is defined in `services/knock/workflows/subscribe/workflow.json` and sends 11 emails over 70 days covering:

- Day 0: Welcome
- Day 1: Protect the tendon
- Day 3: Specialist questions
- Day 5: Essential items
- Day 7: Treatment options
- Day 9: Boot basics
- Day 10: Week 1 routine
- Day 21: Mobility tips
- Day 35: Physio prep
- Day 49: Boot removal prep
- Day 70: Week 10 check-in
