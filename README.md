# HudX - High-Performance Charting Library

English | [简体中文](./README.zh-CN.md)

HudX is a high-performance charting library built with React and TypeScript. It is inspired by the underlying rendering logic of [ZRender](https://github.com/ecomfe/zrender) and the API design of [ECharts](https://github.com/apache/echarts), supporting both Canvas and SVG rendering modes.

## Features

- 🚀 **High Performance**: Supports Canvas and SVG rendering modes, handles large datasets efficiently
- 🎨 **Rich Chart Types**: Line, Bar, Pie, Scatter, and Heatmap charts
- ⚛️ **React Integration**: Seamless React component integration
- 📦 **Modular Design**: Decoupled core rendering engine and chart library
- 🎯 **TypeScript**: Full TypeScript support with strict type checking
- 🎬 **Complete Animation System**: Multiple easing functions (linear, quadratic, cubic, elastic)
- 🔧 **Extensible Architecture**: Easy to add new chart types and graphic elements
- 🖼️ **Dual Rendering Modes**: Canvas (high performance) and SVG (vector graphics)
- 🌓 **Theme Support**: Light and Dark themes with customization
- 🌍 **Internationalization**: 10+ languages with custom language pack support
- 💬 **Interactive Components**: Tooltip, Legend, and comprehensive event system

## Project Structure

```
HudX/
├── packages/
│   ├── core/          # Core rendering engine (similar to ZRender)
│   │   ├── src/
│   │   │   ├── Renderer.ts      # Main rendering engine class
│   │   │   ├── Element.ts       # Base class for graphic elements
│   │   │   ├── Group.ts         # Group container
│   │   │   ├── Storage.ts       # Element storage management
│   │   │   ├── Handler.ts       # Event handler
│   │   │   ├── shape/           # Graphic elements (11 types)
│   │   │   ├── animation/       # Animation system
│   │   │   ├── component/       # Components (Tooltip, Legend)
│   │   │   ├── painter/         # Painters (Canvas, SVG)
│   │   │   ├── theme/           # Theme management
│   │   │   ├── i18n/            # Internationalization
│   │   │   └── util/            # Utility functions
│   │   └── package.json
│   └── charts/        # Chart library (similar to ECharts)
│       ├── src/
│       │   ├── Chart.ts         # Base chart class
│       │   ├── chart/           # Chart implementations
│       │   ├── react/           # React components
│       │   └── util/            # Utility functions
│       └── package.json
├── examples/          # Interactive examples
│   ├── src/
│   │   ├── examples/
│   │   │   ├── BasicLine.tsx
│   │   │   ├── BasicBar.tsx
│   │   │   ├── BasicPie.tsx
│   │   │   ├── AdvancedLineChart.tsx
│   │   │   ├── AdvancedBarChart.tsx
│   │   │   ├── AdvancedPieChart.tsx
│   │   │   ├── Animation.tsx
│   │   │   ├── Interaction.tsx
│   │   │   ├── ThemeSwitch.tsx
│   │   │   ├── PerformanceTest.tsx
│   │   │   └── FullFeatureDemo.tsx
│   └── package.json
└── docs/              # Complete documentation (Chinese & English)
    ├── zh/            # Chinese documentation
    └── en/            # English documentation
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

### Run Examples

```bash
cd examples
pnpm dev
# Visit http://localhost:5173
```

## Usage Examples

### React Component

```tsx
import React from 'react';
import { HChart } from '@hudx/charts';

function App() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    }]
  };

  return (
    <HChart
      option={option}
      width={800}
      height={400}
      renderMode="canvas"
      theme="dark"
      locale="en"
      onEvents={{
        click: (event) => {
          console.log('Chart clicked:', event);
        }
      }}
    />
  );
}
```

### Core API

```typescript
import { Renderer, Circle, Rect, Animation, Easing } from '@hudx/core';

// Initialize renderer
const renderer = Renderer.init('#container', 'canvas', 'light', 'en');

// Create circle
const circle = new Circle({
  shape: { cx: 100, cy: 100, r: 50 },
  style: { fill: '#ff0000', stroke: '#000000', lineWidth: 2 }
});

renderer.add(circle);

// Create rectangle
const rect = new Rect({
  shape: { x: 200, y: 200, width: 100, height: 100 },
  style: { fill: '#00ff00' }
});

renderer.add(rect);

