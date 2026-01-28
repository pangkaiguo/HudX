# Theme and Internationalization Support

HudX supports Light and Dark themes, as well as internationalization in multiple languages. The ThemeManager builds a full ThemeConfig from ThemeToken values and default tokens.

## Theme System

### Supported Themes

- **Light** (default): Light theme, suitable for bright environments
- **Dark**: Dark theme, suitable for dark environments

### Theme Configuration

Each theme includes the following configuration items (ThemeConfig is the resolved, runtime config):

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

### Theme Token System

HudX uses a token system for more granular and maintainable theme customization. ThemeManager merges your token with the default light/dark base token, normalizes the theme key, and fills missing values (palette arrays, font family, font size).

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

#### Using Tokens

You can register tokens via `ThemeManager` and access the resolved config from `getTheme`.

```typescript
import { ThemeManager } from "hudx-render";

// 1. Register/Update Tokens
ThemeManager.registerToken("light", {
  colorText: "#000000", // Darker text
  colorBackground: "#f0f0f0", // Light gray background
  colorBorderSecondary: "#d6d8da",
  colorTooltipBorder: "#e6e8e9",
  colorCodeBackground: "#f5f5f5",
  seriesColors: ["#ff0000", "#00ff00", "#0000ff"], // Custom palette
});

// 2. Access Resolved Theme Config
const theme = ThemeManager.getTheme("light");
const colors = theme.seriesColors;
const bgColor = theme.backgroundColor;
```

This is particularly useful when you want to align chart colors with your design system's tokens.

#### Global Theme Mode

ThemeManager can act as a global style driver: set the current theme once, and let render instances use it when `theme` is not explicitly provided.

```typescript
import { ThemeManager, Renderer } from "hudx-render";

ThemeManager.setCurrentTheme("dark");

// If theme is omitted, it uses ThemeManager.getCurrentTheme()
const renderer = Renderer.init("#container", "canvas");
```

### Usage

#### In Renderer

```typescript
import { Renderer, Circle } from "hudx-render";

// Specify theme when creating
const renderer = Renderer.init("#container", "canvas", "dark");

// Switch theme
renderer.setTheme("light");

// Get current theme
const theme = renderer.getTheme();

// Get theme configuration
const themeConfig = renderer.getThemeConfig();
```

#### In Chart

```typescript
import { LineChart } from "hudx-charts";

// Specify theme when creating
const chart = new LineChart(dom, option, "canvas", "dark");

// Switch theme
chart.setTheme("light");

// Get current theme
const theme = chart.getTheme();
```

#### In React Component

```tsx
import { HChart } from "hudx-charts";

<HChart option={option} theme="dark" width={800} height={400} />;
```

### Custom Themes

```typescript
import { ThemeManager } from "hudx-render";

// Register custom theme
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

// Use custom theme
const renderer = Renderer.init("#container", "canvas", "custom");
```

### ThemeManager

- `getTheme(theme: Theme): ThemeConfig` - Get theme configuration
- `getTheme(): ThemeConfig` - Get theme configuration for current theme
- `getCurrentTheme(): Theme` - Get current theme
- `setCurrentTheme(theme: Theme): void` - Set current theme
- `onThemeChange(listener): () => void` - Subscribe to theme change
- `registerTheme(theme: Theme, config: ThemeConfig): void` - Register custom theme
- `registerToken(theme: string, token: ThemeToken): void` - Register or update theme tokens
- `registerHudBaseTokens(tokens: Record<string, ThemeToken>): void` - Register token sets in batch
- `getThemes(): Theme[]` - Get all registered themes

## Internationalization (i18n)

HudX supports multiple languages with the ability to add custom languages.

### Supported Languages

- **English** (en) - Default
- **Simplified Chinese** (zh, zh-CN)
- **Traditional Chinese (Hong Kong)** (zh-HK)
- **Traditional Chinese (Taiwan)** (zh-TW)

### Usage

#### In Renderer

```typescript
import { Renderer, Circle } from "hudx-render";

// Specify locale when creating
const renderer = Renderer.init("#container", "canvas", "light", "zh-CN");

// Switch locale
renderer.setLocale("en");

// Get current locale
const locale = renderer.getLocale();

// Get locale messages
const messages = renderer.getLocaleMessages();
```

