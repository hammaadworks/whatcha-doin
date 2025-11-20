# whatcha-doin - Epic Breakdown

**Author:** hammaadworks
**Date:** 225-11-15
**Project Level:** {{project_level}}
**Target Scale:** {{target_scale}}

---

## Overview

This document provides the complete epic and story breakdown for whatcha-doin, decomposing the requirements from
the [PRD](./PRD.md) into implementable stories.

**CRITICAL ARCHITECTURAL DECISION:** The application will leverage **Supabase** for all data persistence from day one. This includes PostgreSQL for data storage, Authentication for user management, and its auto-generated API. This simplifies the architecture, eliminates future rework, and accelerates core feature development.

**Important Development Note:** To allow immediate access to the application during local development, a predefined user
session will be injected (see Epic 1, Story 1.2) to bypass the full authentication flow. This bypass will now mock a Supabase session by directly interacting with Supabase tables using the hardcoded user's `user_id`, bypassing Supabase Authentication for data operations. After successful authentication (or bypass), the user will be redirected to their root-level profile `/[publicId]`.

**Living Document Notice:** This is the initial version. It will be updated after UX Design and Architecture workflows
add interaction and technical details to stories.

Here's the proposed epic structure, designed to facilitate incremental and integrated development, ensuring visible
progress and continuous value delivery:

*   **Epic 1: Core Application Foundation & Authenticated Root View**
    *   **Goal:** Establish the foundational project infrastructure, implement a development-friendly bypass for Supabase data interaction, and lay out the basic authenticated UI accessible via the user's public profile slug.
    *   **Scope:** Project setup, core infrastructure, development data interaction bypass (mocking Supabase Auth and directly using tables with a hardcoded user ID), the basic authenticated root view (bio, todo, three-box sections), and initial setup for user authentication (FR-1.1, FR-1.2 for future, FR-1.3 for current).
    *   **Sequencing:** This is the absolute first epic, providing the essential environment and core authenticated UI before any
        feature-specific development begins.

*   **Epic 2: Habit Management Core**
    *   **Goal:** Implement all core habit-related functionalities, including creation, display, and advanced lifecycle
        management (e.g., drag-and-drop, daily state changes, Two-Day Rule).
    *   **Scope:** Integration of `HabitCard` and `HabitCreator`, plus all logic for drag-and-drop, tap-to-move, daily
        state changes, Grace Period, Lively and Junked states, Junked Days Counter, and undo completion. Data persistence for habits will use Supabase.
    *   **Sequencing:** Follows Epic 1, building directly upon the authenticated root view to populate it with the primary
        habit tracking features.

*   **Epic 3: Todo Management**
    *   **Goal:** Enable users to create, manage, and complete one-off tasks with privacy controls and sub-task
        capabilities.
    *   **Scope:** Implement todo creation input, basic todo display, completion, deletion, privacy toggles, and 2-level
        sub-todos. Data persistence for todos will use Supabase.
    *   **Sequencing:** Can be developed in parallel with or immediately after Epic 2, as it integrates into the
        authenticated root view alongside habits.

*   **Epic 4: Journaling & Data Entry**
    *   **Goal:** Provide a comprehensive journaling system integrated with habit/todo completion, allowing for detailed
        logging and reflection.
    *   **Scope:** Completion modal for habits/todos (streak, mood, work/goal, duration, notes, bypass, cancel, pre-fill),
        dual-view journal (Public/Private), automatic journaling, free-form text entry, editing entries, and a date
        selector. Data persistence for journal entries will use Supabase.
    *   **Sequencing:** Can begin once basic habit and todo completion mechanisms (Epics 2 and 3) are in place, as it
        relies on these for data entry.

*   **Epic 5: Public Profile Slug Configuration**
    *   **Goal:** Enable users to define and manage a unique, user-friendly public identifier (slug) for their public profile URL.
    *   **Scope:** User interface for setting and editing the public slug, real-time uniqueness validation, Supabase storage and retrieval of the public slug, and ensuring the public profile page is accessible via this slug (FR-1.4, FR-1.5, FR-1.3 for user bio display).
    *   **Sequencing:** Follows Epic 4 (Journaling & Data Entry), as it provides the personalized URL for sharing content generated in Epics 2, 3, and 4. This epic also integrates the full display of the user's bio and other profile elements.

*   **Epic 6: General UI/UX Enhancements**
    *   **Goal:** Implement general user interface and experience features, including accessibility and theming, to
        improve overall usability.
    *   **Scope:** Motivational quote widget, core keyboard shortcuts, and theme switcher.
    *   **Sequencing:** Can be integrated throughout other epics or as a dedicated polish epic once core functionalities
        are stable.

*   **Epic 7: Novel UX Patterns**
    *   **Goal:** Implement unique and engaging user experience patterns to differentiate the application and enhance user
        delight.
    *   **Scope:** Positive Urgency UI (Ambient Animated Background in 'Yesterday' column) and Teleport-to-Journal
        Animation.
    *   **Sequencing:** These are "delight" features and should be implemented once core functionality is robust and
        stable.

*   **Epic 8: Supabase Authentication Integration**
    *   **Goal:** Fully integrate Supabase's authentication system, replacing the development bypass with live Magic Link logins and user management.
    *   **Scope:** Transition from development bypass (Story 1.2) to full Supabase authentication flow (FR-1.1, FR-1.2), including handling user sessions and authentication states across the application.
    *   **Sequencing:** This is the *final epic* in the development sequence, occurring after all core features (Epics 1-7) are completed and stable, marking the transition to a fully authenticated production-ready application.

