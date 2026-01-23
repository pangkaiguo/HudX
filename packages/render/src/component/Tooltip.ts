/**
 * Tooltip - DOM-based tooltip component
 */

import { ThemeManager } from '../theme/ThemeManager';
import type { ChartEvent, BoundingRect } from '../types';
import {
  TOOLTIP_DEFAULT_BORDER_RADIUS,
  DEFAULT_TOOLTIP_LINE_HEIGHT,
  DEFAULT_TOOLTIP_PADDING,
  TOOLTIP_DEFAULT_PADDING_PX,
  TOOLTIP_DOM_Z_INDEX,
  TOOLTIP_TRANSITION_BEZIER,
} from '../constants';

export interface TooltipOption {
  show?: boolean;
  trigger?: 'item' | 'axis' | 'none';
  formatter?: string | ((params: ChartEvent | ChartEvent[]) => string);
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  padding?: number | number[];
  textStyle?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    [key: string]: unknown;
  };
  extraCssText?: string;
  className?: string;
  appendToBody?: boolean;
  confine?: boolean;
  transitionDuration?: number;
  position?:
  | string
  | number[]
  | ((
    point: number[],
    params: ChartEvent | ChartEvent[],
    dom: HTMLElement,
    rect: BoundingRect,
    size: { contentSize: [number, number]; viewSize: [number, number] },
  ) => number[]);
  showContent?: boolean;
  alwaysShowContent?: boolean;
  triggerOn?: 'mousemove' | 'click' | 'mousemove|click' | 'none';
  showDelay?: number;
  hideDelay?: number;
  enterable?: boolean;
  renderMode?: 'html' | 'richText';
  order?: 'seriesAsc' | 'seriesDesc' | 'valueAsc' | 'valueDesc';
  [key: string]: any;
}

export default class Tooltip {
  private _option: TooltipOption;
  private _el: HTMLElement;
  private _container: HTMLElement | null = null;
  private _visible: boolean = false;
  private _hideTimer: any = null;
  private _showTimer: any = null;
  private _lastWidth: number = 0;
  private _lastHeight: number = 0;

  constructor(option: TooltipOption = {}) {
    const theme = ThemeManager.getTheme();
    this._option = {
      show: true,
      backgroundColor: theme.tooltipBackgroundColor,
      borderColor: theme.borderColor,
      borderWidth: 0,
      padding: DEFAULT_TOOLTIP_PADDING,
      textStyle: {
        color: theme.tooltipTextColor,
        fontSize: theme.fontSize,
        fontFamily: theme.fontFamily,
        lineHeight: DEFAULT_TOOLTIP_LINE_HEIGHT,
      },
      transitionDuration: 0.4,
      confine: true,
      showContent: true,
      triggerOn: 'mousemove|click',
      enterable: false,
      renderMode: 'html',
      ...option,
    };

    this._el = document.createElement('div');
    this._initStyle();
  }

  private _initStyle(): void {
    const s = this._el.style;
    s.position = 'absolute';
    s.display = 'none';
    s.borderStyle = 'solid';
    s.whiteSpace = 'nowrap';
    s.zIndex = String(TOOLTIP_DOM_Z_INDEX);
    s.boxShadow = `${ThemeManager.getTheme().shadowColor} 1px 2px 10px`;
    s.boxSizing = 'border-box';
    s.pointerEvents = this._option.enterable ? 'auto' : 'none';

    s.transition = `left ${this._option.transitionDuration}s ${TOOLTIP_TRANSITION_BEZIER} 0s, top ${this._option.transitionDuration}s ${TOOLTIP_TRANSITION_BEZIER} 0s`;

    this.updateStyle();
  }

