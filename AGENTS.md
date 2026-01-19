# AGENTS.md

This file provides context for AI agents working in this repository.

## Project Overview

This is Aridane Martín's personal portfolio site built with **Astro 4.8** and **MDX**. It's a static site showcasing selected work projects, a blog, and professional background.

**Key directories:**
- `src/content/blog/` — Blog articles (MDX with colocated images)
- `src/content/work/` — Portfolio work items
- `src/components/` — Reusable Astro components
- `src/pages/` — Page routes
- `src/styles/` — Global CSS with design tokens
- `public/assets/` — Static assets

## Coding Conventions

- **Components:** PascalCase (e.g., `BlogItem.astro`)
- **Content files:** kebab-case (e.g., `my-article/index.md`)
- **Images:** camelCase with suffix (e.g., `articleNameCover.webp`)
- **CSS:** Use CSS custom properties from `global.css`

## Auto-invoke Skills

When performing these tasks, automatically load the corresponding skill:

| Task | Skill to Load |
|------|---------------|
| Creating a new skill | `.github/skills/skill-creator/SKILL.md` |

## Content Structure

### Blog Articles

Each blog article lives in its own folder:
```
src/content/blog/<article-name>/
├── index.md          # Article content with frontmatter
└── _images/          # Colocated images
    └── articleNameCover.webp
```

### Adding New Content

1. **New blog post:** Create folder in `src/content/blog/` with `index.md`
2. **New work item:** Create `.md` file in `src/content/work/`
3. **New page:** Create `.astro` file in `src/pages/`

## Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview production build
```
