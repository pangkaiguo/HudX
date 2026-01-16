import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import BarChart from '../BarChart';
import type { ChartOption } from '../../types';

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
    writable: true,
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

  it('should support barWidth and showBackground', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['A', 'B'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [10, 20],
          barWidth: 20,
          showBackground: true,
          backgroundStyle: { color: '#eee' },
        },
      ],
    };
    chart.setOption(option);

    const activeBars = (chart as any)._activeBars;
    expect(activeBars.size).toBeGreaterThan(0);

    // Check if bars have correct width logic (roughly)
    const firstBar = activeBars.values().next().value;
    expect(firstBar.shape.width).toBe(20);

    // Verify background rect creation (checking internal root children)
    // Backgrounds are added to root but not stored in _activeBars map directly in the same way
    // We can check if root has more elements than bars + axis lines
    const root = (chart as any)._root;
    // 2 bars + 2 backgrounds + axis lines/ticks...
    // Just checking it runs without error and produces output is a basic check.
    // For more detail, we'd need to spy on Rect constructor or check root children types.
  });

  it('should support inverse axis', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['A', 'B'], inverse: true },
      yAxis: { type: 'value', inverse: true },
      series: [{ type: 'bar', data: [10, 20] }],
    };
    chart.setOption(option);

    // Basic execution check
    const activeBars = (chart as any)._activeBars;
    expect(activeBars.size).toBe(2);
  });
});
