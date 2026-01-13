---
name: Optimize Diary Caching
overview: Modify diary fetching strategy to use cache updates instead of refetching all patient diaries. Single diary fetches will update the byPatient cache in-place rather than triggering a full refetch.
todos:
  - id: remove-bypatient-invalidation
    content: Remove byPatient invalidation from invalidateDiaries.tsx
    status: completed
  - id: add-cache-update-helper
    content: Add updateDiaryInPatientCache helper function
    status: completed
  - id: wire-cache-sync
    content: Wire up cache sync after single diary fetch
    status: completed
---

# Optimize Diary Cache Updates

## Changes

### 1. Update invalidateDiaries to skip byPatient invalidation

In `apps/webapp/src/features/diaries/features/edit/api/invalidateDiaries.tsx`:

- Remove the `queryClient.invalidateQueries` call for `diaryKeys.byPatient`
- Keep only the `diaryKeys.detail` invalidation

### 2. Add cache update utility

Create a new helper function `updateDiaryInPatientCache` in `diaryQueryOptions.ts` that:

- Uses `queryClient.setQueryData` to update the `byPatient` cache
- Finds and replaces the diary by `diary_id` in the cached array
- If diary not found in cache, optionally adds it (for new diaries)

### 3. Wire up cache update in diary query

Modify `diaryByIdQueryOptions` or create a wrapper hook that:

- After successful fetch of a single diary, calls `updateDiaryInPatientCache`
- This keeps the `byPatient` cache in sync without a network request

## Key Files

- `apps/webapp/src/features/diaries/features/edit/api/invalidateDiaries.tsx` - remove byPatient invalidation
- `apps/webapp/src/features/diaries/api/diaryQueryOptions.ts` - add cache update helper
- `apps/webapp/src/features/diaries/api/diaryQueries.tsx` - add cache sync logic