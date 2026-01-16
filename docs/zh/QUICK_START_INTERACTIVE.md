# HudX 交互功能快速开始指南

## 5 分钟快速上手

### 1. 基础设置

```typescript
import {
  Renderer,
  Polyline,
  Circle,
  Text,
  Tooltip,
  Legend,
  Animation,
  Easing,
} from "hudx-core";

// 初始化渲染器
const renderer = Renderer.init(container, "canvas", "light", "en");
const width = 800;
const height = 400;

// 创建 Tooltip
const tooltip = new Tooltip();
renderer.add(tooltip);

// 创建 Legend
const legend = new Legend({ x: 20, y: 20, orient: "horizontal" });
renderer.add(legend);
```

### 2. 绘制数据

```typescript
// 数据
const data = [120, 200, 150, 80, 70, 110, 130];
const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxValue = Math.max(...data);

// 计算坐标
const points = data.map((value, index) => ({
  x: 100 + index * 100,
  y: 300 - (value / maxValue) * 200,
  value,
  label: labels[index],
}));

// 绘制线
renderer.add(
  new Polyline({
    shape: { points: points.map((p) => [p.x, p.y]) },
    style: { stroke: "#5470c6", lineWidth: 2 },
  }),
);

// 绘制数据点
points.forEach((point) => {
  renderer.add(
    new Circle({
      shape: { cx: point.x, cy: point.y, r: 4 },
      style: { fill: "#5470c6", stroke: "#fff", lineWidth: 2 },
    }),
  );
});
```

### 3. 添加交互

```typescript
// 为每个数据点添加交互
points.forEach((point, index) => {
  const circle = renderer.getRoot().children[index];

  // Hover 效果
  circle.on("mouseover", () => {
    circle.attr("shape", { r: 7 });
    tooltip.show(
      point.x + 10,
      point.y - 30,
      `${labels[index]}\n${point.value}`,
    );
    renderer.flush();
  });

  circle.on("mouseout", () => {
    circle.attr("shape", { r: 4 });
    tooltip.hide();
    renderer.flush();
  });

  // 点击效果
  circle.on("click", () => {
    console.log("Clicked:", labels[index], point.value);
  });
});
```

### 4. 添加动画

```typescript
// 为线条添加淡入动画
const line = renderer.getRoot().children[0];
const lineAnim = new Animation(
  line.attr("style"),
  "opacity",
  1,
  800,
  0,
  Easing.cubicOut,
  () => renderer.flush(),
);
lineAnim.start();

// 为数据点添加弹性动画
points.forEach((point, index) => {
  const circle = renderer.getRoot().children[index + 1];
  const pointAnim = new Animation(
    circle.attr("shape"),
    "r",
    4,
    600,
    index * 100,
    Easing.elasticOut,
    () => renderer.flush(),
  );
  pointAnim.start();
});
```

### 5. 添加图例

```typescript
// 设置图例项
legend.setItems([{ name: "Series A", color: "#5470c6" }]);

// 处理图例选择
legend.onSelect = (name, selected) => {
  // 切换系列显示/隐藏
  console.log(`${name}: ${selected ? "shown" : "hidden"}`);
};
```

---

## 常用代码片段

### 创建多系列图表

```typescript
const seriesData = [
  {
    name: "Series A",
    color: "#5470c6",
    data: [120, 200, 150, 80, 70, 110, 130],
  },
  {
    name: "Series B",
    color: "#91cc75",
    data: [100, 150, 120, 110, 90, 140, 120],
  },
];

seriesData.forEach((series, seriesIndex) => {
  const points = series.data.map((value, index) => ({
    x: 100 + index * 100,
    y: 300 - (value / maxValue) * 200,
    value,
    label: labels[index],
  }));

  // 绘制线
  renderer.add(
    new Polyline({
      shape: { points: points.map((p) => [p.x, p.y]) },
      style: { stroke: series.color, lineWidth: 2, opacity: 0 },
    }),
  );

  // 动画
  const line =
    renderer.getRoot().children[renderer.getRoot().children.length - 1];
  const anim = new Animation(
    line.attr("style"),
    "opacity",
    1,
    800,
    seriesIndex * 200, // 错开延迟
    Easing.cubicOut,
  );
  anim.start();
});

// 设置图例
legend.setItems(seriesData.map((s) => ({ name: s.name, color: s.color })));
```

### 创建柱状图

