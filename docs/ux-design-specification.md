# whatcha-doin UX Design Specification

_Created on 2025-11-11 by hammaadworks_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

{{project_vision}}

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Primary Design System:** `shadcn/ui` will be used for the foundational component library (buttons, forms, cards, etc.).

- **Rationale:** It is highly customizable, accessible, and aligns with the modern, tech-savvy aesthetic. Its philosophy is a perfect match for a Next.js and Tailwind CSS stack.

**Secondary Animation Library:** `Aceternity UI` will be used for specific, high-impact "wow" moments and complex animated components.

- **Rationale:** This provides the unique, "artsy," and fluid interactions requested, setting the app apart from standard designs.

This hybrid approach provides a professional, accessible base while enabling the unique visual flair required by the product vision.

---

## 2. Core User Experience

### 2.1 Defining Experience

The core experience of the application is captured in the following sentence:

> **"It's the app where you build your identity with consistent habits one by one."**

### 2.2 Novel UX Patterns

The primary interface of the application is a novel UX pattern named the **"Identity Momentum Board"**. It is not a standard Kanban board or to-do list; it is a state machine that visually represents the user's consistency and momentum.

#### Core Components

- **Today Column:** Contains habits completed on the current day.
- **Yesterday Column:** Contains habits completed on the previous day. This column is **read-only**.
- **The Pile Column:** Contains all inactive or "missed" habits.

#### Core Logic & Rules

