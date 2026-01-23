/**
 * ThemeManager - Manages theme configuration
 */

import type { Theme, ThemeConfig, ThemeToken } from '../types';

const DEFAULT_LIGHT_TOKEN: ThemeToken = {
  colorText: '#333333',
  colorTextSecondary: '#666666',
  colorTextTertiary: '#999999',
  colorBackground: '#ffffff',
  colorFillPage: '#f5f7fa',
  colorFillContainer: '#ffffff',
  colorFillContainerAlt: '#f9f9f9',
  colorFillHover: '#f0f0f0',
  colorBorder: '#cccccc',
  colorBorderSecondary: '#D6D8DA',
  colorGrid: '#e6e6e6',
  colorAxisLine: '#D6D8DA',
  colorAxisLabel: '#999999',
  colorTooltipBackground: 'rgba(247, 247, 248, 0.9)',
  colorTooltipText: '#333D47',
  colorTooltipBorder: '#E6E8E9',
  boxShadowTooltip: '0px 2px 10px rgba(0, 0, 0, 0.08)',
  colorTooltipSeriesName: '#333D47',
  colorTooltipSubitemName: '#333D47',
  colorTooltipValue: '#5B636B',
  colorLegendText: '#333333',
  colorTextOnSeries: '#ffffff',
  colorPrimary: '#5470c6',
  colorPrimaryText: '#ffffff',
  colorShadow: 'rgba(0, 0, 0, 0.6)',
  colorMask: 'rgba(255, 255, 255, 0.8)',
  colorDecal: 'rgba(0, 0, 0, 0.2)',
  colorCodeBackground: '#f5f5f5',
  colorCodeGutterBackground: '#D6D8DA',
  colorCodeText: '#333333',
  colorCodeGutterText: '#999999',
  fontFamily: 'sans-serif',
  fontSize: 12,
  heatmapColors: ['#313695', '#4575b4', '#fee090', '#d73027'],
  seriesColors: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
};

const DEFAULT_DARK_TOKEN: ThemeToken = {
  colorText: '#D6D8DA',
  colorTextSecondary: '#b0b0b0',
  colorTextTertiary: '#888888',
  colorBackground: '#1e1e1e',
  colorFillPage: '#1a1a1a',
  colorFillContainer: '#222222',
  colorFillContainerAlt: '#2a2a2a',
  colorFillHover: '#333333',
  colorBorder: '#444444',
  colorBorderSecondary: '#333333',
  colorGrid: '#2d2d2d',
  colorAxisLine: '#888888',
  colorAxisLabel: '#aaaaaa',
  colorTooltipBackground: 'rgba(30, 30, 31, 0.9)',
  colorTooltipText: '#ffffff',
  colorTooltipBorder: '#565657',
  boxShadowTooltip: '0px 2px 10px rgba(0, 0, 0, 0.25)',
  colorTooltipSeriesName: '#ffffff',
  colorTooltipSubitemName: '#F7F7F8',
  colorTooltipValue: '#C6C6C6',
  colorLegendText: '#D6D8DA',
  colorTextOnSeries: '#ffffff',
  colorPrimary: '#5470c6',
  colorPrimaryText: '#ffffff',
  colorShadow: 'rgba(0, 0, 0, 0.6)',
  colorMask: 'rgba(255, 255, 255, 0.8)',
  colorDecal: 'rgba(0, 0, 0, 0.2)',
  colorCodeBackground: '#1e1e1e',
  colorCodeGutterBackground: '#252526',
  colorCodeText: '#d4d4d4',
  colorCodeGutterText: '#858585',
  fontFamily: 'sans-serif',
  fontSize: 12,
  heatmapColors: ['#313695', '#4575b4', '#fee090', '#d73027'],
  seriesColors: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
};

export class ThemeManager {
  private static _themes: Map<Theme, ThemeConfig> = new Map();
  private static _tokens: Map<Theme, ThemeToken> = new Map();
  private static _currentTheme: Theme = 'light';
  private static _themeListeners: Set<(theme: Theme) => void> = new Set();

  static {
    // Default Light Token
    ThemeManager.registerToken('light', DEFAULT_LIGHT_TOKEN);

    // Default Dark Token
    ThemeManager.registerToken('dark', DEFAULT_DARK_TOKEN);
  }

