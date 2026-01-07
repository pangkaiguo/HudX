import { describe, it, expect, vi, beforeAll } from 'vitest';
import Legend from '../Legend';
import Line from '../../shape/Line';
import Circle from '../../shape/Circle';
import Rect from '../../shape/Rect';

describe('Legend', () => {
  beforeAll(() => {
    // Mock Canvas API for createDecalPattern
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
      createPattern: vi.fn().mockReturnValue({ setTransform: vi.fn() }),
    } as unknown as CanvasRenderingContext2D;

    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockContext),
      width: 0,
      height: 0,
      toDataURL: vi.fn(),
    } as unknown as HTMLCanvasElement;

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string, options?: any) => {
      if (tag === 'canvas') {
        return mockCanvas;
      }
      return originalCreateElement(tag, options);
    });
  });

  it('should render correct icons', () => {
    const legend = new Legend();
    legend.setItems([
      { name: 'Series A', color: 'red', icon: 'circle' },
      { name: 'Series B', color: 'blue', icon: 'line' },
      { name: 'Series C', color: 'green', icon: 'rect' }
    ]);

    const children = legend.children();
    expect(children.length).toBe(10);

    // Filter icons
    const icons = children.filter(c =>
      c instanceof Circle || c instanceof Line || (c instanceof Rect && c.style.fill !== 'transparent' && c.style.fill !== 'rgba(255, 255, 255, 0.9)')
    );

    // Series A -> Circle
    const circleIcon = children.find(c => c instanceof Circle);
    expect(circleIcon).toBeDefined();
    expect(circleIcon?.style.fill).toBe('red');

    // Series B -> Line
    const lineIcon = children.find(c => c instanceof Line);
    expect(lineIcon).toBeDefined();
    expect(lineIcon?.style.stroke).toBe('blue');
    const rectIcon = children.find(c => c instanceof Rect && c.style.fill === 'green');
    expect(rectIcon).toBeDefined();
  });

  it('should render decal pattern', () => {
    const legend = new Legend();
    legend.setItems([
      {
        name: 'Series A',
        color: 'red',
        icon: 'rect',
        decal: { symbol: 'rect' }
      }
    ]);

    const children = legend.children();
    const rectIcon = children.find(c => c instanceof Rect && c.style.fill !== 'transparent' && c.style.fill !== 'rgba(255, 255, 255, 0.9)');

    expect(rectIcon).toBeDefined();
    expect(typeof rectIcon?.style.fill).not.toBe('string');
  });

  it('should handle selection', () => {
    const onSelect = vi.fn();
    const legend = new Legend({ onSelect });
    legend.setItems([
      { name: 'A', color: 'red' },
      { name: 'B', color: 'blue' }
    ]);

    expect(legend.isSelected('A')).toBe(true);
    expect(legend.isSelected('B')).toBe(true);
    const children = legend.children();
    const interactRects = children.filter(c => c instanceof Rect && c.attr('cursor') === 'pointer');
    expect(interactRects.length).toBe(2);
  });
});
