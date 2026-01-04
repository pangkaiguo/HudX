import { describe, it, expect } from 'vitest';
import Circle from '../Circle';

describe('Circle', () => {
  it('should initialize with default values', () => {
    const circle = new Circle();
    expect(circle.shape).toEqual({ cx: 0, cy: 0, r: 0 });
  });

  it('should initialize with provided values', () => {
    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 50 }
    });
    expect(circle.shape).toEqual({ cx: 100, cy: 100, r: 50 });
  });

  it('should calculate bounding rect correctly', () => {
    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 50 }
    });
    const bbox = circle.getBoundingRect();
    expect(bbox).toEqual({ x: 50, y: 50, width: 100, height: 100 });
  });

  it('should check containment correctly', () => {
    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 50 }
    });
    // Center
    expect(circle.contain(100, 100)).toBe(true);
    // Inside
    expect(circle.contain(130, 130)).toBe(true);
    // Edge (approx)
    expect(circle.contain(150, 100)).toBe(true);
    // Outside
    expect(circle.contain(151, 100)).toBe(false);
    expect(circle.contain(200, 200)).toBe(false);
  });
});
