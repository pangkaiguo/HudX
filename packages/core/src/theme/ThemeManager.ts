/**
 * ThemeManager - Manages theme configuration
 */

import { Theme, ThemeConfig } from '../types';

export class ThemeManager {
  private static _themes: Map<Theme, ThemeConfig> = new Map();

  static {
    // Light theme
    const lightColors = [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
      '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ];
    ThemeManager._themes.set('light', {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      borderColor: '#cccccc',
      gridColor: '#e6e6e6',
      axisLineColor: '#333333',
      axisLabelColor: '#666666',
      seriesColors: lightColors,
      color: lightColors,
      tooltipBackgroundColor: 'rgba(50, 50, 50, 0.9)',
      tooltipTextColor: '#ffffff',
      legendTextColor: '#333333',
    });

    // Dark theme
    const darkColors = [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
      '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ];
    ThemeManager._themes.set('dark', {
      backgroundColor: '#1e1e1e',
      textColor: '#e0e0e0',
      borderColor: '#444444',
      gridColor: '#2d2d2d',
      axisLineColor: '#888888',
      axisLabelColor: '#aaaaaa',
      seriesColors: darkColors,
      color: darkColors,
      tooltipBackgroundColor: 'rgba(200, 200, 200, 0.9)',
      tooltipTextColor: '#1e1e1e',
      legendTextColor: '#e0e0e0',
    });
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

