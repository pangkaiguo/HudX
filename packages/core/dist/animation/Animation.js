/**
 * Animation - Animation system with ECharts-like easing functions
 */
export const Easing = {
    linear: (t) => t,
    quadraticIn: (t) => t * t,
    quadraticOut: (t) => t * (2 - t),
    quadraticInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    cubicIn: (t) => t * t * t,
    cubicOut: (t) => (t -= 1) * t * t + 1,
    cubicInOut: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    quarticIn: (t) => t * t * t * t,
    quarticOut: (t) => 1 - (t -= 1) * t * t * t,
    quarticInOut: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t -= 1) * t * t * t,
    quinticIn: (t) => t * t * t * t * t,
    quinticOut: (t) => 1 + (t -= 1) * t * t * t * t,
    quinticInOut: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t -= 1) * t * t * t * t,
    sinusoidalIn: (t) => 1 - Math.cos((t * Math.PI) / 2),
    sinusoidalOut: (t) => Math.sin((t * Math.PI) / 2),
    sinusoidalInOut: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    exponentialIn: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    exponentialOut: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    exponentialInOut: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
    circularIn: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    circularOut: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    circularInOut: (t) => t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
    elasticIn: (t) => {
        if (t === 0 || t === 1)
            return t;
        const p = 0.3;
        const s = p / 4;
        return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s) * (2 * Math.PI) / p);
    },
    elasticOut: (t) => {
        if (t === 0 || t === 1)
            return t;
        const p = 0.3;
        const s = p / 4;
        return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },
    elasticInOut: (t) => {
        if (t === 0 || t === 1)
            return t;
        const p = 0.3 * 1.5;
        const s = p / 4;
        return t < 0.5 ? -Math.pow(2, 20 * t - 10) * Math.sin((2 * t - 1 - s) * (2 * Math.PI) / p) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((2 * t - 1 - s) * (2 * Math.PI) / p) / 2 + 1;
    },
    backIn: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
    },
    backOut: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    backInOut: (t) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5 ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    },
    bounceOut: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1)
            return n1 * t * t;
        if (t < 2 / d1)
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1)
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
};
export default class Animation {
    constructor(target, property, endValue, duration = 1000, delay = 0, easing = 'linear', onUpdate, onComplete) {
        this._startTime = 0;
        this._paused = false;
        this._pausedTime = 0;
        this._animate = () => {
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
            }
            else {
                this._animationFrameId = undefined;
                if (this._onUpdate) {
                    this._onUpdate(this._target, 1);
                }
                if (this._onComplete) {
                    this._onComplete();
                }
            }
        };
        this._target = target;
        this._property = property;
        this._startValue = this._getValue(target, property);
        this._endValue = endValue;
        this._duration = duration;
        this._delay = delay;
        this._easing = typeof easing === 'string' ? Easing[easing] || Easing.linear : easing;
        this._onUpdate = onUpdate;
        this._onComplete = onComplete;
    }
    start() {
        if (this._animationFrameId !== undefined) {
            return this;
        }
        this._startTime = performance.now() + this._delay;
        this._paused = false;
        this._pausedTime = 0;
        this._animate();
        return this;
    }
    stop() {
        if (this._animationFrameId !== undefined) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
        return this;
    }
    pause() {
        if (!this._paused && this._animationFrameId !== undefined) {
            this._paused = true;
            this._pausedTime = performance.now();
        }
        return this;
    }
    resume() {
        if (this._paused && this._animationFrameId !== undefined) {
            const pauseDuration = performance.now() - this._pausedTime;
            this._startTime += pauseDuration;
            this._paused = false;
        }
        return this;
    }
    _getValue(target, property) {
        const parts = property.split('.');
        let value = target;
        for (const part of parts) {
            if (typeof value === 'object' && value !== null) {
                value = value[part];
            }
            else {
                return 0;
            }
        }
        return typeof value === 'number' ? value : 0;
    }
    _setValue(target, property, value) {
        const parts = property.split('.');
        let obj = target;
        for (let i = 0; i < parts.length - 1; i++) {
            if (obj[parts[i]] === undefined) {
                obj[parts[i]] = {};
            }
            const next = obj[parts[i]];
            if (typeof next === 'object' && next !== null) {
                obj = next;
            }
            else {
                return;
            }
        }
        obj[parts[parts.length - 1]] = value;
    }
}
