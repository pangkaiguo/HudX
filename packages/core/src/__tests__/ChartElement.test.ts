import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChartElement from '../ChartElement';
import { createIdentityMatrix, translate, rotate, scale } from '../util/matrix';

// Mock concrete implementation for testing abstract class
class TestElement extends ChartElement {
  render(ctx: CanvasRenderingContext2D): void { }
}

describe('ChartElement', () => {
  it('should initialize with default options', () => {
    const el = new TestElement();
    expect(el.id).toBeDefined();
    expect(el.zlevel).toBe(0);
    expect(el.z).toBe(0);
    expect(el.style).toEqual({});
    expect(el.transform).toEqual({});
  });

  it('should initialize with provided options', () => {
    const opts = {
      id: 'test-id',
      name: 'test-element',
      zlevel: 1,
      z: 2,
      style: { fill: 'red' },
      transform: { x: 10, y: 20 },
      invisible: true,
      silent: true,
      draggable: true,
      cursor: 'pointer'
    };
    const el = new TestElement(opts);

    expect(el.id).toBe('test-id');
    expect(el.name).toBe('test-element');
    expect(el.zlevel).toBe(1);
    expect(el.z).toBe(2);
    expect(el.style).toEqual({ fill: 'red' });
    expect(el.transform).toEqual({ x: 10, y: 20 });
    expect(el.invisible).toBe(true);
    expect(el.silent).toBe(true);
    expect(el.draggable).toBe(true);
    expect(el.cursor).toBe('pointer');
  });

  it('should handle attr() getter', () => {
    const el = new TestElement({
      style: { fill: 'red' },
      shape: { x: 10 } as any,
      transform: { x: 100 }
    });

    expect(el.attr('style')).toEqual({ fill: 'red' });
    expect(el.attr('shape')).toEqual({ x: 10 });
    expect(el.attr('transform')).toEqual({ x: 100 });
    expect(el.attr('zlevel')).toBe(0);
  });

  it('should handle attr() setter key-value', () => {
    const el = new TestElement();

    // Style
    el.attr('style', { stroke: 'blue' });
    expect(el.style.stroke).toBe('blue');

    // Shape
    el.attr('shape', { r: 5 });
    expect((el.shape as any).r).toBe(5);

    // Transform
    el.attr('transform', { rotation: 1 });
    expect(el.transform.rotation).toBe(1);

    // Other prop
    el.attr('invisible', true);
    expect(el.invisible).toBe(true);
  });

  it('should handle attr() setter object', () => {
    const el = new TestElement();

    el.attr({
      style: { fill: 'green' },
      z: 5,
      invisible: true
    });

    expect(el.style.fill).toBe('green');
    expect(el.z).toBe(5);
    expect(el.invisible).toBe(true);
  });

  it('should calculate local transform matrix', () => {
    const el = new TestElement({
      transform: {
        x: 10,
        y: 20,
        scaleX: 2,
        scaleY: 2,
        rotation: Math.PI / 2
      }
    });

    const m = el.getLocalTransform();
    // Verify matrix calculation logic implicitly or explicitly
    // Just ensure it returns a matrix object
    expect(m).toHaveProperty('a');
    expect(m).toHaveProperty('b');
    expect(m).toHaveProperty('c');
    expect(m).toHaveProperty('d');
    expect(m).toHaveProperty('e');
    expect(m).toHaveProperty('f');
    expect(m).not.toEqual(createIdentityMatrix());
  });

  it('should handle dirty flag', () => {
    const el = new TestElement();
    const parent = new TestElement();
    (el as any).__parent = parent;

    // Mock parent.markRedraw
    parent.markRedraw = vi.fn();

    el.clearDirty();
    expect(el.isDirty()).toBe(false);

    el.markRedraw();
    expect(el.isDirty()).toBe(true);
    expect(parent.markRedraw).toHaveBeenCalled();
  });

  it('should handle clipPath', () => {
    const el = new TestElement();
    const clip = new TestElement();

    el.setClipPath(clip);
    expect(el.getClipPath()).toBe(clip);

    el.setClipPath(undefined);
    expect(el.getClipPath()).toBeUndefined();
  });

  it('should apply style to context', () => {
    const el = new TestElement({
      style: {
        fill: 'red',
        stroke: 'blue',
        lineWidth: 2,
        opacity: 0.5,
        lineDash: [5, 5],
        lineDashOffset: 2,
        shadowBlur: 10,
        shadowColor: 'black',
        shadowOffsetX: 5,
        shadowOffsetY: 5
      }
    });

    const ctx = {
      setLineDash: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    // Access protected method via any
    (el as any).applyStyle(ctx);

    expect(ctx.fillStyle).toBe('red');
    expect(ctx.strokeStyle).toBe('blue');
    expect(ctx.lineWidth).toBe(2);
    expect(ctx.globalAlpha).toBe(0.5);
    expect(ctx.setLineDash).toHaveBeenCalledWith([5, 5]);
    expect(ctx.lineDashOffset).toBe(2);
    expect(ctx.shadowBlur).toBe(10);
    expect(ctx.shadowColor).toBe('black');
    expect(ctx.shadowOffsetX).toBe(5);
    expect(ctx.shadowOffsetY).toBe(5);
  });

  it('should apply transform to context', () => {
    const el = new TestElement({
      transform: {
        x: 10,
        y: 20,
        rotation: 1,
        scaleX: 2,
        scaleY: 2,
        originX: 5,
        originY: 5
      }
    });

    const ctx = {
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn()
    } as unknown as CanvasRenderingContext2D;

    (el as any).applyTransform(ctx);

    expect(ctx.translate).toHaveBeenCalledWith(10, 20); // x, y
    expect(ctx.translate).toHaveBeenCalledWith(5, 5); // origin
    expect(ctx.rotate).toHaveBeenCalledWith(1);
    expect(ctx.scale).toHaveBeenCalledWith(2, 2);
    expect(ctx.translate).toHaveBeenCalledWith(-5, -5); // restore origin
  });
});
