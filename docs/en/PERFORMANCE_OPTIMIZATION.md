# HudX Performance Optimization Guide

## 1. Rendering Optimization

### Canvas vs SVG Selection
- **Canvas**: Suitable for large datasets (1000+ elements), better performance
- **SVG**: Suitable for highly interactive scenarios, supports CSS styling

```typescript
// Canvas mode (recommended for large data)
const renderer = Renderer.init(dom, 'canvas', 'light');

// SVG mode (recommended for interaction)
const renderer = Renderer.init(dom, 'svg', 'light');
```

### Dirty Flag Mechanism
Only redraw elements that need updating:

```typescript
element.markRedraw(); // Mark as needing redraw
element.isDirty();    // Check if needs redraw
```

### Batch Updates
Use `flush()` to render immediately, avoiding multiple redraws:

```typescript
renderer.add(circle1);
renderer.add(circle2);
renderer.add(circle3);
renderer.flush(); // Render all elements at once
```

## 2. Memory Optimization

### Object Pool Reuse
```typescript
import { ObjectPool } from '@hudx/core';

const pool = new ObjectPool(
  () => new Circle({ shape: { cx: 0, cy: 0, r: 0 } }),
  (circle) => circle.attr('shape', { cx: 0, cy: 0, r: 0 })
);

const circle = pool.acquire();
// Use...
pool.release(circle);
```

### Timely Resource Release
```typescript
renderer.dispose(); // Release all resources
element.remove();   // Remove element
```

## 3. Data Processing Optimization

### Data Sampling
Sample large datasets:

```typescript
function sampleData(data: number[], sampleSize: number): number[] {
  const step = Math.ceil(data.length / sampleSize);
  return data.filter((_, i) => i % step === 0);
}
```

### Virtual Scrolling
Only render elements in visible area.

## 4. Animation Optimization

### Use requestAnimationFrame
Animation system has built-in optimization, automatically uses RAF:

```typescript
const animation = new Animation(
  target,
  'cx',
  500,
  1000,
  0,
  Easing.cubicOut
);
animation.start();
```

### Avoid Over-Animation
- Limit number of simultaneous animations
- Use reasonable animation duration (200-500ms)

## 5. Event Handling Optimization

### Event Delegation
Use event bubbling to reduce listener count:

```typescript
renderer.on('click', (event) => {
  const target = event.target;
  // Handle click event
});
```

### Debounce and Throttle
```typescript
function debounce(fn: Function, delay: number) {
  let timer: any;
  return function(...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

## 6. Performance Monitoring

### Use Performance API
```typescript
const start = performance.now();
// Execute operation
const end = performance.now();
console.log(`Time: ${end - start}ms`);
```

### Chrome DevTools
- Performance tab: Record and analyze performance
- Rendering tab: View redraw information
- Memory tab: Check for memory leaks

## 7. Best Practices

1. **Choose appropriate rendering mode**
   - Large datasets → Canvas
   - High interactivity → SVG

2. **Use animations wisely**
   - Avoid running too many animations simultaneously
   - Use GPU-accelerated properties (transform)

3. **Clean up resources promptly**
   - Call `dispose()` when component unmounts
   - Remove unnecessary event listeners

4. **Preprocess data**
   - Sample large datasets
   - Pre-compute complex geometric calculations

5. **Monitor and optimize**
   - Regularly analyze with DevTools
   - Monitor frame rate (FPS)
   - Track memory usage

## Performance Benchmarks

| Scenario | Canvas | SVG |
|----------|--------|-----|
| 1000 elements | ~50ms | ~200ms |
| 10000 elements | ~500ms | Not recommended |
| Animation 60fps | Supported | Supported |
| Interactive response | Requires event handling | Native support |
