/**
 * Polyline - Polyline shape element
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect, Point } from '../types';
export interface PolylineShape {
    points: Point[] | number[][];
}
export default class Polyline extends HRElement {
    shape: PolylineShape;
    constructor(opts?: ElementOption & {
        shape: PolylineShape;
    });
    getBoundingRect(): BoundingRect;
    private _normalizePoints;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
