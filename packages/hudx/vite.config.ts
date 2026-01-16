import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'hux-core': resolve(__dirname, '../core/src/index.ts'),
      'hux-charts': resolve(__dirname, '../charts/src/index.ts'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'hudx',
      fileName: (format) => {
        if (format === 'es') return 'hudx.js';
        if (format === 'cjs') return 'hudx.cjs';
        return `hudx.${format}.js`;
      },
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    emptyOutDir: true,
    sourcemap: false,
  },
  plugins: [
    dts({
      rollupTypes: false,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
    }),
  ],
});
