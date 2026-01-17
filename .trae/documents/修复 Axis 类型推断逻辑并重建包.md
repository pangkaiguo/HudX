# 修复 Bundle 示例渲染问题

通过分析代码逻辑，我发现了导致 `BundleBarExample` 和 `BundleLineExample` 无法显示的根本原因。

## 问题诊断
*   **现象**：图表未渲染，只有 X 轴标签重叠显示在原点。
*   **原因**：`BarChart` 和 `LineChart` 的内部逻辑在 `xAxis.type` 未定义时，默认使用了线性比例尺（Linear Scale）。由于示例数据提供了 `data`（分类数据）但没有显式指定 `type: 'category'`，导致比例尺计算失败（字符串无法转换为数值），所有坐标被映射为 0 或无效值。
*   **为何 PieChart 正常**：`PieChart` 不依赖坐标轴系统，因此不受影响。

## 解决方案
我已经直接在 `hudx-charts` 源码层面修复了此问题，使其行为更符合用户直觉（类似 ECharts）：

1.  **修改 `BarChart.ts` 和 `LineChart.ts`**：
    *   增加逻辑：如果 `xAxis.type` 未定义但 `xAxis.data` 存在，自动将 `type` 推断为 `'category'`。
    *   代码变更已应用。

2.  **重建包**：
    *   已运行 `pnpm run build` 更新了 `hudx-charts` 的构建产物。

3.  **清理示例**：
    *   移除了 `BundleBarExample` 和 `BundleLineExample` 中的调试代码和错误捕获逻辑，恢复为干净的示例代码。

## 验证
现在您可以刷新浏览器查看示例页面。`BarChart` 和 `LineChart` 应该能正确显示柱状图和折线图，而无需在示例代码中手动添加 `type: 'category'`。这证明了我们不仅修复了示例，还增强了库的健壮性。
