/**
 * Circle - Circle shape element
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';
export interface CircleShape {
    cx: number;
    cy: number;
    r: number;
}
export default class Circle extends HRElement {
    shape: CircleShape;
    constructor(opts?: ElementOption & {
        shape: CircleShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
