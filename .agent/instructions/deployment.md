# Deployment & CI/CD

> **Agent Instruction:** Do NOT guess deployment steps. Use ONLY what is documented here. If deployment info is missing, tell the contributor to consult maintainers.

## CI/CD Pipeline

All CI/CD workflows are in `.github/workflows/`.

<!-- TODO: List your actual CI/CD workflows -->

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push / PR to `main` | Lint, test, build |
| `deploy.yml` | Merge to `main` | Deploy to production |

## Environments

| Environment | URL | Branch | Auto-deploy |
|-------------|-----|--------|-------------|
| Development | `http://localhost:3000` | local | — |
| Staging | `https://staging.aossie.org` | `develop` | Yes |
| Production | `https://app.aossie.org` | `main` | Yes |

## Deployment Checklist

Before merging to `main`:

- [ ] All CI checks pass
- [ ] PR is reviewed and approved
- [ ] No console.log statements left
- [ ] Environment variables are set in production
- [ ] Database migrations are committed (if schema changed)
- [ ] Discord notification sent in `#development`

## Infrastructure

<!-- TODO: Document your actual infrastructure -->

| Service | Provider | Notes |
|---------|----------|-------|
| Frontend hosting | Vercel | Auto-deploys on merge to `main` |
| Backend hosting | AWS App Runner | Auto-deploys on merge to `main` |
| Database | AWS RDS | PostgreSQL managed instance |
| Monitoring | Sentry | Error tracking |

## Rollback

If a deployment causes issues:

1. Revert the merge commit on `main`
2. Push the revert — auto-deploy will roll back
3. Notify maintainers in `#development` Discord channel

---

*(Maintainers: Update this with your actual deployment infrastructure and workflows.)*
