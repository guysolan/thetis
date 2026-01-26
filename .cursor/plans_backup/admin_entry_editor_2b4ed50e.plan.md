---
name: Admin Entry Editor
overview: Create an admin-only page to edit past diary entries, including entry values and metadata (schedule, tracker, timing attributes). The page will open in a new tab from EntryCard links visible only to admins.
todos:
  - id: create-admin-entry-route
    content: Create admin entry page route at /admin/entry/$entryId with form for editing entry attributes and values
    status: completed
  - id: create-fetch-entry-api
    content: Create API hook to fetch entry with associated diary data (trackers list)
    status: completed
  - id: modify-entry-card
    content: Add admin-only link in EntryCard to open entry editor in new tab
    status: completed
---

# Admin Entry Editor

## Overview

Create an admin-only page at `/admin/entry/$entryId` that allows editing past diary entries with full control over entry values and timing metadata.

## Architecture

```mermaid
flowchart TD
    EntryCard[EntryCard in TrackerInHistory] -->|Admin only link target=_blank| AdminEntryPage[/admin/entry/$entryId]
    AdminEntryPage --> FetchEntry[Fetch Entry + Diary Data]
    FetchEntry --> EditForm[Edit Entry Form]
    EditForm --> EntryValues[Entry Values Section]
    EditForm --> EntryAttributes[Entry Attributes Section]
    EntryAttributes --> ScheduleSelect[Schedule Select Dialog]
    EntryAttributes --> TrackerSelect[Tracker Select from Diary]
    EntryAttributes --> TimingFields[Timing Label/Interval/Unit]
    EntryAttributes --> ScheduleIndex[Schedule Index]
    EditForm --> DeleteEntry[Delete Entry Button]
```

## Files to Create

### 1. Admin Entry Page Route

Create [`apps/webapp/src/routes/_app/admin/entry/$entryId/index.tsx`](apps/webapp/src/routes/_app/admin/entry/$entryId/index.tsx)

- Fetch entry by ID with associated diary data (for trackers and schedules)
- Display entry values using existing `EditableEntryCardEntryValues` component
- Form for editing entry attributes:
  - `schedule_id` - Use ScheduleSelectDialog from `@patient-watch/forms`
  - `schedule_index` - Number input
  - `tracker_id` - Select from trackers in current diary
  - `timing_label` - Text input
  - `timing_interval` - Number input
  - `time_unit` - Select from: second, minute, hour, day, week, month
- Delete entry button using existing `useDeleteEntryMutation`

### 2. API: Fetch Entry with Diary Data

Create [`apps/webapp/src/features/entries/api/selectEntryWithDiary.tsx`](apps/webapp/src/features/entries/api/selectEntryWithDiary.tsx)

- Query entry by `entry_id` from `entries_view`
- Join with diary data via `tracker_id` to get:
  - `diary_id`
  - List of trackers in the diary (for tracker_id dropdown)
- Also fetch schedules list for schedule selection

## Files to Modify

### 1. EntryCard Component

Modify [`apps/webapp/src/features/entries/components/EntryCard.tsx`](apps/webapp/src/features/entries/components/EntryCard.tsx)

- Add admin-only link to open entry in new tab
- Check `useAuth().roles.isAdmin` for visibility
- Link format: `/admin/entry/{entry_id}` with `target="_blank"`

## Entry Data Structure (Reference)

From the database schema, entry fields to edit:

```typescript
{
  entry_id: string;
  entry_time: string;
  schedule_id: string | null;      // FK to schedules
  schedule_index: number | null;
  tracker_id: string | null;       // FK to trackers
  time_unit: string | null;        // FK to time_units: second|minute|hour|day|week|month
  timing_id: string | null;
  timing_interval: number | null;
  timing_label: string | null;
}
```

## Key Dependencies

- Reuse existing `ScheduleSelectDialog` from `@patient-watch/forms` (needs standalone version without react-hook-form)
- Reuse `EditableEntryCardEntryValues` for inline entry value editing
- Reuse `useUpdateEntry` mutation from `apps/webapp/src/features/entries/api/updateEntry.tsx`
- Reuse `useDeleteEntryMutation` from `apps/webapp/src/features/entries/api/deleteEntry.tsx`
- Reuse `useSchedulesQuery` from `apps/webapp/src/features/schedules/api/selectSchedules.tsx`