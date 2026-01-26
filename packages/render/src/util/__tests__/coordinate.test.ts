import { describe, it, expect } from 'vitest';
import {
  createLinearScale,
  createOrdinalScale,
  calculateDomain,
  niceDomain,
} from '../coordinate';
import type { AxisOption } from '../../types';

describe('coordinate', () => {
  describe('createLinearScale', () => {
    it('should map domain to range', () => {
      const scale = createLinearScale([0, 100], [0, 500]);
      expect(scale(0)).toBe(0);
      expect(scale(50)).toBe(250);
      expect(scale(100)).toBe(500);
    });

    it('should invert value', () => {
      const scale = createLinearScale([0, 100], [0, 500]);
      expect(scale.invert!(0)).toBe(0);
      expect(scale.invert!(250)).toBe(50);
      expect(scale.invert!(500)).toBe(100);
    });

    it('should handle reversed range', () => {
      const scale = createLinearScale([0, 100], [500, 0]);
      expect(scale(0)).toBe(500);
      expect(scale(100)).toBe(0);
    });
  });

  describe('createOrdinalScale', () => {
    it('should map category to range', () => {
      const scale = createOrdinalScale(['A', 'B', 'C'], [0, 300]);
      // step = 100
      // A -> 0 + 0.5 * 100 = 50
      // B -> 0 + 1.5 * 100 = 150
      // C -> 0 + 2.5 * 100 = 250
      expect(scale('A')).toBe(50);
      expect(scale('B')).toBe(150);
      expect(scale('C')).toBe(250);
    });

    it('should map category with boundaryGap: false', () => {
      const scale = createOrdinalScale(['A', 'B', 'C'], [0, 300], false);
      // step = 300 / 2 = 150
      // A -> 0
      // B -> 150
      // C -> 300
      expect(scale('A')).toBe(0);
      expect(scale('B')).toBe(150);
      expect(scale('C')).toBe(300);
    });

    it('should handle single item with boundaryGap: false', () => {
      const scale = createOrdinalScale(['A'], [0, 100], false);
      // center
      expect(scale('A')).toBe(50);
    });

    it('should invert value', () => {
      const scale = createOrdinalScale(['A', 'B', 'C'], [0, 300]);
      expect(scale.invert!(50)).toBe('A');
      expect(scale.invert!(150)).toBe('B');
      expect(scale.invert!(250)).toBe('C');
    });

    it('should invert value with boundaryGap: false', () => {
      const scale = createOrdinalScale(['A', 'B', 'C'], [0, 300], false);
      // A: 0, B: 150, C: 300
      // split points at 75, 225
      expect(scale.invert!(0)).toBe('A');
      expect(scale.invert!(74)).toBe('A');
      expect(scale.invert!(76)).toBe('B');
      expect(scale.invert!(150)).toBe('B');
      expect(scale.invert!(226)).toBe('C');
      expect(scale.invert!(300)).toBe('C');
    });
  });

  describe('calculateDomain', () => {
    it('should return explicit categories', () => {
      const axis: AxisOption = { type: 'category', data: ['A', 'B', 'C'] };
      const domain = calculateDomain(axis, []);
      expect(domain).toEqual(['A', 'B', 'C']);
    });

    it('should extract categories from data for X axis', () => {
      const axis: AxisOption = { type: 'category' };
      const data = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
      ];
      const domain = calculateDomain(axis, data, true);
      expect(domain).toEqual(['A', 'B']);
    });

    it('should calculate value domain', () => {
      const axis: AxisOption = { type: 'value' };
      const data = [10, 20, 30, 40, 50];
      const domain = calculateDomain(axis, data, false);
      // Default nice domain might vary, but niceDomain logic:
      // range=40, rawStep=8, mag=0, magPow=1, magStep=8 -> stepSize=10
      // min=10, floor(10/10)*10=10
      // max=50, ceil(50/10)*10=50
      // Wait, scale is undefined (default false?), so it should include 0?
      // In calculateDomain: if (!axis.scale) { if (min>0) min=0; ... }
      // So min=0, max=50.
      // niceDomain(0, 50, 5):
      // range=50, rawStep=10, mag=1, magPow=10, magStep=1 -> stepSize=10
      // min=0, max=50.
      expect(domain).toEqual([0, 50]);
    });

    it('should respect scale: true', () => {
      const axis: AxisOption = { type: 'value', scale: true };
      const data = [10, 50];
      const domain = calculateDomain(axis, data, false);
      // min=10, max=50
      // niceDomain(10, 50, 5) -> [10, 50]
      expect(domain).toEqual([10, 50]);
    });

    it('should handle explicit min/max', () => {
      const axis: AxisOption = { type: 'value', min: 0, max: 100 };
      const data = [10, 50];
      const domain = calculateDomain(axis, data, false);
      // Explicit min/max skips niceDomain and just adds padding if min/max not dataMin/dataMax?
      // Wait: if (axis.min === undefined && axis.max === undefined) { return niceDomain... }
      // else { return [min, max] with padding if 'dataMin'/'dataMax' logic applies or just min/max? }
      // The code says:
      // if axis.min !== undefined && axis.min !== 'dataMin' ? axis.min : min - padding
      // So if explicit number, it uses it directly.
      expect(domain).toEqual([0, 100]);
    });
  });

  describe('niceDomain', () => {
    it('should calculate nice domain', () => {
      expect(niceDomain(0, 42, 5)).toEqual([0, 50]);
      expect(niceDomain(12, 88, 5)).toEqual([0, 100]); // range=76, step~15.2 -> 20. floor(12/20)*20=0, ceil(88/20)*20=100
    });
  });
});
