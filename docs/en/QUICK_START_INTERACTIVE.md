# HudX Interactive Features - Quick Start Guide

## 5-Minute Quick Start

### 1. Basic Setup

```typescript
import { Renderer, Polyline, Circle, Text, Tooltip, Legend, Animation, Easing } from 'HudX/core';

// Initialize renderer
const renderer = Renderer.init(container, 'canvas', 'light', 'en');
const width = 800;
const height = 400;

// Create Tooltip
const tooltip = new Tooltip();
renderer.add(tooltip);

// Create Legend
const legend = new Legend({ x: 20, y: 20, orient: 'horizontal' });
renderer.add(legend);
```

### 2. Draw Data

```typescript
// Data
const data = [120, 200, 150, 80, 70, 110, 130];
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxValue = Math.max(...data);

// Calculate coordinates
const points = data.map((value, index) => ({
  x: 100 + (index * 100),
  y: 300 - (value / maxValue) * 200,
  value,
  label: labels[index]
}));

// Draw line
renderer.add(new Polyline({
  shape: { points: points.map(p => [p.x, p.y]) },
  style: { stroke: '#5470c6', lineWidth: 2 }
}));

// Draw data points
points.forEach((point) => {
  renderer.add(new Circle({
    shape: { cx: point.x, cy: point.y, r: 4 },
    style: { fill: '#5470c6', stroke: '#fff', lineWidth: 2 }
  }));
});
```

### 3. Add Interactions

```typescript
// Add interactions to each data point
points.forEach((point, index) => {
  const circle = renderer.getRoot().children[index];
  
  // Hover effect
  circle.on('mouseover', () => {
    circle.attr('shape', { r: 7 });
    tooltip.show(point.x + 10, point.y - 30, `${labels[index]}\n${point.value}`);
    renderer.flush();
  });
  
  circle.on('mouseout', () => {
    circle.attr('shape', { r: 4 });
    tooltip.hide();
    renderer.flush();
  });
  
  // Click effect
  circle.on('click', () => {
    console.log('Clicked:', labels[index], point.value);
  });
});
```

### 4. Add Animations

```typescript
// Add fade-in animation to line
const line = renderer.getRoot().children[0];
const lineAnim = new Animation(
  line.attr('style'),
  'opacity',
  1,
  800,
  0,
  Easing.cubicOut,
  () => renderer.flush()
);
lineAnim.start();

// Add elastic animation to data points
points.forEach((point, index) => {
  const circle = renderer.getRoot().children[index + 1];
  const pointAnim = new Animation(
    circle.attr('shape'),
    'r',
    4,
    600,
    index * 100,
    Easing.elasticOut,
    () => renderer.flush()
  );
  pointAnim.start();
});
```

### 5. Add Legend

```typescript
// Set legend items
legend.setItems([
  { name: 'Series A', color: '#5470c6' }
]);

// Handle legend selection
legend.onSelect = (name, selected) => {
  // Toggle series visibility
  console.log(`${name}: ${selected ? 'shown' : 'hidden'}`);
};
```

---

## Common Code Snippets

### Create Multi-Series Chart

```typescript
const seriesData = [
  { name: 'Series A', color: '#5470c6', data: [120, 200, 150, 80, 70, 110, 130] },
  { name: 'Series B', color: '#91cc75', data: [100, 150, 120, 110, 90, 140, 120] }
];

seriesData.forEach((series, seriesIndex) => {
  const points = series.data.map((value, index) => ({
    x: 100 + (index * 100),
    y: 300 - (value / maxValue) * 200,
    value,
    label: labels[index]
  }));
  
  // Draw line
  renderer.add(new Polyline({
    shape: { points: points.map(p => [p.x, p.y]) },
    style: { stroke: series.color, lineWidth: 2, opacity: 0 }
  }));
  
  // Animate
  const line = renderer.getRoot().children[renderer.getRoot().children.length - 1];
  const anim = new Animation(
    line.attr('style'),
    'opacity',
    1,
    800,
    seriesIndex * 200,  // Staggered delay
    Easing.cubicOut
  );
  anim.start();
});

// Set legend
legend.setItems(seriesData.map(s => ({ name: s.name, color: s.color })));
```

### Create Bar Chart

```typescript
const barWidth = 60;
const barHeight = (value / maxValue) * 200;

const bar = new Rect({
  shape: { x: 100 + index * 100, y: 300 - barHeight, width: barWidth, height: 0 },
  style: { fill: '#5470c6' }
});

renderer.add(bar);

// Animate
const barAnim = new Animation(
  bar.attr('shape'),
  'height',
  barHeight,
  800,
  index * 100,
  Easing.cubicOut,
  () => renderer.flush()
);
barAnim.start();
```

### Create Pie Chart

