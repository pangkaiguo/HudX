# HudX - 高性能图表库

[English](./README.md) | 简体中文

HudX 是一个基于 React 和 TypeScript 构建的高性能图表库。它的底层渲染逻辑受 [ZRender](https://github.com/ecomfe/zrender) 启发，API 设计参考 [ECharts](https://github.com/apache/echarts)，支持 Canvas 和 SVG 双渲染模式。

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

## 项目结构

```
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
│       │   ├── react/           # React 组件
│       │   └── util/            # 坐标系与比例尺工具
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

- [实现细节](./docs/zh/IMPLEMENTATION.md)
- [交互特性](./docs/zh/INTERACTIVE_FEATURES.md)
- [性能优化](./docs/zh/PERFORMANCE_OPTIMIZATION.md)

## 许可证

MIT
