// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Canonical origin. Used for sitemap, canonical tags and absolute asset URLs.
  site: 'https://gotchaii.com',

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
