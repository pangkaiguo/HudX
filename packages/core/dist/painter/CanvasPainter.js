/**
 * CanvasPainter - Canvas rendering implementation
 */
export default class CanvasPainter {
    constructor(dom, storage) {
        this._width = 0;
        this._height = 0;
        this._dirty = true;
        this._dom = dom;
        this._storage = storage;
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        if (!this._ctx) {
            throw new Error('Canvas 2D context is not supported');
        }
        this._dom.appendChild(this._canvas);
        this.resize();
        this._initEvent();
    }
    /**
     * Resize canvas
     */
    resize(width, height) {
        const dpr = window.devicePixelRatio || 1;
        const rect = this._dom.getBoundingClientRect();
        this._width = width ?? rect.width;
        this._height = height ?? rect.height;
        // Set canvas size considering device pixel ratio for crisp rendering
        this._canvas.width = this._width * dpr;
        this._canvas.height = this._height * dpr;
        this._canvas.style.width = `${this._width}px`;
        this._canvas.style.height = `${this._height}px`;
        // Reset transform and scale context to match device pixel ratio
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.scale(dpr, dpr);
        this.markDirty();
    }
    /**
     * Get canvas element
     */
    getCanvas() {
        return this._canvas;
    }
    /**
     * Get rendering context
     */
    getContext() {
        return this._ctx;
    }
    /**
     * Get width
     */
    getWidth() {
        return this._width;
    }
    /**
     * Get height
     */
    getHeight() {
        return this._height;
    }
    /**
     * Mark as dirty (needs repaint)
     */
    markDirty() {
        if (!this._dirty) {
            this._dirty = true;
            this._requestPaint();
        }
    }
    /**
     * Paint all elements
     */
    paint() {
        if (!this._dirty) {
            return;
        }
        // Get all elements sorted by zlevel and z
        const elements = this._storage.getElementsList();
        // Check if any element is dirty
        const hasDirtyElements = elements.some(el => el.isDirty());
        if (!hasDirtyElements && !this._dirty) {
            return;
        }
        // Clear canvas only once
        this._ctx.clearRect(0, 0, this._width, this._height);
        // Render each element (batch rendering)
        for (let i = 0, len = elements.length; i < len; i++) {
            const element = elements[i];
            if (!element.invisible) {
                this._ctx.save();
                element.render(this._ctx);
                element.clearDirty();
                this._ctx.restore();
            }
        }
        this._dirty = false;
    }
    /**
     * Request paint (using requestAnimationFrame for performance)
     */
    _requestPaint() {
        if (this._animationFrameId !== undefined) {
            return;
        }
        this._animationFrameId = requestAnimationFrame(() => {
            this._animationFrameId = undefined;
            this.paint();
        });
    }
    /**
     * Initialize resize observer
     */
    _initEvent() {
        // Disable auto-resize to prevent infinite loop
    }
    /**
     * Handle resize
     */
    _resize() {
        // Disabled
    }
    /**
     * Dispose painter
     */
    dispose() {
        if (this._animationFrameId !== undefined) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
        if (this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    }
}
