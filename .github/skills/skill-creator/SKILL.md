---
name: skill-creator
description: Create new Agent Skills with proper structure and metadata. Use when the user wants to create a new skill, add a skill, or scaffold a SKILL.md file. Asks for scope to determine which AGENTS.md to update.
license: MIT
metadata:
  author: aridane-martin
  version: "1.0"
  scope: root
allowed-tools:
  - read
  - write
  - edit
---

# Skill Creator

Creates new Agent Skills following the agentskills.io specification and automatically registers them in the appropriate AGENTS.md file based on scope.

## Workflow

### Step 1: Gather Information

Ask the user for the following details:

1. **Skill name** (required)
   - Must be lowercase alphanumeric + hyphens only
   - Cannot start or end with a hyphen
   - No consecutive hyphens

2. **Description** (required)
   - What the skill does
   - When it should be triggered (include trigger phrases)
   - Expected outputs

3. **Scope** (required) — Where does this skill apply?
   - `root` — Applies globally to the entire project
   - `ui` — Frontend/UI specific
   - `api` — Backend/API specific
   - `docs` — Documentation specific
   - `testing` — Testing specific
   - Custom scope (ask user to specify the path)

4. **Optional metadata:**
   - License (default: MIT)
   - Compatibility requirements
   - Allowed tools

### Step 2: Create the Skill Structure

Create the skill directory and files:

```
.github/skills/<skill-name>/
├── SKILL.md           # Main skill file (always created)
├── assets/            # Optional: templates, examples
│   └── template.md    # Example template if needed
└── references/        # Optional: additional documentation
```

### Step 3: Generate SKILL.md Content

Use this template:

```yaml
---
name: <skill-name>
description: <description with trigger phrases>
license: <license>
metadata:
  author: <author>
  version: "1.0"
  scope: <scope>
allowed-tools:
  - read
  - write
  - edit
---

# <Skill Title>

<Brief description of what this skill does>

## When to Use

- <Trigger condition 1>
- <Trigger condition 2>

## Workflow

1. <Step 1>
2. <Step 2>
3. <Step 3>

## Output Format

<Describe expected outputs>

## Examples

<Provide example invocations>
```

### Step 4: Update AGENTS.md

Based on the scope, update the appropriate AGENTS.md file:

| Scope | File to Update |
|-------|----------------|
| `root` | `AGENTS.md` (project root) |
| `ui` | `ui/AGENTS.md` or `frontend/AGENTS.md` |
| `api` | `api/AGENTS.md` or `backend/AGENTS.md` |
| Custom | `<custom-path>/AGENTS.md` |

Add an entry to the "Auto-invoke Skills" section:

```markdown
| <Trigger description> | `skills/<skill-name>/SKILL.md` |
```

If the AGENTS.md doesn't exist, create it with the basic structure:

```markdown
# AGENTS.md

## Project Context

<Brief description of this area>

## Auto-invoke Skills

| Task | Skill to Load |
|------|---------------|
| <New skill trigger> | `skills/<skill-name>/SKILL.md` |
```

### Step 5: Confirm Creation

After creating the skill, output:

1. ✅ Created skill directory: `.github/skills/<skill-name>/`
2. ✅ Created SKILL.md with metadata and instructions
3. ✅ Updated `<path>/AGENTS.md` with auto-invoke entry
4. 📝 Next steps: Customize the skill content as needed

## Validation Rules

Before creating, validate:

- [ ] Skill name follows naming conventions
- [ ] Description includes trigger phrases
- [ ] Scope is valid and path exists (or will be created)
- [ ] No duplicate skill with same name exists

## Example Invocation

**User:** "Create a skill for handling database migrations"

**Agent response:**
1. "What should I name this skill?" → `db-migrations`
2. "Describe what it does and when to trigger it" → "Run database migrations when user mentions migrations, schema changes, or database updates"
3. "What's the scope?" → `api`
4. Creates `.github/skills/db-migrations/SKILL.md`
5. Updates `api/AGENTS.md` with auto-invoke entry
