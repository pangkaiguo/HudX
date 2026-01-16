# HudX API 参考文档

本文档详细介绍了 HudX 的核心 API 和图表组件 API。

## 目录

- [核心引擎 (`hux-core`)](#核心引擎-hudxcore)
  - [渲染器 (`Renderer`)](#renderer)
  - [图形元素 (`ChartElement`)](#chartelement)
  - [基础图形 (`Shape`)](#shape)
  - [动画 (`Animation`)](#animation)
  - [工具 (`Utils`)](#utils)
- [图表库 (`hux-charts`)](#图表库-hudxcharts)
  - [图表基类 (`Chart`)](#chart)
  - [具体图表 (`LineChart`, `BarChart`, ...)](#具体图表)
  - [React 组件 (`HChart`)](#hchart)
  - [配置项 (`ChartOption`)](#chartoption)

---

## 核心引擎 (`hux-core`)

核心引擎提供了底层的渲染能力，支持 Canvas 和 SVG 双模式。

### Renderer

渲染器入口，负责管理 Painter 和 Storage。

```typescript
import { Renderer } from 'hux-core';

// 初始化渲染器
const renderer = Renderer.init(
  dom: HTMLElement,           // 容器 DOM
  renderMode?: 'canvas' | 'svg', // 渲染模式，默认 'canvas'
  theme?: string | object,    // 主题，默认 'light'
  locale?: string             // 语言，默认 'en'
);

// 添加图形
renderer.add(element: ChartElement);

// 移除图形
renderer.remove(element: ChartElement);

// 调整大小
renderer.resize(width?: number, height?: number);

// 刷新渲染（将变更绘制到屏幕）
renderer.flush();

// 销毁
renderer.dispose();
```

### ChartElement

所有图形元素的基类。

```typescript
import { ChartElement } from 'hux-core';

const element = new ChartElement({
  zlevel: 0,       // 层级
  z: 0,            // 同层级叠加顺序
  silent: false,   // 是否响应鼠标事件
  invisible: false,// 是否不可见
  cursor: 'default', // 鼠标样式
  style: { ... },  // 样式
  shape: { ... },  // 形状参数
  transform: { ... } // 变换矩阵
});

// 事件监听
element.on('click', (e) => { ... });
element.on('mouseover', (e) => { ... });

// 属性设置
element.attr('style', { fill: 'red' });
```

### Shape

内置的基础图形形状。

- **Circle**: 圆形 `{ cx, cy, r }`
- **Rect**: 矩形 `{ x, y, width, height, r }`
- **Line**: 直线 `{ x1, y1, x2, y2 }`
- **Polyline**: 折线 `{ points: [[x,y], ...] }`
- **Polygon**: 多边形 `{ points: [[x,y], ...] }`
- **Text**: 文本 `{ x, y, text }`
- **Sector**: 扇形 `{ cx, cy, r, r0, startAngle, endAngle }`
- **Image**: 图片 `{ x, y, width, height, image }`
- **Path**: SVG 路径 `{ d: 'M...' }`

### Animation

动画系统支持。

```typescript
import { Animation, Easing } from 'hux-core';

const anim = new Animation(
  target: object,    // 目标对象
  prop: string,      // 属性名
  to: number,        // 目标值
  duration: number,  // 持续时间 (ms)
  delay: number,     // 延迟 (ms)
  easing: string,    // 缓动函数 (如 'cubicOut')
  callback: () => void // 完成回调
);

anim.start();
```

### Utils

实用工具函数。

- `ThemeManager`: 主题管理 `getTheme(name)`, `registerTheme(name, config)`
- `LocaleManager`: 国际化 `t(key, default)`
- `matrix`: 矩阵运算库
- `color`: 颜色处理
- `pattern`: 图案生成 `createDecalPattern`

---

## 图表库 (`hux-charts`)

基于核心引擎构建的高层图表组件，API 设计兼容 ECharts。

### Chart

图表基类，封装了通用的坐标系、图例、提示框和渲染流程。

### 具体图表

- **LineChart**: 折线图
- **BarChart**: 柱状图
- **PieChart**: 饼图
- **DoughnutChart**: 环形图
- **ScatterChart**: 散点图
- **HeatmapChart**: 热力图

### HChart

React 组件封装，推荐在 React 项目中使用。

```tsx
import { HChart } from 'hux-charts';

<HChart
  option={option}           // ECharts 风格配置项
  width={800}               // 宽度 (可选)
  height={600}              // 高度 (可选)
  theme="light"             // 主题
  renderMode="canvas"       // 渲染模式 'canvas' | 'svg'
  onEvents={{ click: ... }} // 事件绑定
/>
```

### ChartOption

配置项接口，主要字段如下：

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
    data?: string[];
    orient?: 'horizontal' | 'vertical';
  };
  grid?: {
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
  };
  xAxis?: {
    type: 'category' | 'value';
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
    // ... 其他系列特定配置
  }>;
  animation?: boolean;
  backgroundColor?: string;
  aria?: {
    enabled: boolean;
    decal?: { show: boolean; ... };
  };
}
```
