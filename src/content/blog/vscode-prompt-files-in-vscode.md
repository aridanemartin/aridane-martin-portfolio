---
title: "Beginner's Guide to Prompt Files in VS Code"
subtitle: "Supercharge your Copilot workflow with prompt files ⚡"
description: "Learn how to create and execute custom prompts in VS Code using the .github/prompts folder for faster, more consistent AI interactions."
publishDate: 2025-12-10
timeToRead: 4
isActive: true
tags: ["vscode", "copilot", "productivity", "prompts"]
author: "Aridane Martín"
img: "/assets/blog/prompt-files-in-vscode/promptFilesInVscode.webp"
img_alt: "VS Code prompt files configuration and execution"
---

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**

---

One of the most overlooked features in GitHub Copilot is the ability to create reusable prompt files. Instead of typing the same instructions over and over, you can save your best prompts and execute them instantly from VS Code chat. This article will show you how to set up and use prompt files to streamline your workflow.

## What Are Prompt Files?

Prompt files are markdown files stored in the `.github/prompts` folder of your repository. They act as templates for common tasks you ask Copilot to perform.

Think of them as **shortcuts for your most frequent Copilot interactions** — whether it's code reviews, refactoring patterns, documentation generation, or custom workflows specific to your project.

> 💡 **Tip:** Use the `/` command followed by the prompt name to quickly invoke it

---

## Setting Up Prompt Files

### Step 1: Enable Prompt Files in Settings

First, you need to tell VS Code where to look for your prompt files:

1. Open your `settings.json` file (⌘+Shift+P → "Preferences: Open User Settings (JSON)")
2. Add the following configuration:

```json
{
  "chat.promptFiles": true
}
```

This enables the `.github/prompts` folder as the location for prompt files. The folder will be created automatically if it doesn't exist when you create your first prompt file.

### Step 2: Create Your First Prompt File

Navigate to your project root and create the `.github/prompts` directory if it doesn't exist yet. Then create a new file with a descriptive name (excluding the `.prompt.md` extension).

For example: `.github/prompts/code-review.prompt.md`

Here's the structure of a prompt file:

```markdown
---
description: A short description of the prompt
name: The name used after typing / in chat
argument-hint: Optional hint text shown in the chat input
agent: ask, edit, agent, or custom agent name
model: The language model to use (optional)
tools: List of available tools for this prompt
---

Your prompt instructions go here.
Use #tool:<tool-name> to reference specific tools.
```

---

## Anatomy of a Prompt File

Let's break down each field in the frontmatter:

### `description`
A short description of what the prompt does. This helps you remember the prompt's purpose when browsing.

### `name`
The name you'll use to invoke the prompt in chat. For example, if `name` is "code-review", you'll type `/code-review` in the chat input.

If not specified, the file name is used by default.

### `argument-hint` (optional)
Hint text shown in the chat input field to guide users on how to interact with the prompt. This is particularly useful for prompts that expect specific input.

### `agent`
The agent that will run the prompt:
- **ask**: For questions and information retrieval
- **edit**: For making code changes directly
- **agent**: For multi-step autonomous tasks
- **custom agent name**: If you have custom agents configured

By default, the current agent is used. If tools are specified and the current agent is ask or edit, the default agent becomes **agent**.

### `model` (optional)
The language model to use when running the prompt. If not specified, the currently selected model in the model picker is used.

### `tools` (optional)
A list of tool or tool set names available for this prompt. Can include:
- Built-in tools
- Tool sets
- MCP (Model Context Protocol) tools
- Tools contributed by extensions

To include all tools of an MCP server, use the `<server name>/*` format.

---

## Example: Code Review Prompt

Here's a practical example of a code review prompt file:

**File:** `.github/prompts/code-review.prompt.md`

```markdown
---
description: Performs a thorough code review with best practices
name: code-review
argument-hint: Select code or provide a file path
agent: ask
---

Act as a senior code reviewer on my team.

Review the selected code or file for:
- Code quality and readability
- Potential bugs or edge cases
- Performance considerations
- Security vulnerabilities
- Best practices for our stack

Provide specific, actionable feedback with code examples where helpful.
```

### How to Use It

1. Select some code in your editor
2. Open Copilot Chat (⌘+I or Ctrl+I)
3. Type `/code-review`
4. Press Enter

Copilot will now perform the code review using your custom instructions.

---

## Example: Refactoring Prompt

