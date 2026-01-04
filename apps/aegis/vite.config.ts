/// <reference types='vitest' />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/aegis',
  resolve: {
    conditions: ['@aegis-frontend/source'],
    alias: {
      '@aegis/shared': resolve(__dirname, '../../libs/aegis/shared/src/index.ts'),
      '@aegis/ui': resolve(__dirname, '../../libs/aegis/ui/src/index.ts'),
      '@aegis/utils': resolve(__dirname, '../../libs/utils/src/index.ts'),
    },
  },
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/graphql': {
        target: 'http://localhost:5098',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['rxjs'],
    },
  },
  test: {
    name: '@aegis-frontend/aegis',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
