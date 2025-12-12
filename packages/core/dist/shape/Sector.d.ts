/**
 * Sector - Sector shape element (pie slice)
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';
export interface SectorShape {
    cx: number;
    cy: number;
    r0: number;
    r: number;
    startAngle: number;
    endAngle: number;
    anticlockwise?: boolean;
}
export default class Sector extends HRElement {
    shape: SectorShape;
    constructor(opts: ElementOption & {
        shape: SectorShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
