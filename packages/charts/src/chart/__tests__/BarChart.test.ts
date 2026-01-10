import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import BarChart from '../BarChart';
import { ChartOption } from '../../types';

// Mock canvas and context
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

// We don't stub global document/window aggressively to keep happy-dom functionality
// We only patch what we need
beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => mockContext,
    writable: true
  });
});

// Mock requestAnimationFrame if not present (happy-dom might have it or not)
if (!window.requestAnimationFrame) {
  vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 16));
}
if (!window.cancelAnimationFrame) {
  vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));
}

// Ensure devicePixelRatio
vi.stubGlobal('devicePixelRatio', 1);

describe('BarChart', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    // Mock container size
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
  });

  it('should initialize correctly', () => {
    const chart = new BarChart(container);
    expect(chart).toBeDefined();
  });

  it('should render bars', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      xAxis: { type: 'category', data: ['A', 'B'] },
      yAxis: { type: 'value' },
      series: [
        { type: 'bar', data: [10, 20] }
      ]
    };
    chart.setOption(option);

    // Check internal state using any cast
    const activeBars = (chart as any)._activeBars;
    expect(activeBars).toBeDefined();
    expect(activeBars.size).toBeGreaterThan(0);
  });
});
