import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve, join } from "path";
import { readdirSync, statSync } from "fs";

const getEntryFiles = (dir: string, baseDir: string = dir): Record<string, string> => {
  const entries: Record<string, string> = {};
  const walk = (currentDir: string) => {
    const files = readdirSync(currentDir);
    for (const file of files) {
      const fullPath = join(currentDir, file);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith(".ts") && !file.endsWith(".d.ts") && !file.endsWith(".test.ts")) {
        const relativePath = fullPath.substring(baseDir.length + 1);
        const name = relativePath.replace(/\.ts$/, "");
        entries[name] = fullPath;
      }
    }
  }
  walk(dir);
  return entries;
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
    },
    sourcemap: false,
    rollupOptions: {
      input: getEntryFiles(resolve(__dirname, "src")),
      output: [
        {
          format: "es",
          dir: "dist/esm",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
      ],
      external: ["hudx-render", "react", "react-dom"],
    },
  },
  plugins: [
    dts({
      rollupTypes: false,
      tsconfigPath: resolve(__dirname, "tsconfig.build.json"),
      outDir: "dist/types",
    }),
  ],
});