#### In Chart

```typescript
import { LineChart } from "hudx-charts";

// Specify locale when creating
const chart = new LineChart(dom, option, "canvas", "light", "zh-CN");

// Switch locale
chart.setLocale("en");

// Get current locale
const locale = chart.getLocale();
```

#### In React Component

```tsx
import { HChart } from "hudx-charts";

<HChart option={option} locale="en" width={800} height={400} />;
```

### Adding Custom Language

```typescript
import { LocaleManager } from "hudx-render";

// Register custom language
LocaleManager.registerLocale("custom", {
  "": {
    // component messages
    "button.ok": "OK",
    "button.cancel": "Cancel",
    "title.default": "Default Title",
    // ... more messages
  },
});

// Use custom language
const renderer = Renderer.init("#container", "canvas", "light", "custom");
```

### LocaleManager

- `getLocale(locale: Locale): LocaleConfig` - Get locale configuration
- `t(locale: Locale, key: string, defaultValue?: string): string` - Get translated text
- `registerLocale(locale: Locale, config: LocaleConfig): void` - Register custom locale
- `getLocales(): Locale[]` - Get all registered locales

## Advanced Features

### Dynamic Theme Switching

```tsx
import React, { useState } from "react";
import { HChart } from "hudx-charts";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  const option = {
    xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
    yAxis: { type: "value" },
    series: [{ type: "line", data: [120, 200, 150] }],
  };

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light Theme</button>
      <button onClick={() => setTheme("dark")}>Dark Theme</button>
      <HChart option={option} theme={theme} width={800} height={400} />
    </div>
  );
}
```

### Dynamic Language Switching

```tsx
import React, { useState } from "react";
import { HChart } from "hudx-charts";

function LocaleSwitcher() {
  const [locale, setLocale] = useState("en");

  const option = {
    xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
    yAxis: { type: "value" },
    series: [{ type: "line", data: [120, 200, 150] }],
  };

  return (
    <div>
      <select onChange={(e) => setLocale(e.target.value)}>
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
      </select>
      <HChart option={option} locale={locale} width={800} height={400} />
    </div>
  );
}
```

### System Theme Detection

```typescript
import { Renderer } from "hudx-render";

// Detect system theme preference
const darkModePreferred = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
const theme = darkModePreferred ? "dark" : "light";

const renderer = Renderer.init("#container", "canvas", theme);

// Listen for theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    renderer.setTheme(e.matches ? "dark" : "light");
  });
```

## Theme Color Palette

### Light Theme

```javascript
{
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderColor: '#d9d9d9',
  gridColor: '#f0f0f0',
  axisLineColor: '#333333',
  axisLabelColor: '#666666',
  seriesColors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  tooltipBackgroundColor: 'rgba(255, 255, 255, 0.95)',
  tooltipTextColor: '#333333',
  legendTextColor: '#333333'
}
```

### Dark Theme

```javascript
{
  backgroundColor: '#1a1a1a',
  textColor: '#eeeeee',
  borderColor: '#333333',
  gridColor: '#333333',
  axisLineColor: '#eeeeee',
  axisLabelColor: '#aaaaaa',
  seriesColors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  tooltipBackgroundColor: 'rgba(50, 50, 50, 0.95)',
  tooltipTextColor: '#eeeeee',
  legendTextColor: '#eeeeee'
}
```

## Best Practices

1. **Respect User Preference** - Use system theme detection
2. **Provide Options** - Allow users to override theme
3. **Consistent Colors** - Use theme colors throughout your app
4. **Test Both Themes** - Ensure visibility in all themes
5. **Accessible Colors** - Maintain proper contrast ratios
6. **Language Detection** - Auto-detect user language from browser
7. **Fallback Language** - Always have English as fallback
8. **Custom Translations** - Allow app-specific messages

## Troubleshooting

### Theme Not Updating

- Ensure you call `setTheme()` on the renderer instance
- Check that the theme name is registered
- Verify the component re-renders after theme change

### Language Not Working

- Check locale code spelling (e.g., 'zh-CN' not 'zh_cn')
- Verify the locale is registered
- Ensure messages are properly formatted

### Colors Not Showing

- Verify theme colors have sufficient contrast
- Check SVG/Canvas rendering mode compatibility
- Ensure styles are not overridden by CSS
