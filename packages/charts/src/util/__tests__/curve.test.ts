import { describe, it, expect } from 'vitest';
import { getSmoothPath, getSmoothAreaPath } from '../curve';

describe('curve utility', () => {
  it('should return empty string for less than 2 points', () => {
    expect(getSmoothPath([])).toBe('');
    expect(getSmoothPath([{ x: 0, y: 0 }])).toBe('');
  });

  it('should generate smooth path for points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: 20, y: 0 },
    ];
    const path = getSmoothPath(points);
    expect(path).toContain('M 0 0');
    expect(path).toContain('C'); // Should contain cubic bezier commands
    expect(path).toContain('20 0');
  });

  it('should generate closed area path', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 10, y: 20 },
      { x: 20, y: 10 },
    ];
    const y0 = 0;
    const path = getSmoothAreaPath(points, y0);

    expect(path).toContain('M 0 10');
    expect(path).toContain('L 20 0'); // Close to baseline right
    expect(path).toContain('L 0 0'); // Close to baseline left
    expect(path).toContain('Z');
  });
});
