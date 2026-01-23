import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createSymbol } from '../symbol';
import Circle from '../../graphic/Circle';
import Rect from '../../graphic/Rect';
import Polygon from '../../graphic/Polygon';
import Path from '../../graphic/Path';

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

describe('Polygon', () => {
  it('should compute bounding rect for number[][] points', () => {
    const poly = new Polygon({
      shape: {
        points: [
          [-1, 2],
          [3, 4],
          [2, -2],
        ],
      },
    });
    expect(poly.getBoundingRect()).toEqual({
      x: -1,
      y: -2,
      width: 4,
      height: 6,
    });
  });

  it('should compute bounding rect for Point[] points', () => {
    const poly = new Polygon({
      shape: {
        points: [
          { x: 0, y: 0 },
          { x: 10, y: 5 },
          { x: 2, y: -3 },
        ],
      },
    });
    expect(poly.getBoundingRect()).toEqual({
      x: 0,
      y: -3,
      width: 10,
      height: 8,
    });
  });

  it('should determine containment via ray casting', () => {
    const poly = new Polygon({
      shape: {
        points: [
          [0, 0],
          [10, 0],
          [0, 10],
        ],
      },
    });
    expect(poly.contain(2, 2)).toBe(true);
    expect(poly.contain(9, 9)).toBe(false);
  });

  it('should not contain when fewer than 3 points', () => {
    const poly = new Polygon({
      shape: {
        points: [
          [0, 0],
          [1, 1],
        ],
      },
    });
    expect(poly.contain(0.5, 0.5)).toBe(false);
  });

  it('should render polygon path and fill/stroke', () => {
    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      setLineDash: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      globalAlpha: 1,
      shadowBlur: 0,
      shadowColor: '',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    } as unknown as CanvasRenderingContext2D;

    const poly = new Polygon({
      shape: {
        points: [
          [0, 0],
          [10, 0],
          [0, 10],
        ],
      },
      style: { fill: 'red', stroke: 'blue', lineWidth: 2 },
    });
    poly.render(ctx);

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
    expect(ctx.lineTo).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });
});

describe('Path', () => {
  const mockCtx = {
    isPointInPath: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    setLineDash: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    globalAlpha: 1,
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  } as unknown as CanvasRenderingContext2D;

  let createElementNSSpy: ReturnType<typeof vi.spyOn>;
  let getContextSpy: ReturnType<typeof vi.spyOn>;
  let path2DSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCtx.isPointInPath = vi.fn();
    mockCtx.save = vi.fn();
    mockCtx.restore = vi.fn();
    mockCtx.fill = vi.fn();
    mockCtx.stroke = vi.fn();

    const originalCreateElementNS = document.createElementNS.bind(document);
    createElementNSSpy = vi
      .spyOn(document, 'createElementNS')
      .mockImplementation(
        (namespace: string | null, qualifiedName: string, options?: any) => {
          const el = originalCreateElementNS(
            namespace,
            qualifiedName,
            options,
          ) as any;
          if (qualifiedName === 'path') {
            el.getBBox = vi.fn(() => ({ x: 1, y: 2, width: 3, height: 4 }));
          }
          return el;
        },
      );

    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(mockCtx);

    path2DSpy = vi.fn(function Path2DMock(this: any, d: string) {
      (this as any).d = d;
    });
    vi.stubGlobal('Path2D', path2DSpy as any);
  });

  afterEach(() => {
    createElementNSSpy?.mockRestore();
    getContextSpy?.mockRestore();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should compute bounding rect using SVG getBBox', () => {
    const path = new Path({ shape: { d: 'M0 0 L10 0 L10 10 Z' } });
    expect(path.getBoundingRect()).toEqual({ x: 1, y: 2, width: 3, height: 4 });
    expect(createElementNSSpy).toHaveBeenCalled();
  });

  it('should cache Path2D and use canvas isPointInPath for containment', () => {
    mockCtx.isPointInPath = vi.fn().mockReturnValue(true);
    const path = new Path({ shape: { d: 'M0 0 L10 0 L10 10 Z' } });

    expect(path.contain(5, 5)).toBe(true);
    expect(path.contain(5, 5)).toBe(true);
    expect(path2DSpy).toHaveBeenCalledTimes(1);
    expect(mockCtx.isPointInPath).toHaveBeenCalledTimes(2);
  });

  it('should render fill and stroke with cached Path2D', () => {
    const path = new Path({
      shape: { d: 'M0 0 L10 0 L10 10 Z' },
      style: { fill: 'red', stroke: 'blue', lineWidth: 2 },
    });

    path.render(mockCtx);
    expect(mockCtx.fill).toHaveBeenCalled();
    expect(mockCtx.stroke).toHaveBeenCalled();
    expect(path2DSpy).toHaveBeenCalledTimes(1);
  });

  it('should return empty rect and false containment when d is empty', () => {
    const path = new Path({ shape: { d: '' } });
    expect(path.getBoundingRect()).toEqual({ x: 0, y: 0, width: 0, height: 0 });
    expect(path.contain(0, 0)).toBe(false);
  });

  it('should handle invalid path data gracefully', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.unstubAllGlobals();
    vi.stubGlobal('Path2D', function Path2DThrows() {
      throw new Error('bad path');
    } as any);

    const path = new Path({ shape: { d: 'bad' } });
    expect(path.contain(0, 0)).toBe(false);
    path.render(mockCtx);
    expect(errorSpy).toHaveBeenCalled();
  });
});
