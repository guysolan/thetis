---
name: Study Tracker View
overview: Create a study-tracker view that displays daily completion status for enrolled profiles (those with study_number). The view will show how many profiles have completed their entries each day, which study numbers haven't completed, and be visual, easy to use, and clickable.
todos:
  - id: create-hook
    content: Create useStudyTrackerData hook to fetch and process entries with profiles (filtered by study_number IS NOT NULL), group by date, and calculate completion stats
    status: completed
  - id: create-helpers
    content: Create studyTrackerHelpers.ts with functions to group entries by date, calculate day stats, and extract study numbers
    status: completed
  - id: create-day-component
    content: Create StudyTrackerDay component to display individual day cells with completion ratio and color coding
    status: completed
    dependencies:
      - create-helpers
  - id: create-dialog
    content: Create StudyTrackerDayDialog component to show day details modal with completed/incomplete study numbers
    status: completed
    dependencies:
      - create-helpers
  - id: create-calendar
    content: Create StudyTrackerCalendar component to display month view with clickable days
    status: completed
    dependencies:
      - create-day-component
      - create-dialog
  - id: create-route
    content: Create study-tracker.tsx route file that uses the hook and calendar component
    status: completed
    dependencies:
      - create-hook
      - create-calendar
---

# Study Tracker View Implementation

## Overview
Create a new study-tracker view that shows daily completion statistics for all enrolled profiles (those with `study_number`). Each day displays completion counts (e.g., "3/4 done") and indicates which study numbers haven't completed.

## Data Query

### New Hook: `useStudyTrackerData`
**File**: `apps/glucose/src/hooks/useStudyTrackerData.ts`

- Fetch all entries joined with profiles
- Filter to only profiles where `study_number IS NOT NULL`
- Group by date using `DATE(entries.created_at)`
- For each date, calculate:
  - Total enrolled profiles (with study_number)
  - Count of entries with `submitted_at IS NOT NULL` (completed)
  - List of study numbers that completed
  - List of study numbers that didn't complete

**Query Structure**:
```typescript
// Use Supabase query to get entries with profile data
const { data } = await supabaseClient
  .from('entries')
  .select(`
    entry_id,
    profile_id,
    created_at,
    submitted_at,
    profiles!inner(study_number)
  `)
  .not('profiles.study_number', 'is', null)
```

Then process in TypeScript to group by date.

## UI Components

### 1. Study Tracker Route
**File**: `apps/glucose/src/routes/study-tracker.tsx`

- New route accessible from admin or standalone
- Uses `useStudyTrackerData` hook
- Displays calendar view with daily completion stats
- Similar layout to existing calendar components but focused on study-wide stats

### 2. Study Tracker Calendar Component
**File**: `apps/glucose/src/components/StudyTrackerCalendar.tsx`

- Reuse calendar grid logic from `CalendarMonth` component
- For each day, display:
  - Date number
  - Completion ratio (e.g., "3/4")
  - Visual indicator (color-coded: green for all complete, amber for partial, red for none)
- Make each day clickable

### 3. Day Details Dialog
**File**: `apps/glucose/src/components/StudyTrackerDayDialog.tsx`

- Modal/dialog component (using shadcn Dialog)
- Shows when a day is clicked
- Displays:
  - Date header
  - Completion stats: "3/4 profiles completed"
  - List of completed study numbers (with checkmarks)
  - List of incomplete study numbers (highlighted/missing)
- Close button

### 4. Study Tracker Day Component
**File**: `apps/glucose/src/components/StudyTrackerDay.tsx`

- Individual day cell in the calendar
- Shows date number and completion ratio
- Visual styling based on completion status:
  - 100% complete: green background
  - Partial: amber/yellow background  
  - 0% complete: red/gray background
- Hover effects and click handlers

## Data Processing Logic

### Helper Functions
**File**: `apps/glucose/src/utils/studyTrackerHelpers.ts`

- `groupEntriesByDate(entries)`: Groups entries by date (from created_at)
- `calculateDayStats(dateEntries, allStudyNumbers)`: Calculates completion stats for a day
- `getStudyNumbersForDate(dateEntries)`: Extracts completed/incomplete study numbers

## Integration

### Routing
- Add route to router (already auto-generated from file-based routing)
- Add navigation link in admin view or main navigation
- Route should be `/study-tracker`

### Styling
- Use existing design system (shadcn UI components)
- Match existing calendar styling from entries view
- Ensure responsive design

## Type Definitions

```typescript
interface StudyTrackerEntry {
  entry_id: string;
  profile_id: string;
  created_at: string;
  submitted_at: string | null;
  study_number: number;
}

interface DayStats {
  date: string; // YYYY-MM-DD format
  total: number;
  completed: number;
  completedStudyNumbers: number[];
  incompleteStudyNumbers: number[];
}

interface StudyTrackerData {
  days: DayStats[];
  allStudyNumbers: number[];
}
```

## Implementation Steps

1. Create `useStudyTrackerData` hook with data fetching and processing
2. Create `StudyTrackerDay` component for individual day cells
3. Create `StudyTrackerDayDialog` component for day details
4. Create `StudyTrackerCalendar` component for month view
5. Create `study-tracker.tsx` route file
6. Add helper functions in `studyTrackerHelpers.ts`
7. Test with real data and ensure proper date handling (timezone considerations)

## Key Considerations

- Date handling: Ensure consistent timezone handling (likely UTC)
- Performance: Consider pagination or date range limiting if dataset is large
- Access control: Ensure only admin/authenticated users can access
- Empty states: Handle cases where no entries exist for certain dates
- Visual clarity: Make completion ratios easy to read at a glance