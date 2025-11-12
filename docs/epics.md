# whatcha-doin - Epic Breakdown

**Author:** hammaadworks
**Date:** Wednesday, 12 November 2025
**Project Level:** Level 2-4
**Target Scale:** Viral Growth

---

## Overview

This document provides the complete epic and story breakdown for whatcha-doin, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

This project is broken down into 6 key epics:
1.  **Core Platform Setup & User Foundation:** Establishes the basic infrastructure and user authentication.
2.  **Habit & Todo Management:** Implements the core features for managing recurring habits and one-off tasks.
3.  **Journaling & Daily Interaction:** Provides robust journaling capabilities and the daily recording of effort and notes.
4.  **Public Profile & Sharing:** Enables users to showcase their progress through a shareable public profile.
5.  **Advanced UX & Theming:** Focuses on novel user experience patterns and personalization through theming.
6.  **Performance, Security & Scalability Foundations:** Addresses critical non-functional requirements to ensure a robust and scalable application.

---

## Epic 1: Core Platform Setup & User Foundation

### Story 1.1: Initialize Project Repository and Core Infrastructure
As a developer,
I want a new project repository with basic structure, build system, and deployment pipeline configured,
So that I can begin development on a stable and deployable foundation.

**Acceptance Criteria:**
Given a new project,
When the project repository is initialized,
Then it includes a standard directory structure (e.g., src, public, components),
And a Next.js development environment is configured,
And a basic build script is defined,
And a placeholder deployment configuration for a serverless platform (e.g., Vercel, Netlify) is present,
And core dependencies like `shadcn/ui` and `Aceternity UI` are installed and configured.

**Prerequisites:** None

**Technical Notes:**
- Use `create-next-app` for initial setup.
- Integrate `shadcn/ui` and `Aceternity UI` following their official documentation.
- Set up a basic CI/CD pipeline (e.g., GitHub Actions) for automated builds and deployments to a staging environment.

### Story 1.2: Implement Magic Link Authentication
As a user,
I want to create an account and log in using a Magic Link sent to my email,
So that I can securely access the application without needing a password.

**Acceptance Criteria:**
Given an unauthenticated user,
When I enter my email address on the login/signup page,
Then a Magic Link is sent to my email,
And clicking the Magic Link logs me into the application,
And the Magic Link is single-use and expires within a short timeframe (e.g., 5 minutes).

**Prerequisites:** Story 1.1

**Technical Notes:**
- Integrate with Supabase Auth for Magic Link functionality.
- Ensure secure handling and storage of authentication tokens.

### Story 1.3: Create Basic User Profile Management
As a user,
I want to view and edit a simple text bio on my profile,
So that I can personalize my presence in the application.

**Acceptance Criteria:**
Given a logged-in user,
When I navigate to my profile settings,
Then I can see my current bio,
And I can edit my bio with a text input field,
And saving changes updates my bio successfully.

**Prerequisites:** Story 1.2

**Technical Notes:**
- Store user bio data in Supabase database.
- Implement API endpoints for fetching and updating user bio.
- Ensure proper authorization so users can only edit their own bio.

### Story 1.4: Develop Shareable Public Profile Page
As a user,
I want a public profile page accessible via a unique, shareable URL,
So that I can share my progress and information with others.

**Acceptance Criteria:**
Given a user with a profile,
When I access my public profile settings,
Then I can find a unique, shareable URL for my public profile,
And when another user or guest visits this URL,
Then they can see my bio (if public).

**Prerequisites:** Story 1.3

**Technical Notes:**
- Implement dynamic routing for public profile URLs (e.g., `/profile/[username]`).
- Ensure public profile data is fetched efficiently and securely.
- Initial implementation will only show the bio; other public data will be added in later epics.


## Epic 2: Habit & Todo Management

### Story 2.1: Create and Manage Habits in 'The Pile'
As a user,
I want to create, edit, and delete recurring habits within 'The Pile' column,
So that I can easily manage my habits before scheduling them.

**Acceptance Criteria:**
Given I am on the main interface,
When I use an inline input field in 'The Pile' column,
Then I can create a new habit with a name,
And new habits default to 'Private' and a streak count of 0,
And I can edit the name of an existing habit,
And I can delete an existing habit.

