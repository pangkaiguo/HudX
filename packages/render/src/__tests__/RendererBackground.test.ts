import { describe, it, expect, vi, beforeAll } from 'vitest';
import Renderer from '../Renderer';
import { ThemeManager } from '../theme/ThemeManager';
import Rect from '../graphic/Rect';

beforeAll(() => {
  const mockContext = {
    save: vi.fn(),
    restore: vi.fn(),
    setTransform: vi.fn(),
    scale: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    closePath: vi.fn(),
    rect: vi.fn(),
    arc: vi.fn(),
    clip: vi.fn(),
    setLineDash: vi.fn(),
    strokeRect: vi.fn(),
    drawImage: vi.fn(),
    measureText: (text: string) => ({ width: text.length * 10 }),
    font: '',
  } as unknown as CanvasRenderingContext2D;

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn((contextId: string) => {
      if (contextId === '2d') return mockContext;
      return null;
    }),
    writable: true,
  });
});

describe('Renderer background behavior', () => {
  it('should keep background consistent when switching renderMode', () => {
    const dom = document.createElement('div');
    Object.defineProperty(dom, 'clientWidth', { value: 800 });
    Object.defineProperty(dom, 'clientHeight', { value: 600 });

    const theme = 'light';
    const expected = ThemeManager.getTheme(theme).backgroundColor;

    const renderer = Renderer.init(dom, 'svg', theme);
    expect(renderer.getRenderMode()).toBe('svg');
    const svg = (renderer as any)._painter.getSVG?.();
    expect(svg.style.backgroundColor).toBe(expected);

    renderer.setRenderMode('canvas');
    expect(renderer.getRenderMode()).toBe('canvas');
    const canvas = (renderer as any)._painter.getCanvas?.();
    expect(canvas.style.backgroundColor).toBe(expected);
  });

  it('should allow overriding background color and persist across modes', () => {
    const dom = document.createElement('div');
    Object.defineProperty(dom, 'clientWidth', { value: 800 });
    Object.defineProperty(dom, 'clientHeight', { value: 600 });

    const renderer = Renderer.init(dom, 'canvas', 'light');
    renderer.setBackgroundColor('transparent');
    const canvas = (renderer as any)._painter.getCanvas?.();
    expect(canvas.style.backgroundColor).toBe('transparent');

    renderer.setRenderMode('svg');
    const svg = (renderer as any)._painter.getSVG?.();
    expect(svg.style.backgroundColor).toBe('transparent');
  });

  it('should init via selector string and throw if missing', () => {
    const dom = document.createElement('div');
    dom.id = 'renderer-host';
    Object.defineProperty(dom, 'clientWidth', { value: 10 });
    Object.defineProperty(dom, 'clientHeight', { value: 10 });
    document.body.appendChild(dom);

    const renderer = Renderer.init('#renderer-host', 'canvas', 'light');
    expect(renderer.getDom()).toBe(dom);

    renderer.dispose();
    dom.remove();

    expect(() => Renderer.init('#renderer-host-missing' as any)).toThrow();
  });

  it('should add/remove/removeAll elements and flush paints', () => {
    const dom = document.createElement('div');
    Object.defineProperty(dom, 'clientWidth', { value: 10 });
    Object.defineProperty(dom, 'clientHeight', { value: 10 });
    const renderer = Renderer.init(dom, 'canvas', 'light');

    const painter = (renderer as any)._painter;
    const markDirtySpy = vi.spyOn(painter, 'markDirty');
    const paintSpy = vi.spyOn(painter, 'paint');

    const r = new Rect({
      id: 'r1',
      shape: { x: 0, y: 0, width: 1, height: 1 },
    });
    renderer.add(r);
    expect(markDirtySpy).toHaveBeenCalled();
    expect(renderer.getElementById('r1')).toBeDefined();

    markDirtySpy.mockClear();
    renderer.remove(r);
    expect(markDirtySpy).toHaveBeenCalled();
    expect(renderer.getElementById('r1')).toBeUndefined();

    renderer.add(r);
    renderer.removeAll();
    expect(renderer.getElementById('r1')).toBeUndefined();

    renderer.flush();
    expect(paintSpy).toHaveBeenCalled();

    renderer.dispose();
  });

  it('should follow global theme changes when theme is undefined', () => {
    const dom = document.createElement('div');
    Object.defineProperty(dom, 'clientWidth', { value: 10 });
    Object.defineProperty(dom, 'clientHeight', { value: 10 });

    ThemeManager.setCurrentTheme('light');
    const renderer = Renderer.init(dom, 'canvas', undefined, 'en');
    const painter = (renderer as any)._painter;
    const markDirtySpy = vi.spyOn(painter, 'markDirty');

    ThemeManager.setCurrentTheme('dark');
    expect(renderer.getTheme()).toBe('dark');
    expect(markDirtySpy).toHaveBeenCalled();

    renderer.setTheme('light');
    const prevCalls = markDirtySpy.mock.calls.length;
    ThemeManager.setCurrentTheme('dark');
    expect(renderer.getTheme()).toBe('light');
    expect(markDirtySpy.mock.calls.length).toBe(prevCalls);

    renderer.dispose();
  });

  it('should no-op setRenderMode if same mode and handle dispose twice', () => {
    const dom = document.createElement('div');
    Object.defineProperty(dom, 'clientWidth', { value: 10 });
    Object.defineProperty(dom, 'clientHeight', { value: 10 });
    const renderer = Renderer.init(dom, 'svg', 'light');

    const painter = (renderer as any)._painter;
    const disposeSpy = vi.spyOn(painter, 'dispose');
    renderer.setRenderMode('svg');
    expect(disposeSpy).not.toHaveBeenCalled();

    renderer.dispose();
    renderer.dispose();
  });

  it('should set locale and translate strings', () => {
    const dom = document.createElement('div');
    Object.defineProperty(dom, 'clientWidth', { value: 10 });
    Object.defineProperty(dom, 'clientHeight', { value: 10 });
    const renderer = Renderer.init(dom, 'canvas', 'light', 'en');

    const painter = (renderer as any)._painter;
    const markDirtySpy = vi.spyOn(painter, 'markDirty');
    renderer.setLocale('zh-CN');
    expect(renderer.getLocale()).toBe('zh-CN');
    expect(markDirtySpy).toHaveBeenCalled();
    expect(renderer.t('data.loading', 'Loading...')).toBe('加载中...');

    renderer.dispose();
  });
});
