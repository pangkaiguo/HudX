import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "happy-dom",
    alias: {
      "hux-core": path.resolve(__dirname, "../core/src"),
    },
  },
});