**Prerequisites:** Story 1.4

**Technical Notes:**
- Implement UI for inline habit creation and editing.
- Store habit data in Supabase, including name, public/private status, and streak count.
- Implement API endpoints for CRUD operations on habits.

### Story 2.2: Implement Public/Private Toggle for Habits
As a user,
I want to mark my habits as 'public' or 'private',
So that I can control what information is visible on my public profile.

**Acceptance Criteria:**
Given an existing habit,
When I am creating or editing a habit,
Then I can toggle its public/private status.

**Prerequisites:** Story 2.1

**Technical Notes:**
- Add a boolean field `is_public` to the habit data model.
- Implement UI for the toggle (e.g., a switch or icon).
- Ensure API endpoints correctly update this status.

### Story 2.3: Display Habit Streak Counter
As a user,
I want to see a visible streak counter badge on each habit,
So that I can easily track my progress.

**Acceptance Criteria:**
Given a habit is displayed,
When the habit has an active streak,
Then a badge showing the current streak count is visible on the habit chip.

**Prerequisites:** Story 2.1

**Technical Notes:**
- Implement UI component for the streak badge.
- Ensure the streak count is correctly calculated and updated in the backend.

### Story 2.4: Create and Manage Todos with Sub-Todos
As a user,
I want to create, edit, and delete one-off todos, including nested sub-todos,
So that I can organize my tasks effectively.

**Acceptance Criteria:**
Given I am on the main interface,
When I use an inline input field,
Then I can create a new todo with a description,
And I can create 2-level deep sub-todos using the `Tab` key,
And I can edit the description of an existing todo or sub-todo,
And I can delete an existing todo or sub-todo.

**Prerequisites:** Story 1.4

**Technical Notes:**
- Implement UI for inline todo creation and nested structure.
- Store todo data in Supabase, including description, parent-child relationships for sub-todos.
- Implement API endpoints for CRUD operations on todos.

### Story 2.5: Implement Public/Private Toggle for Todos
As a user,
I want to mark my todos as 'public' or 'private' via a visible toggle,
So that I can control what information is visible on my public profile.

**Acceptance Criteria:**
Given an existing todo,
When I am creating or editing a todo,
Then I can toggle its public/private status via a `🌐/🔒` icon visible on hover.

**Prerequisites:** Story 2.4

**Technical Notes:**
- Add a boolean field `is_public` to the todo data model.
- Implement UI for the privacy toggle, showing `🌐` for public and `🔒` for private on hover.

### Story 2.6: Mark Todos as Complete
As a user,
I want to mark a todo as complete,
So that I can track my finished tasks.

**Acceptance Criteria:**
Given an existing todo,
When I interact with the todo (e.g., click a checkbox),
Then the todo is marked as complete.

**Prerequisites:** Story 2.4

**Technical Notes:**
- Add a boolean field `is_completed` to the todo data model.
- Implement UI for marking completion (e.g., checkbox).
- Ensure API endpoints correctly update this status.

### Story 2.7: Implement Main Interface Columns and Sorting
As a user,
I want to see my habits organized into 'Today', 'Yesterday', and 'The Pile' columns with specific sorting,
So that I can easily manage my daily and recurring tasks.

**Acceptance Criteria:**
Given I am on the main interface,
When I view my habits,
Then they are displayed in three columns: 'Today', 'Yesterday', and 'The Pile',
And on desktop, 'Today' and 'Yesterday' are side-by-side, with 'The Pile' full-width below,
And on mobile, columns are stacked: 'Today', 'Yesterday', 'The Pile',
And all columns sort habit chips by: 1. Public habits first, 2. highest streak count (descending), 3. name (ascending).

**Prerequisites:** Story 2.3

**Technical Notes:**
- Implement responsive UI for the three-column layout.
- Implement client-side or server-side sorting logic based on the specified criteria.
- Ensure efficient data fetching for habits across columns.

### Story 2.8: Implement Daily State Change Logic
As a user,
I want my habits to automatically transition between columns at 12:00 am local time,
So that my daily tasks are correctly updated.

**Acceptance Criteria:**
Given it is 12:00 am in my local timezone,
When the daily state change occurs,
Then any habits completed the previous day appear in the 'Yesterday' column.