---

## Functional Requirements Inventory

-   **FR-1.1:** Users must be able to create an account using a Magic Link sent to their email address.
-   **FR-1.2:** The system must support user logins and logout.
-   **FR-1.3:** Users must be able to edit a simple text bio for their profile.
-   **FR-1.4:** Each user must be able to configure a unique public ID (slug) which makes their public profile page accessible via a shareable, user-friendly URL (e.g., `/user-chosen-slug`). The public ID must consist only of alphanumeric characters (a-z, A-Z, 0-9), hyphens (-), and underscores (_), and must be unique across all users.
-   **FR-1.5:** The public profile page must display the user's bio, all public habits, all public todos, and the public
    journal.
-   **FR-2.1:** Users must be able to create a new "habit" with a name via an inline input field within "The Pile" column.
-   **FR-2.2:** When creating or editing a habit, users must be able to mark it as "public" or "private".
-   **FR-2.3:** Users must be able to edit the name and public/private status of an existing habit.
-   **FR-2.4:** Users must be able to delete a habit, but only from "The Pile" column.
-   **FR-2.5:** Each habit chip must display a visible streak counter badge.
-   **FR-2.6:** Users must be able to set and modify a quantitative goal for a habit.
-   **FR-2.7:** When a habit's goal is upgraded or downgraded, the existing streak must continue uninterrupted.
-   **FR-2.8:** The system must support both broad habits and atomic habits.
-   **FR-3.1:** Users must be able to create a new "todo" with a text description using an "Intelligent Notepad" concept.
-   **FR-3.2:** When creating or editing a todo, users must be able to mark it as "public" or "private".
-   **FR-3.3:** Users must be able to mark a todo as complete.
-   **FR-3.4:** Users must be able to delete a todo.
-   **FR-4.1:** The main user interface must display three primary columns for managing habits: "Today", "Yesterday",
    and "The Pile".
-   **FR-4.2:** The daily state change occurs at 12:00 am in the user's local timezone.
-   **FR-4.3:** Users must be able to drag a habit from "Yesterday" to "Today" to mark it as complete for the current day.
-   **FR-4.4:** If a user opens the app for the first time on a new day and has pending habits from the previous day, they
    must be presented with a dedicated "End of Day Summary" screen. This screen specifically addresses habits from the *immediately preceding* day. For example, if a user misses Monday's habits and first opens the app on Wednesday, the Grace Period screen will prompt for Tuesday's missed habits. Monday's missed habits will have already transitioned to "Lively" or "Junked" states as per the "Two-Day Rule".
    -   **FR-4.4.1:** This screen must allow the user to mark pending habits from the previous day as complete.
    -   **FR-4.4.2:** From this screen, the user must be able to add a new or existing habit to the previous day's record.
    -   **FR-4.4.3:** After confirming the summary, the daily state change cycle runs with the corrected data.
-   **FR-4.5:** A habit's streak is only broken after two consecutive missed days (The "Two-Day Rule").
-   **FR-4.6:** If a habit in the "Yesterday" column is not completed, it moves to "The Pile" at midnight and enters a "
    Lively" state for 24 hours.
    -   **FR-4.6.1:** If a user moves a "Lively" habit to "Today", its original streak continues uninterrupted.
-   **FR-4.7:** If a "Lively" habit is not rescued from The Pile within 24 hours, it transitions to a permanent "Junked"
    state.
    -   **FR-4.7.1:** When a habit becomes "Junked", its `current_streak` is reset to zero, and that value is saved as the
        `last_streak`.
    -   **FR-4.7.2:** If a user moves a "Junked" habit to "Today", its streak resets to 1.
-   **FR-4.8:** Once a habit is in the "Junked" state, the UI must display a counter indicating how many days it has been
    neglected.
-   **FR-4.9:** The 'Yesterday' column is read-only; habits cannot be deleted or edited from this column.
-   **FR-4.10:** Users can long-press a habit in the 'Today' column to undo the completion.
-   **FR-5.1:** When a habit or todo is marked complete, a modal must appear allowing the user to record details.
    -   **FR-5.1.1:** The modal must display the current streak count and indicate the new streak after logging.
    -   **FR-5.1.2:** The modal must include a `mood` selector designed as a "fuel meter".
    -   **FR-5.1.3:** For quantitative habits, the modal must display the user's completed `work` versus their `goal`.
    -   **FR-5.1.4:** The `goal` value displayed in the modal must be editable.
    -   **FR-5.1.5:** The modal must include a structured `duration` input.
    -   **FR-5.1.6:** The system must formally record the `goal_value`, `work` value, `duration_value`, `duration_unit`,
        and `goal_at_completion`.
    -   **FR-5.1.7:** The modal must include fields for free-form text `notes`.
    -   **FR-5.1.8:** Users must be able to bypass detail entry by pressing `Enter` to log the item with default values.
    -   **FR-5.1.9:** The modal must include a "Cancel" option to dismiss it without logging.
    -   **FR-5.1.10:** If a habit is re-recorded on the same day (e.g., after being undone), the completion modal must
        pre-fill with the last recorded `mood`, `work`, and `duration` values for that day.
-   **FR-5.2:** The system must provide a dual-view journal with distinct "Public" and "Private" sections.
-   **FR-5.3:** Notes from completed public items, along with the habit's name, mood, work, and duration, must be
    automatically added to the Public Journal as a line item.
-   **FR-5.4:** Notes from completed private items, along with the habit's name, mood, work, and duration, must be
    automatically added to the Private Journal as a line item.
