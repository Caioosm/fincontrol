import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@domain': `${import.meta.dirname}/src/domain`,
      '@application': `${import.meta.dirname}/src/application`,
      '@infrastructure': `${import.meta.dirname}/src/infrastructure`,
      '@presentation': `${import.meta.dirname}/src/presentation`,
      '@store': `${import.meta.dirname}/src/store`,
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
});
