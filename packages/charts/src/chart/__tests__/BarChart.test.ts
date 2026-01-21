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

    const firstBar = activeBars.values().next().value;
    expect(firstBar.shape.width).toBe(20);

    const root = (chart as any)._root;
  });

  it('should support barCategoryGap and barGap', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [10],
          barCategoryGap: '50%',
          barGap: '0%',
        },
      ],
    };
    chart.setOption(option);

    const activeBars = (chart as any)._activeBars;
    const bar = activeBars.values().next().value;
    // Category width = 800 (1 category) -> actually plot width is ~700 due to padding (50px each side)
    // Gap = 50%
    // Bar width = 50% of 700 = 350
    expect(bar.shape.width).toBeCloseTo(350);

    // Test with barGap
    const chart2 = new BarChart(document.createElement('div'));
    chart2.resize(800, 600);
    chart2.setOption({
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        { type: 'bar', data: [10], barCategoryGap: '20%', barGap: '100%' }, // 100% gap between bars
        { type: 'bar', data: [20] },
      ],
    });
    // Category width = 700
    // Category gap = 20% = 140. Available = 560.
    // 2 bars + 1 gap (100% of bar width)
    // W + W + W = 3W = 560 => W = 186.66
    const bars = Array.from((chart2 as any)._activeBars.values()) as any[];
    expect(bars[0].shape.width).toBeCloseTo(560 / 3, 1);
  });

  it('should support stacking (positive and negative)', () => {
    const chart = new BarChart(container);
    const option: ChartOption = {
      animation: false,
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        { type: 'bar', stack: 'total', data: [10] },
        { type: 'bar', stack: 'total', data: [20] },
        { type: 'bar', stack: 'total', data: [-10] },
      ],
    };
    chart.setOption(option);

    const bars = Array.from((chart as any)._activeBars.values()) as any[];
    const b1 = bars.find((b: any) => b.style.fill === (option.series![0] as any).color || b.style.fill !== undefined);

    const bar0 = (chart as any)._activeBars.get('0-0');
    const bar1 = (chart as any)._activeBars.get('1-0');
    const bar2 = (chart as any)._activeBars.get('2-0');

    expect(bar0).toBeDefined();
    expect(bar1).toBeDefined();
    expect(bar2).toBeDefined();
    expect(bar1.shape.y + bar1.shape.height).toBeCloseTo(bar0.shape.y, 1);
    expect(bar2.shape.y).toBeCloseTo(bar0.shape.y + bar0.shape.height, 1);
  });

  it('should support itemStyle properties', () => {
    const chart = new BarChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [10],
          itemStyle: {
            borderColor: 'red',
            borderWidth: 2,
            borderRadius: [5, 5, 0, 0],
            opacity: 0.5,
          },
        },
      ],
    });

    const bar = (chart as any)._activeBars.get('0-0');
    expect(bar.style.stroke).toBe('red');
    expect(bar.style.lineWidth).toBe(2);
    expect(bar.style.opacity).toBe(0.5);
    expect(bar.shape.r).toEqual([5, 5, 0, 0]);
  });

  it('should support backgroundStyle options', () => {
    const chart = new BarChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [10],
          showBackground: true,
          backgroundStyle: {
            color: 'blue',
            borderColor: 'green',
            borderWidth: 3,
            opacity: 0.3,
          },
        },
      ],
    });

    const root = (chart as any)._root;
    // Find background rect (usually z is lower)
    const children = root.children();
    const bgRect = children.find((c: any) => c.style.fill === 'blue');
    expect(bgRect).toBeDefined();
    expect(bgRect.style.stroke).toBe('green');
    expect(bgRect.style.lineWidth).toBe(3);
    expect(bgRect.style.opacity).toBe(0.3);
  });

  it('should support label formatter with templates', () => {
    const chart = new BarChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'category', data: ['CatA'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'SeriesA',
          type: 'bar',
          data: [100],
          label: {
            show: true,
            formatter: '{a} - {b}: {c}',
          },
        },
      ],
    });

    const label = (chart as any)._activeLabels.get('0-0');
    expect(label).toBeDefined();
    expect(label.shape.text).toBe('SeriesA - CatA: 100');
  });

  it('should support barMaxWidth', () => {
    const chart = new BarChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [10],
          barMaxWidth: 10,
        },
      ],
    });

    const bar = (chart as any)._activeBars.get('0-0');
    expect(bar.shape.width).toBe(10);
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
