---
title: "Boosting Productivity: Shortcut Your Coding"
description: "Learn essential shortcuts, workflows, and tools to boost your coding productivity. From desktop flow to AI assistance, discover techniques that will transform your development workflow."
publishDate: 2025-01-27
tags: ["productivity", "development", "tools", "workflow", "shortcuts"]
author: "Aridane Martín"
---

# Boosting Productivity: Shortcut Your Coding

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**  
_Conference: OpenCommit Fest_

---

## Introduction

Welcome!  
This talk is designed for **everyone** — developers at any level who want to get more out of their setup.  
It’s **not** a recipe for everyone or a review of VSCode docs. Instead, it’s a set of ideas, shortcuts, and workflows you can adapt to your own stack.

> 💡 **Tip:** Don’t worry about memorizing everything. Focus on ideas that resonate with you, revisit them later, and adapt them to your context.

---

## 1. Desktop Flow: From Window Dragging to Instant Alignment

Let’s start by mastering your **desktop flow** — efficient window management.

### The Basics

- **Rectangle app** → move and resize windows instantly  
- **Spotlight / Raycast** → fast app & file navigation  
- **AltTab app** → advanced window switcher  
- **Gestures on Mac** → use multi-touch for window control  

### Rectangle Shortcuts

```text
Cmd + Option + ← →   Align left/right half of screen
Cmd + Option + Enter  Maximize window
Ctrl + Cmd + Option + ←/→  Move window to next screen
```

### AltTab App

- Switch between multiple instances of the same app  
- Close apps from preview  
- Blacklist apps you don’t want in Alt+Tab

### Raycast

- Smart universal search  
- Plugin ecosystem for everything  
- Deep customization options  

---

## 2. Shortcuts & Snippets: From Chaos to Muscle Memory

The secret to mastering shortcuts is not speed — it’s **consistency**.

### Think in Actions, Not Keys

> 🧠 Build muscle memory by associating shortcuts with actions, not key patterns.

| Action | Shortcut |
|--------|-----------|
| Next / Previous editor tab | `Cmd + PageUp / PageDown` |
| Close tab / Kill terminal | `Cmd + W` |
| Reopen closed tab | `Cmd + Shift + T` |
| New file / tab / terminal | `Cmd + N` |
| Find in project | `Cmd + Shift + F` |
| Go to explorer | `Cmd + Shift + E` |
| Git section | `Cmd + Shift + G` |
| Select line | `Cmd + L` |

### Build Better Shortcuts

- Use **VSCode → Keyboard Shortcuts** to personalize your setup.  
- Combine native commands to create multi-step actions — no plugins required.

### Quick Tip: Leave Your Comfort Zone

Try switching your keyboard and mouse position for a day.  
It’s a fun brain hack that forces you to rely more on keyboard commands.

---

## 3. Editor Flow: From Lost Tabs to Precise Motion

Navigating inside the editor efficiently saves countless hours.

### Move Between Editor Zones

```text
Ctrl + `           Toggle terminal
Cmd + Shift + E    Explorer
Cmd + Shift + G    Git
Cmd + Shift + F    Find
Cmd + Shift + B    Bookmarks
Cmd + Shift + I    Copilot
Cmd + `            Navigate between open editors
```

### Move Between Files

```text
Cmd + F12          Go to definition
Cmd + Shift + F12  Find all references
```

### Manage Tabs

```text
Ctrl + Tab / Ctrl + Shift + Tab  Move between editors
Cmd + W                         Close tab
Cmd + Shift + O                 Close other tabs
Cmd + Shift + T                 Reopen closed tab
```

### Create Files Quickly

When creating new files, type the **full nested path**:

```bash
grandparent/parent/newFile.ts
```

VSCode will auto-create missing folders for you.

---

## 4. Terminal: The Mouse Doesn’t Belong Here

Keyboard control is everything — even in your terminal.

### Must-Know Shortcuts

```bash
Ctrl + U        # Delete entire line
Ctrl + R        # Search command history
Cmd + Shift + R # Run commands directly from definition
Option + ← / →  # Jump between words
```

### Customize Your Terminal

Use autocomplete and aliases to make repetitive commands instant.

#### Example: Git Aliases

Add to your `~/.gitconfig`:

```ini
[alias]
  st = status
  co = checkout
  br = branch
  cm = commit -m
  lg = log --oneline --graph --decorate
  save = !git add . && git commit -m 'Save progress'
```

> 💾 **Save the game!**  
> Use `git save` to stage and commit everything with one command.

---

## 5. Copilot: Make This Guy Work for You

GitHub Copilot can be your coding co-pilot — if you guide it right.

### Strategy

1. **Ask first, then do** — e.g.:

   ```text
   // Prompt:
   I want to split this functionality out of this component.
   Give me options, explain pros/cons, and recommend the best approach for readability and performance.
   ```

2. Use **Repomix** to feed Copilot the full context:
   ```bash
   npx repomix
   ```
   It bundles your repository into one file so Copilot “sees” the big picture.

---

## Bonus: Organize Your TODOs

Use `TODO Tree` to track ideas, improvements, and pending tasks.

```js
// TODO: refactor authentication middleware
// FIXME: handle edge case in pagination
// NOTE: revisit after API migration
```

> 🪦 **Idea:** Create a “TODOs graveyard” where you archive completed ones to avoid clutter.

---

## Wrap Up

You don’t need to memorize every shortcut or command — focus on:

- Building **muscle memory** slowly.  
- Customizing your **tools** to your habits.  
- Guiding AI and automation tools **intentionally**.  

> 🚀 The goal: stop fighting your tools and start letting them work for you.

---

_© Aridane Martín – 2025_