  updateStyle(): void {
    const opt = this._option;
    const theme = ThemeManager.getTheme();
    const s = this._el.style;

    s.backgroundColor = String(opt.backgroundColor ?? theme.tooltipBackgroundColor);
    s.borderColor = String(opt.borderColor ?? theme.borderColor);
    s.borderWidth = (opt.borderWidth || 0) + 'px';

    const padding = opt.padding;
    if (Array.isArray(padding)) {
      s.padding = padding.map((p) => p + 'px').join(' ');
    } else {
      s.padding = (padding || TOOLTIP_DEFAULT_PADDING_PX) + 'px';
    }

    s.color = String(opt.textStyle?.color ?? theme.tooltipTextColor);
    s.fontSize = String(opt.textStyle?.fontSize ?? theme.fontSize) + 'px';
    s.fontFamily = String(opt.textStyle?.fontFamily ?? theme.fontFamily);

    if (opt.textStyle) {
      Object.keys(opt.textStyle).forEach((key) => {
        if (key !== 'color' && key !== 'fontSize' && key !== 'fontFamily') {
          let val = opt.textStyle![key];
          if (key === 'lineHeight' && typeof val === 'number') {
            val = val + 'px';
          }
          (s as any)[key] = val;
        }
      });
    }

    s.borderRadius = `${TOOLTIP_DEFAULT_BORDER_RADIUS}px`;

    if (opt.extraCssText) {
      this._el.style.cssText += opt.extraCssText;
    }

    if (opt.className) {
      this._el.className = opt.className;
    }

    s.pointerEvents = opt.enterable ? 'auto' : 'none';
  }

  setOption(option: TooltipOption): void {
    this._option = { ...this._option, ...option };
    this.updateStyle();
  }

  setContainer(container: HTMLElement): void {
    this._container = container;

    if (!this._option.appendToBody) {
      const style = window.getComputedStyle(container);
      if (style.position === 'static') {
        container.style.position = 'relative';
      }
    }

    const parent = this._option.appendToBody ? document.body : this._container;

    if (this._el.parentNode !== parent) {
      if (this._el.parentNode) {
        this._el.parentNode.removeChild(this._el);
      }
      parent.appendChild(this._el);
    }
  }

  show(
    x: number,
    y: number,
    content: string | HTMLElement,
    params?: ChartEvent | ChartEvent[],
    targetRect?: BoundingRect,
  ): void {
    if (!this._option.showContent || !this._container) return;

    if (this._showTimer) clearTimeout(this._showTimer);
    if (this._hideTimer) clearTimeout(this._hideTimer);

    const show = () => {
      this._updateContent(content);

      this._el.style.display = 'block';
      this._el.style.visibility = 'hidden';

      const currentWidth = this._el.offsetWidth;
      const currentHeight = this._el.offsetHeight;

      const sizeChanged =
        currentWidth !== this._lastWidth || currentHeight !== this._lastHeight;
      this._lastWidth = currentWidth;
      this._lastHeight = currentHeight;

      if (sizeChanged) {
        this._el.style.transition = 'none';
      } else {
        this._el.style.transition = `left ${this._option.transitionDuration}s ${TOOLTIP_TRANSITION_BEZIER} 0s, top ${this._option.transitionDuration}s ${TOOLTIP_TRANSITION_BEZIER} 0s`;
      }

      this._updatePosition(x, y, params, targetRect);

      this._el.style.visibility = 'visible';
      this._visible = true;

      if (sizeChanged) {
        requestAnimationFrame(() => {
          this._el.style.transition = `left ${this._option.transitionDuration}s ${TOOLTIP_TRANSITION_BEZIER} 0s, top ${this._option.transitionDuration}s ${TOOLTIP_TRANSITION_BEZIER} 0s`;
        });
      }
    };

    if (this._option.showDelay && this._option.showDelay > 0) {
      this._showTimer = setTimeout(show, this._option.showDelay);
    } else {
      show();
    }
  }

  private _updateContent(content: string | HTMLElement): void {
    if (typeof content === 'string') {
      this._el.innerHTML = content;
    } else {
      this._el.innerHTML = '';
      this._el.appendChild(content);
    }
  }

