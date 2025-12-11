# HudX Examples

这是 HudX 图表库的示例项目，用于验证功能和性能测试。

## 快速开始

### 安装依赖

在项目根目录运行：

```bash
pnpm install
```

### 启动开发服务器

```bash
# 在根目录运行
pnpm dev:examples

# 或在 examples 目录运行
cd examples
pnpm dev
```

浏览器会自动打开 http://localhost:3000

## 示例列表

### 1. Line Chart (折线图)
- 使用 Core API 绘制基础折线图
- 展示数据点、网格线、坐标轴标签

### 2. Bar Chart (柱状图)
- 使用 Rect 元素绘制柱状图
- 展示基础柱状图布局

### 3. Pie Chart (饼图)
- 使用 Arc 元素绘制饼图
- 展示扇形分布和标签

### 4. Theme Switch (主题切换)
- 演示 Light/Dark 主题切换
- 展示主题配置的应用

### 5. Core API (核心 API)
- 展示所有基础图形元素
- Circle, Rect, Line, Polyline, Polygon

### 6. Performance Test (性能测试)
- 可配置元素数量
- Canvas vs SVG 渲染模式对比
- 实时显示渲染时间

## 项目结构

```
examples/
├── src/
│   ├── examples/          # 示例组件
│   │   ├── BasicLine.tsx
│   │   ├── BasicBar.tsx
│   │   ├── BasicPie.tsx
│   │   ├── ThemeSwitch.tsx
│   │   ├── CoreAPI.tsx
│   │   └── PerformanceTest.tsx
│   ├── App.tsx           # 主应用
│   └── main.tsx          # 入口文件
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 性能测试

Performance Test 示例可以帮助你：

1. **测试渲染性能**：调整元素数量，观察渲染时间
2. **对比渲染模式**：Canvas vs SVG 性能对比
3. **压力测试**：测试大量元素的渲染能力

### 性能基准

- Canvas 模式：1000 元素 < 50ms
- SVG 模式：1000 元素 < 200ms
- 推荐 Canvas 用于大量数据，SVG 用于交互性强的场景

## 技术栈

- React 18
- TypeScript 5
- Vite 5
- @hudx/core
- @hudx/charts

## 开发建议

1. 修改示例代码后会自动热更新
2. 可以在浏览器控制台查看详细日志
3. 使用 Chrome DevTools Performance 分析性能

## 添加新示例

1. 在 `src/examples/` 创建新组件
2. 在 `App.tsx` 的 `examples` 数组中注册
3. 组件会自动出现在导航菜单中
