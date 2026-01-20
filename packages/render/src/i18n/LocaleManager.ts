/**
 * LocaleManager - Manages internationalization
 */

import type { Locale, LocaleConfig } from '../types';

export class LocaleManager {
  private static _locales: Map<Locale, LocaleConfig> = new Map();

  private static normalizeLocale(locale: Locale): Locale {
    if (typeof locale !== 'string' || !locale) return 'en';

    const raw = locale.trim();
    if (!raw) return 'en';

    const normalized = raw.replace(/_/g, '-');
    const parts = normalized.split('-').filter(Boolean);
    if (parts.length === 0) return 'en';

    const language = parts[0].toLowerCase();
    let script: string | null = null;
    let region: string | null = null;

    if (parts.length >= 2) {
      const p1 = parts[1];
      if (p1.length === 4) {
        script = p1[0].toUpperCase() + p1.slice(1).toLowerCase();
        if (parts.length >= 3) region = parts[2].toUpperCase();
      } else {
        region = p1.toUpperCase();
      }
    }

    if (language === 'zh') {
      const regionUpper = (region || '').toUpperCase();
      const scriptUpper = (script || '').toUpperCase();

      if (scriptUpper === 'HANT') {
        if (regionUpper === 'HK' || regionUpper === 'MO') return 'zh-HK';
        if (regionUpper === 'TW') return 'zh-TW';
        return 'zh-TW';
      }

      if (scriptUpper === 'HANS') {
        if (regionUpper === 'CN' || regionUpper === 'SG') return 'zh-CN';
        return 'zh-CN';
      }

      if (regionUpper === 'HK' || regionUpper === 'MO') return 'zh-HK';
      if (regionUpper === 'TW') return 'zh-TW';
      if (regionUpper === 'CN' || regionUpper === 'SG') return 'zh-CN';

      const p1Upper = (parts[1] || '').toUpperCase();
      if (p1Upper === 'CHT') return 'zh-TW';
      if (p1Upper === 'CHS') return 'zh-CN';
    }

    if (script && region) return `${language}-${script}-${region}` as Locale;
    if (region) return `${language}-${region}` as Locale;
    return language as Locale;
  }

  static {
    // English
    LocaleManager._locales.set('en', {
      'chart.title': 'Chart',
      'chart.legend': 'Legend',
      'chart.tooltip': 'Tooltip',
      'axis.x': 'X Axis',
      'axis.y': 'Y Axis',
      'series.name': 'Series',
      'data.empty': 'No data',
      'data.loading': 'Loading...',
      'data.error': 'Error loading data',
    });

    // Chinese Simplified
    LocaleManager._locales.set('zh', {
      'chart.title': '图表',
      'chart.legend': '图例',
      'chart.tooltip': '提示框',
      'axis.x': 'X 轴',
      'axis.y': 'Y 轴',
      'series.name': '系列',
      'data.empty': '暂无数据',
      'data.loading': '加载中...',
      'data.error': '数据加载错误',
    });
    LocaleManager._locales.set('zh-CN', LocaleManager._locales.get('zh')!);

    // Chinese Traditional
    LocaleManager._locales.set('zh-HK', {
      'chart.title': '圖表',
      'chart.legend': '圖例',
      'chart.tooltip': '提示框',
      'axis.x': 'X 軸',
      'axis.y': 'Y 軸',
      'series.name': '系列',
      'data.empty': '暫無數據',
      'data.loading': '載入中...',
      'data.error': '數據載入錯誤',
    });

    // Chinese Traditional
    LocaleManager._locales.set('zh-TW', {
      'chart.title': '圖表',
      'chart.legend': '圖例',
      'chart.tooltip': '提示框',
      'axis.x': 'X 軸',
      'axis.y': 'Y 軸',
      'series.name': '系列',
      'data.empty': '暫無數據',
      'data.loading': '載入中...',
      'data.error': '數據載入錯誤',
    });
  }

  /**
   * Get locale configuration
   */
  static getLocale(locale: Locale): LocaleConfig {
    const normalizedLocale = LocaleManager.normalizeLocale(locale);
    // Try exact match first
    if (LocaleManager._locales.has(normalizedLocale)) {
      return LocaleManager._locales.get(normalizedLocale)!;
    }

    // Try language code (e.g., 'zh-CN' -> 'zh')
    const lang = String(normalizedLocale).split('-')[0] as Locale;
    if (LocaleManager._locales.has(lang)) {
      return LocaleManager._locales.get(lang)!;
    }

    // Fallback to English
    return LocaleManager._locales.get('en')!;
  }

  /**
   * Get translated text
   */
  static t(locale: Locale, key: string, defaultValue?: string): string {
    const config = LocaleManager.getLocale(locale);
    return config[key] || defaultValue || key;
  }

  /**
   * Register custom locale
   */
  static registerLocale(locale: string, config: LocaleConfig): void {
    LocaleManager._locales.set(locale as Locale, config);
  }

  /**
   * Get all registered locales
   */
  static getLocales(): string[] {
    return Array.from(LocaleManager._locales.keys());
  }
}
