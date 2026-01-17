# 重构 ChartsPackageExample 计划

用户强调需要展示 `title`, `tooltip`, `legend`, `axis`, `series` 的属性差异（如位置布局 `left/top/right/bottom` 等）。这意味着单一的综合示例可能不够直观，我将构建一个**交互式配置面板**风格的示例。用户可以通过调整参数直接看到图表组件（Title, Legend 等）的变化，从而直观理解各个属性的作用。

## 核心目标
创建一个“交互式图表实验室（Chart Playground）”，重点展示核心组件的配置差异。

## 实现方案

### 1. 界面布局
*   **左侧：配置面板 (Control Panel)**
    *   **Title 配置**：
        *   Position: Top/Bottom/Left/Right (Radio Group)
        *   Align: Left/Center/Right (Radio Group)
    *   **Legend 配置**：
        *   Position: Top/Bottom/Left/Right
        *   Orient: Horizontal/Vertical
    *   **Tooltip 配置**：
        *   Trigger: Axis/Item
    *   **X Axis 配置**：
        *   Position: Bottom/Top (若支持) 或展示 Label 旋转/隐藏
    *   **Series 配置**：
        *   Type: Bar/Line 切换
        *   Stack: On/Off
*   **右侧：图表展示区**
    *   实时渲染受左侧配置控制的图表。

### 2. 代码结构 (`ChartsPackageExample.tsx`)
*   **State Management**: 使用 React `useState` 管理各项配置状态。
*   **Effect Hook**: 监听配置状态变化，构建新的 `ChartOption`，并调用 `chartInstance.setOption(newOption)` 更新图表。
*   **Direct API Usage**: 依然保持直接使用 `new BarChart()` (或通用 `Chart` 类，如果导出的话，但目前看主要是 `BarChart/LineChart` 等具体类) 的方式，但核心逻辑在于**动态构建 Option**。
    *   *注意*：由于 `hudx-charts` 导出的是具体的 Chart 类（如 `BarChart`），我将使用 `BarChart` 作为主要演示对象，因为它能很好地兼容 Line 系列（通常 ECharts 风格的库允许在 Option 中混用 Series type）。如果 `BarChart` 类限制了只能渲染 Bar，我会根据实际情况切换实例或使用更通用的类（如果存在）。从之前的读取来看，`BarChart` 继承自 `Chart`，通常支持多类型 Series。

### 3. 覆盖点细节
*   **Title**: 演示 `text`, `subtext`, `left`, `top`, `textAlign`。
*   **Legend**: 演示 `data`, `left`, `top`, `orient`。
*   **Tooltip**: 演示 `trigger` ('axis' vs 'item'), `formatter` (简单演示)。
*   **Axis**: 演示 `name`, `axisLabel.rotate`。
*   **Series**: 演示 `type` ('bar', 'line'), `stack` (堆叠效果), `itemStyle` (颜色)。

### 4. 验证计划
*   **构建**: `pnpm build`。
*   **运行**: 启动 Dev Server，在浏览器中点击各个配置项，确认图表实时响应且布局正确（例如 Legend 切换到 'left' + 'vertical' 时应显示在左侧垂直排列）。

这个方案不仅满足了“接口覆盖全面”，更直接响应了用户关于“展示属性差异（如 left, top 等效果）”的具体需求。
