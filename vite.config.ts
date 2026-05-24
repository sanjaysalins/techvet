import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Root-relative for hosted deploys (Netlify, GitHub Pages on a custom
  // subdomain, etc.). Was './' for relative-path compatibility; switched
  // to '/' since Netlify serves from the domain root and HashRouter
  // means SPA routing doesn't need any other base-path tweaks.
  base: '/',
});
