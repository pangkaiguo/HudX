/**
 * Animator - Manages multiple animations
 */
import Animation from './Animation';
export default class Animator {
    constructor() {
        this._animations = [];
    }
    /**
     * Animate target property
     */
    animate(target, property, endValue, options = {}) {
        const animation = new Animation(target, property, endValue, options.duration, options.delay, options.easing, options.onUpdate, options.onComplete);
        this._animations.push(animation);
        animation.start();
        // Remove animation when complete
        const originalOnComplete = options.onComplete;
        options.onComplete = () => {
            const index = this._animations.indexOf(animation);
            if (index >= 0) {
                this._animations.splice(index, 1);
            }
            if (originalOnComplete) {
                originalOnComplete();
            }
        };
        return animation;
    }
    /**
     * Stop all animations
     */
    stopAll() {
        for (const animation of this._animations) {
            animation.stop();
        }
        this._animations = [];
    }
    /**
     * Pause all animations
     */
    pauseAll() {
        for (const animation of this._animations) {
            animation.pause();
        }
    }
    /**
     * Resume all animations
     */
    resumeAll() {
        for (const animation of this._animations) {
            animation.resume();
        }
    }
    /**
     * Get active animations count
     */
    getAnimationCount() {
        return this._animations.length;
    }
}
