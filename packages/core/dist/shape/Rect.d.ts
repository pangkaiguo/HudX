/**
 * Rect - Rectangle shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';
export interface RectShape {
    x: number;
    y: number;
    width: number;
    height: number;
    r?: number;
}
export default class Rect extends Element {
    shape: RectShape;
    constructor(opts?: ElementOption & {
        shape: RectShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=Rect.d.ts.map