-   **FR-5.5:** Users must be able to add free-form text directly to either the public or private journal using a Markdown
    editor.
-   **FR-5.6:** Users must be able to edit the content of any journal entry at any time.
-   **FR-5.7:** The journal view must default to showing today's entries and provide a date selector to view entries from
    past dates.
-   **FR-6.1:** The application must feature a widget that displays a motivational quote.
-   **FR-6.2:** All core user actions must be achievable via keyboard shortcuts.
-   **FR-6.3:** The application must function as a Single Page Application (SPA), providing a fluid user experience.
-   **FR-6.4:** The application must include a prominent theme switcher.
-   **FR-7.1 (Positive Urgency UI):** The 'Yesterday' column must feature an "Ambient Animated Background" with a slow,
    shifting gradient.
-   **FR-7.2 (Teleport-to-Journal Animation):** Upon completion of an "Action" (Todo), it must visually fade out and
    simultaneously fade in/pops into the "Completed Todos" section within the Journal.

---

## FR Coverage Map

| Functional Requirement | Epic(s) | Story(ies) |
| :--------------------- | :------ | :--------- |
| FR-1.1                 | Epic 8  | 8.1       |
| FR-1.2                 | Epic 8  | 8.1       |
| FR-1.3                 | Epic 5  | 5.1, 5.3 |
| FR-1.4                 | Epic 5  | 5.3       |
| FR-1.5                 | Epic 5  | 5.3       |
| FR-2.1                 | Epic 2  | 2.2       |
| FR-2.2                 | Epic 2  | 2.2       |
| FR-2.3                 | Epic 2  | 2.2       |
| FR-2.4                 | Epic 2  | 2.2       |
| FR-2.5                 | Epic 2  | 2.1       |
| FR-2.6                 | Epic 4  | 4.3       |
| FR-2.7                 | Epic 4  | 4.3       |
| FR-2.8                 | Epic 4  | 4.3       |
| FR-3.1                 | Epic 3  | 3.1, 3.6 |
| FR-3.2                 | Epic 3  | 3.5       |
| FR-3.3                 | Epic 3  | 3.3       |
| FR-3.4                 | Epic 3  | 3.4       |
| FR-4.1                 | Epic 1, Epic 2 | 1.3, 2.3, 2.4 |
| FR-4.2                 | Epic 2  | 2.5       |
| FR-4.3                 | Epic 2  | 2.3, 2.4 |
| FR-4.4                 | Epic 2  | 2.6       |
| FR-4.4.1               | Epic 2  | 2.6       |
| FR-4.4.2               | Epic 2  | 2.6       |
| FR-4.4.3               | Epic 2  | 2.6       |
| FR-4.5                 | Epic 2  | 2.7       |
| FR-4.6                 | Epic 2  | 2.7       |
| FR-4.6.1               | Epic 2  | 2.7       |
| FR-4.7                 | Epic 2  | 2.8       |
| FR-4.7.1               | Epic 2  | 2.8       |
| FR-4.7.2               | Epic 2  | 2.8       |
| FR-4.8                 | Epic 2  | 2.9       |
| FR-4.9                 | Epic 2  | 2.5       |
| FR-4.10                | Epic 2  | 2.10       |
| FR-5.1                 | Epic 4  | 4.1       |
| FR-5.1.1               | Epic 4  | 4.2       |
| FR-5.1.2               | Epic 4  | 4.2       |
| FR-5.1.3               | Epic 4  | 4.3       |
| FR-5.1.4               | Epic 4  | 4.3       |
| FR-5.1.5               | Epic 4  | 4.4       |
| FR-5.1.6               | Epic 4  | 4.4       |
| FR-5.1.7               | Epic 4  | 4.4       |
| FR-5.1.8               | Epic 4  | 4.5       |
| FR-5.1.9               | Epic 4  | 4.5       |
| FR-5.1.10              | Epic 4  | 4.6       |
| FR-5.2                 | Epic 4  | 4.7       |
| FR-5.3                 | Epic 4  | 4.8       |
| FR-5.4                 | Epic 4  | 4.9       |
| FR-5.5                 | Epic 4  | 4.10       |
| FR-5.6                 | Epic 4  | 4.11       |
| FR-5.7                 | Epic 4  | 4.12       |
| FR-6.1                 | Epic 6  | 6.1       |
| FR-6.2                 | Epic 6  | 6.2       |
| FR-6.3                 | Epic 1  | 1.1       |
| FR-6.4                 | Epic 6  | 6.3       |
| FR-7.1                 | Epic 7  | 7.1       |
| FR-7.2                 | Epic 7  | 7.2       |

---

## Epic 1: Core Application Foundation & Authenticated Root View

**Goal:** Establish the foundational project infrastructure, implement a development-friendly bypass for Supabase data interaction, and lay out the basic authenticated UI accessible via the user's public profile slug.

### Story 1.1: Project Setup and Core Infrastructure

As a developer,
I want the project to have a standardized setup with core dependencies, build system, and basic deployment pipeline,
So that all subsequent development can proceed efficiently and consistently.

**Acceptance Criteria:**

**Given** a fresh clone of the repository,
**When** `npm install` and `npm run dev` are executed,
**Then** the application starts without errors and displays a blank page or a basic "Hello World" message.

**And** essential development tools (ESLint, Prettier, TypeScript) are configured and working.
**And** a basic CI/CD pipeline (e.g., GitHub Actions) is in place for linting and building.

**Prerequisites:** None.

**Technical Notes:** This story focuses on setting up the development environment and ensuring the project is runnable.
No specific UI components are integrated yet, but the foundation for them is laid.

