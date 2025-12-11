/**
 * Tooltip - Tooltip component
 */

import Group from '../Group';
import Rect from '../shape/Rect';
import Text from '../shape/Text';

export interface TooltipOption {
  show?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  padding?: number;
  fontSize?: number;
  borderWidth?: number;
}

export default class Tooltip extends Group {
  private _option: TooltipOption;
  private _visible: boolean = false;

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
      ...option
    };
    this.invisible = true;
  }

  show(x: number, y: number, content: string): void {
    this.removeAll();
    const padding = this._option.padding || 10;
    const fontSize = this._option.fontSize || 12;
    const lines = content.split('\n');
    const width = Math.max(...lines.map(l => l.length)) * 7 + padding * 2;
    const height = lines.length * (fontSize + 4) + padding * 2;

    // Background
    this.add(new Rect({
      shape: { x: 0, y: 0, width, height },
      style: {
        fill: this._option.backgroundColor,
        stroke: this._option.borderColor,
        lineWidth: this._option.borderWidth
      }
    }));

    // Text
    lines.forEach((line, i) => {
      this.add(new Text({
        shape: { text: line, x: padding, y: padding + (i + 1) * (fontSize + 2) },
        style: { fill: this._option.textColor, fontSize }
      }));
    });

    this.attr('transform', { x, y });
    this.invisible = false;
    this._visible = true;
  }

  hide(): void {
    this.removeAll();
    this.invisible = true;
    this._visible = false;
  }

  isVisible(): boolean {
    return this._visible;
  }
}
