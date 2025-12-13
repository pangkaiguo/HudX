# Theme and Internationalization Support

HudX supports Light and Dark themes, as well as internationalization in multiple languages.

## Theme System

### Supported Themes

- **Light** (default): Light theme, suitable for bright environments
- **Dark**: Dark theme, suitable for dark environments

### Theme Configuration

Each theme includes the following configuration items:

```typescript
interface ThemeConfig {
  backgroundColor: string;        // Background color
  textColor: string;              // Text color
  borderColor: string;            // Border color
  gridColor: string;              // Grid color
  axisLineColor: string;          // Axis line color
  axisLabelColor: string;         // Axis label color
  seriesColors: string[];         // Series color array
  tooltipBackgroundColor: string; // Tooltip background color
  tooltipTextColor: string;       // Tooltip text color
  legendTextColor: string;        // Legend text color
}
```

### Usage

#### In Renderer

```typescript
import { Renderer, Circle } from '@HudX/core';

// Specify theme when creating
const renderer = Renderer.init('#container', 'canvas', 'dark');

// Switch theme
renderer.setTheme('light');

// Get current theme
const theme = renderer.getTheme();

// Get theme configuration
const themeConfig = renderer.getThemeConfig();
```

#### In Chart

```typescript
import { LineChart } from '@HudX/charts';

// Specify theme when creating
const chart = new LineChart(dom, option, 'canvas', 'dark');

// Switch theme
chart.setTheme('light');

// Get current theme
const theme = chart.getTheme();
```

#### In React Component

```tsx
import { HChart } from '@HudX/charts';

<HChart
  option={option}
  theme="dark"
  width={800}
  height={400}
/>
```

### Custom Themes

```typescript
import { ThemeManager } from '@HudX/core';

// Register custom theme
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

// Use custom theme
const renderer = Renderer.init('#container', 'canvas', 'custom');
```

## Internationalization (i18n)

HudX supports multiple languages with the ability to add custom languages.

### Supported Languages

- **English** (en) - Default
- **Simplified Chinese** (zh, zh-CN)
- **Traditional Chinese** (zh-TW)

### Usage

#### In Renderer

```typescript
import { Renderer, Circle } from '@HudX/core';

// Specify locale when creating
const renderer = Renderer.init('#container', 'canvas', 'light', 'zh-CN');

// Switch locale
renderer.setLocale('en');

// Get current locale
const locale = renderer.getLocale();

// Get locale messages
const messages = renderer.getLocaleMessages();
```

#### In Chart

```typescript
import { LineChart } from '@HudX/charts';

// Specify locale when creating
const chart = new LineChart(dom, option, 'canvas', 'light', 'zh-CN');

// Switch locale
chart.setLocale('en');

// Get current locale
const locale = chart.getLocale();
```

#### In React Component

```tsx
import { HChart } from '@HudX/charts';

<HChart
  option={option}
  locale="en"
  width={800}
  height={400}
/>
```

### Adding Custom Language

```typescript
import { LocaleManager } from '@HudX/core';

// Register custom language
LocaleManager.registerLocale('custom', {
  '': { // component messages
    'button.ok': 'OK',
    'button.cancel': 'Cancel',
    'title.default': 'Default Title',
    // ... more messages
  }
});

// Use custom language
const renderer = Renderer.init('#container', 'canvas', 'light', 'custom');
```

## Advanced Features

### Dynamic Theme Switching

```tsx
import React, { useState } from 'react';
import { HChart } from '@HudX/charts';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  const option = {
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [120, 200, 150] }]
  };

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Theme</button>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
      <HChart
        option={option}
        theme={theme}
        width={800}
        height={400}
      />
    </div>
  );
}
```

### Dynamic Language Switching

```tsx
import React, { useState } from 'react';
import { HChart } from '@HudX/charts';

function LocaleSwitcher() {
  const [locale, setLocale] = useState('en');

  const option = {
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [120, 200, 150] }]
  };

  return (
    <div>
      <select onChange={(e) => setLocale(e.target.value)}>
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
      </select>
      <HChart
        option={option}
        locale={locale}
        width={800}
        height={400}
      />
    </div>
  );
}
```

### System Theme Detection

```typescript
import { Renderer } from '@HudX/core';

// Detect system theme preference
const darkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = darkModePreferred ? 'dark' : 'light';

const renderer = Renderer.init('#container', 'canvas', theme);

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  renderer.setTheme(e.matches ? 'dark' : 'light');
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
