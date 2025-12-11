# ECharts API Compatibility Analysis & Implementation Guide

## 📊 Overview

This document compares **ECharts Official API** with **HudX Current Implementation**, providing improvement recommendations to ensure HudX maintains API consistency with ECharts.

Reference: [ECharts Official API Documentation](https://echarts.apache.org/zh/api.html)

---

## 1️⃣ Global echarts Object API

### Methods Provided by ECharts

| Method | Functionality | HudX Current | Status | Priority |
|--------|--------------|-------------|--------|----------|
| `echarts.init()` | Initialize instance | ✅ `Renderer.init()` | Implemented | P0 |
| `echarts.connect()` | Multi-chart linkage | ❌ | Not implemented | P2 |
| `echarts.disconnect()` | Cancel linkage | ❌ | Not implemented | P2 |
| `echarts.dispose()` | Dispose instance | ✅ `Renderer.dispose()` | Implemented | P0 |
| `echarts.getInstanceByDom()` | Get instance by DOM | ❌ | Not implemented | P1 |
| `echarts.use()` | On-demand import | ❌ | N/A (different packaging) | N/A |
| `echarts.registerMap()` | Register map | ❌ | Not implemented | P3 |
| `echarts.getMap()` | Get map | ❌ | Not implemented | P3 |
| `echarts.registerTheme()` | Register theme | ✅ `ThemeManager` | Implemented | P0 |
| `echarts.registerLocale()` | Register language | ✅ `LocaleManager` | Implemented | P0 |
| `echarts.registerCustomSeries()` | Register custom series | ❌ | Not implemented | P3 |
| `echarts.setPlatformAPI()` | Set platform API | ❌ | Not implemented | P2 |
| `echarts.graphic.*` | Graphic utility methods | ❌ | Not implemented | P2 |

### Recommended Implementation

Create an ECharts-compatible global object or wrapper class:

```typescript
// packages/charts/src/index.ts or new packages/charts/src/echarts.ts

export class ECharts {
  static init(dom: HTMLElement | string, theme?: Theme, opts?: {
    devicePixelRatio?: number;
    renderer?: 'canvas' | 'svg';
    width?: number | string;
    height?: number | string;
    locale?: Locale;
  }): Renderer {
    return Renderer.init(dom, opts?.renderer === 'svg' ? 'svg' : 'canvas', theme, opts?.locale);
  }

  static getInstanceByDom(dom: HTMLElement): Renderer | undefined {
    // Maintain global Map for DOM -> Renderer mapping
    return instanceMap.get(dom);
  }

  static dispose(target: Renderer | HTMLElement): void {
    if (target instanceof Renderer) {
      target.dispose();
    } else {
      const instance = instanceMap.get(target);
      instance?.dispose();
    }
  }

  static registerTheme(name: string, theme: ThemeConfig): void {
    ThemeManager.registerTheme(name, theme);
  }

  static registerLocale(locale: Locale, config: any): void {
    LocaleManager.registerLocale(locale, config);
  }

  // TODO: Implement other methods
  static connect(group: string | any[]): void {
    // Implement multi-chart linkage logic
  }

  static disconnect(group: string): void {
    // Implement cancel linkage logic
  }
}
```

---

## 2️⃣ ECharts Instance API (echartsInstance)

### Core Method Comparison

#### A. Initialization & Basic Methods

| Method | Functionality | ECharts Signature | HudX Current | Status |
|--------|---------------|-------------------|-------------|--------|
| `init()` | Create instance | ✅ | `Renderer.init()` | ✅ Implemented |
| `setOption()` | Set configuration | ✅ | `Chart.setOption()` | ✅ Enhanced |
| `getOption()` | Get configuration | ✅ | `Chart.getOption()` | ✅ Enhanced |
| `dispose()` | Dispose instance | ✅ | `Renderer.dispose()` | ✅ Implemented |

#### B. Size & DOM Methods

| Method | Functionality | HudX Current | Status |
|--------|---------------|-------------|--------|
| `getWidth()` | Get width | ✅ `Renderer.getWidth()` | ✅ Implemented |
| `getHeight()` | Get height | ✅ `Renderer.getHeight()` | ✅ Implemented |
| `getDom()` | Get container DOM | ✅ `Renderer.getDom()` | ✅ Implemented |
| `resize()` | Resize | ✅ `Renderer.resize()` | ✅ Implemented |

#### C. Theme & Internationalization

| Method | Functionality | ECharts Signature | HudX Current | Status |
|--------|---------------|-------------------|-------------|--------|
| `setTheme()` | Set theme | `(theme: string \| Object, opts?: {...})` | ✅ `Renderer.setTheme()` | ⚠️ Signature needs alignment |
| `getTheme()` | Get theme | ❌ | ✅ `Renderer.getTheme()` | ✅ |

#### D. Event Methods

| Method | Functionality | ECharts Signature | HudX Current | Status |
|--------|---------------|-------------------|-------------|--------|
| `on()` | Listen event | `(eventName, handler, context?)` | ✅ `Renderer.on()` | ✅ Implemented |
| `off()` | Remove listener | `(eventName?, handler?)` | ✅ `Renderer.off()` | ✅ Implemented |
| `dispatchAction()` | Dispatch action | `(payload)` | ❌ | Needs implementation |

#### E. Coordinate Conversion Methods (New)

| Method | Functionality | Priority |
|--------|---------------|----------|
| `convertToPixel()` | Logic coordinate → Pixel coordinate | P2 |
| `convertFromPixel()` | Pixel coordinate → Logic coordinate | P2 |
| `convertToLayout()` | Coordinate → Layout info | P3 |
| `containPixel()` | Check if point in area | P2 |

#### F. Data Export Methods (New)

| Method | Functionality | Priority |
|--------|---------------|----------|
| `getDataURL()` | Export as image URL | P2 |
| `renderToSVGString()` | Render as SVG string | P2 |
| `appendData()` | Incremental rendering | P3 |

#### G. Loading & Others

| Method | Functionality | HudX Current | Priority |
|--------|---------------|-------------|----------|
| `showLoading()` | Show loading animation | ❌ | P2 |
| `hideLoading()` | Hide loading animation | ❌ | P2 |
| `clear()` | Clear instance | ✅ `Chart.clear()` | ✅ Implemented |
| `isDisposed()` | Check if disposed | ✅ `Renderer.isDisposed()` / `Chart.isDisposed()` | ✅ Implemented |

---

## 3️⃣ Detailed Improvement Recommendations

### A. Enhance setOption() Method

#### ECharts Standard Signature

```typescript
setOption(
  option: Object,
  notMerge?: boolean,
  lazyUpdate?: boolean
)
// Or
setOption(
  option: Object,
  opts?: {
    notMerge?: boolean;
    replaceMerge?: string | string[];
    lazyUpdate?: boolean;
    silent?: boolean;
  }
)
```

#### HudX Current Implementation

```typescript
setOption(option: ChartOption, notMerge: boolean = false): void {
  // ...
}
```

#### Improvement Plan

```typescript
setOption(
  option: ChartOption,
  notMerge?: boolean | {
    notMerge?: boolean;
    replaceMerge?: string | string[];
    lazyUpdate?: boolean;
    silent?: boolean;
  },
  lazyUpdate?: boolean
): this {
  // Handle parameter overloading
  let opts = {
    notMerge: false,
    replaceMerge: undefined,
    lazyUpdate: false,
    silent: false
  };

  if (typeof notMerge === 'object') {
    opts = { ...opts, ...notMerge };
  } else if (typeof notMerge === 'boolean') {
    opts.notMerge = notMerge;
  }

  if (typeof lazyUpdate === 'boolean') {
    opts.lazyUpdate = lazyUpdate;
  }

  // Implement component merge logic
  if (opts.notMerge) {
    this._option = option;
  } else if (opts.replaceMerge) {
    // Implement replaceMerge logic
    this._option = this._mergeOption(this._option, option, opts.replaceMerge);
  } else {
    // Normal merge
    this._option = this._mergeOption(this._option, option);
  }

  if (!opts.silent) {
    this._renderer.trigger('optionchanged', { option: this._option });
  }

  if (!opts.lazyUpdate) {
    this._render();
  }

  return this;
}
```

### B. Implementation Checklist for New Methods

#### 1. getDom() - Get Container

```typescript
getDom(): HTMLElement {
  return this._renderer.getDom?.() || document.querySelector('[data-renderer-dom]')!;
}
```

#### 2. dispatchAction() - Dispatch Action

```typescript
dispatchAction(payload: {
  type: string;
  [key: string]: any;
}): this {
  // Trigger corresponding logic based on action type
  switch (payload.type) {
    case 'click':
    case 'mouseover':
    case 'mouseout':
      // Trigger element event
      this._renderer.trigger(payload.type, payload);
      break;
    // ... other action types
  }
  return this;
}
```

#### 3. showLoading()/hideLoading() - Loading Animation

```typescript
showLoading(type?: string, opts?: any): this {
  // Create loading layer above renderer
  // Implement rotation animation, progress indicator, etc.
  return this;
}

hideLoading(): this {
  // Remove loading layer
  return this;
}
```

#### 4. getDataURL() - Export as Image

```typescript
getDataURL(opts?: {
  type?: 'png' | 'jpg' | 'svg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}): string {
  const canvas = this._renderer.getCanvas();
  if (canvas) {
    return canvas.toDataURL(`image/${opts?.type || 'png'}`);
  }
  return '';
}
```

#### 5. convertToPixel() - Coordinate Conversion

```typescript
convertToPixel(finder: any, coord: any[]): number[] {
  // Convert logic coordinates to pixel coordinates based on coordinate system
  // Needs to support various coordinate systems
  return [0, 0];
}
```

### C. Component Merge Mode Implementation

ECharts supports two merge modes that need implementation in `setOption()`:

#### Normal Merge

```typescript
// Characteristic: Add only, no deletion, merge by order
// Example: Existing [A, B, C], New [X, Y] → [A', B', C, X, Y]
```

#### Replace Merge

```typescript
// Characteristic: Support deletion, match by id/name
// Example: Existing [id:m, id:n, id:q], New [id:m:55, id:t:222] → [m:55, t:222, q:77, 333]
```

---

## 4️⃣ Type Definition Improvements

### Current Issues

HudX's type definitions need alignment with ECharts, especially:

```typescript
// Need to add in types.ts
export interface SetOptionOpts {
  notMerge?: boolean;
  replaceMerge?: string | string[];
  lazyUpdate?: boolean;
  silent?: boolean;
}

export interface ConvertToPixelFinder {
  xAxisIndex?: number;
  xAxisId?: string;
  yAxisIndex?: number;
  yAxisId?: string;
  // ... other coordinate system options
}

export interface DataURLOpts {
  type?: 'png' | 'jpg' | 'svg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}

export interface ResizeOpts {
  width?: number | string;
  height?: number | string;
  silent?: boolean;
  animation?: {
    duration?: number;
    easing?: string;
  };
}
```

---

## 5️⃣ Implementation Priority Table

### P0 - Critical (Implemented or Required)

- ✅ `Renderer.init()` - Initialization
- ✅ `Renderer.dispose()` - Disposal
- ✅ `Renderer.setTheme()` - Theme setting
- ✅ `Renderer.getWidth()/getHeight()` - Size retrieval
- ✅ `Renderer.on()/off()` - Event system
- ✅ `Chart.setOption()/getOption()` - Configuration management

### P1 - Important

- 🔴 `Renderer.getDom()` - Get container
- 🔴 `Chart.clear()` - Clear chart
- 🔴 `Renderer.isDisposed()` - Check disposed status

### P2 - Medium Priority

- 🔴 `convertToPixel()` - Coordinate conversion
- 🔴 `convertFromPixel()` - Reverse coordinate conversion
- 🔴 `containPixel()` - Area judgment
- 🔴 `getDataURL()` - Image export
- 🔴 `renderToSVGString()` - SVG export
- 🔴 `showLoading()/hideLoading()` - Loading animation
- 🔴 `echarts.getInstanceByDom()` - Instance retrieval
- 🔴 `echarts.setPlatformAPI()` - Platform API
- 🔴 `echarts.graphic.*` - Graphic utilities

### P3 - Optional

- 🔴 `echarts.connect()/disconnect()` - Multi-chart linkage
- 🔴 `echarts.registerMap()` - Map registration
- 🔴 `echarts.registerCustomSeries()` - Custom series
- 🔴 `convertToLayout()` - Layout conversion
- 🔴 `appendData()` - Incremental rendering

---

## 6️⃣ Migration Guide

### Migrating from ECharts to HudX

```typescript
// ECharts usage
import * as echarts from 'echarts';
const chart = echarts.init(dom);
chart.setOption(option);
chart.on('click', handler);

// HudX compatible usage
import { Renderer } from '@hudx/core';
const chart = Renderer.init(dom);
chart.setOption(option);
chart.on('click', handler);

// Or use Chart wrapper
import { Chart } from '@hudx/charts';
const chart = new Chart(dom, option);
chart.setOption(option);
```

---

## 7️⃣ Summary

### Current Status

- ✅ HudX has implemented approximately **40%** of ECharts core API
- ⚠️ Missing coordinate conversion, data export, and other advanced features
- ⚠️ Component merge mode implementation is incomplete

### Recommended Roadmap

1. **Phase 1** (P0): Enhance `setOption()` parameters and options
2. **Phase 2** (P1): Implement `getDom()`, `clear()`, `isDisposed()`
3. **Phase 3** (P2): Implement coordinate conversion, data export, loading animation
4. **Phase 4** (P3): Implement multi-chart linkage, custom series, and other advanced features

### Key Points

- Maintain API signature consistency with ECharts
- Implement component merge modes (Normal Merge + Replace Merge)
- Enhance type definitions
- Consider backward compatibility

---

## 📚 Reference Resources

- [ECharts Official API Documentation](https://echarts.apache.org/zh/api.html)
- [ECharts Best Practices](https://echarts.apache.org/handbook/zh/basics/import)
- [ECharts Event System](https://echarts.apache.org/handbook/zh/concepts/event)
- [ECharts Coordinate Systems](https://echarts.apache.org/handbook/zh/concepts/coordinate-system)
