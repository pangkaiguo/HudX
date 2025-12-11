/**
 * Coordinate system utilities
 */

import { AxisOption, ChartData, Coordinate } from '../types';

export interface Scale {
  (value: any): number;
  invert?(value: number): any;
  domain(): any[];
  range(): number[];
  domain(domain: any[]): Scale;
  range(range: number[]): Scale;
}

/**
 * Create linear scale
 */
export function createLinearScale(domain: number[], range: number[]): Scale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const k = (r1 - r0) / (d1 - d0);

  const scale = function(value: number): number {
    return r0 + (value - d0) * k;
  } as Scale;

  scale.invert = function(value: number): number {
    return d0 + (value - r0) / k;
  };

  scale.domain = function(newDomain?: number[]): any {
    if (newDomain) {
      return createLinearScale(newDomain, range);
    }
    return domain;
  };

  scale.range = function(newRange?: number[]): any {
    if (newRange) {
      return createLinearScale(domain, newRange);
    }
    return range;
  };

  return scale;
}

/**
 * Create ordinal scale (for categories)
 */
export function createOrdinalScale(domain: any[], range: number[]): Scale {
  const domainMap = new Map<any, number>();
  domain.forEach((d, i) => {
    domainMap.set(d, i);
  });

  const scale = function(value: any): number {
    const index = domainMap.get(value);
    if (index === undefined) {
      return range[0];
    }
    const step = (range[range.length - 1] - range[0]) / (domain.length - 1);
    return range[0] + index * step;
  } as Scale;

  scale.invert = function(value: number): any {
    const step = (range[range.length - 1] - range[0]) / (domain.length - 1);
    const index = Math.round((value - range[0]) / step);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };

  scale.domain = function(newDomain?: any[]): any {
    if (newDomain) {
      return createOrdinalScale(newDomain, range);
    }
    return domain;
  };

  scale.range = function(newRange?: number[]): any {
    if (newRange) {
      return createOrdinalScale(domain, newRange);
    }
    return range;
  };

  return scale;
}

/**
 * Calculate axis domain from data
 */
export function calculateDomain(
  axis: AxisOption,
  data: ChartData[],
  isXAxis: boolean = true
): any[] {
  if (axis.type === 'category') {
    if (axis.data && axis.data.length > 0) {
      return axis.data;
    }
    // Extract categories from data
    const categories = new Set<any>();
    data.forEach((item) => {
      const value = isXAxis ? item.name : item.value;
      if (value !== undefined) {
        categories.add(value);
      }
    });
    return Array.from(categories);
  } else if (axis.type === 'value') {
    const values: number[] = [];
    data.forEach((item) => {
      const value = isXAxis ? item.name : item.value;
      if (typeof value === 'number') {
        values.push(value);
      } else if (Array.isArray(value)) {
        values.push(...value.filter(v => typeof v === 'number'));
      }
    });

    if (values.length === 0) {
      return [0, 100];
    }

    const min = axis.min === 'dataMin' ? Math.min(...values) : (axis.min ?? Math.min(...values));
    const max = axis.max === 'dataMax' ? Math.max(...values) : (axis.max ?? Math.max(...values));

    // Add padding
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }

  return [0, 100];
}

/**
 * Convert data point to coordinate
 */
export function dataToCoordinate(
  data: ChartData,
  xScale: Scale,
  yScale: Scale
): Coordinate {
  const x = typeof data.name === 'number' ? xScale(data.name) : xScale(data.name || 0);
  const y = typeof data.value === 'number' ? yScale(data.value) : yScale(Array.isArray(data.value) ? data.value[0] : 0);
  return { x, y };
}

