import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            return "vendor";
          }
          if (id.includes("hux-core")) {
            if (id.includes("shape/")) return "hudx-shapes";
            if (id.includes("animation/")) return "hudx-animation";
            if (id.includes("component/")) return "hudx-components";
            return "hudx-core";
          }
          if (id.includes("hux-charts")) {
            return "hudx-charts";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        compact: true,
      },
    },
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "hux-core": path.resolve(__dirname, "../packages/core/src"),
      "hux-charts": path.resolve(__dirname, "../packages/charts/src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
    treeShaking: true,
  },
});
