/**
 * Element - Base class for all graphical elements
 */
import Eventful from './mixin/Eventful';
import { ElementOption, Style, Transform, BoundingRect } from './types';
declare class Element extends Eventful {
    id: string;
    zlevel: number;
    z: number;
    silent: boolean;
    invisible: boolean;
    cursor: string;
    draggable: boolean;
    progressive: boolean;
    style: Style;
    shape: unknown;
    transform: Transform;
    private _dirty;
    private _clipPath?;
    constructor(opts?: ElementOption);
    attr(key: string | Record<string, unknown> | Record<string, any>, value?: unknown): any;
    private _setAttr;
    markRedraw(): void;
    isDirty(): boolean;
    clearDirty(): void;
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
    protected applyTransform(ctx: CanvasRenderingContext2D): void;
    protected applyStyle(ctx: CanvasRenderingContext2D): void;
    getClipPath(): Element | undefined;
    setClipPath(clipPath?: Element): this;
    private _generateId;
}
export default Element;
