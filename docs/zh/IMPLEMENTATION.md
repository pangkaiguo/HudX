# HudX 实现文档

本文档详细说明 HudX 的实现逻辑和设计思路。

## 架构设计

### 整体架构

HudX 采用分层架构，分为两个主要包：

1. **@HudX/core**: 核心渲染引擎，类似 hrender，支持 Canvas 和 SVG 两种渲染模式
2. **@HudX/charts**: 图表库，类似 echarts

### MVC 模式

核心渲染引擎采用 MVC 模式：

```
┌─────────────┐
│   Renderer  │  ← 主控制器
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼──┐ ┌─▼───┐ ┌────────┐
│Storage│ │Painter│ │Handler │
│ (Model)│ │ (View) │ │(Controller)│
└───────┘ └──────┘ └────────┘
```

- **Model (Storage)**: 管理图形元素的存储和层次关系
- **View (Painter)**: 负责绘制（支持 Canvas 和 SVG）
- **Controller (Handler)**: 处理用户交互

## 核心实现

### 1. Renderer 类

Renderer 是主渲染引擎，负责协调各个模块：

```typescript
class Renderer {
  private _storage: Storage;    // 元素存储
  private _painter: IPainter;   // 绘制器（Canvas 或 SVG）
  private _handler: Handler;    // 事件处理器
  private _root: Group;         // 根组
  private _renderMode: RenderMode; // 渲染模式
  private _theme: Theme;         // 主题
  private _locale: Locale;      // 语言
}
```

**主要职责**:

- 初始化各个模块
- 管理元素的生命周期
- 协调渲染和事件处理
- 管理主题和语言

### 2. Element 基类

所有图形元素都继承自 Element：

```typescript
class Element extends Eventful {
  id: string;                    // 唯一标识
  zlevel: number;                // 层级
  z: number;                      // 同层级内的顺序
  style: Style;                  // 样式
  shape: Record<string, any>;    // 形状属性
  transform: Transform;          // 变换
}
```

**关键方法**:

- `render(ctx)`: 渲染元素（子类实现）
- `getBoundingRect()`: 获取边界矩形
- `contain(x, y)`: 判断点是否在元素内
- `markRedraw()`: 标记需要重绘

### 3. Storage 类

Storage 管理所有图形元素：

```typescript
class Storage {
  private _roots: Group[];              // 根组列表
  private _elements: Map<string, Element>; // 元素映射
}
```

**功能**:

- 维护元素树结构
- 快速查找元素（通过 ID）
- 按 zlevel 和 z 排序元素

### 4. Painter 类

Painter 负责 Canvas 绘制：

```typescript
class Painter {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _dirty: boolean;
}
```

**渲染流程**:

1. 检查是否需要重绘（dirty flag）
2. 清空画布
3. 从 Storage 获取所有元素
4. 按 zlevel 和 z 排序
5. 遍历绘制每个元素

**性能优化**:

- 使用 `requestAnimationFrame` 批量更新
- 只重绘标记为 dirty 的元素
- 支持高 DPI 屏幕（devicePixelRatio）

### 5. Handler 类

Handler 处理用户交互：

```typescript
class Handler {
  private _painter: Painter;
  private _storage: Storage;
  private _hovered: Element | null;
  private _dragging: Element | null;
}
```

**事件处理流程**:

1. 监听 Canvas 原生事件
2. 转换坐标到画布坐标系
3. 查找目标元素（从后往前遍历）
4. 触发元素事件

### 6. Group 类

Group 是容器元素，可以包含子元素：

```typescript
class Group extends Element {
  private _children: Element[];
}
```

**功能**:

- 管理子元素
- 支持嵌套结构
- 计算组合边界矩形
- 支持遍历子元素

## 图形元素实现

### Shape 基类模式

所有图形元素都遵循相同的模式：

```typescript
class ShapeElement extends Element {
  shape: ShapeType;  // 形状属性

  getBoundingRect(): BoundingRect {
    // 计算边界矩形
  }

  contain(x: number, y: number): boolean {
    // 点是否在形状内
  }

  render(ctx: CanvasRenderingContext2D): void {
    // 绘制形状
  }
}
```

### 具体实现示例

#### Circle（圆形）

```typescript
class Circle extends Element {
  shape: { cx: number; cy: number; r: number };

  getBoundingRect() {
    return {
      x: this.shape.cx - this.shape.r,
      y: this.shape.cy - this.shape.r,
      width: this.shape.r * 2,
      height: this.shape.r * 2
    };
  }

  contain(x, y) {
    const dx = x - this.shape.cx;
    const dy = y - this.shape.cy;
    return dx * dx + dy * dy <= this.shape.r * this.shape.r;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.shape.cx, this.shape.cy, this.shape.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
```

#### Polyline（折线）

```typescript
class Polyline extends Element {
  shape: { points: Point[] };

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.shape.points[0].x, this.shape.points[0].y);
    for (let i = 1; i < this.shape.points.length; i++) {
      ctx.lineTo(this.shape.points[i].x, this.shape.points[i].y);
    }
    ctx.stroke();
  }
}
```

## 图表实现

### Chart 基类

所有图表都继承自 Chart：

```typescript
class Chart {
  protected _renderer: Renderer;
  protected _option: ChartOption;
  protected _root: Group;

  protected _render(): void {
    // 子类实现
  }
}
```

### 坐标系统

使用 Scale 函数处理坐标转换：

