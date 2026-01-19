---
title: "Agent Skills Part 1: Getting Started with SKILL.md"
publishDate: 2026-01-15
img: ./_images/agentSkillsGettingStartedCover.webp
img_alt: AI generated image of three beavers fixing a computer
description: Learn the fundamentals of Agent Skills — how SKILL.md files work, the progressive disclosure model, and when to use skills vs. rules for your AI coding assistant.
tags:
  - AI
  - Productivity
  - VS Code
  - GitHub Copilot
timeToRead: 4
---

If you've been working with AI coding assistants, you've probably encountered the challenge of providing context: either you dump everything into a massive system prompt, or the AI lacks the specialized knowledge it needs for specific tasks.

**Agent Skills** solve this elegantly. Instead of static prompts, skills are **dynamically loaded bundles of instructions, templates, and scripts** that the AI can invoke when needed. Think of them as "plugins for your AI" — specialist knowledge that stays out of the way until relevant.

This guide covers the fundamentals: what SKILL.md is, how progressive disclosure works, and when to use skills vs. other approaches. If you're already comfortable with the basics, check out [Part 2: Patterns, Architecture & Tooling](/blog/agent-skills-best-practices-patterns-use-cases) for best practices, tooling, and installation workflows.

---

## What is the SKILL.md Standard?

The [Agent Skills specification](https://agentskills.io) defines a universal format for packaging AI instructions into discoverable, portable skill bundles. A skill is simply a folder containing:

```
my-skill/
├── SKILL.md          # Required: defines name, description, instructions
├── templates/        # Optional: reusable files (boilerplate, configs)
├── scripts/          # Optional: executable helpers
└── references/       # Optional: docs, examples, context files
```

### The SKILL.md File Structure

Every skill needs a `SKILL.md` file with YAML frontmatter:

```yaml
---
name: skill-name              # Lowercase, hyphens only
description: |
  A clear, detailed description that helps agents understand
  when this skill should be invoked. Include trigger phrases.
version: 1.0.0                # Optional: semantic versioning
triggers:                     # Optional: activation patterns
  - "deploy to production"
  - "release workflow"
allowed-tools:                # Optional: whitelist safe tools
  - Read
  - Write
  - Bash(npm run build)
---

## Instructions

Step-by-step guidance for the agent. Be specific and actionable.

### When to Use This Skill

- Trigger condition 1
- Trigger condition 2

### Workflow

1. First, do X
2. Then check Y
3. Finally, output Z
```

### Key Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Unique identifier (lowercase, hyphens) |
| `description` | ✅ | When/why to invoke this skill — include trigger phrases |
| `version` | ❌ | Semantic versioning for updates |
| `triggers` | ❌ | Explicit activation patterns |
| `allowed-tools` | ❌ | Restrict tool access (security boundary) |

---

## Progressive Disclosure: The Core Concept

The magic of Agent Skills lies in **progressive disclosure** — loading context only when relevant, keeping the AI's context window clean.

### The Old Way: Monolithic System Prompts

```text
[System]
You are a coding assistant. Here are 5000 words of guidelines
covering TypeScript, React patterns, testing, deployment,
database migrations, PR workflows, accessibility, security...
```

**Problems:**
- Token waste on irrelevant rules
- AI struggles to prioritize (everything seems "important")
- Hard to maintain and update

### The Skills Way: Just-in-Time Context

```
User: "Help me deploy this to production"

Agent: [Detects deployment intent]
       [Loads deploy-to-production skill]
       [Follows skill's specific workflow]
```

**Benefits:**
- Clean context window
- Specialist instructions when needed
- Better signal-to-noise ratio
- Modular and maintainable

### How Discovery Works

1. **Scanning:** Agent reads skill names and descriptions from your skills directory
2. **Matching:** When your request mentions relevant keywords (from the description), the skill is flagged
3. **Loading:** The full SKILL.md content + resources are loaded into context
4. **Execution:** Agent follows the skill's instructions

> 💡 This is why writing a **good description** is crucial — it's the discovery mechanism.

---

## Where Skills Fit: Rules vs. Skills vs. MCP

AI coding assistants support multiple types of customization. Understanding when to use each is key:

### Rules (Always-On Context)

**Files:** `.github/copilot-instructions.md`, `.cursorrules`, `.windsurfrules`

**Purpose:** Baseline conventions that apply to every interaction.

**Best for:**
- Code style guidelines
- Project architecture patterns
- Naming conventions
- "Always do X, never do Y" constraints

**Example:**
```markdown
# .github/copilot-instructions.md

## TypeScript Guidelines
- Use `interface` for object shapes, `type` for unions/intersections
- Prefer `const` over `let`
- Always use explicit return types for functions
```

### Skills (On-Demand Specialists)

**Files:** `.github/skills/<name>/SKILL.md`

**Purpose:** Specialist routines loaded only when relevant.

**Best for:**
- Complex multi-step workflows
- Tasks that need templates/scripts
- Specialist knowledge (deployment, testing, migrations)
- Anything that shouldn't pollute every conversation

**Example:** A "create-pr" skill that includes PR templates, changelog formatting, and CI check requirements.

### MCP Servers (External Capabilities)

**Purpose:** Connect AI to external tools and services.

**Best for:**
- Database queries
- API integrations
- File system operations beyond the workspace
- Real-time data access

### The Decision Matrix

| Use Case | Rules | Skills | MCP |
|----------|-------|--------|-----|
| "Always use Tailwind utilities" | ✅ | | |
| "Deploy to AWS with these steps" | | ✅ | |
| "Query our analytics database" | | | ✅ |
| "Create PRs with this template" | | ✅ | |
| "Use conventional commits" | ✅ | | |
| "Run Playwright tests" | | ✅ | |

---

## Quick VS Code Setup

> ⚠️ **Experimental Feature (as of January 2026):** Agent Skills in VS Code require enabling `chat.useAgentSkills`. The feature may change in future releases.

### 1. Enable the Setting

Open VS Code settings and enable:

```json
{
  "chat.useAgentSkills": true
}
```

### 2. Create Your Skills Directory

```bash
mkdir -p .github/skills/my-first-skill
```

### 3. Create Your First Skill

Create `.github/skills/my-first-skill/SKILL.md`:

```yaml
---
name: my-first-skill
description: |
  A starter skill for learning the Agent Skills format.
  Triggers when user says "use my first skill" or "test skill".
---

## Instructions

This skill demonstrates the basic format. When invoked:

1. Greet the user
2. Explain what skills can do
3. Suggest a real workflow to convert into a skill
```

### 4. Test It

In Copilot Chat, try:
- "Help me test my first skill"
- "@skill:my-first-skill show me how this works"

VS Code automatically detects skills in `.github/skills/` and loads them when relevant.

---

## What's Next?

This guide covered the fundamentals. To go deeper:

- **[Part 2: Patterns, Architecture & Tooling](/blog/agent-skills-best-practices-patterns-use-cases)** — Best practices, real use cases, editor directory conventions, npm-like installation, and security considerations.
- **[agentskills.io](https://agentskills.io)** — Official specification and examples
- **[VS Code Skills Docs](https://code.visualstudio.com/docs/copilot/copilot-customization)** — Implementation details for Copilot

Start by identifying **one repeatable workflow** in your daily work — something you explain to the AI repeatedly. Convert it to a skill, test it, and iterate. The investment pays off quickly.

---

_© Aridane Martín – 2026_
