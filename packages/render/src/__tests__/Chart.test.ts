import { describe, it, expect, vi, beforeAll } from 'vitest';
import Chart from '../Chart';
import type { ChartOption } from '../types';

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
    drawImage: vi.fn(),
    font: '',
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

class TestChart extends Chart {
  public testGenerateTooltipContent(params: any): string {
    return this._generateTooltipContent(params);
  }
  protected _render(): void { }
}

describe('Chart (Core)', () => {
  describe('Lifecycle', () => {
    it('should initialize correctly', () => {
      const dom = document.createElement('div');
      const chart = new TestChart(dom);

      expect(chart).toBeDefined();
      expect(chart.isMounted()).toBe(true);
      expect(chart.getDom()).toBe(dom);
      expect(chart.getWidth()).toBe(0);
    });

    it('should mount and unmount', () => {
      const chart = new TestChart(document.createElement('div'));

      expect(chart.isMounted()).toBe(true);

      chart.unmount();
      expect(chart.isMounted()).toBe(false);

      chart.mount();
      expect(chart.isMounted()).toBe(true);
    });

    it('should dispose correctly', () => {
      const chart = new TestChart(document.createElement('div'));

      expect(chart.isDisposed()).toBe(false);

      chart.dispose();
      expect(chart.isDisposed()).toBe(true);
      expect(chart.isMounted()).toBe(false);
    });
  });

  describe('Option Management', () => {
    it('should set and get options', () => {
      const chart = new TestChart(document.createElement('div'));
      const option: ChartOption = {
        title: { text: 'Test Chart' },
        series: [{ type: 'bar', data: [1, 2, 3] }],
      };

      chart.setOption(option);
      expect(chart.getOption()).toEqual(option);
    });

    it('should merge options correctly', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        title: { text: 'Initial' },
        series: [{ type: 'bar', name: 'A', data: [1] }],
      });

      chart.setOption({
        title: { subtext: 'Sub' },
        series: [{ name: 'A', data: [2] }],
      });

      const opts = chart.getOption();
      expect(opts.title?.text).toBe('Initial');
      expect(opts.title?.subtext).toBe('Sub');
      expect(opts.series?.[0].data).toEqual([2]);
    });

    it('should respect notMerge flag', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        title: { text: 'Initial' },
      });

      chart.setOption(
        {
          xAxis: { show: true },
        },
        true,
      );

      const opts = chart.getOption();
      expect(opts.title).toBeUndefined();
      expect(opts.xAxis).toBeDefined();
    });
  });

  describe('Events', () => {
    it('should handle events', () => {
      const chart = new TestChart(document.createElement('div'));
      const handler = vi.fn();

      chart.on('click', handler);
      chart.trigger('click', { foo: 'bar' });

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0]).toMatchObject({ foo: 'bar' });

      chart.off('click', handler);
      chart.trigger('click', { foo: 'baz' });
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should handle once events', () => {
      const chart = new TestChart(document.createElement('div'));
      const handler = vi.fn();

      chart.once('hover', handler);
      chart.trigger('hover');
      chart.trigger('hover');

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Animation Control', () => {
    it('should control animation state', () => {
      const chart = new TestChart(document.createElement('div'));
      const animator = chart.getAnimator();
      const pauseSpy = vi.spyOn(animator, 'pauseAll');
      const resumeSpy = vi.spyOn(animator, 'resumeAll');
      const stopSpy = vi.spyOn(animator, 'stopAll');

      chart.pauseAnimation();
      expect(pauseSpy).toHaveBeenCalled();

      chart.resumeAnimation();
      expect(resumeSpy).toHaveBeenCalled();

      chart.stopAnimation();
      expect(stopSpy).toHaveBeenCalled();
    });
  });

  describe('Theme and Locale', () => {
    it('should set theme', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setTheme('dark');
      expect(chart.getTheme()).toBe('dark');
    });

    it('should set locale', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setLocale('zh');
      expect(chart.getLocale()).toBe('zh');
    });
  });

  describe('Loading', () => {
    it('should trigger loading events', () => {
      const chart = new TestChart(document.createElement('div'));
      const handler = vi.fn();
      chart.on('loading', handler);

      chart.showLoading();
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].text).toBe('Loading...');

      chart.hideLoading();
      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler.mock.calls[1][0].show).toBe(false);
    });

    it('should localize loading text based on locale', () => {
      const chart = new TestChart(document.createElement('div'));
      const handler = vi.fn();
      chart.on('loading', handler);

      chart.setLocale('zh-CN');
      chart.showLoading();
      expect(handler.mock.calls[0][0].text).toBe('加载中...');

      handler.mockClear();
      chart.setLocale('zh-TW');
      chart.showLoading();
      expect(handler.mock.calls[0][0].text).toBe('載入中...');
    });
  });

  describe('Legend Hover Interaction', () => {
    it('should trigger _onLegendHover callback', () => {
      class InteractiveChart extends TestChart {
        public onLegendHover(name: string, hovered: boolean) {
          this._onLegendHover(name, hovered);
        }
      }

      const chart = new InteractiveChart(document.createElement('div'));
      const spy = vi.spyOn(chart as any, '_onLegendHover');

      chart.onLegendHover('Series 1', true);
      expect(spy).toHaveBeenCalledWith('Series 1', true);

      chart.onLegendHover('Series 1', false);
      expect(spy).toHaveBeenCalledWith('Series 1', false);
    });
  });

  describe('Tooltip HTML Generation', () => {
    it('should generate basic HTML with color marker', () => {
      const chart = new TestChart(document.createElement('div'));
      const params = {
        componentType: 'series',
        seriesType: 'scatter',
        name: 'Item A',
        value: 123,
        color: '#ff0000',
        marker: '<span style="color:#ff0000"></span>',
      };

      const html = chart.testGenerateTooltipContent(params);

      expect(html).toContain('Item A');
      expect(html).toContain('123');
      expect(html).toContain('display:flex');
    });

    it('should generate list HTML for axis trigger (array params)', () => {
      const chart = new TestChart(document.createElement('div'));
      const params = [
        {
          componentType: 'series',
          seriesType: 'line',
          seriesName: 'Series 1',
          name: 'Mon',
          value: 120,
          color: '#ff0000',
          marker: '<span style="color:#ff0000"></span>',
        },
        {
          componentType: 'series',
          seriesType: 'line',
          seriesName: 'Series 2',
          name: 'Mon',
          value: 132,
          color: '#00ff00',
          marker: '<span style="color:#00ff00"></span>',
        },
      ];

      const html = chart.testGenerateTooltipContent(params);

      expect(html).toContain('Mon');
      expect(html).toContain('Series 1');
      expect(html).toContain('120');
      expect(html).toContain('Series 2');
      expect(html).toContain('132');
    });

    it('should support formatter function', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          formatter: (params: any) => {
            return `<div>Custom: ${params.name} - ${params.value}</div>`;
          },
        },
      });

      const params = {
        name: 'Item A',
        value: 123,
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toBe('<div>Custom: Item A - 123</div>');
    });

    it('should support simple string template formatter', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          formatter: '{b}: {c}',
        },
      });

      const params = {
        name: 'Item A',
        value: 123,
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toBe('Item A: 123');
    });

    it('should support vertical layout (Basic View)', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          layout: 'vertical',
        },
      });

      const params = {
        componentType: 'series',
        seriesType: 'scatter',
        name: 'Item A',
        value: 123,
        color: '#ff0000',
        marker: '<span style="color:#ff0000"></span>',
      };

      const html = chart.testGenerateTooltipContent(params);

      expect(html).toContain('display:flex;align-items:center;');
      expect(html).toContain('padding-left: 14px;font-weight:bold;');
      expect(html).toContain('123');
    });

    it('should support rich layout (Complex View)', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          layout: 'rich',
        },
      });

      const params = {
        componentType: 'series',
        seriesType: 'scatter',
        name: 'Item A',
        value: 123,
        color: '#ff0000',
        marker: '<span style="color:#ff0000"></span>',
        data: {
          detail: [
            { label: 'Title', value: 'HKD 88M' },
            { label: 'Desc', value: 'Lorem ipsum' },
          ],
        },
      };

      const html = chart.testGenerateTooltipContent(params);

      expect(html).toContain('Title');
      expect(html).toContain('HKD 88M');
      expect(html).toContain('Desc');
      expect(html).toContain('Lorem ipsum');
    });

    it('should apply custom htmlStyles from options', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          htmlStyles: {
            value: 'font-size: 20px; color: red;',
            row: 'display: block;',
          },
        },
      });

      const params = {
        componentType: 'series',
        seriesType: 'bar',
        name: 'Item A',
        value: 999,
        color: '#ff0000',
        marker: '',
      };

      const html = chart.testGenerateTooltipContent(params);

      expect(html).toContain('font-size: 20px; color: red;');
      expect(html).toContain('display: block;');
      expect(html).not.toContain('font-weight:bold;white-space:nowrap;');
    });
  });
});
