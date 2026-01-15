/**
 * CanvasPainter - Canvas rendering implementation
 */

import Storage from '../Storage';
import IPainter from './IPainter';
import type { DataURLOpts } from '../types';

export default class CanvasPainter implements IPainter {
  private _dom: HTMLElement;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _width: number = 0;
  private _height: number = 0;
  private _storage: Storage;
  private _dirty: boolean = true;
  private _animationFrameId?: number;

  constructor(dom: HTMLElement, storage: Storage) {
    this._dom = dom;
    this._storage = storage;
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d')!;

    if (!this._ctx) {
      throw new Error('Canvas 2D context is not supported');
    }

    this._dom.appendChild(this._canvas);
    this.resize();
    this._initEvent();
  }

  /**
   * Resize canvas
   */
  resize(width?: number, height?: number): void {
    const dpr = window.devicePixelRatio || 1;

    if (width === undefined || height === undefined) {
      this._width = width ?? this._dom.clientWidth;
      this._height = height ?? this._dom.clientHeight;
    } else {
      this._width = width;
      this._height = height;
    }

    // Set canvas size considering device pixel ratio for crisp rendering
    // Use Math.round to ensure integer values for canvas dimensions to avoid rendering artifacts
    this._canvas.width = Math.round(this._width * dpr);
    this._canvas.height = Math.round(this._height * dpr);
    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;

    // Reset transform and scale context to match device pixel ratio
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.scale(dpr, dpr);

    // Ensure image smoothing is enabled (high quality)
    this._ctx.imageSmoothingEnabled = true;
    (this._ctx as any).imageSmoothingQuality = 'high';

    this.markDirty();
  }

  /**
   * Get canvas element
   */
  getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }

  /**
   * Get rendering context
   */
  getContext(): CanvasRenderingContext2D {
    return this._ctx;
  }

  /**
   * Get width
   */
  getWidth(): number {
    return this._width;
  }

  /**
   * Get height
   */
  getHeight(): number {
    return this._height;
  }

  /**
   * Mark as dirty (needs repaint)
   */
  markDirty(): void {
    if (!this._dirty) {
      this._dirty = true;
      this._requestPaint();
    }
  }

  /**
   * Paint all elements
   */
  paint(): void {
    if (!this._dirty) {
      return;
    }

    // Get all elements sorted by zlevel and z
    const elements = this._storage.getElementsList();

    // Check if any element is dirty
    const hasDirtyElements = elements.some(el => el.isDirty());

    if (!hasDirtyElements && !this._dirty) {
      return;
    }

    // Clear canvas only once
    this._ctx.clearRect(0, 0, this._width, this._height);

    // Render each element (batch rendering)
    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i];
      if (!element.invisible) {
        this._ctx.save();
        element.render(this._ctx);
        element.clearDirty();
        this._ctx.restore();
      }
    }

    this._dirty = false;
  }

  /**
   * Request paint (using requestAnimationFrame for performance)
   */
  private _requestPaint(): void {
    if (this._animationFrameId !== undefined) {
      return;
    }

    this._animationFrameId = requestAnimationFrame(() => {
      this._animationFrameId = undefined;
      this.paint();
    });
  }

  /**
   * Initialize resize observer
   */
  private _initEvent(): void {
    // Create ResizeObserver to handle container resize automatically
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === this._dom) {
            this._resize();
            break;
          }
        }
      });
      resizeObserver.observe(this._dom);
    } else {
      // Fallback for browsers without ResizeObserver
      window.addEventListener('resize', () => {
        this._resize();
      });
    }
  }

  /**
   * Handle resize
   */
  private _resize(): void {
    const width = this._dom.clientWidth;
    const height = this._dom.clientHeight;

    // Check if size changed
    if (width !== this._width || height !== this._height) {
      this.resize(width, height);
    }
  }

  /**
   * Get data URL
   */
  getDataURL(opts: DataURLOpts = {}): string {
    const type = opts.type || 'png';
    const pixelRatio = opts.pixelRatio || window.devicePixelRatio || 1;
    const backgroundColor = opts.backgroundColor;

    // Create a temporary canvas if we need to change pixel ratio or background color
    if (pixelRatio !== 1 || backgroundColor) {
      const tempCanvas = document.createElement('canvas');
      const width = this._width;
      const height = this._height;
      tempCanvas.width = width * pixelRatio;
      tempCanvas.height = height * pixelRatio;
      const ctx = tempCanvas.getContext('2d');

      if (ctx) {
        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }
        ctx.drawImage(this._canvas, 0, 0, tempCanvas.width, tempCanvas.height);
        return tempCanvas.toDataURL(`image/${type}`);
      }
    }

    return this._canvas.toDataURL(`image/${type}`);
  }

  /**
   * Dispose painter
   */
  dispose(): void {
    if (this._animationFrameId !== undefined) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
    if (this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
  }
}

