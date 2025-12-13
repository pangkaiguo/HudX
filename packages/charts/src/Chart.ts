/** 
  * Chart - Base chart class 
  */

import { Renderer, Group, RenderMode, Theme, Locale, DataURLOpts, Animator } from '@HudX/core';
import type { ChartOption, ChartEvent } from './types';

export default class Chart {
  protected _renderer: Renderer;
  protected _option: ChartOption;
  protected _root: Group;
  protected _width: number = 0;
  protected _height: number = 0;
  protected _isMounted: boolean = false;
  protected _animationId: number | null = null;
  protected _renderScheduled: boolean = false;
  protected _animator: Animator = new Animator();

  constructor(dom: HTMLElement, option: ChartOption = {}, renderMode: RenderMode = 'canvas', theme: Theme = 'light', locale: Locale = 'en') {
    this._renderer = Renderer.init(dom, renderMode, theme, locale);
    this._option = option;
    this._root = this._renderer.getRoot();
    this._init();
  }

  /** 
   * Get render mode 
   */
  getRenderMode(): RenderMode {
    return this._renderer.getRenderMode();
  }

  /** 
   * Set render mode 
   */
  setRenderMode(renderMode: RenderMode): void {
    this._renderer.setRenderMode(renderMode);
    this._render();
  }

  /** 
   * Get theme 
   */
  getTheme(): Theme {
    return this._renderer.getTheme();
  }

  /** 
   * Set theme 
   */
  setTheme(theme: Theme): void {
    this._renderer.setTheme(theme);
    this._render();
  }

  /** 
   * Get locale 
   */
  getLocale(): Locale {
    return this._renderer.getLocale();
  }

  /** 
   * Set locale 
   */
  setLocale(locale: Locale): void {
    this._renderer.setLocale(locale);
    this._render();
  }

  /** 
   * Get translated text 
   */
  t(key: string, defaultValue?: string): string {
    return this._renderer.t(key, defaultValue);
  }

  /** 
   * Initialize chart 
   */
  protected _init(): void { 
     this._isMounted = true;
     this.resize(); 
     this.setOption(this._option); 
   }

  /**
   * Mount chart to DOM
   */
  mount(): this {
    if (!this._isMounted) {
      this._isMounted = true;
      this.resize();
      this._render();
    }
    return this;
  }

  /**
   * Unmount chart from DOM
   */
  unmount(): this {
    if (this._isMounted) {
      this._isMounted = false;
      this._root.removeAll();
    }
    return this;
  }

  /**
   * Check if chart is mounted
   */
  isMounted(): boolean {
    return this._isMounted;
  }

  /** 
   * Set chart option with advanced options 
   */
  setOption(
    option: ChartOption,
    notMerge?: boolean | {
      notMerge?: boolean;
      lazyUpdate?: boolean;
      silent?: boolean;
    },
    lazyUpdate?: boolean
  ): this {
    // Handle parameter overloading 
    let opts = {
      notMerge: false,
      lazyUpdate: false,
      silent: false
    };

    if (typeof notMerge === 'object') {
      opts = { ...opts, ...notMerge };
    } else if (typeof notMerge === 'boolean') {
      opts.notMerge = notMerge;
    }

    if (typeof lazyUpdate === 'boolean') {
      opts.lazyUpdate = lazyUpdate;
    }

    // Merge option 
    if (opts.notMerge) {
      this._option = option;
    } else {
      this._option = { ...this._option, ...option };
    }

    // Emit event if not silent 
    if (!opts.silent) {
      const event = new CustomEvent('optionchanged', {
        detail: { option: this._option }
      });
      this._renderer.getDom().dispatchEvent(event);
    }

    // Render immediately if not lazy update 
    if (!opts.lazyUpdate) {
      this._render();
    }

    return this;
  }

  /** 
   * Get chart option 
   */
  getOption(): ChartOption {
    return { ...this._option };
  }

  /** 
   * Resize chart 
   */
  resize(width?: number, height?: number): void {
    this._renderer.resize(width, height);
    this._width = this._renderer.getWidth();
    this._height = this._renderer.getHeight();
    this._render();
  }

