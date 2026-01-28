# 主题和多语言支持

HudX 支持 Light 和 Dark 两种主题，以及多语言国际化。ThemeManager 会基于 ThemeToken 与默认 Token 生成完整的 ThemeConfig。

## 主题系统

### 支持的主题

- **Light** (默认): 浅色主题，适合明亮环境
- **Dark**: 深色主题，适合暗色环境

### 主题配置

每个主题包含以下配置项（ThemeConfig 为运行时解析后的完整配置）：

```typescript
interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  textColorSecondary?: string;
  textColorTertiary?: string;
  borderColor: string;
  borderSecondaryColor?: string;
  gridColor: string;
  axisLineColor: string;
  axisPointerColor: string;
  axisLabelColor: string;
  splitLineColor?: string;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  tooltipBorderColor: string;
  tooltipBoxShadow: string;
  tooltipSeriesNameColor: string;
  tooltipSubitemNameColor: string;
  tooltipValueColor: string;
  legendTextColor: string;
  textColorOnSeries?: string;
  primaryColor?: string;
  primaryTextColor?: string;
  shadowColor: string;
  maskColor: string;
  decalColor: string;
  seriesColors: string[];
  color?: string[];
  heatmapColors?: string[];
  fillPageColor?: string;
  fillContainerColor?: string;
  fillContainerAltColor?: string;
  fillHoverColor?: string;
  codeBackgroundColor?: string;
  codeGutterBackgroundColor?: string;
  codeTextColor?: string;
  codeGutterTextColor?: string;
  fontFamily: string;
  fontSize: number;
  token: ThemeToken;
  [key: string]: any;
}
```

### 主题 Token 系统

HudX 使用 Token 系统，以支持更细粒度和更易维护的主题定制。ThemeManager 会将 Token 与默认 light/dark Token 合并、规范化主题名，并自动补齐缺失值（颜色数组、字体等）。

```typescript
interface ThemeToken {
  colorText?: string;
  colorTextSecondary?: string;
  colorTextTertiary?: string;
  colorBackground?: string;
  colorFillPage?: string;
  colorFillContainer?: string;
  colorFillContainerAlt?: string;
  colorFillHover?: string;
  colorBorder?: string;
  colorBorderSecondary?: string;
  colorGrid?: string;
  colorAxisLine?: string;
  colorAxisLabel?: string;
  colorTooltipBackground?: string;
  colorTooltipText?: string;
  colorTooltipBorder?: string;
  boxShadowTooltip?: string;
  colorTooltipSeriesName?: string;
  colorTooltipSubitemName?: string;
  colorTooltipValue?: string;
  colorLegendText?: string;
  colorTextOnSeries?: string;
  colorPrimary?: string;
  colorPrimaryText?: string;
  colorShadow?: string;
  colorMask?: string;
  colorDecal?: string;
  colorCodeBackground?: string;
  colorCodeGutterBackground?: string;
  colorCodeText?: string;
  colorCodeGutterText?: string;
  fontFamily?: string;
  fontSize?: number;
  seriesColors?: string[];
  heatmapColors?: string[];
  [key: string]: unknown;
}
```

#### 使用 Token

你可以通过 `ThemeManager` 注册或更新 Token，系统会自动解析为完整的主题配置。

```typescript
import { ThemeManager } from "hudx-render";

// 1. 注册/更新 Token
ThemeManager.registerToken("light", {
  colorText: "#000000", // 更深的黑色
  colorBackground: "#f0f0f0", // 浅灰色背景
  colorBorderSecondary: "#d6d8da",
  colorTooltipBorder: "#e6e8e9",
  colorCodeBackground: "#f5f5f5",
  seriesColors: ["#ff0000", "#00ff00", "#0000ff"], // 自定义色板
});

// 2. 获取解析后的主题配置
const theme = ThemeManager.getTheme("light");
const colors = theme.seriesColors;
const bgColor = theme.backgroundColor;
```

当你需要将图表颜色与设计系统的 Token 对齐时，这非常有用。

