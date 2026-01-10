import { describe, it, expect, vi, beforeAll } from 'vitest';
import Chart from '../../Chart';
import { ChartOption } from '../../types';

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
});
