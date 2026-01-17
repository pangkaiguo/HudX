/**
 * Renderer - Main entry point, main rendering engine class
 * High-performance rendering engine supporting Canvas and SVG modes
 *
 * Algorithm: Abstract Factory & Painter Delegation
 *
 * Description:
 * Acts as the entry point for the rendering engine. Uses the Abstract Factory
 * pattern to instantiate the appropriate Painter (Canvas or SVG) based on configuration.
 * Manages the global Storage (Display List) for all graphical elements.
 */

import Storage from './Storage';
import Handler from './Handler';
import ChartElement from './ChartElement';
import Group from './Group';
import type {
  EventData,
  EventCallback,
  RenderMode,
  Theme,
  Locale,
  ThemeConfig,
  DataURLOpts,
} from './types';
import IPainter from './painter/IPainter';
import CanvasPainter from './painter/CanvasPainter';
import SVGPainter from './painter/SVGPainter';
import { ThemeManager } from './theme/ThemeManager';
import { LocaleManager } from './i18n/LocaleManager';

export default class Renderer {
  private _dom: HTMLElement;
  private _storage: Storage;
  private _painter: IPainter;
  private _handler: Handler;
  private _root: Group;
  private _renderMode: RenderMode;
  private _theme: Theme;
  private _locale: Locale;
  private _disposed: boolean = false;

  constructor(
    dom: HTMLElement,
    renderMode: RenderMode = 'canvas',
    theme: Theme = 'light',
    locale: Locale = 'en',
  ) {
    this._dom = dom;
    this._storage = new Storage();
    this._root = new Group();
    this._storage.addRoot(this._root);
    this._renderMode = renderMode;
    this._theme = theme;
    this._locale = locale;

    // Create painter based on render mode
    if (renderMode === 'svg') {
      this._painter = new SVGPainter(dom, this._storage);
    } else {
      this._painter = new CanvasPainter(dom, this._storage);
    }

    this._handler = new Handler(this._painter, this._storage);

    // Apply theme
    this._applyTheme();

    // Listen to storage changes
    this._root.on('dirty', () => {
      this._painter.markDirty();
    });
  }

  /**
   * Initialize Renderer instance
   */
  static init(
    dom: HTMLElement | string,
    renderMode: RenderMode = 'canvas',
    theme: Theme = 'light',
    locale: Locale = 'en',
  ): Renderer {
    let element: HTMLElement;
    if (typeof dom === 'string') {
      const found = document.querySelector(dom) as HTMLElement;
      if (!found) {
        throw new Error(`Element not found: ${dom}`);
      }
      element = found;
    } else {
      element = dom;
    }
    return new Renderer(element, renderMode, theme, locale);
  }

  /**
   * Get render mode
   */
  getRenderMode(): RenderMode {
    return this._renderMode;
  }

  /**
   * Switch render mode (requires reinitialization)
   */
  setRenderMode(renderMode: RenderMode): void {
    if (this._renderMode === renderMode) {
      return;
    }

    // Dispose old painter and handler
    this._handler.dispose();
    this._painter.dispose();

    // Create new painter
    this._renderMode = renderMode;
    if (renderMode === 'svg') {
      this._painter = new SVGPainter(this._dom, this._storage);
    } else {
      this._painter = new CanvasPainter(this._dom, this._storage);
    }

    // Recreate handler
    this._handler = new Handler(this._painter, this._storage);

    // Refresh
    this._painter.markDirty();
  }

  /**
   * Add element to root group
   */
  add(element: ChartElement): this {
    this._root.add(element);
    this._storage.updateElement(element);
    this._painter.markDirty();
    return this;
  }

  /**
   * Remove element from root group
   */
  remove(element: ChartElement): this {
    this._root.remove(element);
    this._storage.removeElement(element);
    this._painter.markDirty();
    return this;
  }

  /**
   * Remove all elements
   */
  removeAll(): this {
    this._root.removeAll();
    this._storage.clear();
    this._storage.addRoot(this._root);
    this._painter.markDirty();
    return this;
  }