#### 全局主题模式

ThemeManager 可以作为全局风格驱动管理器使用：你可以设置当前主题，并让未显式指定 theme 的渲染实例自动使用当前主题。

```typescript
import { ThemeManager, Renderer } from "hudx-render";

ThemeManager.setCurrentTheme("dark");

// 未传 theme 时，使用 ThemeManager.getCurrentTheme()
const renderer = Renderer.init("#container", "canvas");
```

### 使用方法

#### 在 Renderer 中使用

```typescript
import { Renderer, Circle } from "hudx-render";

// 创建时指定主题
const renderer = Renderer.init("#container", "canvas", "dark");

// 切换主题
renderer.setTheme("light");

// 获取当前主题
const theme = renderer.getTheme();

// 获取主题配置
const themeConfig = renderer.getThemeConfig();
```

#### 在 Chart 中使用

```typescript
import { LineChart } from "hudx-charts";

// 创建时指定主题
const chart = new LineChart(dom, option, "canvas", "dark");

// 切换主题
chart.setTheme("light");

// 获取当前主题
const theme = chart.getTheme();
```

#### 在 React 组件中使用

```tsx
import { HChart } from "hudx-charts";

<HChart option={option} theme="dark" width={800} height={400} />;
```

### 自定义主题

```typescript
import { ThemeManager } from "hudx-render";

// 注册自定义主题
ThemeManager.registerTheme("custom", {
  backgroundColor: "#f0f0f0",
  textColor: "#333333",
  borderColor: "#cccccc",
  gridColor: "#e6e6e6",
  axisLineColor: "#333333",
  axisPointerColor: "#666666",
  axisLabelColor: "#666666",
  seriesColors: ["#ff0000", "#00ff00", "#0000ff"],
  tooltipBackgroundColor: "rgba(50, 50, 50, 0.9)",
  tooltipTextColor: "#ffffff",
  legendTextColor: "#333333",
});

// 使用自定义主题
const renderer = Renderer.init("#container", "canvas", "custom");
```

### ThemeManager

- `getTheme(theme: Theme): ThemeConfig` - 获取指定主题配置
- `getTheme(): ThemeConfig` - 获取当前主题配置
- `getCurrentTheme(): Theme` - 获取当前主题
- `setCurrentTheme(theme: Theme): void` - 设置当前主题
- `onThemeChange(listener): () => void` - 监听主题切换
- `registerTheme(theme: Theme, config: ThemeConfig): void` - 注册自定义主题
- `registerToken(theme: string, token: ThemeToken): void` - 注册或更新主题 Token
- `registerHudBaseTokens(tokens: Record<string, ThemeToken>): void` - 批量注册 Token
- `getThemes(): Theme[]` - 获取所有已注册主题

## 多语言支持

### 支持的语言

- **en**: English (英语)
- **zh / zh-CN**: 简体中文
- **zh-TW**: 繁体中文

### 翻译键值

默认支持的翻译键值：

- `chart.title`: 图表标题
- `chart.legend`: 图例
- `chart.tooltip`: 提示框
- `axis.x`: X 轴
- `axis.y`: Y 轴
- `series.name`: 系列
- `data.empty`: 暂无数据
- `data.loading`: 加载中...
- `data.error`: 数据加载错误

### 使用方法

#### 在 Renderer 中使用

```typescript
import { Renderer } from "hudx-render";

// 创建时指定语言
const renderer = Renderer.init("#container", "canvas", "light", "zh-CN");

// 切换语言
renderer.setLocale("en");

// 获取当前语言
const locale = renderer.getLocale();

// 获取翻译文本
const text = renderer.t("chart.title", "Chart");
```

#### 在 Chart 中使用

```typescript
import { LineChart } from "hudx-charts";

// 创建时指定语言
const chart = new LineChart(dom, option, "canvas", "light", "zh-CN");

// 切换语言
chart.setLocale("en");

// 获取翻译文本
const text = chart.t("chart.title", "Chart");
```

#### 在 React 组件中使用

