/**
 * Chart - Base chart class
 *
 * Algorithm: Render Loop & Lifecycle Management
 *
 * Description:
 * Orchestrates the initialization, rendering, and event handling lifecycle.
 * Implements the "Dirty-Check" mechanism to optimize rendering by only updating
 * modified components. Manages the component tree (Scene Graph) and coordinates
 * interactions between Renderer, Animator, and Components.
 */

import Renderer from './Renderer';
import Group from './Group';
import Animator from './animation/Animator';
import Tooltip from './component/Tooltip';
import Legend from './component/Legend';
import Title from './component/Title';
import Line from './graphic/Line';
import Text from './graphic/Text';
import type {
  RenderMode,
  Theme,
  Locale,
  DataURLOpts,
  ThemeConfig,
} from './types';
import { ThemeManager } from './theme/ThemeManager';
import { toRgbaWithOpacity } from './util/color';
import { Z_AXIS } from './constants';
import type { ChartOption, ChartEvent } from './types';
import {
  createLinearScale,
  createOrdinalScale,
  calculateNiceTicks,
  formatAxisLabel,
  type Scale,
} from './util/coordinate';

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
  protected _forceReinitOnNextRender: boolean = false;
  protected _tooltip?: Tooltip;
  protected _legend?: Legend;
  protected _title?: Title;
  protected _legendSelected: Set<string> = new Set();
  protected _hasInitLegend: boolean = false;
  protected _suppressAnimationOnce: boolean = false;
  protected _animateOnlyFor?: Set<string>;

  constructor(
    dom: HTMLElement,
    option: ChartOption = {},
    renderMode: RenderMode = 'svg',
    theme?: Theme,
    locale: Locale = 'en',
  ) {
    this._renderer = Renderer.init(
      dom,
      renderMode,
      theme ?? ThemeManager.getCurrentTheme(),
      locale,
    );
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
    if (this.getRenderMode() === renderMode) {
      return;
    }
    this.stopAnimation();
    this._forceReinitOnNextRender = true;
    this._renderer.setRenderMode(renderMode);
    this._render();
    this._forceReinitOnNextRender = false;
  }

  getTheme(): Theme {
    return this._renderer.getTheme();
  }

  setTheme(theme: Theme): void {
    this._renderer.setTheme(theme);
    this._render();
  }

  getThemeConfig(): ThemeConfig {
    return this._renderer.getThemeConfig();
  }

  getLocale(): Locale {
    return this._renderer.getLocale();
  }

  setLocale(locale: Locale): void {
    this._renderer.setLocale(locale);
    this._render();
  }

  t(key: string, defaultValue?: string): string {
    return this._renderer.t(key, defaultValue);
  }

  protected _init(): void {
    this._isMounted = true;
    this.resize();
    const theme = this.getThemeConfig();
    const tooltipOpt = this._option?.tooltip || {};
    this._tooltip = new Tooltip({
      ...tooltipOpt,
      show: tooltipOpt?.show !== false,
      formatter:
        typeof tooltipOpt?.formatter === 'function'
          ? tooltipOpt.formatter
          : undefined,
      backgroundColor: tooltipOpt.backgroundColor ?? theme.tooltipBackgroundColor,
      textStyle: {
        ...(tooltipOpt.textStyle || {}),
        color: tooltipOpt.textStyle?.color ?? theme.tooltipTextColor,
        fontFamily: tooltipOpt.textStyle?.fontFamily ?? theme.fontFamily,
        fontSize: tooltipOpt.textStyle?.fontSize ?? theme.fontSize,
      },
      borderColor: tooltipOpt.borderColor ?? theme.borderColor,
    });
    this._tooltip.setContainer(this.getDom());
    this.setOption(this._option);
  }

  mount(): this {
    if (!this._isMounted) {
      this._isMounted = true;
      this.resize();
      this._render();
    }
    return this;
  }

  unmount(): this {
    if (this._isMounted) {
      this._isMounted = false;
      this._root.removeAll();
    }
    return this;
  }

  isMounted(): boolean {
    return this._isMounted;
  }

  /**
   * Set chart option with advanced options
   */
  setOption(
    option: ChartOption,
    notMerge?:
      | boolean
      | {
        notMerge?: boolean;
        lazyUpdate?: boolean;
        silent?: boolean;
      },
    lazyUpdate?: boolean,
  ): this {
    // Handle parameter overloading
    let opts = {
      notMerge: false,
      lazyUpdate: false,
      silent: false,
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
      this._option = this._mergeOption(this._option, option);
    }

    // Emit event if not silent
    if (!opts.silent) {
      const event = new CustomEvent('optionchanged', {
        detail: { option: this._option },
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
   * Merge options (support partial update for series)
   */
  protected _mergeOption(
    oldOpt: ChartOption,
    newOpt: ChartOption,
  ): ChartOption {
    const merged = { ...oldOpt };

    // Iterate over new option keys
    for (const key in newOpt) {
      const k = key as keyof ChartOption;
      const newVal = newOpt[k];
      const oldVal = oldOpt[k];

      if (k === 'series' && Array.isArray(newVal)) {
        // Merge series by index
        const mergedSeries = [...(Array.isArray(oldVal) ? oldVal : [])];
        newVal.forEach((s, i) => {
          if (mergedSeries[i]) {
            // Shallow merge the series object
            mergedSeries[i] = { ...mergedSeries[i], ...s };
          } else {
            mergedSeries[i] = s;
          }
        });
        merged.series = mergedSeries;
      } else if (
        typeof newVal === 'object' &&
        newVal !== null &&
        !Array.isArray(newVal)
      ) {
        // Shallow merge object properties (like tooltip, legend, etc.)
        if (
          typeof oldVal === 'object' &&
          oldVal !== null &&
          !Array.isArray(oldVal)
        ) {
          merged[k] = { ...oldVal, ...newVal } as any;
        } else {
          merged[k] = newVal as any;
        }
      } else {
        // Replace primitive or array values (like xAxis.data, or colors array)
        merged[k] = newVal as any;
      }
    }

    return merged;
  }

  getOption(): ChartOption {
    return { ...this._option };
  }

  resize(width?: number, height?: number): void {
    this._renderer.resize(width, height);
    this._width = this._renderer.getWidth();
    this._height = this._renderer.getHeight();
    if (this._tooltip) {
      // Tooltip handles resize via container dimensions
    }
    if (this._legend) {
      this._legend.setContainer(this._width, this._height);
    }
    if (this._title) {
      this._title.setContainer(this._width, this._height);
    }
    this._render();
  }

  getDataURL(opts: DataURLOpts = {}): string {
    return this._renderer.getDataURL(opts);
  }

  getWidth(): number {
    return this._width;
  }

  getHeight(): number {
    return this._height;
  }

  pauseAnimation(): void {
    if (this._animationId !== null) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this._animator.pauseAll();
  }

  resumeAnimation(): void {
    if (!this._animationId && this._isMounted) {
      this._scheduleRender();
    }
    this._animator.resumeAll();
  }

  stopAnimation(): void {
    this.pauseAnimation();
    this._renderScheduled = false;
    this._animator.stopAll();
  }

  getAnimator(): Animator {
    return this._animator;
  }

  protected _isAnimationEnabled(): boolean {
    return this._option.animation !== false;
  }

  protected _shouldAnimate(): boolean {
    return this._isAnimationEnabled() && !this._suppressAnimationOnce;
  }

  suppressNextAnimation(): void {
    this._suppressAnimationOnce = true;
  }

  clearAnimationSuppression(): void {
    this._suppressAnimationOnce = false;
  }

  protected _shouldAnimateFor(name: string): boolean {
    if (!this._isAnimationEnabled()) return false;
    if (this._animateOnlyFor === undefined) {
      return !this._suppressAnimationOnce;
    }
    if (this._animateOnlyFor.size === 0) return false;
    return this._animateOnlyFor.has(name);
  }

  beginSilentHide(): void {
    this._animateOnlyFor = new Set(); // animate none
  }

  beginAnimateShow(name: string): void {
    this._animateOnlyFor = new Set([name]);
  }

  endAnimateControl(): void {
    this._animateOnlyFor = undefined;
    this._suppressAnimationOnce = false;
  }

  protected _getAnimationDuration(isUpdate: boolean = false): number {
    if (isUpdate) {
      return this._option.animationDurationUpdate || 300;
    }
    return this._option.animationDuration || 1000;
  }

  protected _getAnimationEasing(isUpdate: boolean = false): string {
    if (isUpdate) {
      return this._option.animationEasingUpdate || 'cubicOut';
    }
    return this._option.animationEasing || 'cubicOut';
  }

  protected _calculateGrid(option: ChartOption): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    const grid = option.grid || {};
    const x = this._parseSize(grid.left, 60);
    const y = this._parseSize(grid.top, 60);
    const right = this._parseSize(grid.right, 40);
    const bottom = this._parseSize(grid.bottom, 60);
    const width = this._width - x - right;
    const height = this._height - y - bottom;
    return { x, y, width, height };
  }

  protected _shouldShowLabel(
    interval: any,
    index: number,
    label: string,
  ): boolean {
    if (interval === undefined || interval === 'auto') return true;
    if (typeof interval === 'number') {
      return index % (interval + 1) === 0;
    }
    if (typeof interval === 'function') {
      return interval(index, label);
    }
    return true;
  }

  protected _renderAxes(
    xAxis: any,
    yAxis: any,
    plotX: number,
    plotY: number,
    width: number,
    height: number,
    scales?: { x?: Scale; y?: Scale },
  ): void {
    // X axis
    if (xAxis?.show !== false) {
      const xAxisLine = new Line({
        shape: {
          x1: plotX,
          y1: plotY + height + 0.5,
          x2: plotX + width,
          y2: plotY + height + 0.5,
        },
        style: {
          stroke: this.getThemeConfig().axisLineColor, // Use theme color
          lineWidth: 1,
        },
        z: Z_AXIS,
      });
      this._root.add(xAxisLine);

      if (xAxis?.splitLine?.show) {
        const addSplitLine = (x: number) => {
          const line = new Line({
            shape: {
              x1: x,
              y1: plotY,
              x2: x,
              y2: plotY + height,
            },
            style: {
              stroke:
                xAxis.splitLine?.lineStyle?.color || this.getThemeConfig().gridColor,
              lineWidth: xAxis.splitLine?.lineStyle?.width || 1,
              lineDash:
                xAxis.splitLine?.lineStyle?.type === 'solid'
                  ? undefined
                  : xAxis.splitLine?.lineStyle?.type === 'dashed' ||
                    !xAxis.splitLine?.lineStyle?.type
                    ? [4, 4]
                    : undefined,
            },
            z: Z_AXIS - 0.5,
          });
          this._root.add(line);
        };

        if (scales?.x && xAxis.type === 'value') {
          const domain = scales.x.domain();
          const tickCount = xAxis.splitNumber ?? 10;
          const ticks = calculateNiceTicks(domain[0], domain[1], tickCount);

          ticks.forEach((tick) => {
            const x = scales.x!(tick);
            if (x < plotX - 0.1 || x > plotX + width + 0.1) return;
            addSplitLine(x);
          });
        } else if (typeof xAxis.splitNumber === 'number' && xAxis.splitNumber > 0) {
          const count = xAxis.splitNumber;
          for (let i = 1; i <= count; i++) {
            const ratio = i / (count + 1);
            const x = xAxis.inverse
              ? plotX + width - ratio * width
              : plotX + ratio * width;
            addSplitLine(x);
          }
        } else if (xAxis?.data && xAxis.data.length > 0) {
          const xRange = xAxis.inverse
            ? [plotX + width, plotX]
            : [plotX, plotX + width];
          const xScale =
            scales?.x ||
            (xAxis.type === 'category'
              ? createOrdinalScale(xAxis.data, xRange)
              : createLinearScale([0, xAxis.data.length - 1], xRange));

          const interval = xAxis.splitLine?.interval ?? 0;

          xAxis.data.forEach((label: any, index: number) => {
            if (
              typeof interval === 'number' &&
              interval > 0 &&
              index % (interval + 1) !== 0
            )
              return;

            const x = xAxis.type === 'category' ? xScale(label) : xScale(index);
            addSplitLine(x);
          });
        }
      }

      if (xAxis?.data && xAxis.data.length > 0) {
        const xRange = xAxis.inverse
          ? [plotX + width, plotX]
          : [plotX, plotX + width];
        const xScale =
          scales?.x ||
          (xAxis.type === 'category'
            ? createOrdinalScale(xAxis.data, xRange)
            : createLinearScale([0, xAxis.data.length - 1], xRange));

        const axisLabel = xAxis.axisLabel || {};
        const rotate = axisLabel.rotate || 0;
        const maxWidth = axisLabel.width;
        const overflow = axisLabel.overflow || 'break';
        const fontSize = axisLabel.fontSize || this.getThemeConfig().fontSize;
        const fontFamily = this.getThemeConfig().fontFamily;
        const color = axisLabel.color || this.getThemeConfig().axisLabelColor;
        const interval = axisLabel.interval;

        xAxis.data.forEach((label: any, index: number) => {
          if (!this._shouldShowLabel(interval, index, String(label))) return;

          const x = xAxis.type === 'category' ? xScale(label) : xScale(index);
          let labelText = String(label);

          if (axisLabel.formatter) {
            if (typeof axisLabel.formatter === 'string') {
              labelText = axisLabel.formatter.replace('{value}', labelText);
            } else if (typeof axisLabel.formatter === 'function') {
              labelText = axisLabel.formatter(label, index);
            }
          }

          if (maxWidth) {
            labelText = this._wrapText(
              labelText,
              maxWidth,
              fontSize,
              fontFamily,
              overflow,
            );
          }

          let textAlign: any = 'center';
          let textBaseline: any = 'top';
          let transform: any = undefined;
          let shapeX = x;
          let shapeY = plotY + height + 10; // Default gap

          if (rotate) {
            textAlign = rotate > 0 ? 'left' : 'right';
            textBaseline = 'middle';
            shapeX = 0;
            shapeY = 0;
            transform = {
              x: x,
              y: plotY + height + 10,
              rotation: (rotate * Math.PI) / 180,
            };
          }

          const text = new Text({
            shape: {
              x: shapeX,
              y: shapeY,
              text: labelText,
            },
            style: {
              fontSize,
              fill: color,
              textAlign,
              textBaseline,
              fontFamily,
            },
            z: Z_AXIS,
            transform,
          });
          this._root.add(text);
        });
      } else if (xAxis?.type === 'value' && scales?.x) {
        const domain = scales.x.domain();
        const tickCount = xAxis.splitNumber ?? 10;
        const axisLabel = xAxis.axisLabel || {};
        const rotate = axisLabel.rotate || 0;
        const maxWidth = axisLabel.width;
        const overflow = axisLabel.overflow || 'break';
        const fontSize = axisLabel.fontSize || this.getThemeConfig().fontSize;
        const fontFamily = this.getThemeConfig().fontFamily;
        const color = axisLabel.color || this.getThemeConfig().axisLabelColor;

        const ticks = calculateNiceTicks(domain[0], domain[1], tickCount);
        const interval = axisLabel.interval;

        ticks.forEach((tick, index) => {
          const x = scales.x!(tick);
          if (x < plotX - 0.1 || x > plotX + width + 0.1) return;
          if (!this._shouldShowLabel(interval, index, String(tick))) return;

          let labelText = formatAxisLabel(tick);

          if (axisLabel.formatter) {
            if (typeof axisLabel.formatter === 'string') {
              labelText = axisLabel.formatter.replace('{value}', labelText);
            } else if (typeof axisLabel.formatter === 'function') {
              labelText = axisLabel.formatter(tick, index);
            }
          }

          if (maxWidth) {
            labelText = this._wrapText(
              labelText,
              maxWidth,
              fontSize,
              fontFamily,
              overflow,
            );
          }

          let textAlign: any = 'center';
          let textBaseline: any = 'top';
          let transform: any = undefined;
          let shapeX = x;
          let shapeY = plotY + height + 10;

          if (rotate) {
            textAlign = rotate > 0 ? 'left' : 'right';
            textBaseline = 'middle';
            shapeX = 0;
            shapeY = 0;
            transform = {
              x: x,
              y: plotY + height + 10,
              rotation: (rotate * Math.PI) / 180,
            };
          }

          const text = new Text({
            shape: {
              x: shapeX,
              y: shapeY,
              text: labelText,
            },
            style: {
              fontSize,
              fill: color,
              textAlign,
              textBaseline,
              fontFamily,
            },
            z: Z_AXIS,
            transform,
          });
          this._root.add(text);
        });
      }
    }

    // Y axis
    if (yAxis?.show !== false) {
      const yAxisLine = new Line({
        shape: {
          x1: plotX + 0.5,
          y1: plotY,
          x2: plotX + 0.5,
          y2: plotY + height,
        },
        style: {
          stroke: this.getThemeConfig().axisLineColor, // Use theme color
          lineWidth: 1,
        },
        z: Z_AXIS,
      });
      this._root.add(yAxisLine);

      if (yAxis?.splitLine?.show) {
        if (scales?.y && yAxis.type === 'value') {
          const domain = scales.y.domain();
          const tickCount = yAxis.splitNumber ?? 10;
          const ticks = calculateNiceTicks(domain[0], domain[1], tickCount);

          ticks.forEach((tick) => {
            const y = scales.y!(tick);
            // Skip if out of range
            if (y < plotY - 0.1 || y > plotY + height + 0.1) return;

            const line = new Line({
              shape: {
                x1: plotX,
                y1: y,
                x2: plotX + width,
                y2: y,
              },
              style: {
                stroke:
                  yAxis.splitLine.lineStyle?.color || this.getThemeConfig().gridColor,
                lineWidth: yAxis.splitLine.lineStyle?.width || 1,
                lineDash:
                  yAxis.splitLine.lineStyle?.type === 'solid'
                    ? undefined
                    : yAxis.splitLine.lineStyle?.type === 'dashed' ||
                      !yAxis.splitLine.lineStyle?.type
                      ? [4, 4]
                      : undefined,
              },
              z: Z_AXIS - 0.5,
            });
            this._root.add(line);
          });
        } else {
          // Simplified: Draw 5 grid lines if not provided
          const tickCount = yAxis.splitNumber ?? 10;
          for (let i = 0; i <= tickCount; i++) {
            const y = plotY + height - (i / tickCount) * height;
            const line = new Line({
              shape: {
                x1: plotX,
                y1: y,
                x2: plotX + width,
                y2: y,
              },
              style: {
                stroke:
                  yAxis.splitLine.lineStyle?.color || this.getThemeConfig().gridColor,
                lineWidth: yAxis.splitLine.lineStyle?.width || 1,
                lineDash:
                  yAxis.splitLine.lineStyle?.type === 'solid'
                    ? undefined
                    : yAxis.splitLine.lineStyle?.type === 'dashed' ||
                      !yAxis.splitLine.lineStyle?.type
                      ? [4, 4]
                      : undefined,
              },
              z: Z_AXIS - 0.5, // Below axis line
            });
            this._root.add(line);
          }
        }
      }

      if (yAxis?.data && yAxis.data.length > 0) {
        const yRange = yAxis.inverse
          ? [plotY, plotY + height]
          : [plotY + height, plotY];
        const yScale = scales?.y || createOrdinalScale(yAxis.data, yRange);
        const axisLabel = yAxis.axisLabel || {};
        const rotate = axisLabel.rotate || 0;
        const maxWidth = axisLabel.width;
        const overflow = axisLabel.overflow || 'break';
        const fontSize = axisLabel.fontSize || this.getThemeConfig().fontSize;
        const fontFamily = this.getThemeConfig().fontFamily;
        const color = axisLabel.color || this.getThemeConfig().axisLabelColor;
        const interval = axisLabel.interval;

        yAxis.data.forEach((label: any, index: number) => {
          if (!this._shouldShowLabel(interval, index, String(label))) return;

          const y = yScale(label);
          let labelText = String(label);

          if (axisLabel.formatter) {
            if (typeof axisLabel.formatter === 'string') {
              labelText = axisLabel.formatter.replace('{value}', labelText);
            } else if (typeof axisLabel.formatter === 'function') {
              labelText = axisLabel.formatter(label, index);
            }
          }

          if (maxWidth) {
            labelText = this._wrapText(
              labelText,
              maxWidth,
              fontSize,
              fontFamily,
              overflow,
            );
          }

          let textAlign: any = 'right';
          let textBaseline: any = 'middle';
          let transform: any = undefined;
          let shapeX = plotX - 10;
          let shapeY = y;

          if (rotate) {
            shapeX = 0;
            shapeY = 0;
            transform = {
              x: plotX - 10,
              y: y,
              rotation: (rotate * Math.PI) / 180,
            };
          }

          const text = new Text({
            shape: {
              x: shapeX,
              y: shapeY,
              text: labelText,
            },
            style: {
              fontSize,
              fill: color,
              textAlign,
              textBaseline,
              fontFamily,
            },
            z: Z_AXIS,
            transform,
          });
          this._root.add(text);
        });
      } else if (yAxis?.type === 'value' && scales?.y) {
        const domain = scales.y.domain();
        const tickCount = yAxis.splitNumber ?? 10;
        const axisLabel = yAxis.axisLabel || {};
        const rotate = axisLabel.rotate || 0;
        const maxWidth = axisLabel.width;
        const overflow = axisLabel.overflow || 'break';
        const fontSize = axisLabel.fontSize || this.getThemeConfig().fontSize;
        const fontFamily = this.getThemeConfig().fontFamily;
        const color = axisLabel.color || this.getThemeConfig().axisLabelColor;

        const ticks = calculateNiceTicks(domain[0], domain[1], tickCount);
        const interval = axisLabel.interval;

        ticks.forEach((tick, index) => {
          const y = scales.y!(tick);
          if (y < plotY - 0.1 || y > plotY + height + 0.1) return;
          if (!this._shouldShowLabel(interval, index, String(tick))) return;

          let labelText = formatAxisLabel(tick);

          if (axisLabel.formatter) {
            if (typeof axisLabel.formatter === 'string') {
              labelText = axisLabel.formatter.replace('{value}', labelText);
            } else if (typeof axisLabel.formatter === 'function') {
              labelText = axisLabel.formatter(tick, index);
            }
          }

          if (maxWidth) {
            labelText = this._wrapText(
              labelText,
              maxWidth,
              fontSize,
              fontFamily,
              overflow,
            );
          }

          let textAlign: any = 'right';
          let textBaseline: any = 'middle';
          let transform: any = undefined;
          let shapeX = plotX - 10;
          let shapeY = y;

          if (rotate) {
            shapeX = 0;
            shapeY = 0;
            transform = {
              x: plotX - 10,
              y: y,
              rotation: (rotate * Math.PI) / 180,
            };
          }

          const text = new Text({
            shape: {
              x: shapeX,
              y: shapeY,
              text: labelText,
            },
            style: {
              fontSize,
              fill: color,
              textAlign,
              textBaseline,
              fontFamily,
            },
            z: Z_AXIS,
            transform,
          });
          this._root.add(text);
        });
      }
    }
  }

  private _wrapText(
    text: string,
    width: number,
    fontSize?: number,
    fontFamily?: string,
    overflow: string = 'break',
  ): string {
    if (!width || width <= 0) return text;
    if (overflow === 'none') return text;

    // Check for browser environment
    if (typeof document === 'undefined') return text;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return text;

    const fs = fontSize ?? this.getThemeConfig().fontSize;
    const ff = fontFamily ?? this.getThemeConfig().fontFamily;
    ctx.font = `${fs}px ${ff}`;

    if (overflow === 'truncate') {
      if (ctx.measureText(text).width <= width) return text;
      let len = text.length;
      while (len > 0) {
        const sub = text.substring(0, len) + '...';
        if (ctx.measureText(sub).width <= width) return sub;
        len--;
      }
      return '...';
    }

    // Break
    let line = '';
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const testLine = line + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width && i > 0) {
        result += line + '\n';
        line = char;
      } else {
        line = testLine;
      }
    }
    result += line;
    return result;
  }

  protected _render(): void {
    this._root.removeAll();
    this._mountTitle();
    // To be implemented by subclasses
  }

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

  on(event: string, handler: (event: ChartEvent) => void): void {
    this._renderer.on(event, handler as any);
  }

  off(event?: string, handler?: (event: ChartEvent) => void): void {
    this._renderer.off(event, handler as any);
  }

  once(event: string, handler: (event: ChartEvent) => void): void {
    const onceHandler = (e: ChartEvent) => {
      handler(e);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }

  trigger(eventName: string, data?: any): void {
    // Trigger internal event system (for chart.on)
    this._renderer.trigger(eventName, data);

    // Also dispatch to DOM for external listeners
    if (typeof CustomEvent !== 'undefined') {
      const event = new CustomEvent(eventName, { detail: data });
      this._renderer.getDom().dispatchEvent(event);
    }
  }

  dispose(): void {
    if (this._legend) {
      this._legend.dispose();
    }
    if (this._tooltip) {
      this._tooltip.dispose();
    }
    this.stopAnimation();
    this.stopResponsive();
    this.unmount();
    this._renderer.dispose();
    this._animator.stopAll();
  }

  clear(): this {
    this._root.removeAll();
    this._option = {};
    return this;
  }

  isDisposed(): boolean {
    return this._renderer.isDisposed();
  }

  getDom(): HTMLElement {
    return this._renderer.getDom();
  }

  getRenderer(): Renderer {
    return this._renderer;
  }

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
      locale: this.getLocale(),
    };
  }

  batchUpdate(callback: (chart: this) => void): this {
    const originalOption = { ...this._option };
    callback(this);

    // Only render if options changed
    if (JSON.stringify(this._option) !== JSON.stringify(originalOption)) {
      this._render();
    }

    return this;
  }

  convertFromPixel(coord: [number, number]): [number, number] {
    // Base implementation - to be overridden by subclasses
    return coord;
  }

  convertToPixel(coord: [number, number]): [number, number] {
    // Base implementation - to be overridden by subclasses
    return coord;
  }

  showLoading(loadingOpts?: {
    text?: string;
    color?: string;
    textColor?: string;
    maskColor?: string;
    zlevel?: number;
  }): void {
    // Implementation depends on Renderer capabilities
    const opts = {
      text: loadingOpts?.text || this.t('data.loading', 'Loading...'),
      color: loadingOpts?.color || '#5470c6',
      textColor: loadingOpts?.textColor || this.getThemeConfig().textColor,
      maskColor: loadingOpts?.maskColor || 'rgba(255, 255, 255, 0.8)',
      zlevel: loadingOpts?.zlevel || 9999,
    };

    // Dispatch loading event
    this.trigger('loading', opts);
  }

  hideLoading(): void {
    this.trigger('loading', { show: false });
  }

  getBoundingRect(): DOMRect {
    return this._renderer.getDom().getBoundingClientRect();
  }

  makeResponsive(): this {
    const resizeObserver = new ResizeObserver(() => {
      this.resize();
    });

    resizeObserver.observe(this._renderer.getDom());

    // Store observer for cleanup
    (this as any)._resizeObserver = resizeObserver;

    return this;
  }

  stopResponsive(): this {
    if ((this as any)._resizeObserver) {
      (this as any)._resizeObserver.disconnect();
      delete (this as any)._resizeObserver;
    }
    return this;
  }

  protected _parseSize(
    size: string | number | undefined,
    defaultSize: number,
  ): number {
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

  protected _getSeriesColor(index: number): string {
    const config = this._renderer.getThemeConfig();
    const colors = config.seriesColors || [];
    return colors[index % colors.length];
  }

  protected _getSeriesColorWithOpacity(
    index: number,
    opacity: number = 1,
  ): string {
    const color = this._getSeriesColor(index);

    // Convert hex to rgba
    if (color.startsWith('#')) {
      return toRgbaWithOpacity(color, opacity);
    }

    return color;
  }

  protected _formatNumber(value: number, precision: number = 2): string {
    return value.toLocaleString(this.getLocale(), {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }

  protected _formatDate(date: Date, format: string = 'short'): string {
    return date.toLocaleDateString(this.getLocale(), {
      dateStyle: format as any,
    });
  }

  protected _formatTooltip(template: string, params: any): string {
    const a = params.seriesName ?? '';
    const b = params.name ?? '';
    const c = params.value ?? '';
    const d = params.percent ?? '';
    const marker = params.marker ?? '';
    return String(template)
      .replace(/\{a\}/g, String(a))
      .replace(/\{b\}/g, String(b))
      .replace(/\{c\}/g, String(c))
      .replace(/\{d\}/g, String(d))
      .replace(/\{marker\}/g, String(marker))
      .replace(/\{icon\}/g, String(marker));
  }

  protected _mountLegend(items: any[]): void {
    const option = this._option;
    if (option.legend?.show === false) return;
    const theme = this.getThemeConfig();

    if (this._legend) {
      this._legend.dispose();
      this._root.remove(this._legend);
    }

    const posLeft = (option.legend as any)?.left;
    const posRight = (option.legend as any)?.right;
    const posTop = (option.legend as any)?.top;
    const posBottom = (option.legend as any)?.bottom;

    const legend = new Legend({
      orient: option.legend?.orient ?? 'vertical',
      x: option.legend?.left,
      y: option.legend?.top,
      right: posRight,
      bottom: posBottom,
      width: option.legend?.width,
      height: option.legend?.height,
      selectedMode: option.legend?.selectedMode ?? 'multiple',
      renderMode: option.legend?.renderMode,
      formatter: option.legend?.formatter,
      tableHead: option.legend?.tableHead,
      itemMaxWidth: option.legend?.itemMaxWidth,
      align: option.legend?.align,
      textColor: theme.legendTextColor,
      fontSize: option.legend?.fontSize ?? theme.fontSize,
      backgroundColor: option.legend?.backgroundColor ?? theme.backgroundColor,
      onSelect: (name: string, selected: boolean) => {
        if (this._legend) {
          const currentSelected = this._legend.getSelected();
          this._legendSelected = new Set(currentSelected);

          if (option.legend?.selectedMode === 'single') {
            if (currentSelected.length === 1) {
              this.beginAnimateShow(currentSelected[0]);
            }
            // If length != 1 (e.g. 0 or >1), do not suppress animation.
            // This allows "restore all" to animate properly.
          } else {
            if (selected) {
              this.beginAnimateShow(name);
            } else {
              this.beginSilentHide();
            }
          }
        } else {
          if (selected) this._legendSelected.add(name);
          else this._legendSelected.delete(name);
        }

        this._render();
        this.endAnimateControl();
      },
      onHover: (name: string, hovered: boolean) => {
        this._onLegendHover(name, hovered);
      },
    } as any);

    legend.setContainer(this._width, this._height);
    legend.setDomContainer(this.getDom());

    // Init default selection if not initialized
    let finalItems = items;
    if (option.legend?.data && Array.isArray(option.legend.data)) {
      finalItems = option.legend.data.map((dataItem: any) => {
        const name = typeof dataItem === 'string' ? dataItem : dataItem.name;
        const seriesItem = items.find((i) => i.name === name);

        const customItem = typeof dataItem === 'object' ? dataItem : {};

        if (seriesItem) {
          return {
            ...seriesItem,
            icon: customItem.icon || seriesItem.icon,
            textStyle: customItem.textStyle
          };
        }

        return {
          name: name,
          color: this.getThemeConfig().borderColor,
          icon: customItem.icon || option.legend?.icon || 'rect',
          textColor: this.getThemeConfig().legendTextColor,
          textStyle: customItem.textStyle
        };
      });
    }

    if (!this._hasInitLegend) {
      finalItems.forEach((item) => this._legendSelected.add(item.name));
      this._hasInitLegend = true;
    }

    legend.setItems(finalItems, Array.from(this._legendSelected));

    this._legend = legend;
    this._root.add(legend);
  }

  protected _mountTitle(): void {
    const option = this._option;
    if (option.title?.show === false) return;
    if (!option.title) return;
    const theme = this.getThemeConfig();
    const titleOption = {
      ...option.title,
      textStyle: {
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize + 6,
        ...(option.title.textStyle || {}),
      },
      subtextStyle: {
        color: theme.axisLabelColor,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        ...(option.title.subtextStyle || {}),
      },
    };

    if (!this._title) {
      this._title = new Title(titleOption);
    } else {
      this._title.updateOption(titleOption);
    }

    this._title.setContainer(this._width, this._height);
    this._root.add(this._title);
  }

  protected _onLegendHover(name: string, hovered: boolean): void {
    // To be implemented by subclasses
  }

  protected _getDataValue(item: any): number | undefined {
    if (typeof item === 'number') return item;
    if (Array.isArray(item)) return item[1]; // Assume [x, y]
    if (typeof item === 'object' && item !== null) {
      if (typeof item.value === 'number') return item.value;
      if (Array.isArray(item.value)) return item.value[1];
    }
    return undefined;
  }

  protected _getTooltipMarker(color: string): string {
    return `<span style="display:inline-block;margin-right:4px;border-radius:4px;width:10px;height:10px;background-color:${color};"></span>`;
  }

  protected _generateTooltipContent(params: any): string {
    const formatter = this._option.tooltip?.formatter;

    // Support ECharts-like formatter function
    if (typeof formatter === 'function') {
      return formatter(params);
    }

    // Support ECharts-like string template (basic support)
    if (typeof formatter === 'string') {
      if (!Array.isArray(params)) {
        return this._formatTooltip(formatter, params);
      }
    }

    // Unified HTML generator for both Single and Multi items
    const paramsList = Array.isArray(params) ? params : [params];
    if (paramsList.length === 0) return '';

    let html = '';

    // 1. Generate Header Title
    let headerTitle = '';
    const firstParam = paramsList[0];
    if (firstParam.seriesType === 'pie') {
      headerTitle = firstParam.seriesName;
    } else {
      headerTitle = firstParam.name;
    }

    if (headerTitle) {
      html += `<div style="margin-bottom:8px;font-weight:bold;color:#fff;">${headerTitle}</div>`;
    }

    // 2. Generate Items
    paramsList.forEach((param) => {
      let rowLabel = '';
      if (param.seriesType === 'pie') {
        rowLabel = param.name;
      } else {
        rowLabel = param.seriesName || param.name;
      }

      html += this._generateSingleItemHtml(param, rowLabel);
    });

    return html;
  }

  private _generateSingleItemHtml(param: any, titleOverride?: string): string {
    const color = param.color;
    const value = param.value;

    // Format value safely
    let displayValue = '';
    if (Array.isArray(value)) {
      displayValue = value.join(', ');
    } else if (typeof value === 'number') {
      displayValue = this._formatNumber(value);
    } else if (value !== undefined && value !== null) {
      displayValue = String(value);
    } else {
      displayValue = '-';
    }

    const percent =
      param.percent !== undefined ? ` (${param.percent.toFixed(2)}%)` : '';
    const marker = param.marker || (color ? this._getTooltipMarker(color) : '');

    // Determine title
    const title =
      titleOverride !== undefined
        ? titleOverride
        : param.componentType === 'series'
          ? param.seriesName || param.name
          : param.name || param.seriesName;

    // Default styles
    const defaultStyles = {
      // Containers
      row: 'display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#fff;line-height:20px;min-width:120px;',
      blockContainer:
        'font-size:12px;color:#fff;line-height:20px;min-width:120px;margin-bottom:8px;',
      labelContainer: 'display:flex;align-items:center;',

      // Elements
      label: 'margin-right:16px;',
      value: 'font-weight:bold;white-space:nowrap;',

      // Rich specific
      richRow: 'display:flex;justify-content:space-between;margin-top:2px;',
      richLabel: 'color:#ccc;margin-right:16px;',
      richValue: 'font-weight:bold;',
    };

    // Merge with user config
    const customStyles = this._option.tooltip?.htmlStyles || {};
    const styles = { ...defaultStyles, ...customStyles };

    // Check layout configuration
    const layout = this._option.tooltip?.layout || 'horizontal';
    const dataItem = param.data;

    // Determine if we should use rich layout (either configured or data has details)
    const isRich =
      layout === 'rich' || (typeof dataItem === 'object' && dataItem?.detail);

    // 1. Rich Layout
    if (isRich && typeof dataItem === 'object' && dataItem.detail) {
      let detailHtml = '';
      if (Array.isArray(dataItem.detail)) {
        detailHtml = dataItem.detail
          .map(
            (item: { label: string; value: string }) => `
          <div style="${styles.richRow}">
            <span style="${styles.richLabel}">${item.label}</span>
            <span style="${styles.richValue}">${item.value}</span>
          </div>
        `,
          )
          .join('');
      }

      return `
        <div style="${styles.blockContainer}">
          <div style="${styles.labelContainer}margin-bottom:4px;">
            ${marker}
            <span style="font-weight:bold;">${title}</span>
          </div>
          <div style="padding-left: 14px;">
            ${detailHtml}
          </div>
        </div>
      `;
    }

    // 2. Vertical Layout (Block style but with single value)
    if (layout === 'vertical') {
      return `
        <div style="${styles.blockContainer}">
          <div style="${styles.labelContainer}">
            ${marker}
            <span>${title}</span>
          </div>
          <div style="padding-left: 14px;font-weight:bold;">
            ${displayValue}${percent}
          </div>
        </div>
      `;
    }

    // 3. Default Horizontal Layout
    return `
      <div style="${styles.row}">
        <div style="${styles.labelContainer}">
          ${marker}
          <span style="${styles.label}">${title}</span>
        </div>
        <span style="${styles.value}">${displayValue}${percent}</span>
      </div>
    `;
  }
}
