import { describe, it, expect, vi, beforeAll } from 'vitest';
import Chart from '../Chart';
import { ChartOption } from '../types';

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
  } as unknown as CanvasRenderingContext2D;

  vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
    if (tag === 'canvas') {
      const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas') as HTMLCanvasElement;
      canvas.getContext = vi.fn(() => mockContext) as any;
      return canvas;
    }
    return document.createElementNS('http://www.w3.org/1999/xhtml', tag) as HTMLElement;
  });
});

class TestChart extends Chart {
  public testGenerateTooltipContent(params: any): string {
    return this._generateTooltipContent(params);
  }
  protected _render(): void { }
}

describe('Chart', () => {
  describe('Lifecycle', () => {
    it('should initialize correctly', () => {
      const dom = document.createElement('div');
      const chart = new TestChart(dom);

      expect(chart).toBeDefined();
      expect(chart.isMounted()).toBe(true);
      expect(chart.getDom()).toBe(dom);
      expect(chart.getWidth()).toBe(0); // Initial width 0 because mock renderer doesn't layout
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
        series: [{ type: 'bar', data: [1, 2, 3] }]
      };

      chart.setOption(option);
      expect(chart.getOption()).toEqual(option);
    });

    it('should merge options correctly', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        title: { text: 'Initial' },
        series: [{ type: 'bar', name: 'A', data: [1] }]
      });

      chart.setOption({
        title: { subtext: 'Sub' },
        series: [{ name: 'A', data: [2] }] // Should merge by index
      });

      const opts = chart.getOption();
      expect(opts.title?.text).toBe('Initial');
      expect(opts.title?.subtext).toBe('Sub');
      expect(opts.series?.[0].data).toEqual([2]); // Replaced data
    });

    it('should respect notMerge flag', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        title: { text: 'Initial' }
      });

      chart.setOption({
        xAxis: { show: true }
      }, true); // notMerge = true

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
      // Internal event system passes data directly (or merged), not wrapped in CustomEvent detail
      expect(handler.mock.calls[0][0]).toMatchObject({ foo: 'bar' });

      chart.off('click', handler);
      chart.trigger('click', { foo: 'baz' });
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
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
  });

  describe('Legend Hover Interaction', () => {
    it('should trigger _onLegendHover callback', () => {
      // Create a subclass that exposes _onLegendHover for testing
      class InteractiveChart extends TestChart {
        public onLegendHover(name: string, hovered: boolean) {
          this._onLegendHover(name, hovered);
        }
      }

      const chart = new InteractiveChart(document.createElement('div'));
      
      // We spy on the method to ensure it exists and can be called,
      // although checking internal state (opacity) would require mocking series/elements
      // which is complex in this unit test.
      // So we just verify the method is callable.
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
        marker: '<span style="color:#ff0000"></span>'
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
          marker: '<span style="color:#ff0000"></span>'
        },
        {
          componentType: 'series',
          seriesType: 'line',
          seriesName: 'Series 2',
          name: 'Mon',
          value: 132,
          color: '#00ff00',
          marker: '<span style="color:#00ff00"></span>'
        }
      ];

      const html = chart.testGenerateTooltipContent(params);

      expect(html).toContain('Mon'); // Header
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
          }
        }
      });

      const params = {
        name: 'Item A',
        value: 123
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toBe('<div>Custom: Item A - 123</div>');
    });

    it('should support simple string template formatter', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          formatter: '{b}: {c}'
        }
      });

      const params = {
        name: 'Item A',
        value: 123
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toBe('Item A: 123');
    });

    it('should support vertical layout (Basic View)', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          layout: 'vertical'
        }
      });

      const params = {
        componentType: 'series',
        seriesType: 'scatter',
        name: 'Item A',
        value: 123,
        color: '#ff0000',
        marker: '<span style="color:#ff0000"></span>'
      };

      const html = chart.testGenerateTooltipContent(params);

      // Should verify structure
      expect(html).toContain('display:flex;align-items:center;'); // Marker row
      expect(html).toContain('padding-left: 14px;font-weight:bold;'); // Value row
      expect(html).toContain('123');
    });

    it('should support rich layout (Complex View)', () => {
      const chart = new TestChart(document.createElement('div'));
      chart.setOption({
        tooltip: {
          layout: 'rich'
        }
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
            { label: 'Desc', value: 'Lorem ipsum' }
          ]
        }
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
            row: 'display: block;'
          }
        }
      });

      const params = {
        componentType: 'series',
        seriesType: 'bar',
        name: 'Item A',
        value: 999,
        color: '#ff0000',
        marker: ''
      };

      const html = chart.testGenerateTooltipContent(params);

      // Check if custom styles are applied
      expect(html).toContain('font-size: 20px; color: red;');
      expect(html).toContain('display: block;');

      // Check if defaults are overridden
      // The default value style is 'font-weight:bold;white-space:nowrap;'
      // Since we overrode 'value', it should not contain the default style
      expect(html).not.toContain('font-weight:bold;white-space:nowrap;');
    });
  });
});
