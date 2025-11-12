# Architecture

## Executive Summary

{{executive_summary}}

## Project Initialization

The project will be initialized using the `npx create-next-app@latest` command, which provides a robust and modern foundation for our Next.js application.

**Initialization Command:**
```bash
npx create-next-app@latest whatcha-doin --typescript --tailwind --eslint --app
```

**Starter-Provided Architectural Decisions:**
This starter template provides the following foundational architectural decisions:
*   **Language:** TypeScript
*   **Styling Solution:** Tailwind CSS
*   **Linting/Formatting:** ESLint
*   **Routing:** Next.js App Router
*   **Build Tooling:** Next.js (utilizing its integrated Webpack/Turbopack)
*   **Initial Project Structure:** Adheres to Next.js App Router conventions.

This approach accelerates development by leveraging established best practices and a well-maintained ecosystem. The first implementation story will involve executing this command to set up the project.

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Data Persistence | Supabase (PostgreSQL) | 2.80.0 | All data-related epics (Habits, Todos, Journal, User Management) | Managed PostgreSQL, built-in Auth (Magic Link), Real-time, File Storage, scalability, rapid development, aligns with free-tier MVP. |
| Authentication | Supabase Auth (Magic Link) | 2.80.0 | Security and User Management epics | Built-in with Supabase, supports Magic Link as required, simplifies auth implementation. |
| Real-time | Supabase Realtime | 2.80.0 | Real-time synchronization of user data | Built-in with Supabase, provides efficient live updates for habits/todos. |
| Email Service | Rely on Supabase Auth's built-in email | N/A | User Management (authentication) | Frugality, simplicity, Supabase Auth handles core requirement for MVP; defer dedicated service for future needs. |
| Deployment Target | Vercel | N/A | All epics | Optimized for Next.js, generous free tier for MVP, seamless integration with GitHub for CI/CD (GitHub Actions). |
| Search Solution | Deferred | N/A | Journal | PRD updated to remove search requirement (FR-5.8); journal navigation is via date picker only for MVP. |
| Background Jobs | Hybrid: Client-side trigger + Supabase Database Functions (PostgreSQL) | N/A | Habit Management, Grace Period | Client-side (Next.js) triggers Grace Period on app open/login for local timezone. Supabase Database Functions (PostgreSQL) enforce "Two-Day Rule" and validate state changes server-side, handling multi-day absences and ensuring data integrity. Grace screen appears once per day, and this is the most frugal/cleanest solution for MVP. |
| Error Handling Strategy | User-facing: Inline/Toast/Error Page; Internal: Sentry (frontend), Supabase logs (backend), Lark webhook (critical alerts) | N/A | All epics | Aligns with UX principles, ensures proactive monitoring, and leverages cost-effective solutions. |
| Logging Approach | Structured logging with standard levels; Supabase logs (backend), Sentry (frontend), Lark webhook (critical alerts) | N/A | All epics | Ensures maintainability, debuggability, and centralized visibility of application health. |
| Date/Time Handling | Store UTC in DB, transmit ISO 8601 UTC strings, client converts for local display/input, server-side calculations use UTC with user's stored timezone. | N/A | All epics | Ensures data integrity, avoids timezone bugs, provides correct local user experience, and maintains server as source of truth. |

## Consistency Rules

### Naming Conventions

{{naming_conventions}}

### Code Organization

{{code_organization_patterns}}

### Error Handling

*   **User-Facing Errors:**
    *   **Inline Validation:** For form inputs, consistent with `shadcn/ui` patterns.
    *   **Toast Notifications:** For non-critical success/failure feedback, aligning with the 'Professional, tech-savvy, out-of-the-box wow design' aesthetic.
    *   **Error Page:** For critical, unrecoverable errors, a clear, user-friendly error page with guidance.
*   **Internal Error Reporting:**
    *   **Frontend (Next.js):** Sentry (free tier) for capturing unhandled exceptions and providing detailed stack traces.
    *   **Supabase Functions (PostgreSQL):** Errors logged to Supabase's internal logs.
    *   **Centralized Alerts:** All significant errors from both frontend and Supabase functions will be forwarded to the provided Lark chat webhook for real-time notification.

### Logging Strategy

*   **Structured Logging:** Implement a consistent, structured logging mechanism across the application.
*   **Log Levels:** Utilize standard log levels (DEBUG, INFO, WARN, ERROR, FATAL) to control verbosity.
*   **Frontend:** Use a structured logging approach (e.g., `console.log` with structured objects for MVP, or a library like `pino` if needed) to include relevant context (user ID, session ID, component name).
*   **Supabase Functions (PostgreSQL):** Leverage PostgreSQL's `RAISE NOTICE` or `RAISE WARNING` for structured logging within functions, appearing in Supabase logs.
*   **Alerting:** Critical errors will trigger alerts via the Lark chat webhook.

## Data Architecture

{{data_models_and_relationships}}

## API Contracts

{{api_specifications}}

## Security Architecture

{{security_approach}}

## Performance Considerations

{{performance_strategies}}

## Deployment Architecture

The application will be deployed on **Vercel**. This choice is driven by its deep integration and optimization for Next.js applications, offering a streamlined deployment experience and excellent performance. Vercel's generous free tier is well-suited for the MVP, and its serverless architecture provides inherent scalability.

## Development Environment

### Prerequisites

{{development_prerequisites}}

### Setup Commands

```bash
{{setup_commands}}
```

### CI/CD

*   **Platform:** GitHub Actions
*   **Purpose:** Automate testing, building, and deployment to Vercel.

## Architecture Decision Records (ADRs)

{{key_architecture_decisions}}

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-12_
_For: hammaadworks_
