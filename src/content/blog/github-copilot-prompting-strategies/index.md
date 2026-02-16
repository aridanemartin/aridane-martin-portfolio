---
title: "GitHub Copilot Prompting Strategies"
subtitle: "Work with Copilot, not against it ✈️"
description: "Master GitHub Copilot with strategic prompting and context management. Learn how to guide AI assistance effectively and make Copilot work for you and not against you."
publishDate: 2025-10-10
lastUpdateDate: 2025-10-15
timeToRead: 5
isActive: true
tags:
  - Prompting
  - AI
  - GitHub Copilot
author: "Aridane Martín"
img: "./_images/githubCopilotPromptingStrategiesCover.webp"
img_alt: "GitHub Copilot strategies and AI assistance for developers"
---

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**  
**Talk:** Boosting Productivity: Shortcut your coding

---

GitHub Copilot can be a great coding partner if you guide it right. This guide will teach you some strategies to make AI work for you and not against you.

## Understanding the AI Sweet Spot


The key to effective AI assistance lies in finding the **sweet spot** between two extremes: pure hallucination and perfectly desired results. AI models like Copilot work best when you provide enough context and constraints to guide them toward your goals, but not so much rigidity that you lose their creative problem-solving abilities. 

![AI Sweet Spot visualization](/assets/blog/github-copilot-strategies/aiSweetSpot.webp)

The strategies below will help you navigate this balance, turning Copilot from a source of random suggestions into a reliable coding partner.

## Strategy 1: Ask First, Then Do

> 💡 AI doesn’t replace thinking — it replaces guessing. The clearer you are, the smarter Copilot becomes..


The most effective approach to using Copilot is to **ask first, then do**. Don't just start coding and hope Copilot guesses what you want.

   ```text
   // Prompt (in ASK mode):
   I want to split this functionality out of this component.
   Give me options, explain pros/cons, and recommend the best approach for readability and performance.

   // Copilot suggests code...

   // Prompt (in AGENT mode):
    I want the approach you suggest me in option 2 but using this tool instead of that one and applying the helper that you suggest me on option 3.

   // Copilot suggests code and we continue iterating...

   ```

---

## Strategy 2: The 'Let's make a plan' strategy

The 'Let's make a plan' strategy is a great way to get started with Copilot. It's a simple strategy that allows you to get started with Copilot quickly and easily.

```text
// Prompt:
I want to scaffold a new feature for my app. The feature is a user authentication system with email and password login, social media login (Google, Facebook), and password recovery.
Let's make a plan for this project.
```

This strategy allows you to refine every step and what's done in each step. You can also ask for alternatives and pros/cons of each approach and achieve more clarity on what you want to do.

---

## Strategy 3: Role-Based Prompting

One of the most effective ways to improve Copilot’s responses is to **define a role** before asking your question.  
By telling the AI *who* it should act as, you shape its expertise, tone, and level of abstraction. This is a common approach when defining agents, if you're interested in that check out my article on [Creating AI Agents with Full Codebase Context](/blog/create-your-first-copilot-agent-with-full-context).

For example:

```text
// Prompt:
Act as a senior React developer in my team.
We use TypeScript, ESLint, and React Query.
I’ll paste a component and you’ll review it following our conventions.
````

When you assign a role, Copilot immediately adapts — it becomes more context-aware, more critical, and closer to how your own team would reason about the code. 

### Try These Roles

You can experiment with different roles to match your current task:

| Context       | Example Role                                         |
| ------------- | ---------------------------------------------------- |
| Code review   | “Act as a strict code reviewer.”                     |
| Testing       | “Act as a QA engineer focused on edge cases.”        |
| Performance   | “Act as a performance optimization specialist.”      |
| Documentation | “Act as a technical writer summarizing this module.” |

> 💡 **Quick Tip:** Combine roles with your stack context for sharper results.

By giving Copilot a clear identity, you turn it from a general assistant into a **focused teammate** who speaks your technical language.

---

## Embedding Context: Code-Instructions Files

If you want Copilot (or any AI assistant like Cursor or Windsurf) to follow your **team conventions** and understand your **project structure**, go beyond prompting — teach it once through configuration files.

You can add permanent context in files like:

- **`code-instructions.md`** (for GitHub Copilot)
- **`.cursorrules`** (for Cursor)
- **`.windsurfrules`** (for Windsurf)
...

### What to Include

Think of these files as your project's "AI onboarding manual."  

Here's what to document:

**Project architecture** — Explain your folder structure and key layers

```text
To create a section follow this structure:
section/
├── Section.literals.ts # Only one literal file per section
├── Section.ts
├── Section.css
├── components/ # Section specific components
│ ├── example-component/
│ │ ├── Component.tsx 
│ │ ├── Component.css
│ │ ├── Component.types.ts
...
```

**Team conventions** — Describe naming rules, style guides, and branching patterns

```text
- ALWAYS destructure props inside the definition of the component.
- NEVER use default exports.
...
```

**Tech stack reminders** — Clarify tools, frameworks, and preferred APIs

```text
### Core Technologies
- **Language:** TypeScript **5.4+**
- **Frontend Framework:** React **18.3+**
- **Bundler:** Vite **5.2+**
...
```

**Prompting preferences** — Add specific instructions for AI

```text
- When suggesting code, DON'T write comments.
- ALWAYS follow the ESLint rules declared in `.eslintrc`.
...
```


---

## Avoiding Common Pitfalls

Even with the right strategies, it's easy to fall into common traps when using Copilot. Learn from the mistakes others make:

👉 **[Read: Common Mistakes When Using GitHub Copilot (and How to Fix Them)](/blog/common-mistakes-when-using-github-copilot)**

This dedicated guide covers:
- ❌ Typing without context (and how to provide it)
- ❌ Over-trusting suggestions (and how to review critically)
- ❌ Forgetting to explain intent (and how to write better prompts)
- ❌ Not iterating on responses (and how to refine through conversation)

---

## BONUS: Creating AI Agents with Full Codebase Context

Want to take your Copilot usage to the next level? Learn how to create AI agents that understand your entire codebase using Repomix and GitHub Copilot. This advanced technique allows you to build intelligent assistants for your development team.

👉 **[Read: Create your first Agent using Copilot and Repomix](/blog/create-your-first-copilot-agent-with-full-context)**

---



_© Aridane Martín – 2025_
