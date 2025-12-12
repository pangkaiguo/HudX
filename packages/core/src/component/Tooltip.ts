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
    this.invisible = true;
    this.style.opacity = 0;
  }

  setContainer(width: number, height: number): void {
    this._containerWidth = width;
    this._containerHeight = height;
  }

  show(x: number, y: number, content: string | Record<string, unknown>): void {
    this.removeAll();
    
    const text = typeof content === 'string' ? content : (this._option.formatter?.(content) || JSON.stringify(content));
    const padding = this._option.padding || 10;
    const fontSize = this._option.fontSize || 12;
    const lines = text.split('\n');
    const width = Math.max(...lines.map(l => l.length)) * 7 + padding * 2;
    const height = lines.length * (fontSize + 4) + padding * 2;

    // Smart positioning
    let finalX = x;
    let finalY = y;

    if (this._option.confine) {
      // Adjust X position
      if (finalX + width > this._containerWidth) {
        finalX = x - width - 10;
      }
      if (finalX < 0) {
        finalX = 10;
      }

      // Adjust Y position
      if (finalY + height > this._containerHeight) {
        finalY = y - height - 10;
      }
      if (finalY < 0) {
        finalY = 10;
      }
    }

    const bgRect = new Rect({
      shape: { x: 0, y: 0, width, height, r: this._option.borderRadius },
      style: {
        fill: this._option.backgroundColor,
        stroke: this._option.borderColor,
        lineWidth: this._option.borderWidth
      }
    });
    this.add(bgRect);

    lines.forEach((line, i) => {
      this.add(new Text({
        shape: { text: line, x: padding, y: padding + (i + 1) * (fontSize + 2) },
        style: { fill: this._option.textColor, fontSize }
      }));
    });

    this.attr('transform', { x: finalX, y: finalY, scaleX: 0.8, scaleY: 0.8 });
    this.invisible = false;
    this._visible = true;

    if (this._animation) {
      this._animation.stop();
    }

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
