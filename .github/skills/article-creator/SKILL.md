---
name: article-creator
description: Create new blog articles by researching a topic on the web or using provided links, then writing
  a complete article matching the site's existing style and conventions. Use when the user asks to
  "write an article", "create a blog post", "draft a post about…", or provides links to research
  and turn into an article.
license: MIT
metadata:
  author: aridane-martin
  version: "1.0"
  scope: root
allowed-tools:
  - read
  - write
  - edit
  - fetch_webpage
---

# Article Creator

Creates new blog articles for the portfolio by researching a topic on the web (or using user-provided links) and writing a complete, publish-ready article that matches the voice, structure, and conventions of existing articles on the site.

## When to Use

- User asks to "write an article", "create a blog post", or "draft a post about…"
- User provides one or more links and asks you to turn them into an article
- User asks to research a topic and produce a blog post

## Prerequisites

Before writing, always load the blog conventions file:

```
src/content/blog/_AGENTS.md
```

This contains the frontmatter schema, folder structure, naming conventions, formatting rules, and pre-publish checklist.

## Workflow

### Step 1: Gather Requirements

Collect the following from the user (ask if not provided):

1. **Topic** (required) — What the article is about
2. **Links / sources** (optional) — URLs to research or use as reference material
3. **Target audience** (optional, default: developers) — Who is the article for
4. **Desired tags** (optional) — Will be inferred from topic if not provided
5. **Tone preference** (optional, default: match existing articles) — Any specific tone

### Step 2: Research the Topic

Use one or both of these approaches:

#### A. User-Provided Links
- Fetch each link using `fetch_webpage` with a query describing the topic
- Extract key concepts, code examples, best practices, and insights
- Note which sources provided which information for attribution

#### B. Web Research (no links provided)
- Use `fetch_webpage` to search authoritative sources about the topic
- Target 3-5 quality sources: official docs, well-known blogs, conference talks
- Prioritize recent, accurate, and practical content
- Focus on: core concepts, practical examples, common pitfalls, best practices

### Step 3: Outline the Article

Before writing, create a structured outline:

```
1. Hook / Opening (relatable problem or scenario)
2. Core Concept Introduction (what and why)
3. Practical Sections (2-4 major sections with examples)
4. Tips & Gotchas (pro tips, warnings)
5. Conclusion / Call to Action
```

Present the outline to the user for approval before proceeding.

### Step 4: Write the Article

Follow these style guidelines derived from existing articles:

#### Voice & Tone
- **Conversational and direct** — Write as if talking to a fellow developer
- **Second person** — Use "you" to address the reader
- **Practical over theoretical** — Always include actionable examples
- **Confident but approachable** — Share opinions, but explain reasoning
- **Concise** — Avoid filler; every paragraph should earn its place

#### Opening Pattern
Start with a relatable problem or scenario, then introduce the solution:

```markdown
If you've been working with [topic], you've probably encountered [common problem].

**[Solution/concept]** solves this elegantly. [Brief explanation].

This guide covers [what the reader will learn].

---
```

#### Section Structure
- Use `## H2` for major sections, `### H3` for subsections
- Separate major sections with `---` horizontal rules
- Include code blocks with language hints (` ```bash `, ` ```typescript `, etc.)
- Use tables for comparisons and reference data
- Use `> 💡 **Pro tip:**` for tips and `> ⚠️ **Warning:**` for warnings

#### Code Examples
- Always include real, runnable code examples — not pseudocode
- Add comments explaining non-obvious lines
- Keep examples focused — one concept per block
- Use the language most relevant to the topic

#### Closing Pattern
End with either:
- A summary of key takeaways
- A call to action (try something, read a related article)
- A forward-looking statement about the topic

### Step 5: Generate Frontmatter

Create complete frontmatter following the schema:

```yaml
---
title: "Article Title"
subtitle: "A catchy subtitle with emoji 🚀"
description: "A compelling 1-2 sentence summary for SEO and previews."
publishDate: YYYY-MM-DD        # Use current date
timeToRead: N                  # Estimate based on word count (~200 words/min)
tags:
  - tag1
  - tag2
  - tag3
author: "Aridane Martín"
img: ./_images/articleNameCover.webp
img_alt: "Descriptive alt text for accessibility"
---
```

### Step 6: Create the Article Files

1. **Create the folder structure:**
   ```
   src/content/blog/<article-slug>/
   ├── index.md
   └── _images/
   ```

2. **Folder name**: kebab-case, descriptive of the topic

3. **Write `index.md`** with frontmatter + article content

4. **Create `_images/` directory** (cover image will need to be added manually by the user)

5. **Notify the user** that they need to add a cover image at:
   `src/content/blog/<article-slug>/_images/<articleSlugCamelCase>Cover.webp`
   - Recommended dimensions: 1200×630px
   - Format: WebP preferred

### Step 7: Validate

Run through the pre-publish checklist:

- [ ] Frontmatter complete with all required fields
- [ ] Cover image path uses relative format: `./_images/nameCover.webp`
- [ ] Tags are lowercase and consistent with existing articles
- [ ] Internal links use correct format: `/blog/slug`
- [ ] Code blocks have language hints
- [ ] Article follows the opening pattern (hook → solution → what you'll learn)
- [ ] Horizontal rules separate major sections
- [ ] Pro tips and warnings use proper callout format
- [ ] Sources are attributed where appropriate

## Output Format

The skill produces:
1. A complete `index.md` file with frontmatter and article content
2. An `_images/` directory placeholder
3. A reminder about the cover image to be added manually
4. A summary of sources used (if web research was performed)

## Existing Tags Reference

Use lowercase, consistent tags across articles:

| Category | Tags |
|----------|------|
| **AI/Copilot** | `ai`, `copilot`, `agents`, `prompting` |
| **Productivity** | `productivity`, `keyboard`, `terminal` |
| **VS Code** | `vscode`, `extensions`, `shortcuts` |
| **Development** | `typescript`, `react`, `testing` |

Add new tags only when no existing tag fits the topic.

## Example Invocations

### Example 1: Topic-based
**User:** "Write an article about CSS Container Queries"

**Agent:**
1. Research CSS Container Queries using web sources
2. Present outline for approval
3. Write article with practical examples
4. Create folder structure at `src/content/blog/css-container-queries/`

### Example 2: Link-based
**User:** "Turn these links into a blog post: [url1], [url2]"

**Agent:**
1. Fetch and analyze provided links
2. Synthesize key points into a cohesive narrative
3. Present outline for approval
4. Write article in the site's voice and style

### Example 3: Combined
**User:** "Write about Web Components, here's a good reference: [url]"

**Agent:**
1. Fetch the provided link
2. Research additional sources on Web Components
3. Present outline for approval
4. Write comprehensive article combining all sources

