# HudX Interactive Examples Guide

本文档介绍了 HudX 的交互式示例，展示了完整的图表功能和交互能力。

## 新增示例

### 🚀 Full Feature Demo
**文件**: `FullFeatureDemo.tsx`

完整功能演示，展示所有交互特性：
- **动画**: 平滑的加载动画和脉冲效果
- **Tooltip**: 悬停时显示数据详情
- **Legend**: 点击图例切换系列显示/隐藏
- **交互统计**: 实时显示悬停和点击次数
- **点击效果**: 点击数据点时产生脉冲动画

**主要特性**:
```typescript
// 动画配置
const lineAnim = new Animation(
  line.attr('style'),
  'opacity',
  1,
  800,
  seriesIndex * 200,
  Easing.cubicOut,
  () => renderer.flush()
);

// Tooltip 交互
circle.on('mouseover', () => {
  tooltip.show(point.x + 10, point.y - 40, `${series.name}\n${point.label}: ${point.value}`);
});

// 点击脉冲效果
circle.on('click', () => {
  const pulseAnim = new Animation(circle.attr('shape'), 'r', 8, 300, 0, Easing.cubicOut);
  pulseAnim.start();
});
```

---

### 📊 Interactive Dashboard
**文件**: `InteractiveDashboard.tsx`

交互式仪表板，展示 12 个月的性能指标：
- **多系列数据**: 3 条线图展示不同的数据系列
- **错开动画**: 每个系列有不同的动画延迟
- **交互式图例**: 点击图例项切换对应系列的显示
- **Hover 效果**: 悬停时显示详细数据
- **响应式更新**: 图表根据用户交互动态更新

**关键代码**:
```typescript
// 错开动画
const lineAnim = new Animation(
  line.attr('style'),
  'opacity',
  1,
  1000,
  seriesIndex * 300,  // 错开延迟
  Easing.cubicOut
);

// 图例交互
legend.setItems(seriesData.map(s => ({ name: s.name, color: s.color })));
legend.onSelect = (name, selected) => {
  // 切换系列显示/隐藏
};
```

---

### ✨ Advanced Line Chart
**文件**: `AdvancedLineChart.tsx`

高级折线图，展示多系列数据的完整交互：
- **多系列支持**: 3 条不同颜色的线
- **弹性动画**: 使用 elasticOut 缓动函数
- **数据点交互**: 悬停显示 tooltip，点击改变颜色
- **图例控制**: 点击图例切换系列显示
- **网格背景**: 清晰的参考网格

**动画配置**:
```typescript
// 线条动画
const lineAnim = new Animation(
  line.attr('style'),
  'opacity',
  1,
  800,
  seriesIndex * 200,
  Easing.cubicOut
);

// 数据点动画
const pointAnim = new Animation(
  circle.attr('shape'),
  'r',
  4,
  600,
  seriesIndex * 200 + pointIndex * 100,
  Easing.elasticOut
);
```

---

### ✨ Advanced Bar Chart
**文件**: `AdvancedBarChart.tsx`

高级柱状图，展示分组柱状图的交互：
- **分组柱状图**: 多个系列并排显示
- **柱子动画**: 从下往上的高度动画
- **Hover 效果**: 悬停时改变透明度
- **Tooltip 显示**: 显示系列名、分类和数值
- **图例交互**: 切换系列显示/隐藏

**实现细节**:
```typescript
// 柱子高度动画
const barAnim = new Animation(
  bar.attr('shape'),
  'height',
  barHeight,
  800,
  seriesIndex * 150 + dataIndex * 100,
  Easing.cubicOut
);

// Hover 交互
bar.on('mouseover', () => {
  bar.attr('style', { opacity: 1 });
  tooltip.show(barX + barWidth / 2, barY - 10, `${series.name}\n${labels[dataIndex]}: ${value}`);
});
```

---

### ✨ Advanced Pie Chart
**文件**: `AdvancedPieChart.tsx`

高级饼图，展示圆形图表的交互：
- **扇形动画**: 从 0 度到目标角度的动画
- **百分比显示**: 显示每个分类的百分比
- **标签动画**: 标签淡入效果
- **Hover 效果**: 悬停时改变透明度
- **图例交互**: 垂直排列的图例

**关键实现**:
```typescript
// 扇形角度动画
const arcAnim = new Animation(
  arc.attr('shape'),
  'endAngle',
  endAngle,
  1000,
  index * 150,
  Easing.cubicOut
);

// 百分比计算
const percentage = ((item.value / total) * 100).toFixed(1);
tooltip.show(x, y, `${item.name}\n${item.value} (${percentage}%)`);
```

---

## 核心交互功能

### 1. 动画系统 (Animation)

HudX 提供了强大的动画系统，支持多种缓动函数：

