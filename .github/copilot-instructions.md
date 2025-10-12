# Copilot Instructions - Aridane Martín Portfolio

## Project Overview

This is Aridane Martín's personal portfolio site built with **Astro 4.8** and **MDX**. It's a static site showcasing selected work projects, a blog, and professional background. The site features a clean, modern design with light/dark theme support and responsive layouts.

**Live site**: [aridanemartin.dev](https://www.aridanemartin.dev)

## Architecture & Key Patterns

### Content-Driven Architecture
- **Content Collections**: All dynamic content lives in `src/content/` and is managed via Astro's Content Collections API (`src/content/config.ts`)
- **Work portfolio items**: MDX files in `src/content/work/` with frontmatter schema:
  ```yaml
  title: string
  publishDate: date
  img: string (path to /public/assets/works/)
  img_alt: string (optional)
  description: string
  tags: array of strings
  url: string
  ```
- **About content**: TypeScript data files in `src/content/about/`:
  - `educationContent.ts` - Array of education items with title, year, description, logoImage
  - `timelineContent.ts` - Array of career timeline items with title, year, description, image

### Component Structure
- **Layout wrapper**: `src/layouts/BaseLayout.astro` provides the base HTML structure, includes `<MainHead>`, `<Nav>`, `<Footer>`, and handles theme switching via ViewTransitions
- **Reusable components**: All in `src/components/`
  - `Icon.astro` - SVG icon component using `IconPaths.ts` mapping; supports gradient fills and size customization
  - `Skills.astro`, `Hero.astro`, `ContactCTA.astro` - Composite components for page sections
  - `PortfolioPreview.astro` - Card component for work items
  - `Grid.astro` - Layout component with variants (`offset`, `small`)

### Styling System
- **CSS Custom Properties**: All design tokens defined in `src/styles/global.css` under `:root` and `:root.theme-dark`
- **Theme switching**: Uses `.theme-dark` class on `<html>` element; automatically switches background images and color variables
- **Responsive images**: Background images load at 800w by default, 1440w for screens >50em
- **Lazy-loaded backgrounds**: Below-the-fold backgrounds only load after `.loaded` class is added via JS in `BaseLayout.astro`

## Developer Workflows

### Local Development
```bash
npm run dev          # Starts dev server at localhost:4321
npm run build        # Builds to ./dist/
npm run preview      # Preview production build locally
```

### Adding New Work Items
1. Create new `.md` file in `src/content/work/`
2. Add frontmatter matching schema in `src/content/config.ts`
3. Place image in `/public/assets/works/`
4. Work items auto-sorted by `publishDate` (most recent first) on homepage (shows 4) and `/work` page (shows all)

### Adding New Pages
- Create `.astro` file in `src/pages/`
- Wrap content in `<BaseLayout>` for consistent header/footer
- Dynamic routes use `[...slug].astro` pattern (e.g., `src/pages/work/[...slug].astro`)

## Project-Specific Conventions

### File Naming
- Components: PascalCase (e.g., `CallToAction.astro`, `PortfolioPreview.astro`)
- Content: kebab-case (e.g., `carolina-almeida.md`, `escolaport.md`)
- Assets: Descriptive names in `/public/assets/` subdirectories by type (`backgrounds/`, `works/`, `educationLogos/`, `timeline/`)

### Component Patterns
- **Icon usage**: Always specify `size` prop when deviating from default 40px
- **Gradient icons**: Add `gradient` boolean prop to use CSS custom properties `--gradient-stop-1/2/3`
- **Grid layouts**: Use `<Grid variant="offset">` for staggered portfolio grids, `variant="small"` for compact grids

### Data Fetching
- Use `getCollection("work")` to fetch work items, always sort by publishDate: 
  ```typescript
  const projects = (await getCollection("work"))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  ```

### Theme Implementation
- Dark theme triggered by `.theme-dark` class on root
- Theme toggle handled by `ThemeToggle.astro` component in Nav
- Always define both light and dark variants for new color variables

## Important Files

- `src/content/config.ts` - Content collection schemas (modify when adding new frontmatter fields)
- `src/components/IconPaths.ts` - SVG path definitions for icons (add new icons here)
- `src/styles/global.css` - All CSS custom properties and global styles
- `src/layouts/BaseLayout.astro` - Base page wrapper with theme system
- `public/assets/` - All static assets (images organized by subdirectory)

## External Dependencies

- **Astro**: Static site framework, uses file-based routing
- **@astrojs/mdx**: MDX integration for rich content authoring
- **ViewTransitions**: Built-in Astro feature for smooth page transitions

## Testing & Deployment

- No test framework currently configured
- Build artifacts go to `./dist/`
- Site based on Jeanine White's template (credited in footer)

## Common Tasks

**Add a new skill section**: Edit `src/components/Skills.astro`, add new `<div class="stack gap-2 lg:gap-4">` block with Icon, heading, and description.

**Change homepage hero**: Edit `src/pages/index.astro`, modify `<Hero>` component props (title, tagline) and profile image path.

**Update education/timeline**: Edit TypeScript arrays in `src/content/about/educationContent.ts` or `timelineContent.ts`.

**Add new icons**: Add SVG path to `src/components/IconPaths.ts`, then use via `<Icon icon="your-icon-name" />`.
