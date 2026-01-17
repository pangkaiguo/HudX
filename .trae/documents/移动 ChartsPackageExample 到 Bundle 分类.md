# 重构 Bundle 示例以展示子路径导入

用户明确指出，意图是展示**子路径导入（Sub-path Imports）**，例如 `import { BarChart } from 'hudx-charts/BarChart';`。这意味着我们需要验证并展示 `package.json` 中 `exports` 字段所支持的按需加载能力。

根据 `hudx-charts/package.json` 的 `exports` 配置：
```json
"./*": {
  "types": "./dist/types/*.d.ts",
  "import": "./dist/esm/*.js",
  "require": "./dist/cjs/*.cjs"
}
```
以及构建产物结构，`BarChart` 位于 `dist/esm/chart/BarChart.js`。
因此，正确的导入路径可能是 `hudx-charts/chart/BarChart` 或者 `hudx-charts/BarChart`（取决于构建时的文件名和 exports 映射）。
查看 `dist` 目录，文件在 `chart/` 子目录下。如果 `package.json` 的 `exports` 是 `"./*": "./dist/esm/*.js"`，那么 `hudx-charts/chart/BarChart` 应该是有效的。

为了用户体验友好，通常希望支持 `hudx-charts/BarChart`。但目前的构建结构是 `dist/esm/chart/BarChart.js`。
如果用户希望 `import { BarChart } from 'hudx-charts/BarChart'`，我们需要确认构建配置是否支持将 `chart/*` 扁平化导出，或者调整 `exports` 映射。
**当前现状**：`dist/esm` 下有 `index.js` 和 `chart/` 目录。`exports` 映射了 `"./*": ...`。
所以 `import ... from 'hudx-charts/chart/BarChart'` 应该是物理上存在的。
如果用户坚持 `hudx-charts/BarChart`，可能需要调整构建或 exports。
**假设**：用户希望展示的是**从包的具体路径导入**，以实现 Tree Shaking 或按需加载的效果。

我将创建三个示例，尝试使用子路径导入。
*注意*：在 TypeScript 项目中，子路径导入需要 `moduleResolution: bundler` 或 `node16` 且 `package.json` 配置正确。`examples` 项目是 Vite 项目，应该支持。

## 计划内容

### 1. 验证导入路径
先确认 `hudx-charts` 的导出结构。根据 `package.json`，`./*` 映射到 `dist/esm/*.js`。而 `BarChart.js` 在 `dist/esm/chart/BarChart.js`。
所以理论上的导入路径是 `hudx-charts/chart/BarChart`。
如果用户想要 `hudx-charts/BarChart`，我们需要修改 `vite.config.ts` 或 `package.json` 来扁平化输出或映射。
**但在此任务中，我将先按照现有结构实现 `hudx-charts/chart/BarChart` 的导入示例**，并在代码注释中说明。如果用户强烈要求短路径，我再调整构建配置。
*修正*：用户原文是 `import { BarChart } from 'hudx-charts/BarChart';`。这通常意味着 Default Export 或 Named Export。由于 `BarChart.ts` 是 `export default class ...`，所以应该是 `import BarChart from 'hudx-charts/chart/BarChart';`。

### 2. 创建示例文件
在 `examples/src/examples/bundle/` 下创建：
*   `BundleBarExample.tsx`: `import BarChart from 'hudx-charts/chart/BarChart';`
*   `BundleLineExample.tsx`: `import LineChart from 'hudx-charts/chart/LineChart';`
*   `BundlePieExample.tsx`: `import PieChart from 'hudx-charts/chart/PieChart';`

### 3. 更新 `App.tsx`
*   移除旧的 `ChartsPackageExample`。
*   添加上述三个新示例到 "Bundle" 分类。

### 4. 验证构建
运行 `pnpm build` 确保 TypeScript 能解析这些路径。如果 TS 报错（因为没有对应的 `.d.ts` 映射或路径问题），我可能需要调整 `tsconfig.json` 或 `hudx-charts` 的 `package.json`。

**关键调整**：
目前的 `hudx-charts` 的 `package.json` 中 `exports` 写法：
```json
    "./*": {
      "types": "./dist/types/*.d.ts",
      "import": "./dist/esm/*.js",
      "require": "./dist/cjs/*.cjs"
    }
```
这意味着 `import ... from 'hudx-charts/foo'` 会寻找 `dist/esm/foo.js`。
而 `BarChart` 在 `dist/esm/chart/BarChart.js`。
所以用户必须写 `hudx-charts/chart/BarChart`。
为了满足用户可能的期望（更短的路径），或者仅仅是展示“独立引用”，我将使用实际可用的路径。

**重要**：由于 `hudx-charts` 是 workspace 依赖，Vite 开发模式下可能会直接解析到 `src`。但在 Build 模式下会读取 `dist`。我们需要确保开发和生产行为一致。
通常 workspace 开发时，`package.json` 的 `main/module` 指向 `src/index.ts`（通过 vite alias 或其它手段）。但这里我们要测试 Bundle 行为，最好是确保引用的是构建后的产物。
不过在 `examples` 应用中，直接引用子路径可能会在 Dev 模式下失败（如果 `hudx-charts` 未被构建或 `exports` 未生效）。
鉴于环境是 Monorepo，我将尝试使用标准导入路径，并确保 `hudx-charts` 已构建。

**Action**:
1.  创建 `BundleBarExample.tsx`, `BundleLineExample.tsx`, `BundlePieExample.tsx`。
2.  使用 `import BarChart from 'hudx-charts/chart/BarChart';` (根据实际目录结构)。
3.  更新 `App.tsx`。
