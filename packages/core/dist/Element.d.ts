/**
 * Element - Base class for all graphical elements
 * Similar to hrender's Element class
 */
import Eventful from './mixin/Eventful';
import { ElementOption, Style, Transform, BoundingRect } from './types';
export default class Element extends Eventful {
    id: string;
    zlevel: number;
    z: number;
    silent: boolean;
    invisible: boolean;
    cursor: string;
    draggable: boolean;
    progressive: boolean;
    style: Style;
    shape: Record<string, any>;
    transform: Transform;
    private _dirty;
    private _clipPath?;
    constructor(opts?: ElementOption);
    /**
     * Update element attributes (setter)
     */
    attr(key: string | Record<string, any>, value?: any): this;
    /**
     * Get element attribute (getter)
     */
    attr(key: string): any;
    private _setAttr;
    /**
     * Mark element as dirty (needs redraw)
     */
    markRedraw(): void;
    /**
     * Check if element is dirty
     */
    isDirty(): boolean;
    /**
     * Clear dirty flag
     */
    clearDirty(): void;
    /**
     * Get bounding rect (to be implemented by subclasses)
     */
    getBoundingRect(): BoundingRect;
    /**
     * Check if point is inside element
     */
    contain(x: number, y: number): boolean;
    /**
     * Render element (to be implemented by subclasses)
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * Apply transform to context
     */
    protected applyTransform(ctx: CanvasRenderingContext2D): void;
    /**
     * Apply style to context
     */
    protected applyStyle(ctx: CanvasRenderingContext2D): void;
    /**
     * Get clip path
     */
    getClipPath(): Element | undefined;
    /**
     * Set clip path
     */
    setClipPath(clipPath?: Element): this;
    /**
     * Generate unique ID
     */
    private _generateId;
}
