# HudX - High-Performance Charting Library

English | [简体中文](./README.zh-CN.md)

HudX Charts is a high-performance charting library built with React and TypeScript. It is inspired by the underlying rendering logic of [ZRender](https://github.com/ecomfe/zrender) and the API design of [ECharts](https://github.com/apache/echarts), supporting both Canvas and SVG rendering modes.

## Features

- 🚀 **High Performance**: Supports Canvas and SVG rendering modes, handles large datasets efficiently.
- 🎨 **Rich Chart Types**: Line, Bar, Pie, Scatter, and Heatmap charts.
- ⚛️ **React Integration**: Seamless React component integration (`HChart`).
- 📦 **Modular Design**: Decoupled render rendering engine (`hudx-render`) and chart library (`hudx-charts`).
- 🎯 **TypeScript**: Full TypeScript support with strict type checking.
- 🎬 **Complete Animation System**: Supports property transitions, multiple easing functions, and staggered animations.
- 🖱️ **Rich Interaction**: Built-in Tooltip, Legend, and comprehensive event handling (click, hover, drag, etc.).
- 🔧 **Extensible Architecture**: Easy to add new chart types and graphic elements.
- 🌓 **Theme Support**: Light and Dark themes with customization.
- 🌍 **Internationalization**: Built-in i18n support.

## Why HudX (vs ECharts / AntV)

HudX targets teams who want an ECharts-like option API, but with stronger React/TypeScript ergonomics and a decoupled render engine that can be extended as a graphics runtime.

### Quick Comparison

| Dimension | HudX | ECharts | AntV (e.g. G2 / G2Plot) |
| --- | --- | --- | --- |
| Positioning | React + TS charting library with a reusable render core | Feature-complete general-purpose charting | Visualization grammar / business chart kits |
| API style | Option-style (inspired by ECharts), with low-level render primitives | Option-style, very mature and comprehensive | Grammar-of-graphics / higher-level spec, more opinionated |
| Rendering | Canvas/SVG via `hudx-render` (inspired by ZRender) | Canvas/SVG (ZRender), plus broad components | Canvas/SVG (varies by product), strong spec-driven rendering |
| Extensibility | Add chart types and graphic elements by extending core primitives | Strong, but deeper internal coupling for custom behavior | Strong within the grammar model; custom shapes supported but follow the spec model |
| Bundle strategy | Modular workspace packages (`hudx-render`, `hudx-charts`), can bundle per chart | Large ecosystem; tree-shaking varies by usage | Multiple products/packages; bundle size varies |
| Ecosystem maturity | Growing; fewer built-in charts/components | Very large; many chart types, components, examples, plugins | Large; strong in BI/business charts and grammar-driven composition |

### HudX Strengths

- **React-first ergonomics**: `HChart` is a React component, plus a core render API for advanced composition.
- **Type-safe development**: Strict TypeScript across the stack helps large teams refactor safely.
- **Layered architecture**: Rendering engine and chart layer are decoupled, making it easier to extend or reuse the renderer for custom visual elements.
- **Performance-oriented design**: Focuses on efficient rendering paths for interactive dashboards and large datasets.
- **Product-ready basics**: Themes and i18n are built-in, reducing glue code in multi-locale products.

### HudX Trade-offs

- **Smaller built-in surface area**: Compared to ECharts/AntV, HudX currently provides fewer chart types and built-in components.
- **Smaller ecosystem**: Fewer community examples/plugins; some advanced features may require building in-house.
- **Compatibility is not 1:1**: Although inspired by ECharts’ API, expect differences for edge options and advanced series/components.

### When to Choose Which

- Choose **HudX** when you want React/TypeScript-first development, need a renderer you can extend, and prefer a maintainable modular codebase for product embedding.
- Choose **ECharts** when you need the broadest chart/component coverage, a mature ecosystem, and many out-of-the-box advanced series (geo, graph, treemap, etc.).
- Choose **AntV** when you prefer grammar-of-graphics composition, need business-oriented presets, or want spec-driven visualization for BI/reporting scenarios.

## Project Structure

```text
HudX/
├── packages/
│   ├── render/          # Core rendering engine
│   │   ├── src/
│   │   │   ├── Renderer.ts      # Main entry
│   │   │   ├── graphic/           # Graphic elements (Circle, Rect, Path, etc.)
│   │   │   ├── animation/       # Animation system
│   │   │   ├── component/       # UI Components (Tooltip, Legend)
│   │   │   ├── painter/         # Painters (Canvas, SVG)
│   │   │   └── util/            # Utils (Matrix, Color, etc.)
│   └── charts/        # Chart library
│       ├── src/
│       │   ├── chart/           # Chart implementations (Bar, Line, Pie...)
│       │   ├── react/           # React component
│       │   └── util/            # Coordinate & Scale utils
├── examples/          # Interactive examples & Demo
└── docs/              # Documentation
```

## Quick Start

### Installation

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

### Run Examples

```bash
pnpm dev:examples
# Visit http://localhost:5173
```

## Usage

### React Component

```tsx
import React from "react";
import { HChart } from "hudx-charts";

function App() {
  const option = {
    title: { text: "Sales Data" },
    tooltip: { show: true },
    legend: { data: ["Sales"] },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Sales",
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
      renderMode="svg" // or "canvas"
      theme="light"
    />
  );
}
```

### Core API (Low-level)

```typescript
import { Renderer, Circle, Animation, Easing } from "hudx-render";

// Initialize
const renderer = Renderer.init(document.getElementById("container"), "svg");

// Add Element
const circle = new Circle({
  shape: { cx: 100, cy: 100, r: 50 },
  style: { fill: "red" },
});
renderer.add(circle);

// Animate
const anim = new Animation(
  circle.shape,
  "r",
  100, // end value
  1000, // duration
  0, // delay
  Easing.elasticOut,
);
anim.start();
```

## Documentation

- [Implementation Details](./docs/en/IMPLEMENTATION.md)
- [Interactive Features](./docs/en/INTERACTIVE_FEATURES.md)
- [Performance Optimization](./docs/en/PERFORMANCE_OPTIMIZATION.md)

## License

MIT
