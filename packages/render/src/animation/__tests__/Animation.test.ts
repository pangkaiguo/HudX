import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { Animation, Easing } from '../Animation';

describe('Animation', () => {
  beforeAll(() => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      return setTimeout(callback, 16);
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      clearTimeout(id);
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('should initialize correctly', () => {
    const target = { x: 0 };
    const anim = new Animation(target, 'x', 100, 1000);
    expect(target.x).toBe(0);
  });

  it('should animate value', () =>
    new Promise<void>((resolve) => {
      const target = { x: 0 };
      const onUpdate = vi.fn();
      const onComplete = vi.fn(() => {
        expect(target.x).toBe(100);
        resolve();
      });

      const anim = new Animation(
        target,
        'x',
        100,
        100,
        0,
        'linear',
        onUpdate,
        onComplete,
      );
      anim.start();
    }));

  it('should handle delay', () =>
    new Promise<void>((resolve) => {
      const target = { x: 0 };
      const onComplete = vi.fn(() => {
        expect(target.x).toBe(100);
        resolve();
      });

      const anim = new Animation(
        target,
        'x',
        100,
        50,
        10,
        'linear',
        undefined,
        onComplete,
      );
      anim.start();
    }));

  it('should support custom easing', () => {
    const easing = Easing.quadraticIn;
    expect(easing(0)).toBe(0);
    expect(easing(0.5)).toBe(0.25);
    expect(easing(1)).toBe(1);
  });

  it('should stop animation', () =>
    new Promise<void>((resolve) => {
      const target = { x: 0 };
      const onComplete = vi.fn();
      const anim = new Animation(
        target,
        'x',
        100,
        100,
        0,
        'linear',
        undefined,
        onComplete,
      );
      anim.start();

      setTimeout(() => {
        anim.stop();
        expect(target.x).toBeLessThan(100);
        expect(target.x).toBeGreaterThan(0);
        expect(onComplete).not.toHaveBeenCalled();

        anim.stop();
        resolve();
      }, 50);
    }));

  // --- New Tests for Coverage ---

  describe('Easing Functions', () => {
    it('should have valid easing functions', () => {
      const keys = Object.keys(Easing) as Array<keyof typeof Easing>;
      keys.forEach((key) => {
        const fn = Easing[key];
        expect(typeof fn).toBe('function');
        expect(typeof fn(0)).toBe('number');
        expect(typeof fn(0.5)).toBe('number');
        expect(typeof fn(1)).toBe('number');
      });
    });

    it('should test specific branches in easing functions', () => {
      expect(Easing.quadraticInOut(0.4)).toBeCloseTo(2 * 0.4 * 0.4);
      expect(Easing.quadraticInOut(0.6)).toBeCloseTo(-1 + (4 - 2 * 0.6) * 0.6);

      expect(Easing.cubicInOut(0.4)).toBeCloseTo(4 * 0.4 ** 3);
      expect(Easing.cubicInOut(0.6)).toBeCloseTo(
        (0.6 - 1) * (2 * 0.6 - 2) ** 2 + 1,
      );

      expect(Easing.exponentialIn(0)).toBe(0);
      expect(Easing.exponentialIn(0.5)).toBeGreaterThan(0);

      expect(Easing.exponentialOut(1)).toBe(1);
      expect(Easing.exponentialOut(0.5)).toBeLessThan(1);

      expect(Easing.exponentialInOut(0)).toBe(0);
      expect(Easing.exponentialInOut(1)).toBe(1);
      expect(Easing.exponentialInOut(0.25)).toBeCloseTo(
        Math.pow(2, 20 * 0.25 - 10) / 2,
      );
      expect(Easing.exponentialInOut(0.75)).toBeCloseTo(
        (2 - Math.pow(2, -20 * 0.75 + 10)) / 2,
      );

      expect(Easing.circularInOut(0.25)).toBeDefined();
      expect(Easing.circularInOut(0.75)).toBeDefined();

      expect(Easing.elasticIn(0)).toBe(0);
      expect(Easing.elasticIn(1)).toBe(1);
      expect(Easing.elasticIn(0.5)).toBeDefined();

      expect(Easing.elasticOut(0)).toBe(0);
      expect(Easing.elasticOut(1)).toBe(1);
      expect(Easing.elasticOut(0.5)).toBeDefined();

      expect(Easing.elasticInOut(0)).toBe(0);
      expect(Easing.elasticInOut(1)).toBe(1);
      expect(Easing.elasticInOut(0.25)).toBeDefined();
      expect(Easing.elasticInOut(0.75)).toBeDefined();

      expect(Easing.backIn(0.5)).toBeDefined();

      expect(Easing.backOut(0.5)).toBeDefined();

      expect(Easing.backInOut(0.25)).toBeDefined();
      expect(Easing.backInOut(0.75)).toBeDefined();

      expect(Easing.bounceOut(0.1)).toBeDefined();
      expect(Easing.bounceOut(0.4)).toBeDefined();
      expect(Easing.bounceOut(0.8)).toBeDefined();
      expect(Easing.bounceOut(0.95)).toBeDefined();
    });
    it('should fallback to linear for invalid easing string', () => {
      const target = { x: 0 };
      const anim = new Animation(target, 'x', 100, 100, 0, 'invalid-easing');
      expect((anim as any)._easing).toBe(Easing.linear);
    });

    it('should return 0 for non-number values on get', () => {
      const target = { x: 'string' };
      const anim = new Animation(target, 'x', 100);
      expect((anim as any)._startValue).toBe(0);
    });
  });

  describe('Control Flow', () => {
    it('should ignore start if already running', () => {
      const target = { x: 0 };
      const anim = new Animation(target, 'x', 100, 100);
      anim.start();
      const id = (anim as any)._animationFrameId;
      anim.start();
      expect((anim as any)._animationFrameId).toBe(id);
    });

    it('should pause and resume', () =>
      new Promise<void>((resolve) => {
        const target = { x: 0 };
        const anim = new Animation(target, 'x', 100, 200);

        anim.start();

        setTimeout(() => {
          const valBeforePause = target.x;
          expect(valBeforePause).toBeGreaterThan(0);

          anim.pause();

          setTimeout(() => {
            expect(target.x).toBeCloseTo(valBeforePause, 1);

            anim.resume();

            setTimeout(() => {
              expect(target.x).toBeGreaterThan(valBeforePause);
              resolve();
            }, 50);
          }, 50);
        }, 50);
      }));

    it('should ignore pause/resume if not appropriate', () => {
      const target = { x: 0 };
      const anim = new Animation(target, 'x', 100, 100);

      anim.pause();
      expect((anim as any)._paused).toBe(false);

      anim.resume();
      expect((anim as any)._paused).toBe(false);

      anim.start();
      anim.pause();
      expect((anim as any)._paused).toBe(true);

      anim.pause();
      expect((anim as any)._paused).toBe(true);

      anim.resume();
      expect((anim as any)._paused).toBe(false);

      anim.resume();
      expect((anim as any)._paused).toBe(false);
    });

    it('should loop in animate when paused', () =>
      new Promise<void>((resolve) => {
        const target = { x: 0 };
        const anim = new Animation(target, 'x', 100, 100);
        anim.start();
        anim.pause();

        setTimeout(() => {
          expect((anim as any)._paused).toBe(true);
          anim.stop();
          resolve();
        }, 50);
      }));
  });

  describe('Deep Property Access', () => {
    it('should animate nested property', () =>
      new Promise<void>((resolve) => {
        const target = { style: { opacity: 0 } };
        const anim = new Animation(target, 'style.opacity', 1, 100);
        anim.start();

        setTimeout(() => {
          expect(target.style.opacity).toBeGreaterThan(0);
          anim.stop();
          resolve();
        }, 50);
      }));

    it('should handle missing nested properties on get', () => {
      const target = {};
      const anim = new Animation(target, 'a.b.c', 100);
      expect((anim as any)._startValue).toBe(0);
    });

    it('should handle non-object in path on get', () => {
      const target = { a: 1 };
      const anim = new Animation(target, 'a.b', 100);
      expect((anim as any)._startValue).toBe(0);
    });

    it('should create missing nested properties on set', () =>
      new Promise<void>((resolve) => {
        const target: any = {};
        const anim = new Animation(target, 'a.b.c', 100, 50);
        anim.start();

        setTimeout(() => {
          expect(target.a).toBeDefined();
          expect(target.a.b).toBeDefined();
          expect(target.a.b.c).toBeGreaterThan(0);
          resolve();
        }, 60);
      }));

    it('should stop setting if path is blocked by non-object', () =>
      new Promise<void>((resolve) => {
        const target = { a: 1 };
        const anim = new Animation(target, 'a.b', 100, 50);
        anim.start();

        setTimeout(() => {
          expect(target.a).toBe(1);
          resolve();
        }, 60);
      }));
  });
});
