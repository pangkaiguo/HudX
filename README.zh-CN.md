# HudX - 高性能图表库

[English](./README.md) | 简体中文

HudX 是一个基于 React 和 TypeScript 构建的高性能图表库。它的底层渲染逻辑受 [ZRender](https://github.com/ecomfe/zrender) 启发，API 设计参考 [ECharts](https://github.com/apache/echarts)，支持 Canvas 和 SVG 双渲染模式。

## 特性

- 🚀 **高性能**: 支持 Canvas 和 SVG 渲染模式，高效处理大数据集
- 🎨 **丰富的图表类型**: 折线图、柱状图、饼图、散点图和热力图
- ⚛️ **React 集成**: 无缝的 React 组件集成
- 📦 **模块化设计**: 核心渲染引擎与图表库解耦
- 🎯 **TypeScript**: 完整的 TypeScript 支持和严格类型检查
- 🎬 **完整的动画系统**: 20+ 种缓动函数（线性、二次、三次、弹性、回弹等）
- 🔧 **可扩展架构**: 易于添加新的图表类型和图形元素
- 🖼️ **双渲染模式**: Canvas（高性能）和 SVG（矢量图形）
- 🌓 **主题支持**: 亮色和暗色主题，支持自定义
- 🌍 **国际化**: 支持 10+ 种语言，可自定义语言包
- 💬 **交互组件**: Tooltip、Legend 和完整的事件系统

## 项目结构

```
HudX/
├── packages/
│   ├── core/          # 核心渲染引擎（类似 ZRender）
│   │   ├── src/
│   │   │   ├── Renderer.ts      # 主渲染引擎类
│   │   │   ├── ChartElement.ts     # 图形元素基类
│   │   │   ├── Group.ts         # 分组容器
│   │   │   ├── Storage.ts       # 元素存储管理
│   │   │   ├── Handler.ts       # 事件处理器
│   │   │   ├── shape/           # 图形元素（11 种类型）
│   │   │   ├── animation/       # 动画系统
│   │   │   ├── component/       # 组件（Tooltip、Legend）
│   │   │   ├── painter/         # 绘制器（Canvas、SVG）
│   │   │   ├── theme/           # 主题管理
│   │   │   ├── i18n/            # 国际化
│   │   │   └── util/            # 工具函数
│   │   └── package.json
│   └── charts/        # 图表库（类似 ECharts）
│       ├── src/
│       │   ├── Chart.ts         # 图表基类
│       │   ├── chart/           # 图表实现
│       │   ├── react/           # React 组件
│       │   └── util/            # 工具函数
│       └── package.json
├── examples/          # 交互式示例
│   ├── src/
│   │   ├── examples/
│   │   │   ├── BasicLine.tsx
│   │   │   ├── BasicBar.tsx
│   │   │   ├── BasicPie.tsx
│   │   │   ├── AdvancedLineChart.tsx
│   │   │   ├── AdvancedBarChart.tsx
│   │   │   ├── AdvancedPieChart.tsx
│   │   │   ├── Animation.tsx
│   │   │   ├── Interaction.tsx
│   │   │   ├── ThemeSwitch.tsx
│   │   │   ├── PerformanceTest.tsx
│   │   │   └── FullFeatureDemo.tsx
│   └── package.json
└── docs/              # 完整文档（中英文）
    ├── zh/            # 中文文档
    └── en/            # 英文文档
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

### 运行示例

```bash
cd examples
pnpm dev
# 访问 http://localhost:5173
```

## 使用示例

### React 组件

```tsx
import React from 'react';
import { HChart } from '@HudX/charts';

function App() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
    <HChart
      option={option}
      width={800}
      height={400}
      renderMode="canvas"
      theme="dark"
      locale="zh-CN"
      onEvents={{
        click: (event) => {
          console.log('图表被点击:', event);
        }
      }}
    />
  );
}
```

### 核心 API

```typescript
import { Renderer, Circle, Rect, Animation, Easing } from '@HudX/core';

// 初始化渲染器
const renderer = Renderer.init('#container', 'canvas', 'light', 'zh-CN');

// 创建圆形
const circle = new Circle({
  shape: { cx: 100, cy: 100, r: 50 },
  style: { fill: '#ff0000', stroke: '#000000', lineWidth: 2 }
});

renderer.add(circle);

// 创建矩形
const rect = new Rect({
  shape: { x: 200, y: 200, width: 100, height: 100 },
  style: { fill: '#00ff00' }
});

renderer.add(rect);

