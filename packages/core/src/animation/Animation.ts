/**
 * Animation - Animation system
 */

import { AnimationOption } from '../types';

export type EasingFunction = (t: number) => number;

export const Easing = {
  linear: (t: number) => t,
  quadraticIn: (t: number) => t * t,
  quadraticOut: (t: number) => t * (2 - t),
  quadraticInOut: (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  cubicIn: (t: number) => t * t * t,
  cubicOut: (t: number) => {
    t -= 1;
    return t * t * t + 1;
  },
  cubicInOut: (t: number) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  elasticIn: (t: number) => {
    if (t === 0 || t === 1) return t;
    const p = 0.3;
    const s = p / 4;
    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s) * (2 * Math.PI) / p);
  },
  elasticOut: (t: number) => {
    if (t === 0 || t === 1) return t;
    const p = 0.3;
    const s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  },
};

export default class Animation {
  private _target: any;
  private _property: string;
  private _startValue: number;
  private _endValue: number;
  private _duration: number;
  private _delay: number;
  private _easing: EasingFunction;
  private _onUpdate?: (target: any, percent: number) => void;
  private _onComplete?: () => void;

  private _startTime: number = 0;
  private _paused: boolean = false;
  private _pausedTime: number = 0;
  private _animationFrameId?: number;

  constructor(
    target: any,
    property: string,
    endValue: number,
    duration: number = 1000,
    delay: number = 0,
    easing: string | EasingFunction = 'linear',
    onUpdate?: (target: any, percent: number) => void,
    onComplete?: () => void
  ) {
    this._target = target;
    this._property = property;
    this._startValue = this._getValue(target, property);
    this._endValue = endValue;
    this._duration = duration;
    this._delay = delay;
    this._easing = typeof easing === 'string' ? (Easing as any)[easing] || Easing.linear : easing;
    this._onUpdate = onUpdate;
    this._onComplete = onComplete;
  }

  /**
   * Start animation
   */
  start(): this {
    if (this._animationFrameId !== undefined) {
      return this;
    }

    this._startTime = performance.now() + this._delay;
    this._paused = false;
    this._pausedTime = 0;
    this._animate();

    return this;
  }

  /**
   * Stop animation
   */
  stop(): this {
    if (this._animationFrameId !== undefined) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
    return this;
  }

  /**
   * Pause animation
   */
  pause(): this {
    if (!this._paused && this._animationFrameId !== undefined) {
      this._paused = true;
      this._pausedTime = performance.now();
    }
    return this;
  }

  /**
   * Resume animation
   */
  resume(): this {
    if (this._paused && this._animationFrameId !== undefined) {
      const pauseDuration = performance.now() - this._pausedTime;
      this._startTime += pauseDuration;
      this._paused = false;
    }
    return this;
  }

  /**
   * Animation loop
   */
  private _animate = (): void => {
    const now = performance.now();
    const elapsed = now - this._startTime;

    if (elapsed < 0) {
      // Still in delay period
      this._animationFrameId = requestAnimationFrame(this._animate);
      return;
    }

    const progress = Math.min(elapsed / this._duration, 1);
    const easedProgress = this._easing(progress);
    const currentValue = this._startValue + (this._endValue - this._startValue) * easedProgress;

    this._setValue(this._target, this._property, currentValue);

    if (this._onUpdate) {
      this._onUpdate(this._target, progress);
    }

    if (progress < 1) {
      this._animationFrameId = requestAnimationFrame(this._animate);
    } else {
      this._animationFrameId = undefined;
      if (this._onComplete) {
        this._onComplete();
      }
    }
  };

  /**
   * Get value from target
   */
  private _getValue(target: any, property: string): number {
    const parts = property.split('.');
    let value: any = target;
    for (const part of parts) {
      value = value[part];
      if (value === undefined) {
        return 0;
      }
    }
    return typeof value === 'number' ? value : 0;
  }

  /**
   * Set value to target
   */
  private _setValue(target: any, property: string, value: number): void {
    const parts = property.split('.');
    let obj: any = target;
    for (let i = 0; i < parts.length - 1; i++) {
      if (obj[parts[i]] === undefined) {
        obj[parts[i]] = {};
      }
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  }
}