  /**
   * Get element by ID
   */
  getElementById(id: string): ChartElement | undefined {
    return this._storage.getElementById(id);
  }

  /**
   * Get root group
   */
  getRoot(): Group {
    return this._root;
  }

  /**
   * Resize renderer
   */
  resize(width?: number, height?: number): this {
    this._painter.resize(width, height);
    return this;
  }

  /**
   * Refresh/repaint
   */
  refresh(): this {
    this._painter.markDirty();
    return this;
  }

  /**
   * Flush pending paints immediately
   */
  flush(): this {
    this._painter.paint();
    return this;
  }

  /**
   * Set background color
   */
  setBackgroundColor(color: string): this {
    if (this._renderMode === 'canvas') {
      const canvas = this._painter.getCanvas?.();
      if (canvas) {
        canvas.style.backgroundColor = color;
      }
    } else {
      const svg = this._painter.getSVG?.();
      if (svg) {
        svg.style.backgroundColor = color;
      }
    }
    return this;
  }

  /**
   * Add event listener
   */
  on(event: string, handler: EventCallback): this {
    this._root.on(event, handler);
    return this;
  }

  /**
   * Remove event listener
   */
  off(event?: string, handler?: EventCallback): this {
    this._root.off(event, handler);
    return this;
  }

  /**
   * Trigger event
   */
  trigger(event: string, eventData?: EventData): this {
    this._root.trigger(event, eventData);
    return this;
  }

  /**
   * Get data URL
   */
  getDataURL(opts: DataURLOpts = {}): string {
    return this._painter.getDataURL(opts);
  }

  /**
   * Get width
   */
  getWidth(): number {
    return this._painter.getWidth();
  }

  /**
   * Get height
   */
  getHeight(): number {
    return this._painter.getHeight();
  }

  /**
   * Get container DOM element
   */
  getDom(): HTMLElement {
    return this._dom;
  }

  /**
   * Get canvas element (Canvas mode only)
   */
  getCanvas(): HTMLCanvasElement | undefined {
    if (this._painter.getCanvas) {
      return this._painter.getCanvas();
    }
    return undefined;
  }

  /**
   * Get SVG element (SVG mode only)
   */
  getSVG(): SVGSVGElement | undefined {
    if (this._painter.getSVG) {
      return this._painter.getSVG();
    }
    return undefined;
  }

  /**
   * Get theme
   */
  getTheme(): Theme {
    return this._theme;
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme | string): this {
    if (this._theme === theme) {
      return this;
    }
    this._theme = theme as Theme;
    this._applyTheme();
    this._painter.markDirty();
    return this;
  }

  /**
   * Get theme configuration
   */
  getThemeConfig(): ThemeConfig {
    return ThemeManager.getTheme(this._theme);
  }

  /**
   * Get locale
   */
  getLocale(): Locale {
    return this._locale;
  }

  /**
   * Set locale
   */
  setLocale(locale: Locale): this {
    if (this._locale === locale) {
      return this;
    }
    this._locale = locale;
    this._painter.markDirty();
    return this;
  }

  /**
   * Get translated text
   */
  t(key: string, defaultValue?: string): string {
    return LocaleManager.t(this._locale, key, defaultValue);
  }

  /**
   * Apply theme to DOM
   */
  private _applyTheme(): void {
    const themeConfig = ThemeManager.getTheme(this._theme);

    if (this._renderMode === 'canvas') {
      const canvas = this._painter.getCanvas?.();
      if (canvas) {
        canvas.style.backgroundColor = themeConfig.backgroundColor;
      }
    } else {
      const svg = this._painter.getSVG?.();
      if (svg) {
        svg.style.backgroundColor = themeConfig.backgroundColor;
      }
    }
  }

  /**
   * Dispose Renderer instance
   */
  dispose(): void {
    if (this._disposed) {
      return;
    }
    this._handler.dispose();
    this._painter.dispose();
    this._storage.clear();
    this._root.off();
    this._disposed = true;
  }

  /**
   * Check if Renderer instance is disposed
   */
  isDisposed(): boolean {
    return this._disposed;
  }
}
