epic_id: "epic-1"
story_id: "1-6"
title: "Integrate Existing HabitCard into 'The Pile' Column"
user_story: |
  As a user,
  I want to see a sample habit card displayed within "The Pile" column on my main view,
  so that I can visualize how my habits will appear and confirm the basic integration of habit components.
acceptance_criteria:
  - "When navigating to the authenticated main view at `/[username]`, a `HabitCard` component is visibly rendered within 'The Pile' column."
  - "The `HabitCard` component displays placeholder content for a habit name (e.g., 'Sample Habit') and a placeholder streak count (e.g., '0')."
  - "The `HabitCard` component is integrated into `app/[username]/page.tsx` or its layout (`app/[username]/layout.tsx`)."
  - "The `HabitCard` component adheres to the project's styling conventions (Tailwind CSS, `shadcn/ui` based)."
tasks_subtasks:
  - "Task 1: Integrate `HabitCard` into 'The Pile' column in `ProfilePageClient.tsx` (AC: #1, #3)"
    - "Subtask 1.1: Locate the placeholder for 'The Pile' within `components/profile/ProfilePageClient.tsx`."
    - "Subtask 1.2: Import the `HabitCard` component from `components/habits/HabitCard.tsx`."
    - "Subtask 1.3: Render a `HabitCard` component within the 'The Pile' column."
  - "Task 2: Populate `HabitCard` with mock data (AC: #2)"
    - "Subtask 2.1: Create a mock `habit` object with `id`, `name` ('Sample Habit'), `is_public` (true), `pile_state` ('lively'), `current_streak` (0), `last_streak` (0), and null for `goal_value` and `goal_unit`."
    - "Subtask 2.2: Pass the mock `habit` object to the `habit` prop of `HabitCard`."
    - "Subtask 2.3: Provide dummy `onHabitUpdated` and `onHabitDeleted` functions to `HabitCard`."
  - "Task 3: Ensure `HabitCard` adheres to styling conventions (AC: #4)"
    - "Subtask 3.1: Verify the `HabitCard` component renders with expected styling (Tailwind CSS, `shadcn/ui` based). (Manual verification initially)"
  - "Task 4: Basic integration tests (AC: #1, #2)"
    - "Subtask 4.1: Create a test file `tests/integration/HabitCardIntegration.test.tsx`."
    - "Subtask 4.2: Write a test to ensure a `HabitCard` is rendered within 'The Pile' when `ProfilePageClient` is viewed."
    - "Subtask 4.3: Write a test to verify the mock content ('Sample Habit', '0' streak) is displayed in the `HabitCard`."
technical_details:
  - "The `HabitCard` component is located at `components/habits/HabitCard.tsx`."
  - "The integration point for 'The Pile' column is within the authenticated user's main view, likely `app/[username]/page.tsx`, based on the `UX Design Specification` section '4.3 Main Board Layout & Interaction' and `Architecture.md` 'Project Structure'."
  - "For this story, the `HabitCard` should be populated with hardcoded/mock habit data to demonstrate its rendering and styling."
  - "Ensure the integration uses existing styling utilities (Tailwind CSS) and components (`shadcn/ui`) as per `Architecture.md` (ADR 001) and `UX Design Specification` ('1.1 Design System Choice')."
  - "No backend data fetching is required for this story; the focus is solely on frontend integration and display."
dependencies:
  - "Story 1.4: Implement Default Username Generation at Signup (Status: Done)"
  - "Story 1.5: Implement Foundational Authenticated Main View Layout (Status: Done)"
testing_notes:
  unit_tests: |
    - No new unit tests specifically for this integration; existing `HabitCard` unit tests (if any) would cover its isolated functionality.
  integration_tests: |
    - Verify that navigating to a user's `/[username]` URL successfully renders the `HabitCard` within the 'The Pile' section of the layout.
    - Check the console for any errors related to `HabitCard` rendering or data props.
  e2e_tests: |
    - Manual verification by running the development server (`pnpm dev`) and navigating to `http://localhost:3000/someusername` (or an existing test username).
    - Visually confirm the `HabitCard` is present and correctly styled.
file_path: "docs/sprint-artifacts/stories/1-6-integrate-existing-habitcard-into-the-pile.md"
status: "ready-for-dev"


## Dev Agent Record

### Context Reference

- `docs/sprint-artifacts/stories/1-6-integrate-existing-habitcard-into-the-pile.context.xml`

### Agent Model Used