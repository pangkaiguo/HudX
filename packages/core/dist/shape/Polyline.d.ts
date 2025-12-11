/**
 * Polyline - Polyline shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect, Point } from '../types';
export interface PolylineShape {
    points: Point[] | number[][];
}
export default class Polyline extends Element {
    shape: PolylineShape;
    constructor(opts?: ElementOption & {
        shape: PolylineShape;
    });
    getBoundingRect(): BoundingRect;
    private _normalizePoints;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
