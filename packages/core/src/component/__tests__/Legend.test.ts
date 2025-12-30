import { describe, it, expect, vi } from 'vitest';
import Legend from '../Legend';
import Line from '../../shape/Line';
import Circle from '../../shape/Circle';
import Rect from '../../shape/Rect';

describe('Legend', () => {
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
    // Interact rects are Rects with cursor 'pointer'
    const interactRects = children.filter(c => c instanceof Rect && c.attr('cursor') === 'pointer');
    expect(interactRects.length).toBe(2);
  });
});
