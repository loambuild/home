import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import topLevelAwait from "vite-plugin-top-level-await";

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  vite: {
    plugins: [
      topLevelAwait()
    ],
  }
});
