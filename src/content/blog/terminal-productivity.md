---
title: "Terminal Productivity: Why the Mouse Doesn't Belong Here"
description: "Master terminal productivity with keyboard shortcuts, aliases, and automation. Learn why the mouse doesn't belong in your terminal and how to work efficiently."
publishDate: 2025-11-22
timeToRead: 6
isActive: true
tags: ["productivity", "terminal", "keyboard"]
author: "Aridane Martín"
img: "/assets/blog/terminal-productivity/terminal-article.webp"
img_alt: "Terminal productivity and keyboard shortcuts for developers"
---

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**  
_Conference: OpenCommit Fest_

---

## Introduction

Keyboard control is everything — even in your terminal. This guide will transform your terminal workflow from mouse-dependent to keyboard-mastered.

> ⌨️ **Principle:** The mouse doesn't belong in your terminal. Everything should be keyboard-driven.

---

## Must-Know Terminal Shortcuts

Master these essential shortcuts to work efficiently in any terminal.

### Essential Shortcuts

```bash
Ctrl + U        # Delete entire line
Ctrl + R        # Search command history
Cmd + Shift + R # Run commands directly from definition
Option + ← / →  # Jump between words
Ctrl + A        # Go to beginning of line
Ctrl + E        # Go to end of line
Ctrl + K        # Delete from cursor to end of line
Ctrl + W        # Delete word before cursor
```

### Navigation Shortcuts

```bash
Ctrl + A        # Beginning of line
Ctrl + E        # End of line
Option + ←      # Previous word
Option + →      # Next word
Ctrl + ←        # Previous word (alternative)
Ctrl + →        # Next word (alternative)
```

### History and Search

```bash
Ctrl + R        # Search command history
Ctrl + S        # Search forward in history
Ctrl + G        # Cancel search
!!              # Repeat last command
!$              # Last argument of previous command
!^              # First argument of previous command
```

---

## Git Aliases for Productivity

Create powerful aliases to make Git operations instant. You can simply add these aliases to your `~/.gitconfig` file. Here are some examples:

```ini
[alias]
  st = status
  co = checkout
  br = branch
  cm = commit -m
  lg = log --oneline --graph --decorate
  save = !git add . && git commit -m 'Save progress'
  undo = reset HEAD~1
  amend = commit --amend --no-edit
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = !gitk
```

### Advanced Git Aliases

```ini
[alias]
  # Branch management
  bd = branch -d
  bD = branch -D
  bm = branch -m
  brr = branch -r
  
  # Commit management
  ca = commit -a
  cam = commit -a -m
  cf = commit --fixup
  cr = commit --reuse-message
  
  # Log and history
  lga = log --oneline --graph --decorate --all
  lgs = log --oneline --graph --decorate --stat
  lgd = log --oneline --graph --decorate --date=short
  
  # Stash management
  sl = stash list
  sp = stash pop
  ss = stash save
  sd = stash drop
```

### The "Save the Game" Command

> 💾 **Save the game!**  
> Use `git save` to stage and commit everything with one command.

```ini
[alias]
  save = !git add . && git commit -m 'Save progress'
  wip = !git add . && git commit -m 'WIP'
  unwip = !git reset HEAD~1
```

---

## Terminal Automation

### Shell Functions

Create reusable functions for complex operations:

```bash
# Add to ~/.zshrc or ~/.bashrc

# Create and enter directory
mkcd() {
  mkdir -p "$1" && cd "$1"
}

# Quick git operations
gac() {
  git add . && git commit -m "$1"
}

# Quick directory navigation
..() {
  cd ..
}

...() {
  cd ../..
}

....() {
  cd ../../..
}
```

---

_© Aridane Martín – 2025_
