# Contributor Agent Context Framework — Implementation Plan

## Architecture

Two layers:
1. **`.agent/`** — project-specific context (stays in each repo, maintainers customize)
2. **`skills/`** — org-level governance (separate repo, shared across all AOSSIE projects)
3. **Editor redirects** — lightweight entry points that all point to `.agent/` and `skills/`

## Pre-Made Sources to Adapt

> [!TIP]
> Instead of writing from scratch, we adapt content from these proven open-source resources:

| Source | What to take | For which file |
|--------|-------------|----------------|
| [AGENTS.md spec](https://agents.md) (60k+ repos) | Structure pattern: dev environment, testing, PR instructions | `AGENTS.md`, all redirect files |
| [apache/airflow AGENTS.md](https://github.com/apache/airflow/blob/-/AGENTS.md) | Real-world example of mature project agent config | `.agent/core/architecture.md`, `setup.md` |
| [openai/codex AGENTS.md](https://github.com/openai/codex/blob/-/AGENTS.md) | Build/test/lint pattern structure | `.agent/instructions/testing.md` |
| [Anthropic skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | SKILL.md format: YAML frontmatter, progressive disclosure, references/ | All `SKILL.md` files |
| [CodeRabbit skills](https://github.com/coderabbitai/skills) | Supported agent paths reference | Editor redirect files (done ✅) |
| Existing content in repo | Current `.agent/` and `skills/` files have good base content | All files |

---

## Completed ✅

### File Structure — All empty files created

```
.agent/
├── core/
│   ├── architecture.md         (has content)
│   ├── edge-cases.md           (has content)
│   ├── code-mapping.md         (empty)
│   └── examples.md             (empty)
├── instructions/
│   ├── setup.md                (has content)
│   ├── deployment.md           (empty)
│   └── testing.md              (empty)
└── info/
    └── operational-data.md     (has content)

skills/
├── GIT-DIS-AIPolicy/
│   ├── SKILL.md                (has content)
│   └── references/
│       ├── ai-policy-rules.md          (empty)
│       ├── communication-templates.md  (empty)
│       └── pr-issue-formatting.md      (empty)
├── project-template/
│   ├── SKILL.md                (has content)
│   └── references/
│       ├── nextjs-standards.md         (empty)
│       ├── microservice-standards.md   (empty)
│       ├── web3-standards.md           (empty)
│       └── rest-standards.md           (empty)
└── contributor-onboarding/
    └── SKILL.md                (empty)
```

### Editor Redirect Files — All point to `.agent/` and `skills/`

| File | Agent | Status |
|------|-------|--------|
| `.github/copilot-instructions.md` | GitHub Copilot | ✅ has redirect content |
| `CLAUDE.md` | Claude Code | ✅ has redirect content |
| `.cursorrules` | Cursor | ✅ has redirect content |
| `.windsurfrules` | Windsurf | ✅ has redirect content |
| `.clinerules` | Cline | ✅ has redirect content |
| `AGENTS.md` | Codex / generic | ✅ has redirect content |

---

## Remaining Work

### Phase 1: Project-Level Content (`.agent/`)

| File | Action | Source to adapt |
|------|--------|----------------|
| `architecture.md` | Enrich existing → stronger directive, clearer sections, TODO markers | airflow AGENTS.md pattern |
| `edge-cases.md` | Enrich existing → severity tags, categories | Existing + expand |
| `code-mapping.md` | Write new → directory-to-purpose map template | Existing architecture.md extract |
| `examples.md` | Write new → ✅ Do / ❌ Don't patterns | Existing edge-cases.md extract |
| `setup.md` | Enrich existing → richer template sections | codex AGENTS.md pattern |
| `deployment.md` | Write new → CI/CD, staging, production | Existing setup.md extract |
| `testing.md` | Write new → test commands, coverage | codex AGENTS.md pattern |
| `operational-data.md` | Enrich existing → more templates, mentor roster | Existing + expand |

### Phase 2: Organization Skills (`skills/`)

| File | Action | Source to adapt |
|------|--------|----------------|
| `GIT-DIS-AIPolicy/SKILL.md` | Rewrite → Anthropic YAML frontmatter format | Existing content + Anthropic pattern |
| `references/ai-policy-rules.md` | Write new → detailed policy with examples | Extract from existing SKILL.md |
| `references/communication-templates.md` | Write new → all message templates | Extract from existing operational-data.md |
| `references/pr-issue-formatting.md` | Write new → good vs bad examples | Existing PR_TEMPLATE + expand |
| `project-template/SKILL.md` | Rewrite → slim + point to references | Existing content + Anthropic pattern |
| `references/nextjs-standards.md` | Write new | Extract from existing SKILL.md |
| `references/microservice-standards.md` | Write new | Extract from existing SKILL.md |
| `references/web3-standards.md` | Write new | Extract from existing SKILL.md |
| `references/rest-standards.md` | Write new | Extract from existing SKILL.md |
| `contributor-onboarding/SKILL.md` | Write new → context loading orchestrator | New, references all other files |

## Verification Plan

1. Structure check — all files exist with correct paths
2. Cross-reference check — all file paths in SKILL.md files are valid
3. YAML frontmatter check — every SKILL.md has `description` field
4. Simulation test — test contributor prompts against the framework
