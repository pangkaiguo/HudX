import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import ScatterChart from '../ScatterChart';
import type { ChartOption } from '../../types';
import { Group, Circle } from 'HudX/core';

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
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5']
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 20,
          data: [
            [0, 0], // A, 1
            [1, 1], // B, 2
            [2, 2], // C, 3
            [4, 4]  // E, 5
          ]
        }
      ]
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circles = root.children().filter((child: any) => child instanceof Circle);
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
            [50, 60]
          ]
        }
      ]
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circles = root.children().filter((child: any) => child instanceof Circle);

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
          data: [[10, 10]]
        }
      ]
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circles = root.children().filter((child: any) => child instanceof Circle);
    const c1 = circles[0] as Circle;

    chart.setOption({ ...option, animation: false });

    const root2 = (chart as any)._root as Group;
    const circles2 = root2.children().filter((child: any) => child instanceof Circle);
    const c2 = circles2[0] as Circle;

    expect(c2.shape.r).toBe(15);
  });

  it('should show tooltip with default series name when series name is missing', () => {
    const chart = new ScatterChart(container);
    const option: ChartOption = {
      series: [
        {
          type: 'scatter',
          data: [[10, 10]]
        }
      ],
      tooltip: {
        show: true
      }
    };
    chart.setOption(option);

    const root = (chart as any)._root as Group;
    const circle = root.children().find((child: any) => child instanceof Circle) as Circle;
    expect(circle).toBeDefined();

    const tooltip = (chart as any)._tooltip;
    const showSpy = vi.spyOn(tooltip, 'show');

    circle.trigger('mouseover', { offsetX: 0, offsetY: 0 });

    expect(showSpy).toHaveBeenCalled();
    const args = showSpy.mock.calls[0];
    const params = args[3] as any;

    expect(params.seriesName).toBe('Series-1');
  });
});