**Prerequisites:** Story 2.7

**Technical Notes:**
- Implement a mechanism to trigger daily state changes (e.g., a scheduled serverless function or client-side logic on app load).
- Update habit statuses and column assignments in the database.

### Story 2.9: Drag Habit from 'Yesterday' to 'Today'
As a user,
I want to drag a habit from 'Yesterday' to 'Today' to mark it complete for the current day,
So that I can continue its active streak.

**Acceptance Criteria:**
Given a habit is in the 'Yesterday' column,
When I drag and drop the habit to the 'Today' column (desktop),
Or when I tap to move the habit (mobile),
Then the habit is marked complete for the current day,
And its active streak continues.

**Prerequisites:** Story 2.8

**Technical Notes:**
- Implement drag-and-drop functionality for desktop.
- Implement tap-to-move functionality for mobile.
- Update habit status and streak count in the database via API call.

### Story 2.10: Implement 'Two-Day Rule' for Missed Habits
As a user,
I want habits not moved from 'Yesterday' to 'Today' to automatically go to 'The Pile' with streak reset,
So that missed habits are clearly identified and their previous progress is preserved.

**Acceptance Criteria:**
Given a habit is in the 'Yesterday' column and the daily cut-off passes,
When the habit is not moved to 'Today' and the 'Grace Period' is not triggered,
Then the habit is automatically moved to 'The Pile',
And its active streak is reset to zero,
And its previous streak count is preserved as a 'High Score' and displayed distinctly.

**Prerequisites:** Story 2.8

**Technical Notes:**
- Implement server-side logic to enforce the 'Two-Day Rule' during daily state changes.
- Update habit data model to store 'high_score' for streaks.
- Implement UI to display 'high_score' distinctly.

### Story 2.11: Implement 'Grace Period' End of Day Summary Screen
As a user,
I want to be presented with an 'End of Day Summary' screen if I open the app with pending habits from yesterday,
So that I can manage missed habits and maintain my streaks.

**Acceptance Criteria:**
Given I open the app for the first time on a new day,
When I have pending habits from the previous day,
Then a dedicated 'End of Day Summary' screen is displayed,
And this screen allows me to mark pending habits from the previous day as complete,
And I can add a new or existing habit to the previous day's record,
And after confirming the summary, the daily state change cycle runs with the corrected data.

**Prerequisites:** Story 2.10

**Technical Notes:**
- Implement UI for the 'End of Day Summary' screen.
- Implement API endpoints to update habits for the previous day.
- Integrate this screen into the app's startup flow.

### Story 2.12: Drag Habit from 'The Pile' to 'Today' to Restart
As a user,
I want to drag a habit from 'The Pile' to 'Today' to restart it,
So that I can easily resume a habit.

**Acceptance Criteria:**
Given a habit is in 'The Pile',
When I drag and drop the habit to the 'Today' column,
Then the habit is restarted,
And its active streak begins at 1.

**Prerequisites:** Story 2.7

**Technical Notes:**
- Implement drag-and-drop functionality for this interaction.
- Update habit status and reset streak to 1 in the database.

### Story 2.13: 'Yesterday' Column is Read-Only
As a user,
I want the 'Yesterday' column to be read-only,
So that I cannot accidentally modify or delete past habits.

**Acceptance Criteria:**
Given a habit is in the 'Yesterday' column,
When I attempt to delete or edit the habit,
Then the action is prevented.

**Prerequisites:** Story 2.7

**Technical Notes:**
- Implement UI and API-level restrictions to prevent modifications to habits in the 'Yesterday' column.

### Story 2.14: Undo Action in 'Today' Column
As a user,
I want to long-press a habit in the 'Today' column to undo the action,
So that I can correct accidental completions.

**Acceptance Criteria:**
Given a habit is in the 'Today' column,
When I long-press the habit,
Then the action is undone,
And the habit moves back to its previous column ('Yesterday' or 'The Pile'),
And its streak count reverts to its previous state.

**Prerequisites:** Story 2.9, Story 2.12

**Technical Notes:**
- Implement long-press gesture detection.
- Implement logic to revert habit status and streak count to a previous state (requires storing previous state temporarily).


## Epic 3: Journaling & Daily Interaction

