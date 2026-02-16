---
title: "Common Mistakes When Using GitHub Copilot"
subtitle: "and How to Fix Them! 🐳"
description: "Avoid these common pitfalls when using GitHub Copilot. Learn how to write better prompts, review AI suggestions critically, and iterate effectively for better code quality."
publishDate: 2025-10-02
lastUpdateDate: 2025-10-02
timeToRead: 6
isActive: true
tags:
  - GitHub Copilot
  - AI
  - Best Practices
  - Prompting
author: "Aridane Martín"
img: "./_images/commonMistakesGithubCopilotCover.webp"
img_alt: "Common mistakes developers make when using GitHub Copilot"
---

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**

---

GitHub Copilot is a powerful AI coding assistant, but many developers don't get the most out of it. They make avoidable mistakes that lead to generic suggestions, buggy code, or wasted time.

This guide breaks down the **4 most common mistakes** developers make when using Copilot — and shows you exactly how to fix them with real prompt examples.

---

## Mistake 1: Typing Without Context

Without proper context, Copilot makes generic guesses that rarely match your specific needs.

### The Problem

Most developers start typing code and hope Copilot figures out what they want. This leads to:
- Generic, boilerplate-heavy suggestions
- Code that doesn't match your architecture
- Solutions that ignore your tech stack
- Wasted time fixing or rewriting suggestions

### ❌ Bad Prompt:
```text
Create a function to handle users
```

This gives Copilot almost nothing to work with. It will likely suggest a generic CRUD function that doesn't match your API structure, database, or authentication pattern.

### ✅ Good Prompt:
```text
Create a user authentication endpoint for our Express API.
- Use JWT for token generation
- Validate email/password against PostgreSQL database
- Return access token and refresh token
- Handle rate limiting (5 attempts per minute)
- Follow our error handling pattern in src/utils/errors.ts
```

### Why It Works

The good prompt tells Copilot:
1. **What framework** you're using (Express)
2. **What authentication method** you need (JWT)
3. **What database** you're using (PostgreSQL)
4. **What security features** to include (rate limiting)
5. **Where to find patterns** to follow (existing error handling)

> 💡 **Pro Tip:** Before asking Copilot for code, ask yourself: "What would I tell a new team member who needs to implement this?"

---

## Mistake 2: Over-Trusting Suggestions

Blindly accepting suggestions without critical review leads to bugs and technical debt.

### The Problem

Copilot's suggestions often **look** correct at first glance. They follow reasonable patterns and use proper syntax. But they might:
- Miss critical edge cases
- Ignore security vulnerabilities
- Not follow your team's conventions
- Introduce subtle bugs that only appear in production

### ❌ Bad Approach:
```text
"Copilot suggested it, so it must be right. I'll just accept and move on."
```

This is like accepting a junior developer's first draft without code review. It's a recipe for bugs.

### ✅ Good Approach:
```text
1. Review the suggested code carefully
2. Check for edge cases (null values, empty arrays, division by zero)
3. Verify it follows your team's conventions
4. Test the implementation
5. Ask Copilot to improve: "Review this code for potential bugs and edge cases"
```

### Real Example

Let's say Copilot suggests this for calculating percentages:

```typescript
const percentages = data.map(item => (item.value / item.total) * 100)
```

Looks fine, right? But what happens when `item.total` is 0? **Division by zero error.**

A better approach after review:

```typescript
const percentages = data.map(item => 
  item.total === 0 ? 0 : (item.value / item.total) * 100
)
```

> 💡 **Pro Tip:** Always ask Copilot to review its own suggestions: "What edge cases or bugs might this code have?"

---

## Mistake 3: Forgetting to Explain Intent

Vague prompts lead to generic solutions that don't match your architecture.

### The Problem

Writing a one-word comment like `// Get users` tells Copilot **what** you're doing, but not:
- **Why** you're doing it
- **How** it fits into your architecture
- **What constraints** you have
- **What tools** you should use

### ❌ Bad Prompt:
```text
// Get users
```

This could mean:
- Fetch from an API?
- Query a database?
- Read from localStorage?
- Filter an existing array?