// 添加动画
const animation = new Animation(
  circle.attr('shape'),
  'r',
  100,
  1000,
  0,
  Easing.cubicOut,
  () => renderer.flush()
);
animation.start();
```

## 核心架构

### 1. 核心渲染引擎 (@HudX/core)

采用 MVC 架构，支持 Canvas 和 SVG 双渲染模式：

- **Model (Storage)**: 管理图形元素存储和层级关系
- **View (Painter)**: 处理 Canvas/SVG 渲染
- **Controller (Handler)**: 处理用户交互事件

#### 主要类

- **Renderer**: 主渲染引擎，管理整个渲染流程，支持 Canvas/SVG、主题和国际化
- **ChartElement**: 所有图形元素的基类
- **Group**: 容器元素，可以包含子元素
- **Storage**: 元素存储管理器，维护元素树
- **Painter**: 绘制器接口（CanvasPainter 和 SVGPainter 实现）
- **Handler**: 事件处理器，处理鼠标、触摸等交互
- **Animation**: 动画系统，支持多种缓动函数
- **Tooltip**: 数据提示框组件
- **Legend**: 图例组件

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
- `Sector`: 扇形
- `Image`: 图片

### 2. 图表库 (@HudX/charts)

参考 ECharts 的 API 设计，提供相似的用户体验。

#### 图表类型

- **LineChart**: 折线图
- **BarChart**: 柱状图
- **PieChart**: 饼图
- **ScatterChart**: 散点图
- **HeatmapChart**: 热力图

#### 配置选项

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

## 交互功能

### 动画系统

支持 20+ 种缓动函数：

```typescript
import { Animation, Easing } from '@HudX/core';

const animation = new Animation(
  target,
  'property',
  endValue,
  1000,           // 持续时间
  0,              // 延迟
  Easing.cubicOut // 缓动函数
);
animation.start();
```

**支持的缓动函数**:

- `linear`: 线性
- `quadraticIn/Out/InOut`: 二次缓动
- `cubicIn/Out/InOut`: 三次缓动
- `quarticIn/Out/InOut`: 四次缓动
- `quinticIn/Out/InOut`: 五次缓动
- `sinusoidalIn/Out/InOut`: 正弦缓动
- `exponentialIn/Out/InOut`: 指数缓动
- `circularIn/Out/InOut`: 圆形缓动
- `elasticIn/Out/InOut`: 弹性缓动
- `backIn/Out/InOut`: 回退缓动
- `bounceIn/Out/InOut`: 回弹缓动

### Tooltip 组件

```typescript
import { Tooltip } from '@HudX/core';

const tooltip = new Tooltip({
  backgroundColor: 'rgba(50, 50, 50, 0.95)',
  textColor: '#fff',
  padding: 12,
  fontSize: 13
});

renderer.add(tooltip);
tooltip.show(x, y, '内容');
tooltip.hide();
```

### Legend 组件

```typescript
import { Legend } from '@HudX/core';

const legend = new Legend({
  x: 20,
  y: 20,
  orient: 'horizontal',
  onSelect: (name, selected) => {
    // 处理选择事件
  }
});

legend.setItems([
  { name: '系列 A', color: '#5470c6' },
  { name: '系列 B', color: '#91cc75' }
]);

renderer.add(legend);
```

### 事件系统

```typescript
// 元素事件
element.on('click', (event) => {
  console.log('元素被点击:', event);
});

// 支持的事件类型
// click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout
// touchstart, touchmove, touchend, drag, dragend
```

## 性能优化

### 1. 脏标记机制

只重绘需要更新的元素：

```typescript
element.markRedraw(); // 标记为需要重绘
```

### 2. 批量更新

```typescript
renderer.add(circle1);
renderer.add(circle2);
renderer.flush(); // 一次性渲染所有元素
```

### 3. 对象池复用

```typescript
import { ObjectPool } from '@HudX/core';

const pool = new ObjectPool(
  () => new Circle({ shape: { cx: 0, cy: 0, r: 0 } }),
  (circle) => circle.attr('shape', { cx: 0, cy: 0, r: 0 })
);

const circle = pool.acquire();
pool.release(circle);
```

### 4. 设备像素比适配

自动适配高 DPI 屏幕，实现清晰渲染。

## 主题和国际化

### 主题

```typescript
const renderer = Renderer.init('#container', 'canvas', 'dark');
renderer.setTheme('light');
```

### 国际化

```typescript
const renderer = Renderer.init('#container', 'canvas', 'light', 'zh-CN');
renderer.setLocale('en');
const text = renderer.t('chart.title', '图表');
```

**支持的语言**: en, zh, zh-CN, zh-TW

## 渲染模式

### Canvas 模式（默认）

- 高性能，适合大数据集
- 最适合实时更新和动画
- 更低的内存占用

### SVG 模式

- 矢量图形，无限缩放不失真
- 适合打印和导出
- 更好的 CSS 支持
- 大数据集性能较低

## 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 支持 Canvas/SVG 的移动浏览器

## 文档

- [中文文档](./docs/zh/SUMMARY.md)
- [English Documentation](./docs/en/SUMMARY.md)

## 许可证

MIT

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 致谢

- 灵感来自 [ZRender](https://github.com/ecomfe/zrender) - ECharts 的渲染引擎
- 灵感来自 [ECharts](https://github.com/apache/echarts) - 可视化图表库
