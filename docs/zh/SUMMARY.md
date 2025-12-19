# HudX 文档索引

## 概述

HudX 是一个高性能图表库，兼容 ECharts API 设计，拥有强大的底层渲染引擎（类似 ZRender）。

## 文档目录

### 快速开始

- [快速开始](./QUICK_START_INTERACTIVE.md)
- [示例](./EXAMPLES.md)

### 核心概念

- [实现细节](./IMPLEMENTATION.md)
- [渲染模式 (Canvas/SVG)](./RENDERING_MODES.md)
- [主题与国际化](./THEME_AND_I18N.md)

### 进阶主题

- [交互特性](./INTERACTIVE_FEATURES.md)
- [性能优化](./PERFORMANCE_OPTIMIZATION.md)

## 实现状态 (v1.0.0)

### ✅ 核心引擎 (`HudX/core`)

- **双模式渲染**: Canvas 和 SVG 绘制器已完全实现。
- **事件系统**: `EventHelper` 实现统一事件绑定，支持冒泡。
- **动画**: `Animator` 类，支持插值和缓动函数。
- **组件**: `Tooltip`, `Legend`。
- **工具**: 矩阵运算 (变换/缩放/旋转), 颜色处理 (插值/亮度调整)。

### ✅ 图表库 (`HudX/charts`)

- **图表类型**: 柱状图, 折线图, 饼图, 散点图, 热力图。
- **交互**:
  - 悬停效果 (`emphasis` 样式)。
  - 缩放动画 (`emphasis.scale`)。
  - Tooltip 集成。
  - 图例筛选。
- **React 支持**: `HChart` 组件。

### ✅ 最近更新

- 为饼图/柱状图添加了 `emphasis.scale` 支持。
- 增强了 `EventHelper` 以优化事件逻辑。
- 改进了 `Scale` 工具，增加了与 ECharts 兼容的别名 (`getPixel`, `getValue`)。
- 添加了颜色插值 (`lerp`) 以实现平滑过渡。

## 性能指标

- **动画**: 标准场景下 60 FPS。
- **加载时间**: 高级图表 < 200ms。
- **内存**: 优化的对象池和脏矩形渲染。
