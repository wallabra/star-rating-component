/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: './node_modules/.vite',
    build: {
      outDir: './dist/./client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    plugins: [
      analog({
        ssr: false,
        static: true,
        prerender: {
          routes: [],
        },
      }),

      viteTsConfigPaths(),
    ],
    server: {
      fs: {
        allow: ['.'],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
