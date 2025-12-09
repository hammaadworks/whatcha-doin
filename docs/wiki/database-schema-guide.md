# Database Schema & Architecture Guide

This document provides a comprehensive overview of the **Supabase (PostgreSQL)** database schema for *whatcha-do.in*. It
is designed to help developers understand the data models, relationships, and security policies that power the
application.

---

## 1. Core Architecture Principles

* **User-Centric:** Almost every table is strictly scoped to a `user_id`.
* **Postgres + NoSQL Hybrid:** We use standard relational tables for structured data (Habits, Profiles) and `JSONB` for
  recursive/unstructured data (Actions Tree).
* **Security First:** **Row Level Security (RLS)** is enabled on ALL tables. Users can *only* CRUD their own data.
* **Timezone Aware:** While all timestamps are stored in **UTC** (`timestamptz`), logic often relies on the user's
  stored `timezone` preference.

---

## 2. Table Reference

### `public.users`

**Role:** The central profile table. Syncs with `auth.users` (Supabase Auth).
**One-to-One** with `auth.users`.

| Column                        | Type          | Nullable | Description                                              |
|:------------------------------|:--------------|:---------|:---------------------------------------------------------|
| `id`                          | `uuid`        | NO       | **PK, FK**. Linked to `auth.users.id`.                   |
| `email`                       | `text`        | NO       | User's email (Unique).                                   |
| `username`                    | `text`        | NO       | Unique handle for profile URLs (e.g. `/hammaad`).        |
| `bio`                         | `text`        | YES      | User's markdown bio.                                     |
| `timezone`                    | `text`        | NO       | **Critical.** Defaults to `'UTC'`. Used for daily logic. |
| `grace_screen_shown_for_date` | `date`        | YES      | Tracks if the "Grace Period" screen was shown today.     |
| `created_at`                  | `timestamptz` | NO       | Account creation time.                                   |

---

### `public.habits`

**Role:** Stores the definition and streak state of a recurring habit.

| Column           | Type          | Description                                                  |
|:-----------------|:--------------|:-------------------------------------------------------------|
| `id`             | `uuid`        | **PK**. Auto-generated.                                      |
| `user_id`        | `uuid`        | **FK** to `users`.                                           |
| `name`           | `text`        | Habit title.                                                 |
| `current_streak` | `int`         | Current active streak count.                                 |
| `last_streak`    | `int`         | The streak value before the last reset (for motivation).     |
| `pile_state`     | `text`        | Lifecycle state: `NULL` (Active), `'lively'`, or `'junked'`. |
| `junked_at`      | `timestamptz` | When it moved to the "Junked" pile.                          |
| `is_public`      | `bool`        | Visibility flag.                                             |

---

### `public.habit_completions`

**Role:** An append-only log of every time a user completes a habit. Used for history, charts, and "Grace Period"
recovery.

| Column                | Type          | Description                                |
|:----------------------|:--------------|:-------------------------------------------|
| `id`                  | `uuid`        | **PK**.                                    |
| `habit_id`            | `uuid`        | **FK** to `habits`.                        |
| `user_id`             | `uuid`        | **FK** to `users`.                         |
| `completed_at`        | `timestamptz` | When the button was clicked.               |
| `mood_score`          | `int`         | 0-100 score (Fuel Meter).                  |
| `actual_value_achieved` | `float`       | Actual value recorded (e.g., 5.5 pages).   |
| `goal_at_completion`  | `float`       | Goal value at the time of completion.      |
| `duration_value`      | `float`       | Duration recorded (e.g., 30 for 30 mins).  |
| `duration_unit`       | `text`        | Unit for duration (e.g., 'minutes').       |
| `notes`               | `text`        | Optional reflection.                       |

---

### `public.actions` (Replaces Todos)

**Role:** Stores the user's **entire Action Tree** as a single document.
**Pattern:** "Document Store" (One row per user).

| Column    | Type    | Description                                              |
|:----------|:--------|:---------------------------------------------------------|
| `id`      | `uuid`  | **PK**.                                                  |
| `user_id` | `uuid`  | **FK** to `users`. **UNIQUE constraint**.                |
| `data`    | `jsonb` | **The Tree.** Contains the nested array of action nodes. |

**Why JSONB?**

* Allows **Unlimited Deep Nesting** (Parent -> Child -> Grandchild...).
* Fetching is a single fast query (`select data from actions where user_id = ...`).
* Updates are atomic (save the whole tree).

**JSON Structure Node:**

```json
{
  "id": "uuid",
  "description": "Buy Milk",
  "completed": true,
  "is_public": true,
  "completed_at": "2023-10-27T10:00:00Z",
  "children": [ ...recursive nodes... ]
}
```

---

### `public.identities` (New)

**Role:** Stores the user's "Identity Statements" (e.g., "I am a runner").

| Column        | Type   | Description                                 |
|:--------------|:-------|:--------------------------------------------|
| `id`          | `uuid` | **PK**.                                     |
| `user_id`     | `uuid` | **FK** to `users`.                          |
| `title`       | `text` | The core statement (e.g., "I am a writer"). |
| `description` | `text` | Optional richer description/motivation.     |
| `is_public`   | `bool` | Visibility flag.                            |

