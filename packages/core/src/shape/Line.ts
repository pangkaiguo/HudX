/**
 * Line - Line shape element
 */

import ChartElement from '../ChartElement';
import type { ElementOption, BoundingRect, Point } from '../types';

export interface LineShape {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default class Line extends ChartElement {
  shape: LineShape;

  constructor(opts: ElementOption & { shape: LineShape } = { shape: { x1: 0, y1: 0, x2: 0, y2: 0 } }) {
    super(opts);
    this.shape = opts.shape || { x1: 0, y1: 0, x2: 0, y2: 0 };
  }

  getBoundingRect(): BoundingRect {
    const shape = this.shape;
    const minX = Math.min(shape.x1, shape.x2);
    const minY = Math.min(shape.y1, shape.y2);
    const maxX = Math.max(shape.x1, shape.x2);
    const maxY = Math.max(shape.y1, shape.y2);
    const lineWidth = this.style.lineWidth || 1;

    return {
      x: minX - lineWidth / 2,
      y: minY - lineWidth / 2,
      width: maxX - minX + lineWidth,
      height: maxY - minY + lineWidth,
    };
  }

  contain(x: number, y: number): boolean {
    const shape = this.shape;
    const lineWidth = this.style.lineWidth || 1;
    const threshold = lineWidth / 2;

    // Calculate distance from point to line segment
    const dx = shape.x2 - shape.x1;
    const dy = shape.y2 - shape.y1;
    const length2 = dx * dx + dy * dy;

    if (length2 === 0) {
      return false;
    }

    const t = Math.max(0, Math.min(1, ((x - shape.x1) * dx + (y - shape.y1) * dy) / length2));
    const projX = shape.x1 + t * dx;
    const projY = shape.y1 + t * dy;
    const dist2 = (x - projX) * (x - projX) + (y - projY) * (y - projY);

    return dist2 <= threshold * threshold;
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
    ctx.moveTo(shape.x1, shape.y1);
    ctx.lineTo(shape.x2, shape.y2);

    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}

