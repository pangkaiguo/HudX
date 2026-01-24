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
  applyMatrix,
} from './util/matrix';
import { getUnit32RandomValues } from './util/random';

class ChartElement extends Eventful {
  /** Unique ID */
  id: string;
  /** Element name */
  name?: string;
  /** User data */
  data?: any;
  /** Layer index (z-index equivalent) */
  zlevel: number = 0;
  /** Element stacking order within same layer */
  z: number = 0;
  /** Whether to ignore mouse events */
  silent: boolean = false;
  /** Whether the element is invisible */
  invisible: boolean = false;
  /** Mouse cursor style */
  cursor: string = 'default';
  /** Whether the element is draggable */
  draggable: boolean = false;
  /** Whether to render progressively */
  progressive: boolean = false;

  /** Element style */
  style: Style = {};
  /** Shape properties */
  shape: unknown = {};
  /** Transform properties */
  transform: Transform = {};

  /** Parent container */
  __parent?: ChartElement;

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

  attr(
    key: string | Record<string, unknown> | Record<string, any>,
    value?: unknown,
  ): any {
    if (
      typeof key === 'string' &&
      value === undefined &&
      arguments.length === 1
    ) {
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
      this.shape = {
        ...(this.shape as Record<string, unknown>),
        ...(value as Record<string, unknown>),
      };
    } else if (
      key === 'transform' &&
      typeof value === 'object' &&
      value !== null
    ) {
      this.transform = {
        ...this.transform,
        ...(value as Record<string, unknown>),
      };
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
    const parent = this.__parent;
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
    // Transform point to local coordinate system
    const localPoint = this.transformPointToLocal(x, y);
    if (!localPoint) return false;

    const [lx, ly] = localPoint;
    const rect = this.getBoundingRect();

    // Simple bounding box check
    return (
      lx >= rect.x &&
      lx <= rect.x + rect.width &&
      ly >= rect.y &&
      ly <= rect.y + rect.height
    );
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
    let parent = this.__parent;
    while (parent) {
      const pm = parent.getLocalTransform();
      m = multiplyMatrix(pm, m);
      parent = parent.__parent;
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
      ctx.fillStyle = this._resolveCanvasStyle(style.fill, ctx);
    }
    if (style.stroke) {
      ctx.strokeStyle = this._resolveCanvasStyle(style.stroke, ctx);
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

  private _resolveCanvasStyle(value: any, ctx: CanvasRenderingContext2D): any {
    if (!value) return value;
    if (typeof value === 'string') return value;
    const CanvasGradientCtor = (globalThis as any).CanvasGradient;
    if (
      typeof CanvasGradientCtor === 'function' &&
      value instanceof CanvasGradientCtor
    ) {
      return value;
    }
    const CanvasPatternCtor = (globalThis as any).CanvasPattern;
    if (
      typeof CanvasPatternCtor === 'function' &&
      value instanceof CanvasPatternCtor
    ) {
      return value;
    }
    if (
      typeof value === 'object' &&
      'type' in value &&
      'colorStops' in value &&
      Array.isArray(value.colorStops)
    ) {
      const fallback =
        value.colorStops.find(
          (s: any) => s && typeof s.color === 'string' && s.color.length > 0,
        )?.color ?? '#000000';
      const rect = this.getBoundingRect();
      if (!rect || rect.width === 0 || rect.height === 0) {
        return fallback;
      }
      if (
        value.type === 'linear' &&
        typeof ctx.createLinearGradient === 'function'
      ) {
        const x = value.x ?? 0;
        const y = value.y ?? 0;
        const x2 = value.x2 ?? 1;
        const y2 = value.y2 ?? 1;
        try {
          const gradient = ctx.createLinearGradient(
            rect.x + rect.width * x,
            rect.y + rect.height * y,
            rect.x + rect.width * x2,
            rect.y + rect.height * y2,
          );
          value.colorStops.forEach((stop: any) => {
            gradient.addColorStop(stop.offset, stop.color);
          });
          return gradient;
        } catch {
          return fallback;
        }
      }
      if (
        value.type === 'radial' &&
        typeof ctx.createRadialGradient === 'function'
      ) {
        const cx = rect.x + rect.width * (value.x ?? 0.5);
        const cy = rect.y + rect.height * (value.y ?? 0.5);
        const r = Math.max(rect.width, rect.height) * (value.r ?? 0.5);
        try {
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          value.colorStops.forEach((stop: any) => {
            gradient.addColorStop(stop.offset, stop.color);
          });
          return gradient;
        } catch {
          return fallback;
        }
      }
      return fallback;
    }
    return value;
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
    return `element_${Date.now()}_${getUnit32RandomValues()}`;
  }
}

export default ChartElement;
