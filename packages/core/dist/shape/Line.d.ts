/**
 * Line - Line shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';
export interface LineShape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export default class Line extends Element {
    shape: LineShape;
    constructor(opts?: ElementOption & {
        shape: LineShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=Line.d.ts.map