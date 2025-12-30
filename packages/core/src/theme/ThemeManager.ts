/**
 * ThemeManager - Manages theme configuration
 */

import type { Theme, ThemeConfig, ThemeToken } from '../types';

export class ThemeManager {
  private static _themes: Map<Theme, ThemeConfig> = new Map();
  private static _tokens: Map<Theme, ThemeToken> = new Map();

  static {
    // Default Light Token
    const lightToken: ThemeToken = {
      colorText: '#333333',
      colorBackground: '#ffffff',
      colorBorder: '#cccccc',
      colorGrid: '#e6e6e6',
      colorAxisLine: '#e0e0e0',
      colorAxisLabel: '#999999',
      colorTooltipBackground: 'rgba(50, 50, 50, 0.9)',
      colorTooltipText: '#ffffff',
      colorLegendText: '#333333',
      colorShadow: 'rgba(0, 0, 0, 0.6)',
      colorMask: 'rgba(255, 255, 255, 0.8)',
      colorDecal: 'rgba(0, 0, 0, 0.2)',
      fontFamily: 'sans-serif',
      fontSize: 12,
      seriesColors: [
        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
      ]
    };
    ThemeManager.registerToken('light', lightToken);

    // Default Dark Token
    const darkToken: ThemeToken = {
      colorText: '#e0e0e0',
      colorBackground: '#1e1e1e',
      colorBorder: '#444444',
      colorGrid: '#2d2d2d',
      colorAxisLine: '#888888',
      colorAxisLabel: '#aaaaaa',
      colorTooltipBackground: 'rgba(200, 200, 200, 0.9)',
      colorTooltipText: '#1e1e1e',
      colorLegendText: '#e0e0e0',
      colorShadow: 'rgba(0, 0, 0, 0.6)',
      colorMask: 'rgba(255, 255, 255, 0.8)',
      colorDecal: 'rgba(0, 0, 0, 0.2)',
      fontFamily: 'sans-serif',
      fontSize: 12,
      seriesColors: [
        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
      ]
    };
    ThemeManager.registerToken('dark', darkToken);
  }

  /**
   * Register theme token
   */
  static registerToken(theme: string, token: ThemeToken): void {
    const currentToken = ThemeManager._tokens.get(theme) || {};
    const newToken = { ...currentToken, ...token };
    ThemeManager._tokens.set(theme, newToken);

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
      token: newToken
    };

    ThemeManager.registerTheme(theme, config);
  }

  /**
   * Get theme configuration
   */
  static getTheme(theme: Theme): ThemeConfig {
    const config = ThemeManager._themes.get(theme);
    if (config) return config;
    return ThemeManager._themes.get('light')!;
  }

  /**
   * Register custom theme
   */
  static registerTheme(theme: string, config: ThemeConfig): void {
    ThemeManager._themes.set(theme as Theme, config);
  }

  /**
   * Get all registered themes
   */
  static getThemes(): string[] {
    return Array.from(ThemeManager._themes.keys());
  }
}