### Story 3.1: Implement Habit/Todo Completion Recording Modal
As a user,
I want a modal to appear when I complete a habit or todo,
So that I can record details about my effort, duration, and notes.

**Acceptance Criteria:**
Given I complete a habit or todo,
When the item is marked complete,
Then a modal appears with an effort score slider (5 configurable snap-points and labels),
And fields for duration and free-form text notes,
And I can bypass detail entry by pressing `Enter` to log with default values.

**Prerequisites:** Story 2.9, Story 2.12, Story 2.6

**Technical Notes:**
- Implement modal UI with slider and text input fields.
- Define configurable snap-points and labels for the effort slider.
- Implement API endpoint to save effort, duration, and notes associated with the completed item.

### Story 3.2: Implement Dual-View Journal (Public/Private)
As a user,
I want a dual-view journal with distinct 'Public' and 'Private' sections,
So that I can separate my personal reflections from shareable content.

**Acceptance Criteria:**
Given I navigate to the journal view,
When the journal is displayed,
Then it has two tabs: 'Public' and 'Private'.

**Prerequisites:** Story 1.4

**Technical Notes:**
- Implement UI for tabbed journal view.
- Ensure data fetching logic respects public/private separation.

### Story 3.3: Automatically Aggregate Public Notes to Public Journal
As a user,
I want notes from completed public items to be automatically added to my Public Journal,
So that my public progress is consistently documented.

**Acceptance Criteria:**
Given I complete a public habit or todo and record notes,
When the notes are saved,
Then they are automatically added to the Public Journal.

**Prerequisites:** Story 3.1, Story 3.2

**Technical Notes:**
- Modify the API endpoint for saving completion details to route public notes to the Public Journal.
- Ensure proper data model for journal entries, linking them to completed items.

### Story 3.4: Automatically Aggregate Private Notes to Private Journal
As a user,
I want notes from completed private items to be automatically added to my Private Journal,
So that my personal reflections are kept organized.

**Acceptance Criteria:**
Given I complete a private habit or todo and record notes,
When the notes are saved,
Then they are automatically added to the Private Journal.

**Prerequisites:** Story 3.1, Story 3.2

**Technical Notes:**
- Modify the API endpoint for saving completion details to route private notes to the Private Journal.
- Ensure proper data model for journal entries, linking them to completed items.

### Story 3.5: Add Free-Form Text to Journal with Markdown Editor
As a user,
I want to add free-form text directly to either my public or private journal,
So that I can record thoughts not tied to specific habits or todos.

**Acceptance Criteria:**
Given I am in the journal view,
When I select either the 'Public' or 'Private' tab,
Then I can add new free-form text using a Markdown editor.

**Prerequisites:** Story 3.2

**Technical Notes:**
- Integrate a Markdown editor component into the journal view.
- Implement API endpoints to save free-form journal entries, respecting public/private status.

### Story 3.6: Edit Any Journal Entry
As a user,
I want to edit the content of any journal entry at any time,
So that I can refine my reflections.

**Acceptance Criteria:**
Given an existing journal entry,
When I select to edit the entry,
Then I can modify its content using the Markdown editor,
And saving changes updates the entry.

**Prerequisites:** Story 3.5

**Technical Notes:**
- Implement editing functionality for journal entries.
- Ensure proper authorization for editing (users can only edit their own entries).

### Story 3.7: Journal View Defaults to Today's Entries with Date Selector
As a user,
I want the journal view to default to today's entries and provide a date selector,
So that I can easily access my current reflections and browse past entries.

**Acceptance Criteria:**
Given I navigate to the journal view,
When the journal is displayed,
Then it defaults to showing today's entries,
And a date selector is available to view entries from past dates.

**Prerequisites:** Story 3.2

**Technical Notes:**
- Implement date filtering logic for journal entries.
- Implement a UI component for date selection.

### Story 3.8: Search Public Journal
As a user,
I want the public journal displayed on my public profile page to be searchable by its text content,
So that visitors can easily find specific information.

**Acceptance Criteria:**
Given I am viewing a public profile's public journal,
When I use a search input,
Then the journal entries are filtered based on my search query.

**Prerequisites:** Story 3.3, Story 1.4

**Technical Notes:**
- Implement search functionality for public journal entries.
- Consider client-side filtering for smaller datasets or server-side search for larger ones.