### Story 1.2: Implement Development Login Bypass

As a developer,
I want to bypass the full Supabase login flow during local development,
So that I can quickly test core features using a predefined user session without repeated logins.

**Acceptance Criteria:**

**Given** the application is in local development mode,
**When** I access the application,
**Then** the user session is automatically initialized with the following dummy user:

```json
{
  "id": "68be1abf-ecbe-47a7-bafb-46be273a2e",
  "email": "hammaadworks @gmail.com"
}
```

**And** all user-specific data operations (read/write) are performed as this user.
**And** the existing authentication components (Auth.tsx, Logins.tsx) are bypassed or conditionally rendered.

**Prerequisites:** Story 1.1.

**Technical Notes:** This story requires implementing a mechanism (e.g., environment variable, mock service) to inject a
predefined user session. User data will be managed via direct Supabase table interaction using the hardcoded user's `user_id`, bypassing Supabase Authentication for data operations. This temporarily de-prioritizes the full integration of Supabase authentication until the final epic.

### Story 1.3: Implement Foundational Dashboard Layout

As a user,
I want to see the basic layout of my private dashboard, including placeholders for my bio, todo list, and the three
habit columns ("Today", "Yesterday", and "The Pile"),
So that I have a clear structure for where my habits and todos will appear.

**Acceptance Criteria:**

**Given** the application is running (`npm run dev`),
**When** I navigate to my authenticated home (e.g., `/[my-publicId]`),
**Then** I see a visually distinct area for "Bio", "Todos", "Today", "Yesterday", and "The Pile".

**And** these areas are laid out according to the desktop design (two-row: "Today" and "Yesterday" side-by-side,
full-width "The Pile" below).
**And** these areas are responsive for mobile (single-column, stacked layout).
**And** the layout uses placeholder content (e.g., "Your Bio Here", "Your Todos Here", "Today's Habits", etc.).

**Prerequisites:** Story 1.1.

**Technical Notes:** This story implements FR-4.1 (layout) using `shadcn/ui` and `Aceternity UI` for basic structure. No
dynamic data or complex interactions are required yet.

---

## Epic 2: Habit Management Core

**Goal:** Implement all core habit-related functionalities, including creation, display, and advanced lifecycle
management (e.g., drag-and-drop, daily state changes, Two-Day Rule).

### Story 2.1: Integrate Existing HabitCard into "The Pile"

As a user,
I want to see a sample habit card displayed within "The Pile" column on my authenticated root view,
So that I can visualize how my habits will appear and confirm the basic integration of habit components.

**Acceptance Criteria:**

**Given** the foundational authenticated root view layout is implemented (Story 1.3),
**When** I navigate to my authenticated root view,
**Then** I see at least one `HabitCard` component (with static, dummy data) rendered within "The Pile" column.

**And** the `HabitCard` is styled correctly and appears integrated into the layout.
**And** `npm run dev` shows this integrated component.

**Prerequisites:** Story 1.3, Refactoring of `HabitCard.tsx` (if necessary for integration).

**Technical Notes:** This story directly addresses the "Initial Integration of Habit Components" action item. It focuses
on getting an existing component visible in the new layout.

### Story 2.2: Refactor and Integrate HabitCreator into "The Pile"

As a user,
I want to be able to see and interact with the habit creation input field within "The Pile" column,
So that I can understand how to add new habits to my list.

**Acceptance Criteria:**

**Given** the authenticated root view layout is present (Story 1.3) and a sample `HabitCard` is integrated (Story 2.1),
**When** I view "The Pile" column,
**Then** I see the `HabitCreator` component (input field and "+ Add Goal" button) integrated at the top or bottom of "
The Pile" column.

**And** the `HabitCreator` is styled correctly and appears integrated into the layout.
**And** `npm run dev` shows this integrated component.
**And** basic interaction (typing in the input field) does not cause errors.

**Prerequisites:** Story 1.3, Story 2.1, Refactoring of `HabitCreator.tsx` (if necessary for integration).

**Technical Notes:** This story integrates another key Habit component, making it visible and interactive within the new
layout.

### Story 2.3: Implement Drag-and-Drop for Habits (Desktop)

As a desktop user,
I want to drag habit cards between "Today", "Yesterday", and "The Pile" columns,
So that I can easily manage my habits.

**Acceptance Criteria:**

**Given** the authenticated root view layout is present with habit cards (Epic 1 completed),
**When** I drag a habit card from one column to another,
**Then** the habit card visually moves to the new column.

**And** `npm run dev` shows the drag-and-drop interaction.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** Focus on implementing the drag-and-drop functionality for desktop.

### Story 2.4: Implement Tap-to-Move for Habits (Mobile)

As a mobile user,
I want to tap a habit card to move it between "Today", "Yesterday", and "The Pile" columns,
So that I can easily manage my habits on a touch device.

**Acceptance Criteria:**

**Given** the authenticated root view layout is present with habit cards (Epic 1 completed),
**When** I tap a habit card,
**Then** the habit card moves to the next logical column (e.g., from "The Pile" to "Today").

**And** `npm run dev` shows the tap-to-move interaction.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** Focus on implementing the tap-to-move functionality for mobile.

### Story 2.5: Implement Daily State Change Logic

As a user,
I want my habits to automatically transition between "Today" and "Yesterday" at midnight in my local timezone,
So that my daily habit tracking is accurate.

**Acceptance Criteria:**

**Given** I have habits in the "Today" column,
**When** the system clock passes 12:00 am in my local timezone,
**Then** habits not completed from "Today" move to "Yesterday", and habits completed from "Today" remain in "Today" (or
move to "Yesterday" if they were completed for the previous day).

