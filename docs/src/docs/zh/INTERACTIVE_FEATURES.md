# HudX 交互功能

## 概述

HudX Charts 提供了一套丰富的交互功能，包括动画、提示框（Tooltip）、图例（Legend）和高级事件处理，旨在对标 ECharts 的能力。

## 1. 高亮与悬停效果 (Emphasis)

HudX 支持高性能的悬停效果，并带有可配置的动画。

### 缩放动画 (`emphasis.scale`)

你可以为图表（如饼图、柱状图）启用悬停时的缩放动画。

```typescript
series: [{
  type: 'pie',
  data: [...],
  emphasis: {
    scale: true,
    scaleSize: 1.1, // 放大至 110%
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  }
}]
```

### 样式过渡

颜色和透明度的过渡会自动使用 `lerp`（线性插值）处理，以提供平滑的视觉反馈。

## 2. 事件系统

### EventHelper

`EventHelper` 工具简化了绑定悬停交互并处理清理工作的过程。

```typescript
import { EventHelper } from "../util/EventHelper";

EventHelper.bindHoverEvents(
  element,
  (evt) => {
    // onMouseOver: 放大动画，显示 Tooltip
  },
  (evt) => {
    // onMouseOut: 缩小动画，隐藏 Tooltip
  },
);
```

### 支持的事件

- `click`, `dblclick`
- `mousedown`, `mousemove`, `mouseup`
- `mouseover`, `mouseout`
- `touchstart`, `touchmove`, `touchend`
- `drag`, `dragend`

## 3. 动画系统

核心动画引擎 (`Animator`) 支持复杂的过渡效果。

```typescript
import { Animation, Easing } from "hudx-render";

const anim = new Animation(target, "x", 100, 500, 0, Easing.cubicOut);
anim.start();
```

## 4. 组件

### Tooltip (提示框)

可配置的提示框，支持 HTML 内容。

```typescript
tooltip: {
  show: true,
  formatter: '{b}: {c} ({d}%)'
}
```

### Legend (图例)

交互式图例，用于切换系列的可见性。

```typescript
legend: {
  data: ['A', 'B'],
  orient: 'horizontal',
  bottom: 0
}
```
