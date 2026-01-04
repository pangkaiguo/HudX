import { describe, it, expect, vi, beforeEach } from 'vitest';
import LineChart from '../LineChart';
import { ChartOption } from '../../types';

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
} as unknown as CanvasRenderingContext2D;

const originalCreateElement = document.createElement.bind(document);
vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
  if (tag === 'canvas') {
    const canvas = originalCreateElement('canvas');
    canvas.getContext = vi.fn(() => mockContext) as any;
    canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(canvas, 'width', { value: 800, writable: true });
    Object.defineProperty(canvas, 'height', { value: 600, writable: true });
    return canvas;
  }
  return originalCreateElement(tag);
});

if (!window.requestAnimationFrame) {
  vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 16));
}
if (!window.cancelAnimationFrame) {
  vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));
}
vi.stubGlobal('devicePixelRatio', 1);

describe('LineChart', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
  });

  it('should initialize correctly', () => {
    const chart = new LineChart(container);
    expect(chart).toBeDefined();
  });

  it('should render lines', () => {
    const chart = new LineChart(container);
    const option: ChartOption = {
      xAxis: { type: 'category', data: ['A', 'B'] },
      yAxis: { type: 'value' },
      series: [
        { type: 'line', data: [10, 20] }
      ]
    };
    chart.setOption(option);
    
    // Check if no error
    expect(chart).toBeDefined();
  });
});
