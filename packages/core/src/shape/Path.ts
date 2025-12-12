/**
 * Path - Path shape element (SVG-like path commands)
 */

import HRElement from '../HRElement';
import { ElementOption, BoundingRect } from '../types';

export interface PathShape {
  d: string; // Path data string (SVG path format)
  path?: Path2D; // Cached Path2D object
}

export default class Path extends HRElement {
  shape: PathShape;

  constructor(opts: ElementOption & { shape: PathShape } = { shape: { d: '' } }) {
    super(opts);
    this.shape = opts.shape || { d: '' };
  }

  getBoundingRect(): BoundingRect {
    // For complex paths, we'd need to parse the path data
    // For now, return a default bounding rect
    // In production, you'd want to parse the path and calculate bounds
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  contain(x: number, y: number): boolean {
    if (!this.shape.d) {
      return false;
    }

    // Create or get cached Path2D
    let path2d = this.shape.path;
    if (!path2d) {
      try {
        path2d = new Path2D(this.shape.d);
        this.shape.path = path2d;
      } catch (e) {
        return false;
      }
    }

    // Check if point is in path
    const ctx = (this as any).__ctx; // Would need context reference
    // For now, return false - in production, you'd check with isPointInPath
    return false;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.invisible || !this.shape.d) {
      return;
    }

    ctx.save();
    this.applyTransform(ctx);
    this.applyStyle(ctx);

    // Create or get cached Path2D
    let path2d = this.shape.path;
    if (!path2d) {
      try {
        path2d = new Path2D(this.shape.d);
        this.shape.path = path2d;
      } catch (e) {
        console.error('Invalid path data:', this.shape.d);
        ctx.restore();
        return;
      }
    }

    if (this.style.fill) {
      ctx.fill(path2d);
    }
    if (this.style.stroke) {
      ctx.stroke(path2d);
    }

    ctx.restore();
  }
}

