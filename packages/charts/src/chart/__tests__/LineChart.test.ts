import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import LineChart from '../LineChart';
import type { ChartOption } from 'hudx-render';

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
    writable: true,
  });

  // Mock Path2D for happy-dom environment
  vi.stubGlobal(
    'Path2D',
    class Path2D {
      constructor(d?: string | Path2D) { }
      addPath(path: Path2D, transform?: DOMMatrix2DInit) { }
      closePath() { }
      moveTo(x: number, y: number) { }
      lineTo(x: number, y: number) { }
      bezierCurveTo(
        cp1x: number,
        cp1y: number,
        cp2x: number,
        cp2y: number,
        x: number,
        y: number,
      ) { }
      quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) { }
      arc(
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
        counterclockwise?: boolean,
      ) { }
      arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) { }
      ellipse(
        x: number,
        y: number,
        radiusX: number,
        radiusY: number,
        rotation: number,
        startAngle: number,
        endAngle: number,
        counterclockwise?: boolean,
      ) { }
      rect(x: number, y: number, w: number, h: number) { }
    },
  );
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
          symbolSize: 10,
        },
      ],
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

  it('should highlight area on hover like legend hover', () => {
    const chart = new LineChart(container);
    const option: ChartOption = {
      animation: false,
      legend: { show: true },
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'S1',
          type: 'line',
          data: [10, 20, 15],
          areaStyle: { opacity: 0.5 },
          lineStyle: { width: 2 },
        },
        {
          name: 'S2',
          type: 'line',
          data: [12, 18, 16],
          areaStyle: { opacity: 0.5 },
          lineStyle: { width: 2 },
        },
      ],
    };
    chart.setOption(option);

    const activeLines = (chart as any)._activeLines as Map<
      number,
      { line: any; area?: any }
    >;
    const s1 = activeLines.get(0)!;
    const s2 = activeLines.get(1)!;
    expect(s1.area).toBeDefined();
    expect(s2.area).toBeDefined();

    s1.area.trigger('mouseover');
    expect(s1.area.style.opacity).toBeCloseTo(0.5);
    expect(s2.area.style.opacity).toBeCloseTo(0.1);
    expect(s1.line.style.lineWidth).toBe(3);
    expect(s2.line.style.opacity).toBeCloseTo(0.1);

    s1.area.trigger('mouseout');
    expect(s1.area.style.opacity).toBeCloseTo(0.5);
    expect(s2.area.style.opacity).toBeCloseTo(0.5);
    expect(s1.line.style.lineWidth).toBe(2);
    expect(s2.line.style.opacity).toBeCloseTo(1);
  });
});
