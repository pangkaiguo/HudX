# 重构示例以匹配 Types Interface 设计

根据您的反馈，我将废弃复杂的 Playground 模式，转而采用清晰的多实例展示模式，严格对照 `packages/render/src/types.ts` 中的接口定义来构建示例。

## 1. 重构 `ChartsPackageExample.tsx`
将复杂的交互面板替换为三个清晰的独立示例，展示直接使用 `Chart` 类的核心场景：
*   **Basic Usage**: 最简单的初始化与销毁。
*   **Dynamic Update**: 模拟数据流更新 (`setOption`)。
*   **Event Handling**: 展示 `click` 等事件监听 (`on/off`)。

## 2. 重构 `TitleExample.tsx`
基于 `TitleOption` 接口，展示不同属性组合的效果：
*   **Positioning**: 展示 `left`, `right`, `center`, `top`, `bottom` 的组合效果。
*   **Styling**: 展示 `textStyle`, `subtextStyle`, `backgroundColor`, `borderColor`, `borderRadius`, `padding` 的效果。
*   **Link**: 展示 `link` 和 `target` 属性（如果支持）。

## 3. 重构 `LegendExample.tsx`
基于 `LegendOption` 接口，展示图例的差异：
*   **Orientation & Position**: 对比 `horizontal` vs `vertical`，以及 `left/right/top/bottom` 布局。
*   **Item Styling**: 展示 `itemWidth`, `itemHeight`, `itemGap` 的调整效果。
*   **Interaction**: 展示 `selectedMode` ('single' vs 'multiple')。
*   **Data Format**: 展示 `data` 为对象数组时的自定义配置（如 `icon`）。

## 4. 重构 `TooltipExample.tsx`
基于 `TooltipOption` 接口，展示提示框的差异：
*   **Trigger Modes**: 对比 `trigger: 'axis'` vs `'item'`。
*   **Formatting**: 展示 `formatter` 回调函数的高级用法（自定义 HTML）。
*   **Styling**: 展示 `backgroundColor`, `borderColor`, `textStyle` 的自定义。
*   **Axis Pointer**: 展示 `axisPointer.type` ('line' vs 'shadow')。

## 5. 新增 `SeriesExample.tsx` (可选但推荐)
如果需要覆盖 Series 属性，我将创建一个 `SeriesExample.tsx` 展示：
*   **Bar Configuration**: `barWidth`, `showBackground`, `itemStyle`.
*   **Line Configuration**: `smooth`, `areaStyle`, `symbol`, `step`.

我将优先执行前 4 点的重构。
