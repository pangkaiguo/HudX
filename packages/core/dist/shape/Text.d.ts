/**
 * Text - Text shape element
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';
export interface TextShape {
    x: number;
    y: number;
    text: string;
}
export default class Text extends HRElement {
    shape: TextShape;
    constructor(opts?: ElementOption & {
        shape: TextShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
