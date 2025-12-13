/**
 * Animation - Animation system with ECharts-like easing functions
 */
export type EasingFunction = (t: number) => number;

export const Easing = {
  linear: (t: number) => t,
  quadraticIn: (t: number) => t * t,
  quadraticOut: (t: number) => t * (2 - t),
  quadraticInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  cubicIn: (t: number) => t * t * t,
  cubicOut: (t: number) => (t -= 1) * t * t + 1,
  cubicInOut: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  quarticIn: (t: number) => t * t * t * t,
  quarticOut: (t: number) => 1 - (t -= 1) * t * t * t,
  quarticInOut: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t -= 1) * t * t * t,
  quinticIn: (t: number) => t * t * t * t * t,
  quinticOut: (t: number) => 1 + (t -= 1) * t * t * t * t,
  quinticInOut: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t -= 1) * t * t * t * t,
  sinusoidalIn: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  sinusoidalOut: (t: number) => Math.sin((t * Math.PI) / 2),
  sinusoidalInOut: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  exponentialIn: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  exponentialOut: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  exponentialInOut: (t: number) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  circularIn: (t: number) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
  circularOut: (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)),
  circularInOut: (t: number) => t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
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
  elasticInOut: (t: number) => {
    if (t === 0 || t === 1) return t;
    const p = 0.3 * 1.5;
    const s = p / 4;
    return t < 0.5 ? -Math.pow(2, 20 * t - 10) * Math.sin((2 * t - 1 - s) * (2 * Math.PI) / p) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((2 * t - 1 - s) * (2 * Math.PI) / p) / 2 + 1;
  },
  backIn: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  backOut: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  backInOut: (t: number) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5 ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  bounceOut: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};

export default class Animation {
  private _target: Record<string, unknown>;
  private _property: string;
  private _startValue: number;
  private _endValue: number;
  private _duration: number;
  private _delay: number;
  private _easing: EasingFunction;
  private _onUpdate?: (target: Record<string, unknown>, percent: number) => void;
  private _onComplete?: () => void;

  private _startTime: number = 0;
  private _paused: boolean = false;
  private _pausedTime: number = 0;
  private _animationFrameId?: number;

  constructor(
    target: Record<string, unknown>,
    property: string,
    endValue: number,
    duration: number = 1000,
    delay: number = 0,
    easing: string | EasingFunction = 'linear',
    onUpdate?: (target: Record<string, unknown>, percent: number) => void,
    onComplete?: () => void
  ) {
    this._target = target;
    this._property = property;
    this._startValue = this._getValue(target, property);
    this._endValue = endValue;
    this._duration = duration;
    this._delay = delay;
    this._easing = typeof easing === 'string' ? (Easing as Record<string, unknown>)[easing] as EasingFunction || Easing.linear : easing;
    this._onUpdate = onUpdate;
    this._onComplete = onComplete;
  }

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

  stop(): this {
    if (this._animationFrameId !== undefined) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
    return this;
  }

  pause(): this {
    if (!this._paused && this._animationFrameId !== undefined) {
      this._paused = true;
      this._pausedTime = performance.now();
    }
    return this;
  }

  resume(): this {
    if (this._paused && this._animationFrameId !== undefined) {
      const pauseDuration = performance.now() - this._pausedTime;
      this._startTime += pauseDuration;
      this._paused = false;
    }
    return this;
  }

  private _animate = (): void => {
    if (this._paused) {
      this._animationFrameId = requestAnimationFrame(this._animate);
      return;
    }

    const now = performance.now();
    const elapsed = now - this._startTime;

    if (elapsed < 0) {
      this._animationFrameId = requestAnimationFrame(this._animate);
      return;
    }

    const progress = Math.min(elapsed / this._duration, 1);
    const easedProgress = this._easing(progress);
    const currentValue = this._startValue + (this._endValue - this._startValue) * easedProgress;

    this._setValue(this._target, this._property, currentValue);

    if (progress < 1) {
      this._animationFrameId = requestAnimationFrame(this._animate);
      if (this._onUpdate) {
        this._onUpdate(this._target, progress);
      }
    } else {
      this._animationFrameId = undefined;
      if (this._onUpdate) {
        this._onUpdate(this._target, 1);
      }
      if (this._onComplete) {
        this._onComplete();
      }
    }
  };

  private _getValue(target: Record<string, unknown>, property: string): number {
    const parts = property.split('.');
    let value: unknown = target;
    for (const part of parts) {
      if (typeof value === 'object' && value !== null) {
        value = (value as any)[part];
      } else {
        return 0;
      }
    }
    return typeof value === 'number' ? value : 0;
  }

  private _setValue(target: Record<string, unknown>, property: string, value: number): void {
    const parts = property.split('.');
    let obj: any = target;
    for (let i = 0; i < parts.length - 1; i++) {
      if (obj[parts[i]] === undefined) {
        obj[parts[i]] = {};
      }
      const next = obj[parts[i]];
      if (typeof next === 'object' && next !== null) {
        obj = next;
      } else {
        return;
      }
    }
    obj[parts[parts.length - 1]] = value;
  }
}