  /** 
   * Get data URL 
   */
  getDataURL(opts: DataURLOpts = {}): string {
    return this._renderer.getDataURL(opts);
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
   * Pause animations
   */
  pauseAnimation(): void {
    if (this._animationId !== null) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this._animator.pauseAll();
  }

  /**
   * Resume animations
   */
  resumeAnimation(): void {
    if (!this._animationId && this._isMounted) {
      this._scheduleRender();
    }
    this._animator.resumeAll();
  }

  /**
   * Stop all animations
   */
  stopAnimation(): void {
    this.pauseAnimation();
    this._renderScheduled = false;
    this._animator.stopAll();
  }

  /**
   * Get the animator instance for custom animations
   */
  getAnimator(): Animator {
    return this._animator;
  }

  /**
   * Check if animation is enabled
   */
  protected _isAnimationEnabled(): boolean {
    return this._option.animation !== false;
  }

  /**
   * Get animation duration
   */
  protected _getAnimationDuration(): number {
    return this._option.animationDuration || 1000;
  }

  /**
   * Get animation easing function
   */
  protected _getAnimationEasing(): string {
    return this._option.animationEasing || 'cubicOut';
  }

  /** 
   * Render chart (to be implemented by subclasses) 
   */
  protected _render(): void {
    this._root.removeAll();
    // To be implemented by subclasses 
  }

  /**
   * Debounced render for performance
   */
  protected _scheduleRender(): void {
    if (this._renderScheduled) {
      return;
    }

    this._renderScheduled = true;

    this._animationId = requestAnimationFrame(() => {
      this._renderScheduled = false;
      this._animationId = null;
      this._render();
    });
  }

  /** 
   * Add event listener 
   */
  on(event: string, handler: (event: ChartEvent) => void): void {
    this._renderer.on(event, handler);
  }

  /** 
   * Remove event listener 
   */
  off(event?: string, handler?: (event: ChartEvent) => void): void {
    this._renderer.off(event, handler);
  }

  /**
   * Add one-time event listener
   */
  once(event: string, handler: (event: ChartEvent) => void): void {
    const onceHandler = (e: ChartEvent) => {
      handler(e);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }

  /**
   * Trigger custom event
   */
  trigger(eventName: string, data?: any): void {
    const event = new CustomEvent(eventName, { detail: data });
    this._renderer.getDom().dispatchEvent(event);
  }

  /** 
   * Dispose chart 
   */
  dispose(): void {
    this.stopAnimation();
    this.stopResponsive();
    this.unmount();
    this._renderer.dispose();
    this._animator.stopAll();
  }

  /** 
   * Clear chart (remove all elements) 
   */
  clear(): this {
    this._root.removeAll();
    this._option = {};
    return this;
  }

  /** 
   * Check if chart is disposed 
   */
  isDisposed(): boolean {
    return this._renderer.isDisposed();
  }

  /** 
   * Get container DOM element 
   */
  getDom(): HTMLElement {
    return this._renderer.getDom();
  }

  /** 
   * Get Renderer instance 
   */
  getRenderer(): Renderer {
    return this._renderer;
  }

  /**
   * Get chart state
   */
  getState(): {
    width: number;
    height: number;
    isMounted: boolean;
    isDisposed: boolean;
    renderMode: RenderMode;
    theme: Theme;
    locale: Locale;
  } {
    return {
      width: this._width,
      height: this._height,
      isMounted: this._isMounted,
      isDisposed: this.isDisposed(),
      renderMode: this.getRenderMode(),
      theme: this.getTheme(),
      locale: this.getLocale()
    };
  }

  /**
   * Batch update options
   */
  batchUpdate(callback: (chart: this) => void): this {
    const originalOption = { ...this._option };
    callback(this);

    // Only render if options changed
    if (JSON.stringify(this._option) !== JSON.stringify(originalOption)) {
      this._render();
    }

    return this;
  }

  /**
   * Convert coordinates from pixel to chart domain
   */
  convertFromPixel(coord: [number, number]): [number, number] {
    // Base implementation - to be overridden by subclasses
    return coord;
  }

  /**
   * Convert coordinates from chart domain to pixel
   */
  convertToPixel(coord: [number, number]): [number, number] {
    // Base implementation - to be overridden by subclasses
    return coord;
  }

  /**
   * Show loading animation
   */
  showLoading(loadingOpts?: {
    text?: string;
    color?: string;
    textColor?: string;
    maskColor?: string;
    zLevel?: number;
  }): void {
    // Implementation depends on Renderer capabilities
    const opts = {
      text: loadingOpts?.text || this.t('loading', 'Loading...'),
      color: loadingOpts?.color || '#5470c6',
      textColor: loadingOpts?.textColor || '#333',
      maskColor: loadingOpts?.maskColor || 'rgba(255, 255, 255, 0.8)',
      zLevel: loadingOpts?.zLevel || 9999
    };

    // Dispatch loading event
    this.trigger('loading', opts);
  }

  /**
   * Hide loading animation
   */
  hideLoading(): void {
    this.trigger('loading', { show: false });
  }

  /**
   * Get bounding rectangle of chart
   */
  getBoundingRect(): DOMRect {
    return this._renderer.getDom().getBoundingClientRect();
  }

  /**
   * Make chart responsive
   */
  makeResponsive(): this {
    const resizeObserver = new ResizeObserver(() => {
      this.resize();
    });

    resizeObserver.observe(this._renderer.getDom());

    // Store observer for cleanup
    (this as any)._resizeObserver = resizeObserver;

    return this;
  }

  /**
   * Stop responsive behavior
   */
  stopResponsive(): this {
    if ((this as any)._resizeObserver) {
      (this as any)._resizeObserver.disconnect();
      delete (this as any)._resizeObserver;
    }
    return this;
  }

  /** 
   * Parse size (number or string like '10%') 
   */
  protected _parseSize(size: string | number | undefined, defaultSize: number): number {
    if (size === undefined) {
      return defaultSize;
    }
    if (typeof size === 'number') {
      return size;
    }
    if (typeof size === 'string' && size.endsWith('%')) {
      const percent = parseFloat(size) / 100;
      return size.includes('left') || size.includes('right')
        ? this._width * percent
        : this._height * percent;
    }
    return parseFloat(size) || defaultSize;
  }

  /** 
   * Get series color 
   */
  protected _getSeriesColor(index: number): string {
    const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
    return colors[index % colors.length];
  }

  /**
   * Get series color with opacity
   */
  protected _getSeriesColorWithOpacity(index: number, opacity: number = 1): string {
    const color = this._getSeriesColor(index);

    // Convert hex to rgba if opacity is not 1
    if (opacity < 1 && color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    return color;
  }

  /**
   * Format number with locale
   */
  protected _formatNumber(value: number, precision: number = 2): string {
    return value.toLocaleString(this.getLocale(), {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
  }

  /**
   * Format date with locale
   */
  protected _formatDate(date: Date, format: string = 'short'): string {
    return date.toLocaleDateString(this.getLocale(), {
      dateStyle: format as any
    });
  }
}