/**
 * Tooltip - DOM-based tooltip component
 */

export interface TooltipOption {
  show?: boolean;
  trigger?: 'item' | 'axis' | 'none';
  formatter?: string | ((params: any) => string);
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  padding?: number | number[];
  textStyle?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    [key: string]: any;
  };
  extraCssText?: string;
  className?: string;
  appendToBody?: boolean;
  confine?: boolean;
  transitionDuration?: number;
  position?: string | number[] | ((point: number[], params: any, dom: HTMLElement, rect: any, size: any) => number[]);
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

  constructor(option: TooltipOption = {}) {
    this._option = {
      show: true,
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
      borderColor: '#333',
      borderWidth: 0,
      padding: 5,
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      transitionDuration: 0.4,
      confine: true,
      showContent: true,
      triggerOn: 'mousemove|click',
      enterable: false,
      renderMode: 'html',
      ...option
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
    s.zIndex = '9999999';
    s.boxShadow = 'rgba(0, 0, 0, 0.2) 1px 2px 10px';
    s.pointerEvents = this._option.enterable ? 'auto' : 'none';

    // Initial transition
    s.transition = `left ${this._option.transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1) 0s, top ${this._option.transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1) 0s`;

    this.updateStyle();
  }

  updateStyle(): void {
    const opt = this._option;
    const s = this._el.style;

    s.backgroundColor = opt.backgroundColor || 'rgba(50, 50, 50, 0.7)';
    s.borderColor = opt.borderColor || '#333';
    s.borderWidth = (opt.borderWidth || 0) + 'px';

    const padding = opt.padding;
    if (Array.isArray(padding)) {
      s.padding = padding.map(p => p + 'px').join(' ');
    } else {
      s.padding = (padding || 5) + 'px';
    }

    s.color = opt.textStyle?.color || '#fff';
    s.fontSize = (opt.textStyle?.fontSize || 14) + 'px';
    s.fontFamily = opt.textStyle?.fontFamily || 'sans-serif';

    // Apply other textStyle properties
    if (opt.textStyle) {
      Object.keys(opt.textStyle).forEach(key => {
        if (key !== 'color' && key !== 'fontSize' && key !== 'fontFamily') {
          (s as any)[key] = opt.textStyle![key];
        }
      });
    }

    s.borderRadius = '4px';

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
    if (this._option.appendToBody) {
      this._container = document.body;
    } else {
      this._container = container;
      // Ensure container is positioned so absolute tooltip works relative to it
      const style = window.getComputedStyle(container);
      if (style.position === 'static') {
        container.style.position = 'relative';
      }
    }

    if (this._el.parentNode !== this._container) {
      if (this._el.parentNode) {
        this._el.parentNode.removeChild(this._el);
      }
      this._container.appendChild(this._el);
    }
  }

  show(x: number, y: number, content: string | HTMLElement, params?: any, targetRect?: any): void {
    if (!this._option.showContent || !this._container) return;

    if (this._showTimer) clearTimeout(this._showTimer);
    if (this._hideTimer) clearTimeout(this._hideTimer);

    const show = () => {
      this._updateContent(content);
      this._updatePosition(x, y, params, targetRect);
      this._el.style.display = 'block';
      // Force reflow for transition?
      // requestAnimationFrame(() => {
      //   this._el.style.opacity = '1';
      // });
      this._visible = true;
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

  private _updatePosition(x: number, y: number, params?: any, targetRect?: any): void {
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
        const size = { contentSize: [elWidth, elHeight], viewSize: [viewWidth, viewHeight] };
        const result = pos([x, y], params, this._el, targetRect, size);
        if (Array.isArray(result)) {
          left = this._parsePercent(result[0], viewWidth);
          top = this._parsePercent(result[1], viewHeight);
          customPosition = true;
        }
      } else if (typeof pos === 'string') {
        // Support 'top', 'left', 'right', 'bottom', 'inside' relative to targetRect if available
        // Or '10% 10%'
        const parts = pos.split(' ');
        if (parts.length === 2) {
          left = this._parsePercent(parts[0], viewWidth);
          top = this._parsePercent(parts[1], viewHeight);
          customPosition = true;
        } else if (targetRect) {
          // Relative to target element
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
      // Default mouse offset
      const offset = 15;
      left += offset;
      top += offset;
    }

    if (this._option.appendToBody) {
      // If appended to body, x/y are likely client coordinates (from event)
      // We need to adjust for scroll
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // But x/y passed to show() are usually relative to chart container (offsetX/Y)
      // So we need to convert them to page coordinates
      // NOTE: If customPosition was used (absolute coords in chart), we need to add chart offset

      if (customPosition) {
        // left/top are relative to chart container (0,0 is top-left of chart)
        left += containerRect.left + scrollX;
        top += containerRect.top + scrollY;
      } else {
        // left/top are based on x/y which are already chart-relative, plus offset
        // We need to shift by container position
        left = left + containerRect.left + scrollX - x + x; // (x is already in left)
        // Simplified: left is relative to chart. To make it relative to page:
        // left_page = left_chart + container_left + scroll

        // Wait, 'left' calculated above:
        // If default: left = x + offset. x is relative to chart.
        // So left is relative to chart.
        // Correct formula:
        left += containerRect.left + scrollX - x; // Remove x? No.
        // left (chart relative) = x + offset
        // left (page) = left (chart relative) + container_left + scroll
        // BUT, I modified 'left' in place.
        // Let's reset logic for appendToBody

        // Re-calculate page coordinates cleanly
        const chartRelativeLeft = customPosition ? left : (x + 15);
        const chartRelativeTop = customPosition ? top : (y + 15);

        left = chartRelativeLeft + containerRect.left + scrollX;
        top = chartRelativeTop + containerRect.top + scrollY;
      }

      viewWidth = document.documentElement.clientWidth;
      viewHeight = document.documentElement.clientHeight;
    }

    if (this._option.confine) {
      // Right edge
      if (left + elWidth > (this._option.appendToBody ? viewWidth + window.scrollX : viewWidth)) {
        left = (this._option.appendToBody ? (x + containerRect.left + window.scrollX) : x) - elWidth - 15;
        // If custom position, we might not want to flip?
        // ECharts confine tries to keep it inside.
        if (customPosition && Array.isArray(pos)) {
          // If fixed position, don't flip, just clamp?
          left = Math.min(left, (this._option.appendToBody ? viewWidth + window.scrollX : viewWidth) - elWidth);
        }
      }

      // Bottom edge
      if (top + elHeight > (this._option.appendToBody ? viewHeight + window.scrollY : viewHeight)) {
        top = (this._option.appendToBody ? (y + containerRect.top + window.scrollY) : y) - elHeight - 15;
        if (customPosition && Array.isArray(pos)) {
          top = Math.min(top, (this._option.appendToBody ? viewHeight + window.scrollY : viewHeight) - elHeight);
        }
      }

      // Left edge
      if (left < (this._option.appendToBody ? window.scrollX : 0)) {
        left = (this._option.appendToBody ? window.scrollX : 0) + 10;
      }

      // Top edge
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
        return parseFloat(value) / 100 * total;
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
