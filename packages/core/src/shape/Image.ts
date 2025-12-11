/**
 * Image - Image shape element
 */

import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';

export interface ImageShape {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
  sx?: number; // Source x
  sy?: number; // Source y
  sWidth?: number; // Source width
  sHeight?: number; // Source height
}

export default class Image extends Element {
  shape: ImageShape;

  constructor(opts: ElementOption & { shape: ImageShape }) {
    super(opts);
    this.shape = opts.shape;
  }

  getBoundingRect(): BoundingRect {
    const shape = this.shape;
    return {
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };
  }

  contain(x: number, y: number): boolean {
    const shape = this.shape;
    return x >= shape.x && x <= shape.x + shape.width &&
           y >= shape.y && y <= shape.y + shape.height;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.invisible) {
      return;
    }

    ctx.save();
    this.applyTransform(ctx);
    this.applyStyle(ctx);

    const shape = this.shape;

    if (shape.sx !== undefined && shape.sy !== undefined && 
        shape.sWidth !== undefined && shape.sHeight !== undefined) {
      // Draw image with source rectangle
      ctx.drawImage(
        shape.image,
        shape.sx, shape.sy, shape.sWidth, shape.sHeight,
        shape.x, shape.y, shape.width, shape.height
      );
    } else {
      // Draw full image
      ctx.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
    }

    ctx.restore();
  }
}