1.  **State Change Cycle (12:00 AM User's Local Time):**
    - Habits in `Today` automatically move to `Yesterday`.
    - Habits in `Yesterday` (that were not moved to `Today` again) automatically move to `The Pile`. The streak count is preserved as a "ghost" streak to show what was lost.
2.  **Interaction Logic:**
    - **Continue Streak:** Drag a habit from `Yesterday` to `Today`.
    - **Revive Habit:** Drag a habit from `The Pile` to `Today`.
    - **Undo:** A long-press on a habit in `Today` moves it back to its original column (`Yesterday` or `The Pile`) and reverts the streak count.
3.  **Sorting Logic for `The Pile`:** This column has a specific three-level sorting order:
    1.  **Public** habits appear first.
    2.  Then, sort by **Streak Count** (descending).
    3.  Finally, sort by **Habit Name** (ascending).

#### The "Grace Period" Feature

To balance discipline with real-world flexibility, a "Grace Period" is granted to users who may have forgotten to log an activity before midnight.

- **Trigger:** A user opens the app for the first time on a new day (e.g., Wednesday morning) and has pending habits from the previous day (Tuesday).
- **Experience:** The user is presented with a dedicated "End of Day Summary" screen for the previous day.
  - **Content:** This screen is focused and scalable, showing only the **pending habits** from the previous day in a compact grid.
  - **Action:** The user can tap each pending habit they completed to mark it as done.
  - **Edge Case:** The screen includes a `+ Add another habit...` button. This opens an overlay showing `The Pile` AND a `+ Create New Habit` button, allowing the user to add a previously unlisted or new habit to the previous day's record.
- **Confirmation:** After resolving their pending habits, the user clicks a single `Finish & Start [New Day]` button, which runs the nightly cycle with the corrected data and transitions them to the fresh board for the current day.

#### Positive Urgency UI: The "Ambient Animated Background"

To create a sense of "positive urgency" without being distracting, the `Yesterday` column itself will become a living, ambient visual cue as the daily deadline approaches.

-   **Visual Concept:** The background of the entire `Yesterday` column will feature a beautiful, slowly shifting, **animated gradient**. This is not a repetitive pulse on individual chips, but a subtle, mesmerizing effect like an aurora borealis or a slowly shifting nebula.
-   **Progression:**
    -   **Warning State (e.g., after 6 PM):** The animated gradient subtly fades into the background of the column, using cooler, calmer colors (e.g., blues and purples from the "Supernova" theme).
    -   **Urgent State (e.g., after 10 PM):** As the deadline approaches, the animated gradient slowly shifts to warmer, more vibrant colors (e.g., pinks and oranges from the "Zenith" theme). The animation might become a fraction faster, subtly increasing the sense of urgency.
-   **Interaction:** When the user hovers over any habit chip within the `Yesterday` column, a tooltip will appear, clearly stating the time remaining until the deadline (e.g., "Streak ends in 3 hours").
-   **Rationale:** This approach delivers a high-end, "wow" visual effect that is ambient and non-distracting. It creates a powerful mood and sense of urgency through subtle, artistic means, making the application feel alive and premium.

---

## 3. Visual Foundation

### 3.1 Color System

A sophisticated dual-theme strategy will be implemented to allow users to choose the experience that best suits their mood and work style.

- **Light Mode:** The **"Zenith"** theme will be used. It features a clean, bright interface with soft, motivational pastel gradients, creating an energetic and inspirational feel.
- **Dark Mode:** The **"Monolith"** theme will be used. It features a sharp, focused, near-monochromatic interface with a single bold accent color, creating a disciplined and professional feel.
- **Feature:** The application will feature a prominent **Light/Dark Mode switcher**, allowing users to toggle between the two themes at any time.

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

---

## 4. Design Direction

### 4.1 Chosen Design Approach

A hybrid, platform-aware design direction has been chosen to ensure the best possible user experience on both desktop and mobile devices.

### Desktop Design Direction

- **Layout:** A two-row structure.
  - **Top Row:** Contains two columns of equal prominence: `Today` and `Yesterday`.
  - **Bottom Row:** Contains a single, full-width column for `The Pile`.
- **Rationale:** This layout gives primary focus to the active and recently-active habits, while providing ample space for the potentially large list of inactive habits in `The Pile`. It allows for easy and ergonomic upward dragging from `The Pile` to the `Today` column.
- **Core Interaction:** `Drag-and-Drop`. The larger screen real estate and mouse pointer make dragging a fast and intuitive primary interaction.

### Mobile Design Direction

- **Layout:** A single-column, vertically stacked layout.
  - The order is `Today` at the top, followed by `Yesterday`, and finally `The Pile`.
- **Rationale:** This provides a clean, scannable, and thumb-friendly layout that is natural for mobile devices. It respects the "Today in focus" principle.
- **Core Interaction:** `Tap-to-Move`. To solve the clumsiness of dragging on a small screen, a tap-based system will be used. A user taps a habit in `Yesterday` or `The Pile`, which selects it, and then taps the `Today` area to move it. This is faster, more precise, and more accessible.

**Interactive Mockups:**

- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---

## 5. User Journey Flows

### 5.1 Journey: Creating a New Habit

This journey is designed for speed and efficiency, adhering to the "keyboard-first" principle. It allows users to add new habits without leaving the context of their main board.

**Trigger:** The user either clicks the `+ Create New Habit` button located within `The Pile` column, or uses the keyboard shortcut `a`.

**Experience: The "Inline Input" Flow**

1.  **Animation:** Upon trigger, a new input row smoothly appears at the top of `The Pile`'s list. The text input field is immediately focused, allowing the user to start typing without any extra clicks.
2.  **Interface Content:**
    - **Name Input:** A clean text field for the habit name.
    - **Public/Private Toggle:** Directly next to the input field is a simple toggle showing the `🌐 Public` and `🔒 Private` icons. The default is `Private`. The user can `Tab` to it and press `Space` or `Enter` to switch.
3.  **Confirmation:** The user hits `Enter` to confirm the new habit. Pressing `Escape` cancels the creation.
4.  **Feedback:** Upon confirmation, the input row disappears, and the newly created Habit Chip animates gracefully into its correctly sorted position within `The Pile` list. The new chip starts with a streak of `0`.

### 5.2 Journey: Recording a Completed Habit

This journey is the core positive feedback loop of the application. It is designed to be a moment of celebration and reflection, not a chore.

**Trigger:** The user successfully moves a Habit Chip into the `Today` column via either "Drag-and-Drop" (Desktop) or "Tap-to-Move" (Mobile).

**Desktop Experience: The "Morphing Card"**

1.  **Animation:** Upon drop, the Habit Chip does not just disappear. It smoothly and fluidly expands in place, morphing into a larger card-like interface. The background of the app dims slightly to bring this card into focus.
2.  **Interface Content:**
    - **Dynamic Headline:** A personalized title reads, "How was your [Habit Name]?"
    - **Streak Context:** Directly below the headline, a subtle text element builds anticipation: "This will be day #[Number] in a row."
    - **"Gradient Arc" Intensity Slider:** A large, visually engaging semi-circle slider allows the user to set their effort. The arc is rendered with the theme's primary gradient, which becomes brighter and more intense as the value increases. The slider has 5 distinct, labeled snap-points:
      - **20:** 😮‍💨 (Phew, just made it)
      - **40:** ✨ (Good vibes)
      - **60:** 💪 (Solid effort)
      - **80:** 🔥 (On fire)
      - **100:** 🤯 (Crushed it!)
        _Design Note: These labels, emojis, and values should be easily configurable in the code._
    - **Inputs:** Clean, simple text fields for `Duration` and `Notes`. The Notes field will have a ✍️ icon to reinforce its connection to the journal.
    - **Primary Action:** A prominent button with the encouraging label **"Lock it in"**.
3.  **Completion:**
    - Upon clicking "Lock it in", the card fluidly morphs back down into the small Habit Chip.
    - As it settles into place in the `Today` column, the streak number on its badge animates with a "spin" or "flip" to the new number (e.g., 12 -> 13), providing clear, celebratory feedback.
4.  **Quick Exit:** For power users, pressing `Enter` immediately after the card appears will bypass the detail entry, log the habit with a default intensity, and complete the animation.

**Mobile Experience: The "Immersive Screen"**

1.  **Animation:** After the user completes the "Tap-to-Move" action, the application transitions (e.g., with a slide or zoom effect) to a dedicated, full-screen "Recording" view.
2.  **Interface Content:** This screen contains the exact same elements as the desktop card (Dynamic Headline, Streak Context, Gradient Arc Slider, Inputs, and "Lock it in" button), but optimized for a vertical, full-screen layout.
3.  **Completion:** Upon tapping "Lock it in", the screen transitions smoothly back to the main board view, where the user can see their updated chip in the `Today` column.

---

## 6. Component Library

### 6.1 Component Strategy

The component strategy will leverage the foundational components from `shadcn/ui` and supplement them with custom-designed components for the app's unique features.

### 6.1 Critical Custom Component: The "Habit Chip"

The **Habit Chip** is the most important and interactive component in the application. It is the visual representation of a single habit and must convey its status at a glance.

**Anatomy:**

- **Habit Name:** The primary text label of the chip (e.g., "Workout").
- **Streak Badge:** A visually prominent badge that displays the current streak count for the habit. This will be a key element for animation during the "Recording" journey.
- **Status Icon:** A small, subtle icon on the right-hand side of the chip to indicate its privacy status.
  - `🌐` **(Globe):** Indicates a **Public** habit, visible on the user's public profile.
  - `🔒` **(Lock):** Indicates a **Private** habit, visible only to the user.

**Behavior:**

- The chip is the primary element for all core interactions: Drag-and-Drop (Desktop), Tap-to-Move (Mobile), and Long-Press (to undo).
- Its visual appearance (color, border, etc.) will change based on its location (`Today`, `Yesterday`, `The Pile`) and state (e.g., the "Urgency" state before a streak is lost).

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules

{{ux_pattern_decisions}}

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

{{responsive_accessibility_strategy}}

---

## 9. Implementation Guidance

### 9.1 Completion Summary

{{completion_summary}}

---

## Appendix

### Related Documents

- Product Requirements: `{{prd_file}}`
- Product Brief: `{{brief_file}}`
- Brainstorming: `{{brainstorm_file}}`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: ux-color-themes.html

  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: ux-design-directions.html
  - Interactive HTML with 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Optional Enhancement Deliverables

_This section will be populated if additional UX artifacts are generated through follow-up workflows._

<!-- Additional deliverables added here by other workflows -->

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context

### Version History

| Date       | Version | Changes                         | Author       |
| ---------- | ------- | ------------------------------- | ------------ |
| 2025-11-11 | 1.0     | Initial UX Design Specification | hammaadworks |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._
