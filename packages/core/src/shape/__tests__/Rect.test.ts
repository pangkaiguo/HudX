import { describe, it, expect } from 'vitest';
import Rect from '../Rect';

describe('Rect', () => {
  it('should initialize with default values', () => {
    const rect = new Rect();
    expect(rect.shape).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  });

  it('should initialize with provided values', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 100, height: 50 }
    });
    expect(rect.shape).toEqual({ x: 10, y: 20, width: 100, height: 50 });
  });

  it('should calculate bounding rect correctly', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 100, height: 50 }
    });
    const bbox = rect.getBoundingRect();
    expect(bbox).toEqual({ x: 10, y: 20, width: 100, height: 50 });
  });

  it('should check containment correctly', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 100, height: 50 }
    });
    expect(rect.contain(15, 25)).toBe(true);
    expect(rect.contain(110, 70)).toBe(true);
    expect(rect.contain(5, 25)).toBe(false);
    expect(rect.contain(15, 80)).toBe(false);
  });
});
