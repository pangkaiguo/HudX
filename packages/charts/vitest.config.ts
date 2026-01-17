import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    alias: {
      'hudx-render': path.resolve(__dirname, '../render/src'),
    },
  },
});
