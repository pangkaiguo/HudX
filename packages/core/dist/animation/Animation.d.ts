/**
 * Animation - Animation system
 */
export type EasingFunction = (t: number) => number;
export declare const Easing: {
    linear: (t: number) => number;
    quadraticIn: (t: number) => number;
    quadraticOut: (t: number) => number;
    quadraticInOut: (t: number) => number;
    cubicIn: (t: number) => number;
    cubicOut: (t: number) => number;
    cubicInOut: (t: number) => number;
    elasticIn: (t: number) => number;
    elasticOut: (t: number) => number;
};
export default class Animation {
    private _target;
    private _property;
    private _startValue;
    private _endValue;
    private _duration;
    private _delay;
    private _easing;
    private _onUpdate?;
    private _onComplete?;
    private _startTime;
    private _paused;
    private _pausedTime;
    private _animationFrameId?;
    constructor(target: any, property: string, endValue: number, duration?: number, delay?: number, easing?: string | EasingFunction, onUpdate?: (target: any, percent: number) => void, onComplete?: () => void);
    /**
     * Start animation
     */
    start(): this;
    /**
     * Stop animation
     */
    stop(): this;
    /**
     * Pause animation
     */
    pause(): this;
    /**
     * Resume animation
     */
    resume(): this;
    /**
     * Animation loop
     */
    private _animate;
    /**
     * Get value from target
     */
    private _getValue;
    /**
     * Set value to target
     */
    private _setValue;
}
//# sourceMappingURL=Animation.d.ts.map