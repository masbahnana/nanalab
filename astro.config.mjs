// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://masbahnana.github.io',
  base: '/nanalab',
  vite: {
    plugins: [tailwindcss()]
  }
});
