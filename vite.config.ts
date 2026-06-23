import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local', quiet: true });

export default defineConfig({
  envPrefix: ['VITE_', 'PUBLIC_'],
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    watch: {
      ignored: ["**/.direnv/**"],
    },
  },
});
