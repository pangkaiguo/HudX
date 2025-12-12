/**
 * Polygon - Polygon shape element
 */

import ChartElement from '../ChartElement';
import { ElementOption, BoundingRect, Point } from '../types';

export interface PolygonShape {
  points: Point[] | number[][];
}

export default class Polygon extends ChartElement {
  shape: PolygonShape;

  constructor(opts: ElementOption & { shape: PolygonShape } = { shape: { points: [] } }) {
    super(opts);
    this.shape = opts.shape || { points: [] };
  }

  private _normalizePoints(): Point[] {
    const points = this.shape.points;
    if (!points || points.length === 0) return [];

    if (Array.isArray(points[0])) {
      return (points as number[][]).map(p => ({ x: p[0], y: p[1] }));
    }
    return points as Point[];
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

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  contain(x: number, y: number): boolean {
    const points = this._normalizePoints();
    if (points.length < 3) {
      return false;
    }

    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x;
      const yi = points[i].y;
      const xj = points[j].x;
      const yj = points[j].y;

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const points = this._normalizePoints();
    if (this.invisible || points.length === 0) {
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
    ctx.closePath();

    if (this.style.fill) {
      ctx.fill();
    }
    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
}
