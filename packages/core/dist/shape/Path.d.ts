/**
 * Path - Path shape element (SVG-like path commands)
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';
export interface PathShape {
    d: string;
    path?: Path2D;
}
export default class Path extends HRElement {
    shape: PathShape;
    constructor(opts?: ElementOption & {
        shape: PathShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
