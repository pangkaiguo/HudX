/**
 * Circle - Circle shape element
 */

import Element from '../Element';
import { ElementOption, BoundingRect } from '../types';

export interface CircleShape {
  cx: number;
  cy: number;
  r: number;
}

export default class Circle extends Element {
  shape: CircleShape;

  constructor(opts: ElementOption & { shape: CircleShape } = { shape: { cx: 0, cy: 0, r: 0 } }) {
    super(opts);
    this.shape = opts.shape || { cx: 0, cy: 0, r: 0 };
  }

  getBoundingRect(): BoundingRect {
    const shape = this.shape;
    return {
      x: shape.cx - shape.r,
      y: shape.cy - shape.r,
      width: shape.r * 2,
      height: shape.r * 2,
    };
  }

  contain(x: number, y: number): boolean {
    const shape = this.shape;
    const dx = x - shape.cx;
    const dy = y - shape.cy;
    return dx * dx + dy * dy <= shape.r * shape.r;
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
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, false);

    if (this.style.fill) {
      ctx.fill();
    }
    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}

