// @ts-check
import { defineConfig } from 'astro/config';

/*
  GitHub Pages serves a project repo under a sub-path (/gotchaii-site/), but the
  eventual production home is the apex of gotchaii.com. Hardcoding either one
  breaks the other: with no base, every /_astro/... asset 404s on Pages and the
  page renders unstyled.

  So both come from the environment. The Pages workflow injects them from
  actions/configure-pages; a plain `npm run build` defaults to the apex, which
  is what the custom domain will need at cutover.
*/
const site = process.env.SITE_URL ?? 'https://gotchaii.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,

  image: {
    // Source photography is heavy (one file is 2.6MB) and visitors load this on
    // market cell data. The spec sets a 1MB homepage budget, so every <Image>
    // must emit modern formats at responsive widths.
    responsiveStyles: true,
    layout: 'constrained',
  },

  build: {
    // Emit /menu/index.html so gotchaii.com/menu resolves with or without a
    // trailing slash. /menu is printed on market signage and must not 404.
    format: 'directory',
  },
});
