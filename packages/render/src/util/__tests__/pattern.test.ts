import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { createDecalPattern } from '../pattern';
import { DecalObject } from '../../types';

// Mock Canvas API
const fillRectMock = vi.fn();
const beginPathMock = vi.fn();
const moveToMock = vi.fn();
const lineToMock = vi.fn();
const arcToMock = vi.fn();
const closePathMock = vi.fn();
const fillMock = vi.fn();
const strokeMock = vi.fn();
const saveMock = vi.fn();
const restoreMock = vi.fn();
const translateMock = vi.fn();
const rotateMock = vi.fn();
const arcMock = vi.fn();
const setTransformMock = vi.fn();
const mockContext = {
  fillRect: fillRectMock,
  beginPath: beginPathMock,
  moveTo: moveToMock,
  lineTo: lineToMock,
  arcTo: arcToMock,
  closePath: closePathMock,
  fill: fillMock,
  stroke: strokeMock,
  save: saveMock,
  restore: restoreMock,
  translate: translateMock,
  rotate: rotateMock,
  arc: arcMock,
  setTransform: setTransformMock,
  createPattern: vi.fn().mockReturnValue({
    setTransform: vi.fn(),
  }),
  lineCap: '',
  lineJoin: '',
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
} as unknown as CanvasRenderingContext2D;

const mockCanvas = {
  getContext: vi.fn().mockReturnValue(mockContext),
  width: 0,
  height: 0,
  toDataURL: vi.fn(),
} as unknown as HTMLCanvasElement;

describe('createDecalPattern', () => {
  beforeAll(() => {
    vi.stubGlobal('document', {
      createElement: (tag: string) => {
        if (tag === 'canvas') return mockCanvas;
        return {};
      },
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockCanvas.width = 0;
    mockCanvas.height = 0;
  });

  it('should create a pattern with default size', () => {
    const decal: DecalObject = { symbol: 'circle' };
    createDecalPattern(decal, '#000');

    expect(mockCanvas.width).toBe(8);
    expect(mockCanvas.height).toBe(8);
  });

  it('should respect dashArrayX', () => {
    const decal: DecalObject = { symbol: 'circle', dashArrayX: [2, 1] };
    createDecalPattern(decal, '#000');

    expect(mockCanvas.width).toBe(3);
    expect(mockCanvas.height).toBe(8);
  });

  it('should respect maxTileWidth constraint', () => {
    const decal: DecalObject = {
      symbol: 'circle',
      dashArrayX: [100],
      maxTileWidth: 50,
    };
    createDecalPattern(decal, '#000');

    expect(mockCanvas.width).toBe(50);
  });

  it('should use reduced symbol size from preset', () => {
    const decal: DecalObject = { symbol: 'circle' };
    createDecalPattern(decal, '#000');

    expect(arcMock.mock.calls.length).toBeGreaterThan(0);
    const first = arcMock.mock.calls[0]!;
    expect(first[0]).toBe(0);
    expect(first[1]).toBe(0);
    expect(first[2]).toBeCloseTo(1.2, 6);
  });

  it('should store rotation on the pattern object', () => {
    const decal: DecalObject = { symbol: 'line', rotation: Math.PI / 4 };
    const pattern = createDecalPattern(decal, '#000');

    expect((pattern as unknown as { _rotation?: number })._rotation).toBeCloseTo(
      Math.PI / 4,
    );
  });

  describe('Presets verification', () => {
    it('should verify diagonal preset dimensions', () => {
      createDecalPattern({ symbol: 'diagonal' }, '#000');
      expect(mockCanvas.width).toBe(8);
      expect(mockCanvas.height).toBe(8);

      expect(mockContext.moveTo).toHaveBeenCalledWith(-2, 0);
      expect(mockContext.lineTo).toHaveBeenCalledWith(2, 0);
    });

    it('should verify grid preset dimensions', () => {
      createDecalPattern({ symbol: 'grid' }, '#000');
      expect(mockCanvas.width).toBe(8);
      expect(mockCanvas.height).toBe(8);
    });

    it('should verify rect preset dimensions and symbol size', () => {
      createDecalPattern({ symbol: 'rect' }, '#000');
      expect(mockCanvas.width).toBe(8);
      expect(mockCanvas.height).toBe(8);

      expect(fillRectMock.mock.calls.length).toBeGreaterThan(1);
      const last = fillRectMock.mock.calls[fillRectMock.mock.calls.length - 1]!;
      expect(last[0]).toBeCloseTo(-1.3, 6);
      expect(last[1]).toBeCloseTo(-1.3, 6);
      expect(last[2]).toBeCloseTo(2.6, 6);
      expect(last[3]).toBeCloseTo(2.6, 6);
    });

    it('should create all presets without error', () => {
      const presets = [
        'diagonal',
        'diagonal-reverse',
        'grid',
        'crosshatch',
        'checkerboard',
        'dots',
        'rect',
        'square',
        'roundRect',
        'circle',
        'triangle',
        'diamond',
        'pin',
        'pentagon',
        'arrow',
      ];

      presets.forEach((preset) => {
        vi.clearAllMocks();
        createDecalPattern({ symbol: preset }, '#000');

        expect(mockCanvas.getContext).toHaveBeenCalled();
        expect(mockCanvas.width).toBeGreaterThan(0);
        expect(mockCanvas.height).toBeGreaterThan(0);
      });
    });
  });
});
