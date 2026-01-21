import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import BarChart from '../BarChart';
import type { ChartOption } from 'hudx-render';

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

  it('should support per-series labels', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['A', 'B'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          name: 'S1',
          data: [10, 20],
          label: { show: true, position: 'outside' },
        },
      ],
    };
    chart.setOption(option);

    const activeLabels = (chart as any)._activeLabels;
    expect(activeLabels.size).toBe(2);
    const firstLabel = activeLabels.values().next().value;
    expect(firstLabel.shape.text).toBeDefined();
    expect(String(firstLabel.shape.text).length).toBeGreaterThan(0);
  });

  it('should support diverging horizontal bars with labels', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      series: [
        {
          name: 'Profit',
          type: 'bar',
          data: [200, 170, 240],
          label: { show: true, position: 'inside', formatter: '{a}: {c}' },
        },
        {
          name: 'Expenses',
          type: 'bar',
          data: [-120, -132, -101],
          label: { show: true, position: 'outside', formatter: '{c}' },
        },
        {
          name: 'Income',
          type: 'bar',
          data: [320, 302, 341],
          label: { show: true, position: 'inside', formatter: '{c}' },
        },
      ],
    };
    chart.setOption(option);

    const activeBars = (chart as any)._activeBars;
    expect(activeBars.size).toBe(9);
    const negativeBars = Array.from(activeBars.values()).filter(
      (b: any) => b.__isPositive === false,
    );
    expect(negativeBars.length).toBe(3);

    const activeLabels = (chart as any)._activeLabels;
    expect(activeLabels.size).toBe(9);
    const firstLabel = activeLabels.values().next().value;
    expect(String(firstLabel.shape.text).length).toBeGreaterThan(0);
  });

  it('should support diverging vertical bars with labels', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Profit',
          type: 'bar',
          data: [200, 170, 240],
          label: { show: true, position: 'inside', formatter: '{a}: {c}' },
        },
        {
          name: 'Expenses',
          type: 'bar',
          data: [-120, -132, -101],
          label: { show: true, position: 'outside', formatter: '{c}' },
        },
        {
          name: 'Income',
          type: 'bar',
          data: [320, 302, 341],
          label: { show: true, position: 'inside', formatter: '{c}' },
        },
      ],
    };
    chart.setOption(option);

    const activeBars = (chart as any)._activeBars;
    expect(activeBars.size).toBe(9);
    const negativeBars = Array.from(activeBars.values()).filter(
      (b: any) => b.__isPositive === false,
    );
    expect(negativeBars.length).toBe(3);

    const activeLabels = (chart as any)._activeLabels;
    expect(activeLabels.size).toBe(9);
  });

  it('should highlight hovered bar series and dim others to 0.2 (sync with legend hover)', () => {
    const chart = new BarChart(container);
    chart.setOption({
      animation: false,
      tooltip: { show: true, trigger: 'item' },
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'S1',
          type: 'bar',
          data: [10, 20, 30],
          itemStyle: { opacity: 0.8 },
          label: { show: true, opacity: 0.8 },
          emphasis: { focus: 'series' },
        },
        {
          name: 'S2',
          type: 'bar',
          data: [5, 15, 25],
          itemStyle: { opacity: 0.8 },
          label: { show: true, opacity: 0.8 },
          emphasis: { focus: 'series' },
        },
      ],
    } satisfies ChartOption);

    const activeBars = (chart as any)._activeBars as Map<string, any>;
    const activeLabels = (chart as any)._activeLabels as Map<string, any>;
    expect(activeBars.size).toBe(6);
    expect(activeLabels.size).toBe(6);

    const s1Bar0 = activeBars.get('0-0');
    expect(s1Bar0).toBeDefined();

    s1Bar0.trigger('mouseover', { offsetX: 0, offsetY: 0 });
    activeBars.forEach((bar, key) => {
      const expected = key.startsWith('0-') ? 1 : 0.2;
      expect(bar.style.opacity).toBeCloseTo(expected);
    });
    activeLabels.forEach((label, key) => {
      const expected = key.startsWith('0-') ? 1 : 0.2;
      expect(label.style.opacity).toBeCloseTo(expected);
    });

    s1Bar0.trigger('mouseout');
    activeBars.forEach((bar) => {
      expect(bar.style.opacity).toBeCloseTo(0.8);
    });
    activeLabels.forEach((label) => {
      expect(label.style.opacity).toBeCloseTo(0.8);
    });

    (chart as any)._onLegendHover('S2', true);
    activeBars.forEach((bar, key) => {
      const expected = key.startsWith('1-') ? 1 : 0.2;
      expect(bar.style.opacity).toBeCloseTo(expected);
    });
    activeLabels.forEach((label, key) => {
      const expected = key.startsWith('1-') ? 1 : 0.2;
      expect(label.style.opacity).toBeCloseTo(expected);
    });

    (chart as any)._onLegendHover('S2', false);
    activeBars.forEach((bar) => {
      expect(bar.style.opacity).toBeCloseTo(0.8);
    });
    activeLabels.forEach((label) => {
      expect(label.style.opacity).toBeCloseTo(0.8);
    });
  });
});
