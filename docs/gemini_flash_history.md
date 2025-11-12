# Gemini Flash History: "whatcha-doin" UX Design Session Summary

**Date:** 2025-11-11
**Agent:** Sally, UX Designer
**User:** hammaadworks

---

## 1. Project Vision & Core Philosophy

*   **Project Name:** "whatcha-doin"
*   **Defining Experience:** "It's the app where you build your identity with consistent habits one by one."
*   **User Persona:** "The Ambitious Underachiever" - high-aspiration individuals struggling with procrastination and "all-or-nothing" mentality.
*   **Core Principle:** The app is an "identity-building toolkit," not just a habit tracker. Focus on "no friction, no stress, only pure productivity."

---

## 2. Main UI Structure (Top to Bottom)

1.  User Info/Bio
2.  **"Actions" Section** (formerly "Todos")
3.  **"Habits" Section** (The Identity Momentum Board: Today, Yesterday, The Pile)
4.  **Journal Section** (Daily entry with date selector)
5.  Motivational Quote
6.  Footer (minimal)

---

## 3. Design Principles & Aesthetic

*   **Aesthetic:** "Professional, tech-savvy, out-of-the-box wow design" with gradients, artsy looks, and fluid animations. Inspired by Framer, Motion, and `supermemory.ai`.
*   **Interaction:** "Keyboard-first" design philosophy, with robust `Tab`/`Space`/`Enter` navigation. Custom shortcuts only for high-frequency actions.
*   **Emotion:** A blend of empowerment, pride, focus, and positive urgency. Micro-interactions and subtle cues are paramount.

---

## 4. Key Design Decisions & Rationale

### 4.1 Design System & Theming

*   **Primary Design System:** `shadcn/ui` (for foundational components).
*   **Secondary Animation Library:** `Aceternity UI` (for "wow" moments).
*   **Dual-Theme Strategy:**
    *   **Light Mode:** "Zenith" theme (clean, energetic, pastel gradients).
    *   **Dark Mode:** "Monolith" theme (sharp, focused, bold accent).
    *   **Feature:** Prominent Light/Dark Mode switcher.

### 4.2 Main Board Layout & Interaction

*   **Desktop Layout:** Two-row structure. Top row: `Today` | `Yesterday`. Bottom row: full-width `The Pile`.
    *   **Interaction:** `Drag-and-Drop`.
*   **Mobile Layout:** Single-column, stacked: `Today` then `Yesterday` then `The Pile`.
    *   **Interaction:** `Tap-to-Move` (tap chip, then tap destination column).

### 4.3 "Habits" System (Identity Momentum Board)

*   **Core Logic:** Habits are single entities that **move** between columns (not copied).
*   **State Change Cycle (12 AM):** `Today` -> `Yesterday` -> `The Pile` (if not completed).
*   **Streak Logic:** Preserved as "ghost" streak in `The Pile`.
*   **Undo:** Long-press on `Today` chip reverts to previous state/streak.
*   **Sorting (`The Pile`):** Public first, then Streak Count (DESC), then Name (ASC).
*   **Habit Chip:** Displays name, streak badge, and `🌐 Public` / `🔒 Private` icon.

### 4.4 "Grace Period" Feature

*   **Tone:** "Gentle Reminder" (empathetic, non-judgmental).
*   **Screen:** "End of Day Summary" screen.
    *   **Content:** Shows only pending habits in a compact, tappable grid.
    *   **Action:** Tap to mark complete.
    *   **Edge Case:** `+ Add another habit you completed` button allows adding from `The Pile` or creating new for previous day.
    *   **Confirmation:** Single `Finish & Start [New Day]` button.

### 4.5 "Positive Urgency" UI

*   **Concept:** "Ambient Animated Background" for the `Yesterday` column.
*   **Visuals:** Slow, shifting gradient (cool colors -> warm colors) in the column's background.
*   **Interaction:** Tooltip on hover shows time remaining.
*   **Rationale:** High-end, non-distracting "wow" factor.

### 4.6 "Actions" (Todos) System

*   **Name:** "Actions" (replaces "Todos").
*   **Location:** Separate section above Habits.
*   **Creation/Editing:** "Intelligent Notepad" concept.
    *   Inline input field at the **bottom** of the list.
    *   `Tab` for 2-level deep sub-todos.
    *   `🌐/🔒` privacy toggle on hover.
*   **Sorting:** Public first, then Creation Time (ASC).
*   **Completion:** "Teleport-to-Journal" animation.
    *   Todo fades out from "Actions" section.
    *   Fades in/pops into "Completed Todos" in Journal.
    *   Intuitive, no teaching required.

### 4.7 Journal System

*   **Structure:** "Two-Sided Journal" with `[ 🌐 Public Journal ]` and `[ 🔒 Private Journal ]` tabs.
*   **Content:** Each daily entry has three sections: User-typed notes (Markdown editor), Completed Todos, Habit Notes.
*   **Privacy Logic:**
    *   Privacy of completed Habits/Todos notes is determined by their original status.
    *   Privacy of free-form notes is determined by the active tab.
    *   Absolute separation: Public profile only sees `🌐 Public Journal` content.

---

## 5. Outstanding Gaps (from PRD)

*   User Info/Bio editing UI.
*   Public Profile screen design.
*   Edit/Delete flows for Habits/Actions.
*   Journal screen layout, navigation, date selector, search.
*   Motivational Quote Widget placement.
*   Specific Keyboard Shortcuts (beyond basic navigation).
*   Sorting ambiguity for `Today`/`Yesterday` columns.

---

## 6. Next Steps

*   Address outstanding gaps to bring UX spec to 100% PRD coverage.
*   Conclude `create-ux-design` workflow.
*   Engage `architect` agent for `create-architecture` workflow.
