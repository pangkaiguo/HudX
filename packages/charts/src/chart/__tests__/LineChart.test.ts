import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
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
  font: '',
} as unknown as CanvasRenderingContext2D;

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => mockContext,
    writable: true
  });
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

  it('should support smooth, areaStyle and symbol', () => {
    const chart = new LineChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['A', 'B'] },
      yAxis: { type: 'value' },
      series: [
        { 
          type: 'line', 
          data: [10, 20],
          smooth: true,
          areaStyle: { opacity: 0.5 },
          symbol: 'rect',
          symbolSize: 10
        }
      ]
    };
    chart.setOption(option);

    const activeLines = (chart as any)._activeLines;
    expect(activeLines.size).toBe(1);
    
    const seriesItem = activeLines.get(0);
    expect(seriesItem).toBeDefined();
    
    // Check if line is Path (smooth) instead of Polyline
    // We imported Polyline and Path in source, but here we can check constructor name or type
    expect(seriesItem.line.constructor.name).toBe('Path');
    
    // Check area existence
    expect(seriesItem.area).toBeDefined();
    expect(seriesItem.area.constructor.name).toBe('Path');
    
    // Check symbols
    expect(seriesItem.symbols.length).toBe(2);
    // Rect symbol should be created
    expect(seriesItem.symbols[0].constructor.name).toBe('Rect');
  });
});
