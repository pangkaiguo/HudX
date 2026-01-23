import { describe, it, expect, vi, beforeAll } from 'vitest';
import Chart from '../Chart';
import type { ChartOption } from '../types';
import Title from '../component/Title';

// Mock Canvas
beforeAll(() => {
  const observeSpy = vi.fn();
  const disconnectSpy = vi.fn();
  vi.stubGlobal(
    'ResizeObserver',
    class ResizeObserverMock {
      constructor(_cb: any) {}
      observe = observeSpy;
      disconnect = disconnectSpy;
    } as any,
  );
  vi.stubGlobal('__ro_observeSpy', observeSpy as any);
  vi.stubGlobal('__ro_disconnectSpy', disconnectSpy as any);

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
  public testGetDataValue(item: any): number | undefined {
    return this._getDataValue(item);
  }
  public testMountLegend(items: any[]): void {
    this._mountLegend(items);
  }
  protected _render(): void {}
}

describe('Chart (Core)', () => {
  const getObserveSpy = () =>
    (globalThis as any).__ro_observeSpy as ReturnType<typeof vi.fn>;
  const getDisconnectSpy = () =>
    (globalThis as any).__ro_disconnectSpy as ReturnType<typeof vi.fn>;

  describe('Responsive', () => {
    it('should auto observe container resize and cleanup on dispose', () => {
      const dom = document.createElement('div');
      const observeSpy = getObserveSpy();
      const disconnectSpy = getDisconnectSpy();
      observeSpy.mockClear();
      disconnectSpy.mockClear();

      const chart = new TestChart(dom);
      expect(observeSpy).toHaveBeenCalled();
      const observedTargets = observeSpy.mock.calls.map((c) => c[0]);
      expect(observedTargets).toContain(dom);

      chart.dispose();
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

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

    it('should cancel scheduled render on pauseAnimation', () => {
      let rafCb: any = null;
      const rafSpy = vi.fn((cb: any) => {
        rafCb = cb;
        return 123 as any;
      });
      const cafSpy = vi.fn();
      vi.stubGlobal('requestAnimationFrame', rafSpy as any);
      vi.stubGlobal('cancelAnimationFrame', cafSpy as any);

      class ScheduleChart extends Chart {
        protected _render(): void {}
      }
      const chart = new ScheduleChart(document.createElement('div'));
      (chart as any)._scheduleRender();
      expect(rafSpy).toHaveBeenCalledTimes(1);

      chart.pauseAnimation();
      expect(cafSpy).toHaveBeenCalledWith(123);
      expect((chart as any)._animationId).toBeNull();

      rafCb?.();
    });

    it('should schedule render on resumeAnimation when mounted', () => {
      const rafSpy = vi.fn(() => 1 as any);
      vi.stubGlobal('requestAnimationFrame', rafSpy as any);

      class ScheduleChart extends Chart {
        protected _render(): void {}
      }
      const chart = new ScheduleChart(document.createElement('div'));
      (chart as any)._animationId = null;

      chart.resumeAnimation();
      expect(rafSpy).toHaveBeenCalled();
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

  describe('Legend', () => {
    it('should apply legend options from ChartOption', () => {
      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 400 });
      Object.defineProperty(dom, 'clientHeight', { value: 300 });
      const chart = new TestChart(dom);

      chart.setOption({
        legend: {
          show: true,
          orient: 'horizontal',
          right: '10%',
          top: '20%',
          itemGap: 12,
          itemWidth: 80,
          padding: 10,
          inactiveColor: '#999',
          borderColor: '#123',
          borderWidth: 2,
          borderRadius: 4,
          selectedMode: 'multiple',
          selected: { A: true, B: false },
          textStyle: {
            color: 'rgb(1,2,3)',
            fontSize: 16,
            fontFamily: 'serif',
            fontWeight: 'bold',
          },
        },
      } satisfies ChartOption);

      chart.testMountLegend([
        { name: 'A', color: 'red', icon: 'rect' },
        { name: 'B', color: 'blue', icon: 'rect' },
      ]);

      const legend = (chart as any)._legend;
      expect(legend).toBeDefined();

      const bg = legend
        .children()
        .find(
          (c: any) =>
            c?.constructor?.name === 'Rect' && c.style?.stroke === '#123',
        );
      expect(bg).toBeDefined();

      const totalWidth = bg.shape.width as number;
      const t = legend.attr('transform');
      expect(t.y).toBeCloseTo(60);
      expect(t.x).toBeCloseTo(400 - totalWidth - 40, 2);

      const itemRects = (legend as any)._itemRects as Map<string, any>;
      expect(itemRects.get('A').style.fill).toBe('red');
      expect(itemRects.get('B').style.fill).toBe('#999');

      const texts = legend
        .children()
        .filter((c: any) => c?.constructor?.name === 'Text');
      expect(texts.length).toBeGreaterThan(0);
      const firstText = texts[0];
      expect(firstText.style.fill).toBe('rgb(1,2,3)');
      expect(firstText.style.fontSize).toBe(16);
      expect(firstText.style.fontFamily).toBe('serif');
      expect(firstText.style.fontWeight).toBe('bold');

      const interactRects = legend
        .children()
        .filter(
          (c: any) => c?.constructor?.name === 'Rect' && c.cursor === 'pointer',
        );
      expect(interactRects.length).toBe(2);
      const [r1, r2] = interactRects.sort(
        (a: any, b: any) => a.shape.x - b.shape.x,
      );
      const gap = r2.shape.x - (r1.shape.x + r1.shape.width);
      expect(gap).toBeCloseTo(12, 2);
    });

    it('should support percent left/top positioning', () => {
      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 400 });
      Object.defineProperty(dom, 'clientHeight', { value: 300 });
      const chart = new TestChart(dom);

      chart.setOption({
        legend: {
          show: true,
          orient: 'vertical',
          left: '10%',
          top: '20%',
        },
      } satisfies ChartOption);

      chart.testMountLegend([{ name: 'A', color: 'red', icon: 'rect' }]);

      const legend = (chart as any)._legend;
      const t = legend.attr('transform');
      expect(t.x).toBeCloseTo(40, 2);
      expect(t.y).toBeCloseTo(60, 2);
    });

    it('should map legend.data to items and merge per-item config', () => {
      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 400 });
      Object.defineProperty(dom, 'clientHeight', { value: 300 });
      const chart = new TestChart(dom);

      chart.setOption({
        legend: {
          show: true,
          data: [
            { name: 'A', icon: 'circle', textStyle: { color: '#f00' } },
            { name: 'C', icon: 'line', textStyle: { fontWeight: 'bold' } },
          ],
          icon: 'rect',
        },
      } satisfies ChartOption);

      chart.testMountLegend([
        { name: 'A', color: 'red', icon: 'rect' },
        { name: 'B', color: 'blue', icon: 'rect' },
      ]);

      const legend = (chart as any)._legend;
      const items = (legend as any)._items as any[];
      expect(items.map((i) => i.name)).toEqual(['A', 'C']);
      expect(items[0].color).toBe('red');
      expect(items[0].icon).toBe('circle');
      expect(items[0].textStyle).toEqual({ color: '#f00' });
      expect(items[1].icon).toBe('line');
      expect(items[1].textStyle).toEqual({ fontWeight: 'bold' });
    });

    it('should route legend interactions to chart callbacks', () => {
      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 400 });
      Object.defineProperty(dom, 'clientHeight', { value: 300 });
      const chart = new TestChart(dom);
      const silentHideSpy = vi.spyOn(chart, 'beginSilentHide');
      const animateShowSpy = vi.spyOn(chart, 'beginAnimateShow');
      const endAnimateSpy = vi.spyOn(chart, 'endAnimateControl');
      const renderSpy = vi.spyOn(chart as any, '_render');
      const hoverSpy = vi.spyOn(chart as any, '_onLegendHover');

      chart.setOption({
        legend: {
          show: true,
          selectedMode: 'multiple',
        },
      } satisfies ChartOption);

      chart.testMountLegend([
        { name: 'A', color: 'red', icon: 'rect' },
        { name: 'B', color: 'blue', icon: 'rect' },
      ]);

      const legend = (chart as any)._legend;
      const interactRects = legend
        .children()
        .filter(
          (c: any) => c?.constructor?.name === 'Rect' && c.cursor === 'pointer',
        )
        .sort((a: any, b: any) => a.shape.x - b.shape.x);

      const [aRect] = interactRects;
      (aRect as any).trigger('click');
      expect(silentHideSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalled();
      expect(endAnimateSpy).toHaveBeenCalled();

      (aRect as any).trigger('click');
      expect(animateShowSpy).toHaveBeenCalledWith('A');

      (aRect as any).trigger('mouseover');
      expect(hoverSpy).toHaveBeenCalledWith('A', true);

      (aRect as any).trigger('mouseout');
      expect(hoverSpy).toHaveBeenCalledWith('A', false);
    });

    it('should update selection even if chart legend is unset', () => {
      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 400 });
      Object.defineProperty(dom, 'clientHeight', { value: 300 });
      const chart = new TestChart(dom);

      chart.setOption({
        legend: {
          show: true,
          selectedMode: 'multiple',
        },
      } satisfies ChartOption);

      chart.testMountLegend([{ name: 'A', color: 'red', icon: 'rect' }]);

      const legend = (chart as any)._legend;
      (chart as any)._legend = null;

      (legend as any)._option.onSelect('A', true);
      expect((chart as any)._legendSelected.has('A')).toBe(true);
    });

    it('should animate show in single selectedMode when one item remains', () => {
      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 400 });
      Object.defineProperty(dom, 'clientHeight', { value: 300 });
      const chart = new TestChart(dom);
      const animateShowSpy = vi.spyOn(chart, 'beginAnimateShow');

      chart.setOption({
        legend: {
          show: true,
          selectedMode: 'single',
        },
      } satisfies ChartOption);

      chart.testMountLegend([
        { name: 'A', color: 'red', icon: 'rect' },
        { name: 'B', color: 'blue', icon: 'rect' },
      ]);

      const legend = (chart as any)._legend;
      const interactRects = legend
        .children()
        .filter(
          (c: any) => c?.constructor?.name === 'Rect' && c.cursor === 'pointer',
        )
        .sort((a: any, b: any) => a.shape.x - b.shape.x);

      const [aRect] = interactRects;
      (aRect as any).trigger('click');

      expect(animateShowSpy).toHaveBeenCalledWith('A');
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
      expect(html).not.toContain('color:#fff');
      expect(html).not.toContain('color:#ccc');
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

    it('should format array values and percent values', () => {
      const chart = new TestChart(document.createElement('div'));
      const params = {
        componentType: 'series',
        seriesType: 'scatter',
        name: 'Point',
        value: [1, 2],
        percent: '12.3',
        color: '#ff0000',
        marker: '',
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toContain('1, 2');
      expect(html).toContain('(12.30%)');
    });

    it('should render "-" for null/undefined values', () => {
      const chart = new TestChart(document.createElement('div'));
      const params = {
        componentType: 'series',
        seriesType: 'bar',
        name: 'Item A',
        value: null,
        color: '#ff0000',
        marker: '',
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toContain('>-</span>');
    });

    it('should render string values as-is', () => {
      const chart = new TestChart(document.createElement('div'));
      const params = {
        componentType: 'series',
        seriesType: 'bar',
        name: 'Item A',
        value: 'N/A',
        color: '#ff0000',
        marker: '',
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toContain('N/A');
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
      expect(html).toContain('padding-left: 14px;color:');
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

    it('should use marker with 2px border radius by default', () => {
      const chart = new TestChart(document.createElement('div'));
      const params = {
        componentType: 'series',
        seriesType: 'bar',
        name: 'Item A',
        value: 999,
        color: '#ff0000',
        marker: '',
      };

      const html = chart.testGenerateTooltipContent(params);
      expect(html).toContain('border-radius:2px;');
    });

    it('should use theme-driven tooltip colors in light and dark', () => {
      const chart = new TestChart(document.createElement('div'));

      const lightParams = {
        componentType: 'series',
        seriesType: 'pie',
        seriesName: 'Series A',
        name: 'Slice A',
        value: 10,
        color: '#ff0000',
        marker: '',
      };
      const lightHtml = chart.testGenerateTooltipContent(lightParams);
      expect(lightHtml).toContain('color:#333D47');
      expect(lightHtml).toContain('color:#5B636B');

      chart.setTheme('dark');
      const darkHtml = chart.testGenerateTooltipContent(lightParams);
      expect(darkHtml).toContain('color:#ffffff');
      expect(darkHtml).toContain('color:#F7F7F8');
      expect(darkHtml).toContain('color:#C6C6C6');
    });
  });

  describe('Title', () => {
    it('should mount Title via base render', () => {
      class TitleChart extends Chart {
        protected _render(): void {
          super._render();
        }
      }

      const dom = document.createElement('div');
      Object.defineProperty(dom, 'clientWidth', { value: 200 });
      Object.defineProperty(dom, 'clientHeight', { value: 100 });
      const chart = new TitleChart(dom, { title: { text: 'Hello' } } as any);

      const root = (chart as any)._root;
      const title = root.children().find((c: any) => c instanceof Title);
      expect(title).toBeDefined();
    });

    it('should skip mounting when title.show is false', () => {
      class TitleChart extends Chart {
        protected _render(): void {
          super._render();
        }
      }

      const dom = document.createElement('div');
      const chart = new TitleChart(dom, {
        title: { show: false, text: 'Hello' },
      } as any);
      const root = (chart as any)._root;
      const title = root.children().find((c: any) => c instanceof Title);
      expect(title).toBeUndefined();
    });
  });

  describe('Text Wrapping', () => {
    it('should return original text when overflow is none', () => {
      const chart = new TestChart(document.createElement('div'));
      const result = (chart as any)._wrapText('abcdef', 20, 10, 'sans', 'none');
      expect(result).toBe('abcdef');
    });

    it('should truncate when overflow is truncate', () => {
      const chart = new TestChart(document.createElement('div'));
      const result = (chart as any)._wrapText(
        'abcdefghij',
        50,
        10,
        'sans',
        'truncate',
      );
      expect(result).toBe('ab...');
    });

    it('should break into lines when overflow is break', () => {
      const chart = new TestChart(document.createElement('div'));
      const result = (chart as any)._wrapText('abcd', 30, 10, 'sans', 'break');
      expect(result).toBe('abc\nd');
    });
  });

  describe('Data Value Extraction', () => {
    it('should extract numeric values from supported data shapes', () => {
      const chart = new TestChart(document.createElement('div'));
      expect(chart.testGetDataValue(10)).toBe(10);
      expect(chart.testGetDataValue([1, 2])).toBe(2);
      expect(chart.testGetDataValue({ value: 9 })).toBe(9);
      expect(chart.testGetDataValue({ value: [3, 4] })).toBe(4);
      expect(chart.testGetDataValue({})).toBeUndefined();
      expect(chart.testGetDataValue(null)).toBeUndefined();
      expect(chart.testGetDataValue({ value: 'bad' })).toBeUndefined();
    });
  });

  describe('Render Scheduling', () => {
    it('should schedule only once before frame executes', () => {
      class ScheduleChart extends Chart {
        renderCount = 0;
        protected _render(): void {
          this.renderCount++;
        }
      }

      let rafCb: any = null;
      const rafSpy = vi.fn((cb: any) => {
        rafCb = cb;
        return 1 as any;
      });
      vi.stubGlobal('requestAnimationFrame', rafSpy as any);

      const chart = new ScheduleChart(document.createElement('div'));
      chart.renderCount = 0;

      (chart as any)._scheduleRender();
      (chart as any)._scheduleRender();
      expect(rafSpy).toHaveBeenCalledTimes(1);

      rafCb();
      expect(chart.renderCount).toBe(1);
    });
  });

  describe('Responsive Fallback', () => {
    it('should use window resize listener when ResizeObserver is unavailable', () => {
      const originalRO = (globalThis as any).ResizeObserver;
      (globalThis as any).ResizeObserver = undefined;

      const addSpy = vi.spyOn(window, 'addEventListener');
      const removeSpy = vi.spyOn(window, 'removeEventListener');

      const chart = new TestChart(document.createElement('div'));
      chart.makeResponsive();
      expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      chart.stopResponsive();
      expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      addSpy.mockRestore();
      removeSpy.mockRestore();
      (globalThis as any).ResizeObserver = originalRO;
    });
  });
});
