/**
 * Polygon - Polygon shape element
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect, Point } from '../types';
export interface PolygonShape {
    points: Point[] | number[][];
}
export default class Polygon extends HRElement {
    shape: PolygonShape;
    constructor(opts?: ElementOption & {
        shape: PolygonShape;
    });
    private _normalizePoints;
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
