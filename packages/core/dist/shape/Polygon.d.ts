/**
 * Polygon - Polygon shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect, Point } from '../types';
export interface PolygonShape {
    points: Point[];
}
export default class Polygon extends Element {
    shape: PolygonShape;
    constructor(opts?: ElementOption & {
        shape: PolygonShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
