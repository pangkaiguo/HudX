/**
 * BezierCurve - Bezier curve shape element
 */

import HRElement from '../HRElement';
import { ElementOption, BoundingRect, Point } from '../types';

export interface BezierCurveShape {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cpx1: number;
  cpy1: number;
  cpx2?: number;
  cpy2?: number;
}

export default class BezierCurve extends HRElement {
  shape: BezierCurveShape;

  constructor(opts: ElementOption & { shape: BezierCurveShape }) {
    super(opts);
    this.shape = opts.shape;
  }

  getBoundingRect(): BoundingRect {
    const shape = this.shape;
    const points: Point[] = [
      { x: shape.x1, y: shape.y1 },
      { x: shape.x2, y: shape.y2 },
      { x: shape.cpx1, y: shape.cpy1 },
    ];

    if (shape.cpx2 !== undefined && shape.cpy2 !== undefined) {
      points.push({ x: shape.cpx2, y: shape.cpy2 });
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const point of points) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }

    const lineWidth = this.style.lineWidth || 1;
    return {
      x: minX - lineWidth / 2,
      y: minY - lineWidth / 2,
      width: maxX - minX + lineWidth,
      height: maxY - minY + lineWidth,
    };
  }

  contain(x: number, y: number): boolean {
    // For bezier curves, checking if a point is on the curve is complex
    // We'll use a simplified approach: check distance to curve at multiple points
    const shape = this.shape;
    const lineWidth = this.style.lineWidth || 1;
    const threshold = lineWidth / 2;

    // Sample points along the curve
    for (let t = 0; t <= 1; t += 0.01) {
      let px: number, py: number;
      
      if (shape.cpx2 !== undefined && shape.cpy2 !== undefined) {
        // Cubic bezier
        const t2 = t * t;
        const t3 = t2 * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;

        px = mt3 * shape.x1 + 3 * mt2 * t * shape.cpx1 + 3 * mt * t2 * shape.cpx2 + t3 * shape.x2;
        py = mt3 * shape.y1 + 3 * mt2 * t * shape.cpy1 + 3 * mt * t2 * shape.cpy2 + t3 * shape.y2;
      } else {
        // Quadratic bezier
        const t2 = t * t;
        const mt = 1 - t;
        const mt2 = mt * mt;

        px = mt2 * shape.x1 + 2 * mt * t * shape.cpx1 + t2 * shape.x2;
        py = mt2 * shape.y1 + 2 * mt * t * shape.cpy1 + t2 * shape.y2;
      }

      const dx = x - px;
      const dy = y - py;
      const dist2 = dx * dx + dy * dy;

      if (dist2 <= threshold * threshold) {
        return true;
      }
    }

    return false;
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

    if (shape.cpx2 !== undefined && shape.cpy2 !== undefined) {
      // Cubic bezier
      ctx.bezierCurveTo(shape.cpx1, shape.cpy1, shape.cpx2, shape.cpy2, shape.x2, shape.y2);
    } else {
      // Quadratic bezier
      ctx.quadraticCurveTo(shape.cpx1, shape.cpy1, shape.x2, shape.y2);
    }

    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}

