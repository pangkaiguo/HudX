# `build-hudx.js` 脚本分析与优化建议

该脚本 (`packages/hudx/scripts/build-hudx.js`) 的主要功能是：
1.  读取 `vite-plugin-dts` 生成的 `dist/packages/hudx/src/index.d.ts` 类型定义文件。
2.  将其中相对路径引用（如 `../render/src/index`）替换为包名引用（如 `hudx-render`）。
3.  将处理后的文件移动到 `dist/index.d.ts`。
4.  清理 `dist/packages` 临时目录。

这是因为 `vite-plugin-dts` 在生成类型定义时，如果通过 `alias` 引用了其他 workspace 包的源码（而非已构建的类型文件），生成的 `.d.ts` 可能会保留相对路径，导致发布后类型引用失效。

## 优化方案

**不需要**保留这个脚本，我们可以通过更现代的 `vite-plugin-dts` 配置来解决这个问题。

### 推荐方案：配置 `vite-plugin-dts`

我们可以直接在 `packages/hudx/vite.config.ts` 中配置 `vite-plugin-dts`，使其自动打包类型定义（`rollupTypes: true`）并正确处理路径，或者通过路径映射解决。

但更简单且标准的做法是：
1.  **修改 `vite.config.ts`**：启用 `rollupTypes: true`，这会让插件将所有类型合并为一个文件，通常能更好地处理引用。
2.  **移除脚本**：删除 `build-hudx.js` 并在 `package.json` 中移除对它的调用。

### 计划

1.  **修改 `packages/hudx/vite.config.ts`**：
    *   在 `dts` 插件配置中，设置 `rollupTypes: true`。
    *   移除 `resolve.alias`（如果是为了类型生成而加的），或者保留但确保插件能正确解析。实际上，如果 `tsconfig.json` 配置正确，`vite-plugin-dts` 应该能根据 `paths` 或包依赖关系解析。
    *   (可选) 调整 `outDir` 或文件名以匹配 `package.json`。

2.  **修改 `packages/hudx/package.json`**：
    *   移除 `build` 脚本中的 `node scripts/build-hudx.js`。

3.  **删除 `packages/hudx/scripts/build-hudx.js`**。

4.  **验证**：运行 `pnpm build`，检查 `dist/index.d.ts` 是否生成且内容正确（不包含 `../` 相对路径）。

**注意**：`rollupTypes: true` 依赖于 `@microsoft/api-extractor`，`vite-plugin-dts` 会自动处理。如果遇到问题，可能需要检查依赖。

让我们先尝试修改 `vite.config.ts` 并验证构建，确认生成的 `index.d.ts` 是扁平化且路径正确的。