```tsx
import { HChart } from "hudx-charts";

<HChart option={option} locale="zh-CN" width={800} height={400} />;
```

### 自定义语言

```typescript
import { LocaleManager } from "hudx-render";

// 注册自定义语言
LocaleManager.registerLocale("custom", {
  "chart.title": "Custom Chart",
  "chart.legend": "Custom Legend",
  "chart.tooltip": "Custom Tooltip",
  "axis.x": "Custom X Axis",
  "axis.y": "Custom Y Axis",
  "series.name": "Custom Series",
  "data.empty": "No Custom Data",
  "data.loading": "Loading Custom...",
  "data.error": "Custom Error",
});

// 使用自定义语言
const renderer = Renderer.init("#container", "canvas", "light", "custom");
```

### 语言回退机制

1. 首先尝试精确匹配（如 `zh-CN`）
2. 如果失败，尝试语言代码（如 `zh`）
3. 如果仍然失败，回退到英语（`en`）

## 组合使用

### 完整示例

```typescript
import { Renderer, Circle } from "hudx-render";

// 创建带主题和语言的渲染器
const renderer = Renderer.init(
  "#container",
  "canvas", // 渲染模式
  "dark", // 主题
  "zh-CN", // 语言
);

// 使用主题配置
const themeConfig = renderer.getThemeConfig();
const circle = new Circle({
  shape: { cx: 100, cy: 100, r: 50 },
  style: { fill: themeConfig.seriesColors[0] },
});
renderer.add(circle);

// 使用翻译
const title = renderer.t("chart.title", "Chart");
```

### React 组件完整示例

```tsx
import { HChart } from "hudx-charts";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [locale, setLocale] = useState<"en" | "zh-CN">("en");

  return (
    <div>
      <div>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </button>
        <button onClick={() => setLocale(locale === "en" ? "zh-CN" : "en")}>
          Toggle Language
        </button>
      </div>
      <HChart
        option={option}
  renderMode="svg"
        theme={theme}
        locale={locale}
        width={800}
        height={400}
      />
    </div>
  );
}
```

## 最佳实践

1. **主题切换**: 根据用户系统偏好或应用设置自动切换主题
2. **语言检测**: 根据浏览器语言自动设置语言
3. **性能优化**: 主题和语言切换会触发重绘，避免频繁切换
4. **自定义扩展**: 根据项目需求注册自定义主题和语言

## API 参考

### Renderer

- `getTheme(): Theme` - 获取当前主题
- `setTheme(theme: Theme): this` - 设置主题
- `getThemeConfig(): ThemeConfig` - 获取主题配置
- `getLocale(): Locale` - 获取当前语言
- `setLocale(locale: Locale): this` - 设置语言
- `t(key: string, defaultValue?: string): string` - 获取翻译文本

### Chart

- `getTheme(): Theme` - 获取当前主题
- `setTheme(theme: Theme): void` - 设置主题
- `getLocale(): Locale` - 获取当前语言
- `setLocale(locale: Locale): void` - 设置语言
- `t(key: string, defaultValue?: string): string` - 获取翻译文本

### ThemeManager

- `getTheme(theme: Theme): ThemeConfig` - 获取主题配置
- `getTheme(): ThemeConfig` - 获取当前主题配置
- `getCurrentTheme(): Theme` - 获取当前主题
- `setCurrentTheme(theme: Theme): void` - 设置当前主题
- `onThemeChange(listener): () => void` - 监听主题变化
- `registerTheme(theme: Theme, config: ThemeConfig): void` - 注册主题
- `registerToken(theme: string, token: ThemeToken): void` - 注册或更新主题 Token
- `getThemes(): Theme[]` - 获取所有已注册主题

### LocaleManager

- `getLocale(locale: Locale): LocaleConfig` - 获取语言配置
- `t(locale: Locale, key: string, defaultValue?: string): string` - 获取翻译文本
- `registerLocale(locale: Locale, config: LocaleConfig): void` - 注册语言
- `getLocales(): Locale[]` - 获取所有已注册语言
