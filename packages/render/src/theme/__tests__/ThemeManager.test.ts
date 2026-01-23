import { describe, it, expect, vi } from 'vitest';
import { ThemeManager } from '../ThemeManager';

describe('ThemeManager', () => {
  it('uses light as default current theme', () => {
    expect(ThemeManager.getCurrentTheme()).toBe('light');
    expect(ThemeManager.getTheme().backgroundColor).toBe(
      ThemeManager.getTheme('light').backgroundColor,
    );
  });

  it('supports switching current theme', () => {
    const prev = ThemeManager.getCurrentTheme();
    ThemeManager.setCurrentTheme('dark');
    expect(ThemeManager.getCurrentTheme()).toBe('dark');
    expect(ThemeManager.getTheme().backgroundColor).toBe(
      ThemeManager.getTheme('dark').backgroundColor,
    );
    ThemeManager.setCurrentTheme(prev);
  });

  it('normalizes theme key on token registration', () => {
    const original = ThemeManager.getTheme('light').backgroundColor;
    ThemeManager.registerToken('Light', { colorBackground: '#abcdef' });
    expect(ThemeManager.getTheme('light').backgroundColor).toBe('#abcdef');
    ThemeManager.registerToken('light', { colorBackground: original });
  });

  it('provides complete defaults for custom themes', () => {
    ThemeManager.registerToken('custom', { colorText: '#111111' });
    const theme = ThemeManager.getTheme('custom');
    expect(theme.textColor).toBe('#111111');
    expect(theme.backgroundColor).toBeTruthy();
    expect(theme.backgroundColor).not.toBe('undefined');
    expect(theme.borderColor).toBeTruthy();
    expect(theme.fontFamily).toBeTruthy();
    expect(Number.isFinite(theme.fontSize)).toBe(true);
    expect(Array.isArray(theme.seriesColors)).toBe(true);
    expect(theme.seriesColors.length).toBeGreaterThan(0);
    expect(theme.token.colorTextSecondary).toBeTruthy();
  });

  it('maps component tokens to ThemeConfig fields', () => {
    const originalToken = { ...ThemeManager.getTheme('light').token } as any;

    ThemeManager.registerToken('light', {
      colorTextSecondary: '#123456',
      colorFillPage: '#fafafa',
      colorBorderSecondary: '#bcbcbc',
      colorCodeBackground: '#101010',
      colorCodeGutterBackground: '#202020',
      colorCodeText: '#303030',
      colorCodeGutterText: '#404040',
      seriesColors: ['#aa0000', '#00aa00'],
      heatmapColors: ['#111111', '#222222'],
    });

    const theme = ThemeManager.getTheme('light');
    expect(theme.textColorSecondary).toBe('#123456');
    expect(theme.fillPageColor).toBe('#fafafa');
    expect(theme.borderSecondaryColor).toBe('#bcbcbc');
    expect(theme.codeBackgroundColor).toBe('#101010');
    expect(theme.codeGutterBackgroundColor).toBe('#202020');
    expect(theme.codeTextColor).toBe('#303030');
    expect(theme.codeGutterTextColor).toBe('#404040');
    expect(theme.seriesColors).toEqual(['#aa0000', '#00aa00']);
    expect(theme.heatmapColors).toEqual(['#111111', '#222222']);
    expect(theme.color).toEqual(['#aa0000', '#00aa00']);

    ThemeManager.registerToken('light', originalToken);
  });

  it('notifies listeners on theme change', () => {
    const prev = ThemeManager.getCurrentTheme();
    const listener = vi.fn();
    const off = ThemeManager.onThemeChange(listener);
    ThemeManager.setCurrentTheme('dark');
    expect(listener).toHaveBeenCalledWith('dark');
    off();
    ThemeManager.setCurrentTheme(prev);
  });

  it('uses expected tooltip defaults for light and dark themes', () => {
    const light = ThemeManager.getTheme('light');
    expect(light.tooltipBackgroundColor).toBe('rgba(247, 247, 248, 0.9)');
    expect(light.tooltipTextColor).toBe('#333D47');
    expect(light.tooltipBorderColor).toBe('#E6E8E9');
    expect(light.tooltipBoxShadow).toBe('0px 2px 10px rgba(0, 0, 0, 0.08)');
    expect(light.tooltipSeriesNameColor).toBe('#333D47');
    expect(light.tooltipSubitemNameColor).toBe('#333D47');
    expect(light.tooltipValueColor).toBe('#5B636B');

    const dark = ThemeManager.getTheme('dark');
    expect(dark.tooltipBackgroundColor).toBe('rgba(30, 30, 31, 0.9)');
    expect(dark.tooltipTextColor).toBe('#ffffff');
    expect(dark.tooltipBorderColor).toBe('#565657');
    expect(dark.tooltipBoxShadow).toBe('0px 2px 10px rgba(0, 0, 0, 0.25)');
    expect(dark.tooltipSeriesNameColor).toBe('#ffffff');
    expect(dark.tooltipSubitemNameColor).toBe('#F7F7F8');
    expect(dark.tooltipValueColor).toBe('#C6C6C6');
  });
});
