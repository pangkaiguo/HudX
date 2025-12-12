/**
 * Text - Text shape element
 */

import ChartElement from '../ChartElement';
import { ElementOption, BoundingRect } from '../types';

export interface TextShape {
  x: number;
  y: number;
  text: string;
}

export default class Text extends ChartElement {
  shape: TextShape;

  constructor(opts: ElementOption & { shape: TextShape } = { shape: { x: 0, y: 0, text: '' } }) {
    super(opts);
    this.shape = opts.shape || { x: 0, y: 0, text: '' };
    // Also support text in style
    if (opts.style?.text) {
      this.shape.text = opts.style.text;
    }
  }

  getBoundingRect(): BoundingRect {
    const shape = this.shape;
    const style = this.style;
    const fontSize = style.fontSize || 12;
    const fontFamily = style.fontFamily || 'sans-serif';
    const fontWeight = style.fontWeight || 'normal';
    
    // Create temporary canvas to measure text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(shape.text || '');

    const width = metrics.width;
    const height = fontSize;
    const textAlign = style.textAlign || 'left';
    const textBaseline = style.textBaseline || 'alphabetic';

    let x = shape.x;
    if (textAlign === 'center') {
      x -= width / 2;
    } else if (textAlign === 'right') {
      x -= width;
    }

    let y = shape.y;
    if (textBaseline === 'middle') {
      y -= height / 2;
    } else if (textBaseline === 'top') {
      y -= height;
    } else if (textBaseline === 'bottom') {
      // y stays as is
    }

    return { x, y, width, height };
  }

  contain(x: number, y: number): boolean {
    const rect = this.getBoundingRect();
    return x >= rect.x && x <= rect.x + rect.width &&
           y >= rect.y && y <= rect.y + rect.height;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.invisible || !this.shape.text) {
      return;
    }

    ctx.save();
    this.applyTransform(ctx);
    this.applyStyle(ctx);

    const shape = this.shape;
    const style = this.style;

    // Set font
    const fontSize = style.fontSize || 12;
    const fontFamily = style.fontFamily || 'sans-serif';
    const fontWeight = style.fontWeight || 'normal';
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    // Set text alignment
    ctx.textAlign = (style.textAlign as CanvasTextAlign) || 'left';
    ctx.textBaseline = (style.textBaseline as CanvasTextBaseline) || 'alphabetic';

    // Draw text
    if (style.fill) {
      ctx.fillText(shape.text, shape.x, shape.y);
    }
    if (style.stroke) {
      ctx.strokeText(shape.text, shape.x, shape.y);
    }

    ctx.restore();
  }
}

