# Rendering Modes Guide

HudX supports two rendering modes: **Canvas** and **SVG**.

## Rendering Mode Comparison

### Canvas Mode (Default)

**Advantages**:

- ✅ High performance, suitable for large datasets
- ✅ Suitable for dynamic content
- ✅ Relatively low memory footprint
- ✅ Suitable for games and animation scenarios

**Disadvantages**:

- ❌ Scaling causes distortion
- ❌ Cannot directly export as vector graphics
- ❌ No CSS support

**Use Cases**:

- Large dataset charts
- Real-time data updates
- Interactive visualizations
- Performance-critical scenarios

### SVG Mode

**Advantages**:

- ✅ Vector graphics, infinite scaling without distortion
- ✅ CSS styling support
- ✅ Can directly export as SVG file
- ✅ Suitable for printing and exporting
- ✅ DOM structure, easy to debug

**Disadvantages**:

- ❌ Poor performance with many elements
- ❌ Higher memory usage
- ❌ Not suitable for frequent updates

**Use Cases**:

- Need to print or export
- Need CSS style control
- Fewer elements
- Need vector graphics format

## Usage Methods

### Using Renderer

```typescript
import { Renderer, Circle, Rect } from '@hudx/core';

// Canvas mode
const renderer = Renderer.init('#container', 'canvas');

// SVG mode
const rendererSVG = Renderer.init('#container', 'svg');

// Switch rendering mode
renderer.setRenderMode('svg');
```

### Using React Component

```tsx
import { HChart } from '@hudx/charts';

// Canvas mode
<HChart
  option={option}
  renderMode="canvas"
  width={800}
  height={400}
/>

// SVG mode
<HChart
  option={option}
  renderMode="svg"
  width={800}
  height={400}
/>
```

### Using Chart Class

```typescript
import { LineChart } from '@hudx/charts';

// Canvas mode
const chart = new LineChart(dom, option, 'canvas');

// SVG mode
const chartSVG = new LineChart(dom, option, 'svg');

// Switch mode
chart.setRenderMode('svg');
```

## Implementation Details

### Canvas Rendering

Canvas rendering uses the `CanvasPainter` class:

- Uses HTMLCanvasElement
- Renders through CanvasRenderingContext2D
- High DPI support (devicePixelRatio)
- Optimized with requestAnimationFrame

### SVG Rendering

SVG rendering uses the `SVGPainter` class:

- Uses SVGSVGElement
- Creates SVG elements (circle, rect, path, etc.)
- Updates through DOM manipulation
- Supports all SVG features

## Performance Recommendations

1. **Large Datasets**: Use Canvas mode
2. **Need Export**: Use SVG mode
3. **Frequent Updates**: Use Canvas mode
4. **Static Charts**: Use SVG mode
5. **Need CSS Control**: Use SVG mode

## Graphic Element Support

Both rendering modes support all graphic elements:

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

## Event Support

Both rendering modes support the complete event system:

- ✅ Mouse events (click, mousemove, mouseover, etc.)
- ✅ Touch events (touchstart, touchmove, touchend)
- ✅ Drag support
- ✅ Event bubbling

## Best Practices

1. **Default to Canvas** - Use Canvas mode for most scenarios
2. **Switch When Needed** - Switch to SVG for export or printing
3. **Monitor Performance** - Test with your typical dataset size
4. **Consider Responsiveness** - Both modes work well with responsive designs
5. **Use Themes** - Leverage themes for visual consistency

## Performance Metrics

### Canvas Mode

- Handles 10,000+ elements efficiently
- Real-time update capable
- Lower memory usage
- Smooth animations

### SVG Mode

- Best for <1,000 elements
- Static content recommended
- Higher memory usage
- Better for precise output

## Migration Guide

To switch from Canvas to SVG:

```typescript
// Before - Canvas only
const renderer = Renderer.init('#container', 'canvas');

// After - Can switch between modes
const renderer = Renderer.init('#container', 'canvas');

// User action to switch to SVG
document.getElementById('svg-button').addEventListener('click', () => {
  renderer.setRenderMode('svg');
});
```

## Browser Compatibility

Both modes are supported in:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with Canvas/SVG support

## Troubleshooting

### Canvas Mode Issues

- Blurry on high DPI: Check devicePixelRatio setting
- Performance problems: Reduce number of elements or use batching
- Event not working: Check element bounds and z-index

### SVG Mode Issues

- Slow rendering: Reduce number of elements
- Memory issues: Clear unused SVG elements
- Export issues: Check SVG element attributes
