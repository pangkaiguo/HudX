/**
 * SVGPainter - SVG rendering implementation
 */
import Storage from '../Storage';
import IPainter from './IPainter';
export default class SVGPainter implements IPainter {
    private _dom;
    private _svg;
    private _defs;
    private _rootGroup;
    private _width;
    private _height;
    private _storage;
    private _dirty;
    private _animationFrameId?;
    private _elementMap;
    constructor(dom: HTMLElement, storage: Storage);
    /**
     * Resize SVG
     */
    resize(width?: number, height?: number): void;
    /**
     * Get SVG element
     */
    getSVG(): SVGSVGElement;
    /**
     * Get root group
     */
    getRootGroup(): SVGGElement;
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
     * Render element to SVG
     */
    private _renderElement;
    /**
     * Create SVG shape element
     */
    private _createShapeElement;
    /**
     * Create SVG path for arc
     */
    private _createArcPath;
    /**
     * Create SVG path for sector
     */
    private _createSectorPath;
    /**
     * Create SVG path for bezier curve
     */
    private _createBezierPath;
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
     * Dispose SVG painter
     */
    dispose(): void;
}
//# sourceMappingURL=SVGPainter.d.ts.map