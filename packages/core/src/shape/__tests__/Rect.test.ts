import { describe, it, expect, vi } from 'vitest';
import Rect from '../Rect';

describe('Rect', () => {
  it('should initialize with default values', () => {
    const rect = new Rect();
    expect(rect.shape).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  });

  it('should initialize with provided values', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 100, height: 50 }
    });
    expect(rect.shape).toEqual({ x: 10, y: 20, width: 100, height: 50 });
  });

  it('should calculate bounding rect correctly', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 100, height: 50 }
    });
    const bbox = rect.getBoundingRect();
    expect(bbox).toEqual({ x: 10, y: 20, width: 100, height: 50 });
  });

  it('should check containment correctly', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 100, height: 50 }
    });
    expect(rect.contain(15, 25)).toBe(true);
    expect(rect.contain(110, 70)).toBe(true);
    expect(rect.contain(5, 25)).toBe(false);
    expect(rect.contain(15, 80)).toBe(false);
  });

  it('should check containment with transform', () => {
    const rect = new Rect({
      shape: { x: 0, y: 0, width: 100, height: 100 },
      transform: { x: 50, y: 50 }
    });
    expect(rect.contain(60, 60)).toBe(true);
    expect(rect.contain(10, 10)).toBe(false);
  });

  it('should render standard rect', () => {
    const rect = new Rect({
      shape: { x: 10, y: 10, width: 100, height: 100 },
      style: { fill: 'red', stroke: 'blue', lineWidth: 2 }
    });

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      rect: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn(),
      translate: vi.fn()
    } as unknown as CanvasRenderingContext2D;

    rect.render(ctx);

    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.rect).toHaveBeenCalledWith(10, 10, 100, 100);
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
  });

  it('should render rounded rect', () => {
    const rect = new Rect({
      shape: { x: 10, y: 10, width: 100, height: 100, r: 10 },
      style: { fill: 'red' }
    });

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn()
    } as unknown as CanvasRenderingContext2D;

    rect.render(ctx);

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledTimes(4);
    expect(ctx.closePath).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });
  
  it('should clamp border radius', () => {
    const rect = new Rect({
      shape: { x: 0, y: 0, width: 100, height: 100, r: 60 },
      style: { fill: 'red' }
    });
      
    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn()
    } as unknown as CanvasRenderingContext2D;
      
    rect.render(ctx);
      
    const calls = (ctx.arc as any).mock.calls;
    expect(calls.length).toBe(4);
    expect(calls[0][2]).toBe(50);
  });

  it('should not render if invisible', () => {
      const rect = new Rect({ 
        invisible: true,
        shape: { x: 0, y: 0, width: 0, height: 0 }
      });
      const ctx = { save: vi.fn() } as unknown as CanvasRenderingContext2D;
      rect.render(ctx);
      expect(ctx.save).not.toHaveBeenCalled();
  });
});
