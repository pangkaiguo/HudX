# ECharts API 对比分析与实现指南

## 📊 概述

本文档对比 **ECharts 官方 API** 与 **HudX 当前实现**，并提供改进建议，确保 HudX 能与 ECharts 保持 API 一致性。

参考文档：[ECharts 官方 API](https://echarts.apache.org/zh/api.html)

---

## 1️⃣ 全局 echarts 对象 API

### ECharts 提供的方法

| 方法 | 功能 | HudX 当前 | 状态 | 优先级 |
|------|------|---------|------|--------|
| `echarts.init()` | 初始化实例 | ✅ `Renderer.init()` | 已实现 | P0 |
| `echarts.connect()` | 多图表联动 | ❌ | 未实现 | P2 |
| `echarts.disconnect()` | 取消联动 | ❌ | 未实现 | P2 |
| `echarts.dispose()` | 销毁实例 | ✅ `Renderer.dispose()` | 已实现 | P0 |
| `echarts.getInstanceByDom()` | 获取 DOM 对应实例 | ❌ | 未实现 | P1 |
| `echarts.use()` | 按需引入 | ❌ | 不适用（HudX 打包方式不同） | N/A |
| `echarts.registerMap()` | 注册地图 | ❌ | 未实现 | P3 |
| `echarts.getMap()` | 获取地图 | ❌ | 未实现 | P3 |
| `echarts.registerTheme()` | 注册主题 | ✅ `ThemeManager` | 已实现 | P0 |
| `echarts.registerLocale()` | 注册语言 | ✅ `LocaleManager` | 已实现 | P0 |
| `echarts.registerCustomSeries()` | 注册自定义系列 | ❌ | 未实现 | P3 |
| `echarts.setPlatformAPI()` | 设置平台 API | ❌ | 未实现 | P2 |
| `echarts.graphic.*` | 图形工具方法 | ❌ | 未实现 | P2 |

### 建议实现

创建一个 `ECharts` 兼容的全局对象或包装类：

```typescript
// packages/charts/src/index.ts 或新增 packages/charts/src/echarts.ts

export class ECharts {
  static init(dom: HTMLElement | string, theme?: Theme, opts?: {
    devicePixelRatio?: number;
    renderer?: 'canvas' | 'svg';
    width?: number | string;
    height?: number | string;
    locale?: Locale;
  }): Renderer {
    return Renderer.init(dom, opts?.renderer === 'svg' ? 'svg' : 'canvas', theme, opts?.locale);
  }

  static getInstanceByDom(dom: HTMLElement): Renderer | undefined {
    // 维护一个全局 Map 存储 DOM -> Renderer 映射
    return instanceMap.get(dom);
  }

  static dispose(target: Renderer | HTMLElement): void {
    if (target instanceof Renderer) {
      target.dispose();
    } else {
      const instance = instanceMap.get(target);
      instance?.dispose();
    }
  }

  static registerTheme(name: string, theme: ThemeConfig): void {
    ThemeManager.registerTheme(name, theme);
  }

  static registerLocale(locale: Locale, config: any): void {
    LocaleManager.registerLocale(locale, config);
  }

  // TODO: 实现其他方法
  static connect(group: string | any[]): void {
    // 实现多图表联动逻辑
  }

  static disconnect(group: string): void {
    // 实现取消联动逻辑
  }
}
```

---

## 2️⃣ ECharts 实例 API (echartsInstance)

### 核心方法对比

#### A. 初始化与基础方法

| 方法 | 功能 | ECharts 签名 | HudX 当前 | 状态 |
|------|------|-----------|---------|------|
| `init()` | 创建实例 | ✅ | `Renderer.init()` | ✅ 已实现 |
| `setOption()` | 设置配置项 | ✅ | `Chart.setOption()` | ⚠️ 需完善 |
| `getOption()` | 获取配置项 | ✅ | `Chart.getOption()` | ⚠️ 需完善 |
| `dispose()` | 销毁实例 | ✅ | `Renderer.dispose()` | ✅ 已实现 |

#### B. 尺寸与DOM方法

| 方法 | 功能 | HudX 当前 | 状态 |
|------|------|---------|------|
| `getWidth()` | 获取宽度 | ✅ `Renderer.getWidth()` | ✅ 已实现 |
| `getHeight()` | 获取高度 | ✅ `Renderer.getHeight()` | ✅ 已实现 |
| `getDom()` | 获取容器 DOM | ⚠️ 无直接方法 | 需添加 |
| `resize()` | 调整大小 | ✅ `Renderer.resize()` | ✅ 已实现 |

#### C. 主题与国际化

| 方法 | 功能 | ECharts 签名 | HudX 当前 | 状态 |
|------|------|-----------|---------|------|
| `setTheme()` | 设置主题 | `(theme: string \| Object, opts?: {...})` | ✅ `Renderer.setTheme()` | ⚠️ 签名需对齐 |
| `getTheme()` | 获取主题 | ❌ | ✅ `Renderer.getTheme()` | ✅ |

#### D. 事件方法

| 方法 | 功能 | ECharts 签名 | HudX 当前 | 状态 |
|------|------|-----------|---------|------|
| `on()` | 监听事件 | `(eventName, handler, context?)` | ✅ `Renderer.on()` | ✅ 已实现 |
| `off()` | 移除监听 | `(eventName?, handler?)` | ✅ `Renderer.off()` | ✅ 已实现 |
| `dispatchAction()` | 分发事件 | `(payload)` | ❌ | 需实现 |

#### E. 坐标转换方法（需要新增）

| 方法 | 功能 | 优先级 |
|------|------|--------|
| `convertToPixel()` | 逻辑坐标 → 像素坐标 | P2 |
| `convertFromPixel()` | 像素坐标 → 逻辑坐标 | P2 |
| `convertToLayout()` | 坐标 → 布局信息 | P3 |
| `containPixel()` | 判断点是否在某区域 | P2 |

#### F. 数据导出方法（需要新增）

| 方法 | 功能 | 优先级 |
|------|------|--------|
| `getDataURL()` | 导出为图片 URL | P2 |
| `renderToSVGString()` | 渲染为 SVG 字符串 | P2 |
| `appendData()` | 增量渲染数据 | P3 |

#### G. 加载与其他

| 方法 | 功能 | HudX 当前 | 优先级 |
|------|------|---------|--------|
| `showLoading()` | 显示加载动画 | ❌ | P2 |
| `hideLoading()` | 隐藏加载动画 | ❌ | P2 |
| `clear()` | 清空实例 | ⚠️ `Renderer.removeAll()` | P1 |
| `isDisposed()` | 检查是否已销毁 | ❌ | P2 |

---

## 3️⃣ 详细改进建议

### A. setOption() 方法完善

#### ECharts 标准签名

```typescript
setOption(
  option: Object,
  notMerge?: boolean,
  lazyUpdate?: boolean
)
// 或
setOption(
  option: Object,
  opts?: {
    notMerge?: boolean;
    replaceMerge?: string | string[];
    lazyUpdate?: boolean;
    silent?: boolean;
  }
)
```

#### HudX 当前实现

```typescript
setOption(option: ChartOption, notMerge: boolean = false): void {
  // ...
}
```

#### 改进方案

```typescript
setOption(
  option: ChartOption,
  notMerge?: boolean | {
    notMerge?: boolean;
    replaceMerge?: string | string[];
    lazyUpdate?: boolean;
    silent?: boolean;
  },
  lazyUpdate?: boolean
): this {
  // 处理参数重载
  let opts = {
    notMerge: false,
    replaceMerge: undefined,
    lazyUpdate: false,
    silent: false
  };

  if (typeof notMerge === 'object') {
    opts = { ...opts, ...notMerge };
  } else if (typeof notMerge === 'boolean') {
    opts.notMerge = notMerge;
  }

  if (typeof lazyUpdate === 'boolean') {
    opts.lazyUpdate = lazyUpdate;
  }

  // 实现组件合并逻辑
  if (opts.notMerge) {
    this._option = option;
  } else if (opts.replaceMerge) {
    // 实现 replaceMerge 逻辑
    this._option = this._mergeOption(this._option, option, opts.replaceMerge);
  } else {
    // 普通合并
    this._option = this._mergeOption(this._option, option);
  }

  if (!opts.silent) {
    this._renderer.trigger('optionchanged', { option: this._option });
  }

  if (!opts.lazyUpdate) {
    this._render();
  }

  return this;
}
```

### B. 新增方法实现清单

#### 1. getDom() - 获取容器

```typescript
getDom(): HTMLElement {
  return this._renderer.getDom?.() || document.querySelector('[data-renderer-dom]')!;
}
```

#### 2. dispatchAction() - 分发事件

```typescript
dispatchAction(payload: {
  type: string;
  [key: string]: any;
}): this {
  // 根据 action type 触发相应逻辑
  switch (payload.type) {
    case 'click':
    case 'mouseover':
    case 'mouseout':
      // 触发元素事件
      this._renderer.trigger(payload.type, payload);
      break;
    // ... 其他 action 类型
  }
  return this;
}
```

#### 3. showLoading()/hideLoading() - 加载动画

```typescript
showLoading(type?: string, opts?: any): this {
  // 在 renderer 上方创建加载层
  // 实现旋转动画、进度指示等
  return this;
}

hideLoading(): this {
  // 移除加载层
  return this;
}
```

#### 4. getDataURL() - 导出为图片

```typescript
getDataURL(opts?: {
  type?: 'png' | 'jpg' | 'svg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}): string {
  const canvas = this._renderer.getCanvas();
  if (canvas) {
    return canvas.toDataURL(`image/${opts?.type || 'png'}`);
  }
  return '';
}
```

#### 5. convertToPixel() - 坐标转换

```typescript
convertToPixel(finder: any, coord: any[]): number[] {
  // 基于坐标系将逻辑坐标转为像素坐标
  // 需要实现各种坐标系支持
  return [0, 0];
}
```

### C. 组件合并模式实现

ECharts 支持两种合并模式，需在 `setOption()` 中实现：

#### 普通合并 (Normal Merge)

```typescript
// 特点：只增不删，按顺序合并
// 例如：已有 [A, B, C]，新增 [X, Y] → [A', B', C, X, Y]
```

#### 替换合并 (Replace Merge)

```typescript
// 特点：支持删除组件，根据 id/name 匹配
// 例如：已有 [id:m, id:n, id:q]，新增 [id:m:55, id:t:222] → [m:55, t:222, q:77, 333]
```

---

## 4️⃣ 类型定义改进

### 当前问题

HudX 的类型定义需要与 ECharts 对齐，特别是：

```typescript
// types.ts 中需要添加
export interface SetOptionOpts {
  notMerge?: boolean;
  replaceMerge?: string | string[];
  lazyUpdate?: boolean;
  silent?: boolean;
}

export interface ConvertToPixelFinder {
  xAxisIndex?: number;
  xAxisId?: string;
  yAxisIndex?: number;
  yAxisId?: string;
  // ... 其他坐标系选项
}

export interface DataURLOpts {
  type?: 'png' | 'jpg' | 'svg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}

export interface ResizeOpts {
  width?: number | string;
  height?: number | string;
  silent?: boolean;
  animation?: {
    duration?: number;
    easing?: string;
  };
}
```

---

## 5️⃣ 实现优先级表

### P0 - 关键（已实现或必须）

- ✅ `Renderer.init()` - 初始化
- ✅ `Renderer.dispose()` - 销毁
- ✅ `Renderer.setTheme()` - 主题设置
- ✅ `Renderer.getWidth()/getHeight()` - 尺寸获取
- ✅ `Renderer.on()/off()` - 事件系统
- ✅ `Chart.setOption()/getOption()` - 配置管理

### P1 - 重要

- 🔴 `Renderer.getDom()` - 获取容器
- 🔴 `Chart.clear()` - 清空图表
- 🔴 `Renderer.isDisposed()` - 检查销毁状态

### P2 - 中等

- 🔴 `convertToPixel()` - 坐标转换
- 🔴 `convertFromPixel()` - 逆向坐标转换
- 🔴 `containPixel()` - 区域判定
- 🔴 `getDataURL()` - 图片导出
- 🔴 `renderToSVGString()` - SVG 导出
- 🔴 `showLoading()/hideLoading()` - 加载动画
- 🔴 `echarts.getInstanceByDom()` - 实例获取
- 🔴 `echarts.setPlatformAPI()` - 平台 API
- 🔴 `echarts.graphic.*` - 图形工具

### P3 - 可选

- 🔴 `echarts.connect()/disconnect()` - 多图表联动
- 🔴 `echarts.registerMap()` - 地图注册
- 🔴 `echarts.registerCustomSeries()` - 自定义系列
- 🔴 `convertToLayout()` - 布局转换
- 🔴 `appendData()` - 增量渲染

---

## 6️⃣ 迁移指南

### 从 ECharts 迁移到 HudX

```typescript
// ECharts 用法
import * as echarts from 'echarts';
const chart = echarts.init(dom);
chart.setOption(option);
chart.on('click', handler);

// HudX 兼容用法
import { Renderer } from '@hudx/core';
const chart = Renderer.init(dom);
chart.setOption(option);
chart.on('click', handler);

// 或使用 Chart 包装
import { Chart } from '@hudx/charts';
const chart = new Chart(dom, option);
chart.setOption(option);
```

---

## 7️⃣ 总结

### 现状

- ✅ HudX 已实现了 ECharts 约 **40%** 的核心 API
- ⚠️ 缺少坐标转换、数据导出等高级功能
- ⚠️ 组件合并模式实现不完整

### 建议路线

1. **第一阶段**（P0）：完善 `setOption()` 的参数和选项
2. **第二阶段**（P1）：实现 `getDom()`、`clear()`、`isDisposed()`
3. **第三阶段**（P2）：实现坐标转换、数据导出、加载动画
4. **第四阶段**（P3）：实现多图表联动、自定义系列等高级功能

### 关键点

- 保持 API 签名与 ECharts 一致
- 实现组件合并模式（普通合并 + 替换合并）
- 完善类型定义
- 考虑向后兼容性

---

## 📚 参考资源

- [ECharts 官方 API 文档](https://echarts.apache.org/zh/api.html)
- [ECharts 最佳实践](https://echarts.apache.org/handbook/zh/basics/import)
- [ECharts 事件系统](https://echarts.apache.org/handbook/zh/concepts/event)
- [ECharts 坐标系统](https://echarts.apache.org/handbook/zh/concepts/coordinate-system)
