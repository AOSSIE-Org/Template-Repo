# Code-to-Structure Mapping

> **Agent Instruction:** Before creating, moving, or deleting any file, consult this mapping. If a directory isn't listed here, do NOT create it without explicit maintainer approval.

## Directory Map

*(Maintainers: Replace the example below with your actual project structure.)*

<!-- TODO: Map every top-level directory to its purpose -->

| Directory | Purpose | Tech |
|-----------|---------|------|
| `frontend/` | Client-side single-page application | React |
| `frontend/components/` | Reusable UI components | React |
| `frontend/pages/` | Route components (map to user URLs) | React Router |
| `frontend/hooks/` | Custom React hooks | React |
| `frontend/utils/` | Frontend helper functions | JS/TS |
| `backend/` | Server-side REST API | Express |
| `backend/controllers/` | HTTP request/response handlers | Express |
| `backend/services/` | Core business logic | Node.js |
| `backend/models/` | Data structures and DB queries | Prisma |
| `backend/middleware/` | Auth, validation, error handling | Express |
| `backend/prisma/` | Database schema and migrations | Prisma |
| `.github/` | CI/CD workflows, issue templates, PR templates | GitHub Actions |
| `.agent/` | Agent context files (this framework) | Markdown |
| `public/` | Static assets (logos, images) | — |

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `.env` | Environment variables (never commit) |
| `.env.example` | Template for environment variables |
| `docker-compose.yml` | Local development services |

## Rules

- **New features** go in the existing directory that matches their purpose (see table above).
- **New utilities** go in the appropriate `utils/` folder (frontend or backend).
- **New API endpoints** need: controller in `controllers/`, service in `services/`, model in `models/`.
- **Tests** mirror source structure: `backend/services/auth.js` → `backend/tests/services/auth.test.js`.

---

*(Maintainers: Update this file whenever new directories or key files are added to the project.)*
