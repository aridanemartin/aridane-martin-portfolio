---
title: "Agent Skills Part 2: Patterns, Architecture & Tooling"
subtitle: "Master the art of dynamic context 🎯"
description: "Deep dive into Agent Skills best practices, real-world patterns, editor conventions, npm-like installation workflows, and security considerations for building production-ready AI workflows."
publishDate: 2026-01-18
timeToRead: 6
tags:
  - Productivity
  - AI
  - GitHub Copilot
  - Agents
  - SKILL.md
author: "Aridane Martín"
img: "./_images/agentSkillsBestPracticesCover.webp"
img_alt: "Advanced Agent Skills patterns and architecture for AI-assisted development"
ogImage: "/assets/og/agentSkillsBestPracticesCover.jpg"
---

This is Part 2 of the Agent Skills series. If you're new to Agent Skills, start with [Part 1: Getting Started with SKILL.md](/blog/agent-skills-getting-started) to learn the fundamentals: what SKILL.md is, how progressive disclosure works, and when to use skills vs. rules.

---

> 🎯 **The goal:** Master advanced patterns for writing, organizing, and distributing Agent Skills across your toolchain.

This guide covers:
- **Best practices** for writing effective skills
- **Real-world use cases** across 7 categories
- **Editor directory conventions** (where to place skills for each tool)
- **npm-like installation** using Vercel's approach and OpenSkills
- **Security considerations** when installing third-party skills

---

## The SKILL.md Standard: Quick Reference

> 💡 For a complete introduction to SKILL.md structure, see [Part 1: Getting Started with SKILL.md](/blog/agent-skills-getting-started).

A skill lives in its own folder with a `SKILL.md` file containing YAML frontmatter:

**Required fields:**

| Field | Constraints |
|-------|-------------|
| `name` | 1-64 chars, lowercase alphanumeric + hyphens only |
| `description` | 1-1024 chars, describes what it does AND when to use it |

**Optional fields:**

| Field | Purpose |
|-------|-------------|
| `allowed-tools` | Pre-approved tools the skill may use (security boundary) |
| `triggers` | Explicit activation patterns |
| `version` | Semantic versioning for updates |

**Naming rules:**
- Lowercase letters, numbers, and hyphens only
- Cannot start or end with a hyphen
- Must match the parent directory name

### Example Structure

```yaml
---
name: webapp-testing
description: Run Playwright E2E tests; generate minimal repros; summarize failures with next actions. Triggers when user reports UI bugs or asks to verify user flows.
allowed-tools:
  - Read
  - Bash(npx playwright test)
---

# Web App Testing Skill

## Workflow
1) Confirm test command(s) and environment
2) Create or update a Playwright test from the user's scenario
3) Run tests; collect failures; propose fixes
4) Re-run; summarize results
```

---

## Best Practices That Actually Move the Needle

### 1) Write "Routing-Grade" Descriptions

The description is not documentation; **it is a classifier hint**. Agents decide whether to load a skill largely from `name` + `description`. Therefore:

| Include | Example |
|---------|---------|
| **Triggers** | "when user asks to…", "when working with…", "when error includes…" |
| **Scope boundaries** | "only for Playwright", "only for PDF form filling" |
| **Expected outputs** | "returns a PRD outline", "creates *.spec.ts tests", "exports CSV summary" |

VS Code explicitly recommends being specific so Copilot can decide when to load the skill.

```yaml
# ❌ Too vague
description: Helps with testing

# ✅ Routing-grade
description: Run Playwright E2E tests when user reports UI bugs or asks to verify user flows. Creates minimal repro tests, summarizes failures with actionable next steps.
```

---

### 2) Keep SKILL.md Lean; Push Depth into Linked Files

If your `SKILL.md` is becoming a novella, you are defeating progressive disclosure.

**Pattern (official structure):**