---

### `public.habit_identities` (New)

**Role:** Many-to-Many join table linking Habits to Identities.

| Column        | Type   | Description                                      |
|:--------------|:-------|:-------------------------------------------------|
| `habit_id`    | `uuid` | **PK, FK** to `habits`.                          |
| `identity_id` | `uuid` | **PK, FK** to `identities`.                      |
| `user_id`     | `uuid` | **FK** to `users`. Denormalized for simpler RLS. |

---

### `public.targets` (New)

**Role:** Stores monthly target lists (structured like Actions but partitioned by month).
**Pattern:** "Document Store" (One row per user per month).

| Column        | Type          | Description                                                    |
|:--------------|:--------------|:---------------------------------------------------------------|
| `id`          | `uuid`        | **PK**.                                                        |
| `user_id`     | `uuid`        | **FK** to `users`.                                             |
| `target_date` | `date`        | `NULL` = Future/Backlog. `YYYY-MM-01` = Specific Month Bucket. |
| `data`        | `jsonb`       | The nested tree of target items (same schema as Actions).      |
| `created_at`  | `timestamptz` | Creation timestamp.                                            |

**Constraint:** `UNIQUE(user_id, target_date)` ensures only one list per month per user.

---

### `public.journal_entries`

**Role:** Daily text entries. One entry per date per user.

| Column           | Type          | Description                                                    |
|:-----------------|:--------------|:---------------------------------------------------------------|
| `id`             | `uuid`        | **PK**.                                                        |
| `user_id`        | `uuid`        | **FK** to `users`.                                             |
| `entry_date`     | `date`        | The logical date of the entry (e.g. '2023-10-27').             |
| `content`        | `text`        | Markdown content.                                              |
| `is_public`      | `bool`        | Default `false`.                                               |
| `activity_log`   | `jsonb`       | **Read-only.** Stores array of structured activity objects.    |

---

## 3. Security Policies (RLS)

We use a highly optimized RLS strategy.

**The Golden Rule:**
> `USING ((select auth.uid()) = user_id)`

**Why the `(select ...)`?**
Standard RLS like `auth.uid() = user_id` runs the `auth.uid()` function for *every single row* scanned. By wrapping it
in a subquery, Postgres executes it **once**, caches the ID, and reuses it. This is a massive performance optimization
for scale.

**Policies applied to ALL tables:**

1. **SELECT:** Can view own data.
2. **INSERT:** Can insert with own `user_id`.
3. **UPDATE:** Can update own rows.
4. **DELETE:** Can delete own rows.

---

## 4. Triggers & Functions

### `handle_new_user`

* **Trigger:** `AFTER INSERT ON auth.users`
* **Action:** Automatically creates a row in `public.users` with the same ID and email.
* **Logic:** Generates a unique `username` (e.g. `john_doe` or `john_doe_123` if taken).

### `update_updated_at_column`

* **Trigger:** `BEFORE UPDATE` (On `users`, `actions`, `habits`, `identities`, `targets`)
* **Action:** Sets `updated_at = now()`. Keeps timestamps fresh without client intervention.

---

## 5. Data Lifecycle Strategy (Real-Time Activity Journaling & Next Day Clearing)

This document outlines the strategy for implementing real-time activity logging into the user's journal. The goal is to move from a batch-processed "Next Day Clearing" mechanism (where completed items were archived into the journal as text the following day) to an immediate, structured logging system. This new approach stores activity completions (from Actions, Habits, and Targets) in a dedicated, read-only `JSONB` column (`activity_log`) within the `journal_entries` table. This separation ensures that user-editable journal content (`content`) remains untouched while providing an accurate, timestamped record of daily accomplishments.

For **Actions** and **Targets**, we enforce a strict "Lightweight" data policy to prevent database bloat and keep user lists focused.

1.  **Completion & Real-Time Logging:** When an item (Action, Habit, Target) is marked complete, its details are immediately logged to the `activity_log` JSONB array of the relevant `journal_entry` for the current day.
2.  **Unmarking & Deletion from Log (Actions & Targets only):** If an Action or Target is later unmarked, its corresponding entry is **deleted** from the `activity_log` (adhering to the "go big or go home" philosophy where only completed items are recorded).
3.  **Next Day Clearing (Actions & Targets Active Lists):** Upon the "next day" (after midnight in the user's timezone), all Actions and Targets that were marked as completed on the *previous day* are **permanently deleted** from their respective active data structures (e.g., `actions.data` JSONB tree, `targets.data` JSONB tree). They will no longer appear in the UI's active lists. Their historical record is now solely within `journal_entries.activity_log`.
4.  **Habit Lifecycle (Distinct from Actions/Targets Clearing):** Habits do not get "deleted" from their main UI sections (Today, Yesterday, The Pile) upon completion. Instead, their *state* and *location* on the board change according to the "Two-Day Rule" and "Grace Period" logic. Their completion events are logged to `activity_log` in real-time.

This ensures the active `jsonb` documents for Actions and Targets remain small and performant, while the `activity_log` serves as the immediate and permanent historical record of accomplishments. The `journal_entries.content` column remains exclusively for user's free-form reflections.
