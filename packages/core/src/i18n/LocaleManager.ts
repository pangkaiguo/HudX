/**
 * LocaleManager - Manages internationalization
 */

import { Locale, LocaleConfig } from '../types';

export class LocaleManager {
  private static _locales: Map<Locale, LocaleConfig> = new Map();

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

    // Japanese
    LocaleManager._locales.set('ja', {
      'chart.title': 'チャート',
      'chart.legend': '凡例',
      'chart.tooltip': 'ツールチップ',
      'axis.x': 'X軸',
      'axis.y': 'Y軸',
      'series.name': 'シリーズ',
      'data.empty': 'データなし',
      'data.loading': '読み込み中...',
      'data.error': 'データ読み込みエラー',
    });

    // Korean
    LocaleManager._locales.set('ko', {
      'chart.title': '차트',
      'chart.legend': '범례',
      'chart.tooltip': '툴팁',
      'axis.x': 'X축',
      'axis.y': 'Y축',
      'series.name': '시리즈',
      'data.empty': '데이터 없음',
      'data.loading': '로딩 중...',
      'data.error': '데이터 로딩 오류',
    });

    // French
    LocaleManager._locales.set('fr', {
      'chart.title': 'Graphique',
      'chart.legend': 'Légende',
      'chart.tooltip': 'Info-bulle',
      'axis.x': 'Axe X',
      'axis.y': 'Axe Y',
      'series.name': 'Série',
      'data.empty': 'Aucune donnée',
      'data.loading': 'Chargement...',
      'data.error': 'Erreur de chargement des données',
    });

    // German
    LocaleManager._locales.set('de', {
      'chart.title': 'Diagramm',
      'chart.legend': 'Legende',
      'chart.tooltip': 'Tooltip',
      'axis.x': 'X-Achse',
      'axis.y': 'Y-Achse',
      'series.name': 'Serie',
      'data.empty': 'Keine Daten',
      'data.loading': 'Lädt...',
      'data.error': 'Fehler beim Laden der Daten',
    });

    // Spanish
    LocaleManager._locales.set('es', {
      'chart.title': 'Gráfico',
      'chart.legend': 'Leyenda',
      'chart.tooltip': 'Información',
      'axis.x': 'Eje X',
      'axis.y': 'Eje Y',
      'series.name': 'Serie',
      'data.empty': 'Sin datos',
      'data.loading': 'Cargando...',
      'data.error': 'Error al cargar datos',
    });

    // Portuguese
    LocaleManager._locales.set('pt', {
      'chart.title': 'Gráfico',
      'chart.legend': 'Legenda',
      'chart.tooltip': 'Dica',
      'axis.x': 'Eixo X',
      'axis.y': 'Eixo Y',
      'series.name': 'Série',
      'data.empty': 'Sem dados',
      'data.loading': 'Carregando...',
      'data.error': 'Erro ao carregar dados',
    });

    // Russian
    LocaleManager._locales.set('ru', {
      'chart.title': 'График',
      'chart.legend': 'Легенда',
      'chart.tooltip': 'Подсказка',
      'axis.x': 'Ось X',
      'axis.y': 'Ось Y',
      'series.name': 'Серия',
      'data.empty': 'Нет данных',
      'data.loading': 'Загрузка...',
      'data.error': 'Ошибка загрузки данных',
    });
  }

  /**
   * Get locale configuration
   */
  static getLocale(locale: Locale): LocaleConfig {
    // Try exact match first
    if (LocaleManager._locales.has(locale)) {
      return LocaleManager._locales.get(locale)!;
    }

    // Try language code (e.g., 'zh-CN' -> 'zh')
    const lang = locale.split('-')[0] as Locale;
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
  static registerLocale(locale: Locale, config: LocaleConfig): void {
    LocaleManager._locales.set(locale, config);
  }

  /**
   * Get all registered locales
   */
  static getLocales(): Locale[] {
    return Array.from(LocaleManager._locales.keys());
  }
}