```typescript
const total = data.reduce((sum, val) => sum + val, 0);
let currentAngle = -Math.PI / 2;

data.forEach((value, index) => {
  const sliceAngle = (value / total) * 2 * Math.PI;
  const startAngle = currentAngle;
  const endAngle = currentAngle + sliceAngle;
  
  const arc = new Arc({
    shape: {
      cx: 400,
      cy: 200,
      r: 100,
      r0: 0,
      startAngle: startAngle,
      endAngle: startAngle,  // Initial 0
      clockwise: true
    },
    style: { fill: colors[index] }
  });
  
  renderer.add(arc);
  
  // Animate
  const arcAnim = new Animation(
    arc.attr('shape'),
    'endAngle',
    endAngle,
    1000,
    index * 150,
    Easing.cubicOut,
    () => renderer.flush()
  );
  arcAnim.start();
  
  currentAngle = endAngle;
});
```

---

## Easing Functions Quick Reference

| Function | Effect | Use Case |
|----------|--------|----------|
| `linear` | Constant speed | Simple animations |
| `quadraticOut` | Fast deceleration | General animations |
| `cubicOut` | Smooth deceleration | Recommended |
| `elasticOut` | Elastic bounce | Emphasis effects |
| `cubicInOut` | Smooth acceleration/deceleration | Back-and-forth animations |

---

## Event Types Quick Reference

| Event | Trigger Condition |
|-------|-------------------|
| `mouseover` | Mouse enters element |
| `mouseout` | Mouse leaves element |
| `click` | Click element |
| `dblclick` | Double-click element |
| `mousedown` | Mouse button pressed |
| `mouseup` | Mouse button released |
| `mousemove` | Mouse moves |
| `touchstart` | Touch starts |
| `touchmove` | Touch moves |
| `touchend` | Touch ends |

---

## FAQ

### Q: How to disable animations?

```typescript
// Method 1: Don't call start()
// const anim = new Animation(...);
// anim.start();  // Comment out

// Method 2: Set duration to 0
const anim = new Animation(target, 'property', value, 0);
anim.start();
```

### Q: How to change animation speed?

```typescript
// Modify duration parameter
const anim = new Animation(
  target,
  'property',
  value,
  2000,  // Change to 2000ms (was 1000ms)
  0,
  Easing.cubicOut
);
```

### Q: How to add custom easing functions?

```typescript
const customEasing = (t: number) => {
  // t ranges from 0 to 1
  return t * t * (3 - 2 * t);  // smoothstep
};

const anim = new Animation(
  target,
  'property',
  value,
  1000,
  0,
  customEasing
);
```

### Q: How to handle multiple animations?

```typescript
const animations: Animation[] = [];

// Create animations
for (let i = 0; i < 10; i++) {
  const anim = new Animation(
    targets[i],
    'property',
    value,
    1000,
    i * 100,  // Staggered delay
    Easing.cubicOut
  );
  anim.start();
  animations.push(anim);
}

// Clean up
return () => {
  animations.forEach(anim => anim.stop());
};
```

### Q: How to update chart data?

```typescript
// Clear old data
renderer.removeAll();

// Add new data
const newData = [150, 220, 180, 100, 90, 130, 150];
// ... Redraw

renderer.flush();
```

---

## Performance Optimization Tips

### 1. Use Staggered Delays

```typescript
// ✅ Good
seriesData.forEach((series, index) => {
  const anim = new Animation(target, 'property', value, 1000, index * 200, easing);
  anim.start();
});

// ❌ Bad
seriesData.forEach((series) => {
  const anim = new Animation(target, 'property', value, 1000, 0, easing);
  anim.start();
});
```

### 2. Clean Up Properly

```typescript
// ✅ Good
useEffect(() => {
  // ... Create animations
  return () => {
    animations.forEach(anim => anim.stop());
    renderer.dispose();
  };
}, []);

// ❌ Bad
// Don't clean up animations and renderer
```

### 3. Use flush() to Control Redraws

```typescript
// ✅ Good
circle.on('mouseover', () => {
  circle.attr('shape', { r: 7 });
  tooltip.show(x, y, content);
  renderer.flush();  // Immediate redraw
});

// ❌ Bad
circle.on('mouseover', () => {
  circle.attr('shape', { r: 7 });
  tooltip.show(x, y, content);
  // Wait for next frame to redraw
});
```

---

## Complete Examples

View the following files for complete examples:

- `examples/src/examples/FullFeatureDemo.tsx` - Complete feature demo
- `examples/src/examples/StackLineChart.tsx` - Stack line chart
- `examples/src/examples/AdvancedBarChart.tsx` - Advanced bar chart
- `examples/src/examples/AdvancedPieChart.tsx` - Advanced pie chart
- `examples/src/examples/InteractiveDashboard.tsx` - Interactive dashboard

---

## Next Steps

1. View [Interactive Examples Guide](../examples/INTERACTIVE_EXAMPLES.md)
2. Read [Core API Documentation](../packages/core/README.md)
3. Explore [Complete Examples](../examples/src/examples/)

---

**Quick Links**:

- 🚀 [Start Development Server](#quick-start)
- 📚 [Complete Documentation](../README.md)
- 💡 [Best Practices](../INTERACTIVE_FEATURES_SUMMARY.md)
