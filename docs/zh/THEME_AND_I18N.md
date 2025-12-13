# 主题和多语言支持

HudX 支持 Light 和 Dark 两种主题，以及多语言国际化。

## 主题系统

### 支持的主题

- **Light** (默认): 浅色主题，适合明亮环境
- **Dark**: 深色主题，适合暗色环境

### 主题配置

每个主题包含以下配置项：

```typescript
interface ThemeConfig {
  backgroundColor: string;        // 背景色
  textColor: string;              // 文本颜色
  borderColor: string;            // 边框颜色
  gridColor: string;              // 网格颜色
  axisLineColor: string;          // 坐标轴线颜色
  axisLabelColor: string;         // 坐标轴标签颜色
  seriesColors: string[];         // 系列颜色数组
  tooltipBackgroundColor: string; // 提示框背景色
  tooltipTextColor: string;       // 提示框文本颜色
  legendTextColor: string;        // 图例文本颜色
}
```

### 使用方法

#### 在 Renderer 中使用

```typescript
import { Renderer, Circle } from '@HudX/core';

// 创建时指定主题
const renderer = Renderer.init('#container', 'canvas', 'dark');

// 切换主题
renderer.setTheme('light');

// 获取当前主题
const theme = renderer.getTheme();

// 获取主题配置
const themeConfig = renderer.getThemeConfig();
```

#### 在 Chart 中使用

```typescript
import { LineChart } from '@HudX/charts';

// 创建时指定主题
const chart = new LineChart(dom, option, 'canvas', 'dark');

// 切换主题
chart.setTheme('light');

// 获取当前主题
const theme = chart.getTheme();
```

#### 在 React 组件中使用

```tsx
import { HChart } from '@HudX/charts';

<HChart
  option={option}
  theme="dark"
  width={800}
  height={400}
/>
```

### 自定义主题

```typescript
import { ThemeManager } from '@HudX/core';

// 注册自定义主题
ThemeManager.registerTheme('custom', {
  backgroundColor: '#f0f0f0',
  textColor: '#333333',
  borderColor: '#cccccc',
  gridColor: '#e6e6e6',
  axisLineColor: '#333333',
  axisLabelColor: '#666666',
  seriesColors: ['#ff0000', '#00ff00', '#0000ff'],
  tooltipBackgroundColor: 'rgba(50, 50, 50, 0.9)',
  tooltipTextColor: '#ffffff',
  legendTextColor: '#333333',
});

// 使用自定义主题
const renderer = Renderer.init('#container', 'canvas', 'custom');
```

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
import { Renderer } from '@HudX/core';

// 创建时指定语言
const renderer = Renderer.init('#container', 'canvas', 'light', 'zh-CN');

// 切换语言
renderer.setLocale('en');

// 获取当前语言
const locale = renderer.getLocale();

// 获取翻译文本
const text = renderer.t('chart.title', 'Chart');
```

#### 在 Chart 中使用

```typescript
import { LineChart } from '@HudX/charts';

// 创建时指定语言
const chart = new LineChart(dom, option, 'canvas', 'light', 'zh-CN');

// 切换语言
chart.setLocale('en');

// 获取翻译文本
const text = chart.t('chart.title', 'Chart');
```

#### 在 React 组件中使用

```tsx
import { HChart } from '@HudX/charts';

<HChart
  option={option}
  locale="zh-CN"
  width={800}
  height={400}
/>
```

### 自定义语言

```typescript
import { LocaleManager } from '@HudX/core';

// 注册自定义语言
LocaleManager.registerLocale('custom', {
  'chart.title': 'Custom Chart',
  'chart.legend': 'Custom Legend',
  'chart.tooltip': 'Custom Tooltip',
  'axis.x': 'Custom X Axis',
  'axis.y': 'Custom Y Axis',
  'series.name': 'Custom Series',
  'data.empty': 'No Custom Data',
  'data.loading': 'Loading Custom...',
  'data.error': 'Custom Error',
});

// 使用自定义语言
const renderer = Renderer.init('#container', 'canvas', 'light', 'custom');
```

### 语言回退机制

1. 首先尝试精确匹配（如 `zh-CN`）
2. 如果失败，尝试语言代码（如 `zh`）
3. 如果仍然失败，回退到英语（`en`）

## 组合使用

### 完整示例

```typescript
import { Renderer, Circle } from '@HudX/core';

// 创建带主题和语言的渲染器
const renderer = Renderer.init(
  '#container',
  'canvas',  // 渲染模式
  'dark',    // 主题
  'zh-CN'    // 语言
);

// 使用主题配置
const themeConfig = renderer.getThemeConfig();
const circle = new Circle({
  shape: { cx: 100, cy: 100, r: 50 },
  style: { fill: themeConfig.seriesColors[0] }
});
renderer.add(circle);

// 使用翻译
const title = renderer.t('chart.title', 'Chart');
```

### React 组件完整示例

```tsx
import { HChart } from '@HudX/charts';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [locale, setLocale] = useState<'en' | 'zh-CN'>('en');

  return (
    <div>
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        <button onClick={() => setLocale(locale === 'en' ? 'zh-CN' : 'en')}>
          Toggle Language
        </button>
      </div>
      <HChart
        option={option}
        renderMode="canvas"
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
- `registerTheme(theme: Theme, config: ThemeConfig): void` - 注册主题
- `getThemes(): Theme[]` - 获取所有已注册主题

### LocaleManager

- `getLocale(locale: Locale): LocaleConfig` - 获取语言配置
- `t(locale: Locale, key: string, defaultValue?: string): string` - 获取翻译文本
- `registerLocale(locale: Locale, config: LocaleConfig): void` - 注册语言
- `getLocales(): Locale[]` - 获取所有已注册语言
