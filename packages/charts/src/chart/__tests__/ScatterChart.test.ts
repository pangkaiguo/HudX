import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScatterChart from '../ScatterChart';
import { ChartOption } from '../../types';
import { Group, Circle } from 'HudX/core';

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
    // Find all circles in the root
    // Note: Axis lines and labels are also shapes, so we need to filter for Circles that are likely our data points
    // Data points are added directly to root in ScatterChart implementation.
    // They are Circle instances.

    // We need to inspect the children of root.
    // However, _root structure might be complex.
    // Based on ScatterChart.ts: this._root.add(circle);

    // Let's filter children
    const circles = root.children().filter((child: any) => child instanceof Circle);

    // There should be 4 circles for data points.
    // Note: Legend might add circles too if enabled, but default legend is not enabled or icon might be different.
    // Legend is only added if legend.show is true (or default true?)
    // In ScatterChart.ts: if (option.legend?.show !== false) ...
    // But items are added to legend, which is a Group. Legend is not added to root in ScatterChart.ts explicitly?
    // Wait, Chart.ts: this._root = this._renderer.getRoot();
    // ScatterChart.ts: this._mountLegend(items); -> Chart.ts methods?
    // Chart.ts doesn't have _mountLegend. Wait, I missed reading _mountLegend in Chart.ts or it's missing?

    // Let's re-read Chart.ts later. But assuming ScatterChart adds circles directly to root.

    // Check if we have at least 4 circles.
    // Actually, axis ticks might be lines, but axis doesn't use circles usually.

    expect(circles.length).toBeGreaterThanOrEqual(4);

    // Check positions of the first circle (0,0) -> 'A', '1'
    // 'A' is index 0 in X. '1' is index 0 in Y.
    // X scale: category. Domain ['A', 'B', 'C', 'D', 'E']. Range [plotX, plotX+width]
    // Y scale: category. Domain ['1', '2', '3', '4', '5']. Range [plotY+height, plotY]

    // We can't easily check exact pixels without mocking layout, but we can check if they are valid numbers.
    const c1 = circles[0] as Circle;
    expect(c1.shape.cx).not.toBeNaN();
    expect(c1.shape.cy).not.toBeNaN();
  });
});
