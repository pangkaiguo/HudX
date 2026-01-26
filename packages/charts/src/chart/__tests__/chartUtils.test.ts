import {
  getSeriesDisplayName,
  findSeriesIndexByDisplayName,
  resolveAnimationDelay,
} from '../chartUtils';
import { describe, it, expect, vi } from 'vitest';

describe('chartUtils', () => {
  describe('getSeriesDisplayName', () => {
    it('should return series name if provided', () => {
      const t = vi.fn((key, defaultVal) => defaultVal || key);
      const seriesItem = { name: 'MySeries' };
      expect(getSeriesDisplayName(t, seriesItem, 0)).toBe('MySeries');
    });

    it('should return default name if series name is missing', () => {
      const t = vi.fn((key, defaultVal) => defaultVal || key);
      const seriesItem = {};
      expect(getSeriesDisplayName(t, seriesItem, 0)).toBe('Series-1');
      expect(t).toHaveBeenCalledWith('series.name', 'Series');
    });
  });

  describe('findSeriesIndexByDisplayName', () => {
    it('should find series index by name', () => {
      const t = vi.fn((key, defaultVal) => defaultVal || key);
      const series = [{ name: 'A' }, { name: 'B' }];
      expect(findSeriesIndexByDisplayName(t, series, 'B')).toBe(1);
    });

    it('should find series index by generated name', () => {
      const t = vi.fn((key, defaultVal) => defaultVal || key);
      const series = [{}, {}];
      expect(findSeriesIndexByDisplayName(t, series, 'Series-2')).toBe(1);
    });

    it('should return -1 if not found', () => {
      const t = vi.fn((key, defaultVal) => defaultVal || key);
      const series = [{ name: 'A' }];
      expect(findSeriesIndexByDisplayName(t, series, 'B')).toBe(-1);
    });

    it('should handle empty series', () => {
      const t = vi.fn();
      expect(findSeriesIndexByDisplayName(t, undefined as any, 'A')).toBe(-1);
    });
  });

  describe('resolveAnimationDelay', () => {
    it('should return 0 if animationDelay is not number or function', () => {
      expect(resolveAnimationDelay(undefined, 0)).toBe(0);
      expect(resolveAnimationDelay('string' as any, 0)).toBe(0);
    });

    it('should return value if animationDelay is number', () => {
      expect(resolveAnimationDelay(100, 0)).toBe(100);
    });

    it('should call function and return value if animationDelay is function', () => {
      const delayFn = vi.fn(() => 200);
      expect(resolveAnimationDelay(delayFn, 5)).toBe(200);
      expect(delayFn).toHaveBeenCalledWith(5);
    });

    it('should return 0 if function returns non-number', () => {
      const delayFn = vi.fn(() => 'invalid' as any);
      expect(resolveAnimationDelay(delayFn, 0)).toBe(0);
    });
  });
});
