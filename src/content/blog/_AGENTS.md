# Blog AGENTS.md

Rules and conventions for creating and editing blog articles in this portfolio.

---

## Article Structure

Each blog article lives in its own folder with colocated images:

```
src/content/blog/<article-name>/
├── index.md          # Article content with frontmatter
└── _images/          # Colocated images (underscore prefix required)
    └── articleNameCover.webp
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| **Folder name** | kebab-case, descriptive | `agent-skills-getting-started/` |
| **Article file** | Always `index.md` | `index.md` |
| **Cover image** | camelCase + `Cover` suffix | `agentSkillsGettingStartedCover.webp` |
| **Other images** | camelCase, descriptive | `workflowDiagram.webp` |

---

## Required Frontmatter

Every article **must** include these fields:

```yaml
---
title: "Your Article Title"
description: "A compelling 1-2 sentence summary for SEO and previews."
publishDate: 2026-01-19
tags: ["tag1", "tag2", "tag3"]
img: ./_images/articleNameCover.webp
---
```

### Optional Frontmatter Fields

```yaml
---
subtitle: "A catchy subtitle with emoji 🚀"
timeToRead: 6                      # Estimated reading time in minutes
author: "Aridane Martín"
lastUpdateDate: 2026-01-20         # When article was last updated
isActive: true                     # Set false to hide from listings
img_alt: "Descriptive alt text for accessibility"
---
```

### Frontmatter Schema Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Article title (use quotes if special chars) |
| `description` | string | ✅ | SEO description, shown in previews |
| `publishDate` | date | ✅ | Format: `YYYY-MM-DD` |
| `tags` | string[] | ✅ | Array of lowercase tags |
| `img` | image path | ✅ | Relative path: `./_images/nameCover.webp` |
| `subtitle` | string | ❌ | Optional catchy subtitle |
| `timeToRead` | number | ❌ | Estimated minutes to read |
| `author` | string | ❌ | Author name |
| `lastUpdateDate` | date | ❌ | Last significant update |
| `isActive` | boolean | ❌ | Default `true`, set `false` to hide |
| `img_alt` | string | ❌ | Alt text for cover image |

---

## Content Guidelines

### Opening Structure

Start articles with a **hook** — don't jump straight into technical content:

```markdown
---
[frontmatter]
---

If you've been working with [topic], you've probably encountered [common problem].

**[Solution/concept]** solves this elegantly. [Brief explanation of what it is].

This guide covers [what reader will learn]. If you're already comfortable with basics, check out [link to advanced content].

---

## First Major Section
```

### Formatting Conventions

- Use `---` horizontal rules to separate major sections
- Use `> 💡` for tips: `> 💡 **Pro tip:** Your tip here.`
- Use `> ⚠️` for warnings: `> ⚠️ **Warning:** Your warning here.`
- Use tables for comparisons and reference data
- Use code blocks with language hints: ` ```yaml `, ` ```typescript `, etc.

### Section Headings

- `## H2` for major sections
- `### H3` for subsections
- `#### H4` sparingly, for nested details
- Keep headings concise and scannable

### Links

- Internal links: `/blog/article-slug` (no trailing slash)
- External links: Full URL with descriptive text
- Cross-reference related articles when relevant

---

## Image Guidelines

### Cover Images

- **Format:** WebP preferred (smaller file size)
- **Dimensions:** Aim for 1200×630px (social sharing optimal)
- **Naming:** `articleNameCover.webp` (camelCase + Cover suffix)
- **Location:** `./_images/` folder within article directory

### Inline Images

For images within the article content:

```markdown
![Alt text describing the image](./_images/imageName.webp)
```

### Why `_images/` with Underscore?

The underscore prefix tells Astro's Content Collections to **ignore** this folder when processing content. Without it, Astro treats `.webp` files as data entries and throws errors.

---

## Tags

Use lowercase, consistent tags across articles:

| Category | Tags |
|----------|------|
| **AI/Copilot** | `ai`, `copilot`, `agents`, `prompting` |
| **Productivity** | `productivity`, `keyboard`, `terminal` |
| **VS Code** | `vscode`, `extensions`, `shortcuts` |
| **Development** | `typescript`, `react`, `testing` |

---

## Article Series

When writing multi-part series:

1. Include "Part 1", "Part 2" in titles
2. Cross-link between parts in intro and outro
3. Use consistent naming: `topic-part-1/`, `topic-part-2/`

Example:
```markdown
title: "Agent Skills Part 1: Getting Started with SKILL.md"
```

---

## Pre-Publish Checklist

Before publishing a new article:

- [ ] Frontmatter complete with all required fields
- [ ] Cover image in `_images/` with correct naming
- [ ] `img` path uses relative format: `./_images/nameCover.webp`
- [ ] Tags are lowercase and consistent with existing articles
- [ ] Internal links use correct format: `/blog/slug`
- [ ] Code blocks have language hints
- [ ] Run `npm run build` to verify no errors

---

## Quick Start: New Article

```bash
# 1. Create folder structure
mkdir -p src/content/blog/my-new-article/_images

# 2. Add cover image
# Place your image at: src/content/blog/my-new-article/_images/myNewArticleCover.webp

# 3. Create article
touch src/content/blog/my-new-article/index.md

# 4. Add frontmatter and content to index.md

# 5. Verify build
npm run build
```