**File:** `.github/prompts/refactor-component.prompt.md`

```markdown
---
description: Refactors React components following project conventions
name: refactor-component
argument-hint: Select a component to refactor
agent: edit
tools: ["typescript", "react"]
---

Refactor the selected React component to follow these conventions:

1. Use TypeScript with explicit types
2. Extract magic numbers to constants
3. Split large components into smaller, focused ones
4. Use custom hooks for complex logic
5. Add JSDoc comments for props interfaces
6. Ensure accessibility (ARIA labels, semantic HTML)

Explain each change you make.
```

---

## Example: Documentation Prompt

**File:** `.github/prompts/generate-docs.prompt.md`

```markdown
---
description: Generates comprehensive documentation for code
name: docs
argument-hint: Select a function, class, or module
agent: edit
---

Generate comprehensive documentation for the selected code:

- Add JSDoc/TSDoc comments
- Explain parameters, return values, and side effects
- Include usage examples
- Document any assumptions or edge cases
- Add @example tags with realistic use cases

Follow the project's documentation style guide.
```

---

## Advanced: Using Tools in Prompts

You can reference specific tools in your prompt body using the `#tool:<tool-name>` syntax. This gives Copilot access to specialized capabilities.

**Example with GitHub tools:**

```markdown
---
description: Creates a bug report issue on GitHub
name: bug-report
agent: agent
tools: ["github/*"]
---

Create a new GitHub issue for the bug I'm about to describe.

Use #tool:github_issue_write to create the issue with:
- A clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Relevant code snippets or logs

Then provide me with the issue URL.
```

---

## Tips for Creating Effective Prompts

### 1. Be Specific About Context
Include details about your tech stack, coding conventions, and project structure in the prompt.

### 2. Use Role-Based Prompting
Start with "Act as a [role]" to shape Copilot's expertise and tone (e.g., "Act as a security expert" or "Act as a technical writer").

### 3. Break Down Complex Tasks
For multi-step workflows, use the **agent** mode and break instructions into numbered steps.

### 4. Iterate and Refine
Your first version won't be perfect. Use your prompts regularly and refine them based on the results.

### 5. Share with Your Team
Commit your `.github/prompts` folder to version control so your entire team can benefit from standardized workflows.

---

## Common Use Cases for Prompt Files

Here are some ideas to get you started:

| Use Case | Prompt Name | Agent Type |
|----------|-------------|------------|
| Code review | `/code-review` | ask |
| Refactor legacy code | `/refactor` | edit |
| Generate unit tests | `/test` | edit |
| Explain complex code | `/explain` | ask |
| Optimize performance | `/optimize` | edit |
| Security audit | `/security` | ask |
| Generate API docs | `/api-docs` | edit |
| Create migration plan | `/migrate` | agent |

---

## Workflow Integration

The real power of prompt files comes from integrating them into your daily workflow:

### During Code Review
- `/code-review` — Quick quality check before committing
- `/security` — Audit for vulnerabilities

### Before Committing
- `/test` — Generate missing tests
- `/docs` — Update documentation

### When Refactoring
- `/refactor` — Apply consistent patterns
- `/optimize` — Improve performance

### In Planning Sessions
- `/migrate` — Plan architecture changes
- `/design` — Brainstorm implementation approaches

---

## Best Practices

### Organize by Purpose
Group related prompts with clear naming:
- `code-review-*.prompt.md` for review workflows
- `refactor-*.prompt.md` for refactoring patterns
- `docs-*.prompt.md` for documentation tasks

### Version Control
Always commit your prompts folder so your team has access to the same workflows.

### Keep Them Updated
As your project evolves, update your prompts to reflect new conventions and tools.

### Document Your Prompts
Add a README in `.github/prompts/` explaining what each prompt does and when to use it.

---

## Conclusion

Prompt files transform GitHub Copilot from a general-purpose assistant into a **specialized teammate** that understands your project's unique needs. By investing time upfront to create reusable prompts, you'll save countless hours of repetitive typing and ensure more consistent, high-quality AI interactions.

Start with just one or two prompts for your most common tasks, then expand your library as you discover new workflows worth automating.

**What will you automate first?**

---

### Additional Resources

- [Learn more about tools in chat](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-tools)
- [GitHub Copilot Prompting Strategies](/blog/github-copilot-prompting-strategies)
- [Create Your First Copilot Agent](/blog/create-your-first-copilot-agent-with-full-context)