```
my-skill/
├── SKILL.md           # Required: instructions + metadata
├── scripts/           # Optional: executable code (Python, Bash, JS)
├── references/        # Optional: documentation loaded on demand
│   ├── REFERENCE.md   # Detailed technical reference
│   └── domain.md      # Domain-specific rules
└── assets/            # Optional: templates, images, data files
    └── output.md      # Exact output formats
```

| Directory | Content |
|-----------|---------|
| `SKILL.md` | Purpose, workflow steps, guardrails, file links |
| `scripts/` | Self-contained executables with clear error messages |
| `references/` | Documentation loaded on demand (keep files focused) |
| `assets/` | Templates, images, lookup tables, schemas |

> 💡 Keep file references **one level deep** from `SKILL.md`. Avoid deeply nested reference chains.

Anthropic calls out this exact "core file + linked files" design so agents only read the heavy content when needed.

---

### 3) Treat Skills Like Production Code

Skills are operational artifacts. Apply basic engineering discipline:

**Version control them** — repo-local skills are explicitly supported and recommended in `.github/skills/`.

**Add a "Safety" or "Constraints" section:**

```markdown
## Safety
- No destructive commands without explicit user approval
- Prefer read-only inspection first
- Use dry-run flags where possible
```

**Add testability:**

```markdown
## Success Criteria
- Test runs complete without errors
- All assertions pass
- Coverage report generated

## Example Invocations
- "Run tests for the auth module"
- "Create a test for the login flow"
```

---

### 4) Prefer Scripts for Determinism, Templates for Consistency

If you need repeatable behavior:

| Use | For |
|-----|-----|
| **Scripts** | Data extraction, normalization, scaffolding |
| **Templates** | Output structure (PRDs, reports, commit messages, changelogs) |

This is the practical advantage skills have over plain prompt files: **they bundle working assets, not only text**.

---

### 5) Keep Rules Minimal; Add Them Only When You Observe Repeat Mistakes

Rules are always-on static context, so they deserve a higher bar. Keep rules focused on essentials, avoid copying large style guides, and evolve them only when you see repeated failures.

> 💡 **Rule of thumb:** If you're adding something to rules because "it might be useful someday," it probably belongs in a skill instead.

---

### 6) Add an Auto-Invoke Skills Section to Your AGENTS.md

One pattern that significantly improves skill activation is explicitly listing **when** each skill should be triggered in your `AGENTS.md` file. This acts as a routing table for the agent:

```markdown
## Auto-invoke Skills

When performing these tasks, automatically load the corresponding skill:

| Task | Skill to Load |
|------|---------------|
| Working with React components | `skills/react/SKILL.md` |
| Writing or running tests | `skills/testing/SKILL.md` |
| Creating a commit | `skills/commit/SKILL.md` |
| Opening a pull request | `skills/pr-workflow/SKILL.md` |
| Working with the API | `skills/api/SKILL.md` |
| Creating new skills | `skills/skill-creator/SKILL.md` |
```

**Why this works:**

- **Explicit triggers** — removes ambiguity about when to load a skill
- **Scoped loading** — agents only load what's needed for the current task
- **Consistent behavior** — same skill always activates for the same task type
- **Works across agents** — even agents without native skill support can follow these instructions

This pattern is especially useful in monorepos where you have multiple AGENTS.md files (one per feature area). The root `AGENTS.md` can point to feature-specific agents, and each feature agent can list its own skill triggers:

```markdown
## Project Structure

This monorepo contains multiple areas, each with its own AGENTS.md:

- `/ui/AGENTS.md` — Frontend React application
- `/api/AGENTS.md` — Backend API services  
- `/auth/AGENTS.md` — Authentication module

When working in a specific area, read its AGENTS.md first.
```

---

## Real Use Cases: Where Skills Outperform "Just Prompting"

Below are two high-ROI examples that illustrate when skills truly shine.

### 1) "One-Command" Git Workflows (Commit + PR)

A classic workflow skill: standardize branch naming, commit formatting, changelog fragments, and PR creation steps.

**Why skill (not prompt):**

- You want the same exact steps every time
- You can bundle templates (PR body, checklist) and scripts (lint/test gates)

