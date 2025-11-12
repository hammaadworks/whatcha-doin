# {{project_name}} - Product Requirements Document

**Author:** {{user_name}}
**Date:** {{date}}
**Version:** 1.3

---

## Executive Summary

{{vision_alignment}}

### What Makes This Special

{{product_magic_essence}}

---

## Project Classification

**Technical Type:** {{project_type}}
**Domain:** {{domain_type}}
**Complexity:** {{complexity_level}}

{{project_classification}}

{{#if domain_context_summary}}

### Domain Context

{{domain_context_summary}}
{{/if}}

---

## Success Criteria

{{success_criteria}}

{{#if business_metrics}}

### Business Metrics

{{business_metrics}}
{{/if}}

---

## Product Scope

### MVP - Minimum Viable Product

This is the focused feature set required to deliver the core identity-building experience.
- **User System:** User accounts with Magic Link login and a simple user bio.
- **Core "Habits" System:** Create, edit, and delete recurring "habits" with a public/private flag. A three-column layout ("Today", "Yesterday", "The Pile") with drag-and-drop functionality. The "Two-Day Rule" governs streak management, and a visible streak counter is displayed on each habit.
- **Core "Todos" System:** Create, edit, and delete one-off "todos", also with a public/private flag.
- **Journal System:** A dual-view journal with "Public" and "Private" tabs. It automatically aggregates notes from completed items into the correct tab. Users can also add free-form text and edit any journal entry at any time. The main UI shows today's entry by default, with a date selector to view past entries.
- **Daily Interaction:** A recording modal appears upon completion of any habit or todo to log an effort score, duration, and notes.
- **Content & Profile:** A motivational quote widget. A shareable public profile page that displays the user's bio, all public habits and their streaks, all public todos, and the complete, searchable Public Journal.

### Growth Features (Post-MVP)

- **Advanced Profiles:** Allow users to customize their public profiles with themes, pinned habits, and achievement showcases.
- **Data Visualizations:** Introduce graphs and charts to show consistency, effort scores over time, and streak history.
- **Notifications:** Implement gentle push notification reminders for habits due today.
- **Social Integrations:** Enable users to automatically post major milestones (e.g., "Reached a 100-day streak!") to social media.
- **Advanced Journaling:** Add advanced search and filtering capabilities to the journal.

### Vision (Future)

- **AI Coach:** An AI agent that provides personalized encouragement, identifies patterns in user behavior, and suggests new habits.
- **Integrations:** Connect with third-party apps to automatically log activities (e.g., pull workouts from a fitness app).
- **"Life Resume":** A beautifully designed, exportable report that summarizes a user's entire journey, achievements, and consistency over years.

---

## Web App Specific Requirements

The project will be a Single Page Application (SPA) built with Next.js, providing a smooth, app-like user experience. It should be optimized for modern browsers (e.g., Chrome, Firefox, Safari). SEO is not a priority for the application itself. The application must support real-time synchronization of user data across different devices.

---

## User Experience Principles

The user experience will be centered around speed and efficiency, with a **"keyboard-first"** design philosophy. The interface should be clean, intuitive, and minimize the need for mouse interaction. The interface must be rich with **micro-interactions and subtle visual cues** to provide clear feedback and make the experience feel alive. This includes visual state changes (e.g., color, animation) when habits move between columns.

### Key Interactions
- Core interactions will be mapped to intuitive keyboard shortcuts (e.g., 'n' for a new task, 'j' to jump to the journal, arrow keys for navigation). While drag-and-drop will be supported for mouse users, keyboard alternatives must always be available and prioritized in the design.
- A key UX component is creating a sense of **positive urgency**. For example, a habit in the 'Yesterday' column should visually change as the 12 am deadline approaches to motivate the user to maintain their streak.

---

## Functional Requirements

This section details the specific functionalities of the application, derived from the scope and principles defined above.

### FR-1: User & Profile Management
- **FR-1.1:** Users must be able to create an account using a Magic Link sent to their email address.
- **FR-1.2:** The system must support user login and logout.
- **FR-1.3:** Users must be able to edit a simple text bio for their profile.
- **FR-1.4:** Each user must have a public profile page accessible via a shareable, unique URL.
- **FR-1.5:** The public profile page must display the user's bio, all public habits, all public todos, and the public journal.

### FR-2: Habit Management (Recurring Habits)
- **FR-2.1:** Users must be able to create a new "habit" with a name via an inline input field within "The Pile" column. New habits default to 'Private' and start with a streak count of 0.
- **FR-2.2:** When creating or editing a habit, users must be able to mark it as "public" or "private".
- **FR-2.3:** Users must be able to edit the name and public/private status of an existing habit.
- **FR-2.4:** Users must be able to delete a habit.
- **FR-2.5:** Each habit chip must display a visible streak counter badge.

### FR-3: Todo Management (One-off Tasks)
- **FR-3.1:** Users must be able to create a new "todo" with a text description.
- **FR-3.2:** When creating or editing a todo, users must be able to mark it as "public" or "private".
- **FR-3.3:** Users must be able to mark a todo as complete.
- **FR-3.4:** Users must be able to delete a todo.

### FR-4: Main Interface & Core Logic
- **FR-4.1:** The main user interface must display three primary columns for managing habits: "Today", "Yesterday", and "The Pile". All columns must sort their habit chips according to the following three-level order: 1. Public habits first, 2. by highest streak count (descending), 3. by name (ascending).
- **FR-4.2:** The daily state change occurs at 12:00 am in the user's local timezone. At this time, any habits completed the previous day appear in the "Yesterday" column.
- **FR-4.3:** Users must be able to drag a habit from "Yesterday" to "Today" to mark it as complete for the current day and continue its active streak.
- **FR-4.4 (The "Two-Day Rule"):** If a habit in the "Yesterday" column is not moved to "Today" by the daily cut-off, it must be automatically moved to "The Pile", unless the "Grace Period" is triggered. When moved to The Pile due to a missed day, its active streak is reset to zero, but the previous streak count is preserved as a 'High Score' and displayed in a visually distinct manner (e.g., grayed out).
- **FR-4.5 (The "Grace Period"):** If a user opens the app for the first time on a new day and has pending habits from the previous day, they must be presented with a dedicated "End of Day Summary" screen.
    - **FR-4.5.1:** This screen must allow the user to mark pending habits from the previous day as complete.
    - **FR-4.5.2:** From this screen, the user must be able to add a new or existing habit to the previous day's record.
    - **FR-4.5.3:** After confirming the summary, the daily state change cycle runs with the corrected data.
- **FR-4.6:** Users must be able to drag a habit from "The Pile" to "Today" to restart it (active streak begins at 1).
- **FR-4.7:** The 'Yesterday' column is read-only; habits cannot be deleted or edited from this column.
- **FR-4.8:** Users can long-press a habit in the 'Today' column to undo the action. This moves the habit back to its previous column ('Yesterday' or 'The Pile') and reverts the streak count to its previous state.

### FR-5: Journaling & Data Entry
- **FR-5.1:** When a habit or todo is marked complete, a modal must appear allowing the user to record details.
    - **FR-5.1.1:** The modal must include an effort score slider with 5 configurable snap-points and labels (e.g., 20: 😮‍💨, 40: ✨, 60: 💪, 80: 🔥, 100: 🤯).
    - **FR-5.1.2:** The modal must include fields for duration and free-form text notes.
    - **FR-5.1.3:** Users must be able to bypass detail entry by pressing `Enter` to log the item with default values.
- **FR-5.2:** The system must provide a dual-view journal with distinct "Public" and "Private" sections.
- **FR-5.3:** Notes from completed public items must be automatically added to the Public Journal.
- **FR-5.4:** Notes from completed private items must be automatically added to the Private Journal.
- **FR-5.5:** Users must be able to add free-form text directly to either the public or private journal.
- **FR-5.6:** Users must be able to edit the content of any journal entry at any time.
- **FR-5.7:** The journal view must default to showing today's entries and provide a date selector to view entries from past dates.
- **FR-5.8:** The public journal displayed on the public profile page must be searchable by its text content.

### FR-6: General UI & UX
- **FR-6.1:** The application must feature a widget that displays a motivational quote.
- **FR-6.2:** All core user actions (e.g., creating items, navigating, completing tasks) must be achievable via keyboard shortcuts.
- **FR-6.3:** The application must function as a Single Page Application (SPA), providing a fluid user experience without full-page reloads for navigation.
- **FR-6.4:** The application must include a prominent theme switcher to allow users to toggle between a light ("Zenith") and a dark ("Monolith") theme.

---

## Non-Functional Requirements

### NFR-1: Performance
- **NFR-1.1:** Public profile pages must achieve a fast load time, specifically when accessed from mobile devices and the in-app browsers of social media applications.
- **NFR-1.2:** The real-time data synchronization feature must be implemented efficiently to ensure low latency and not degrade the overall application performance.

### NFR-2: Security
- **NFR-2.1:** The system must securely implement Magic Link authentication, ensuring that tokens are single-use and expire within a short timeframe.
- **NFR-2.2:** A strict separation between public and private data must be enforced at the database and API level to prevent any leakage of a user's private information.

### NFR-3: Scalability
- **NFR-3.1:** The application will be built on a serverless/scalable architecture (Next.js and Supabase) that is optimized for a free-tier MVP but is capable of handling viral growth with minimal architectural changes.
- **NFR-3.2:** The database schema and queries must be designed to scale efficiently with a large number of users, habits, and journal entries.

### NFR-4: Accessibility
- **NFR-4.1:** The application must be compliant with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standard to be usable by people with a wide range of disabilities.

---

## Implementation Planning

### Epic Breakdown Required

Requirements must be decomposed into epics and bite-sized stories.

**Next Step:** Run `workflow create-epics-and-stories` to create the implementation breakdown.

---

## References

{{#if product_brief_path}}
- Product Brief: {{product_brief_path}}
{{/if}}
{{#if domain_brief_path}}
- Domain Brief: {{domain_brief_path}}
{{/if}}
{{#if research_documents}}
- Research: {{research_documents}}
{{/if}}

---

## Next Steps

1. **Epic & Story Breakdown** - Run: `workflow create-epics-and-stories`
2. **UX Design** (if UI) - Run: `workflow ux-design`
3. **Architecture** - Run: `workflow create-architecture`

---

_This PRD captures the essence of {{project_name}} - {{product_magic_summary}}_

_Created through collaborative discovery between {{user_name}} and AI facilitator._
