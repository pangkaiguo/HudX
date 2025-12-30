import { describe, it, expect } from 'vitest';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('should initialize correctly', () => {
    const tooltip = new Tooltip();
    expect(tooltip.isVisible()).toBe(false);
    expect(tooltip.invisible).toBe(true);
    expect(tooltip.style.opacity).toBe(0);
    expect(tooltip.z).toBe(1000);
    expect(tooltip.silent).toBe(true);
  });

  it('should show content correctly', () => {
    const tooltip = new Tooltip();
    tooltip.setContainer(800, 600);

    tooltip.show(100, 100, 'Test Content');

    expect(tooltip.isVisible()).toBe(true);
    expect(tooltip.invisible).toBe(false);

    // Check transform
    const transform = tooltip.attr('transform');
    expect(transform.x).toBeGreaterThan(0); // Should be positioned
    expect(transform.y).toBeGreaterThan(0);

    // Should have children (bg rect + text)
    const children = tooltip.children();
    expect(children.length).toBeGreaterThan(0);
  });

  it('should handle positioning logic (confine)', () => {
    const tooltip = new Tooltip({ confine: true });
    tooltip.setContainer(100, 100);

    // Try to show at right edge, should flip left
    tooltip.show(90, 50, 'Long Content That Will Overflow');

    const transform = tooltip.attr('transform');
    // It should be positioned to the left of 90
    // Because width of "Long Content..." > 10px remaining space
    expect(transform.x).toBeLessThan(90);
  });

  it('should optimize rendering when content is same', () => {
    const tooltip = new Tooltip();
    tooltip.setContainer(800, 600);

    // First show
    tooltip.show(100, 100, 'Same Content');
    const childrenCount1 = tooltip.children().length;

    // Second show with same content, different position
    tooltip.show(200, 200, 'Same Content');
    const childrenCount2 = tooltip.children().length;

    const transform = tooltip.attr('transform');
    expect(transform.x).toBeCloseTo(215); // 200 + offset 15
    expect(transform.y).toBeCloseTo(215);

    expect(childrenCount1).toBe(childrenCount2);
  });

  it('should hide correctly', () => {
    const tooltip = new Tooltip();
    tooltip.show(100, 100, 'Test');
    expect(tooltip.isVisible()).toBe(true);

    tooltip.hide();
  });
});
