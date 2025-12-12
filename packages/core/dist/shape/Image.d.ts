/**
 * Image - Image shape element
 */
import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';
export interface ImageShape {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
    sx?: number;
    sy?: number;
    sWidth?: number;
    sHeight?: number;
}
export default class Image extends HRElement {
    shape: ImageShape;
    constructor(opts: ElementOption & {
        shape: ImageShape;
    });
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    render(ctx: CanvasRenderingContext2D): void;
}