```typescript
// 线性缩放
function createLinearScale(domain: number[], range: number[]): Scale {
  const k = (range[1] - range[0]) / (domain[1] - domain[0]);
  return (value: number) => range[0] + (value - domain[0]) * k;
}

// 序数缩放（分类）
function createOrdinalScale(domain: any[], range: number[]): Scale {
  const step = (range[1] - range[0]) / (domain.length - 1);
  return (value: any) => {
    const index = domain.indexOf(value);
    return range[0] + index * step;
  };
}
```

### 图表渲染流程

1. **解析配置**: 从 option 中提取配置
2. **计算布局**: 计算绘图区域（grid）
3. **计算坐标轴**: 计算数据域和缩放函数
4. **渲染数据**: 根据 series 渲染数据
5. **渲染坐标轴**: 绘制坐标轴和标签
6. **渲染图例**: 绘制图例（如果启用）

### LineChart 实现示例

```typescript
class LineChart extends Chart {
  protected _render() {
    // 1. 计算绘图区域
    const plotWidth = this._width - gridLeft - gridRight;
    const plotHeight = this._height - gridTop - gridBottom;

    // 2. 计算坐标轴
    const xDomain = calculateDomain(xAxis, data, true);
    const yDomain = calculateDomain(yAxis, data, false);
    const xScale = createLinearScale(xDomain, [plotX, plotX + plotWidth]);
    const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);

    // 3. 转换数据点
    const points = data.map(item => ({
      x: xScale(item.name),
      y: yScale(item.value)
    }));

    // 4. 创建折线
    const polyline = new Polyline({
      shape: { points },
      style: { stroke: color, lineWidth: 2 }
    });
    this._root.add(polyline);

    // 5. 创建数据点
    points.forEach(point => {
      const circle = new Circle({
        shape: { cx: point.x, cy: point.y, r: 4 },
        style: { fill: color }
      });
      this._root.add(circle);
    });
  }
}
```

## 动画系统

### Animation 类

```typescript
class Animation {
  private _target: any;
  private _property: string;
  private _startValue: number;
  private _endValue: number;
  private _duration: number;
  private _easing: EasingFunction;
}
```

**动画流程**:

1. 记录起始值和目标值
2. 使用 `requestAnimationFrame` 更新
3. 计算进度（0-1）
4. 应用缓动函数
5. 插值计算当前值
6. 更新目标对象属性

### 缓动函数

```typescript
// 线性
linear: (t) => t

// 二次缓动
quadraticOut: (t) => t * (2 - t)

// 三次缓动
cubicOut: (t) => {
  t -= 1;
  return t * t * t + 1;
}
```

## 性能优化

### 1. 脏标记机制

元素使用 dirty flag 标记是否需要重绘：

```typescript
class Element {
  private _dirty: boolean = true;

  markRedraw() {
    this._dirty = true;
    this.trigger('dirty');
  }

  clearDirty() {
    this._dirty = false;
  }
}
```

### 2. 批量更新

使用 `requestAnimationFrame` 批量处理更新：

```typescript
class Painter {
  private _requestPaint() {
    if (this._animationFrameId !== undefined) {
      return; // 已调度
    }
    this._animationFrameId = requestAnimationFrame(() => {
      this._animationFrameId = undefined;
      this.paint();
    });
  }
}
```

### 3. 对象池

复用对象减少内存分配：

```typescript
class ObjectPool<T> {
  private _pool: T[] = [];

  acquire(): T {
    return this._pool.pop() || this._createFn();
  }

  release(obj: T): void {
    if (this._pool.length < this._maxSize) {
      this._resetFn(obj);
      this._pool.push(obj);
    }
  }
}
```

### 4. 高 DPI 支持

自动适配高 DPI 屏幕：

```typescript
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
ctx.scale(dpr, dpr);
```

## React 集成

### HChart 组件

```typescript
const HChart: React.FC<HChartProps> = ({ option, ... }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    // 创建图表实例
    chartRef.current = new ChartClass(containerRef.current, option);
    
    return () => {
      chartRef.current?.dispose();
    };
  }, [chartType]);

  useEffect(() => {
    // 更新配置
    chartRef.current?.setOption(option, notMerge);
  }, [option]);

  return <div ref={containerRef} />;
};
```

**性能优化**:

- 使用 `useRef` 避免重复创建实例
- 使用 `useMemo` 缓存计算结果
- 支持 `lazyUpdate` 延迟更新

## 事件系统

### 事件冒泡

事件从目标元素向上冒泡：

```typescript
class Handler {
  private _findHoveredElement(x, y): Element | null {
    const elements = this._storage.getElementsList();
    // 从后往前遍历（顶层到底层）
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].contain(x, y)) {
        return elements[i];
      }
    }
    return null;
  }
}
```

### 事件数据

```typescript
interface EventData {
  type: string;
  target?: Element;
  topTarget?: Element;
  rX: number;       // 画布坐标 X
  rY: number;       // 画布坐标 Y
  offsetX: number;  // 相对坐标 X
  offsetY: number;  // 相对坐标 Y
}
```

## 扩展指南

### 添加新图形元素

1. 创建 Shape 类继承 Element
2. 实现 `getBoundingRect()`, `contain()`, `render()` 方法
3. 在 `packages/core/src/index.ts` 导出

### 添加新图表类型

1. 创建 Chart 类继承 Chart
2. 实现 `_render()` 方法
3. 在 `packages/charts/src/index.ts` 导出
4. 在 `HChart` 组件中添加类型判断

## 总结

HudX 的设计参考了 zRender 和 echarts 的优秀实践：

- **模块化**: 核心引擎和图表库分离
- **可扩展**: 易于添加新元素和图表类型
- **高性能**: 使用多种优化技术
- **易用性**: 提供 React 组件和类似 echarts 的 API

通过合理的架构设计和性能优化，HudX 能够处理大量数据并提供流畅的用户体验。