```typescript
const barWidth = 60;
const barHeight = (value / maxValue) * 200;

const bar = new Rect({
  shape: {
    x: 100 + index * 100,
    y: 300 - barHeight,
    width: barWidth,
    height: 0,
  },
  style: { fill: "#5470c6" },
});

renderer.add(bar);

// 动画
const barAnim = new Animation(
  bar.attr("shape"),
  "height",
  barHeight,
  800,
  index * 100,
  Easing.cubicOut,
  () => renderer.flush(),
);
barAnim.start();
```

---

## 缓动函数速查表

| 函数           | 效果       | 用途     |
| -------------- | ---------- | -------- |
| `linear`       | 匀速       | 简单动画 |
| `quadraticOut` | 快速减速   | 一般动画 |
| `cubicOut`     | 平滑减速   | 推荐使用 |
| `elasticOut`   | 弹性反弹   | 强调效果 |
| `cubicInOut`   | 平滑加减速 | 往返动画 |

---

## 事件类型速查表

| 事件         | 触发条件     |
| ------------ | ------------ |
| `mouseover`  | 鼠标进入元素 |
| `mouseout`   | 鼠标离开元素 |
| `click`      | 点击元素     |
| `dblclick`   | 双击元素     |
| `touchstart` | 触摸开始     |
| `touchmove`  | 触摸移动     |
| `touchend`   | 触摸结束     |

---

## 常见问题

### Q: 如何禁用动画？

```typescript
// 方法 1: 不调用 start()
// const anim = new Animation(...);
// anim.start();  // 注释掉

// 方法 2: 设置 duration 为 0
const anim = new Animation(target, "property", value, 0);
anim.start();
```

### Q: 如何改变动画速度？

```typescript
// 修改 duration 参数
const anim = new Animation(
  target,
  "property",
  value,
  2000, // 改为 2000ms (原来 1000ms)
  0,
  Easing.cubicOut,
);
```

### Q: 如何添加自定义缓动函数？

```typescript
const customEasing = (t: number) => {
  // t 从 0 到 1
  return t * t * (3 - 2 * t); // smoothstep
};

const anim = new Animation(target, "property", value, 1000, 0, customEasing);
```

### Q: 如何处理多个动画？

```typescript
const animations: Animation[] = [];

// 创建动画
for (let i = 0; i < 10; i++) {
  const anim = new Animation(
    targets[i],
    "property",
    value,
    1000,
    i * 100, // 错开延迟
    Easing.cubicOut,
  );
  anim.start();
  animations.push(anim);
}

// 清理
return () => {
  animations.forEach((anim) => anim.stop());
};
```

---

## 性能优化建议

### 1. 使用错开延迟

```typescript
// ✅ 好
seriesData.forEach((series, index) => {
  const anim = new Animation(
    target,
    "property",
    value,
    1000,
    index * 200,
    easing,
  );
  anim.start();
});

// ❌ 差
seriesData.forEach((series) => {
  const anim = new Animation(target, "property", value, 1000, 0, easing);
  anim.start();
});
```

### 2. 及时清理

```typescript
// ✅ 好
useEffect(() => {
  // ... 创建动画
  return () => {
    animations.forEach((anim) => anim.stop());
    renderer.dispose();
  };
}, []);

// ❌ 差
// 不清理动画和渲染器
```

### 3. 使用 flush() 控制重绘

```typescript
// ✅ 好
circle.on("mouseover", () => {
  circle.attr("shape", { r: 7 });
  tooltip.show(x, y, content);
  renderer.flush(); // 立即重绘
});

// ❌ 差
circle.on("mouseover", () => {
  circle.attr("shape", { r: 7 });
  tooltip.show(x, y, content);
  // 等待下一帧重绘
});
```

---

## 完整示例

查看以下文件获取完整示例：

- `examples/src/examples/FullFeatureDemo.tsx` - 完整功能演示
- `examples/src/examples/StackLineChart.tsx` - 堆叠折线图
- `examples/src/examples/GroupBarChart.tsx` - 高级柱状图
- `examples/src/examples/AdvancedPieChart.tsx` - 高级饼图
- `examples/src/examples/InteractiveDashboard.tsx` - 交互式仪表板

---

## 下一步

1. 查看 [交互式示例指南](../examples/INTERACTIVE_EXAMPLES.md)
2. 阅读 [Core API 文档](../packages/core/README.md)
3. 探索 [完整示例](../examples/src/examples/)

---

**快速链接**:

- 🚀 [启动开发服务器](#快速开始)
- 📚 [完整文档](../README.md)
- 💡 [最佳实践](./INTERACTIVE_FEATURES_SUMMARY.md)
