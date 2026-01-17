# HudX API Reference

This document provides detailed information about the render API and chart components of HudX.

## Table of Contents

- [Core Engine (`hudx-render`)](#render-engine-hudx-render)
  - [Renderer](#renderer)
  - [ChartElement](#chartelement)
  - [Shape](#shape)
  - [Animation](#animation)
  - [Utils](#utils)
- [Chart Library (`hudx-charts`)](#chart-library-hudxcharts)
  - [Chart Base Class](#chart)
  - [Specific Charts](#specific-charts)
  - [React Component (`HChart`)](#hchart)
  - [ChartOption](#chartoption)

---

## Core Engine (`hudx-render`)

The render engine provides low-level rendering capabilities, supporting both Canvas and SVG modes.

### Renderer

The entry point for rendering, managing Painter and Storage.

```typescript
import { Renderer } from 'hudx-render';

// Initialize renderer
const renderer = Renderer.init(
  dom: HTMLElement,           // Container DOM
  renderMode?: 'canvas' | 'svg', // Render mode, default 'canvas'
  theme?: string | object,    // Theme, default 'light'
  locale?: string             // Locale, default 'en'
);

// Add element
renderer.add(element: ChartElement);

// Remove element
renderer.remove(element: ChartElement);

// Resize
renderer.resize(width?: number, height?: number);

// Flush render (draw changes to screen)
renderer.flush();

// Dispose
renderer.dispose();
```

### ChartElement

Base class for all graphical elements.

```typescript
import { ChartElement } from 'hudx-render';

const element = new ChartElement({
  zlevel: 0,       // Layer index
  z: 0,            // Stacking order within layer
  silent: false,   // Whether to ignore mouse events
  invisible: false,// Whether invisible
  cursor: 'default', // Cursor style
  style: { ... },  // Style properties
  shape: { ... },  // Shape properties
  transform: { ... } // Transform matrix
});

// Event listeners
element.on('click', (e) => { ... });
element.on('mouseover', (e) => { ... });

// Set attributes
element.attr('style', { fill: 'red' });
```

### Shape

Built-in basic shapes.

- **Circle**: `{ cx, cy, r }`
- **Rect**: `{ x, y, width, height, r }`
- **Line**: `{ x1, y1, x2, y2 }`
- **Polyline**: `{ points: [[x,y], ...] }`
- **Polygon**: `{ points: [[x,y], ...] }`
- **Text**: `{ x, y, text }`
- **Sector**: `{ cx, cy, r, r0, startAngle, endAngle }`
- **Image**: `{ x, y, width, height, image }`
- **Path**: SVG Path `{ d: 'M...' }`

### Animation

Animation system support.

```typescript
import { Animation, Easing } from 'hudx-render';

const anim = new Animation(
  target: object,    // Target object
  prop: string,      // Property name
  to: number,        // Target value
  duration: number,  // Duration (ms)
  delay: number,     // Delay (ms)
  easing: string,    // Easing function (e.g., 'cubicOut')
  callback: () => void // Completion callback
);

anim.start();
```

### Utils

Utility functions.

- `ThemeManager`: Theme management `getTheme(name)`, `registerTheme(name, config)`
- `LocaleManager`: I18n `t(key, default)`
- `matrix`: Matrix operations
- `color`: Color processing
- `pattern`: Pattern generation `createDecalPattern`

---

## Chart Library (`hudx-charts`)

High-level chart components built on the render engine, designed to be compatible with ECharts API.

### Chart

Base class for charts, encapsulating common coordinate systems, legends, tooltips, and rendering flow.

### Specific Charts

- **LineChart**
- **BarChart**
- **PieChart**
- **DoughnutChart**
- **ScatterChart**
- **HeatmapChart**

### HChart

React component wrapper, recommended for React projects.

```tsx
import { HChart } from 'hudx-charts';

<HChart
  option={option}           // ECharts-style configuration
  width={800}               // Width (optional)
  height={600}              // Height (optional)
  theme="light"             // Theme
  renderMode="canvas"       // Render mode 'canvas' | 'svg'
  onEvents={{ click: ... }} // Event binding
/>
```

### ChartOption

Configuration interface, key fields include:

```typescript
interface ChartOption {
  title?: {
    text: string;
    subtext?: string;
    left?: string | number;
    top?: string | number;
  };
  tooltip?: {
    show: boolean;
    trigger: 'item' | 'axis';
    formatter?: string | ((params: any) => string);
  };
  legend?: {
    show: boolean;
    data?: string[] | Array<{
      name: string;
      icon?: 'circle' | 'rect' | 'line';
      textStyle?: {
        color?: string;
        fontSize?: number;
        fontWeight?: string;
        fontFamily?: string;
      };
    }>;
    orient?: 'horizontal' | 'vertical';
  };
  grid?: {
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
  };
  xAxis?: {
    type?: 'category' | 'value'; // Auto-detected as 'category' if data is provided
    data?: any[];
  };
  yAxis?: {
    type: 'value' | 'category';
  };
  series: Array<{
    type: 'line' | 'bar' | 'pie' | ...;
    name?: string;
    data: any[];
    itemStyle?: { color?: string; ... };
    // ... other series-specific config
  }>;
  animation?: boolean;
  backgroundColor?: string;
  aria?: {
    enabled: boolean;
    decal?: { show: boolean; ... };
  };
}
```
