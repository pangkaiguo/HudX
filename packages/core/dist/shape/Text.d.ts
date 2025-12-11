/**
 * Text - Text shape element
 */
import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';
export interface TextShape {
    x: number;
    y: number;
    text: string;
}
export default class Text extends Element {
    shape: TextShape;
    constructor(opts?: ElementOption & {
        shape: TextShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
