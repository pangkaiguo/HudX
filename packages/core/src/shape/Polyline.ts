/**
 * Polyline - Polyline shape element
 */

import HRElement from '../HRElement';
import { ElementOption, BoundingRect, Point } from '../types';

export interface PolylineShape {
  points: Point[] | number[][];
}

export default class Polyline extends HRElement {
  shape: PolylineShape;

  constructor(opts: ElementOption & { shape: PolylineShape } = { shape: { points: [] } }) {
    super(opts);
    this.shape = opts.shape || { points: [] };
  }

  getBoundingRect(): BoundingRect {
    const points = this._normalizePoints();
    if (points.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
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

  private _normalizePoints(): Point[] {
    const points = this.shape.points;
    if (!points || points.length === 0) return [];
    
    if (Array.isArray(points[0])) {
      return (points as number[][]).map(p => ({ x: p[0], y: p[1] }));
    }
    return points as Point[];
  }

  contain(x: number, y: number): boolean {
    const points = this._normalizePoints();
    if (points.length < 2) {
      return false;
    }

    const lineWidth = this.style.lineWidth || 1;
    const threshold = lineWidth / 2;

    // Check distance to each line segment
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length2 = dx * dx + dy * dy;

      if (length2 === 0) {
        continue;
      }

      const t = Math.max(0, Math.min(1, ((x - p1.x) * dx + (y - p1.y) * dy) / length2));
      const projX = p1.x + t * dx;
      const projY = p1.y + t * dy;
      const dist2 = (x - projX) * (x - projX) + (y - projY) * (y - projY);

      if (dist2 <= threshold * threshold) {
        return true;
      }
    }

    return false;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const points = this._normalizePoints();
    if (this.invisible || points.length < 2) {
      return;
    }

    ctx.save();
    this.applyTransform(ctx);
    this.applyStyle(ctx);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}

