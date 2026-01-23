/**
 * Animator - Manages multiple animations
 */

import { Animation, type EasingFunction } from './Animation';

export interface AnimatorOption {
  duration?: number;
  delay?: number;
  easing?: string | EasingFunction;
  onUpdate?: (target: any, percent: number) => void;
  onComplete?: () => void;
}

export default class Animator {
  private _animations: Animation[] = [];

  /**
   * Animate target property
   */
  animate(
    target: any,
    property: string,
    endValue: number,
    options: AnimatorOption = {},
  ): Animation {
    const originalOnComplete = options.onComplete;
    let animation: Animation;
    const wrappedOnComplete = () => {
      const index = this._animations.indexOf(animation);
      if (index >= 0) {
        this._animations.splice(index, 1);
      }
      originalOnComplete?.();
    };

    animation = new Animation(
      target,
      property,
      endValue,
      options.duration,
      options.delay,
      options.easing,
      options.onUpdate,
      wrappedOnComplete,
    );

    this._animations.push(animation);
    animation.start();

    return animation;
  }

  /**
   * Stop all animations
   */
  stopAll(): void {
    for (const animation of this._animations) {
      animation.stop();
    }
    this._animations = [];
  }

  /**
   * Pause all animations
   */
  pauseAll(): void {
    for (const animation of this._animations) {
      animation.pause();
    }
  }

  /**
   * Resume all animations
   */
  resumeAll(): void {
    for (const animation of this._animations) {
      animation.resume();
    }
  }

  /**
   * Get active animations count
   */
  getAnimationCount(): number {
    return this._animations.length;
  }
}
