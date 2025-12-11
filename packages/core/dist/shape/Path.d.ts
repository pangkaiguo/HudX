/**
 * Path - Path shape element (SVG-like path commands)
 */
import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';
export interface PathShape {
    d: string;
    path?: Path2D;
}
export default class Path extends Element {
    shape: PathShape;
    constructor(opts?: ElementOption & {
        shape: PathShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
