import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
          if (id.includes('HudX/core')) {
            if (id.includes('shape/')) return 'HudX-shapes';
            if (id.includes('animation/')) return 'HudX-animation';
            if (id.includes('component/')) return 'HudX-components';
            return 'HudX-core';
          }
          if (id.includes('HudX/charts')) {
            return 'HudX-charts';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        compact: true
      }
    },
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
    sourcemap: false
  },
  resolve: {
    alias: {
      'HudX/core': path.resolve(__dirname, '../packages/core/src'),
      'HudX/charts': path.resolve(__dirname, '../packages/charts/src')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    treeShaking: true
  }
});
