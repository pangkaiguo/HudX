/**
 * BezierCurve - Bezier curve shape element
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';
export interface BezierCurveShape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cpx1: number;
    cpy1: number;
    cpx2?: number;
    cpy2?: number;
}
export default class BezierCurve extends HRElement {
    shape: BezierCurveShape;
    constructor(opts: ElementOption & {
        shape: BezierCurveShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
