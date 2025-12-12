/**
 * Animation - Animation system with ECharts-like easing functions
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
    quarticIn: (t: number) => number;
    quarticOut: (t: number) => number;
    quarticInOut: (t: number) => number;
    quinticIn: (t: number) => number;
    quinticOut: (t: number) => number;
    quinticInOut: (t: number) => number;
    sinusoidalIn: (t: number) => number;
    sinusoidalOut: (t: number) => number;
    sinusoidalInOut: (t: number) => number;
    exponentialIn: (t: number) => number;
    exponentialOut: (t: number) => number;
    exponentialInOut: (t: number) => number;
    circularIn: (t: number) => number;
    circularOut: (t: number) => number;
    circularInOut: (t: number) => number;
    elasticIn: (t: number) => number;
    elasticOut: (t: number) => number;
    elasticInOut: (t: number) => number;
    backIn: (t: number) => number;
    backOut: (t: number) => number;
    backInOut: (t: number) => number;
    bounceOut: (t: number) => number;
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
    constructor(target: Record<string, unknown>, property: string, endValue: number, duration?: number, delay?: number, easing?: string | EasingFunction, onUpdate?: (target: Record<string, unknown>, percent: number) => void, onComplete?: () => void);
    start(): this;
    stop(): this;
    pause(): this;
    resume(): this;
    private _animate;
    private _getValue;
    private _setValue;
}
