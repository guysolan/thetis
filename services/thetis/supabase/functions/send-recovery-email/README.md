# Send Recovery Tips Email

This Supabase Edge Function sends a generic recovery tips email to subscribers or purchasers. The email provides valuable information about Achilles rupture recovery while promoting the night splint and course products.

## Features

- Sends recovery tips and product recommendations
- Promotes the Achilles rupture night splint
- Promotes the recovery course
- Works for both subscribers (from `users` table) and purchasers (from `enrollments` table)
- Supports sending to a single email or all subscribers/purchasers
- Includes unsubscribe functionality

## Usage

### Send to a Single Email

```bash
curl -X POST https://your-project.supabase.co/functions/v1/send-recovery-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "recipientName": "John"
  }'
```

### Send to All Subscribers and Purchasers

```bash
curl -X POST https://your-project.supabase.co/functions/v1/send-recovery-email \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sendToAll": true,
    "limit": 100
  }'
```

## Request Body

- `email` (string, optional): Email address to send to (required if `sendToAll` is false)
- `recipientName` (string, optional): Name to use in greeting (defaults to "there")
- `sendToAll` (boolean, optional): If true, sends to all subscribers and purchasers
- `limit` (number, optional): Maximum number of recipients when `sendToAll` is true (default: 100)

## Environment Variables

Required environment variables:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for database access
- `RESEND_API_KEY`: Resend API key for sending emails
- `RESEND_EMAIL_DOMAIN`: Email domain configured in Resend (defaults to "thetismedical.com")

## Email Template

The email template is located at `packages/email/emails/recovery-tips.tsx`. To update the template:

1. Edit `packages/email/emails/recovery-tips.tsx`
2. Run `bun packages/email/emails/recovery-tips/build-template.ts` to regenerate the template
3. The generated template will be written to `email-template.ts` in this directory

## Email Content

The email includes:

- Essential recovery tips (night protection, elevation, following surgeon's protocol, etc.)
- Best products for Achilles rupture recovery
- Promotion of the Thetis Night Splint
- Promotion of the Achilles Recovery Course
- Unsubscribe link

The email naturally promotes both products without checking if the recipient has already purchased them, keeping the logic simple.
