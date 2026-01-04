import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Animation, { Easing } from '../Animation';

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

  it('should animate value', () => new Promise<void>((resolve) => {
    const target = { x: 0 };
    const onUpdate = vi.fn();
    const onComplete = vi.fn(() => {
      expect(target.x).toBe(100);
      resolve();
    });

    const anim = new Animation(target, 'x', 100, 100, 0, 'linear', onUpdate, onComplete);
    anim.start();
  }));

  it('should handle delay', () => new Promise<void>((resolve) => {
    const target = { x: 0 };
    const onComplete = vi.fn(() => {
      expect(target.x).toBe(100);
      resolve();
    });

    // Short duration, short delay
    const anim = new Animation(target, 'x', 100, 50, 10, 'linear', undefined, onComplete);
    anim.start();
  }));

  it('should support custom easing', () => {
    const easing = Easing.quadraticIn;
    expect(easing(0)).toBe(0);
    expect(easing(0.5)).toBe(0.25);
    expect(easing(1)).toBe(1);
  });

  it('should stop animation', () => new Promise<void>((resolve) => {
    const target = { x: 0 };
    const onComplete = vi.fn();
    const anim = new Animation(target, 'x', 100, 100, 0, 'linear', undefined, onComplete);
    anim.start();
    
    setTimeout(() => {
      anim.stop();
      expect(target.x).toBeLessThan(100);
      expect(target.x).toBeGreaterThan(0);
      expect(onComplete).not.toHaveBeenCalled();
      resolve();
    }, 50);
  }));
});
