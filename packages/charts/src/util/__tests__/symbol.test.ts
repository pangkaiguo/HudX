import { describe, it, expect } from 'vitest';
import { createSymbol } from '../symbol';
import { Circle, Rect, Polygon, Path } from 'hux-core';

describe('symbol utility', () => {
  it('should create circle symbol', () => {
    const symbol = createSymbol('circle', 10, 10, 20, {});
    expect(symbol).toBeInstanceOf(Circle);
    expect(symbol?.attr('shape').r).toBe(10); // radius = size/2
  });

  it('should create rect symbol', () => {
    const symbol = createSymbol('rect', 10, 10, 20, {});
    expect(symbol).toBeInstanceOf(Rect);
    expect(symbol?.attr('shape').width).toBe(20);
    expect(symbol?.attr('shape').height).toBe(20);
  });

  it('should create triangle symbol', () => {
    const symbol = createSymbol('triangle', 10, 10, 20, {});
    expect(symbol).toBeInstanceOf(Polygon);
    const points = symbol?.attr('shape').points;
    expect(points.length).toBe(3);
  });

  it('should create diamond symbol', () => {
    const symbol = createSymbol('diamond', 10, 10, 20, {});
    expect(symbol).toBeInstanceOf(Polygon);
    const points = symbol?.attr('shape').points;
    expect(points.length).toBe(4);
  });

  it('should create pin symbol as path', () => {
    const symbol = createSymbol('pin', 10, 10, 20, {});
    expect(symbol).toBeInstanceOf(Path);
    expect(symbol?.attr('shape').d).toContain('M');
  });

  it('should return null for none', () => {
    const symbol = createSymbol('none', 10, 10, 20, {});
    expect(symbol).toBeNull();
  });

  it('should fallback to circle for unknown type', () => {
    const symbol = createSymbol('unknown-shape', 10, 10, 20, {});
    expect(symbol).toBeInstanceOf(Circle);
  });
});
