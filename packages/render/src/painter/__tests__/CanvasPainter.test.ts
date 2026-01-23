import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CanvasPainter from '../CanvasPainter';
import Storage from '../../Storage';
import ChartElement from '../../ChartElement';

// Mock canvas and context
const mockContext = {
  clearRect: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  scale: vi.fn(),
  setTransform: vi.fn(),
  fillRect: vi.fn(),
  drawImage: vi.fn(),
  imageSmoothingEnabled: true,
} as unknown as CanvasRenderingContext2D;

describe('CanvasPainter', () => {
  let container: HTMLElement;
  let storage: Storage;
  let painter: CanvasPainter;
  let createElementSpy: ReturnType<typeof vi.spyOn>;
  let getContextSpy: ReturnType<typeof vi.spyOn>;
  let toDataURLSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    container = document.createElement('div');
    storage = new Storage();

    const originalCreateElement = document.createElement.bind(document);
    createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((tag: string, options?: ElementCreationOptions) => {
        return originalCreateElement(tag, options);
      });

    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(mockContext);
    toDataURLSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
      .mockReturnValue('data:image/png;base64,mock');

    // Mock requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 0));
    vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));

    painter = new CanvasPainter(container, storage);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should initialize correctly', () => {
    expect(painter.getCanvas().tagName).toBe('CANVAS');
    expect(painter.getContext()).toBe(mockContext);
    expect(getContextSpy).toHaveBeenCalled();
  });

  it('should resize canvas', () => {
    painter.resize(500, 300);
    const canvas = painter.getCanvas();
    expect(canvas.width).toBe(500);
    expect(canvas.height).toBe(300);
    expect(canvas.style.width).toBe('500px');
    expect(canvas.style.height).toBe('300px');
    expect(mockContext.scale).toHaveBeenCalled();
  });

  it('should handle paint requests', async () => {
    const element = new ChartElement();
    element.render = vi.fn();
    storage.addRoot(element as any); // Simplification

    // Mock storage methods
    storage.getElementsList = () => [element];

    painter.paint();

    // Wait for async paint if needed (though paint() is synchronous if dirty)
    // Actually paint() checks dirty flag.
    // We need to verify that render was called.
    expect(element.render).toHaveBeenCalledWith(mockContext);
    expect(mockContext.clearRect).toHaveBeenCalled();
  });

  it('should not paint if not dirty', () => {
    // Force clean
    (painter as any)._dirty = false;
    const element = new ChartElement();
    element.render = vi.fn();
    storage.getElementsList = () => [element];

    painter.paint();
    expect(element.render).not.toHaveBeenCalled();
  });

  it('should get data URL', () => {
    const url = painter.getDataURL({ type: 'png' });
    expect(url).toBe('data:image/png;base64,mock');
    expect(toDataURLSpy).toHaveBeenCalledWith('image/png');
  });

  it('should get data URL with background color', () => {
    painter.getDataURL({ backgroundColor: '#fff' });
    expect(
      createElementSpy.mock.calls.filter(
        (call: [string, ElementCreationOptions?]) => call[0] === 'canvas',
      ).length,
    ).toBe(2);
  });

  it('should dispose resources', () => {
    const canvas = painter.getCanvas();
    const removeChildSpy = vi.spyOn(canvas.parentNode as Node, 'removeChild');
    painter.dispose();
    expect(removeChildSpy).toHaveBeenCalledWith(canvas);
  });

  it('should fallback to window resize listener when ResizeObserver is unavailable', () => {
    const prevResizeObserver = (window as any).ResizeObserver;
    (window as any).ResizeObserver = undefined;

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const dom = document.createElement('div');
    const storage2 = new Storage();
    const p = new CanvasPainter(dom, storage2);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    p.dispose();
    (window as any).ResizeObserver = prevResizeObserver;
  });

  it('should use setTimeout fallback when requestAnimationFrame is not available', () => {
    const prevRaf = (globalThis as any).requestAnimationFrame;
    const prevCaf = (globalThis as any).cancelAnimationFrame;
    (globalThis as any).requestAnimationFrame = undefined;
    (globalThis as any).cancelAnimationFrame = undefined;

    const setTimeoutSpy = vi
      .spyOn(globalThis, 'setTimeout')
      .mockImplementation((cb: any) => {
        cb(Date.now());
        return 1 as any;
      });

    const dom = document.createElement('div');
    const storage2 = new Storage();
    const p = new CanvasPainter(dom, storage2);
    const paintSpy = vi.spyOn(p, 'paint');

    (p as any)._dirty = false;
    p.markDirty();

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(paintSpy).toHaveBeenCalled();

    p.dispose();
    setTimeoutSpy.mockRestore();
    (globalThis as any).requestAnimationFrame = prevRaf;
    (globalThis as any).cancelAnimationFrame = prevCaf;
  });

  it('should fallback to clearTimeout when cancelAnimationFrame is not available', () => {
    const prevCaf = (globalThis as any).cancelAnimationFrame;
    (globalThis as any).cancelAnimationFrame = undefined;

    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    const dom = document.createElement('div');
    const storage2 = new Storage();
    const p = new CanvasPainter(dom, storage2);
    (p as any)._animationFrameId = 123;

    p.dispose();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(123);

    clearTimeoutSpy.mockRestore();
    (globalThis as any).cancelAnimationFrame = prevCaf;
  });
});
