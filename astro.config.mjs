import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://NenoSann.github.io',
  base: '/AstroBlog',
  integrations: [tailwind(), vue()]
});