**And** `npm run dev` shows the habits transitioning between columns.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** This involves implementing the backend logic for daily state changes and updating the UI
accordingly.

### Story 2.6: Implement "Grace Period" Screen

As a user,
I want to be presented with an "End of Day Summary" screen if I have pending habits from the previous day when I first
open the app on a new day,
So that I can manage my missed habits before my streak is affected.

**Acceptance Criteria:**

**Given** I have pending habits from the previous day,
**When** I open the app for the first time on a new day,
**Then** a dedicated "End of Day Summary" screen appears.

**And** this screen allows me to mark pending habits as complete or add new/existing habits to the previous day's
record.
**And** `npm run dev` shows this "Grace Period" screen.

**Prerequisites:** Story 2.5.

**Technical Notes:** This story implements FR-4.4 and its sub-FRs. It's important to note that the "Grace Period" screen specifically applies to habits pending from the *immediately preceding* day. For example, if a user misses Monday's habits and first opens the app on Wednesday, the Grace Period screen will prompt for Tuesday's missed habits. Monday's missed habits will have already transitioned to "Lively" or "Junked" states as per the "Two-Day Rule" (Stories 2.7, 2.8) and are not managed through this screen.

### Story 2.7: Implement "Two-Day Rule" - Lively State

As a user,
I want a habit that I missed yesterday to enter a "Lively" state in "The Pile" for 24 hours,
So that I have a chance to recover my streak.

**Acceptance Criteria:**

**Given** a habit in "Yesterday" is not completed,
**When** the daily state change occurs,
**Then** the habit moves to "The Pile" and is visually marked as "Lively".

**And** if I move a "Lively" habit to "Today", its original streak continues.
**And** `npm run dev` shows the "Lively" state and its interaction.

**Prerequisites:** Story 2.5.

**Technical Notes:** This story implements FR-4.5 and FR-4.6.

### Story 2.8: Implement "Two-Day Rule" - Junked State

As a user,
I want a "Lively" habit to become "Junked" if not rescued within 24 hours,
So that my streak is reset and I am aware of neglected habits.

**Acceptance Criteria:**

**Given** a "Lively" habit is not moved to "Today" within 24 hours,
**When** the 24-hour period expires,
**Then** the habit transitions to a "Junked" state, its streak resets to zero, and the `last_streak` is saved.

**And** if I move a "Junked" habit to "Today", its streak resets to 1.
**And** `npm run dev` shows the "Junked" state and its interaction.

**Prerequisites:** Story 2.7.

**Technical Notes:** This story implements FR-4.7.

### Story 2.9: Display Junked Days Counter

As a user,
I want to see a counter indicating how many days a "Junked" habit has been neglected,
So that I am motivated to restart it.

**Acceptance Criteria:**

**Given** a habit is in the "Junked" state (Story 2.8),
**When** I view the habit card,
**Then** a counter (e.g., "-7") is displayed on the card.

**And** `npm run dev` shows the junked days counter.

**Prerequisites:** Story 2.8.

**Technical Notes:** This story implements FR-4.8.

### Story 2.10: Implement Undo Completion

As a user,
I want to be able to undo a habit completion from the "Today" column,
So that I can correct mistakes.

**Acceptance Criteria:**

