// @ts-nocheck
/**
 * ChartElement - Base class for all graphical elements (inspired by ZRender)
 */

import Eventful from './mixin/Eventful';
import type { ElementOption, Style, Transform, BoundingRect } from './types';
import {
  Matrix,
  createIdentityMatrix,
  translate,
  scale,
  rotate,
  multiplyMatrix,
  invertMatrix,
  applyMatrix
} from './util/matrix';

class ChartElement extends Eventful {
  id: string;
  zlevel: number = 0;
  z: number = 0;
  silent: boolean = false;
  invisible: boolean = false;
  cursor: string = 'default';
  draggable: boolean = false;
  progressive: boolean = false;

  style: Style = {};
  shape: unknown = {};
  transform: Transform = {};

  private _dirty: boolean = true;
  private _clipPath?: ChartElement;

  constructor(opts: ElementOption = {}) {
    super();
    this.id = opts.id || this._generateId();
    this.name = opts.name;
    this.data = opts.data;
    this.zlevel = opts.zlevel ?? 0;
    this.z = opts.z ?? 0;
    this.silent = opts.silent ?? false;
    this.invisible = opts.invisible ?? false;
    this.cursor = opts.cursor || 'default';
    this.draggable = opts.draggable ?? false;
    this.progressive = opts.progressive ?? false;

    if (opts.style) {
      this.style = { ...opts.style };
    }
    if (opts.shape) {
      this.shape = { ...opts.shape };
    }
    if (opts.transform) {
      this.transform = { ...opts.transform };
    }
    if (opts.clipPath) {
      this._clipPath = opts.clipPath as ChartElement;
    }
  }

  attr(key: string | Record<string, unknown> | Record<string, any>, value?: unknown): any {
    if (typeof key === 'string' && value === undefined && arguments.length === 1) {
      if (key === 'style') {
        return this.style;
      } else if (key === 'shape') {
        return this.shape;
      } else if (key === 'transform') {
        return this.transform;
      }
      return (this as Record<string, unknown>)[key];
    }

    if (typeof key === 'string') {
      this._setAttr(key, value);
    } else {
      for (const k in key) {
        this._setAttr(k, key[k]);
      }
    }
    this.markRedraw();
    return this as any;
  }

  private _setAttr(key: string, value: unknown): void {
    if (key === 'style' && typeof value === 'object' && value !== null) {
      this.style = { ...this.style, ...(value as Record<string, unknown>) };
    } else if (key === 'shape' && typeof value === 'object' && value !== null) {
      this.shape = { ...(this.shape as Record<string, unknown>), ...(value as Record<string, unknown>) };
    } else if (key === 'transform' && typeof value === 'object' && value !== null) {
      this.transform = { ...this.transform, ...(value as Record<string, unknown>) };
    } else if (key === 'invisible') {
      this.invisible = Boolean(value);
    } else {
      (this as Record<string, unknown>)[key] = value;
    }
  }

  markRedraw(): void {
    this._dirty = true;
    this.trigger('dirty');
    // Propagate dirty flag to parent
    const parent = (this as any).__parent;
    if (parent && parent.markRedraw) {
      parent.markRedraw();
    }
  }

  isDirty(): boolean {
    return this._dirty;
  }

  clearDirty(): void {
    this._dirty = false;
  }

  getBoundingRect(): BoundingRect {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  contain(x: number, y: number): boolean {
    return false;
  }

  render(ctx: CanvasRenderingContext2D): void {
    // To be implemented by subclasses
  }

  /**
   * Get local transform matrix
   */
  getLocalTransform(): Matrix {
    const t = this.transform || {};
    let m = createIdentityMatrix();

    const x = t.x ?? 0;
    const y = t.y ?? 0;
    const originX = t.originX ?? 0;
    const originY = t.originY ?? 0;
    const rotation = t.rotation ?? 0;
    const scaleX = t.scaleX ?? 1;
    const scaleY = t.scaleY ?? 1;

    m = translate(m, x, y);
    if (originX || originY) m = translate(m, originX, originY);
    if (rotation) m = rotate(m, rotation);
    if (scaleX !== 1 || scaleY !== 1) m = scale(m, scaleX, scaleY);
    if (originX || originY) m = translate(m, -originX, -originY);

    return m;
  }

  /**
   * Get global transform matrix
   */
  getGlobalTransform(): Matrix {
    let m = this.getLocalTransform();
    let parent = (this as any).__parent;
    while (parent) {
      const pm = parent.getLocalTransform();
      m = multiplyMatrix(pm, m);
      parent = (parent as any).__parent;
    }
    return m;
  }

  /**
   * Transform global point to local coordinate space
   */
  transformPointToLocal(x: number, y: number): [number, number] | null {
    const globalTransform = this.getGlobalTransform();
    const invTransform = invertMatrix(globalTransform);
    if (!invTransform) {
      return null;
    }
    return applyMatrix(invTransform, x, y);
  }

  protected applyTransform(ctx: CanvasRenderingContext2D): void {
    const transform = this.transform;
    if (!transform) return;

    const originX = transform.originX ?? 0;
    const originY = transform.originY ?? 0;

    if (transform.x !== undefined || transform.y !== undefined) {
      ctx.translate(transform.x ?? 0, transform.y ?? 0);
    }

    if (originX !== 0 || originY !== 0) {
      ctx.translate(originX, originY);
    }

    if (transform.rotation) {
      ctx.rotate(transform.rotation);
    }

    if (transform.scaleX !== undefined || transform.scaleY !== undefined) {
      ctx.scale(transform.scaleX ?? 1, transform.scaleY ?? 1);
    }

    if (originX !== 0 || originY !== 0) {
      ctx.translate(-originX, -originY);
    }
  }

  protected applyStyle(ctx: CanvasRenderingContext2D): void {
    const style = this.style;
    if (!style) return;

    if (style.fill) {
      ctx.fillStyle = style.fill;
    }
    if (style.stroke) {
      ctx.strokeStyle = style.stroke;
    }
    if (style.lineWidth !== undefined) {
      ctx.lineWidth = style.lineWidth;
    }
    if (style.lineDash) {
      ctx.setLineDash(style.lineDash);
      if (style.lineDashOffset !== undefined) {
        ctx.lineDashOffset = style.lineDashOffset;
      }
    }
    if (style.opacity !== undefined) {
      ctx.globalAlpha = style.opacity;
    }
    if (style.shadowBlur !== undefined) {
      ctx.shadowBlur = style.shadowBlur;
    }
    if (style.shadowColor) {
      ctx.shadowColor = style.shadowColor;
    }
    if (style.shadowOffsetX !== undefined) {
      ctx.shadowOffsetX = style.shadowOffsetX;
    }
    if (style.shadowOffsetY !== undefined) {
      ctx.shadowOffsetY = style.shadowOffsetY;
    }
  }

  getClipPath(): ChartElement | undefined {
    return this._clipPath;
  }

  setClipPath(clipPath?: ChartElement): this {
    this._clipPath = clipPath;
    this.markRedraw();
    return this;
  }

  private _generateId(): string {
    return `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default ChartElement;
