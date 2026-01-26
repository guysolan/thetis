---
name: Create Knock phone number finder and SMS disabler script
overview: Create a Deno script that uses the Knock API to find all users with phone numbers matching +447561788783, 447561788783, or 07561788783, then lists them and disables SMS notifications for those users.
todos: []
---

# Create Knock phone number finder and SMS disabler script

## Overview

Update `scripts/stop-sms-to-me/main.ts` to create a Deno script that:

1. Lists all users from Knock API
2. Filters users by phone numbers matching: `+447561788783`, `447561788783`, or `07561788783`
3. Displays the matching users
4. Disables SMS notifications for those users

## Implementation Details

### Script Structure

- Use Deno with environment variable loading via `https://deno.land/x/dotenv@v3.2.2/load.ts`
- Import Knock SDK from `npm:@knocklabs/node` (add to `deno.json` imports if needed)
- Follow patterns from `scripts/remove-example-resend-contacts/index.ts` for API pagination
- Follow patterns from `services/knock/scripts/delete-all-users.ts` for user listing

### Key Functions

1. **Phone Number Normalization**

- Normalize phone numbers to compare against all three formats
- Handle: `+447561788783`, `447561788783`, `07561788783`
- Extract the core number `447561788783` for comparison

2. **List All Knock Users**

- Use `knock.users.list()` with pagination (page_size: 50)
- Iterate through all pages using `after` cursor
- Collect users with their `phone_number` property

3. **Filter Matching Users**

- Check each user's `phone_number` against the three formats
- Normalize both the user's phone and target phones for comparison

4. **Display Results**

- Log matching users with their ID, email, name, and phone number
- Show summary count

5. **Disable SMS**

- For each matching user, call `knock.users.setPreferences(userId, "default", { channel_types: { sms: false } })`
- Log success/failure for each operation
- Show final summary

### Environment Variables

- `KNOCK_API_KEY` - Required for Knock API access
- Load from `.env` files using dotenv (similar to other scripts)

### Error Handling

- Validate `KNOCK_API_KEY` exists
- Handle API errors gracefully
- Log errors but continue processing other users
- Show summary of successes and failures

### Code References

- User listing pattern: `services/knock/scripts/delete-all-users.ts` (lines 47-71)
- SMS preference setting: `services/supabase/functions/_shared/services/knock.ts` (lines 52-64)
- Script structure: `scripts/remove-example-resend-contacts/index.ts`
- Environment setup: `scripts/lib/supabase.ts`

## Files to Modify

1. **`scripts/stop-sms-to-me/main.ts`** - Create the main script
2. **`scripts/deno.json`** - Add `@knocklabs/node` to imports if not already present

## Usage

Run with: `dotenv -e ../.env.prod -- deno run --allow-env --allow-net scripts/stop-sms-to-me/main.ts`