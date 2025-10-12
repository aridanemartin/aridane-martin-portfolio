---
title: "GitHub Copilot Strategies: Ask First, Then Code"
description: "Master GitHub Copilot with strategic prompting and context management. Learn how to guide AI assistance effectively and make Copilot work for you."
publishDate: 2024-10-08
tags: ["productivity", "ai", "copilot"]
author: "Aridane Martín"
img: "/assets/blog/github-copilot-strategies/githubCopilotStrategiesCover.webp"
img_alt: "GitHub Copilot strategies and AI assistance for developers"
---

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**  
_Conference: OpenCommit Fest_

---

## Introduction

GitHub Copilot can be your coding co-pilot — if you guide it right. This guide will teach you how to make AI work for you, not against you.

> 🤖 **Key Principle:** Ask first, then do. Guide the AI with clear intentions and context.

---

## The Strategy: Ask First, Then Do

The most effective approach to using Copilot is to **ask first, then do**. Don't just start coding and hope Copilot guesses what you want.

### Effective Prompting Strategy

1. **Ask first, then do** — e.g.:

   ```text
   // Prompt:
   I want to split this functionality out of this component.
   Give me options, explain pros/cons, and recommend the best approach for readability and performance.
   ```

2. **Provide context** - Explain what you're trying to achieve
3. **Be specific** - Don't leave room for interpretation
4. **Iterate** - Refine your prompts based on results

---

## Context Management with Repomix

Use **Repomix** to feed Copilot the full context of your project.

### What is Repomix?

Repomix is a powerful tool that creates a single, comprehensive file containing your entire codebase. It intelligently combines all your source code, configuration files, and documentation into one cohesive document that can be easily shared with AI assistants like GitHub Copilot.

![Repomix in action showing codebase analysis](/assets/blog/github-copilot-strategies/repomix.webp)

**Key Benefits:**
- **Complete Context**: AI sees your entire project structure
- **Intelligent Filtering**: Excludes unnecessary files (node_modules, logs, etc.)
- **Smart Organization**: Maintains file relationships and dependencies
- **Size Optimization**: Configurable limits to stay within AI context windows

### Setting Up Repomix



```bash
# Install Repomix
npm install -g repomix

# Generate project context
npx repomix

# This creates a single file with your entire codebase
```

### Why Repomix Works

- **Full context** - Copilot sees your entire project
- **Better suggestions** - More accurate code generation
- **Consistent patterns** - Follows your existing code style
- **Reduced errors** - Less likely to suggest incompatible code

### Repomix Configuration

Create a `.repomixrc.json` file:

```json
{
  "include": [
    "src/**/*",
    "package.json",
    "README.md"
  ],
  "exclude": [
    "node_modules/**/*",
    "dist/**/*",
    "*.log"
  ],
  "maxFileSize": 1000000,
  "maxFiles": 1000
}
```

---

## Copilot Prompting Techniques

### 1. Descriptive Comments

Use descriptive comments to guide Copilot:

```javascript
// Create a function that validates email addresses
// It should check for proper format and return boolean
// Handle edge cases like empty strings and null values

function validateEmail(email) {
  // Copilot will generate the implementation
}
```

### 2. Step-by-Step Instructions

Break down complex tasks:

```javascript
// TODO: Implement user authentication
// 1. Hash the password using bcrypt
// 2. Store user in database
// 3. Generate JWT token
// 4. Return user data without password

async function registerUser(userData) {
  // Copilot will follow the steps
}
```

### 3. Context-Rich Prompts

Provide relevant context:

```javascript
// In a React component that displays a list of users
// Each user has: id, name, email, role
// We need to filter users by role and sort by name
// Display in a table with edit and delete buttons

function UserList({ users, onEdit, onDelete }) {
  // Copilot understands the context
}
```

---

## Advanced Copilot Strategies

### 1. Pattern Recognition

Teach Copilot your patterns:

```javascript
// Our API response format
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: string[];
}

// Copilot will use this pattern
```

### 2. Error Handling Patterns

Establish consistent error handling:

```javascript
// Our error handling pattern:
// 1. Try the operation
// 2. Catch specific errors
// 3. Log error details
// 4. Return user-friendly message

async function apiCall(url, options) {
  // Copilot will follow the pattern
}
```

### 3. Testing Patterns

Guide Copilot to write tests:

```javascript
// Test pattern for our components:
// 1. Render component
// 2. Test initial state
// 3. Test user interactions
// 4. Test edge cases
// 5. Clean up

describe('UserComponent', () => {
  // Copilot will generate comprehensive tests
});
```

---

## Copilot Best Practices

### 1. Start with Comments

Always begin with descriptive comments:

```javascript
// Calculate the total price including tax and discounts
// Tax rate: 8.5%
// Discount: 10% for orders over $100
// Return formatted currency string

function calculateTotalPrice(items, discountCode) {
  // Copilot will implement based on the comment
}
```

### 2. Use TypeScript

TypeScript helps Copilot understand your intentions:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Copilot will use the interface
function processUser(user: User): string {
  // Better suggestions with types
}
```

### 3. Provide Examples

Show Copilot what you want:

```javascript
// Example of the data structure we're working with:
const sampleData = {
  users: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ]
};

// Now implement the function
function processUsers(data) {
  // Copilot understands the structure
}
```

---

## Troubleshooting Copilot Issues

### When Copilot Suggests Wrong Code

1. **Check your prompt** - Is it clear and specific?
2. **Provide more context** - Add relevant imports and types
3. **Use examples** - Show what you want with sample data
4. **Iterate** - Refine your approach based on results

### When Copilot is Too Slow

1. **Check your internet connection** - Copilot needs internet access
2. **Restart VS Code** - Sometimes a fresh start helps
3. **Check Copilot status** - Ensure it's properly authenticated
4. **Update Copilot** - Make sure you have the latest version

### When Copilot Suggests Insecure Code

1. **Review all suggestions** - Don't blindly accept code
2. **Understand the code** - Know what it does before using it
3. **Test thoroughly** - Verify the code works as expected
4. **Follow security best practices** - Don't rely on Copilot for security

---

## Copilot Integration Tips

### 1. Use Copilot Chat

Leverage the chat feature for complex tasks:

```
// Chat prompt:
I need to create a React component that:
- Displays a list of products
- Allows filtering by category
- Shows product details on click
- Handles loading and error states
- Uses our existing API structure
```

### 2. Combine with Other Tools

Use Copilot alongside other productivity tools:

- **GitHub Copilot** - Code generation
- **GitHub Copilot Chat** - Complex problem solving
- **VS Code IntelliSense** - Code completion
- **ESLint** - Code quality
- **Prettier** - Code formatting

### 3. Team Collaboration

Share Copilot strategies with your team:

- **Document patterns** - Create a style guide
- **Share prompts** - Use consistent prompting techniques
- **Review together** - Code review Copilot suggestions
- **Learn together** - Share effective strategies

---

## Wrap Up

Mastering GitHub Copilot is about learning to guide AI effectively. Focus on:

- **Clear prompting** - Ask specific questions
- **Context management** - Provide relevant information
- **Pattern recognition** - Teach Copilot your style
- **Iterative improvement** - Refine your approach

> 🚀 **The goal:** Make AI work for you by asking the right questions and providing the right context.

---

_© Aridane Martín – 2025_
