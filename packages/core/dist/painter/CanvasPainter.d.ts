/**
 * CanvasPainter - Canvas rendering implementation
 */
import Storage from '../Storage';
import IPainter from './IPainter';
export default class CanvasPainter implements IPainter {
    private _dom;
    private _canvas;
    private _ctx;
    private _width;
    private _height;
    private _storage;
    private _dirty;
    private _animationFrameId?;
    constructor(dom: HTMLElement, storage: Storage);
    /**
     * Resize canvas
     */
    resize(width?: number, height?: number): void;
    /**
     * Get canvas element
     */
    getCanvas(): HTMLCanvasElement;
    /**
     * Get rendering context
     */
    getContext(): CanvasRenderingContext2D;
    /**
     * Get width
     */
    getWidth(): number;
    /**
     * Get height
     */
    getHeight(): number;
    /**
     * Mark as dirty (needs repaint)
     */
    markDirty(): void;
    /**
     * Paint all elements
     */
    paint(): void;
    /**
     * Request paint (using requestAnimationFrame for performance)
     */
    private _requestPaint;
    /**
     * Initialize resize observer
     */
    private _initEvent;
    /**
     * Handle resize
     */
    private _resize;
    /**
     * Dispose painter
     */
    dispose(): void;
}
