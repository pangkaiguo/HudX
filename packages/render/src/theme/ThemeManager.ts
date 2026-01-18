/**
 * ThemeManager - Manages theme configuration
 */

import type { Theme, ThemeConfig, ThemeToken } from '../types';

export class ThemeManager {
  private static _themes: Map<Theme, ThemeConfig> = new Map();
  private static _tokens: Map<Theme, ThemeToken> = new Map();
  private static _currentTheme: Theme = 'light';
  private static _themeListeners: Set<(theme: Theme) => void> = new Set();

  static {
    // Default Light Token
    const lightToken: ThemeToken = {
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
      colorTooltipBackground: 'rgba(50, 50, 50, 0.9)',
      colorTooltipText: '#ffffff',
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
    ThemeManager.registerToken('light', lightToken);

    // Default Dark Token
    const darkToken: ThemeToken = {
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
      colorTooltipBackground: 'rgba(200, 200, 200, 0.9)',
      colorTooltipText: '#1e1e1e',
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
    ThemeManager.registerToken('dark', darkToken);
  }

  /**
   * Register theme token
   */
  static registerToken(theme: string, token: ThemeToken): void {
    const normalizedTheme = theme.toLowerCase() as Theme;
    const currentToken = ThemeManager._tokens.get(normalizedTheme) || {};
    const newToken = { ...currentToken, ...token };
    ThemeManager._tokens.set(normalizedTheme, newToken);

    // Map token to theme config
    const config: ThemeConfig = {
      backgroundColor: String(newToken.colorBackground),
      textColor: String(newToken.colorText),
      borderColor: String(newToken.colorBorder),
      gridColor: String(newToken.colorGrid),
      axisLineColor: String(newToken.colorAxisLine),
      axisLabelColor: String(newToken.colorAxisLabel),
      seriesColors: newToken.seriesColors as string[],
      color: newToken.seriesColors as string[],
      shadowColor: String(newToken.colorShadow),
      maskColor: String(newToken.colorMask),
      decalColor: String(newToken.colorDecal),
      tooltipBackgroundColor: String(newToken.colorTooltipBackground),
      tooltipTextColor: String(newToken.colorTooltipText),
      legendTextColor: String(newToken.colorLegendText),
      fontFamily: String(newToken.fontFamily),
      fontSize: Number(newToken.fontSize),
      token: newToken,
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
    ThemeManager._themeListeners.forEach((listener) => listener(normalizedTheme));
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
