/**
 * Animation - Animation system
 */
export const Easing = {
    linear: (t) => t,
    quadraticIn: (t) => t * t,
    quadraticOut: (t) => t * (2 - t),
    quadraticInOut: (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    cubicIn: (t) => t * t * t,
    cubicOut: (t) => {
        t -= 1;
        return t * t * t + 1;
    },
    cubicInOut: (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
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
};
export default class Animation {
    constructor(target, property, endValue, duration = 1000, delay = 0, easing = 'linear', onUpdate, onComplete) {
        this._startTime = 0;
        this._paused = false;
        this._pausedTime = 0;
        /**
         * Animation loop
         */
        this._animate = () => {
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
            }
            else {
                this._animationFrameId = undefined;
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
    /**
     * Start animation
     */
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
    /**
     * Stop animation
     */
    stop() {
        if (this._animationFrameId !== undefined) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
        return this;
    }
    /**
     * Pause animation
     */
    pause() {
        if (!this._paused && this._animationFrameId !== undefined) {
            this._paused = true;
            this._pausedTime = performance.now();
        }
        return this;
    }
    /**
     * Resume animation
     */
    resume() {
        if (this._paused && this._animationFrameId !== undefined) {
            const pauseDuration = performance.now() - this._pausedTime;
            this._startTime += pauseDuration;
            this._paused = false;
        }
        return this;
    }
    /**
     * Get value from target
     */
    _getValue(target, property) {
        const parts = property.split('.');
        let value = target;
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
    _setValue(target, property, value) {
        const parts = property.split('.');
        let obj = target;
        for (let i = 0; i < parts.length - 1; i++) {
            if (obj[parts[i]] === undefined) {
                obj[parts[i]] = {};
            }
            obj = obj[parts[i]];
        }
        obj[parts[parts.length - 1]] = value;
    }
}
//# sourceMappingURL=Animation.js.map