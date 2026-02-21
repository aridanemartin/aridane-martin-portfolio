---
title: "Getting Started with WebMCP: Expose Your Website to AI Agents"
subtitle: "Make your site agent-ready 🤖"
description: "Learn how to use WebMCP to expose structured tools from your website to in-browser AI agents. Set up Chrome Canary, implement declarative and imperative APIs, and build agent-aware forms — no MCP server required."
publishDate: 2026-02-15
timeToRead: 81
tags:
  - AI
  - Agents
  - Web Development
author: "Aridane Martín"
img: ./_images/gettingStartedWithWebmcpCover.webp
img_alt: "Illustration of a browser window communicating directly with an AI agent through structured tool contracts"
ogImage: "/assets/og/gettingStartedWithWebmcpCover.jpg"
---

If you've been following the AI agents space, you've probably seen them interact with websites the same way a blindfolded person navigates a room — clicking around, taking screenshots, scraping the DOM, and hoping the layout didn't change since last Tuesday.

**WebMCP** changes this completely. It's a proposed web standard that lets websites expose structured tools directly to in-browser AI agents. Instead of an agent guessing what a button does, your site publishes a **contract**: what tools exist, what inputs they accept, and what outputs they return.

Think of it as **MCP, but built into the browser tab**.

This guide covers what WebMCP is, how to set it up (spoiler: you need Chrome Canary), and how to implement it using both the declarative and imperative APIs.

---

## First Things First: You Need Chrome Canary

