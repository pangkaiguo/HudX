import { describe, it, expect } from 'vitest';
import {
  parseColor,
  rgbaToString,
  lighten,
  darken,
  lerp,
  lift,
  toHex,
  toRgbaWithOpacity,
} from '../color';

describe('color', () => {
  describe('parseColor', () => {
    it('should parse hex color', () => {
      expect(parseColor('#000')).toEqual([0, 0, 0, 1]);
      expect(parseColor('#000000')).toEqual([0, 0, 0, 1]);
      expect(parseColor('#fff')).toEqual([255, 255, 255, 1]);
      expect(parseColor('#ffffff')).toEqual([255, 255, 255, 1]);
      expect(parseColor('#ff0000')).toEqual([255, 0, 0, 1]);
      expect(parseColor('#00ff00')).toEqual([0, 255, 0, 1]);
      expect(parseColor('#0000ff')).toEqual([0, 0, 255, 1]);
    });

    it('should parse hex color with alpha', () => {
      expect(parseColor('#00000000')).toEqual([0, 0, 0, 0]);
      expect(parseColor('#000000ff')).toEqual([0, 0, 0, 1]);
      expect(parseColor('#ff000080')).toEqual([255, 0, 0, 128 / 255]);
    });

    it('should parse rgb/rgba color', () => {
      expect(parseColor('rgb(0, 0, 0)')).toEqual([0, 0, 0, 1]);
      expect(parseColor('rgba(0, 0, 0, 0)')).toEqual([0, 0, 0, 0]);
      expect(parseColor('rgba(255, 0, 0, 0.5)')).toEqual([255, 0, 0, 0.5]);
    });

    it('should parse named colors', () => {
      expect(parseColor('black')).toEqual([0, 0, 0, 1]);
      expect(parseColor('white')).toEqual([255, 255, 255, 1]);
      expect(parseColor('red')).toEqual([255, 0, 0, 1]);
      expect(parseColor('transparent')).toEqual([0, 0, 0, 0]);
    });

    it('should return null for invalid input', () => {
      expect(parseColor('')).toBeNull();
      expect(parseColor('invalid')).toBeNull();
    });
  });

  describe('rgbaToString', () => {
    it('should convert rgba array to string', () => {
      expect(rgbaToString([0, 0, 0, 1])).toBe('rgb(0, 0, 0)');
      expect(rgbaToString([0, 0, 0, 0.5])).toBe('rgba(0, 0, 0, 0.5)');
    });
  });

  describe('lighten', () => {
    it('should lighten color', () => {
      expect(lighten('#000000', 0.5)).toBe('rgb(127.5, 127.5, 127.5)');
      expect(lighten('#000000', 1)).toBe('rgb(255, 255, 255)');
    });

    it('should return original color if invalid', () => {
      expect(lighten('invalid', 0.5)).toBe('invalid');
    });
  });

  describe('darken', () => {
    it('should darken color', () => {
      expect(darken('#ffffff', 0.5)).toBe('rgb(127.5, 127.5, 127.5)');
      expect(darken('#ffffff', 1)).toBe('rgb(0, 0, 0)');
    });

    it('should return original color if invalid', () => {
      expect(darken('invalid', 0.5)).toBe('invalid');
    });
  });

  describe('lerp', () => {
    it('should interpolate colors', () => {
      expect(lerp('#000000', '#ffffff', 0.5)).toBe('rgb(128, 128, 128)');
      expect(lerp('#000000', '#ffffff', 0)).toBe('rgb(0, 0, 0)');
      expect(lerp('#000000', '#ffffff', 1)).toBe('rgb(255, 255, 255)');
    });

    it('should return end color if invalid', () => {
      expect(lerp('invalid', '#ffffff', 0.5)).toBe('#ffffff');
    });
  });

  describe('lift', () => {
    it('should lighten when level > 0', () => {
      expect(lift('#000000', 0.5)).toBe('rgb(127.5, 127.5, 127.5)');
    });

    it('should darken when level < 0', () => {
      expect(lift('#ffffff', -0.5)).toBe('rgb(127.5, 127.5, 127.5)');
    });

    it('should return original color if invalid', () => {
      expect(lift('invalid', 0.5)).toBe('invalid');
    });
  });

  describe('toHex', () => {
    it('should convert color to hex', () => {
      expect(toHex('rgb(0, 0, 0)')).toBe('#000000');
      expect(toHex('rgba(255, 255, 255, 1)')).toBe('#ffffff');
      expect(toHex('rgba(0, 0, 0, 0)')).toBe('#00000000');
    });

    it('should return original color if invalid', () => {
      expect(toHex('invalid')).toBe('invalid');
    });
  });

  describe('toRgbaWithOpacity', () => {
    it('should add opacity to color', () => {
      expect(toRgbaWithOpacity('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
      expect(toRgbaWithOpacity('rgb(0, 0, 0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
      expect(toRgbaWithOpacity('rgba(0, 0, 0, 0.5)', 0.5)).toBe(
        'rgba(0, 0, 0, 0.25)',
      );
    });

    it('should return original color if invalid', () => {
      expect(toRgbaWithOpacity('invalid', 0.5)).toBe('invalid');
    });

    it('should clamp opacity', () => {
      expect(toRgbaWithOpacity('#000000', 1.5)).toBe('#000000');
      expect(toRgbaWithOpacity('#000000', -0.5)).toBe('rgba(0, 0, 0, 0)');
    });
  });
});
