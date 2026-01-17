# HudX - High-Performance Charting Library

English | [简体中文](./README.zh-CN.md)

HudX is a high-performance charting library built with React and TypeScript. It is inspired by the underlying rendering logic of [ZRender](https://github.com/ecomfe/zrender) and the API design of [ECharts](https://github.com/apache/echarts), supporting both Canvas and SVG rendering modes.

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

## Project Structure

```
HudX/
├── packages/
│   ├── render/          # Core rendering engine
│   │   ├── src/
│   │   │   ├── Renderer.ts      # Main entry
│   │   │   ├── shape/           # Graphic elements (Circle, Rect, Path, etc.)
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
      renderMode="canvas" // or "svg"
      theme="light"
    />
  );
}
```

### Core API (Low-level)

```typescript
import { Renderer, Circle, Animation, Easing } from "hudx-render";

// Initialize
const renderer = Renderer.init(document.getElementById("container"));

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
