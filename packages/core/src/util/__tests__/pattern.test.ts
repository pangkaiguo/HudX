import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  createPattern: vi.fn().mockReturnValue({
    setTransform: vi.fn(),
  }),
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
  beforeEach(() => {
    vi.clearAllMocks();
    mockCanvas.width = 0;
    mockCanvas.height = 0;
  });

  it('should create a pattern with default size', () => {
    const decal: DecalObject = { symbol: 'circle' };
    createDecalPattern(decal, '#000');

    // Default dashArray [1, 0.5] from preset for 'circle'
    // Sum = 1.5. Tile size = 6. Width = 9.
    expect(mockCanvas.width).toBe(9);
    expect(mockCanvas.height).toBe(9);
  });

  it('should respect dashArrayX', () => {
    const decal: DecalObject = { symbol: 'circle', dashArrayX: [2, 1] };
    createDecalPattern(decal, '#000');

    // Sum = 3. Width = 3 * 6 = 18.
    expect(mockCanvas.width).toBe(18);
    expect(mockCanvas.height).toBe(9); // Default dashArrayY [1, 0.5] -> 9
  });

  it('should respect maxTileWidth constraint', () => {
    const decal: DecalObject = { symbol: 'circle', dashArrayX: [100], maxTileWidth: 50 };
    createDecalPattern(decal, '#000');

    expect(mockCanvas.width).toBe(50);
  });

  it('should use reduced symbol size from preset', () => {
    const decal: DecalObject = { symbol: 'circle' };
    createDecalPattern(decal, '#000');

    expect(mockContext.arc).toHaveBeenCalledWith(0, 0, 1.5, 0, Math.PI * 2);
  });

  it('should store rotation on the pattern object', () => {
    const decal: DecalObject = { symbol: 'line', rotation: Math.PI / 4 };
    const pattern = createDecalPattern(decal, '#000');

    expect((pattern as any)._rotation).toBeCloseTo(Math.PI / 4);
  });

  describe('Presets verification', () => {
    it('should verify diagonal preset dimensions', () => {
      createDecalPattern({ symbol: 'diagonal' }, '#000');
      expect(mockCanvas.width).toBe(6);
      expect(mockCanvas.height).toBe(9);

      expect(mockContext.moveTo).toHaveBeenCalledWith(-1.5, 0);
      expect(mockContext.lineTo).toHaveBeenCalledWith(1.5, 0);
    });

    it('should verify grid preset dimensions', () => {
      createDecalPattern({ symbol: 'grid' }, '#000');
      expect(mockCanvas.width).toBe(12);
      expect(mockCanvas.height).toBe(12);
    });

    it('should verify rect preset dimensions and symbol size', () => {
      createDecalPattern({ symbol: 'rect' }, '#000');
      expect(mockCanvas.width).toBe(9);
      expect(mockCanvas.height).toBe(9);

      expect(mockContext.fillRect).toHaveBeenCalledWith(-1.5, -1.5, 3, 3);
    });

    it('should verify all presets use symbolSize 0.5', () => {
      const presets = [
        'diagonal', 'diagonal-reverse', 'grid', 'crosshatch',
        'checkerboard', 'dots', 'rect', 'circle', 'triangle',
        'diamond', 'pin', 'arrow'
      ];

      presets.forEach(preset => {
        vi.clearAllMocks();
        createDecalPattern({ symbol: preset }, '#000');

        expect(mockCanvas.getContext).toHaveBeenCalled();

        if (preset === 'crosshatch') {
          expect(mockCanvas.width).toBe(6);
          expect(mockCanvas.height).toBe(6);
        } else if (preset === 'grid') {
          expect(mockCanvas.width).toBe(12);
          expect(mockCanvas.height).toBe(12);
        } else if (preset.startsWith('diagonal')) {
          expect(mockCanvas.width).toBe(6);
          expect(mockCanvas.height).toBe(9);
        } else {
          expect(mockCanvas.width).toBe(9);
          expect(mockCanvas.height).toBe(9);
        }
      });
    });
  });
});
