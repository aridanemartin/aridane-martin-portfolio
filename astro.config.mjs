import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Minimal rehype plugin to open external links in a new tab securely
function rehypeExternalLinksNewTab() {
  return function transformer(tree) {
    function visit(node) {
      if (!node || typeof node !== "object") return;

      // If this is an anchor element, check href
      if (node.type === "element" && node.tagName === "a") {
        const props = (node.properties ||= {});
        const href = typeof props.href === "string" ? props.href : "";

        // Only modify absolute external links (http/https). Skip anchors, mailto, tel and relative paths
        const isExternal = /^https?:\/\//i.test(href);
        const isSafeProtocol = !/^(mailto:|tel:|javascript:)/i.test(href);

        if (href && isExternal && isSafeProtocol) {
          props.target = "_blank";
          // Preserve existing rel while ensuring security attributes are present
          const relSet = new Set(
            (Array.isArray(props.rel) ? props.rel : String(props.rel || "").split(/\s+/)).filter(Boolean)
          );
          relSet.add("noopener");
          relSet.add("noreferrer");
          props.rel = Array.from(relSet).join(" ");
        }
      }

      // Recurse into children
      const children = node.children;
      if (Array.isArray(children)) {
        for (const child of children) visit(child);
      }
    }

    visit(tree);
  };
}

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeExternalLinksNewTab],
  },
});