Copilot has no idea, so it guesses — and probably guesses wrong.

### ✅ Good Prompt:
```text
// Fetch active users from our REST API (/api/v2/users)
// Filter out users with status 'suspended' or 'deleted'
// Sort by registration_date descending
// Use our custom useFetch hook from src/hooks/useFetch.ts
// Handle loading states and errors with our ErrorBoundary component
```

### Why It Works

The good prompt provides:
1. **Exact API endpoint** to call
2. **Business logic** to apply (filtering)
3. **Sorting requirements**
4. **Existing tools** to use (custom hook)
5. **Error handling approach** (ErrorBoundary)

> 💡 **Pro Tip:** Think of comments as instructions to a teammate, not just reminders for yourself.

---

## Mistake 4: Not Iterating on Responses

Accepting the first suggestion instead of refining through conversation.

### The Problem

Many developers treat Copilot like a search engine:
1. Ask once
2. Accept first result
3. Move on

But Copilot works best as a **conversation partner**. The first suggestion is rarely perfect — it's a starting point for iteration.

### ❌ Bad Approach:
```text
"Give me a React form component"
[Accept first suggestion and stop]
```

You'll get a basic form, but it probably lacks:
- Validation
- Error handling
- Accessibility features
- Loading states
- Your team's styling patterns

### ✅ Good Approach:
```text
"Give me a React form component for user registration"
[Copilot suggests code]

"Now add Zod validation for email and password strength"
[Copilot improves code]

"Add error messages below each field and disable submit while validating"
[Copilot refines further]

"Make it accessible with proper ARIA labels and keyboard navigation"
[Final polished result]
```

### Why Iteration Works

Each iteration:
1. **Builds on previous context** — Copilot remembers what you've discussed
2. **Adds specific requirements** — You refine exactly what you need
3. **Catches gaps** — Each round reveals what's missing
4. **Produces production-ready code** — Not just a proof of concept

> 💡 **Pro Tip:** Think of Copilot suggestions as "version 1" of your code. Always ask: "What would make this better?"

---

## Putting It All Together: A Complete Example

Let's see how avoiding these mistakes looks in practice.

### ❌ Bad Workflow:
```text
// Create API call
[Accept generic fetch suggestion]
[Move on without testing]
[Discover bugs in production]
```

### ✅ Good Workflow:
```text
// STEP 1: Provide full context
"Create an API call to our /api/v2/products endpoint
- Use our custom apiClient from src/lib/api.ts
- Include authentication headers
- Handle rate limiting with exponential backoff
- Parse response with Zod schema from src/schemas/product.ts
- Cache results for 5 minutes using React Query"

[Copilot suggests initial implementation]

// STEP 2: Review and identify gaps
"Review this code for potential issues with error handling"

[Copilot suggests improvements]

// STEP 3: Iterate on specifics
"Add TypeScript types for all function parameters and return values"

[Copilot adds types]

// STEP 4: Test edge cases
"What happens if the API returns a 429 (rate limit) error?"

[Copilot explains and suggests handling]

// STEP 5: Verify conventions
"Does this follow our error handling pattern in src/utils/errors.ts?"

[Final production-ready code]
```

---

## Key Takeaways

1. **Always provide context** — Tell Copilot your stack, patterns, and constraints
2. **Review critically** — Treat suggestions as drafts, not final code
3. **Explain intent** — Write comments that explain why, not just what
4. **Iterate continuously** — Refine suggestions through multiple rounds

> 💡 **Remember:** Copilot is like a junior developer on your team. The better your instructions, the better the output. Don't accept the first draft — iterate until it's production-ready.

---

## Learn More About Effective Copilot Usage

Want to dive deeper into Copilot strategies? Check out these related articles:

- **[GitHub Copilot Strategies: Ask First, Then Code](/blog/github-copilot-prompting-strategies)** — Learn strategic prompting patterns and role-based techniques
- **[Create Your First AI Agent with Copilot and Repomix](/blog/create-your-first-copilot-agent-with-full-context)** — Build intelligent assistants with full codebase context

---

_© Aridane Martín – 2025_