## Epic 4: Public Profile & Sharing

### Story 4.1: Display Public Habits on Public Profile
As a user,
I want my public habits and their streaks to be displayed on my public profile page,
So that others can see my progress.

**Acceptance Criteria:**
Given I am viewing a public profile,
When the page loads,
Then all public habits associated with that user are displayed,
And each public habit shows its current streak count.

**Prerequisites:** Story 1.4, Story 2.2, Story 2.3

**Technical Notes:**
- Extend the public profile API to fetch public habits and their streaks.
- Implement UI components to render public habits.

### Story 4.2: Display Public Todos on Public Profile
As a user,
I want my public todos to be displayed on my public profile page,
So that others can see my completed tasks.

**Acceptance Criteria:**
Given I am viewing a public profile,
When the page loads,
Then all public todos associated with that user are displayed.

**Prerequisites:** Story 1.4, Story 2.5

**Technical Notes:**
- Extend the public profile API to fetch public todos.
- Implement UI components to render public todos.

### Story 4.3: Display Public Journal on Public Profile
As a user,
I want my complete, searchable Public Journal to be displayed on my public profile page,
So that others can read my public reflections.

**Acceptance Criteria:**
Given I am viewing a public profile,
When the page loads,
Then the complete Public Journal associated with that user is displayed,
And the Public Journal is searchable by text content.

**Prerequisites:** Story 1.4, Story 3.3, Story 3.8

**Technical Notes:**
- Extend the public profile API to fetch public journal entries.
- Implement UI components to render the public journal, including search functionality.


## Epic 5: Advanced UX & Theming

### Story 5.1: Implement Motivational Quote Widget
As a user,
I want to see a widget that displays a motivational quote,
So that I can feel inspired and encouraged.

**Acceptance Criteria:**
Given I am on the main interface,
When the application loads,
Then a widget displaying a motivational quote is visible,
And the quote changes periodically or on refresh.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Integrate with a motivational quote API or use a local curated list.
- Implement UI for the quote widget.

### Story 5.2: Implement Keyboard Shortcuts for Core Actions
As a user,
I want to perform all core actions using intuitive keyboard shortcuts,
So that I can interact with the application quickly and efficiently.

**Acceptance Criteria:**
Given I am using the application,
When I press 'n',
Then a new task (habit or todo) creation interface appears,
And when I press 'j',
Then I navigate to the journal view,
And when I use arrow keys,
Then I can navigate between items or columns.

**Prerequisites:** Story 2.1, Story 2.4, Story 3.2

**Technical Notes:**
- Implement global keyboard event listeners.
- Map specific keys to corresponding actions and navigation.
- Ensure accessibility for keyboard navigation.

### Story 5.3: Implement Fluid Single Page Application (SPA) Experience
As a user,
I want the application to function as a Single Page Application,
So that I experience fluid navigation without full-page reloads.

**Acceptance Criteria:**
Given I am navigating between different sections of the application,
When I click on a navigation link,
Then the content updates without a full page refresh,
And the URL updates appropriately.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Leverage Next.js's client-side routing capabilities.
- Ensure efficient data fetching and state management to avoid perceived latency.

### Story 5.4: Implement Theme Switcher (Light/Dark Mode)
As a user,
I want a prominent theme switcher to toggle between light ('Zenith') and dark ('Monolith') themes,
So that I can personalize the application's appearance.

**Acceptance Criteria:**
Given I am using the application,
When I interact with the theme switcher,
Then the application's visual theme changes between 'Zenith' (light) and 'Monolith' (dark),
And the selected theme persists across sessions.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Implement CSS variables or a theming library (e.g., Tailwind CSS with dark mode support).
- Store user's theme preference in local storage or user settings.

### Story 5.5: Implement 'Positive Urgency UI' for 'Yesterday' Column
As a user,
I want the 'Yesterday' column to visually indicate time passing with an animated background and tooltip,
So that I am subtly motivated to maintain my streaks.

**Acceptance Criteria:**
Given I am viewing the main interface,
When habits are in the 'Yesterday' column,
Then the column features an Ambient Animated Background with a slow, shifting gradient (cool to warm colors),
And on hover, a tooltip displays the time remaining until the daily cut-off.

