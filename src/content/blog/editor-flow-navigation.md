---
title: "Editor Flow: Navigate VSCode with Surgical Precision"
description: "Master VSCode navigation with precision. Learn to move between editor zones, manage tabs efficiently, and navigate files like a pro developer."
publishDate: 2024-10-03
timeToRead: 4
tags: ["productivity", "vscode", "navigation"]
author: "Aridane Martín"
img: "/assets/blog/editor-flow-navigation/editorFlowCover.webp"
img_alt: "VSCode editor navigation and workflow for developers"
---

**Author:** Aridane Martín  
**Tech Lead – Pandora Project | Software Developer**  
_Conference: OpenCommit Fest_

---

Navigating inside the editor efficiently saves countless hours. In this guide I will propose you a way of transforming your VSCode navigation from lost tabs to precise motion.

> 🎯 **Goal:** Navigate your codebase with surgical precision, never losing your place or context.


## Move Between Editor Zones

Master the art of moving between different areas of VSCode without touching your mouse.


![Editor zones in VSCode](/assets/blog/editor-flow-navigation/editorZones.webp)

### Essential Zone Shortcuts

**Open/close the file explorer panel:** 
```text
Cmd + Shift + E (Explorer)
```

**Open/close the source control panel:** 
```text
Cmd + Shift + G (Git)
```

**Open/close the global search panel:** 
```text
Cmd + Shift + F (Find)
```

**Open/close the bookmarks panel:** 
```text
Cmd + Shift + B (Bookmarks)
```

**Open/close the GitHub Copilot panel:** 
```text
Cmd + Shift + I (Intelligence)
```

> 💡 **Pro Tip:** These shortcuts work as toggles - press once to open, press again to close the panel.

---

## Move Between Files

Navigate your codebase with precision moving through the files using Quick Open, definition and references. 
![F12 navigation shortcuts in VSCode](/assets/blog/editor-flow-navigation/f12.webp)

```text
Cmd + P            Quick Open
Cmd + F12          Go to definition (Goes to the place where the symbol is defined)
Cmd + Shift + F12  Find all references (Displays a list of all the places where the symbol is used)
```

here you have 3 examples of different ways of navigating to a file:

### The Explorer-First Pattern

1. **Start with Explorer** - `Cmd + Shift + E`
2. **Navigate to folder** - Use arrow keys
3. **Create/open files** - Use `Cmd + N` and write the path of the file or `Enter`

### The Search-First Pattern

1. **Quick Open** - `Cmd + P`
2. **Type filename** - Fuzzy search
3. **Open file** - `Enter`

### The Terminal-First Pattern

1. **Open Terminal** - `Ctrl + `` 
2. **Navigate directory** - Use `cd` commands
3. **Create files** - Use `touch` or `mkdir`
4. **Open in VSCode** - Use `code .` or `code filename` ([code command](https://code.visualstudio.com/docs/setup/mac#_configure-the-path-with-vs-code) needs to be previously installed)

---


## Tab management

Create easily recordable commands to close and open tabs as needed. Remember that this type of commands are used in many applications, try to share these shortcuts to remember them more easily.

```text
Ctrl + Tab / Ctrl + Shift + Tab  Move between open editors
Cmd + W                         Close tab
Cmd + shift + W                Close all tabs
Cmd + Shift + O                 Close OTHER tabs
Cmd + Shift + T                 Reopen closed tab (Same as chrome browser)
```


## Create Files Quickly

Master the art of creating files and folders without leaving your keyboard. When creating new files use 'create file' command (never 'create folder') and type the **full nested path**. This will allow you to create the file and the folders in one go.

### File Creation Workflow

1. **Use `Cmd + Shift + E`** - Open explorer
2. **Use `Cmd + N`** - Create new file
3. **Type full path including type extension** - Include all parent directories

```bash
grandparent/parent/newFile.ts
```

## Wrap Up

Mastering editor flow is about understanding your codebase structure and navigating it efficiently. Focus on:

- **Zone navigation** - Move between different areas of VSCode fluently
- **File navigation** - Find and open files quickly
- **Tab management** - Keep your workspace organized
- **File creation** - Create files and folders efficiently

---

_© Aridane Martín – 2025_