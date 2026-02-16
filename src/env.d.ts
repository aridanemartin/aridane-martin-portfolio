/// <reference path="../.astro/types.d.ts" />

/**
 * WebMCP attribute extensions for HTML elements.
 * These attributes are part of the WebMCP standard (Chrome 136+ behind flag).
 * @see https://github.com/nicolo-ribaudo/webmcp
 */
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: string | boolean;
    toolparamtitle?: string;
    toolparamdescription?: string;
  }
}
