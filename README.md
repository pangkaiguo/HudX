# HudX - 高性能图表库

HudX 是一个基于 React 和 TypeScript 的高性能图表库，参考了 [hrender](https://github.com/ecomfe/zrender) 的底层渲染逻辑和 [ECharts](https://github.com/apache/echarts) 的接口设计，支持 Canvas 和 SVG 两种渲染模式。

## 特性

- 🚀 **高性能**: 支持 Canvas 和 SVG 两种渲染模式，支持大量数据点
- 🎨 **丰富的图表类型**: 支持折线图、柱状图、饼图、散点图等
- ⚛️ **React 集成**: 提供 React 组件，易于使用
- 📦 **模块化设计**: 核心渲染引擎和图表库分离
- 🎯 **TypeScript**: 完整的 TypeScript 类型支持
- 🎬 **动画支持**: 内置动画系统，支持多种缓动函数
- 🔧 **可扩展**: 易于扩展新的图表类型和图形元素
- 🖼️ **双渲染模式**: 支持 Canvas（高性能）和 SVG（可缩放矢量图）两种渲染方式
- 🌓 **主题支持**: 支持 Light 和 Dark 两种主题，可自定义主题
- 🌍 **多语言支持**: 支持 10+ 种语言，可自定义语言包

## 项目结构

```
HudX/
├── packages/
│   ├── core/          # 核心渲染引擎（类似 hrender）
│   │   ├── src/
│   │   │   ├── HRender.ts      # 主渲染引擎类
│   │   │   ├── Element.ts      # 图形元素基类
│   │   │   ├── Group.ts        # 组容器
│   │   │   ├── Storage.ts      # 元素存储管理
│   │   │   ├── Painter.ts      # 画布绘制器
│   │   │   ├── Handler.ts      # 事件处理器
│   │   │   ├── shape/          # 图形元素
│   │   │   ├── animation/      # 动画系统
│   │   │   └── util/           # 工具类
│   │   └── package.json
│   └── charts/        # 图表库（类似 echarts）
│       ├── src/
│       │   ├── Chart.ts        # 图表基类
│       │   ├── chart/          # 具体图表实现
│       │   ├── react/          # React 组件
│       │   └── util/           # 工具函数
│       └── package.json
└── package.json
```

## 快速开始

### 安装

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 使用示例

#### React 组件方式

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
      renderMode="canvas" // 或 "svg"
      theme="dark"        // 或 "light"
      locale="zh-CN"      // 或 "en", "ja", "ko" 等
      onEvents={{
        click: (event) => {
          console.log('Chart clicked:', event);
        }
      }}
    />
  );
}
```

#### 直接使用核心 API

```typescript
import { HRender, Circle, Rect } from '@hudx/core';

// Canvas 模式（默认，高性能）
const renderer = HRender.init('#container', 'canvas', 'light', 'en');

// SVG 模式（可缩放矢量图）
const rendererSVG = HRender.init('#container', 'svg', 'dark', 'zh-CN');

// 创建圆形
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

// 创建矩形
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

## 核心架构

### 1. 核心渲染引擎 (@hudx/core)

核心渲染引擎参考了 hrender 的设计，采用 MVC 架构，支持 Canvas 和 SVG 两种渲染模式：

- **Model (Storage)**: 管理图形元素的存储和层次关系
- **View (Painter)**: 负责 Canvas 绘制
- **Controller (Handler)**: 处理用户交互事件

#### 主要类

- **HRender**: 主渲染引擎，管理整个渲染流程，支持 Canvas 和 SVG 两种模式，支持主题和多语言
- **Element**: 所有图形元素的基类
- **Group**: 容器元素，可以包含子元素
- **Storage**: 元素存储管理器，维护元素树
- **Painter**: 绘制器接口，支持 CanvasPainter 和 SVGPainter 两种实现
- **Handler**: 事件处理器，处理鼠标、触摸等交互

#### 图形元素 (Shape)

- `Circle`: 圆形
- `Rect`: 矩形
- `Line`: 直线
- `Polyline`: 折线
- `Polygon`: 多边形
- `Arc`: 圆弧
- `BezierCurve`: 贝塞尔曲线
- `Path`: SVG 路径
- `Text`: 文本

### 2. 图表库 (@hudx/charts)

图表库参考了 ECharts 的接口设计，提供类似的使用体验。

#### 图表类型

- **LineChart**: 折线图
- **BarChart**: 柱状图
- **PieChart**: 饼图
- **ScatterChart**: 散点图

#### 配置选项

图表配置选项与 ECharts 类似：

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

## 性能优化

### 1. 对象池 (Object Pool)

使用对象池复用图形元素，减少内存分配和垃圾回收：

```typescript
import { ObjectPool } from '@hudx/core';

const pool = new ObjectPool(
  () => new Circle({ shape: { cx: 0, cy: 0, r: 0 } }),
  (circle) => {
    // 重置对象状态
    circle.attr('shape', { cx: 0, cy: 0, r: 0 });
  }
);

// 获取对象
const circle = pool.acquire();

// 使用后归还
pool.release(circle);
```