**Prerequisites:** Story 2.7, Story 2.8

**Technical Notes:**
- Implement CSS animations for the gradient background.
- Calculate and display remaining time until 12:00 am local time.
- Implement tooltip functionality.

### Story 5.6: Implement 'Teleport-to-Journal' Animation
As a user,
I want to see a visual animation when I complete an action,
So that I receive clear and delightful feedback that it's moved to the journal.

**Acceptance Criteria:**
Given I complete a habit or todo,
When the item is marked complete,
Then it visually fades out from its current section,
And simultaneously fades in/pops into the 'Completed Todos' or 'Completed Habits' section within the Journal.

**Prerequisites:** Story 3.1

**Technical Notes:**
- Implement CSS transitions or a JavaScript animation library (e.g., Framer Motion, Aceternity UI) for the teleport effect.
- Coordinate animations between the main interface and the journal view.


## Epic 6: Performance, Security & Scalability Foundations

### Story 6.1: Optimize Public Profile Page Load Time
As a user,
I want public profile pages to load quickly,
So that I have a smooth experience, especially on mobile and in-app browsers.

**Acceptance Criteria:**
Given I access a public profile page,
When the page loads,
Then it achieves a fast load time, specifically optimized for mobile devices and in-app browsers of social media applications.

**Prerequisites:** Story 1.4

**Technical Notes:**
- Implement server-side rendering (SSR) or static site generation (SSG) for public profile pages using Next.js.
- Optimize image loading (e.g., lazy loading, responsive images).
- Minimize bundle size and optimize critical rendering path.

### Story 6.2: Implement Efficient Real-time Data Synchronization
As a user,
I want my data to be synchronized across devices in real-time without performance degradation,
So that my information is always up-to-date.

**Acceptance Criteria:**
Given I make a change to my data on one device,
When I view the application on another device,
Then the changes are reflected in real-time,
And the real-time synchronization does not degrade overall application performance.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Utilize Supabase Realtime for efficient data synchronization.
- Implement optimistic UI updates to enhance perceived performance.
- Optimize database queries and subscriptions to minimize latency.

### Story 6.3: Secure Magic Link Authentication Implementation
As a user,
I want my Magic Link authentication to be secure,
So that I can protect my account.

**Acceptance Criteria:**
Given I use Magic Link for authentication,
When a Magic Link is sent,
Then the tokens are single-use,
And the tokens expire within a short timeframe.

**Prerequisites:** Story 1.2

**Technical Notes:**
- Configure Supabase Auth to enforce single-use and short-lived Magic Link tokens.
- Implement robust error handling for invalid or expired tokens.

### Story 6.4: Enforce Strict Public/Private Data Separation
As a user,
I want my private data to remain private,
So that there is no leakage of my personal information.

**Acceptance Criteria:**
Given I have both public and private data,
When data is accessed,
Then a strict separation between public and private data is enforced at the database and API level,
And unauthorized access to private information is prevented.

**Prerequisites:** Story 2.2, Story 2.5, Story 3.2

**Technical Notes:**
- Implement Row Level Security (RLS) in Supabase to control data access.
- Ensure API endpoints correctly filter data based on user authentication and public/private flags.

### Story 6.5: Design Scalable Database Schema and Queries
As a user,
I want the application to handle a growing amount of data and users efficiently,
So that performance remains consistent over time.

**Acceptance Criteria:**
Given the application scales,
When the number of users, habits, and journal entries increases,
Then the database schema and queries are designed to scale efficiently,
And application performance is maintained.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Design a normalized and optimized database schema in Supabase.
- Implement efficient indexing for frequently queried columns.
- Use pagination and server-side filtering for large datasets.

### Story 6.6: Implement WCAG 2.1 Level AA Accessibility
As a user,
I want the application to be accessible to a wide range of users,
So that everyone can use it effectively.

**Acceptance Criteria:**
Given I am using the application,
When I interact with its components,
Then the application is compliant with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standard.

**Prerequisites:** Story 1.1

**Technical Notes:**
- Follow WCAG guidelines for semantic HTML, ARIA attributes, keyboard navigation, and color contrast.
- Conduct accessibility audits and testing (e.g., Lighthouse, axe-core).

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._