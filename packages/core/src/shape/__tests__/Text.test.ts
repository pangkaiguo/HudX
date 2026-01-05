import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Text from '../Text';

describe('Text', () => {
  beforeAll(() => {
    // Mock canvas context for measureText
    const mockContext = {
      font: '',
      measureText: (text: string) => ({ width: text.length * 10 }), // Mock width
      fillText: vi.fn(),
      strokeText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
    };

    const mockCanvas = {
      getContext: () => mockContext,
    };

    if (typeof document !== 'undefined') {
      const originalCreateElement = document.createElement.bind(document);
      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        if (tagName === 'canvas') {
          return mockCanvas as any;
        }
        return originalCreateElement(tagName);
      });
    } else {
      global.document = {
        createElement: (tagName: string) => {
          if (tagName === 'canvas') {
            return mockCanvas;
          }
          return {};
        }
      } as any;
    }
  });

  it('should initialize with default values', () => {
    const text = new Text();
    expect(text.shape).toEqual({ x: 0, y: 0, text: '' });
  });

  it('should initialize with provided values', () => {
    const text = new Text({
      shape: { x: 10, y: 20, text: 'Hello' }
    });
    expect(text.shape).toEqual({ x: 10, y: 20, text: 'Hello' });
  });

  it('should calculate bounding rect correctly (mocked)', () => {
    const text = new Text({
      shape: { x: 10, y: 20, text: 'Hello' },
      style: { fontSize: 10 }
    });
    // Width should be 5 * 10 = 50 based on our mock
    // Height should be 10
    // x, y depends on alignment. Default left/alphabetic

    const bbox = text.getBoundingRect();
    // Default alignment 'left' means x stays 10
    // Default baseline 'alphabetic' means y stays 20 (roughly) - wait, implementation:
    // } else if (textBaseline === 'bottom') {
    //   // y stays as is
    // }
    // It seems 'alphabetic' is treated as default/bottom-ish in my mock logic?
    // Let's check Text.ts logic again.
    // Text.ts: 
    // const textBaseline = style.textBaseline || 'alphabetic';
    // if (textBaseline === 'middle') y -= height/2
    // if (textBaseline === 'top') y -= height
    // else ... y stays as is.

    expect(bbox.width).toBe(50);
    expect(bbox.height).toBe(10);
    expect(bbox.x).toBe(10);
    expect(bbox.y).toBe(12);
  });

  it('should handle text alignment', () => {
    const text = new Text({
      shape: { x: 100, y: 100, text: 'Hello' },
      style: { fontSize: 10, textAlign: 'center', textBaseline: 'middle' }
    });
    const bbox = text.getBoundingRect();
    // Width 50, Height 10
    // x = 100 - 50/2 = 75
    // y = 100 - 10/2 = 95
    expect(bbox.x).toBe(75);
    expect(bbox.y).toBe(95);
  });
});