  /**
   * Register theme token
   */
  static registerToken(theme: string, token: ThemeToken): void {
    const normalizedTheme = theme.toLowerCase() as Theme;
    const baseToken =
      normalizedTheme === 'dark' ? DEFAULT_DARK_TOKEN : DEFAULT_LIGHT_TOKEN;
    const currentToken = ThemeManager._tokens.get(normalizedTheme) || {};
    const mergedToken = { ...currentToken, ...token };
    const resolvedToken: ThemeToken = { ...baseToken, ...mergedToken };

    const toStringOr = (v: unknown, fallback: string): string => {
      if (typeof v === 'string' && v) return v;
      if (v === undefined || v === null) return fallback;
      const s = String(v);
      return s && s !== 'undefined' && s !== 'null' ? s : fallback;
    };
    const toNumberOr = (v: unknown, fallback: number): number => {
      const n = typeof v === 'number' ? v : Number(v);
      return Number.isFinite(n) ? n : fallback;
    };
    const toStringArrayOr = (v: unknown, fallback: string[]): string[] => {
      if (!Array.isArray(v) || v.length === 0) return fallback.slice();
      return v.map((x) => String(x));
    };

    const seriesColors = toStringArrayOr(
      resolvedToken.seriesColors,
      (baseToken.seriesColors as string[]) ?? [],
    );
    const heatmapColors = toStringArrayOr(
      resolvedToken.heatmapColors,
      (baseToken.heatmapColors as string[]) ?? [],
    );

    resolvedToken.seriesColors = seriesColors;
    resolvedToken.heatmapColors = heatmapColors;
    resolvedToken.fontFamily = toStringOr(
      resolvedToken.fontFamily,
      toStringOr(baseToken.fontFamily, 'sans-serif'),
    );
    resolvedToken.fontSize = toNumberOr(
      resolvedToken.fontSize,
      toNumberOr(baseToken.fontSize, 12),
    );

    ThemeManager._tokens.set(normalizedTheme, resolvedToken);

    // Map token to theme config
    const config: ThemeConfig = {
      backgroundColor: toStringOr(
        resolvedToken.colorBackground,
        String(baseToken.colorBackground),
      ),
      textColor: toStringOr(
        resolvedToken.colorText,
        String(baseToken.colorText),
      ),
      textColorSecondary: toStringOr(
        resolvedToken.colorTextSecondary,
        toStringOr(baseToken.colorTextSecondary, ''),
      ),
      textColorTertiary: toStringOr(
        resolvedToken.colorTextTertiary,
        toStringOr(baseToken.colorTextTertiary, ''),
      ),
      borderColor: toStringOr(
        resolvedToken.colorBorder,
        String(baseToken.colorBorder),
      ),
      borderSecondaryColor: toStringOr(
        resolvedToken.colorBorderSecondary,
        toStringOr(baseToken.colorBorderSecondary, ''),
      ),
      gridColor: toStringOr(
        resolvedToken.colorGrid,
        String(baseToken.colorGrid),
      ),
      axisLineColor: toStringOr(
        resolvedToken.colorAxisLine,
        String(baseToken.colorAxisLine),
      ),
      axisLabelColor: toStringOr(
        resolvedToken.colorAxisLabel,
        String(baseToken.colorAxisLabel),
      ),
      splitLineColor: toStringOr(
        resolvedToken.colorGrid,
        String(baseToken.colorGrid),
      ),
      seriesColors,
      color: seriesColors,
      heatmapColors,
      fillPageColor: toStringOr(
        resolvedToken.colorFillPage,
        toStringOr(baseToken.colorFillPage, ''),
      ),
      fillContainerColor: toStringOr(
        resolvedToken.colorFillContainer,
        toStringOr(baseToken.colorFillContainer, ''),
      ),
      fillContainerAltColor: toStringOr(
        resolvedToken.colorFillContainerAlt,
        toStringOr(baseToken.colorFillContainerAlt, ''),
      ),
      fillHoverColor: toStringOr(
        resolvedToken.colorFillHover,
        toStringOr(baseToken.colorFillHover, ''),
      ),
      codeBackgroundColor: toStringOr(
        resolvedToken.colorCodeBackground,
        toStringOr(baseToken.colorCodeBackground, ''),
      ),
      codeGutterBackgroundColor: toStringOr(
        resolvedToken.colorCodeGutterBackground,
        toStringOr(baseToken.colorCodeGutterBackground, ''),
      ),
      codeTextColor: toStringOr(
        resolvedToken.colorCodeText,
        toStringOr(baseToken.colorCodeText, ''),
      ),
      codeGutterTextColor: toStringOr(
        resolvedToken.colorCodeGutterText,
        toStringOr(baseToken.colorCodeGutterText, ''),
      ),
      textColorOnSeries: toStringOr(
        resolvedToken.colorTextOnSeries,
        toStringOr(baseToken.colorTextOnSeries, ''),
      ),
      primaryColor: toStringOr(
        resolvedToken.colorPrimary,
        toStringOr(baseToken.colorPrimary, seriesColors[0] || ''),
      ),
      primaryTextColor: toStringOr(
        resolvedToken.colorPrimaryText,
        toStringOr(baseToken.colorPrimaryText, ''),
      ),
      shadowColor: toStringOr(
        resolvedToken.colorShadow,
        String(baseToken.colorShadow),
      ),
      maskColor: toStringOr(
        resolvedToken.colorMask,
        String(baseToken.colorMask),
      ),
      decalColor: toStringOr(
        resolvedToken.colorDecal,
        String(baseToken.colorDecal),
      ),
      tooltipBackgroundColor: toStringOr(
        resolvedToken.colorTooltipBackground,
        String(baseToken.colorTooltipBackground),
      ),
      tooltipTextColor: toStringOr(
        resolvedToken.colorTooltipText,
        String(baseToken.colorTooltipText),
      ),
      tooltipBorderColor: toStringOr(
        resolvedToken.colorTooltipBorder,
        toStringOr(
          baseToken.colorTooltipBorder,
          String(baseToken.colorBorderSecondary),
        ),
      ),
      tooltipBoxShadow: toStringOr(
        resolvedToken.boxShadowTooltip,
        toStringOr(baseToken.boxShadowTooltip, ''),
      ),
      tooltipSeriesNameColor: toStringOr(
        resolvedToken.colorTooltipSeriesName,
        toStringOr(
          baseToken.colorTooltipSeriesName,
          String(resolvedToken.colorTooltipText),
        ),
      ),
      tooltipSubitemNameColor: toStringOr(
        resolvedToken.colorTooltipSubitemName,
        toStringOr(
          baseToken.colorTooltipSubitemName,
          String(resolvedToken.colorTooltipText),
        ),
      ),
      tooltipValueColor: toStringOr(
        resolvedToken.colorTooltipValue,
        toStringOr(
          baseToken.colorTooltipValue,
          String(resolvedToken.colorTooltipText),
        ),
      ),
      legendTextColor: toStringOr(
        resolvedToken.colorLegendText,
        String(baseToken.colorLegendText),
      ),
      fontFamily: String(resolvedToken.fontFamily),
      fontSize: Number(resolvedToken.fontSize),
      token: resolvedToken,
    };

    ThemeManager.registerTheme(normalizedTheme, config);
  }

