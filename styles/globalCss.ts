import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  "*": {
    margin: 0,
    padding: 0,
  },

  "html, body": {
    height: "100vh",
    width: "100vw",
    scrollBehavior: "smooth",
  },

  body: {
    opacity: "1!important",
    visibility: "visible!important",
    lineHeight: 1.5,
    textRendering: "optimizeLegibility",
    fontFeatureSettings: "'liga' on",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    scrollBehavior: "smooth",
  },

  "input, button, textarea, select": {
    font: "inherit",
  },

  "p, h1, h2, h3, h4, h5, h6": {
    overflowWrap: "break-word",
    fontFamily: "$paragraph",
  },

  ul: {
    padding: 0,
    listStyle: "none",
  },

  a: {
    fontFamily: "$paragraph",
    textDecoration: "none",
  },

  "#root, #__next": {
    isolation: "isolate",
  },
});