```typescript
import { Animation, Easing } from '@hudx/core';

// 创建动画
const animation = new Animation(
  target,           // 目标对象
  'property',       // 属性路径 (支持嵌套如 'shape.r')
  endValue,         // 目标值
  duration,         // 持续时间 (毫秒)
  delay,            // 延迟时间 (毫秒)
  Easing.cubicOut,  // 缓动函数
  onUpdate,         // 更新回调
  onComplete        // 完成回调
);

animation.start();
```

**支持的缓动函数**:
- `linear`: 线性
- `quadraticIn/Out/InOut`: 二次缓动
- `cubicIn/Out/InOut`: 三次缓动
- `elasticIn/Out`: 弹性缓动

### 2. Tooltip 组件

显示数据提示信息：

```typescript
import { Tooltip } from '@hudx/core';

const tooltip = new Tooltip({
  backgroundColor: 'rgba(50, 50, 50, 0.95)',
  textColor: '#fff',
  padding: 12,
  fontSize: 13
});

renderer.add(tooltip);

// 显示 tooltip
tooltip.show(x, y, 'Content\nLine 2');

// 隐藏 tooltip
tooltip.hide();
```

### 3. Legend 组件

交互式图例：

```typescript
import { Legend } from '@hudx/core';

const legend = new Legend({
  x: 20,
  y: 20,
  orient: 'horizontal',  // 或 'vertical'
  onSelect: (name, selected) => {
    // 处理选择事件
  }
});

legend.setItems([
  { name: 'Series A', color: '#5470c6' },
  { name: 'Series B', color: '#91cc75' }
]);

renderer.add(legend);
```

### 4. 事件处理

元素支持丰富的事件：

```typescript
element.on('mouseover', () => {
  // 鼠标进入
});

element.on('mouseout', () => {
  // 鼠标离开
});

element.on('click', () => {
  // 点击
});

element.on('dblclick', () => {
  // 双击
});
```

---

## 最佳实践

### 1. 动画性能优化

```typescript
// 使用错开延迟避免同时运行过多动画
seriesData.forEach((series, index) => {
  const anim = new Animation(
    target,
    'property',
    value,
    duration,
    index * 200,  // 错开延迟
    easing
  );
  anim.start();
});
```

### 2. 内存管理

```typescript
// 保存动画引用以便清理
const animationsRef = useRef<Animation[]>([]);

// 清理动画
return () => {
  animationsRef.current.forEach(anim => anim.stop());
  renderer.dispose();
};
```

### 3. 交互反馈

```typescript
// 提供视觉反馈
element.on('mouseover', () => {
  element.attr('style', { opacity: 1 });
  tooltip.show(x, y, content);
  renderer.flush();
});

element.on('mouseout', () => {
  element.attr('style', { opacity: 0.8 });
  tooltip.hide();
  renderer.flush();
});
```

### 4. 数据绑定

```typescript
// 保存数据引用以便事件处理
const dataMap = new Map<string, DataItem>();

element.on('click', () => {
  const data = dataMap.get(elementId);
  // 处理数据
});
```

---

## 运行示例

```bash
# 安装依赖
pnpm install

# 启动开发服务器
cd examples
pnpm dev

# 访问 http://localhost:5173
```

---

## 对比 ECharts

| 功能 | HudX | ECharts |
|------|------|---------|
| 动画系统 | ✅ 完整支持 | ✅ 完整支持 |
| Tooltip | ✅ 支持 | ✅ 支持 |
| Legend | ✅ 支持 | ✅ 支持 |
| 多系列 | ✅ 支持 | ✅ 支持 |
| 自定义样式 | ✅ 完整支持 | ✅ 完整支持 |
| Canvas/SVG | ✅ 双模式 | ✅ 双模式 |
| 主题切换 | ✅ 支持 | ✅ 支持 |
| 国际化 | ✅ 支持 | ✅ 支持 |

---

## 常见问题

### Q: 如何禁用动画？
A: 在创建 Animation 时设置 duration 为 0，或者不调用 start()。

### Q: 如何改变动画速度？
A: 修改 Animation 构造函数中的 duration 参数。

### Q: 如何添加自定义缓动函数？
A: 传递自定义函数给 Animation 的 easing 参数：
```typescript
const customEasing = (t: number) => t * t * (3 - 2 * t);
const anim = new Animation(target, 'property', value, 1000, 0, customEasing);
```

### Q: 如何处理大量数据点？
A: 使用数据采样或虚拟滚动技术，只渲染可见的数据点。

---

## 相关资源

- [HudX 主文档](../README.md)
- [Core API 文档](../packages/core/README.md)
- [Charts API 文档](../packages/charts/README.md)
- [ECharts 官网](https://echarts.apache.org/)