  static registerHudBaseTokens(tokens: Record<string, ThemeToken>): void {
    for (const [theme, token] of Object.entries(tokens)) {
      ThemeManager.registerToken(theme, token);
    }
  }

  /**
   * Get theme configuration
   */
  static getTheme(theme?: Theme): ThemeConfig {
    const normalizedTheme =
      typeof theme === 'string'
        ? (theme.toLowerCase() as Theme)
        : (theme ?? ThemeManager._currentTheme);
    const config = ThemeManager._themes.get(normalizedTheme);
    if (config) return config;
    return ThemeManager._themes.get('light')!;
  }

  static getCurrentTheme(): Theme {
    return ThemeManager._currentTheme;
  }

  static setCurrentTheme(theme: Theme): void {
    const normalizedTheme =
      typeof theme === 'string' ? (theme.toLowerCase() as Theme) : theme;
    if (ThemeManager._currentTheme === normalizedTheme) return;
    ThemeManager._currentTheme = normalizedTheme;
    ThemeManager._themeListeners.forEach((listener) =>
      listener(normalizedTheme),
    );
  }

  static onThemeChange(listener: (theme: Theme) => void): () => void {
    ThemeManager._themeListeners.add(listener);
    return () => {
      ThemeManager._themeListeners.delete(listener);
    };
  }

  /**
   * Register custom theme
   */
  static registerTheme(theme: string, config: ThemeConfig): void {
    ThemeManager._themes.set(theme.toLowerCase() as Theme, config);
  }

  /**
   * Get all registered themes
   */
  static getThemes(): string[] {
    return Array.from(ThemeManager._themes.keys());
  }
}
