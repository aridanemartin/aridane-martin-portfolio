---
title: "Terminal Productivity and Shortcuts"
subtitle: "Feel like a 🐒 in the jungle!"
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
**Talk:** Boosting Productivity: Shortcut your coding

---



## Must-Know Terminal Shortcuts

Master these essential shortcuts to work efficiently in any terminal. Start step by step. First identify what makes your daily workflow easier and start with that. Once you have identified the shortcuts you use most, you can start to memorize them. Don't try to learn everything at once!

> 🧠 **Remember!**  
> Not anything have to be a shortcut! Just figure out what makes your daily workflow easier and start with that.

### Essential Shortcuts

```bash
Ctrl + `        # Open terminal section
Ctrl + shift + ` # Open new terminal
Ctrl + U        # Delete entire line
Ctrl + R        # Search history (Repeat to cycle)

Cmd + N        # New terminal tab
Cmd + W        # Close terminal 
```

As explained in [VSCode Shortcuts & Snippets](/blog/vscode-shortcuts-snippets) I try to keep the same shortcuts for the same actions across all my tools and `W` is always used to close something and `N` for new something.

### Navigation Shortcuts

As you can see in this section `Option + arrow` and `Cmd + arrow` are used to navigate through the terminal exactly as we do to navigate between words or lines in the code editor. The idea is always the same, to keep consistency across all your tools and not to have to learn new shortcuts for each tool.

```bash
Option + ←      # Previous word
Option + →      # Next word
Cmd + ←        # Beginning of line
Cmd + →        # End of line
```

---

## Git Aliases for Productivity

Create powerful aliases to make Git operations instant. You can simply add these aliases to your `~/.gitconfig` file. Here are some examples:

```ini
[alias]
  dm = diff main...HEAD
  save = !f() { git stash -u -m "${1:-Game saved}" && git stash apply && echo "Game saved!"; }; f
  current = rev-parse --abbrev-ref HEAD
  last = log -1 HEAD --stat
  undo = reset HEAD~1 --mixed
  done = !git push origin HEAD
  history = log --all --graph --decorate --oneline --simplify-by-decoration
  remove = branch -d
  
```

### 💾 The "Save the Game" Command

Have you ever been in a situation where you need to save your work but you don't want to commit it yet? This is a common scenario when you are working on a feature and you want to save your progress but you don't want to commit it yet. You can use the `git save` command to stage and commit everything with one command.

```ini
[alias]
  save = !f() { git stash -u -m "${1:-Game saved}" && git stash apply && echo "✨✨✨ \"${1:-Game saved}\" has been saved ✨✨✨"; }; f
```

---

## Terminal Automation

Very similar to the previous Git Aliases, we can create aliases for common terminal operations in the terminal configuration file.

### Terminal Aliases

Create aliases for common terminal operations:

```bash
# Command aliases
alias ni='npm install'
alias ns='npm start'
alias nd='npm run dev'
alias yi='yarn install'
alias ys='yarn start'
alias c='clear'
...
```

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
