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

  it('notifies listeners on theme change', () => {
    const prev = ThemeManager.getCurrentTheme();
    const listener = vi.fn();
    const off = ThemeManager.onThemeChange(listener);
    ThemeManager.setCurrentTheme('dark');
    expect(listener).toHaveBeenCalledWith('dark');
    off();
    ThemeManager.setCurrentTheme(prev);
  });
});

