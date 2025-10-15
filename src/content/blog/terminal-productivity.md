---
title: "Terminal Productivity: Why the Mouse Doesn't Belong Here"
description: "Master terminal productivity with keyboard shortcuts, aliases, and automation. Learn why the mouse doesn't belong in your terminal and how to work efficiently."
publishDate: 2024-10-12
timeToRead: 6
tags: ["productivity", "terminal", "keyboard"]
author: "Aridane Martín"
img: "/assets/blog/terminal-productivity/terminalProductivityCover.webp"
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

## Customize Your Terminal

Use autocomplete and aliases to make repetitive commands instant.

### Shell Configuration

**For Zsh (macOS default):**
```bash
# Add to ~/.zshrc
autoload -U compinit && compinit
setopt AUTO_CD
setopt CORRECT
setopt HIST_IGNORE_DUPS
```

**For Bash:**
```bash
# Add to ~/.bashrc
set -o vi
shopt -s histappend
shopt -s checkwinsize
```

### Autocomplete Setup

**Zsh autocomplete:**
```bash
# Install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
echo "source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc
```

---

## Git Aliases for Productivity

Create powerful aliases to make Git operations instant.

### Essential Git Aliases

Add to your `~/.gitconfig`:

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

# Find and kill process
fkill() {
  ps aux | grep "$1" | grep -v grep | awk '{print $2}' | xargs kill -9
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

### Environment Variables

Set up useful environment variables:

```bash
# Add to ~/.zshrc or ~/.bashrc
export EDITOR='code'
export BROWSER='open'
export PAGER='less'
export LESS='-R'

# Git configuration
export GIT_EDITOR='code --wait'
export GIT_PAGER='less -R'

# Node.js
export NODE_ENV='development'
export NPM_CONFIG_PREFIX='~/.npm-global'
```

---

## Terminal Customization

### Prompt Customization

**Zsh with Oh My Zsh:**
```bash
# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Use a theme
ZSH_THEME="agnoster"
```

**Custom prompt:**
```bash
# Add to ~/.zshrc
PROMPT='%F{green}%n@%m%f %F{blue}%~%f %F{red}%#%f '
```

### Terminal Themes

**VS Code Terminal:**
- Use a dark theme for better readability
- Increase font size for comfort
- Use a monospace font like "JetBrains Mono"

**iTerm2 (macOS):**
- Install a color scheme like "Dracula" or "Solarized"
- Use ligatures for better code display
- Configure hotkeys for quick access

---

## Advanced Terminal Techniques

### Multi-Pane Workflows

**Terminal multiplexing with tmux:**
```bash
# Install tmux
brew install tmux

# Basic tmux commands
tmux new-session -d -s mysession
tmux split-window -h
tmux split-window -v
tmux attach-session -t mysession
```

**VS Code Integrated Terminal:**
- Use `Ctrl + `` to toggle terminal
- Use `Cmd + Shift + `` to create new terminal
- Use `Cmd + Shift + 5` to split terminal

### Terminal History

**Search command history:**
```bash
# Search history
Ctrl + R

# Navigate history
↑ / ↓ arrows

# Execute from history
!<number>    # Execute command by number
!<string>    # Execute last command starting with string
```

---

## Troubleshooting Terminal Issues

### Common Problems

**Slow terminal?**
- Check for slow shell startup
- Disable unnecessary plugins
- Use `time zsh -i -c exit` to measure startup time

**Autocomplete not working?**
- Ensure autocomplete is installed
- Check shell configuration
- Restart terminal session

**Aliases not working?**
- Check file permissions
- Ensure file is sourced
- Use `source ~/.zshrc` to reload

### Performance Optimization

**Shell startup optimization:**
```bash
# Profile shell startup
zsh -i -c exit

# Optimize .zshrc
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
```

---

## Wrap Up

Mastering terminal productivity is about eliminating mouse dependency and building keyboard-driven workflows. Focus on:

- **Essential shortcuts** - Master the basics first
- **Custom aliases** - Create shortcuts for your workflow
- **Shell functions** - Automate complex operations
- **Terminal customization** - Make it work for you

> 🚀 **The goal:** Never touch your mouse in the terminal. Everything should be keyboard-driven.

---

_© Aridane Martín – 2025_
