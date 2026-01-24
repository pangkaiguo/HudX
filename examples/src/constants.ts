import type { Locale, Theme } from 'hudx-render';

export const EXAMPLES_DEFAULTS = {
  mode: 'classic' as const,
  theme: 'light' as Theme,
  locale: 'zh-CN' as Locale,
  classicActiveExample: 'basic-bar',
  modernActiveCategory: 'bar',
  modernActiveExampleId: null as string | null,
};

export const EXAMPLES_STORAGE_KEYS = {
  mode: 'hudx.examples.mode',
  theme: 'hudx.examples.theme',
  locale: 'hudx.examples.locale',
  classicActiveExample: 'hudx.examples.classic.activeExample',
  modernActiveCategory: 'hudx.examples.modern.activeCategory',
  modernActiveExampleId: 'hudx.examples.modern.activeExampleId',
} as const;

export const EXAMPLES_LOCALES = [
  'en',
  'zh-CN',
  'zh-HK',
] as const satisfies readonly Locale[];

export const EXAMPLES_CATEGORIES = [
  'bar',
  'line',
  'pie',
  'scatter',
  'sub-components',
  'bundle',
] as const;

export const EXAMPLES_LAYOUT = {
  sidebarWidth: 280,
  sidebarPadding: 20,
  mainPadding: 40,
} as const;

export const EXAMPLES_CHART_PREVIEW = {
  width: 600,
  height: 400,
} as const;

export const EXAMPLES_RENDERER_CANVAS = {
  width: 800,
  height: 300,
  performanceHeight: 600,
} as const;

export const EXAMPLES_COLORS = {
  border: '#D6D8DA',
  controlBorder: '#ddd',
  secondaryText: '#666',
} as const;
