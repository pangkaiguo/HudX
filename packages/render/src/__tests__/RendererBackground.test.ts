import { describe, it, expect, vi, beforeAll } from 'vitest';
import Renderer from '../Renderer';
import { ThemeManager } from '../theme/ThemeManager';

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
});

