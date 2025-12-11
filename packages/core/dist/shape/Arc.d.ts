/**
 * Arc - Arc shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';
export interface ArcShape {
    cx: number;
    cy: number;
    r: number;
    startAngle: number;
    endAngle: number;
    anticlockwise?: boolean;
}
export default class Arc extends Element {
    shape: ArcShape;
    constructor(opts: ElementOption & {
        shape: ArcShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=Arc.d.ts.map