  private _updatePosition(
    x: number,
    y: number,
    params?: any,
    targetRect?: any,
  ): void {
    const elWidth = this._el.offsetWidth;
    const elHeight = this._el.offsetHeight;
    const containerRect = this._container!.getBoundingClientRect();

    let viewWidth = containerRect.width;
    let viewHeight = containerRect.height;

    let left = x;
    let top = y;

    const pos = this._option.position;
    let customPosition = false;

    if (pos) {
      if (Array.isArray(pos)) {
        left = this._parsePercent(pos[0], viewWidth);
        top = this._parsePercent(pos[1], viewHeight);
        customPosition = true;
      } else if (typeof pos === 'function') {
        const size = {
          contentSize: [elWidth, elHeight] as [number, number],
          viewSize: [viewWidth, viewHeight] as [number, number],
        };
        const result = pos([x, y], params!, this._el, targetRect!, size);
        if (Array.isArray(result)) {
          left = this._parsePercent(result[0], viewWidth);
          top = this._parsePercent(result[1], viewHeight);
          customPosition = true;
        }
      } else if (typeof pos === 'string') {
        const parts = pos.split(' ');
        if (parts.length === 2) {
          left = this._parsePercent(parts[0], viewWidth);
          top = this._parsePercent(parts[1], viewHeight);
          customPosition = true;
        } else if (targetRect) {
          if (pos === 'top') {
            left = targetRect.x + targetRect.width / 2 - elWidth / 2;
            top = targetRect.y - elHeight - 5;
            customPosition = true;
          } else if (pos === 'bottom') {
            left = targetRect.x + targetRect.width / 2 - elWidth / 2;
            top = targetRect.y + targetRect.height + 5;
            customPosition = true;
          } else if (pos === 'left') {
            left = targetRect.x - elWidth - 5;
            top = targetRect.y + targetRect.height / 2 - elHeight / 2;
            customPosition = true;
          } else if (pos === 'right') {
            left = targetRect.x + targetRect.width + 5;
            top = targetRect.y + targetRect.height / 2 - elHeight / 2;
            customPosition = true;
          } else if (pos === 'inside') {
            left = targetRect.x + targetRect.width / 2 - elWidth / 2;
            top = targetRect.y + targetRect.height / 2 - elHeight / 2;
            customPosition = true;
          }
        }
      }
    }

    if (!customPosition) {
      const offset = 15;
      left += offset;
      top += offset;
    }

    if (this._option.appendToBody) {
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const chartRect = this._container!.getBoundingClientRect();

      if (customPosition) {
        left += chartRect.left + scrollX;
        top += chartRect.top + scrollY;
      } else {
        const chartRelativeLeft = customPosition ? left : x + 15;
        const chartRelativeTop = customPosition ? top : y + 15;

        left = chartRelativeLeft + chartRect.left + scrollX;
        top = chartRelativeTop + chartRect.top + scrollY;
      }

      viewWidth = document.documentElement.clientWidth;
      viewHeight = document.documentElement.clientHeight;
    }

    if (this._option.confine) {
      if (
        left + elWidth >
        (this._option.appendToBody ? viewWidth + window.scrollX : viewWidth)
      ) {
        const chartRect = this._container!.getBoundingClientRect();
        left =
          (this._option.appendToBody
            ? x + chartRect.left + window.scrollX
            : x) -
          elWidth -
          15;
        if (customPosition && Array.isArray(pos)) {
          left = Math.min(
            left,
            (this._option.appendToBody
              ? viewWidth + window.scrollX
              : viewWidth) - elWidth,
          );
        }
      }

      if (
        top + elHeight >
        (this._option.appendToBody ? viewHeight + window.scrollY : viewHeight)
      ) {
        const chartRect = this._container!.getBoundingClientRect();
        top =
          (this._option.appendToBody ? y + chartRect.top + window.scrollY : y) -
          elHeight -
          15;
        if (customPosition && Array.isArray(pos)) {
          top = Math.min(
            top,
            (this._option.appendToBody
              ? viewHeight + window.scrollY
              : viewHeight) - elHeight,
          );
        }
      }

      if (left < (this._option.appendToBody ? window.scrollX : 0)) {
        left = (this._option.appendToBody ? window.scrollX : 0) + 10;
      }

      if (top < (this._option.appendToBody ? window.scrollY : 0)) {
        top = (this._option.appendToBody ? window.scrollY : 0) + 10;
      }
    }

    this._el.style.left = left + 'px';
    this._el.style.top = top + 'px';
  }

  private _parsePercent(value: number | string, total: number): number {
    if (typeof value === 'string') {
      if (value.endsWith('%')) {
        return (parseFloat(value) / 100) * total;
      }
      return parseFloat(value);
    }
    return value;
  }

  hide(): void {
    if (!this._visible) return;

    if (this._showTimer) clearTimeout(this._showTimer);

    const hide = () => {
      this._el.style.display = 'none';
      this._visible = false;
    };

    if (this._option.hideDelay && this._option.hideDelay > 0) {
      this._hideTimer = setTimeout(hide, this._option.hideDelay);
    } else {
      hide();
    }
  }

  isVisible(): boolean {
    return this._visible;
  }

  dispose(): void {
    if (this._el.parentNode) {
      this._el.parentNode.removeChild(this._el);
    }
  }
}
