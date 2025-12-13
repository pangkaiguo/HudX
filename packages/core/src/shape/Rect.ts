/**
 * Rect - Rectangle shape element
 */

import ChartElement from '../ChartElement';
import type { ElementOption, BoundingRect } from '../types';

export interface RectShape {
  x: number;
  y: number;
  width: number;
  height: number;
  r?: number; // border radius
}

export default class Rect extends ChartElement {
  shape: RectShape;

  constructor(opts: ElementOption & { shape: RectShape } = { shape: { x: 0, y: 0, width: 0, height: 0 } }) {
    super(opts);
    this.shape = opts.shape || { x: 0, y: 0, width: 0, height: 0 };
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
    ctx.beginPath();

    if (shape.r && shape.r > 0) {
      // Rounded rectangle
      const x = shape.x;
      const y = shape.y;
      const w = shape.width;
      const h = shape.height;
      const r = Math.min(shape.r, w / 2, h / 2);

      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
      ctx.lineTo(x + w, y + h - r);
      ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
      ctx.lineTo(x + r, y + h);
      ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
      ctx.lineTo(x, y + r);
      ctx.arc(x + r, y + r, r, Math.PI, -Math.PI / 2, false);
      ctx.closePath();
    } else {
      ctx.rect(shape.x, shape.y, shape.width, shape.height);
    }

    if (this.style.fill) {
      ctx.fill();
    }
    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}

