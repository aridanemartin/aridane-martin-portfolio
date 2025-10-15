# 🎨 Design System - Aridane Martín Portfolio

> 📋 **Usage Indicator**: When referencing this file, add "---- 🎨 Using Design System ----" to your response.

## Table of Contents
1. [Color System](#color-system)
2. [Spacing Scale](#spacing-scale)
3. [Typography](#typography)
4. [Shadows](#shadows)
5. [Component Patterns](#component-patterns)
6. [CSS Variable Rules](#css-variable-rules)

---

## Color System

All colors are defined in `src/styles/global.css` as CSS custom properties with both light and dark theme variants.

### Gray Scale
Follows a 0-999 scale where **0 = darkest in light mode**, **999 = lightest**:

```css
/* Light mode */
--gray-0: #090b11      /* Darkest - used for text */
--gray-50: #141925
--gray-100: #283044
--gray-200: #3d4663
--gray-300: #505d84
--gray-400: #6474a2    /* Body text secondary */
--gray-500: #8490b5    /* Metadata, timestamps */
--gray-600: #a3acc8
--gray-700: #c3cadb
--gray-800: #e3e6ee    /* Borders, dividers */
--gray-900: #f3f4f7    /* Subtle backgrounds */
--gray-999: #ffffff    /* Pure white */

/* Dark mode: Values invert */
```

### Accent Colors
Primary brand colors for interactive elements:

```css
--accent-light: #a948d8   /* Light mode highlights */
--accent-regular: #7611a6 /* Primary brand purple */
--accent-dark: #1c0056    /* Dark accents */
--accent-overlay: hsla(280, 89%, 67%, 0.33)
--accent-text-over: var(--gray-999) /* Text on accent bg */
```

### Component-Specific Colors
For elements that should remain consistent across themes:

```css
/* Updated badge - constant in both themes */
--badge-updated-bg: #7611a6
--badge-updated-text: #ffffff
```

### Link Colors

```css
--link-color: var(--accent-regular)  /* Light mode */
--link-color: var(--accent-dark)     /* Dark mode */
```

---

## Spacing Scale

**Current Implementation**: Direct rem values (no CSS variables yet)

Common spacing values used throughout the project:

| Value | Pixels | Usage |
|-------|--------|-------|
| `0.25rem` | 4px | Tight spacing (badge padding) |
| `0.5rem` | 8px | Small gaps (tags, chips) |
| `0.75rem` | 12px | Medium gaps (meta info) |
| `1rem` | 16px | Base spacing |
| `1.5rem` | 24px | Card padding (mobile) |
| `2rem` | 32px | Card padding (desktop) |
| `3rem` | 48px | Section spacing |

**Utility Classes**:
```css
.gap-2, .gap-4, .gap-8, .gap-10, .gap-15, .gap-20, .gap-30, .gap-48
```

---

## Typography

### Font Families

```css
--font-system: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif
--font-body: "Public Sans", var(--font-system)
--font-brand: Rubik, var(--font-system)
```

**Usage**:
- `--font-body`: Body text, paragraphs, descriptions
- `--font-brand`: Headings, titles, hero text

### Font Sizes

Follows a modular scale from xs to 5xl:

```css
--text-xs: 0.75rem    /* 12px - Metadata, timestamps, badges */
--text-sm: 0.875rem   /* 14px - Small body text */
--text-base: 1rem     /* 16px - Base body text */
--text-md: 1.125rem   /* 18px - Large body text */
--text-lg: 1.25rem    /* 20px - Small headings */
--text-xl: 1.625rem   /* 26px - Medium headings */
--text-2xl: 2.125rem  /* 34px - Large headings */
--text-3xl: 2.625rem  /* 42px - Hero titles */
--text-4xl: 3.5rem    /* 56px - Extra large */
--text-5xl: 4.5rem    /* 72px - Massive titles */
```

---

## Shadows

Three levels of elevation:

```css
--shadow-sm: 0px 6px 3px rgba(9, 11, 17, 0.01), 0px 4px 2px rgba(9, 11, 17, 0.01), 0px 2px 2px rgba(9, 11, 17, 0.02), 0px 0px 1px rgba(9, 11, 17, 0.03)

--shadow-md: 0px 28px 11px rgba(9, 11, 17, 0.01), 0px 16px 10px rgba(9, 11, 17, 0.03), 0px 7px 7px rgba(9, 11, 17, 0.05), 0px 2px 4px rgba(9, 11, 17, 0.06)

--shadow-lg: 0px 62px 25px rgba(9, 11, 17, 0.01), 0px 35px 21px rgba(9, 11, 17, 0.05), 0px 16px 16px rgba(9, 11, 17, 0.1), 0px 4px 9px rgba(9, 11, 17, 0.12)
```

**Usage**:
- `--shadow-sm`: Cards, buttons (default state)
- `--shadow-md`: Cards on hover, elevated panels
- `--shadow-lg`: Modals, dropdowns, high elevation

---

## Component Patterns

### Badges

**Updated Badge** (used for recently updated articles):

```css
.updated-badge {
  background: var(--badge-updated-bg);
  color: var(--badge-updated-text);
  padding: 0.25rem 0.75rem;
  border-radius: 0.75rem;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
}
```

**Tag/Chip** (used for categories, topics):

```css
.tag {
  background: var(--gray-800);
  color: var(--gray-300);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: var(--text-xs);
  font-weight: 500;
}
```

### Cards

Standard card pattern used throughout the site:

```css
.card {
  background: var(--gradient-subtle);
  border: 1px solid var(--gray-800);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--theme-transition);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

### Buttons/Links

```css
.button {
  background: var(--accent-regular);
  color: var(--accent-text-over);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all var(--theme-transition);
}

.button:hover {
  background: var(--accent-light);
}
```

---

## CSS Variable Rules

### Naming Conventions

**Pattern**: `--{category}-{variant}`

```css
/* ✅ Good: Semantic, self-documenting */
--accent-regular
--gray-500
--badge-updated-bg
--text-xl

/* ❌ Avoid: Functional, not semantic */
--purple-primary
--medium-gray
--button-background
--heading-size
```

### Adding New Variables

**Checklist**:
1. ✅ Define in both `:root` and `:root.theme-dark`
2. ✅ Use semantic names over functional ones
3. ✅ Leverage existing gray scale before creating new grays
4. ✅ For theme-constant values, explicitly set same value in both themes
5. ✅ Add inline comments for complex/non-obvious purposes

**Example - Adding a "New" badge**:

```css
/* In :root (light theme) */
--badge-new-bg: var(--accent-light);
--badge-new-text: var(--gray-0);

/* In :root.theme-dark */
--badge-new-bg: var(--accent-light);  /* Same value = constant across themes */
--badge-new-text: var(--gray-0);      /* Same value = constant across themes */
```

### Variable Composition

Prefer referencing existing variables over creating duplicates:

```css
/* ✅ Good: Reuses existing values */
--badge-success-bg: var(--accent-regular);

/* ❌ Avoid: Duplicates hex value */
--badge-success-bg: #7611a6;
```

---

## Responsive Breakpoints

Standard breakpoints used across the site:

```css
/* Mobile-first approach */
@media (min-width: 50em) {  /* ~800px - Tablet and up */
  /* Larger layouts, increased spacing */
}

@media (width < 768px) {    /* Mobile */
  /* Simplified layouts, reduced spacing */
}

@media (max-width: 480px) {  /* Small mobile */
  /* Extra compact layouts */
}
```

---

## Transitions

Standard transition for theme switching and interactions:

```css
--theme-transition: 0.2s ease-in-out;
```

**Usage**:
```css
transition: box-shadow var(--theme-transition);
transition: color var(--theme-transition);
transition: background var(--theme-transition);
```

---

## Notes for AI Agents

- **Always check this file before writing CSS** to ensure consistency
- **Use existing variables** instead of hardcoding values
- **Follow the gray scale**: Don't create new gray shades without reason
- **Component-specific variables**: For elements that need consistent styling across themes (badges, specific buttons), create dedicated variables
- **Prefer composition**: Build new variables from existing ones when possible

---

**Last Updated**: 2025-10-15
