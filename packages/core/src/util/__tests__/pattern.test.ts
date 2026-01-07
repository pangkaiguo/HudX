import { describe, it, expect, vi } from 'vitest';
import { createDecalPattern } from '../pattern';
import { DecalObject } from '../../types';

// Mock Canvas API
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
  createPattern: vi.fn().mockReturnValue({}),
} as unknown as CanvasRenderingContext2D;

const mockCanvas = {
  getContext: vi.fn().mockReturnValue(mockContext),
  width: 0,
  height: 0,
  toDataURL: vi.fn(),
} as unknown as HTMLCanvasElement;

vi.stubGlobal('document', {
  createElement: (tag: string) => {
    if (tag === 'canvas') return mockCanvas;
    return {};
  }
});

describe('createDecalPattern', () => {
  it('should create a pattern with default size', () => {
    const decal: DecalObject = { symbol: 'circle' };
    createDecalPattern(decal, '#000');

    // Check mock canvas directly since our mock implementation reuses it
    expect(mockCanvas.width).toBe(6);
    expect(mockCanvas.height).toBe(6);
  });

  it('should respect dashArrayX', () => {
    const decal: DecalObject = { symbol: 'circle', dashArrayX: [2, 1] };
    createDecalPattern(decal, '#000');

    // dashArrayX sum = 3. totalW = 3 * 6 = 18.
    expect(mockCanvas.width).toBe(18);
    expect(mockCanvas.height).toBe(6);
  });

  it('should respect maxTileWidth constraint', () => {
    const decal: DecalObject = { symbol: 'circle', dashArrayX: [100], maxTileWidth: 50 };
    createDecalPattern(decal, '#000');

    // dashArrayX sum = 100. totalW calculated = 100 * 6 = 600.
    // capped by maxTileWidth 50.
    expect(mockCanvas.width).toBe(50);
  });
});
