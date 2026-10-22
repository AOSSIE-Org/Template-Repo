# Operational Data

> **Agent Instruction:** Use this file to provide required context when a contributor raises a PR or issue. Provide the correct channel, message template, and mentor tags so contributors communicate properly.

## Service Endpoints

<!-- TODO: Replace with your actual service URLs -->

| Service | URL |
|---------|-----|
| Production | `<production-url>` |
| Staging | `<staging-url>` |
| API Base | `<api-base-url>` |
| Monitoring | `<monitoring-service-and-project>` |

## Discord Communication

### Channels

| Channel | Purpose |
|---------|---------|
| `#development` | Technical discussion, PR/issue updates (**primary channel**) |
| `#general` | General questions, introductions |
| `#help` | Setup issues, troubleshooting |

**Discord Invite:** https://discord.gg/hjUhu33uAn

### Maintainers & Mentors

<!-- TODO: Add your actual maintainer roster -->

| Name | GitHub | Discord | Role |
|------|--------|---------|------|
| Maintainer 1 | `@username` | `@username` | Lead Maintainer |
| Mentor 1 | `@username` | `@username` | Mentor |

## Message Templates

### After Creating a PR

```text
@maintainers I have raised PR #[number].
Please review and let me know the expectations.
Link to PR: [URL]
```

Post in: `#development`

### After Creating an Issue

```text
@maintainers I have raised issue #[number].
Please review and let me know if this is valid.
Link to Issue: [URL]
```

Post in: `#development`

### Asking for Help

```text
@mentor I'm working on issue #[number] and need help with [description].
What I've tried: [brief explanation].
```

Post in: `#help`

> **Rule:** Before asking for help, the contributor must explain what they have already tried. Do NOT just ask "how do I do X?"

## External Service Dependencies

<!-- TODO: List external services your project depends on -->

| Service | Purpose | Docs |
|---------|---------|------|
| GitHub Actions | CI/CD | `.github/workflows/` |
| Vercel | Frontend hosting | Dashboard |
| AWS | Backend hosting | Console |
| Sentry | Error monitoring | Dashboard |

---

*(Maintainers: Keep this file updated with current URLs, channels, and team roster.)*
