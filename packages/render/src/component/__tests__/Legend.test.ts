import { describe, it, expect, vi, beforeAll } from 'vitest';
import Legend from '../Legend';
import Line from '../../graphic/Line';
import Circle from '../../graphic/Circle';
import Rect from '../../graphic/Rect';
import Text from '../../graphic/Text';
import { ThemeManager } from '../../theme/ThemeManager';
import {
  TOOLTIP_DEFAULT_BORDER_RADIUS,
  TOOLTIP_DEFAULT_BORDER_WIDTH,
} from '../../constants';

describe('Legend', () => {
  beforeAll(() => {
    const mockContext = {
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      measureText: vi.fn((text: string) => ({ width: text.length * 10 })),
      createPattern: vi.fn().mockReturnValue({ setTransform: vi.fn() }),
    } as unknown as CanvasRenderingContext2D;

    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockContext),
      width: 0,
      height: 0,
      toDataURL: vi.fn(),
    } as unknown as HTMLCanvasElement;

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(
      (tag: string, options?: any) => {
        if (tag === 'canvas') {
          return mockCanvas;
        }
        return originalCreateElement(tag, options);
      },
    );
  });

  it('should use transparent container styles by default', () => {
    const legend = new Legend();
    const theme = ThemeManager.getTheme();
    const opt = (legend as any)._option;

    expect(opt.backgroundColor).toBe('transparent');
    expect(opt.borderColor).toBe('transparent');
    expect(opt.borderWidth).toBe(TOOLTIP_DEFAULT_BORDER_WIDTH);
    expect(opt.borderRadius).toBe(TOOLTIP_DEFAULT_BORDER_RADIUS);
    expect(opt.fontWeight).toBe('normal');
  });

  it('should render correct icons', () => {
    const bgFill = ThemeManager.getTheme().tooltipBackgroundColor;
    const legend = new Legend();
    legend.setItems([
      { name: 'A', color: 'red', icon: 'circle' },
      { name: 'B', color: 'blue', icon: 'line' },
      { name: 'C', color: 'green', icon: 'rect' },
    ]);

    const children = legend.children();
    expect(children.length).toBe(10);

    const icons = children.filter(
      (c) =>
        c instanceof Circle ||
        c instanceof Line ||
        (c instanceof Rect &&
          c.style.fill !== 'transparent' &&
          c.style.fill !== bgFill),
    );

    const circleIcon = children.find((c) => c instanceof Circle);
    expect(circleIcon).toBeDefined();
    expect(circleIcon?.style.fill).toBe('red');

    const lineIcon = children.find((c) => c instanceof Line);
    expect(lineIcon).toBeDefined();
    expect(lineIcon?.style.stroke).toBe('blue');
    const rectIcon = children.find(
      (c) => c instanceof Rect && c.style.fill === 'green',
    );
    expect(rectIcon).toBeDefined();
  });

  it('should render decal pattern', () => {
    const bgFill = ThemeManager.getTheme().tooltipBackgroundColor;
    const legend = new Legend();
    legend.setItems([
      {
        name: 'Series A',
        color: 'red',
        icon: 'rect',
        decal: { symbol: 'rect' },
      },
    ]);

    const children = legend.children();
    const rectIcon = children.find(
      (c) =>
        c instanceof Rect &&
        c.style.fill !== 'transparent' &&
        c.style.fill !== bgFill,
    );

    expect(rectIcon).toBeDefined();
    expect(typeof rectIcon?.style.fill).not.toBe('string');
  });

  it('should handle selection', () => {
    const onSelect = vi.fn();
    const legend = new Legend({ onSelect });
    legend.setItems([
      { name: 'A', color: 'red' },
      { name: 'B', color: 'blue' },
    ]);

    expect(legend.isSelected('A')).toBe(true);
    expect(legend.isSelected('B')).toBe(true);
    const children = legend.children();
    const interactRects = children.filter(
      (c) => c instanceof Rect && c.attr('cursor') === 'pointer',
    );
    expect(interactRects.length).toBe(2);
  });

  it('should render HTML table when renderMode is html', () => {
    const container = document.createElement('div');
    const legend = new Legend({ renderMode: 'html' });
    legend.setDomContainer(container);
    legend.setItems([
      { name: 'A', color: 'red' },
      { name: 'B', color: 'blue' },
    ]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    expect(htmlEl).toBeDefined();
    expect(htmlEl.tagName).toBe('DIV');
    expect(container.contains(htmlEl)).toBe(true);

    const table = htmlEl.querySelector('table');
    expect(table).not.toBeNull();
    const rows = table?.querySelectorAll('tr');
    expect(rows?.length).toBe(2);
  });

  it('should support formatter in HTML mode', () => {
    const container = document.createElement('div');
    const legend = new Legend({
      renderMode: 'html',
      formatter: (name, item) => `<b>${name}</b>`,
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    const table = htmlEl.querySelector('table');
    const cell = table?.querySelector('td:last-child');
    expect(cell?.innerHTML).toBe('<b>A</b>');
  });

  it('should handle interaction in HTML mode', () => {
    const container = document.createElement('div');
    const onSelect = vi.fn();
    const legend = new Legend({
      renderMode: 'html',
      onSelect,
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    const row = htmlEl.querySelector('tr');
    expect(row).not.toBeNull();

    row?.click();

    expect(onSelect).toHaveBeenCalledWith('A', false);
    expect(legend.isSelected('A')).toBe(false);

    row?.click();
    expect(onSelect).toHaveBeenCalledWith('A', true);
    expect(legend.isSelected('A')).toBe(true);
  });

  it('should dispose HTML elements correctly', () => {
    const container = document.createElement('div');
    const legend = new Legend({ renderMode: 'html' });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    expect(container.contains(htmlEl)).toBe(true);

    legend.dispose();
    expect(container.contains(htmlEl)).toBe(false);
    expect((legend as any)._htmlEl).toBeNull();
  });

  it('should support itemMaxWidth', () => {
    const legend = new Legend({
      itemMaxWidth: 50,
      itemWidth: 100,
    });
    legend.setItems([
      { name: 'Very Long Series Name That Should Wrap', color: 'red' },
    ]);

    const children = legend.children();
    const textShapes = children.filter((c) => c instanceof Text);

    expect(textShapes.length).toBeGreaterThan(1);
  });

  it('should support align option', () => {
    const legend = new Legend({
      width: 400,
      align: 'center',
      orient: 'horizontal',
    });

    legend.setItems([
      { name: 'A', color: 'red' },
      { name: 'B', color: 'blue' },
    ]);

    const children = legend.children();
    const rects = children.filter(
      (c) =>
        c instanceof Rect &&
        c.style.fill === 'transparent' &&
        c.attr('cursor') === 'pointer',
    );

    expect(rects.length).toBe(2);
    const rect1 = rects[0] as Rect;
    const rect2 = rects[1] as Rect;

    expect(rect1.shape.x).toBeGreaterThan(10);

    const center1 = rect1.shape.x + rect1.shape.width / 2;
    const center2 = rect2.shape.x + rect2.shape.width / 2;
    const groupCenter = (center1 + center2) / 2;

    expect(groupCenter).toBeCloseTo(200, -2);
  });

  it('should render table header in HTML mode', () => {
    const container = document.createElement('div');
    const legend = new Legend({
      renderMode: 'html',
      tableHead: ['Col1', 'Col2'],
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    const thead = htmlEl.querySelector('thead');
    expect(thead).not.toBeNull();
    const headers = thead?.querySelectorAll('th');
    expect(headers?.length).toBe(3);
    expect(headers?.[1].innerHTML).toBe('Col1');
    expect(headers?.[2].innerHTML).toBe('Col2');
  });

  it('should support array formatter in HTML mode', () => {
    const container = document.createElement('div');
    const legend = new Legend({
      renderMode: 'html',
      formatter: (name) => [name, 'Value'],
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    const row = htmlEl.querySelector('tbody tr') || htmlEl.querySelector('tr');
    const cells = row?.querySelectorAll('td');
    expect(cells?.length).toBe(3);
    expect(cells?.[1].innerHTML).toBe('A');
    expect(cells?.[2].innerHTML).toBe('Value');
  });

  it('should handle hover interaction in HTML mode', () => {
    const container = document.createElement('div');
    const onHover = vi.fn();
    const legend = new Legend({
      renderMode: 'html',
      onHover,
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    const row = htmlEl.querySelector('tr');

    row?.dispatchEvent(new MouseEvent('mouseover'));
    expect(onHover).toHaveBeenCalledWith('A', true);

    row?.dispatchEvent(new MouseEvent('mouseout'));
    expect(onHover).toHaveBeenCalledWith('A', false);
  });

  it('should handle HTML legend positioning', () => {
    const container = document.createElement('div');
    const legend = new Legend({
      renderMode: 'html',
      right: '5%',
      y: 'middle',
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    expect(htmlEl.style.right).toBe('5%');
    expect(htmlEl.style.top).toBe('50%');
    expect(htmlEl.style.transform).toContain('translateY(-50%)');
  });

  it('should render items with correct padding', () => {
    const container = document.createElement('div');
    const legendHtml = new Legend({
      renderMode: 'html',
      padding: 8,
      itemPadding: 12,
    });
    legendHtml.setDomContainer(container);
    legendHtml.setItems([{ name: 'A', color: 'red' }]);

    const htmlEl = (legendHtml as any)._htmlEl as HTMLElement;
    const tds = htmlEl.querySelectorAll('td');
    tds.forEach((td) => {
      const styleText = td.getAttribute('style') || '';

      if (td.querySelector('span')) {
        if (styleText.includes('padding: 12px')) {
          expect(styleText).toContain('padding: 12px');
        } else {
          expect(styleText).toContain('padding-top: 12px');
          expect(styleText).toContain('padding-right: 8px');
        }
      } else {
        if (styleText.includes('padding: 12px')) {
          expect(styleText).toContain('padding: 12px');
        } else {
          expect(styleText).toContain('padding-top: 12px');
        }
      }
    });

    const legendCanvas = new Legend({
      padding: 10,
      itemPadding: 12,
      renderMode: 'canvas',
    });
    legendCanvas.setItems([{ name: 'A', color: 'red', icon: 'rect' }]);

    const children = legendCanvas.children();
    const icon = children.find(
      (c) => c instanceof Rect && c.style.fill === 'red',
    ) as Rect;

    expect(icon.shape.x).toBe(22);
  });

  it('should pass data to formatter in HTML mode', () => {
    const container = document.createElement('div');
    const legend = new Legend({
      renderMode: 'html',
      formatter: (name, item) => {
        return `${name}: ${(item.data as any).value}`;
      },
    });
    legend.setDomContainer(container);
    legend.setItems([{ name: 'A', color: 'red', data: { value: 100 } }]);

    const htmlEl = (legend as any)._htmlEl as HTMLElement;
    const table = htmlEl.querySelector('table');
    const cell = table?.querySelector('td:last-child');
    expect(cell?.innerHTML).toBe('A: 100');
  });

  it('should wrap items vertically (multi-column) when height is exceeded', () => {
    const legend = new Legend({
      orient: 'vertical',
      height: 100,
      padding: 0,
      itemGap: 0,
      itemPadding: 0,
    });

    const items = Array.from({ length: 10 }, (_, i) => ({
      name: `Item ${i}`,
      color: 'red',
    }));

    legend.setItems(items);

    const children = legend.children();
    const rects = children.filter(
      (c) => c instanceof Rect && c.style.fill === 'red',
    );

    expect(rects.length).toBe(10);

    const xCoords = new Set(rects.map((r) => (r as Rect).shape.x));
    expect(xCoords.size).toBeGreaterThan(1);
  });

  it('should support per-item textStyle', () => {
    const legend = new Legend();
    legend.setItems([
      {
        name: 'Styled Item',
        color: 'red',
        textStyle: {
          color: 'blue',
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
    ]);

    const children = legend.children();
    const text = children.find((c) => c instanceof Text) as Text;

    expect(text).toBeDefined();
    expect(text.style.fill).toBe('blue');
    expect(text.style.fontSize).toBe(20);
    expect(text.style.fontWeight).toBe('bold');
  });
});
