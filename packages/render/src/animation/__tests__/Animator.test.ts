import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Animator from '../Animator';

describe('Animator', () => {
  beforeAll(() => {
    vi.stubGlobal('requestAnimationFrame', (_callback: FrameRequestCallback) => 1);
    vi.stubGlobal('cancelAnimationFrame', (_id: number) => { });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('should track animations and clear them on stopAll', () => {
    const animator = new Animator();
    const targetA: any = { x: 0 };
    const targetB: any = { x: 0 };

    const a = animator.animate(targetA, 'x', 10, { duration: 1000 });
    const b = animator.animate(targetB, 'x', 20, { duration: 1000 });

    expect(animator.getAnimationCount()).toBe(2);

    const stopSpyA = vi.spyOn(a, 'stop');
    const stopSpyB = vi.spyOn(b, 'stop');

    animator.stopAll();

    expect(stopSpyA).toHaveBeenCalled();
    expect(stopSpyB).toHaveBeenCalled();
    expect(animator.getAnimationCount()).toBe(0);
  });

  it('should pause and resume all animations', () => {
    const animator = new Animator();
    const targetA: any = { x: 0 };
    const targetB: any = { x: 0 };

    const a = animator.animate(targetA, 'x', 10, { duration: 1000 });
    const b = animator.animate(targetB, 'x', 20, { duration: 1000 });

    const pauseSpyA = vi.spyOn(a, 'pause');
    const pauseSpyB = vi.spyOn(b, 'pause');
    const resumeSpyA = vi.spyOn(a, 'resume');
    const resumeSpyB = vi.spyOn(b, 'resume');

    animator.pauseAll();
    expect(pauseSpyA).toHaveBeenCalled();
    expect(pauseSpyB).toHaveBeenCalled();

    animator.resumeAll();
    expect(resumeSpyA).toHaveBeenCalled();
    expect(resumeSpyB).toHaveBeenCalled();
  });

  it('should remove animation when completed and call onComplete', () => {
    const animator = new Animator();
    const target: any = { x: 0 };
    const onComplete = vi.fn();

    animator.animate(target, 'x', 100, { duration: 0, onComplete });

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(target.x).toBe(100);
    expect(animator.getAnimationCount()).toBe(0);
  });
});

