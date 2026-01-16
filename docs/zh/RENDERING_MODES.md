# 渲染模式说明

HudX 支持两种渲染模式：**Canvas** 和 **SVG**。

## 渲染模式对比

### Canvas 模式（默认）

**优点**：

- ✅ 高性能，适合大量数据点
- ✅ 适合动态内容
- ✅ 内存占用相对较小
- ✅ 适合游戏和动画场景

**缺点**：

- ❌ 缩放会失真
- ❌ 无法直接导出为矢量图
- ❌ 不支持 CSS 样式

**适用场景**：

- 大数据量图表
- 实时数据更新
- 交互式可视化
- 性能要求高的场景

### SVG 模式

**优点**：

- ✅ 矢量图形，无限缩放不失真
- ✅ 支持 CSS 样式
- ✅ 可以直接导出为 SVG 文件
- ✅ 适合打印和导出
- ✅ DOM 结构，易于调试

**缺点**：

- ❌ 大量元素时性能较差
- ❌ 内存占用较大
- ❌ 不适合频繁更新的场景

**适用场景**：

- 需要打印或导出
- 需要 CSS 样式控制
- 元素数量较少
- 需要矢量图格式

## 使用方法

### 在 Renderer 中使用

```typescript
import { Renderer, Circle, Rect } from "hux-core";

// Canvas 模式
const renderer = Renderer.init("#container", "canvas");

// SVG 模式
const rendererSVG = Renderer.init("#container", "svg");

// 切换渲染模式
renderer.setRenderMode("svg");
```

### 在 React 组件中使用

```tsx
import { HChart } from 'hux-charts';

// Canvas 模式
<HChart
  option={option}
  renderMode="canvas"
  width={800}
  height={400}
/>

// SVG 模式
<HChart
  option={option}
  renderMode="svg"
  width={800}
  height={400}
/>
```

### 在 Chart 类中使用

```typescript
import { LineChart } from "hux-charts";

// Canvas 模式
const chart = new LineChart(dom, option, "canvas");

// SVG 模式
const chartSVG = new LineChart(dom, option, "svg");

// 切换模式
chart.setRenderMode("svg");
```

## 实现细节

### Canvas 渲染

Canvas 渲染使用 `CanvasPainter` 类：

- 使用 HTMLCanvasElement
- 通过 CanvasRenderingContext2D 绘制
- 支持高 DPI（devicePixelRatio）
- 使用 requestAnimationFrame 优化

### SVG 渲染

SVG 渲染使用 `SVGPainter` 类：

- 使用 SVGSVGElement
- 创建 SVG 元素（circle, rect, path 等）
- 通过 DOM 操作更新
- 支持所有 SVG 特性

## 性能建议

1. **大数据量**：使用 Canvas 模式
2. **需要导出**：使用 SVG 模式
3. **频繁更新**：使用 Canvas 模式
4. **静态图表**：使用 SVG 模式
5. **需要 CSS 控制**：使用 SVG 模式

## 图形元素支持

两种渲染模式都支持所有图形元素：

- ✅ Circle
- ✅ Rect
- ✅ Line
- ✅ Polyline
- ✅ Polygon
- ✅ Arc
- ✅ BezierCurve
- ✅ Path
- ✅ Text
- ✅ Sector
- ✅ Image
- ✅ Group

## 事件支持

两种渲染模式都支持完整的事件系统：

- ✅ 鼠标事件（click, mousemove, mouseover 等）
- ✅ 触摸事件（touchstart, touchmove, touchend）
- ✅ 拖拽支持
- ✅ 事件冒泡

## 注意事项

1. **切换模式**：切换渲染模式会重新创建 Painter 和 Handler，需要重新渲染
2. **性能差异**：Canvas 模式在大量元素时性能更好
3. **导出功能**：SVG 模式可以直接导出为 SVG 文件
4. **样式控制**：SVG 模式支持通过 CSS 控制样式
