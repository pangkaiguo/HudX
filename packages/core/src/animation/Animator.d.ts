/**
 * Animator - Manages multiple animations
 */
import Animation, { EasingFunction } from './Animation';
export interface AnimatorOption {
    duration?: number;
    delay?: number;
    easing?: string | EasingFunction;
    onUpdate?: (target: any, percent: number) => void;
    onComplete?: () => void;
}
export default class Animator {
    private _animations;
    /**
     * Animate target property
     */
    animate(target: any, property: string, endValue: number, options?: AnimatorOption): Animation;
    /**
     * Stop all animations
     */
    stopAll(): void;
    /**
     * Pause all animations
     */
    pauseAll(): void;
    /**
     * Resume all animations
     */
    resumeAll(): void;
    /**
     * Get active animations count
     */
    getAnimationCount(): number;
}
//# sourceMappingURL=Animator.d.ts.map