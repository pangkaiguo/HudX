import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';

// Mock hudx-render before importing ScatterChart
vi.mock('hudx-render', async (importOriginal) => {
  const actual = await importOriginal<typeof import('hudx-render')>();
  return {
    ...actual,
    Circle: undefined, // Mock Circle as undefined
  };
});

import ScatterChart from '../ScatterChart';

describe('ScatterChart (Mocked)', () => {
  let container: HTMLElement;

  beforeAll(() => {
     // Setup mocks similar to other test file
     const mockContext = {
        measureText: (text: string) => ({ width: text.length * 10 }),
        fillText: vi.fn(),
        strokeText: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        translate: vi.fn(),
        rotate: vi.fn(),
        scale: vi.fn(),
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
        fillRect: vi.fn(),
        strokeRect: vi.fn(),
        clearRect: vi.fn(),
        setTransform: vi.fn(),
        font: '',
        createPattern: vi.fn(() => ({})),
      } as unknown as CanvasRenderingContext2D;

      Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
        value: () => mockContext,
        writable: true,
      });

      if (!window.requestAnimationFrame) {
        vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 16));
      }
      if (!window.cancelAnimationFrame) {
        vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));
      }
      vi.stubGlobal('devicePixelRatio', 1);
  });

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
  });

  it('should log error if Circle class is not defined', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const chart = new ScatterChart(container);
    chart.setOption({
      series: [{ type: 'scatter', data: [[10, 10]] }]
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      '[ScatterChart] Circle class is not defined. Check imports.'
    );
    consoleSpy.mockRestore();
  });
});
