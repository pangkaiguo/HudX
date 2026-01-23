import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { ThemeManager } from 'hudx-render';
import type { ChartOption } from 'hudx-render';
import PieChart from '../chart/PieChart';
import BarChart from '../chart/BarChart';
import LineChart from '../chart/LineChart';

// Mock Canvas
beforeAll(() => {
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
    drawImage: vi.fn(), // Mock drawImage for Image shape
    font: '', // Add font property
    textBaseline: 'alphabetic',
    textAlign: 'start',
    fillStyle: '#000',
    strokeStyle: '#000',
    lineWidth: 1,
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    globalAlpha: 1,
  } as unknown as CanvasRenderingContext2D;

  // Mock HTMLCanvasElement.prototype.getContext
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn((contextId: string) => {
      if (contextId === '2d') {
        return mockContext;
      }
      return null;
    }),
    writable: true,
  });
});

describe('Chart Integration', () => {
  describe('SVG Render Mode', () => {
    it('should not render broken image tags for shapes without valid image source', () => {
      const dom = document.createElement('div');
      // Use PieChart to have actual rendering logic
      const chart = new PieChart(dom);
      chart.setRenderMode('svg');

      chart.setOption({
        animation: false, // Disable animation for sync rendering check
        series: [
          {
            type: 'pie',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
            ],
          },
        ],
      });

      // Force render synchronously
      (chart as any)._render();

      // Get SVG content
      const svg = chart.getDom().querySelector('svg');
      expect(svg).not.toBeNull();

      // Check for image tags
      // In a normal pie chart without patterns/images, there should be no <image> tags
      const images = svg?.querySelectorAll('image');
      expect(images?.length).toBe(0);

      // Verify sectors are rendered (paths)
      const paths = svg?.querySelectorAll('path');
      expect(paths?.length).toBeGreaterThan(0);
    });
  });

  describe('Axis Pointer', () => {
    it('should create axis pointer line when configured in BarChart', () => {
      const dom = document.createElement('div');
      const chart = new BarChart(dom);

      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'red',
              width: 1,
              type: 'dashed',
            },
          },
        },
        xAxis: { type: 'category', data: ['A', 'B'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [10, 20] }],
      });

      // Force render
      (chart as any)._render();

      // Check if line exists in root
      const rootGroup = (chart as any)._root;
      const elements = rootGroup.children() || [];

      // Find the axis pointer line
      const pointerLine = elements.find(
        (el: any) =>
          el.constructor.name === 'Line' &&
          el.style.stroke === 'red' &&
          el.z > 0, // Should have high Z
      );

      expect(pointerLine).toBeDefined();
      expect(pointerLine.style.lineWidth).toBe(1);
      expect(pointerLine.style.lineDash).toEqual([4, 4]);
      expect(pointerLine.invisible).toBe(true); // Should be initially invisible
    });

    it('should NOT create axis pointer line by default in BarChart', () => {
      const dom = document.createElement('div');
      const chart = new BarChart(dom);

      chart.setOption({
        tooltip: {
          trigger: 'axis',
          // No axisPointer config
        },
        xAxis: { type: 'category', data: ['A', 'B'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [10, 20] }],
      });

      (chart as any)._render();

      const rootGroup = (chart as any)._root;
      const elements = rootGroup.children() || [];

      // Look for any line that looks like an axis pointer (high Z index, typical style)

      const pointerLine = elements.find(
        (el: any) =>
          el.constructor.name === 'Line' &&
          el.style.stroke === 'rgba(0,0,0,0.3)' && // Default pointer color
          el.invisible === true, // Pointer starts invisible
      );

      // This might be flaky if other lines match, but given the specific combination created in code:
      // In BarChart.ts:
      // if (... axisPointerType === 'line') { ... }
      // So if not configured, it shouldn't exist.

      expect(pointerLine).toBeUndefined();
    });
  });

  describe('Tooltip Theme', () => {
    it('should use theme tooltip colors consistently across chart types', () => {
      const prev = ThemeManager.getCurrentTheme();
      ThemeManager.setCurrentTheme('light');
      const theme = ThemeManager.getTheme('light');

      const domBar = document.createElement('div');
      const chartBar = new BarChart(domBar);
      chartBar.setOption({
        tooltip: { show: true, trigger: 'axis' },
        xAxis: { type: 'category', data: ['A'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [10] }],
        animation: false,
      });
      expect((chartBar as any)._tooltip._option.backgroundColor).toBe(
        theme.tooltipBackgroundColor,
      );
      expect((chartBar as any)._tooltip._option.textStyle?.color).toBe(
        theme.tooltipTextColor,
      );

      const domLine = document.createElement('div');
      const chartLine = new LineChart(domLine);
      chartLine.setOption({
        tooltip: { show: true, trigger: 'axis' },
        xAxis: { type: 'category', data: ['A'] },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: [10] }],
        animation: false,
      });
      expect((chartLine as any)._tooltip._option.backgroundColor).toBe(
        theme.tooltipBackgroundColor,
      );
      expect((chartLine as any)._tooltip._option.textStyle?.color).toBe(
        theme.tooltipTextColor,
      );

      const domPie = document.createElement('div');
      const chartPie = new PieChart(domPie);
      chartPie.setOption({
        tooltip: { show: true, trigger: 'item' },
        series: [{ type: 'pie', data: [{ value: 10, name: 'A' }] }],
        animation: false,
      });
      expect((chartPie as any)._tooltip._option.backgroundColor).toBe(
        theme.tooltipBackgroundColor,
      );
      expect((chartPie as any)._tooltip._option.textStyle?.color).toBe(
        theme.tooltipTextColor,
      );

      ThemeManager.setCurrentTheme(prev);
    });
  });

  describe('Axis Label Interval', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      Object.defineProperty(container, 'clientWidth', { value: 800 });
      Object.defineProperty(container, 'clientHeight', { value: 600 });
    });

    it('should filter labels with interval number', () => {
      const chart = new LineChart(container);
      const option: ChartOption = {
        animation: false,
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
          axisLabel: {
            interval: 1, // Show every 2nd label (index 0, 2, 4) -> A, C, E
          },
        },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: [10, 20, 30, 40, 50] }],
      };
      chart.setOption(option);

      // Access root children to find Text nodes
      const root = (chart as any)._root;
      const children = root.children();

      const textNodes = children.filter(
        (child: any) => child.constructor.name === 'Text',
      );

      // Filter for X-axis labels
      const xLabels = textNodes.filter((node: any) =>
        ['A', 'B', 'C', 'D', 'E'].includes(node.shape?.text),
      );

      expect(xLabels.length).toBe(3);
      expect(xLabels.map((n: any) => n.shape.text)).toEqual(['A', 'C', 'E']);
    });

    it('should filter labels with interval function', () => {
      const chart = new LineChart(container);
      const option: ChartOption = {
        animation: false,
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
          axisLabel: {
            interval: (index: number) => index % 5 === 0, // Show 0, 5... -> Only 'A' (index 0)
          },
        },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: [10, 20, 30, 40, 50] }],
      };
      chart.setOption(option);

      const root = (chart as any)._root;
      const children = root.children();
      const textNodes = children.filter(
        (child: any) => child.constructor.name === 'Text',
      );
      const xLabels = textNodes.filter((node: any) =>
        ['A', 'B', 'C', 'D', 'E'].includes(node.shape?.text),
      );

      expect(xLabels.length).toBe(1);
      expect(xLabels[0].shape.text).toBe('A');
    });
  });
});
