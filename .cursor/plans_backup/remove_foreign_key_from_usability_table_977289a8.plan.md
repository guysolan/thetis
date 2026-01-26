---
name: Remove Foreign Key from Usability Table
overview: Remove the foreign key constraint from the `usability` table's `user_id` field so it can reference either `patients.uuid` or `clinicians.uuid`, making the table flexible for both user types.
todos:
  - id: create_migration
    content: Create new migration file to drop the foreign key constraint from usability.user_id
    status: pending
  - id: apply_migration
    content: Apply the migration to the database (user will run manually or via Supabase CLI)
    status: pending
    dependencies:
      - create_migration
  - id: regenerate_types
    content: Regenerate TypeScript types from Supabase schema (optional, if types need updating)
    status: pending
    dependencies:
      - apply_migration
  - id: test_form
    content: Test the usability form works with both patient and clinician UUIDs
    status: pending
    dependencies:
      - apply_migration
---

# Remove Foreign Key from Usability Table

## Overview

Modify the `usability` table to remove the foreign key constraint on `user_id`, allowing it to reference either `patients.uuid` or `clinicians.uuid` (or remain a flexible UUID field without enforced relationships).

## Current State

The `usability` table currently has:
- Foreign key constraint: `REFERENCES public.patients(uuid) ON DELETE CASCADE`
- This restricts `user_id` to only valid patient UUIDs

## Changes Required

### 1. Create Database Migration

Create a new migration file to drop the foreign key constraint:

**File**: `supabase/migrations/YYYYMMDD_remove_usability_fkey.sql`

```sql
-- Remove foreign key constraint from usability.user_id
-- This allows user_id to reference either patients.uuid or clinicians.uuid

ALTER TABLE public.usability
DROP CONSTRAINT IF EXISTS usability_user_id_fkey;
```

**Note**: Since the constraint was created with `ON DELETE CASCADE`, dropping it means:
- Records in `usability` will NOT be automatically deleted when a patient is deleted
- The `user_id` field becomes a plain UUID without referential integrity
- Application logic can validate the UUID belongs to either `patients` or `clinicians` if needed

### 2. Verify Existing Code

The existing form page at `/usability-form?user_id={uuid}` should continue to work without changes because:
- It only uses the UUID value, not the foreign key relationship
- The `useUsabilityData` and `useUpdateUsability` hooks query/insert by UUID directly
- No code currently relies on the foreign key for joins or cascading deletes

### 3. Optional: Regenerate TypeScript Types

After applying the migration, regenerate Supabase types to reflect the schema change:
```bash
npx supabase gen types typescript --project-id vbbrrlntyvgxlzhfndoj --schema public > src/@types/supabase.ts
```

## Files to Modify

1. **New Migration File**: `supabase/migrations/YYYYMMDD_remove_usability_fkey.sql`
   - Drop the foreign key constraint

2. **Optional**: Regenerate `src/@types/supabase.ts` after migration (if types are affected)

## Testing

After applying the migration:
- Verify the form still works: `/usability-form?user_id={patient_uuid}`
- Verify the form works with clinician UUIDs: `/usability-form?user_id={clinician_uuid}`
- Verify existing patient records still work
- Verify RLS policies still function correctly (they should, as they're independent of foreign keys)

## Rollback

If needed, the foreign key can be re-added:
```sql
ALTER TABLE public.usability
ADD CONSTRAINT usability_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.patients(uuid) ON DELETE CASCADE;
```

But note: This would only allow patient UUIDs again, not clinicians.

## Considerations

- **Data Integrity**: Without the foreign key, invalid UUIDs can be inserted. Application validation should ensure UUIDs belong to either `patients` or `clinicians`.
- **Cascading Deletes**: Records will persist even if the referenced patient/clinician is deleted. Consider adding application-level cleanup if needed.
- **RLS Policies**: Current RLS policies allow public access and should continue working unchanged.