### 2. 批量更新 (Batch Update)

使用 `requestAnimationFrame` 批量处理更新，减少重绘次数：

```typescript
import { BatchUpdater } from '@hudx/core';

const updater = new BatchUpdater();

// 批量调度更新
updater.schedule(() => {
  // 更新操作
});
```

### 3. 脏标记 (Dirty Flag)

元素使用脏标记机制，只重绘需要更新的元素：

```typescript
element.markRedraw(); // 标记为需要重绘
```

### 4. 设备像素比 (Device Pixel Ratio)

自动适配高 DPI 屏幕，确保清晰渲染：

```typescript
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
```

### 5. React 性能优化

- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存事件处理函数
- 使用 `useRef` 避免不必要的重新创建
- 支持 `lazyUpdate` 延迟更新选项

## 动画系统

### 使用动画

```typescript
import { Animation, Easing } from '@hudx/core';

const animation = new Animation(
  element,
  'transform.x',
  200, // 目标值
  1000, // 持续时间（毫秒）
  0, // 延迟
  Easing.cubicOut, // 缓动函数
  (target, percent) => {
    // 更新回调
    target.markRedraw();
  },
  () => {
    // 完成回调
    console.log('Animation complete');
  }
);

animation.start();
```

### 缓动函数

- `linear`: 线性
- `quadraticIn/Out/InOut`: 二次缓动
- `cubicIn/Out/InOut`: 三次缓动
- `elasticIn/Out`: 弹性缓动

## 事件系统

### 监听事件

```typescript
// 元素事件
element.on('click', (event) => {
  console.log('Element clicked:', event);
});

// 图表事件
chart.on('click', (event) => {
  console.log('Chart clicked:', event);
});
```

### 支持的事件类型

- `click`: 点击
- `dblclick`: 双击
- `mousedown`: 鼠标按下
- `mouseup`: 鼠标释放
- `mousemove`: 鼠标移动
- `mouseover`: 鼠标进入
- `mouseout`: 鼠标离开
- `touchstart`: 触摸开始
- `touchmove`: 触摸移动
- `touchend`: 触摸结束
- `drag`: 拖拽
- `dragend`: 拖拽结束

## 开发指南

### 扩展新的图形元素

```typescript
import Element from '@hudx/core/Element';
import { ElementOption, BoundingRect } from '@hudx/core/types';

export interface CustomShape {
  // 定义形状属性
}

export default class CustomElement extends Element {
  shape: CustomShape;

  constructor(opts: ElementOption & { shape: CustomShape }) {
    super(opts);
    this.shape = opts.shape;
  }

  getBoundingRect(): BoundingRect {
    // 计算边界矩形
  }

  contain(x: number, y: number): boolean {
    // 判断点是否在元素内
  }

  render(ctx: CanvasRenderingContext2D): void {
    // 绘制元素
  }
}
```

### 扩展新的图表类型

```typescript
import Chart from '../Chart';
import { ChartOption } from '../types';

export default class CustomChart extends Chart {
  protected _render(): void {
    super._render();
    
    const option = this._option;
    const series = option.series || [];
    
    // 实现图表渲染逻辑
  }
}
```

## API 文档

详细的 API 文档请参考：

- [Core API](./packages/core/README.md)
- [Charts API](./packages/charts/README.md)

## 实现细节

### 渲染流程

1. **初始化**: 创建 HRender 实例，初始化 Storage、Painter、Handler
2. **添加元素**: 通过 `add()` 方法添加图形元素到根组
3. **存储管理**: Storage 维护元素树结构，支持快速查找
4. **绘制**: Painter 遍历元素树，按 zlevel 和 z 排序后绘制
5. **事件处理**: Handler 监听 Canvas 事件，转换为元素事件

### 坐标系统

- 使用线性缩放 (Linear Scale) 处理数值轴
- 使用序数缩放 (Ordinal Scale) 处理分类轴
- 支持自动计算数据域 (Domain)

### 变换系统

支持以下变换：

- `x`, `y`: 平移
- `scaleX`, `scaleY`: 缩放
- `rotation`: 旋转
- `originX`, `originY`: 变换原点

## 性能建议

1. **大量数据**: 使用数据采样或虚拟滚动
2. **频繁更新**: 使用批量更新和脏标记
3. **内存管理**: 及时释放不需要的元素
4. **动画**: 合理使用动画，避免过度动画影响性能

## 主题和多语言

HudX 支持 Light 和 Dark 两种主题，以及多语言国际化。

### 主题

```typescript
import { HRender } from '@hudx/core';

// 使用深色主题
const renderer = HRender.init('#container', 'canvas', 'dark');

// 切换主题
renderer.setTheme('light');
```

### 多语言

```typescript
import { HRender } from '@hudx/core';

// 使用中文
const renderer = HRender.init('#container', 'canvas', 'light', 'zh-CN');

// 切换语言
renderer.setLocale('en');

// 获取翻译文本
const text = renderer.t('chart.title', 'Chart');
```

详细文档请参考 [主题和多语言支持](./docs/THEME_AND_I18N.md)

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
