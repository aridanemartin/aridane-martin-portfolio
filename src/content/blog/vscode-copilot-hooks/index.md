---
title: "Copilot Hooks Preview: Master lifecycle control over your AI agent"
subtitle: "trigger → condition → action 🎣"
description: "Learn how VS Code Copilot hooks let you run shell commands at key agent lifecycle points — block dangerous operations, auto-format code, inject context, and build audit trails."
publishDate: 2026-02-21
timeToRead: 7
tags:
  - copilot
  - vscode
  - ai
  - productivity
author: "Aridane Martín"
img: ./_images/vscodeCopilotHooksCover.webp
ogImage: "/assets/og/vscodeCopilotHooksCover.jpg"
img_alt: "VS Code Copilot hooks lifecycle diagram showing agent control points"
---

You've been using GitHub Copilot in agent mode and it's brilliant — until it isn't. Maybe it tried to run a migration script on your production database. Maybe it silently deleted a file you needed. Maybe you just want to know *exactly* what it's doing and when.

**Copilot hooks** are the answer. They let you intercept the agent at specific lifecycle points and run your own shell commands — to block operations, automate quality checks, inject context, or log everything for compliance.

This guide covers what hooks are, all eight lifecycle events, how to configure them, and three real-world examples you can drop in today.

---

## What Are Copilot Hooks?

Hooks are shell commands that VS Code executes automatically at defined points during an agent session. Think of them as middleware for your AI assistant.

Each hook receives context about what's happening (as JSON on stdin) and can respond with instructions (JSON on stdout) — including whether to allow, block, or modify what the agent is about to do.

They live in a JSON configuration file and require no extensions or plugins — just VS Code and a script.

---

## The 8 Lifecycle Events

VS Code fires hooks at eight points in an agent session:

| Event | When it fires | Common use |
|---|---|---|
| `SessionStart` | New agent session begins | Inject project context, init resources |
| `UserPromptSubmit` | User submits a prompt | Audit logging, prompt enrichment |
| `PreToolUse` | Before a tool runs | Block dangerous operations, validate inputs |
| `PostToolUse` | After a tool completes | Auto-format, run tests, log results |
| `PreCompact` | Before context compaction | Export state before truncation |
| `SubagentStart` | A subagent spawns | Track nested agent usage |
| `SubagentStop` | A subagent finishes | Aggregate results, cleanup |
| `Stop` | Session ends | Generate reports, send notifications |

The two you'll reach for most are `PreToolUse` (to block things) and `PostToolUse` (to react to things).

---

## Configuration

Hooks are defined in JSON files. VS Code looks for them in these locations, from most specific to broadest:

- **Workspace:** `.github/hooks/*.json` or `.claude/settings.json`
- **User:** `~/.claude/settings.json`

The basic structure is:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ]
  }
}
```

Each hook entry supports these properties:

| Property | Type | Description |
|---|---|---|
| `type` | string | Always `"command"` |
| `command` | string | Shell command to run |
| `osx` / `linux` / `windows` | string | OS-specific overrides |
| `cwd` | string | Working directory (repo-relative) |
| `env` | object | Extra environment variables |
| `timeout` | number | Seconds before timeout (default: 30) |

> 💡 **Pro tip:** Use the `/hooks` slash command in the Copilot Chat view for a guided setup UI instead of editing JSON manually.

---

## Input and Output Protocol

Hooks communicate with VS Code via stdin/stdout using JSON.

### What your hook receives (stdin)

Every hook gets at least this base payload:

```json
{
  "timestamp": "2026-02-21T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "abc-123",
  "hookEventName": "PreToolUse",
  "transcript_path": "/tmp/transcript.json"
}
```

`PreToolUse` and `PostToolUse` also include the tool name and its inputs:

```json
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123"
}
```

### What your hook returns (stdout)

Return JSON to control what happens next:

```json
{
  "continue": true,
  "stopReason": "Blocked by security policy",
  "systemMessage": "This operation requires manual approval."
}
```

For `PreToolUse`, you can also include a permission decision:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive filesystem operations are not allowed."
  }
}
```

The permission values in order of precedence: `deny` → `ask` → `allow`.

### Exit codes

| Exit code | Meaning |
|---|---|
| `0` | Success — VS Code parses your stdout as JSON |
| `2` | Blocking error — stops the agent and shows the error |
| Anything else | Non-blocking warning — agent continues |

---

## Three Examples You Can Use Today

### 1. Block Dangerous Commands

This is the most common hook. Run it on `PreToolUse` to stop the agent from executing destructive operations — even if you accidentally asked for them.

