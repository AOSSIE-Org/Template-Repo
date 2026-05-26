# Core Project Architecture

> **Agent Instruction:** Do NOT guess or invent the project architecture. You MUST consult this file before adding features, creating files, or suggesting structural changes. If something isn't documented here, ask the contributor to check with maintainers — do NOT assume.

## Architecture Overview

*(Maintainers: Replace the example below with your actual project architecture.)*

<!-- TODO: Describe your project's architecture pattern -->
<!-- Examples: Monolithic MVC, Microservices, Serverless, Monorepo, etc. -->

This repository follows a modular architecture.

- **Frontend:** `/frontend` — React SPA using functional components and hooks.
- **Backend:** `/backend` — Express REST API.
- **Database:** PostgreSQL with Prisma ORM at `/backend/prisma/schema.prisma`.

## Architecture Boundaries

*(Adapted from [apache/airflow](https://github.com/apache/airflow/blob/-/AGENTS.md) pattern)*

<!-- TODO: Define clear boundaries between components -->
<!-- This prevents agents from crossing module boundaries incorrectly -->

1. Frontend communicates with Backend **only** via REST API calls.
2. Backend controllers handle HTTP requests — **never contain business logic directly**.
3. Business logic lives in `/backend/services/` — controllers delegate to services.
4. Database access happens **only** through `/backend/models/` — services never write raw SQL.
5. Shared utilities in `/utils/` are used across modules — **changing them requires updating all callers**.

## Conceptual Flow

```
User → frontend/pages/ → REST call → backend/controllers/
    → backend/services/ (business logic)
    → backend/models/ (data access)
    → Response → frontend UI state
```

## Dependency Map

<!-- TODO: List key dependencies and their versions -->

| Dependency | Purpose | Location |
|-----------|---------|----------|
| React | Frontend UI | `frontend/package.json` |
| Express | Backend API | `backend/package.json` |
| Prisma | ORM / DB access | `backend/prisma/` |

## How to Update This File

*(For Maintainers)*

Update this file whenever:
- A new module or service is added
- Architecture boundaries change
- A new database or external service is integrated
- The deployment topology changes

Keep sections concise. Agents read this before every code change — bloated docs slow down iteration.
