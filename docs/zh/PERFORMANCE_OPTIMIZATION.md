# HudX 性能优化指南

## 1. 渲染优化

### Canvas vs SVG 选择

- **Canvas**: 适合大量数据（1000+ 元素），性能更好
- **SVG**: 适合交互性强的场景，支持 CSS 样式

```typescript
// Canvas 模式（推荐用于大数据量）
const renderer = Renderer.init(dom, "canvas", "light");

// SVG 模式（推荐用于交互）
const renderer = Renderer.init(dom, "svg", "light");
```

### 脏标记机制

只重绘需要更新的元素：

```typescript
element.markRedraw(); // 标记为需要重绘
element.isDirty(); // 检查是否需要重绘
```

### 批量更新

使用 `flush()` 立即渲染，避免多次重绘：

```typescript
renderer.add(circle1);
renderer.add(circle2);
renderer.add(circle3);
renderer.flush(); // 一次性渲染所有元素
```

## 2. 内存优化

### 对象池复用

```typescript
import { ObjectPool } from "HudX/core";

const pool = new ObjectPool(
  () => new Circle({ shape: { cx: 0, cy: 0, r: 0 } }),
  (circle) => circle.attr("shape", { cx: 0, cy: 0, r: 0 }),
);

const circle = pool.acquire();
// 使用...
pool.release(circle);
```

### 及时释放资源

```typescript
renderer.dispose(); // 释放所有资源
element.remove(); // 移除元素
```

## 3. 数据处理优化

### 数据采样

处理大量数据时进行采样：

```typescript
function sampleData(data: number[], sampleSize: number): number[] {
  const step = Math.ceil(data.length / sampleSize);
  return data.filter((_, i) => i % step === 0);
}
```

### 虚拟滚动

只渲染可见区域的元素。

## 4. 动画优化

### 使用 requestAnimationFrame

动画系统已内置优化，自动使用 RAF：

```typescript
const animation = new Animation(target, "cx", 500, 1000, 0, Easing.cubicOut);
animation.start();
```

### 避免过度动画

- 限制同时运行的动画数量
- 使用合理的动画时长（200-500ms）

## 5. 事件处理优化

### 事件委托

使用事件冒泡减少监听器数量：

```typescript
renderer.on("click", (event) => {
  const target = event.target;
  // 处理点击事件
});
```

### 防抖和节流

```typescript
function debounce(fn: Function, delay: number) {
  let timer: any;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

## 6. 性能监测

### 使用 Performance API

```typescript
const start = performance.now();
// 执行操作
const end = performance.now();
console.log(`耗时: ${end - start}ms`);
```

### Chrome DevTools

- Performance 标签：记录和分析性能
- Rendering 标签：查看重绘情况
- Memory 标签：检查内存泄漏

## 7. 最佳实践

1. **选择合适的渲染模式**
   - 大数据量 → Canvas
   - 高交互性 → SVG

2. **合理使用动画**
   - 避免同时运行过多动画
   - 使用 GPU 加速的属性（transform）

3. **及时清理资源**
   - 组件卸载时调用 `dispose()`
   - 移除不需要的事件监听

4. **数据预处理**
   - 采样大数据集
   - 预计算复杂的几何运算

5. **监测和优化**
   - 定期使用 DevTools 分析
   - 关注帧率（FPS）
   - 监测内存占用

## 性能基准

| 场景       | Canvas       | SVG      |
| ---------- | ------------ | -------- |
| 1000 元素  | ~50ms        | ~200ms   |
| 10000 元素 | ~500ms       | 不推荐   |
| 动画 60fps | 支持         | 支持     |
| 交互响应   | 需要事件处理 | 原生支持 |
