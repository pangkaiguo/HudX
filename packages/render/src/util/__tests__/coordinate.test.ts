import { describe, it, expect } from 'vitest';
import {
  createLinearScale,
  createOrdinalScale,
  calculateDomain,
  niceDomain,
  calculateNiceTicks,
  formatAxisLabel,
  dataToCoordinate,
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

    it('should handle min === max', () => {
      expect(niceDomain(10, 10)).toEqual([0, 12]);
      expect(niceDomain(0, 0)).toEqual([0, 10]);
      expect(niceDomain(-10, -10)).toEqual([-12, 0]);
    });
  });

  describe('calculateNiceTicks', () => {
    it('should calculate nice ticks', () => {
      const ticks = calculateNiceTicks(0, 42, 5);
      expect(ticks).toEqual([0, 10, 20, 30, 40, 50]);
    });
  });

  describe('formatAxisLabel', () => {
    it('should format numbers', () => {
      expect(formatAxisLabel(100)).toBe('100');
      expect(formatAxisLabel(1234)).toBe('1K');
      expect(formatAxisLabel(1500, 1)).toBe('1.5K');
      expect(formatAxisLabel(1000000)).toBe('1M');
      expect(formatAxisLabel(1500000, 1)).toBe('1.5M');
      expect(formatAxisLabel(1000000000)).toBe('1B');
    });
  });

  describe('dataToCoordinate', () => {
    it('should convert number data', () => {
      const xScale = createLinearScale([0, 10], [0, 100]);
      const yScale = createLinearScale([0, 10], [0, 100]);
      // For single number, x is index?
      // Wait, dataToCoordinate impl:
      // name = 0 (default), value = data
      // x = xScale(0), y = yScale(data)
      const coord = dataToCoordinate(5, xScale, yScale);
      expect(coord).toEqual({ x: 0, y: 50 });
    });

    it('should convert array data', () => {
      const xScale = createLinearScale([0, 10], [0, 100]);
      const yScale = createLinearScale([0, 10], [0, 100]);
      // data = [5, 5] -> value = 5?
      // impl: value = data[0] -> 5. name=0.
      // x = xScale(0), y = yScale(5)
      const coord = dataToCoordinate([5, 10], xScale, yScale);
      expect(coord).toEqual({ x: 0, y: 50 });
    });

    it('should convert object data', () => {
      const xScale = createLinearScale([0, 10], [0, 100]);
      const yScale = createLinearScale([0, 10], [0, 100]);
      const data = { name: 2, value: 5 } as any;
      const coord = dataToCoordinate(data, xScale, yScale);
      expect(coord).toEqual({ x: 20, y: 50 });
    });

    it('should convert object data with array value', () => {
      const xScale = createLinearScale([0, 10], [0, 100]);
      const yScale = createLinearScale([0, 10], [0, 100]);
      const data = { name: 2, value: [5, 10] } as any;
      const coord = dataToCoordinate(data, xScale, yScale);
      expect(coord).toEqual({ x: 20, y: 50 });
    });
  });

  describe('createLinearScale extra', () => {
    it('should handle infinite domain', () => {
      const scale = createLinearScale([Infinity, Infinity], [0, 100]);
      // Should fallback to base 0 -> [-1, 1]
      // domain [-1, 1] -> range [0, 100]
      // 0 -> 50
      expect(scale(0)).toBe(50);
    });

    it('should handle equal domain', () => {
      const scale = createLinearScale([10, 10], [0, 100]);
      // fallback to [9, 11] -> [0, 100]
      // 10 -> 50
      expect(scale(10)).toBe(50);
    });

    it('should allow updating domain and range', () => {
      const scale = createLinearScale([0, 10], [0, 100]);
      const newScale = scale.domain([0, 20]);
      expect(newScale(10)).toBe(50);

      const newScale2 = scale.range([0, 200]);
      expect(newScale2(10)).toBe(200);
    });

    it('should handle infinite result', () => {
      // Force an infinite result if possible, or just check the branch
      // The implementation checks !isFinite(v)
      // This happens if k is Infinity? (d1=d0 handled)
      // or if input value is Infinity
      const scale = createLinearScale([0, 10], [0, 100]);
      expect(scale(Infinity)).toBe(0); // Returns r0
    });
  });

  describe('createOrdinalScale extra', () => {
    it('should allow updating domain and range', () => {
      const scale = createOrdinalScale(['A'], [0, 100]);
      const newScale = scale.domain(['A', 'B']);
      expect(newScale('B')).toBe(75);

      const newScale2 = scale.range([0, 200]);
      expect(newScale2('A')).toBe(100);
    });

    it('should handle value not in domain', () => {
      const scale = createOrdinalScale(['A'], [0, 100]);
      expect(scale('B')).toBe(0); // Returns range[0]
    });

    it('should invert with single item and no boundary gap', () => {
      const scale = createOrdinalScale(['A'], [0, 100], false);
      expect(scale.invert!(50)).toBe('A');
    });
  });

  describe('calculateDomain extra', () => {
    it('should handle array data for value axis', () => {
      const axis: AxisOption = { type: 'value' };
      const data = [[10, 20], [30, 40]];
      // isXAxis=false -> index 1
      const domain = calculateDomain(axis, data, false);
      expect(domain).toEqual([0, 40]); // niceDomain(20, 40) -> [0, 40] because scale defaults to false
      // niceDomain(20, 40, 5) -> range 20, step 4. [20, 40] -> [20, 40] if scale=true
      // wait, calculateDomain default isXAxis=true if not passed?
    });

    it('should handle object data with name as number', () => {
      const axis: AxisOption = { type: 'value' };
      const data = [{ name: 10, value: 100 }, { name: 20, value: 200 }];
      // isXAxis=true. name is used. 10, 20.
      const domain = calculateDomain(axis, data, true);
      expect(domain).toEqual([0, 20]); // niceDomain(10, 20) -> [0, 20] because scale defaults to false
    });

    it('should handle object data with array value', () => {
      const axis: AxisOption = { type: 'value' };
      const data = [{ name: 'A', value: [10, 20] }, { name: 'B', value: [30, 40] }];
      // isXAxis=true -> index 0 -> 10, 30
      const domain = calculateDomain(axis, data, true);
      expect(domain).toEqual([0, 30]);

      // isXAxis=false -> index 1 -> 20, 40
    });

    it('should handle dataMin/dataMax', () => {
      const axis: AxisOption = { type: 'value', min: 'dataMin', max: 'dataMax' };
      const data = [10, 50];
      const domain = calculateDomain(axis, data, false);
      // scale=false default -> min=0. max=50. padding=(50-0)*0.1=5.
      // min-padding = -5. max+padding = 55.
      expect(domain).toEqual([-5, 55]);
      // The code:
      // axis.min !== undefined && axis.min !== 'dataMin' ? axis.min : min - padding
    });

    it('should return default [0, 100] for empty data in value axis', () => {
      const axis: AxisOption = { type: 'value' };
      const domain = calculateDomain(axis, [], false);
      expect(domain).toEqual([0, 100]);
    });

    it('should handle unknown axis type', () => {
      const axis: AxisOption = { type: 'time' as any };
      const domain = calculateDomain(axis, [], false);
      expect(domain).toEqual([0, 100]);
    });

    it('should extract categories from primitive data', () => {
      const axis: AxisOption = { type: 'category' };
      const data = ['A', 'B', 'C'];
      const domain = calculateDomain(axis, data, true);
      expect(domain).toEqual(['A', 'B', 'C']);
    });

    it('should handle object data with string name and number value for X value axis', () => {
      const axis: AxisOption = { type: 'value' };
      const data = [{ name: 'A', value: 10 }, { name: 'B', value: 20 }];
      const domain = calculateDomain(axis, data, true);
      // name is string, falls back to value check. value is number -> 10, 20.
      // min=10, max=20. scale=false -> min=0.
      expect(domain).toEqual([0, 20]);
    });

    it('should handle object data with array value for Y value axis', () => {
      const axis: AxisOption = { type: 'value' };
      const data = [{ name: 'A', value: [10, 20] }, { name: 'B', value: [30, 40] }];
      // isXAxis=false -> index 1 -> 20, 40
      const domain = calculateDomain(axis, data, false);
      expect(domain).toEqual([0, 40]);
    });
  });
});
