# Edge Cases & Agent Lessons Learned

> **Agent Instruction:** This file contains specific errors previously made by AI agents in this project. You MUST check this file before writing new code to avoid repeating historical mistakes. This is a living document — maintainers add entries whenever an agent makes a significant mistake in a PR.

## 🔴 Critical — Will Break Things

- **Function Signatures:** If you change any function inside `utils/` or shared modules, you MUST search the entire codebase for all callers and update them. Changing input/output parameters without updating callers is forbidden.
- **Database Schema:** Never modify `prisma.schema` (or equivalent) without running the migration command and committing the migration files. See `.agent/instructions/setup.md` for the exact command.

## 🟡 Caution — Common Agent Mistakes

### Folder Structure
- Do NOT add a `/src` folder if none exists. Check the root — this project uses `/frontend` and `/backend`.
- Do NOT create new top-level directories without explicit maintainer approval.
- Do NOT move existing files to "better" locations without being asked.

### Dependencies
- Do NOT assume which packages are installed. Always check `package.json` (or equivalent) first.
- Do NOT add new dependencies without checking if an existing one already covers the use case.
- Example: Do not assume `axios` is available — the project might use native `fetch`.

### External Services
- Do NOT create mock files (e.g., `mockStripe.js`) for external services unless explicitly instructed. We use dedicated testing environments with real API sandboxes.
- Do NOT hardcode API keys, tokens, or secrets. Always use environment variables.

### Testing
- Do NOT skip writing tests for new features. Every new behavior needs at least one test.
- Do NOT use `unittest.TestCase` style if the project uses `pytest` patterns (or vice versa).
- Mirror test file locations to source: `backend/services/auth.js` → `backend/tests/services/auth.test.js`.

## 🟢 Info — Good to Know

- Commit messages follow conventional format: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- PRs without Discord notification will not be reviewed (see `.agent/info/operational-data.md`).
- AI-generated code must be disclosed in PR description.

---

*(Maintainers: Add to this file whenever an AI agent makes a significant architectural mistake or incorrect assumption in a PR. Use the severity tags above.)*
