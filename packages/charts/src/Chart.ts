/**
 * Chart - Base chart class
 */

import { HRender, Group, RenderMode, Theme, Locale } from '@hudx/core';
import { ChartOption, ChartEvent } from './types';

export default class Chart {
  protected _renderer: HRender;
  protected _option: ChartOption;
  protected _root: Group;
  protected _width: number = 0;
  protected _height: number = 0;

  constructor(dom: HTMLElement, option: ChartOption = {}, renderMode: RenderMode = 'canvas', theme: Theme = 'light', locale: Locale = 'en') {
    this._renderer = HRender.init(dom, renderMode, theme, locale);
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
    this.resize();
    this.setOption(this._option);
  }

  /**
   * Set chart option
   */
  setOption(option: ChartOption, notMerge: boolean = false): void {
    if (notMerge) {
      this._option = option;
    } else {
      this._option = { ...this._option, ...option };
    }
    this._render();
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
   * Render chart (to be implemented by subclasses)
   */
  protected _render(): void {
    this._root.removeAll();
    // To be implemented by subclasses
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
   * Dispose chart
   */
  dispose(): void {
    this._renderer.dispose();
  }

  /**
   * Get HRender instance
   */
  getRenderer(): HRender {
    return this._renderer;
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
}

