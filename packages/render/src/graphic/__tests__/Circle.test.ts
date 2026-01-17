import { describe, it, expect, vi } from 'vitest';
import Circle from '../Circle';

describe('Circle', () => {
  it('should initialize with default values', () => {
    const circle = new Circle();
    expect(circle.shape).toEqual({ cx: 0, cy: 0, r: 0 });
  });

  it('should initialize with provided values', () => {
    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 50 },
    });
    expect(circle.shape).toEqual({ cx: 100, cy: 100, r: 50 });
  });

  it('should calculate bounding rect correctly', () => {
    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 50 },
    });
    const bbox = circle.getBoundingRect();
    expect(bbox).toEqual({ x: 50, y: 50, width: 100, height: 100 });
  });

  it('should check containment correctly', () => {
    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 50 },
    });
    expect(circle.contain(100, 100)).toBe(true);
    expect(circle.contain(130, 130)).toBe(true);
    expect(circle.contain(150, 100)).toBe(true);
    expect(circle.contain(151, 100)).toBe(false);
    expect(circle.contain(200, 200)).toBe(false);
  });

  it('should check containment with transform', () => {
    const circle = new Circle({
      shape: { cx: 0, cy: 0, r: 10 },
      transform: { x: 50, y: 50 },
    });
    expect(circle.contain(50, 50)).toBe(true);
    expect(circle.contain(0, 0)).toBe(false);
  });

  it('should render', () => {
    const circle = new Circle({
      shape: { cx: 10, cy: 10, r: 5 },
      style: { fill: 'red', stroke: 'blue', lineWidth: 1 },
    });

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    circle.render(ctx);

    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledWith(10, 10, 5, 0, Math.PI * 2, false);
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
  });

  it('should not render if invisible', () => {
    const circle = new Circle({
      invisible: true,
      shape: { cx: 0, cy: 0, r: 0 },
    });
    const ctx = { save: vi.fn() } as unknown as CanvasRenderingContext2D;
    circle.render(ctx);
    expect(ctx.save).not.toHaveBeenCalled();
  });
});
