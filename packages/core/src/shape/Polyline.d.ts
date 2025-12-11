/**
 * Polyline - Polyline shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect, Point } from '../types';
export interface PolylineShape {
    points: Point[];
}
export default class Polyline extends Element {
    shape: PolylineShape;
    constructor(opts?: ElementOption & {
        shape: PolylineShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=Polyline.d.ts.map