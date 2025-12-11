/**
 * CanvasPainter - Canvas rendering implementation
 */

import Storage from '../Storage';
import Element from '../Element';
import IPainter from './IPainter';

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
    this._resize();
    this._initEvent();
  }

  /**
   * Resize canvas
   */
  resize(width?: number, height?: number): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this._dom.getBoundingClientRect();
    
    this._width = width ?? rect.width;
    this._height = height ?? rect.height;

    // Set canvas size considering device pixel ratio for crisp rendering
    this._canvas.width = this._width * dpr;
    this._canvas.height = this._height * dpr;
    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;

    // Scale context to match device pixel ratio
    this._ctx.scale(dpr, dpr);

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

    // Clear canvas
    this._ctx.clearRect(0, 0, this._width, this._height);

    // Get all elements sorted by zlevel and z
    const elements = this._storage.getElementsList();

    // Render each element
    for (const element of elements) {
      if (!element.invisible) {
        this._ctx.save();
        try {
          element.render(this._ctx);
          element.clearDirty();
        } catch (error) {
          console.error('Error rendering element:', error, element);
        }
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
    // Use ResizeObserver for automatic resize
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        this._resize();
      });
      resizeObserver.observe(this._dom);
    } else {
      // Fallback to window resize event
      window.addEventListener('resize', () => {
        this._resize();
      });
    }
  }

  /**
   * Handle resize
   */
  private _resize(): void {
    const rect = this._dom.getBoundingClientRect();
    if (rect.width !== this._width || rect.height !== this._height) {
      this.resize();
    }
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

