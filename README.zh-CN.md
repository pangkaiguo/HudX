# HudX - 高性能图表库

[English](./README.md) | 简体中文

HudX Charts 是一个基于 React 和 TypeScript 构建的高性能图表库。它的底层渲染逻辑受 [ZRender](https://github.com/ecomfe/zrender) 启发，API 设计参考 [ECharts](https://github.com/apache/echarts)，支持 Canvas 和 SVG 双渲染模式。

## 特性

- 🚀 **高性能**: 支持 Canvas 和 SVG 渲染模式，高效处理大数据集。
- 🎨 **丰富的图表类型**: 折线图、柱状图、饼图、散点图和热力图。
- ⚛️ **React 集成**: 无缝的 React 组件集成 (`HChart`)。
- 📦 **模块化设计**: 核心渲染引擎 (`hudx-render`) 与图表库 (`hudx-charts`) 解耦。
- 🎯 **TypeScript**: 完整的 TypeScript 支持和严格类型检查。
- 🎬 **完整的动画系统**: 支持属性过渡、多种缓动函数和错开动画。
- 🖱️ **丰富的交互**: 内置 Tooltip、Legend 和完整的事件处理（点击、悬停、拖拽等）。
- 🔧 **可扩展架构**: 易于添加新的图表类型和图形元素。
- 🌓 **主题支持**: 亮色和暗色主题，支持自定义。
- 🌍 **国际化**: 内置国际化支持。
- 🧩 **功能演示**: 包含动画、交互、性能、图形和主题的独立演示示例。

## 为什么选择 HudX（对比 ECharts / AntV）

HudX 的目标是：在保留类似 ECharts 的 option 使用体验的同时，提供更适合 React/TypeScript 工程化的开发方式，并通过解耦的渲染引擎让团队更容易扩展为“图形运行时”。

### 快速对比

| 维度 | HudX | ECharts | AntV（例如 G2 / G2Plot 等） |
| --- | --- | --- | --- |
| 定位 | React + TS 图表库 + 可复用渲染内核 | 通用、功能覆盖极广的图表库 | 可视化语法/业务图表套件（更偏规格化与组合） |
| API 风格 | option 风格（受 ECharts 启发），并提供底层图形能力 | option 风格，组件/系列非常完善 | 图形语法/高阶配置，更强的“规则/约束”与表达能力 |
| 渲染体系 | Canvas/SVG（`hudx-render`，受 ZRender 启发） | Canvas/SVG（ZRender），生态成熟 | Canvas/SVG（随产品不同而不同），偏规格化渲染 |
| 扩展方式 | 可通过核心 primitives 扩展图表/图形元素 | 可扩展但内部耦合更深，自定义成本可能更高 | 在语法体系内扩展能力强，但需要遵循模型/规范 |
| 打包与模块化 | workspace 分包（`hudx-render`、`hudx-charts`），便于按需组合 | 生态大；按需与体积取决于用法与配置 | 产品线多、包多；体积与能力随选型差异较大 |
| 生态成熟度 | 成长中，内置覆盖相对更小 | 非常成熟，案例/插件/组件数量多 | 成熟，偏 BI/报表/业务图表与语法驱动组合 |

### HudX 的优势

- **React 优先**：以 `HChart` 组件为核心使用方式，同时保留底层 render API 用于高级组合。
- **类型安全**：全链路 TypeScript 严格模式，利于大型团队长期维护与重构。
- **分层架构**：渲染引擎与图表层解耦，更容易在项目中复用渲染能力或做深度定制。
- **面向性能**：聚焦交互式看板/大数据量场景的渲染与交互路径。
- **产品化能力内置**：主题与国际化等能力内置，减少业务侧胶水代码。

### HudX 的劣势与取舍

- **内置能力覆盖更小**：相比 ECharts/AntV，当前内置图表类型、组件与高级系列更少。
- **生态较小**：社区案例、插件与周边工具相对少，部分高级能力需要团队自行实现。
- **兼容并非 1:1**：虽然 API 设计参考 ECharts，但边界 option 与高级组件仍会存在差异。

### 选型建议

- 选择 **HudX**：当你强调 React/TypeScript 工程体验、需要可复用/可扩展的渲染内核、并且希望以更可维护的模块化代码支撑产品嵌入与长期演进。
- 选择 **ECharts**：当你需要最广的图表/组件覆盖、成熟生态，以及大量开箱即用的高级系列（地图/关系图/树图等）。
- 选择 **AntV**：当你更偏好“语法驱动”的可视化表达、需要业务图表/BI 场景的规范化产出，或更依赖规格化组合能力。

## 项目结构

```text
HudX/
├── packages/
│   ├── render/          # 核心渲染引擎
│   │   ├── src/
│   │   │   ├── Renderer.ts      # 主入口
│   │   │   ├── graphic/           # 图形元素（Circle, Rect, Path 等）
│   │   │   ├── animation/       # 动画系统
│   │   │   ├── component/       # UI 组件（Tooltip, Legend）
│   │   │   ├── painter/         # 绘制器（Canvas, SVG）
│   │   │   └── util/            # 工具类（Matrix, Color 等）
│   └── charts/        # 图表库
│       ├── src/
│       │   ├── chart/           # 图表实现（Bar, Line, Pie...）
│       │—— HChart.tsx           # React 组件
│       ├── index.ts             # Entry
├── examples/          # 交互式示例 & Demo
└── docs/              # 文档
```

## 快速开始

### 安装

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

### 运行示例

```bash
pnpm dev:examples
# 访问 http://localhost:5173
```

示例应用是一个单页仪表盘，包含以下特性：

- **左侧侧边栏**：导航链接到图表分类和功能演示，支持锚点跳转。
- **主要内容区**：滚动浏览所有示例，支持悬停预览缩放效果。
- **详情视图**：点击任意示例可在新标签页中打开，包含代码编辑器和主题切换功能。

## 使用示例

### React 组件

```tsx
import React from "react";
import { HChart } from "hudx-charts";

function App() {
  const option = {
    title: { text: "销售数据" },
    tooltip: { show: true },
    legend: { data: ["销售额"] },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "销售额",
        type: "bar",
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: "#5470c6" },
        emphasis: {
          scale: true,
          focus: "series",
        },
      },
    ],
  };

  return (
    <HChart
      option={option}
      width={800}
      height={400}
      renderMode="svg" // 或 "canvas"
      theme="light"
    />
  );
}
```

### 核心 API (底层)

```typescript
import { Renderer, Circle, Animation, Easing } from "hudx-render";

// 初始化
const renderer = Renderer.init(document.getElementById("container"), "svg");

// 添加元素
const circle = new Circle({
  shape: { cx: 100, cy: 100, r: 50 },
  style: { fill: "red" },
});
renderer.add(circle);

// 动画
const anim = new Animation(
  circle.shape,
  "r",
  100, // 结束值
  1000, // 持续时间
  0, // 延迟
  Easing.elasticOut,
);
anim.start();
```

## 文档

- [实现细节](./docs/src/docs/zh/IMPLEMENTATION.md)
- [交互特性](./docs/src/docs/zh/INTERACTIVE_FEATURES.md)
- [性能优化](./docs/src/docs/zh/PERFORMANCE_OPTIMIZATION.md)
- [示例指南](./docs/src/docs/zh/EXAMPLES.md)

## 许可证

MIT
