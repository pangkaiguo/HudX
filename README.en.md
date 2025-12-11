# HudX - High-Performance Charting Library

HudX is a high-performance charting library built with React and TypeScript. It is inspired by the underlying rendering logic of [ZRender](https://github.com/ecomfe/zrender) and the API design of [ECharts](https://github.com/apache/echarts), supporting both Canvas and SVG rendering modes.

## Features

- 🚀 **High Performance**: Supports both Canvas and SVG rendering modes, handles large datasets
- 🎨 **Rich Chart Types**: Supports line charts, bar charts, pie charts, scatter charts, and more
- ⚛️ **React Integration**: Provides React components for easy usage
- 📦 **Modular Design**: Core rendering engine and chart library are separated
- 🎯 **TypeScript**: Full TypeScript type support
- 🎬 **Animation Support**: Built-in animation system with multiple easing functions
- 🔧 **Extensible**: Easy to extend with new chart types and graphic elements
- 🖼️ **Dual Rendering Modes**: Supports Canvas (high performance) and SVG (scalable vector graphics)
- 🌓 **Theme Support**: Supports Light and Dark themes with custom theme capability
- 🌍 **Internationalization**: Supports 10+ languages with custom language pack support

## Project Structure

```
HudX/
├── packages/
│   ├── core/          # Core rendering engine (similar to ZRender)
│   │   ├── src/
│   │   │   ├── Renderer.ts      # Main rendering engine class
│   │   │   ├── Element.ts      # Base class for graphic elements
│   │   │   ├── Group.ts        # Group container
│   │   │   ├── Storage.ts      # Element storage management
│   │   │   ├── Handler.ts      # Event handler
│   │   │   ├── shape/          # Graphic elements
│   │   │   ├── animation/      # Animation system
│   │   │   └── util/           # Utilities
│   │   └── package.json
│   └── charts/        # Chart library (similar to ECharts)
│       ├── src/
│       │   ├── Chart.ts        # Base chart class
│       │   ├── chart/          # Chart implementations
│       │   ├── react/          # React components
│       │   └── util/           # Utility functions
│       └── package.json
└── package.json
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

### Usage Examples

#### React Component

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

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
    <HudXChart
      option={option}
      width={800}
      height={400}
      renderMode="canvas" // or "svg"
      theme="dark"        // or "light"
      locale="en"         // or "zh-CN", "ja", "ko", etc.
      onEvents={{
        click: (event) => {
          console.log('Chart clicked:', event);
        }
      }}
    />
  );
}
```

#### Using Core API Directly

```typescript
import { Renderer, Circle, Rect } from '@hudx/core';

// Canvas mode (default, high performance)
const renderer = Renderer.init('#container', 'canvas', 'light', 'en');

// SVG mode (scalable vector graphics)
const rendererSVG = Renderer.init('#container', 'svg', 'dark', 'en');

// Create a circle
const circle = new Circle({
  shape: {
    cx: 100,
    cy: 100,
    r: 50
  },
  style: {
    fill: '#ff0000',
    stroke: '#000000',
    lineWidth: 2
  }
});

renderer.add(circle);

// Create a rectangle
const rect = new Rect({
  shape: {
    x: 200,
    y: 200,
    width: 100,
    height: 100
  },
  style: {
    fill: '#00ff00'
  }
});

renderer.add(rect);
```

## Core Architecture

### 1. Core Rendering Engine (@hudx/core)

The core rendering engine is inspired by ZRender's design, adopting an MVC architecture with support for both Canvas and SVG rendering modes:

- **Model (Storage)**: Manages storage and hierarchy of graphic elements
- **View (Painter)**: Handles Canvas/SVG rendering
- **Controller (Handler)**: Processes user interaction events

#### Main Classes

- **Renderer**: Main rendering engine that manages the entire rendering process, supports Canvas and SVG modes, themes, and i18n
- **Element**: Base class for all graphic elements
- **Group**: Container element that can contain child elements
- **Storage**: Element storage manager that maintains the element tree
- **Painter**: Painter interface with CanvasPainter and SVGPainter implementations
- **Handler**: Event handler for mouse and touch interactions

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

The chart library is inspired by ECharts' API design, providing a similar usage experience.

#### Chart Types

- **LineChart**: Line chart
- **BarChart**: Bar chart
- **PieChart**: Pie chart
- **ScatterChart**: Scatter chart

#### Configuration Options

Chart configuration options are similar to ECharts:

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
}
```

## Theme System

HudX supports Light and Dark themes with custom theme support:

```typescript
import { Renderer } from '@hudx/core';

const renderer = Renderer.init('#container', 'canvas', 'light', 'en');

// Switch theme
renderer.setTheme('dark');

// Get current theme
const theme = renderer.getTheme();
```

## Internationalization

HudX supports 10+ languages:

```typescript
import { Renderer } from '@hudx/core';

// Create with specific locale
const renderer = Renderer.init('#container', 'canvas', 'light', 'zh-CN');

// Switch locale
renderer.setLocale('en');

// Get current locale
const locale = renderer.getLocale();
```

Supported locales: `en`, `zh`, `zh-CN`, `zh-TW`, `ja`, `ko`, `fr`, `de`, `es`, `pt`, `ru`

## Rendering Modes

HudX supports two rendering modes with different trade-offs:

### Canvas Mode (Default)

- High performance, suitable for large datasets
- Best for real-time updates and animations
- Lower memory footprint

### SVG Mode

- Vector graphics, infinite scaling without distortion
- Suitable for printing and exporting
- Better CSS support
- Lower performance with large datasets

See [RENDERING_MODES.md](./docs/RENDERING_MODES.md) for detailed comparison.

## Documentation

- [README.md](./README.md) - Chinese version
- [IMPLEMENTATION.md](./docs/IMPLEMENTATION.md) - Implementation details
- [EXAMPLES.md](./docs/EXAMPLES.md) - Usage examples
- [THEME_AND_I18N.md](./docs/THEME_AND_I18N.md) - Theme and i18n configuration
- [RENDERING_MODES.md](./docs/RENDERING_MODES.md) - Rendering modes guide
- [FUNCTION_CHECKLIST.md](./docs/FUNCTION_CHECKLIST.md) - Function implementation checklist
- [RENDERER_COVERAGE.md](./docs/RENDERER_COVERAGE.md) - Renderer feature coverage

## Performance

HudX is optimized for performance:

- Dirty flag mechanism for efficient rendering
- RequestAnimationFrame batch updates
- High DPI support
- Object pool for memory reuse
- Batch updater for efficient updates

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with Canvas/SVG support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by [ZRender](https://github.com/ecomfe/zrender) - The rendering engine of ECharts
- Inspired by [ECharts](https://github.com/apache/echarts) - Visual charting library
