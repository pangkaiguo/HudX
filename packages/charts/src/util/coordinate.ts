/**
 * Coordinate system utilities
 */

import type { AxisOption, ChartData, Coordinate } from '../types';

export interface Scale {
  (value: any): number;
  invert?(value: number): any;
  domain(): any[];
  range(): number[];
  domain(domain: any[]): Scale;
  range(range: number[]): Scale;
  /** Alias for getPixel (ECharts compatibility) */
  getPixel?(value: any): number;
  /** Alias for invert (ECharts compatibility) */
  getValue?(pixel: number): any;
}

/**
 * Create linear scale
 * Maps a continuous domain to a continuous range
 */
export const createLinearScale = (domain: number[], range: number[]): Scale => {
  let [d0, d1] = domain;
  const [r0, r1] = range;
  if (!isFinite(d0) || !isFinite(d1) || d1 === d0) {
    const base = isFinite(d0) ? d0 : 0;
    d0 = base - 1;
    d1 = base + 1;
  }
  const k = (r1 - r0) / (d1 - d0);

  const scale = function (value: number): number {
    const v = r0 + (value - d0) * k;
    if (!isFinite(v)) return r0;
    return v;
  } as Scale;

  scale.invert = function (value: number): number {
    return d0 + (value - r0) / k;
  };

  scale.getPixel = scale;
  scale.getValue = scale.invert;

  scale.domain = function (newDomain?: number[]): any {
    if (newDomain) {
      return createLinearScale(newDomain, range);
    }
    return domain;
  };

  scale.range = function (newRange?: number[]): any {
    if (newRange) {
      return createLinearScale(domain, newRange);
    }
    return range;
  };

  return scale;
};

/**
 * Create ordinal scale (for categories)
 * Maps discrete values to a continuous range (bands)
 */
export const createOrdinalScale = (domain: any[], range: number[]): Scale => {
  const domainMap = new Map<any, number>();
  domain.forEach((d, i) => {
    domainMap.set(d, i);
  });

  const scale = function (value: any): number {
    const index = domainMap.get(value);
    if (index === undefined) {
      return range[0];
    }
    const total = Math.max(1, domain.length);
    const step = (range[range.length - 1] - range[0]) / total;
    // Return band center position
    return range[0] + (index + 0.5) * step;
  } as Scale;

  scale.invert = function (value: number): any {
    const total = Math.max(1, domain.length);
    const step = (range[range.length - 1] - range[0]) / total;
    const index = Math.floor((value - range[0]) / step);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };

  scale.getPixel = scale;
  scale.getValue = scale.invert;

  scale.domain = function (newDomain?: any[]): any {
    if (newDomain) {
      return createOrdinalScale(newDomain, range);
    }
    return domain;
  };

  scale.range = function (newRange?: number[]): any {
    if (newRange) {
      return createOrdinalScale(domain, newRange);
    }
    return range;
  };

  return scale;
};

/**
 * Calculate nice scale domain
 */
export const niceDomain = (min: number, max: number, tickCount: number = 5): number[] => {
  if (min === max) {
    if (min === 0) return [0, 10];
    return [min > 0 ? 0 : min * 1.2, min > 0 ? min * 1.2 : 0];
  }

  // Handle special case where all values are same
  const range = max - min;
  if (range === 0) return [min - 1, max + 1];

  // Calculate raw step
  const rawStep = range / tickCount;
  // Calculate magnitude (power of 10)
  const mag = Math.floor(Math.log10(rawStep));
  const magPow = Math.pow(10, mag);
  // Calculate normalized step
  const magStep = rawStep / magPow;

  let stepSize;
  if (magStep < 1.5) stepSize = 1 * magPow;
  else if (magStep < 2.5) stepSize = 2 * magPow;
  else if (magStep < 5) stepSize = 5 * magPow;
  else stepSize = 10 * magPow;

  return [
    Math.floor(min / stepSize) * stepSize,
    Math.ceil(max / stepSize) * stepSize
  ];
};

/**
 * Calculate axis domain from data
 */
export const calculateDomain = (
  axis: AxisOption,
  data: any[],
  isXAxis: boolean = true
): any[] => {
  if (axis.type === 'category') {
    if (axis.data && axis.data.length > 0) {
      return axis.data;
    }
    // Extract categories from data
    const categories = new Set<any>();
    data.forEach((item) => {
      if (typeof item === 'object' && item !== null) {
        const value = isXAxis ? (item.name ?? (Array.isArray(item.value) ? item.value[0] : item.value)) : item.value;
        if (value !== undefined) {
          categories.add(value);
        }
      } else {
        categories.add(item);
      }
    });
    return Array.from(categories);
  } else if (axis.type === 'value') {
    const values: number[] = [];
    data.forEach((item) => {
      if (typeof item === 'number') {
        values.push(item);
      } else if (Array.isArray(item)) {
        const idx = isXAxis ? 0 : 1;
        const v = item[idx];
        if (typeof v === 'number') values.push(v);
      } else if (typeof item === 'object' && item !== null) {
        if (isXAxis) {
          if (typeof item.name === 'number') {
            values.push(item.name);
          } else if (Array.isArray(item.value) && typeof item.value[0] === 'number') {
            values.push(item.value[0]);
          }
        } else {
          if (typeof item.value === 'number') {
            values.push(item.value);
          } else if (Array.isArray(item.value) && typeof item.value[1] === 'number') {
            values.push(item.value[1]);
          }
        }
      }
    });

    if (values.length === 0) {
      return [0, 100];
    }

    let min = axis.min !== 'dataMin' && typeof axis.min === 'number' ? axis.min : Math.min(...values);
    let max = axis.max !== 'dataMax' && typeof axis.max === 'number' ? axis.max : Math.max(...values);

    // If scale is not enabled, include zero
    if (!axis.scale) {
      if (min > 0) min = 0;
      if (max < 0) max = 0;
    }

    // Use nice ticks if no explicit min/max
    if (axis.min === undefined && axis.max === undefined) {
      return niceDomain(min, max);
    }

    // Add padding otherwise
    const padding = (max - min) * 0.1;
    return [
      axis.min !== undefined && axis.min !== 'dataMin' ? axis.min : min - padding,
      axis.max !== undefined && axis.max !== 'dataMax' ? axis.max : max + padding
    ];
  }

  return [0, 100];
};

export const calculateNiceTicks = (min: number, max: number, tickCount: number = 5): number[] => {
  const domain = niceDomain(min, max, tickCount);
  const step = (domain[1] - domain[0]) / tickCount;
  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(domain[0] + step * i);
  }
  return ticks;
};

export const formatAxisLabel = (value: number, precision: number = 0): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(precision) + 'B';
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(precision) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(precision) + 'K';
  }
  return value.toFixed(precision);
};

/**
 * Convert data point to coordinate
 */
export const dataToCoordinate = (
  data: ChartData,
  xScale: Scale,
  yScale: Scale
): Coordinate => {
  const x = typeof data.name === 'number' ? xScale(data.name) : xScale(data.name || 0);
  const y = typeof data.value === 'number' ? yScale(data.value) : yScale(Array.isArray(data.value) ? data.value[0] : 0);
  return { x, y };
};