**Given** I have completed a habit in the "Today" column,
**When** I long-press the habit,
**Then** the completion is undone, the streak count reverts, and the habit moves back to its previous column ("
Yesterday" or "The Pile").

**And** `npm run dev` shows the undo action.

**Prerequisites:** Story 2.5.

**Technical Notes:** This story implements FR-4.10.

---

## Epic 3: Todo Management

**Goal:** Enable users to create, manage, and complete one-off tasks with privacy controls and sub-task capabilities.

### Story 3.1: Implement Todo Creation Input

As a user,
I want to see an input field in the "Todos" section of my authenticated root view to create new todos,
So that I can easily add one-off tasks.

**Acceptance Criteria:**

**Given** I am on the authenticated root view (Epic 1 completed),
**When** I view the "Todos" section,
**Then** I see an inline input field labeled "Intelligent Notepad" or similar.

**And** typing text into this field allows me to enter a todo description.
**And** `npm run dev` shows this input field integrated into the authenticated root view.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** Focus on UI integration of the input field. Data persistence for todos will use Supabase.

### Story 3.2: Create and Display Basic Todos

As a user,
I want to create a todo and see it appear in a list within the "Todos" section,
So that I can keep track of my tasks.

**Acceptance Criteria:**

**Given** the todo creation input is present (Story 3.1),
**When** I type a description and press Enter,
**Then** a new todo item appears in a list below the input field.

**And** the todo item displays its description.
**And** `npm run dev` shows the newly created todo integrated into the authenticated root view.

**Prerequisites:** Story 3.1.

**Technical Notes:** This story involves basic state management for todos and displaying them. Data persistence for todos will use Supabase.

### Story 3.3: Implement Todo Completion

As a user,
I want to mark a todo as complete,
So that I can track my progress and clear completed tasks.

**Acceptance Criteria:**

**Given** I have a todo displayed in the list (Story 3.2),
**When** I click a checkbox or similar control next to the todo,
**Then** the todo is visually marked as complete (e.g., strikethrough, moved to a "completed" section).

**And** `npm run dev` shows the visual change of the completed todo.

**Prerequisites:** Story 3.2.

**Technical Notes:** Focus on UI interaction and visual feedback for completion. Data persistence for todos will use Supabase.

### Story 3.4: Implement Todo Deletion

As a user,
I want to delete a todo,
So that I can remove unwanted tasks from my list.

**Acceptance Criteria:**

**Given** I have a todo displayed in the list (Story 3.2),
**When** I click a delete icon or similar control next to the todo,
**Then** the todo is removed from the list.

**And** `npm run dev` shows the todo being removed from the authenticated root view.

**Prerequisites:** Story 3.2.

**Technical Notes:** Focus on UI interaction and removal from the displayed list. Data persistence for todos will use Supabase.

### Story 3.5: Implement Todo Privacy Toggle

As a user,
I want to mark a todo as public or private,
So that I can control what information is visible on my public profile.

**Acceptance Criteria:**

**Given** I have a todo displayed in the list (Story 3.2),
**When** I hover over a todo,
**Then** I see a `🌐/🔒` privacy toggle.

**And** clicking the toggle changes the privacy status and updates the icon.
**And** `npm run dev` shows the privacy toggle and its state change.

**Prerequisites:** Story 3.2.

**Technical Notes:** Focus on UI integration and state management for the privacy toggle. Data persistence for todos will use Supabase.

### Story 3.6: Implement 2-Level Sub-Todos

As a user,
I want to create sub-todos by pressing `Tab` when creating a todo,
So that I can break down complex tasks into smaller steps.

**Acceptance Criteria:**

**Given** I am creating a todo (Story 3.1),
**When** I press `Tab` while typing in the input field,
**Then** the current todo becomes a sub-todo, visually indented.

**And** I can create a second level of sub-todos by pressing `Tab` again.
**And** `npm run dev` shows the visual indentation for sub-todos.

**Prerequisites:** Story 3.2.

**Technical Notes:** Focus on keyboard interaction and visual representation of sub-todos. Data persistence for todos will use Supabase.

---

## Epic 4: Journaling & Data Entry

**Goal:** Provide a comprehensive journaling system integrated with habit/todo completion, allowing for detailed logging
and reflection.

### Story 4.1: Implement Habit/Todo Completion Modal Trigger

As a user,
I want a modal to appear when I mark a habit or todo as complete,
So that I can record details about my completion.

**Acceptance Criteria:**

**Given** I have a habit or todo,
**When** I mark it as complete,
**Then** a modal window appears, displaying basic information about the completed item.

**And** `npm run dev` shows the modal appearing.

**Prerequisites:** Epic 2 (for habits), Epic 3 (for todos).

**Technical Notes:** Focus on the modal trigger and basic display. Data persistence for journal entries will use Supabase.

### Story 4.2: Display Streak and Mood Selector in Completion Modal

As a user,
I want to see my streak count and select my mood in the completion modal,
So that I can track my progress and emotional state.

**Acceptance Criteria:**

**Given** the completion modal is displayed (Story 4.1),
**When** I view the modal,
**Then** it displays the current and new streak count.

**And** it includes a "fuel meter" style mood selector with empathetic emoji labels.
**And** `npm run dev` shows these elements in the modal.

**Prerequisites:** Story 4.1.

**Technical Notes:** This story implements FR-5.1.1 and FR-5.1.2. Data persistence for journal entries will use Supabase.

### Story 4.3: Implement Quantitative Goal and Work Input in Modal

As a user,
I want to input my completed "work" against a quantitative goal in the modal,
So that I can track my progress on specific targets.

**Acceptance Criteria:**

**Given** the completion modal is displayed (Story 4.1) for a quantitative habit,
**When** I view the modal,
**Then** it displays my goal (e.g., "25/30 pages") and allows me to input my "work".

**And** the goal value is editable via an "i" button.
**And** `npm run dev` shows these elements and their interaction.

**Prerequisites:** Story 4.1, FR-2.6 (quantitative goals).

**Technical Notes:** This story implements FR-5.1.3 and FR-5.1.4. Data persistence for journal entries will use Supabase.

### Story 4.4: Implement Duration Input and Notes in Modal

As a user,
I want to record the duration and add free-form notes in the completion modal,
So that I can capture additional context about my completion.

**Acceptance Criteria:**

**Given** the completion modal is displayed (Story 4.1),
**When** I view the modal,
**Then** it includes a structured duration input (number and unit).

**And** it includes a free-form text field for notes.
**And** `npm run dev` shows these elements.

**Prerequisites:** Story 4.1.

**Technical Notes:** This story implements FR-5.1.5 and FR-5.1.7. Data persistence for journal entries will use Supabase.

### Story 4.5: Implement Modal Bypass and Cancel

As a user,
I want to bypass detail entry or cancel the completion modal,
So that I can quickly log items or discard accidental completions.

**Acceptance Criteria:**

**Given** the completion modal is displayed (Story 4.1),
**When** I press Enter,
**Then** the item is logged with default values, and the modal closes.

**And** when I click "Cancel", the modal closes without logging.
**And** `npm run dev` shows these interactions.

**Prerequisites:** Story 4.1.

**Technical Notes:** This story implements FR-5.1.8 and FR-5.1.9. Data persistence for journal entries will use Supabase.

### Story 4.6: Implement Modal Pre-fill for Re-records

As a user,
I want the completion modal to pre-fill with my last recorded values if I re-record a habit on the same day,
So that I don't have to re-enter the same information.

**Acceptance Criteria:**

**Given** I have recorded a habit and then undone it (Story 2.10),
**When** I re-record the same habit on the same day,
**Then** the completion modal pre-fills with the last recorded mood, work, and duration values.

**And** `npm run dev` shows the pre-filled modal.

**Prerequisites:** Story 4.1, Story 2.10 (undo completion).

**Technical Notes:** This story implements FR-5.1.10. Data persistence for journal entries will use Supabase.

### Story 4.7: Implement Dual-View Journal Layout

As a user,
I want to see a dual-view journal with "Public" and "Private" sections,
So that I can separate my personal reflections from shareable content.

**Acceptance Criteria:**

**Given** I am on the authenticated root view (Epic 1 completed),
**When** I navigate to the journal (e.g., via a dedicated link or keyboard shortcut),
**Then** I see a layout with distinct "Public" and "Private" tabs or sections.

**And** `npm run dev` shows the journal layout.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** This story implements FR-5.2. Data persistence for journal entries will use Supabase.

### Story 4.8: Implement Automatic Journaling for Public Items

As a user,
I want notes from completed public items to be automatically added to my Public Journal,
So that my journal is automatically populated with my public progress.

**Acceptance Criteria:**

**Given** I complete a public habit or todo with notes (Story 4.4),
**When** I view my Public Journal (Story 4.7),
**Then** a line item appears with the habit's name, mood, work, duration, and notes.

**And** `npm run dev` shows the automatic journaling.

**Prerequisites:** Story 4.4, Story 4.7.

**Technical Notes:** This story implements FR-5.3. Data persistence for journal entries will use Supabase.

### Story 4.9: Implement Automatic Journaling for Private Items

As a user,
I want notes from completed private items to be automatically added to my Private Journal,
So that my private reflections are captured.

**Acceptance Criteria:**

**Given** I complete a private habit or todo with notes (Story 4.4),
**When** I view my Private Journal (Story 4.7),
**Then** a line item appears with the habit's name, mood, work, duration, and notes.

**And** `npm run dev` shows the automatic journaling.

**Prerequisites:** Story 4.4, Story 4.7.

**Technical Notes:** This story implements FR-5.4. Data persistence for journal entries will use Supabase.

### Story 4.10: Implement Free-Form Journal Entry

As a user,
I want to add free-form text directly to either my public or private journal,
So that I can record thoughts not tied to specific habit completions.

**Acceptance Criteria:**

**Given** I am viewing my journal (Story 4.7),
**When** I select the Public or Private tab,
**Then** I see a Markdown editor where I can type free-form text.

**And** `npm run dev` shows the Markdown editor.

**Prerequisites:** Story 4.7.

**Technical Notes:** This story implements FR-5.5. Data persistence for journal entries will use Supabase.

### Story 4.11: Implement Journal Entry Editing

As a user,
I want to edit the content of any journal entry at any time,
So that I can refine my reflections.

**Acceptance Criteria:**

**Given** I have journal entries (Stories 4.8, 4.9, or 4.10),
**When** I select an entry for editing,
**Then** I can modify its content.

**And** `npm run dev` shows the editing functionality.

**Prerequisites:** Stories 4.8, 4.9, or 4.10.

**Technical Notes:** This story implements FR-5.6. Data persistence for journal entries will use Supabase.

### Story 4.12: Implement Journal Date Selector

As a user,
I want to select a date to view past journal entries,
So that I can review my history.

**Acceptance Criteria:**

**Given** I am viewing my journal (Story 4.7),
**When** I interact with a date selector,
**Then** the journal view updates to show entries from the selected date.

**And** `npm run dev` shows the date selector and its functionality.

**Prerequisites:** Story 4.7.

**Technical Notes:** This story implements FR-5.7. Data persistence for journal entries will use Supabase.

---

## Epic 5: Public Profile Slug Configuration

**Goal:** Enable users to define and manage a unique, user-friendly public identifier (slug) for their public profile URL.
    *   **Scope:** User interface for setting and editing the public slug, real-time uniqueness validation, Supabase storage and retrieval of the public slug, and ensuring the public profile page is accessible via this slug (FR-1.4, FR-1.5, FR-1.3 for user bio display).
    *   **Sequencing:** Follows Epic 4 (Journaling & Data Entry), as it provides the personalized URL for sharing content generated in Epics 2, 3, and 4. This epic also integrates the full display of the user's bio and other profile elements.

### Story 5.1: Implement Public Slug Configuration UI

As a user,
I want to be able to set and change a unique public slug for my profile,
So that I can personalize my public profile URL for sharing.

**Acceptance Criteria:**

**Given** I am on my profile settings page (`/me` - which is `/[my-publicId]` for the current user),
**When** I navigate to the public profile configuration section,
**Then** I see an input field where I can enter my desired public slug.
**And** as I type, the system provides real-time feedback on the slug's availability, validity (must consist only of alphanumeric characters (a-z, A-Z, 0-9), hyphens (-), and underscores (_)), and adherence to length restrictions.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** This story involves frontend UI development for input and validation feedback, including character restriction and length checks (e.g., minimum 3, maximum 30 characters). Supabase will be used for uniqueness validation and storage.

### Story 5.2: Implement Public Slug Uniqueness Validation & Storage (Supabase)

As a developer,
I want the system to validate the uniqueness of a user's chosen public slug and store it,
So that each public profile has a distinct and valid URL.

**Acceptance Criteria:**

**Given** a user attempts to save a public slug,
**When** the slug is submitted,
**Then** the system checks if the slug is unique, meets specified criteria (alphanumeric, hyphens, underscores), and adheres to length restrictions.
**And** if valid and unique, the slug is stored in the user's profile data in Supabase.
**And** if invalid or not unique, the user receives an appropriate error message.

**Prerequisites:** Story 5.1.

**Technical Notes:** This story requires backend logic (Next.js API route) for validation, including character and length restrictions (e.g., minimum 3, maximum 30 characters), and Supabase persistence.

### Story 5.3: Update Public Profile Page to Use Configurable Slug

As a user,
I want my public profile to be accessible via my chosen unique public slug directly from the domain root,
So that I can easily share a personalized and clean URL (e.g., `whatcha-doin.com/my-chosen-slug`).

**Acceptance Criteria:**

**Given** a user has set a public slug (Story 5.2),
**When** I navigate to `/[my-chosen-slug]`,
**Then** I see my public profile page.
**And** if I navigate to `/[another-user-slug]`, I see that user's public profile page.
**And** if a slug is not found, is invalid, or is a reserved system slug, the system displays an appropriate error (e.g., 44) or redirects to the authenticated root view.

**Prerequisites:** Story 5.2.

**Technical Notes:** This story involves updating the Next.js dynamic routing at the root level (`app/[slug]/page.tsx`) and the data fetching logic to use the slug for lookup. It also requires implementing a mechanism to prevent users from selecting reserved system slugs (e.g., `auth`, `dashboard`, `journal`, `grace-period`, `api`). The root route will dynamically serve either a public profile or the authenticated root view (e.g., dashboard) based on authentication and slug matching.

---

## Epic 6: General UI/UX Enhancements

**Goal:** Implement general user interface and experience features, including accessibility and theming, to
improve overall usability.

### Story 6.1: Implement Motivational Quote Widget

As a user,
I want to see a motivational quote displayed on my authenticated root view,
So that I feel inspired.

**Acceptance Criteria:**

**Given** I am on the authenticated root view (Epic 1 completed),
**When** I view the authenticated root view,
**Then** a widget displaying a motivational quote is visible.

**And** `npm run dev` shows the motivational quote widget.

**Prerequisites:** Epic 1 completed.

**Technical Notes:** Focus on fetching and displaying a quote.

### Story 6.2: Implement Core Keyboard Shortcuts

As a user,
I want to use keyboard shortcuts for core actions (e.g., 'n' for new task, 'j' for journal),
So that I can navigate and interact with the app efficiently.

**Acceptance Criteria:**

**Given** I am in the application,
**When** I press a defined keyboard shortcut (e.g., 'n'),
**Then** the corresponding action is triggered (e.g., new todo input focused, journal opened).

**And** `npm run dev` shows the keyboard shortcut functionality.

**Prerequisites:** Relevant UI components for actions (e.g., todo input, journal view).

**Technical Notes:** This story implements FR-6.2.

### Story 6.3: Implement Theme Switcher

As a user,
I want to toggle between a light ("Zenith") and dark ("Monolith") theme,
So that I can customize the app's appearance to my preference.

**Acceptance Criteria:**

**Given** I am in the application,
**When** I interact with a prominent theme switcher,
**Then** the application's visual theme changes between light and dark modes.

**And** `npm run dev` shows the theme switching functionality.

**Prerequisites:** Epic 1 completed (for basic styling).

**Technical Notes:** This story implements FR-6.4.

---

## Epic 7: Novel UX Patterns

**Goal:** Implement unique and engaging user experience patterns to differentiate the application and enhance user
delight.

### Story 7.1: Implement Positive Urgency UI in "Yesterday" Column

As a user,
I want to see a subtle ambient animated background in the "Yesterday" column,
So that I am gently reminded of the approaching deadline for missed habits.

**Acceptance Criteria:**

**Given** I am viewing the authenticated root view with habits in the "Yesterday" column,
**When** time passes towards midnight,
**Then** the background of the "Yesterday" column displays a slow, shifting gradient (cool to warm colors).

**And** a tooltip on hover shows the time remaining until the daily cut-off.
**And** `npm run dev` shows this animated background.

**Prerequisites:** Epic 2 (for "Yesterday" column logic).

**Technical Notes:** This story implements FR-7.1 using `Aceternity UI` or similar animation libraries.

### Story 7.2: Implement Teleport-to-Journal Animation

As a user,
I want to see a visual animation when I complete a todo,
So that I receive clear and delightful feedback that it has moved to my journal.

**Acceptance Criteria:**

**Given** I complete a todo (Epic 3 completed),
**When** the todo is marked complete,
**Then** it visually fades out from the "Todos" section and simultaneously fades in/pops into the "Completed Todos"
section within the Journal.

**And** `npm run dev` shows this animation.

**Prerequisites:** Epic 3 (for todo completion), Epic 4 (for journal).

**Technical Notes:** This story implements FR-7.2 using `Aceternity UI` or similar animation libraries.

---

## Epic 8: Supabase Authentication Integration

**Goal:** Fully integrate Supabase's authentication system, replacing the development bypass with live Magic Link logins and user management.
    *   **Scope:** Transition from development bypass (Story 1.2) to full Supabase authentication flow (FR-1.1, FR-1.2), including handling user sessions and authentication states across the application.
    *   **Sequencing:** This is the *final epic* in the development sequence, occurring after all core features (Epics 1-7) are completed and stable, marking the transition to a fully authenticated production-ready application.

---

## Summary

This epic breakdown provides a detailed plan for the incremental and integrated development of "whatcha-doin". Each epic
is broken down into bite-sized stories, with a strong emphasis on delivering visible and integrated components at the
end of each story. This approach ensures continuous progress, early feedback, and tangible results for stakeholders.

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic
breakdown._

_This document will be updated after UX Design and Architecture workflows to incorporate interaction details and
technical decisions._