```yaml
---
name: git-pr-workflow
description: Create standardized PRs with conventional commits, changelog entries, and automated checks. Triggers when user says "create PR" or "ready for review".
---
```

---

### 2) Web App Testing (Playwright/Cypress)

A testing skill can:

- Generate a reproducible failing test from a bug report
- Run the test suite
- Summarize failures with actionable next steps

VS Code explicitly calls out testing/debugging/deployment workflows as ideal skill territory.

---

## Implementation Tips in VS Code

> ⚠️ **Experimental Feature (as of January 2026):** Agent Skills in VS Code are still experimental and require enabling the `chat.useAgentSkills` setting. The feature may change in future releases.

VS Code now supports Agent Skills, allowing you to teach the coding agent new capabilities and provide domain-specific knowledge. Agent Skills are folders of instructions, scripts, and resources that GitHub Copilot can load when relevant to perform specialized tasks.

Skills are stored in directories with a `SKILL.md` file that defines the skill's behavior. VS Code automatically detects skills from the `.github/skills/` folder in your workspace (or `.claude/skills/` for backwards compatibility). They are then loaded on-demand into the chat context when relevant for your request.

Learn more about creating and using skills in the [Agent Skills documentation](https://code.visualstudio.com/docs/copilot/copilot-customization).

### Quick Setup

1. **Enable the experimental setting:** `chat.useAgentSkills`
2. **Prefer repo-local skills in:** `.github/skills/<skill-name>/SKILL.md`
3. **Use personal skills when you want portability:** `~/.copilot/skills/` (with legacy support for `.claude/skills`)

---

## Skill Directory Conventions by Editor

Each AI coding tool uses its own convention for where to place personal (user-level) skills. Here's the current landscape:

| Editor | Workspace Skills | Global Skills |
|--------|------------------|---------------|
| **Windsurf** | `.windsurf/skills/<name>/` | `~/.codeium/windsurf/skills/<name>/` |
| **OpenCode** | `.opencode/skill/<name>/` | — |
| **Claude Code** | `.claude/skills/<name>/` | — |
| **Codex** | `.codex/skills/<name>/` | — |
| **Cursor** | `.cursor/skills/<name>/` | — |
| **Amp** | `.agents/skills/<name>/` | — |
| **Antigravity** | `.agent/skills/<name>/` | — |
| **VS Code (Copilot)** | `.github/skills/<skill-name>/` | `~/.copilot/skills/<name>/` |

### How to share skills across multiple editors

The varying conventions create a fragmentation problem: **a skill authored for Claude Code won't be automatically discovered by Cursor or VS Code**. 

**Current workarounds:**

1. **Symlinks** — Link your preferred skills directory to multiple editor paths
2. **Repo-level skills** — Use `.github/skills/` as the canonical location
3. **Skillz MCP Server** — A bridge tool that unifies skill discovery

### Skillz MCP: Cross-Platform Skill Execution

[Skillz](https://github.com/intellectronica/skillz) is an MCP server that converts Agent Skills into callable tools for **any** MCP-compatible agent. It bridges the gap between different editors by providing a unified interface.

**How it works:**

1. Point Skillz to your skills directory (e.g., `~/.skillz/`)
2. Skillz discovers all valid skills and exposes them as MCP tools
3. Any MCP-compatible agent can invoke these skills

**Configuration example:**

```json
{
  "skillz": {
    "command": "uvx",
    "args": ["skillz@latest", "/path/to/skills/directory"]
  }
}
```

**Benefits:**
- Works with any MCP-compatible agent
- Supports skills as zip archives (`.zip` or `.skill` extension)
- Provides `fetch_resource` tool to access skill scripts and templates
- Single skills directory works across all your tools

> 💡 **Pro tip:** Use Skillz when you need skills to work across multiple editors, or when an editor doesn't natively support the Agent Skills format yet.

---

## Installing Skills Like npm Packages

Vercel has released [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), introducing an **npm-like installation experience** for Agent Skills. This approach treats skills as installable packages, making it easy to share and consume pre-built expertise.

```bash
# Install skills from a GitHub repository
npx skills i vercel-labs/agent-skills

# Or use the add-skill CLI
npx add-skill vercel-labs/agent-skills
```

The `add-skill` CLI is designed to wire skills into specific agents automatically. It scans for installed coding agents by checking their configuration directories (e.g., `.claude/`, `.cursor/`) and installs skills into the correct locations.

### Advanced Installation Options

```bash
# List available skills before installing
npx add-skill vercel-labs/agent-skills --list

# Install a specific skill globally for Claude Code
npx add-skill vercel-labs/agent-skills --skill react-best-practices -g -a claude-code -y

# Install only for Cursor
npx add-skill vercel-labs/agent-skills --skill web-design-guidelines -a cursor -y
```

> ⚠️ **Remember:** Skills can execute code on your machine. Treat them with the same caution you'd give any npm package.

### Vercel's Pre-Built Skills

The `vercel-labs/agent-skills` repository ships with three production-ready skills:

| Skill | Description |
|-------|-------------|
| **react-best-practices** | 40+ rules in 8 categories covering React/Next.js performance (network waterfalls, bundle size, SSR, re-renders, etc.) |
| **web-design-guidelines** | 100+ rules for UI/UX quality (accessibility, forms, animation, typography, dark mode, i18n) |
| **vercel-deploy-claimable** | Auto-detect framework, create deployment, return preview + claim URLs |

### Skill Structure in Vercel's Approach

Each skill includes three main components:

```
react-best-practices/
├── SKILL.md              # Natural language instructions
├── AGENTS.md             # Aggregated rules optimized for agents
├── scripts/              # Helper commands the agent can call
└── references/           # Additional documentation and examples
```

The `AGENTS.md` file is a clever addition — it compiles individual rule files into a single document optimized for agent consumption, eliminating the need for ad-hoc prompt engineering.

### Why This Matters

The npm-like approach solves a key distribution problem:

- **Version control**: Skills are versioned and updatable
- **Discoverability**: Browse and install from repositories
- **No copy-paste**: One command installs across all your agents
- **Community sharing**: Teams can publish and consume skills like npm packages

> 💡 This is the future of AI coding assistance: **pre-packaged expertise** that's as easy to install as `npm install lodash`.


### OpenSkills: Universal Skills Loader

[OpenSkills](https://github.com/numman-ali/openskills) takes a different approach: instead of being tied to one agent, it's a **universal skills loader** that works with Claude Code, Cursor, Windsurf, Aider, Codex, and any agent that can read `AGENTS.md`.

**Key difference:** While Vercel's `add-skill` targets specific agents, OpenSkills generates the same `<available_skills>` XML format that Claude Code uses natively — making skills truly portable.

```bash
# Install skills from Anthropic's marketplace
npx openskills install anthropics/skills

# Sync to your AGENTS.md
npx openskills sync
```

**Installation options:**

```bash
# From any GitHub repo
npx openskills install your-org/your-skills

# From a local path
npx openskills install ./local-skills/my-skill

# From private git repos (uses SSH keys)
npx openskills install git@github.com:your-org/private-skills.git

# Universal mode for multi-agent setups (.agent/skills/ instead of .claude/skills/)
npx openskills install anthropics/skills --universal
```

**Available commands:**

| Command | Description |
|---------|-------------|
| `install <source>` | Install from GitHub, local path, or private repo |
| `sync [-y] [-o <path>]` | Update AGENTS.md with installed skills |
| `list` | Show all installed skills |
| `read <name>` | Load skill content (for agents) |
| `update [name...]` | Refresh installed skills from source |
| `manage` | Interactive skill removal |

**Why OpenSkills over Vercel's approach?**

- **Exact Claude Code compatibility** — same XML format, same folders
- **Works with any agent** — not just Claude Code or Cursor
- **Private repo support** — SSH authentication built-in
- **Update tracking** — `openskills update` refreshes from source
- **Universal mode** — `.agent/skills/` avoids conflicts with Claude Code's marketplace

### Validate Your Skills

Use the official [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) reference library to validate your skills:

```bash
skills-ref validate ./my-skill
```

This checks that your `SKILL.md` frontmatter is valid and follows all naming conventions.

### Folder Structure

```
.github/
└── skills/
    ├── webapp-testing/
    │   ├── SKILL.md
    │   ├── templates/
    │   │   └── test-template.spec.ts
    │   └── scripts/
    │       └── run-tests.sh
    └── pr-workflow/
        ├── SKILL.md
        └── templates/
            └── pr-body.md
```

---

## Resources Directory

### 📦 npm Packages & CLI Tools

| Package | Install Command | Description | Repo |
|---------|-----------------|-------------|------|
| Vercel Skills CLI | `npx skills i` | Browse and install skills from the marketplace | [nicepkg/skills](https://github.com/nicepkg/skills) |
| Vercel Add-Skill | `npx add-skill` | Install pre-built React/Next.js and web design skills | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| OpenSkills | `npx openskills install` | Universal skills loader for any AI coding agent | [numman-ali/openskills](https://github.com/numman-ali/openskills) |
| skills-ref | `npm install skills-ref` | Validation tool and prompt XML generator | [agentskills/agentskills](https://github.com/agentskills/agentskills/tree/main/skills-ref) |
| Skillz MCP | `uvx skillz@latest` | Cross-platform MCP server for skill execution | [intellectronica/skillz](https://github.com/intellectronica/skillz) |

### 📂 GitHub Skill Repositories (Copy & Paste)

| Repository | Description |
|------------|-------------|
| [anthropics/skills](https://github.com/anthropics/skills) | Official Anthropic skills — the reference implementation |
| [github/awesome-copilot/skills](https://github.com/github/awesome-copilot/tree/main/skills) | GitHub's official skills collection for Copilot |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React, Next.js, Tailwind, and web design skills |
| [nicepkg/skills](https://github.com/nicepkg/skills) | Curated marketplace of community skills |
| [intellectronica/skillz](https://github.com/intellectronica/skillz) | MCP server + example skills for cross-platform use |

### 📖 Official Documentation & Articles

| Resource | Description |
|----------|-------------|
| [agentskills.io](https://agentskills.io/) | Official Agent Skills homepage, SKILL.md format specification, and conceptual overview |
| [Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Claude's guide to writing effective skills |
| [Windsurf Skills Docs](https://docs.windsurf.com/windsurf/cascade/skills) | Windsurf implementation with UI creation |
| [VS Code Skills Docs](https://code.visualstudio.com/docs/copilot/copilot-customization) | VS Code Copilot customization guide |

### 🎥 Recommended Videos

- [Introducing Agent Skills in VS Code - YouTube](https://www.youtube.com/watch?v=JepVi1tBNEE&t=61s)
- [The Skills System That Changed How I Work with AI (Complete Course) - YouTube](https://www.youtube.com/watch?v=Nvn6s3r9ZAw)
- [5 Mind-Blowing Use Cases of Claude Skills - YouTube](https://www.youtube.com/watch?v=HCwfRe5EHGQ&t=266s)

> 💡 **Know a great video or article about Agent Skills?** The ecosystem is evolving fast — community contributions help everyone learn.

---

## Wrap Up

This guide covered the advanced patterns for building production-ready Agent Skills:

- **Routing-grade descriptions** — Write descriptions that help agents decide when to load your skill
- **Lean SKILL.md files** — Push depth into linked `scripts/`, `references/`, and `assets/` directories  
- **Auto-invoke tables** — Explicitly list skill triggers in your `AGENTS.md`
- **Editor conventions** — Know where to place skills for each tool in your workflow
- **npm-like distribution** — Use Vercel's CLI or OpenSkills to install and share skills
- **Security awareness** — Treat third-party skills with the same caution as npm packages

If you're just getting started, check out [Part 1: Getting Started with SKILL.md](/blog/agent-skills-getting-started) for the fundamentals.

---

_© Aridane Martín – 2026_
