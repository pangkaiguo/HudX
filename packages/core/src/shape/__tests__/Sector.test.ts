import { describe, it, expect } from 'vitest';
import Sector from '../Sector';

describe('Sector', () => {
  it('should initialize with provided values', () => {
    const sector = new Sector({
      shape: { cx: 100, cy: 100, r0: 50, r: 100, startAngle: 0, endAngle: Math.PI / 2 }
    });
    expect(sector.shape).toEqual({ cx: 100, cy: 100, r0: 50, r: 100, startAngle: 0, endAngle: Math.PI / 2 });
  });

  it('should calculate bounding rect correctly', () => {
    const sector = new Sector({
      shape: { cx: 100, cy: 100, r0: 50, r: 100, startAngle: 0, endAngle: Math.PI / 2 }
    });
    // Bounding rect logic in Sector.ts is simplified (square around circle), not tight
    // r = 100, padding = 100 + 0.5 = 100.5
    // x = 100 - 100.5 = -0.5
    // y = 100 - 100.5 = -0.5
    // w = 201
    // h = 201
    const bbox = sector.getBoundingRect();
    expect(bbox.width).toBeCloseTo(201);
    expect(bbox.height).toBeCloseTo(201);
  });

  it('should check containment correctly', () => {
    const sector = new Sector({
      shape: { cx: 100, cy: 100, r0: 50, r: 100, startAngle: 0, endAngle: Math.PI / 2 }
    });
    
    // Inside (radius 75, angle 45 deg)
    const x = 100 + 75 * Math.cos(Math.PI / 4);
    const y = 100 + 75 * Math.sin(Math.PI / 4);
    expect(sector.contain(x, y)).toBe(true);

    // Outside radius (> 100)
    expect(sector.contain(250, 100)).toBe(false);

    // Inside radius but outside angle (e.g. 180 deg)
    expect(sector.contain(25, 100)).toBe(false);

    // Inside hole (< 50)
    expect(sector.contain(100, 100)).toBe(false);
  });
});
