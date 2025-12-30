/**
 * Tooltip - Enhanced tooltip component with smart positioning
 */

import Group from '../Group';
import Rect from '../shape/Rect';
import Text from '../shape/Text';
import Animation from '../animation/Animation';

export interface TooltipOption {
  show?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  padding?: number;
  fontSize?: number;
  borderWidth?: number;
  borderRadius?: number;
  transitionDuration?: number;
  formatter?: (data: any) => string;
  confine?: boolean;
  appendToBody?: boolean;
}

export default class Tooltip extends Group {
  private _option: TooltipOption;
  private _visible: boolean = false;
  private _animation?: Animation;
  private _containerWidth: number = 800;
  private _containerHeight: number = 600;

  private _currentContent: string = '';

  constructor(option: TooltipOption = {}) {
    super();
    this._option = {
      show: true,
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      textColor: '#fff',
      borderColor: '#666',
      padding: 10,
      fontSize: 12,
      borderWidth: 1,
      borderRadius: 4,
      transitionDuration: 200,
      confine: true,
      ...option
    };
    this.z = 1000; // Ensure tooltip is on top
    this.silent = true; // Tooltip should not block mouse events
    this.invisible = true;
    this.style.opacity = 0;
  }

  setContainer(width: number, height: number): void {
    this._containerWidth = width;
    this._containerHeight = height;
  }

  show(x: number, y: number, content: string | Record<string, unknown>): void {
    // Check if content changed to avoid unnecessary rebuild
    const text = typeof content === 'string' ? content : (this._option.formatter?.(content) || JSON.stringify(content));

    // Estimate dimensions for smart positioning
    const padding = this._option.padding || 10;
    const fontSize = this._option.fontSize || 12;
    const lines = text.split('\n');
    const maxLineLen = Math.max(...lines.map(l => l.length));
    const estimatedWidth = maxLineLen * (fontSize * 0.6) + padding * 2;
    const height = lines.length * (fontSize * 1.4) + padding * 2;

    // Smart positioning
    const offset = 15; // Basic offset to avoid covering mouse
    let finalX = x + offset;
    let finalY = y + offset;

    if (this._option.confine) {
      // Check Horizontal
      const overflowRight = finalX + estimatedWidth > this._containerWidth;

      if (overflowRight) {
        // Try left
        finalX = x - estimatedWidth - offset;
      }

      // Check Left Overflow (if flipped to left and still overflow, or original was too far left??)
      if (finalX < 0) {
        if (overflowRight) {
          finalX = 10;
        } else {
          finalX = 10;
        }
      }

      // Check Vertical
      const overflowBottom = finalY + height > this._containerHeight;
      if (overflowBottom) {
        finalY = y - height - offset;
      }
      if (finalY < 0) {
        finalY = 10;
      }

      const mouseSafeZone = { x: x - 10, y: y - 10, w: 20, h: 20 };
      const tooltipRect = { x: finalX, y: finalY, w: estimatedWidth, h: height };

      const intersect = (r1: any, r2: any) => {
        return !(r2.x > r1.x + r1.w ||
          r2.x + r2.w < r1.x ||
          r2.y > r1.y + r1.h ||
          r2.y + r2.h < r1.y);
      };

      if (intersect(mouseSafeZone, tooltipRect)) {
        if (finalY > y) {
          finalY = y - height - offset;
        } else {
          finalY = y + offset;
        }

        // Re-clamp Y
        if (finalY < 0) finalY = 10;
        if (finalY + height > this._containerHeight) finalY = this._containerHeight - height - 10;
      }
    }

    // Optimization: If visible and content hasn't changed, just move
    if (this._visible && this._currentContent === text) {
      this.attr('transform', { x: finalX, y: finalY, scaleX: 1, scaleY: 1 });
      this.style.opacity = 1;
      this.markRedraw();
      return;
    }

    this._currentContent = text;
    this.removeAll();

    const bgRect = new Rect({
      shape: { x: 0, y: 0, width: estimatedWidth, height, r: this._option.borderRadius },
      style: {
        fill: this._option.backgroundColor,
        stroke: this._option.borderColor,
        lineWidth: this._option.borderWidth
      },
      silent: true // Ensure tooltip background doesn't block events
    });
    this.add(bgRect);

    lines.forEach((line, i) => {
      this.add(new Text({
        shape: { text: line, x: padding, y: padding + i * (fontSize * 1.4) },
        style: {
          fill: this._option.textColor,
          fontSize,
          textBaseline: 'top'
        },
        silent: true // Ensure tooltip text doesn't block events
      }));
    });

    // If showing for first time (transition in)
    if (!this._visible) {
      this.attr('transform', { x: finalX, y: finalY, scaleX: 0.8, scaleY: 0.8 });
      this.invisible = false;
      this._visible = true;

      if (this._animation) this._animation.stop();

      this._animation = new Animation(
        this.transform as Record<string, unknown>,
        'scaleX',
        1,
        this._option.transitionDuration,
        0,
        'cubicOut',
        () => this.markRedraw()
      );
      this._animation.start();

      new Animation(
        this.transform as Record<string, unknown>,
        'scaleY',
        1,
        this._option.transitionDuration,
        0,
        'cubicOut',
        () => this.markRedraw()
      ).start();

      new Animation(
        this.style as Record<string, unknown>,
        'opacity',
        1,
        this._option.transitionDuration,
        0,
        'cubicOut',
        () => this.markRedraw()
      ).start();
    } else {
      // Just move if already visible
      this.attr('transform', { x: finalX, y: finalY, scaleX: 1, scaleY: 1 });
      this.style.opacity = 1;
      this.markRedraw();
    }
  }

  hide(): void {
    if (!this._visible) return;

    if (this._animation) {
      this._animation.stop();
    }

    new Animation(
      this.transform as Record<string, unknown>,
      'scaleX',
      0.8,
      this._option.transitionDuration,
      0,
      'cubicOut',
      () => this.markRedraw()
    ).start();

    new Animation(
      this.style as Record<string, unknown>,
      'opacity',
      0,
      this._option.transitionDuration,
      0,
      'cubicOut',
      () => {
        this.removeAll();
        this.invisible = true;
        this._visible = false;
        this.markRedraw();
      }
    ).start();
  }

  isVisible(): boolean {
    return this._visible;
  }
}