Create `.github/hooks/security.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/block-dangerous.sh",
        "timeout": 5
      }
    ]
  }
}
```

Then create `scripts/block-dangerous.sh`:

```bash
#!/bin/bash

# Read the full JSON payload from stdin
INPUT=$(cat)

# Extract the command being run (if it's a shell tool)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block known-dangerous patterns
if echo "$COMMAND" | grep -qE '(rm\s+-rf|DROP\s+TABLE|DELETE\s+FROM\s+|format\s+[A-Z]:)'; then
  echo '{
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "deny",
      "permissionDecisionReason": "Destructive command blocked by security policy."
    }
  }'
  exit 0
fi

# Everything else is fine
echo '{"continue": true}'
```

```bash
chmod +x scripts/block-dangerous.sh
```

> ⚠️ **Warning:** This is a starting point, not a complete security solution. Determined prompts can work around pattern matching. Layer this with other safeguards and review scripts from untrusted sources before enabling them.

---

### 2. Auto-Format After Every Edit

Tired of reminding Copilot to format the files it touches? Use a `PostToolUse` hook to run Prettier automatically after any file edit.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/auto-format.sh",
        "timeout": 30
      }
    ]
  }
}
```

```bash
#!/bin/bash

INPUT=$(cat)

# Only act on file edit tools
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
if [ "$TOOL" != "editFiles" ] && [ "$TOOL" != "writeFile" ]; then
  exit 0
fi

# Get the edited files
FILES=$(echo "$INPUT" | jq -r '.tool_input.files[]? // empty')

for FILE in $FILES; do
  if [ -f "$FILE" ]; then
    npx prettier --write "$FILE" 2>/dev/null
  fi
done
```

This runs silently after every edit. No more "please format this file" in your prompts.

---

### 3. Inject Project Context at Session Start

Give Copilot everything it needs to know the moment a session begins — branch name, version, recent commits — without putting it in every prompt.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "./scripts/inject-context.sh",
        "timeout": 10
      }
    ]
  }
}
```

```bash
#!/bin/bash

# Collect project metadata
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "unknown")
RECENT=$(git log --oneline -5 2>/dev/null || echo "no git history")
NODE_VERSION=$(node --version 2>/dev/null || echo "unknown")

CONTEXT="Project context:
- Branch: $BRANCH
- Version: $VERSION
- Node: $NODE_VERSION
- Recent commits:
$RECENT"

# Return as additional context for the agent
echo "{
  \"hookSpecificOutput\": {
    \"hookEventName\": \"SessionStart\",
    \"additionalContext\": $(echo "$CONTEXT" | jq -Rs .)
  }
}"
```

The agent will include this context in every interaction for that session — without you having to type it.

---

## Security Considerations

Hooks are powerful, which means they come with real risks:

- **Hooks run with VS Code's full permissions.** A hook script can do anything your user account can do on the system.
- **If Copilot can edit your hook scripts, it can escalate its own privileges.** Enable the `chat.tools.edits.autoApprove` setting and restrict it to exclude your hooks directory.
- **Never hardcode secrets in hook commands.** Use environment variables or a secrets manager.
- **Validate all input.** Hook scripts receive arbitrary JSON from the agent session — sanitize it before passing it to shell commands to prevent injection attacks.

> ⚠️ **Warning:** Always review hook scripts before enabling them, especially if they come from a third-party template or were generated by an AI.

---

## Debugging Your Hooks

When a hook misbehaves, VS Code gives you two places to look:

1. **Diagnostics panel** — Right-click in the Chat view → **Diagnostics** → check the hooks section
2. **Output panel** — Open the Output panel and select the **"GitHub Copilot Chat Hooks"** channel to see execution logs

Common issues:
- **Hook not running** — Check the file lives in `.github/hooks/` and has a `.json` extension
- **Permission denied** — Run `chmod +x` on your script
- **Timeout errors** — Increase the `timeout` value or profile your script for slow operations
- **Unexpected output** — Validate your stdout JSON with `echo '...' | jq .` before deploying

---

## What This Unlocks

Hooks transform Copilot from a brilliant-but-unchecked assistant into a governed, auditable tool. You get:

- **Guardrails** that hold even when prompts go sideways
- **Automation** that fires without any extra prompt engineering
- **Observability** over every tool call in every session
- **Context injection** that makes every session smarter from the start

Start with one hook — the dangerous-command blocker is a good first choice — and build from there. Once you see how straightforward the protocol is, you'll find uses for hooks everywhere.

**Source:** [VS Code Copilot Hooks documentation](https://code.visualstudio.com/docs/copilot/customization/hooks)