> ⚠️ **Warning:** WebMCP is currently an **early preview** behind a flag in Chrome 136+, available **only** in the [Chrome Canary channel](https://www.google.com/chrome/canary/). It is not available in stable Chrome, Beta, or Dev channels yet.

This is the number one thing people miss. You can't test WebMCP on your regular Chrome installation. You need to:

1. **Download [Chrome Canary](https://www.google.com/chrome/canary/)** — this is Chrome's bleeding-edge release channel where experimental features land first.
2. **Enable the flag** — Navigate to `chrome://flags`, search for **"WebMCP for testing"** (some users report it under "Experimental Web Platform features"), enable it, and relaunch Chrome.
3. **Install the inspector extension** — Google published a [Model Context Tool Inspector Extension](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd) that lets you see registered tools, execute tools manually, and test with an agent using Gemini API integration.
4. **Get a Gemini API key** — For the extension agent to work, you'll need a free Gemini API key from [Google AI Studio](https://aistudio.google.com/api-keys). Create a project and click "Create API key".

Once everything is set up, you can test it on the [live travel demo](https://travel-demo.bandarra.me/) Google published for this purpose — or on [this very blog](/blog/), which also implements WebMCP (more on that [below](#try-it-live-this-site-uses-webmcp)).

---

## Why WebMCP Exists

Right now, AI agents interact with the web through some painful workarounds:

- **Brittle UI automation** — Click this pixel, hope it's still a button
- **DOM scraping** — Parse HTML that changes with every redesign
- **Accessibility hacks** — Repurpose screen-reader APIs for agent navigation
- **Screenshot analysis** — Take a picture of the screen and guess what's what

These approaches are slow, fragile, and break constantly. Bots now make up **51% of web traffic**, and the current integration methods can't scale.

WebMCP flips the model. Instead of agents reverse-engineering your UI, your website **declares what it can do**:

- **Discovery** — What tools exist on this page (`checkout`, `filter_results`, `book_flight`)
- **JSON Schemas** — Exactly what inputs and outputs look like (reduces hallucinations)
- **State** — A shared understanding of what's available right now

The difference is stark:

| Without WebMCP | With WebMCP |
|----------------|-------------|
| "Click around until something works" | `book_flight({ origin, destination, date })` |
| Screenshot → guess → click → repeat | Direct function call with typed parameters |
| Breaks when UI changes | Stable contract-based interaction |
| Sends entire DOM / screenshots (token-heavy) | Sends only tool definitions + structured calls (token-efficient) |

---

## Two Ways to Expose Tools

WebMCP gives you two APIs to register tools: **declarative** (HTML attributes) and **imperative** (JavaScript). You'll likely use both.

### Declarative API: Turn Forms into Tools

This is the killer feature. You can turn any existing HTML form into a WebMCP tool by adding just **two attributes**:

```html
<form
  id="login-form"
  toolname="login"
  tooldescription="Log in to the application with email and password"
  toolautosubmit="true"
>
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    toolparamtitle="Email"
    toolparamdescription="User email address"
  />

  <label for="password">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    required
    toolparamtitle="Password"
    toolparamdescription="User password"
  />

  <button type="submit">Log In</button>
</form>
```

The key attributes:

| Attribute | Required | Description |
|-----------|----------|-------------|
| `toolname` | ✅ | Tool identifier (e.g., `login`, `search-flights`) |
| `tooldescription` | ✅ | What the tool does — this is what the agent reads |
| `toolautosubmit` | ❌ | If set, the form auto-submits when the agent fills it in |
| `toolparamtitle` | ❌ | Human-readable label for each input |
| `toolparamdescription` | ❌ | Describes what each input expects |

When an agent invokes a declarative tool, the browser **focuses the form and pre-fills the fields**. By default, the user still has to click submit — unless you enable `toolautosubmit`.

> 💡 **Pro tip:** The implementation cost of adding `toolname` and `tooldescription` to your existing forms is almost zero. Even if you're not sure agents will use your site today, annotating forms now means you're ready when they do.

### Imperative API: JavaScript Tools

For actions that don't map to a form (logout, diagnostics, data export), you use `navigator.modelContext`:

```javascript
// Register a single tool
navigator.modelContext.registerTool({
  name: "search-products",
  description: "Search the product catalog by keyword, category, or price range",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search keywords" },
      category: { type: "string", description: "Product category" },
      maxPrice: { type: "number", description: "Maximum price filter" }
    },
    required: ["query"]
  },
  execute: async (params) => {
    const results = await searchAPI(params.query, params.category, params.maxPrice);
    return { products: results, count: results.length };
  }
});

// Remove a specific tool
navigator.modelContext.unregisterTool("search-products");

// Replace the entire toolset (useful when app state changes)
navigator.modelContext.provideContext({ tools: [/* new tools */] });

// Clear all tools
navigator.modelContext.clearContext();
```

The imperative API is more powerful but requires JavaScript. Use it for dynamic tools that depend on application state.

---

## When to Use Each API

Since WebMCP is brand new, best practices are still emerging. But one recommendation is gaining traction quickly:

**Every form should be a WebMCP tool.**

The reasoning is simple:

- The implementation cost is near zero (just two HTML attributes)
- The alternative isn't that agents won't use your website — it's that they'll use it **worse** (scraping, guessing, breaking)

For anything that isn't a form — like logout buttons, navigation actions, or data exports — use the imperative API.

---

## The Hidden Gem: Agent-Aware Forms

WebMCP adds something genuinely clever to form submissions. The `SubmitEvent` now has two new properties:

- **`agentInvoked`** — A boolean that tells you whether the submit came from an AI agent
- **`respondWith(Promise<any>)`** — Lets your handler return structured data back to the agent

```javascript
document.querySelector("#booking-form").addEventListener("submit", (event) => {
  if (event.agentInvoked) {
    event.preventDefault();
    event.respondWith(
      processBooking(new FormData(event.target))
        .then(result => ({ status: "confirmed", bookingId: result.id }))
        .catch(error => ({ status: "error", message: error.message }))
    );
  }
  // Normal form submission for humans
});
```

This is powerful because your web app can now:

- **Validate normally for humans** (show error messages in the UI)
- **Return structured errors for agents** (so they can self-correct and retry)

---

## CSS Pseudo-Classes for Visual Feedback

When a tool is invoked through the declarative API, the browser applies pseudo-classes you can style:

```css
/* Highlight the form when an agent is actively filling it */
form:tool-form-active {
  outline: 2px solid var(--accent-regular);
  background: var(--gray-999);
}

/* Highlight the submit button when agent is about to submit */
button:tool-submit-active {
  animation: pulse 1s infinite;
  background: var(--accent-regular);
}
```

The browser also fires events:
- **`toolactivated`** — When the agent pre-fills form fields
- **`toolcancel`** — When the user cancels or resets the form

---

## Try It Live: This Site Uses WebMCP 🙀

You don't need to go far to see WebMCP in action — **this very website implements it**.

Head over to [the blog page](/blog/) using Chrome Canary with the WebMCP flag enabled, and open the **Model Context Tool Inspector Extension**. You'll see a registered tool called `search-blog` — that's the search bar at the top of the page.

Here's what's going on under the hood:

**1. The form uses the declarative API:**

```html
<form
  id="blog-search-form"
  toolname="search-blog"
  tooldescription="Search blog articles by keyword. Matches against article titles, descriptions, and tags. Returns filtered blog posts."
  toolautosubmit="true"
>
  <input
    type="text"
    name="query"
    toolparamtitle="Search Query"
    toolparamdescription="Keywords to search for in blog article titles, descriptions, and tags"
  />
</form>
```

That's it — two attributes on the form, two on the input. Any in-browser AI agent can now discover and invoke `search-blog`.

**2. The submit handler is agent-aware:**

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = filterArticles(input.value);

  if (event.agentInvoked) {
    event.respondWith(
      Promise.resolve({
        query: input.value,
        resultCount: results.length,
        articles: results.map((a) => ({
          title: a.title,
          description: a.description,
          tags: a.tags,
          url: `/blog/${a.slug}`,
        })),
      })
    );
  }
});
```

When a human searches, they see filtered articles in the UI. When an agent searches, it gets a clean JSON response with titles, descriptions, tags, and direct URLs.

**3. The imperative API registers a richer tool:**

```javascript
if ("modelContext" in navigator) {
  navigator.modelContext.registerTool({
    name: "search-blog",
    description: "Search blog articles by keyword...",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keywords to search for..." }
      },
      required: ["query"]
    },
    execute: async (params) => {
      input.value = params.query;
      const results = filterArticles(params.query);
      return { query: params.query, resultCount: results.length, articles: results };
    }
  });
}
```

**4. CSS gives visual feedback during agent interaction:**

```css
#blog-search-form:tool-form-active {
  outline: 2px solid var(--accent-regular);
  border-radius: 0.75rem;
}
```

When an agent fills in the search field, users see the form highlight — so they know what the agent is doing.

### Try it yourself

1. Open [aridanemartin.dev/blog/](https://www.aridanemartin.dev/blog/) in Chrome Canary
2. Make sure the WebMCP flag is enabled
3. Open the Model Context Tool Inspector Extension
4. You should see `search-blog` listed as an available tool
5. Try invoking it with a query like `"copilot"` or `"terminal"` — you'll see the form fill, the articles filter, and the agent receive structured results

This is a real, minimal example of WebMCP on a production site. The total implementation was about 30 lines of meaningful code on top of a search form that already existed.

---

## Dreaming into the Future

WebMCP feels like responsive design all over again — you didn't rebuild your site for mobile, you added media queries. Here, you add `toolname` to a form and suddenly your site speaks to AI agents. A small change that opens an entirely new channel.

The exciting part is what comes next: **cross-app orchestration**. Imagine telling an agent "check my calendar for dinners this week, then add ingredients to my grocery list." Two websites, no API keys, no integration to build — just published capabilities. Add headless browsing and framework plugins that auto-generate tools from your existing schemas, and the web starts looking very different.

But we've seen this movie before. Every site once had an open API — Twitter, Reddit, Instagram — until companies locked them down to keep users on-platform. Will WebMCP follow the same arc? Maybe not — because these tools live *inside* the website, not as a side door around it. The agent and the UI coexist, which might be the key to a more sustainable model.

The apps that win won't have the prettiest interface — they'll have the **clearest tool contracts**.

---

## Get Involved

The spec is actively seeking feedback. If you want to influence how this standard evolves:

- **Discussion / Questions**: [Chrome AI Dev Preview Discussion Group](https://groups.google.com/a/chromium.org/g/chrome-ai-dev-preview-discuss/)
- **Bug Reports**: [Chromium Bug Tracker](https://crbug.com/new?component=2021259)
- **Spec Repository**: [WebMCP on GitHub](https://github.com/nicolo-ribaudo/webmcp/blob/main/README.md)

---

## Sources

- [Chrome's WebMCP Early Preview: The End of AI Agents Clicking Buttons](https://dev.to/axrisi/chromes-webmcp-early-preview-the-end-of-ai-agents-clicking-buttons-b6e) — Nikoloz Turazashvili
- [What is WebMCP and How to Use It](https://codely.com/en/blog/what-is-webmcp-and-how-to-use-it) — Codely
- [Chrome's WebMCP Makes AI Agents Stop Pretending](https://medium.com/reading-sh/chromes-webmcp-makes-ai-agents-stop-pretending-e8c7da1ba650) — JP Caparas
- [This is how you expose your app to AI: WebMCP](https://www.youtube.com/watch?v=sOPhVSeimtI&t=161s) — Syntax
