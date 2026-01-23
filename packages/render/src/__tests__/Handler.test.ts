import { describe, it, expect, vi } from 'vitest';
import Handler from '../Handler';
import Storage from '../Storage';
import Group from '../Group';
import ChartElement from '../ChartElement';

class Box extends ChartElement {
  getBoundingRect() {
    return { x: 0, y: 0, width: 20, height: 20 };
  }
}

describe('Handler', () => {
  it('should initialize even when painter has no target', () => {
    const painter = {} as any;
    const storage = new Storage();
    const handler = new Handler(painter, storage);
    handler.dispose();
    expect((handler as any)._hovered).toBeNull();
    expect((handler as any)._dragging).toBeNull();
  });

  it('should no-op event point and cursor updates without target', () => {
    const painter = {} as any;
    const storage = new Storage();
    const handler = new Handler(painter, storage);

    expect((handler as any)._getEventPoint(new MouseEvent('mousemove'))).toEqual({
      x: 0,
      y: 0,
    });

    (handler as any)._updateCursor();
    handler.dispose();
  });

  it('should handle hover transitions and cursor updates', () => {
    const canvas = document.createElement('canvas');
    Object.defineProperty(canvas, 'getBoundingClientRect', {
      value: () => ({
        left: 5,
        top: 6,
        right: 105,
        bottom: 106,
        width: 100,
        height: 100,
      }),
    });

    const painter = {
      getCanvas: () => canvas,
      markDirty: vi.fn(),
    } as any;

    const storage = new Storage();
    const root = new Group({ id: 'root' });
    root.silent = true;
    const el = new Box({ id: 'box', cursor: 'pointer' });
    root.add(el);
    storage.addRoot(root);

    const handler = new Handler(painter, storage);

    const mouseover = vi.fn();
    const mouseout = vi.fn();
    el.on('mouseover', mouseover);
    el.on('mouseout', mouseout);

    (handler as any)._onMouseMove(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
    expect(mouseover).toHaveBeenCalledTimes(1);
    expect(canvas.style.cursor).toBe('pointer');

    (handler as any)._onMouseMove(
      new MouseEvent('mousemove', { clientX: 1000, clientY: 1000 }),
    );
    expect(mouseout).toHaveBeenCalledTimes(1);
    expect(canvas.style.cursor).toBe('default');
  });

  it('should handle drag lifecycle', () => {
    const canvas = document.createElement('canvas');
    Object.defineProperty(canvas, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
      }),
    });

    const markDirty = vi.fn();
    const painter = {
      getCanvas: () => canvas,
      markDirty,
    } as any;

    const storage = new Storage();
    const root = new Group({ id: 'root' });
    root.silent = true;
    const el = new Box({ id: 'box', draggable: true, transform: { x: 1, y: 2 } });
    root.add(el);
    storage.addRoot(root);

    const handler = new Handler(painter, storage);

    const drag = vi.fn();
    const dragend = vi.fn();
    el.on('drag', drag);
    el.on('dragend', dragend);

    (handler as any)._onMouseDown(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    (handler as any)._onMouseMove(new MouseEvent('mousemove', { clientX: 15, clientY: 20 }));

    expect(markDirty).toHaveBeenCalled();
    expect(el.transform.x).toBe(6);
    expect(el.transform.y).toBe(12);
    expect(drag).toHaveBeenCalledTimes(1);

    (handler as any)._onMouseUp(new MouseEvent('mouseup', { clientX: 15, clientY: 20 }));
    expect(dragend).toHaveBeenCalledTimes(1);
    expect((handler as any)._dragging).toBeNull();
  });

  it('should provide topTarget for nested elements', () => {
    const canvas = document.createElement('canvas');
    Object.defineProperty(canvas, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
      }),
    });

    const painter = { getCanvas: () => canvas, markDirty: vi.fn() } as any;
    const storage = new Storage();

    const outer = new Group({ id: 'outer' });
    outer.silent = true;
    const inner = new Group({ id: 'inner' });
    inner.silent = true;
    const el = new Box({ id: 'box' });
    inner.add(el);
    outer.add(inner);
    storage.addRoot(outer);

    const handler = new Handler(painter, storage);

    const click = vi.fn((ev: any) => {
      expect(ev.target).toBe(el);
      expect(ev.topTarget).toBe(outer);
    });
    el.on('click', click);

    (handler as any)._onClick(new MouseEvent('click', { clientX: 5, clientY: 5 }));
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('should handle touch events', () => {
    const canvas = document.createElement('canvas');
    Object.defineProperty(canvas, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
      }),
    });

    const painter = { getCanvas: () => canvas, markDirty: vi.fn() } as any;
    const storage = new Storage();
    const root = new Group({ id: 'root' });
    root.silent = true;
    const el = new Box({ id: 'box' });
    root.add(el);
    storage.addRoot(root);

    const handler = new Handler(painter, storage);

    const touchstart = vi.fn();
    const touchmove = vi.fn();
    const touchend = vi.fn();
    el.on('touchstart', touchstart);
    el.on('touchmove', touchmove);
    el.on('touchend', touchend);

    const preventDefault = vi.fn();
    const eventBase = {
      preventDefault,
      touches: [{ clientX: 5, clientY: 6 }],
      changedTouches: [{ clientX: 5, clientY: 6 }],
    } as any;

    (handler as any)._onTouchStart(eventBase);
    (handler as any)._onTouchMove(eventBase);
    (handler as any)._onTouchEnd(eventBase);

    expect(preventDefault).toHaveBeenCalledTimes(3);
    expect(touchstart).toHaveBeenCalledTimes(1);
    expect(touchmove).toHaveBeenCalledTimes(1);
    expect(touchend).toHaveBeenCalledTimes(1);
  });

  it('should forward dblclick/contextmenu/wheel and mouseout events', () => {
    const canvas = document.createElement('canvas');
    Object.defineProperty(canvas, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
      }),
    });

    const painter = { getCanvas: () => canvas, markDirty: vi.fn() } as any;
    const storage = new Storage();
    const root = new Group({ id: 'root' });
    root.silent = true;
    const el = new Box({ id: 'box', cursor: 'pointer' });
    root.add(el);
    storage.addRoot(root);

    const handler = new Handler(painter, storage);

    const dbl = vi.fn();
    const ctx = vi.fn();
    const wh = vi.fn();
    const out = vi.fn();
    el.on('dblclick', dbl);
    el.on('contextmenu', ctx);
    el.on('mousewheel', wh);
    el.on('mouseout', out);

    (handler as any)._onMouseMove(
      new MouseEvent('mousemove', { clientX: 1, clientY: 1 }),
    );
    expect(canvas.style.cursor).toBe('pointer');

    (handler as any)._onDblClick(new MouseEvent('dblclick', { clientX: 1, clientY: 1 }));
    (handler as any)._onContextMenu(
      new MouseEvent('contextmenu', { clientX: 1, clientY: 1 }),
    );
    (handler as any)._onWheel(
      new WheelEvent('wheel', { clientX: 1, clientY: 1 }),
    );
    expect(dbl).toHaveBeenCalledTimes(1);
    expect(ctx).toHaveBeenCalledTimes(1);
    expect(wh).toHaveBeenCalledTimes(1);

    (handler as any)._onMouseOut(new MouseEvent('mouseout', { clientX: 1, clientY: 1 }));
    expect(out).toHaveBeenCalledTimes(1);
    expect(canvas.style.cursor).toBe('default');
  });
});
