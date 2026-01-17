# 重构与新增示例页面计划

根据您的要求，我将执行以下操作：

## 1. 重构 HChart.tsx
- **移动文件**：将 `packages/charts/src/react/HChart.tsx` 移动到 `packages/charts/src/HChart.tsx`。
- **清理目录**：删除 `packages/charts/src/react` 目录。
- **更新导出**：修改 `packages/charts/src/index.ts` 中的导出路径。
- **更新引用**：检查并更新 `hudx` 包和 `examples` 中对 `HChart` 的引用（通常通过包名引用，可能不受影响，但需确认内部引用）。

## 2. 新增独立示例页面
我将在 `examples/src/examples/` 下创建以下文件，并在 `examples/src/App.tsx` 中注册。

### 2.1 Charts 子包引用示例 (`ChartsPackageExample.tsx`)
- **目标**：展示直接从 `hudx-charts` 导入图表类（如 `BarChart`）的用法，而非使用 React 组件。
- **内容**：使用 `useRef` 获取 DOM 容器，实例化 `BarChart`，设置 `option` 并渲染。

### 2.2 标题应用示例 (`TitleExample.tsx`)
- **目标**：展示 `option.title` 的丰富配置。
- **内容**：包含主标题、副标题、位置（left/center/right）、样式（颜色、字体）等不同配置的图表展示。

### 2.3 Legend 应用示例 (`LegendExample.tsx`)
- **目标**：展示 `option.legend` 的配置。
- **内容**：展示图例的位置（top/bottom/vertical）、图例形状、交互（点击隐藏/显示系列）等。

### 2.4 Tooltip 应用示例 (`TooltipExample.tsx`)
- **目标**：展示 `option.tooltip` 的配置。
- **内容**：展示默认 Tooltip、自定义 `formatter`（HTML 内容）、触发方式（item/axis）等。

## 3. 更新 App.tsx
- 在 `examples/src/App.tsx` 中引入上述新组件。
- 在 `chartExamples` 数组中添加新的分类或条目（例如 "Features" 或 "Components" 分类），以便在侧边栏显示。

## 4. 验证
- 运行构建命令确保路径引用正确。
- 确认 TypeScript 类型检查通过。

现在，我将按照此计划执行。
