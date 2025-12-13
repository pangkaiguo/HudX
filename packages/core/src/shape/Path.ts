/**
 * Path - Path shape element (SVG-like path commands)
 */

import ChartElement from '../ChartElement';
import type { ElementOption, BoundingRect } from '../types';

export interface PathShape {
  d: string; // Path data string (SVG path format)
  path?: Path2D; // Cached Path2D object
}

export default class Path extends ChartElement {
  shape: PathShape;

  constructor(opts: ElementOption & { shape: PathShape } = { shape: { d: '' } }) {
    super(opts);
    this.shape = opts.shape || { d: '' };
  }

  getBoundingRect(): BoundingRect {
    if (!this.shape.d) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    try {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', this.shape.d);
      
      // Note: getBBox might return 0 if not attached to DOM in some environments
      // but it's the most reliable way without writing a full path parser
      // We can append to a hidden SVG if needed, but let's try direct call first
      // or check if we can approximate from points if provided
      
      // If we are in a browser environment where we can't get BBox easily without DOM,
      // we might need a backup. For now, we assume this works or returns 0.
      
      // To ensure it works, we might need to append to a hidden SVG
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.position = 'absolute';
      svg.style.visibility = 'hidden';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.appendChild(path);
      document.body.appendChild(svg);
      
      const bbox = path.getBBox();
      
      document.body.removeChild(svg);
      
      return {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height
      };
    } catch (e) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
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

    // Use a temporary canvas for checking
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    
    return ctx.isPointInPath(path2d, x, y);
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

