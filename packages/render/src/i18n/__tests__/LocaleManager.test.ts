import { describe, it, expect } from 'vitest';
import { LocaleManager } from '../LocaleManager';

describe('LocaleManager', () => {
  it('should translate with exact locale match', () => {
    expect(LocaleManager.t('en', 'data.loading')).toBe('Loading...');
    expect(LocaleManager.t('zh-CN', 'data.loading')).toBe('加载中...');
    expect(LocaleManager.t('zh-HK', 'data.loading')).toBe('載入中...');
    expect(LocaleManager.t('zh-TW', 'data.loading')).toBe('載入中...');
  });

  it('should normalize zh locale variants', () => {
    expect(LocaleManager.t('zh-hk', 'data.loading')).toBe('載入中...');
    expect(LocaleManager.t('zh_HK', 'data.loading')).toBe('載入中...');
    expect(LocaleManager.t('zh-Hant-HK', 'data.loading')).toBe('載入中...');
    expect(LocaleManager.t('zh-hant-tw', 'data.loading')).toBe('載入中...');
    expect(LocaleManager.t('zh-hans-cn', 'data.loading')).toBe('加载中...');
    expect(LocaleManager.t('zh-CHT', 'data.loading')).toBe('載入中...');
    expect(LocaleManager.t('zh-CHS', 'data.loading')).toBe('加载中...');
  });

  it('should fallback to language code', () => {
    expect(LocaleManager.t('zh', 'data.loading')).toBe('加载中...');
  });

  it('should fallback to English for unknown locale', () => {
    expect(LocaleManager.t('fr', 'data.loading')).toBe('Loading...');
  });

  it('should use defaultValue when key is missing', () => {
    expect(LocaleManager.t('en', 'missing.key', 'fallback')).toBe('fallback');
    expect(LocaleManager.t('en', 'missing.key')).toBe('missing.key');
  });
});
