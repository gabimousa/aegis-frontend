/// <reference types='vitest' />
import react from '@vitejs/plugin-react';
import { deprecations } from 'sass';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/aegis',
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/graphql': {
        target: 'http://localhost:5098',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
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
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          deprecations['color-functions'],
          deprecations['global-builtin'],
          deprecations['import'],
        ],
      },
    },
  },
}));
