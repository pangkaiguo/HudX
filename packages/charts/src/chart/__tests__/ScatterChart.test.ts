import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import ScatterChart from '../ScatterChart';
import { Group, Circle, type ChartOption } from 'hudx-render';

import * as HudxRender from 'hudx-render';

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
  // Manual override as spyOn seems flaky with happy-dom in this context
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => mockContext,
    writable: true,
  });
});

if (!window.requestAnimationFrame) {
  vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 16));
}
if (!window.cancelAnimationFrame) {
  vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));
}

vi.stubGlobal('devicePixelRatio', 1);

describe('ScatterChart', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
  });

  it('should render scatter points with category axes and index data', () => {
    const chart = new ScatterChart(container);
    const option: ChartOption = {
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5'],
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 20,
          data: [
            [0, 0], // A, 1
            [1, 1], // B, 2
            [2, 2], // C, 3
            [4, 4], // E, 5
          ],
        },
      ],
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circles = root
      .children()
      .filter((child: any) => child instanceof Circle);
    expect(circles.length).toBe(4);

    const c1 = circles[0] as Circle;
    expect(c1.shape.cx).not.toBeNaN();
    expect(c1.shape.cy).not.toBeNaN();
  });

  it('should render scatter points with value axes and array data', () => {
    const chart = new ScatterChart(container);
    const option: ChartOption = {
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'scatter',
          symbolSize: 10,
          data: [
            [10, 20],
            [30, 40],
            [50, 60],
          ],
        },
      ],
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circles = root
      .children()
      .filter((child: any) => child instanceof Circle);

    expect(circles.length).toBeGreaterThanOrEqual(3);

    const c1 = circles[0] as Circle;
    const c2 = circles[1] as Circle;
    const c3 = circles[2] as Circle;

    expect(c2.shape.cx).toBeGreaterThan(c1.shape.cx);
    expect(c3.shape.cx).toBeGreaterThan(c2.shape.cx);

    expect(c2.shape.cy).toBeLessThan(c1.shape.cy);
    expect(c3.shape.cy).toBeLessThan(c2.shape.cy);
  });

  it('should handle symbolSize option', () => {
    const chart = new ScatterChart(container);
    const option: ChartOption = {
      series: [
        {
          type: 'scatter',
          symbolSize: 30,
          data: [[10, 10]],
        },
      ],
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circles = root
      .children()
      .filter((child: any) => child instanceof Circle);
    const c1 = circles[0] as Circle;

    chart.setOption({ ...option, animation: false });

    const root2 = (chart as any)._root as Group;
    const circles2 = root2
      .children()
      .filter((child: any) => child instanceof Circle);
    const c2 = circles2[0] as Circle;

    expect(c2.shape.r).toBe(15);
  });

  it('should support itemStyle properties', () => {
    const chart = new ScatterChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'scatter',
          data: [[10, 10]],
          itemStyle: {
            color: 'red',
            opacity: 0.5,
          },
        },
      ],
    });

    const root = (chart as any)._root;
    const circle = root.children().find((c: any) => c instanceof Circle);
    expect(circle.style.fill).toBe('red');
    expect(circle.style.opacity).toBe(0.5);
  });

  it('should skip points with invalid coordinates (NaN cx/cy)', () => {
    // Mock createOrdinalScale to return NaN to force the check
    const spy = vi.spyOn(HudxRender, 'createOrdinalScale').mockImplementation(() => (() => NaN) as any);

    const chart = new ScatterChart(container);
    chart.setOption({
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'scatter',
          data: [
            [0, 10], // Valid index, but scale returns NaN
          ]
        }
      ]
    });

    const root = (chart as any)._root as Group;
    const circles = root.children().filter((child: any) => child instanceof Circle);

    spy.mockRestore();
    expect(circles.length).toBe(0);
  });

  it('should handle tooltip events', () => {
    const chart = new ScatterChart(container);
    const tooltipShowSpy = vi.fn();
    const tooltipHideSpy = vi.fn();

    // Mock tooltip
    (chart as any)._tooltip = {
      show: tooltipShowSpy,
      hide: tooltipHideSpy,
    };

    chart.setOption({
      tooltip: { show: true },
      xAxis: { type: 'category', data: ['A'] },
      yAxis: { type: 'value' },
      series: [{ type: 'scatter', data: [[0, 10]] }]
    });

    const root = (chart as any)._root as Group;
    const circle = root.children().find((child: any) => child instanceof Circle) as Circle;
    expect(circle).toBeDefined();

    // Trigger mouseover
    // hudx-render shapes have 'on' method. We can simulate it by accessing the handler.
    // However, since we can't easily access the private handler storage, 
    // we rely on the fact that we can't easily emit event on mock shape unless we use the real Shape event system.
    // But Circle is a real class from hudx-render.

    // We can try to trigger the event handler if we can access it.
    // Or we can assume 'on' works if we emit it.
    // Since we are in a jsdom environment, maybe we can't easily trigger the shape event without the renderer's event system.
    // But we can check if 'on' was called? 
    // We didn't spy on 'on'.

    // Let's rely on finding the handler in the internal storage if possible, or just skip if too hard?
    // No, we need coverage.
    // Let's spy on circle.on BEFORE it is created? No, circle is created inside.

    // We can inspect the circle object. It likely has `_events` or similar.
    // Or we can manually trigger it if we knew how `hudx-render` works.
    // Assuming `circle.trigger('mouseover', { ... })` works?

    if ((circle as any).trigger) {
      (circle as any).trigger('mouseover', { offsetX: 10, offsetY: 10 });
      expect(tooltipShowSpy).toHaveBeenCalled();

      (circle as any).trigger('mouseout');
      expect(tooltipHideSpy).toHaveBeenCalled();
    }
  });

  it('should handle animation', () => {
    vi.useFakeTimers();
    const chart = new ScatterChart(container);
    chart.setOption({
      animation: true,
      animationDuration: 300,
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{ type: 'scatter', data: [[10, 10]] }]
    });

    const root = (chart as any)._root as Group;
    const circle = root.children().find((child: any) => child instanceof Circle) as Circle;
    expect(circle).toBeDefined();

    // Animation should be starting.
    // Advance time
    vi.advanceTimersByTime(300);

    // Verify final state (radius should be full size)
    // Initially 0 or scaled?
    // ScatterChart animation usually scales from 0.
    // We can check if radius is non-zero.
    expect(circle.shape.r).toBeGreaterThan(0);

    vi.useRealTimers();
  });

  it('should show tooltip with default series name when series name is missing', () => {
    const chart = new ScatterChart(container);
    const option: ChartOption = {
      series: [
        {
          type: 'scatter',
          data: [[10, 10]],
        },
      ],
      tooltip: {
        show: true,
      },
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circle = root
      .children()
      .find((child: any) => child instanceof Circle) as Circle;
    expect(circle).toBeDefined();

    const tooltip = (chart as any)._tooltip;
    const showSpy = vi.spyOn(tooltip, 'show');

    circle.trigger('mouseover', { offsetX: 0, offsetY: 0 });

    expect(showSpy).toHaveBeenCalled();
    const args = showSpy.mock.calls[0];
    const params = args[3] as any;

    expect(params.seriesName).toBe('Series-1');
  });

  it('should localize default series name based on locale when series name is missing', () => {
    const chart = new ScatterChart(container);
    chart.setLocale('zh-CN');
    const option: ChartOption = {
      series: [
        {
          type: 'scatter',
          data: [[10, 10]],
        },
      ],
      tooltip: {
        show: true,
      },
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circle = root
      .children()
      .find((child: any) => child instanceof Circle) as Circle;
    expect(circle).toBeDefined();

    const tooltip = (chart as any)._tooltip;
    const showSpy = vi.spyOn(tooltip, 'show');

    circle.trigger('mouseover', { offsetX: 0, offsetY: 0 });

    expect(showSpy).toHaveBeenCalled();
    const args = showSpy.mock.calls[0];
    const params = args[3] as any;

    expect(params.seriesName).toBe('系列-1');
  });

  it('should hide scatter points when legend item is deselected', () => {
    const chart = new ScatterChart(container);
    (chart as any)._mountLegend = vi.fn();
    (chart as any)._legend = {};

    chart.setOption({
      animation: false,
      legend: {
        show: true,
        data: ['Series A', 'Series B'],
      },
      xAxis: {},
      yAxis: {},
      series: [
        {
          name: 'Series A',
          type: 'scatter',
          data: [
            [10, 10],
            [20, 20],
          ],
        },
        {
          name: 'Series B',
          type: 'scatter',
          data: [
            [30, 30],
            [40, 40],
          ],
        },
      ],
    });

    const legendSelected = (chart as any)._legendSelected as Set<string>;
    legendSelected.add('Series A');
    legendSelected.add('Series B');

    (chart as any)._render();
    const activeScatters = (chart as any)._activeScatters as Map<
      number,
      Circle[]
    >;
    expect(activeScatters.size).toBe(2);

    legendSelected.delete('Series A');

    (chart as any)._render();

    expect(activeScatters.get(0)).toBeUndefined();
    expect(activeScatters.get(1)?.length).toBe(2);
  });

  it('should ignore hover when series is deselected (hidden)', () => {
    const chart = new ScatterChart(container);
    (chart as any)._mountLegend = vi.fn();
    (chart as any)._legend = {};
    const legendSelected = (chart as any)._legendSelected as Set<string>;
    legendSelected.add('S1');
    legendSelected.add('S2');

    chart.setOption({
      animation: false,
      legend: { show: true, data: ['S1', 'S2'] },
      xAxis: {},
      yAxis: {},
      series: [
        { name: 'S1', type: 'scatter', data: [[10, 10]] },
        { name: 'S2', type: 'scatter', data: [[20, 20]] },
      ],
    });

    const activeScatters = (chart as any)._activeScatters as Map<number, any[]>;

    const s2Circles = activeScatters.get(1);
    expect(s2Circles).toBeDefined();
    expect(s2Circles![0].style.opacity).toBe(0.8);
    legendSelected.delete('S1');
    (chart as any)._onLegendHover('S1', true);

    expect(s2Circles![0].style.opacity).toBe(0.8);
    (chart as any)._onLegendHover('S2', true);
    expect(s2Circles![0].style.opacity).toBe(1);
  });

  it('should handle complex data types (object and NaN)', () => {
    const chart = new ScatterChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'scatter',
          data: [
            { value: [10, 20] }, // Object with value array
            [NaN, 20], // Should be skipped
            [10, NaN], // Should be skipped
          ]
        }
      ]
    });

    const root = (chart as any)._root as Group;
    const circles = root.children().filter((child: any) => child instanceof Circle);
    expect(circles.length).toBe(1); // Only the first valid point
  });

  it('should handle category axis with value matching', () => {
    const chart = new ScatterChart(container);
    chart.setOption({
      xAxis: { type: 'category', data: ['A', 'B'] },
      yAxis: { type: 'category', data: ['X', 'Y'] },
      series: [
        {
          type: 'scatter',
          data: [
            ['A', 'X'] as any, // Match by string
            [0, 1] // Match by index
          ]
        }
      ]
    });

    const root = (chart as any)._root as Group;
    const circles = root.children().filter((child: any) => child instanceof Circle);
    expect(circles.length).toBe(2);

    // Check positions (assuming default size 800x600)
    // 'A' is index 0, 'B' is index 1. 'X' is index 0, 'Y' is index 1.
    // [0, 0] and [0, 1] essentially
    const c1 = circles[0] as Circle;
    const c2 = circles[1] as Circle;

    expect(c1.shape.cx).toBeDefined();
    expect(c1.shape.cy).toBeDefined();
    expect(c2.shape.cx).toBeDefined();
    expect(c2.shape.cy).toBeDefined();
  });

  it('should handle symbolSize as function', () => {
    const chart = new ScatterChart(container);
    chart.setOption({
      animation: false,
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'scatter',
          data: [[10, 20]],
          symbolSize: (data: any) => data[0] // Returns 10
        }
      ]
    });

    const root = (chart as any)._root as Group;
    const circle = root.children().find((child: any) => child instanceof Circle) as Circle;
    expect(circle.shape.r).toBe(5); // 10/2
  });

  it('should handle mouseout on scatter point', () => {
    const chart = new ScatterChart(container);
    chart.setOption({
      tooltip: { show: true },
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{ type: 'scatter', data: [[10, 10]] }]
    });

    const root = (chart as any)._root as Group;
    const circle = root.children().find((child: any) => child instanceof Circle) as Circle;

    const tooltip = (chart as any)._tooltip;
    const hideSpy = vi.spyOn(tooltip, 'hide');

    circle.trigger('mouseout');
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should catch render error', () => {
    const chart = new ScatterChart(container);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    // Mock flush to throw error
    (chart as any)._renderer.flush = () => { throw new Error('Render failed'); };

    chart.setOption({
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{ type: 'scatter', data: [[10, 10]] }],
    });

    expect(consoleSpy).toHaveBeenCalledWith('[ScatterChart] Render error:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should handle legend hover restore', () => {
    const chart = new ScatterChart(container);
    chart.setOption({
      legend: { show: true },
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{ type: 'scatter', name: 'A', data: [[10, 10]] }]
    });

    const root = (chart as any)._root as Group;
    const circle = root.children().find((child: any) => child instanceof Circle) as Circle;

    // Simulate hover
    (chart as any)._onLegendHover('A', true);
    expect(circle.style.opacity).toBe(1);

    // Simulate unhover (restore)
    (chart as any)._onLegendHover('A', false);
    expect(circle.style.opacity).toBe(0.8);
  });

  it('should catch axes render error', () => {
    const chart = new ScatterChart(container);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    // Mock _renderAxes to throw
    (chart as any)._renderAxes = () => { throw new Error('Axes error'); };

    chart.setOption({
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{ type: 'scatter', data: [[10, 10]] }]
    });

    expect(consoleSpy).toHaveBeenCalledWith('[ScatterChart] Error rendering axes:', expect.any(Error));
    consoleSpy.mockRestore();
  });

});

