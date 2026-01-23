import { describe, it, expect, vi, afterEach } from 'vitest';
import { getUnit32RandomValues, uuidV4 } from '../random';

describe('random', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should fall back to Math.random when window is undefined', () => {
    vi.stubGlobal('window', undefined as any);
    vi.spyOn(Math, 'random').mockReturnValue(0.123);
    expect(getUnit32RandomValues()).toBe(0.123);
  });

  it('should fall back to Math.random when crypto is not available', () => {
    vi.stubGlobal('window', {} as any);
    vi.spyOn(Math, 'random').mockReturnValue(0.456);
    expect(getUnit32RandomValues()).toBe(0.456);
  });

  it('should use crypto.getRandomValues when available', () => {
    vi.stubGlobal('window', {
      crypto: {
        getRandomValues: (arr: Uint32Array) => {
          arr[0] = 0;
          return arr;
        },
      },
    } as any);

    expect(getUnit32RandomValues()).toBe(0);
    expect(uuidV4()).toBe('00000000-0000-4000-8000-000000000000');
  });
});