// Add animation
const animation = new Animation(
  circle.attr('shape'),
  'r',
  100,
  1000,
  0,
  Easing.cubicOut,
  () => renderer.flush()
);
animation.start();
```

## Core Architecture

### 1. Core Rendering Engine (@hudx/core)

Uses MVC architecture, supporting both Canvas and SVG rendering modes:

- **Model (Storage)**: Manages graphic element storage and hierarchy
- **View (Painter)**: Handles Canvas/SVG rendering
- **Controller (Handler)**: Processes user interaction events

#### Main Classes

- **Renderer**: Main rendering engine managing the entire rendering pipeline, supports Canvas/SVG, themes, and i18n
- **Element**: Base class for all graphic elements
- **Group**: Container element that can hold child elements
- **Storage**: Element storage manager maintaining element tree
- **Painter**: Painter interface (CanvasPainter and SVGPainter implementations)
- **Handler**: Event handler for mouse, touch, and other interactions
- **Animation**: Animation system with multiple easing functions
- **Tooltip**: Data tooltip component
- **Legend**: Legend component

#### Graphic Elements (Shape)

- `Circle`: Circle
- `Rect`: Rectangle
- `Line`: Line
- `Polyline`: Polyline
- `Polygon`: Polygon
- `Arc`: Arc
- `BezierCurve`: Bezier curve
- `Path`: SVG path
- `Text`: Text
- `Sector`: Sector
- `Image`: Image

### 2. Chart Library (@hudx/charts)

Inspired by ECharts' API design, providing similar user experience.

#### Chart Types

- **LineChart**: Line chart
- **BarChart**: Bar chart
- **PieChart**: Pie chart
- **ScatterChart**: Scatter chart
- **HeatmapChart**: Heatmap chart

#### Configuration Options

```typescript
interface ChartOption {
  title?: TitleOption;
  tooltip?: TooltipOption;
  legend?: LegendOption;
  grid?: GridOption;
  xAxis?: AxisOption | AxisOption[];
  yAxis?: AxisOption | AxisOption[];
  series?: SeriesOption[];
  backgroundColor?: string;
  animation?: boolean;
  animationDuration?: number;
  animationEasing?: string;
}
```

## Interactive Features

### Animation System

Supports multiple easing functions:

```typescript
import { Animation, Easing } from '@hudx/core';

const animation = new Animation(
  target,
  'property',
  endValue,
  1000,           // Duration
  0,              // Delay
  Easing.cubicOut // Easing function
);
animation.start();
```

**Supported Easing Functions**:

- `linear`: Linear
- `quadraticIn/Out/InOut`: Quadratic easing
- `cubicIn/Out/InOut`: Cubic easing
- `elasticIn/Out`: Elastic easing

### Tooltip Component

```typescript
import { Tooltip } from '@hudx/core';

const tooltip = new Tooltip({
  backgroundColor: 'rgba(50, 50, 50, 0.95)',
  textColor: '#fff',
  padding: 12,
  fontSize: 13
});

renderer.add(tooltip);
tooltip.show(x, y, 'Content');
tooltip.hide();
```

### Legend Component

```typescript
import { Legend } from '@hudx/core';

const legend = new Legend({
  x: 20,
  y: 20,
  orient: 'horizontal',
  onSelect: (name, selected) => {
    // Handle selection event
  }
});

legend.setItems([
  { name: 'Series A', color: '#5470c6' },
  { name: 'Series B', color: '#91cc75' }
]);

renderer.add(legend);
```

### Event System

```typescript
// Element events
element.on('click', (event) => {
  console.log('Element clicked:', event);
});

// Supported event types
// click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout
// touchstart, touchmove, touchend, drag, dragend
```

## Performance Optimization

### 1. Dirty Flag Mechanism

Only redraw elements that need updating:

```typescript
element.markRedraw(); // Mark as needing redraw
```

### 2. Batch Updates

```typescript
renderer.add(circle1);
renderer.add(circle2);
renderer.flush(); // Render all elements at once
```

### 3. Object Pool Reuse

```typescript
import { ObjectPool } from '@hudx/core';

const pool = new ObjectPool(
  () => new Circle({ shape: { cx: 0, cy: 0, r: 0 } }),
  (circle) => circle.attr('shape', { cx: 0, cy: 0, r: 0 })
);

const circle = pool.acquire();
pool.release(circle);
```

### 4. Device Pixel Ratio Adaptation

Automatically adapts to high DPI screens for crisp rendering.

## Theme and Internationalization

### Theme

```typescript
const renderer = Renderer.init('#container', 'canvas', 'dark');
renderer.setTheme('light');
```

### Internationalization

```typescript
const renderer = Renderer.init('#container', 'canvas', 'light', 'en');
renderer.setLocale('zh-CN');
const text = renderer.t('chart.title', 'Chart');
```

**Supported Languages**: en, zh, zh-CN, zh-TW, ja, ko, fr, de, es, pt, ru

## Rendering Modes

### Canvas Mode (Default)

- High performance, suitable for large datasets
- Best for real-time updates and animations
- Lower memory footprint

### SVG Mode

- Vector graphics, infinite scaling without distortion
- Suitable for printing and exporting
- Better CSS support
- Lower performance with large datasets

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with Canvas/SVG support

## Documentation

- [English Documentation](./docs/en/SUMMARY.md)
- [中文文档](./docs/zh/SUMMARY.md)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by [ZRender](https://github.com/ecomfe/zrender) - The rendering engine of ECharts
- Inspired by [ECharts](https://github.com/apache/echarts) - Visual charting library
