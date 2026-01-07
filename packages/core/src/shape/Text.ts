/**
 * Text - Text shape element
 */

import ChartElement from '../ChartElement';
import type { ElementOption, BoundingRect } from '../types';

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

  // Cache for text fragments
  private _textFragments: any[] | null = null;
  // Cache for text lines
  private _textLines: { fragments: any[], width: number, height: number }[] | null = null;
  private _totalWidth: number = 0;
  private _totalHeight: number = 0;

  getTextFragments(): any[] | null {
    if (!this._textFragments || this.isDirty()) {
      this._parseText(this.style.rich);
    }
    return this._textFragments;
  }

  getTotalWidth(): number {
    return this._totalWidth;
  }

  getTotalHeight(): number {
    return this._totalHeight;
  }

  getBoundingRect(): BoundingRect {
    const shape = this.shape;
    const style = this.style;
    const fontSize = style.fontSize || 12;
    const fontFamily = style.fontFamily || 'sans-serif';
    const fontWeight = style.fontWeight || 'normal';

    // Parse text if needed
    if (!this._textFragments || this.isDirty()) {
      this._parseText(style.rich);
    }

    const width = this._totalWidth + (this._getPaddingWidth(style.padding));
    const height = this._totalHeight + (this._getPaddingHeight(style.padding));

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
      // y is top
    } else if (textBaseline === 'bottom') {
      // y stays as is if baseline is bottom? 
      // Actually standard baseline is alphabetic which is near bottom.
      // If we treat the box, 'bottom' usually means y is at bottom edge of box.
      y -= height;
    } else {
      // alphabetic
      // We need to approximate baseline offset?
      // For simplicity, treat as bottom-ish or just ignore baseline for box model if rich text used?
      // ECharts treats position relative to the box.
      // Let's assume standard behavior:
      // If rich text, we layout fragments.
      // The box origin is (x, y) adjusted by alignment.
      // If baseline is alphabetic, we might need to shift up by descent?
      y -= height * 0.8; // Approximate
    }

    return { x, y, width, height };
  }

  getPaddingLeft(padding?: number | number[]): number {
    return this._getPaddingLeft(padding);
  }

  getPaddingTop(padding?: number | number[]): number {
    return this._getPaddingTop(padding);
  }

  private _getPaddingWidth(padding?: number | number[]): number {
    if (typeof padding === 'number') return padding * 2;
    if (Array.isArray(padding)) return (padding[1] || 0) + (padding[3] || 0);
    return 0;
  }

  private _getPaddingHeight(padding?: number | number[]): number {
    if (typeof padding === 'number') return padding * 2;
    if (Array.isArray(padding)) return (padding[0] || 0) + (padding[2] || 0);
    return 0;
  }

  private _parseText(rich?: Record<string, any>): void {
    const text = this.shape.text || '';
    const lines = text.split('\n');
    const parsedLines: { fragments: any[], width: number, height: number }[] = [];

    let maxTotalWidth = 0;
    let totalHeight = 0;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const baseStyle = this.style;
    const baseFont = `${baseStyle.fontWeight || 'normal'} ${baseStyle.fontSize || 12}px ${baseStyle.fontFamily || 'sans-serif'}`;
    const baseFontSize = baseStyle.fontSize || 12;

    lines.forEach(lineText => {
      const fragments: any[] = [];
      let lineWidth = 0;
      let lineHeight = 0;

      if (!rich) {
        // Simple text
        ctx.font = baseFont;
        const metrics = ctx.measureText(lineText);
        const h = baseFontSize;
        fragments.push({
          text: lineText,
          width: metrics.width,
          height: h,
          style: {}
        });
        lineWidth = metrics.width;
        lineHeight = h;
      } else {
        // Rich text parsing
        const regex = /\{([a-zA-Z0-9_]+)\|([^}]+)\}/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(lineText)) !== null) {
          // Add text before match
          if (match.index > lastIndex) {
            const sub = lineText.substring(lastIndex, match.index);
            ctx.font = baseFont;
            const metrics = ctx.measureText(sub);
            const h = baseFontSize;
            fragments.push({ text: sub, width: metrics.width, height: h, style: {} });
            lineWidth += metrics.width;
            lineHeight = Math.max(lineHeight, h);
          }

          const styleName = match[1];
          const content = match[2];
          const style = rich[styleName] || {};

          // Measure with specific style
          const fontSize = style.fontSize || baseFontSize;
          const fontFamily = style.fontFamily || baseStyle.fontFamily || 'sans-serif';
          const fontWeight = style.fontWeight || baseStyle.fontWeight || 'normal';
          ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
          const metrics = ctx.measureText(content);

          // Calculate box width (content + padding)
          const pW = this._getPaddingWidth(style.padding);
          const pH = this._getPaddingHeight(style.padding);
          const w = metrics.width + pW;
          const h = fontSize + pH;

          fragments.push({
            text: content,
            width: w,
            height: h,
            style: style,
            contentWidth: metrics.width
          });
          lineWidth += w;
          lineHeight = Math.max(lineHeight, h);

          lastIndex = regex.lastIndex;
        }

        // Add trailing text
        if (lastIndex < lineText.length) {
          const sub = lineText.substring(lastIndex);
          ctx.font = baseFont;
          const metrics = ctx.measureText(sub);
          const h = baseFontSize;
          fragments.push({ text: sub, width: metrics.width, height: h, style: {} });
          lineWidth += metrics.width;
          lineHeight = Math.max(lineHeight, h);
        }
      }

      // Handle empty lines (height of base font)
      if (fragments.length === 0) {
        lineHeight = baseFontSize;
      }

      parsedLines.push({ fragments, width: lineWidth, height: lineHeight });
      maxTotalWidth = Math.max(maxTotalWidth, lineWidth);
      totalHeight += lineHeight;
    });

    this._textLines = parsedLines;
    this._totalWidth = maxTotalWidth;
    this._totalHeight = totalHeight;
    this._textFragments = parsedLines.flatMap(l => l.fragments);
  }

  contain(x: number, y: number): boolean {
    const local = this.transformPointToLocal(x, y);
    if (!local) return false;
    const [lx, ly] = local;

    const rect = this.getBoundingRect();
    return lx >= rect.x && lx <= rect.x + rect.width &&
      ly >= rect.y && ly <= rect.y + rect.height;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.invisible || !this.shape.text) {
      return;
    }

    ctx.save();
    this.applyTransform(ctx);
    // Don't apply base style fill/stroke immediately if we handle rich text manual drawing
    // But we need base shadow/opacity
    const style = this.style;
    if (style.opacity !== undefined) ctx.globalAlpha = style.opacity;
    if (style.shadowColor) {
      ctx.shadowColor = style.shadowColor;
      ctx.shadowBlur = style.shadowBlur || 0;
      ctx.shadowOffsetX = style.shadowOffsetX || 0;
      ctx.shadowOffsetY = style.shadowOffsetY || 0;
    }

    // Parse if needed
    if (!this._textLines || this.isDirty()) {
      this._parseText(style.rich);
    }

    const rect = this.getBoundingRect();
    const startX = rect.x + (this._getPaddingLeft(style.padding));
    const startY = rect.y + (this._getPaddingTop(style.padding));

    // Draw background for the whole text block
    if (style.backgroundColor) {
      ctx.fillStyle = style.backgroundColor;
      const r = style.borderRadius || 0;
      if (r > 0) {
        this._roundRect(ctx, rect.x, rect.y, rect.width, rect.height, r);
        ctx.fill();
      } else {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      }
    }
    if (style.borderColor && style.borderWidth) {
      ctx.strokeStyle = style.borderColor;
      ctx.lineWidth = style.borderWidth;
      const r = style.borderRadius || 0;
      if (r > 0) {
        this._roundRect(ctx, rect.x, rect.y, rect.width, rect.height, r);
        ctx.stroke();
      } else {
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
      }
    }

    // Draw fragments line by line
    let currentY = startY;
    const textAlign = style.textAlign || 'left';

    this._textLines!.forEach(line => {
      const { fragments, width, height } = line;

      // Calculate X start based on alignment relative to text block
      let lineStartX = startX;
      if (textAlign === 'center') {
        lineStartX += (this._totalWidth - width) / 2;
      } else if (textAlign === 'right') {
        lineStartX += (this._totalWidth - width);
      }

      let currentX = lineStartX;
      const centerY = currentY + height / 2;

      fragments.forEach(frag => {
        const fStyle = frag.style;
        const fontSize = fStyle.fontSize || style.fontSize || 12;
        const fontFamily = fStyle.fontFamily || style.fontFamily || 'sans-serif';
        const fontWeight = fStyle.fontWeight || style.fontWeight || 'normal';

        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.textBaseline = 'middle';

        const fragHeight = frag.height;
        const fragWidth = frag.width;

        // Draw fragment background/border
        if (fStyle.backgroundColor || (fStyle.borderColor && fStyle.borderWidth)) {
          // Center vertically in the line
          const fy = centerY - fragHeight / 2;
          if (fStyle.backgroundColor) {
            ctx.fillStyle = fStyle.backgroundColor;
            const r = fStyle.borderRadius || 0;
            if (r > 0) {
              this._roundRect(ctx, currentX, fy, fragWidth, fragHeight, r);
              ctx.fill();
            } else {
              ctx.fillRect(currentX, fy, fragWidth, fragHeight);
            }
          }
          if (fStyle.borderColor && fStyle.borderWidth) {
            ctx.strokeStyle = fStyle.borderColor;
            ctx.lineWidth = fStyle.borderWidth;
            const r = fStyle.borderRadius || 0;
            if (r > 0) {
              this._roundRect(ctx, currentX, fy, fragWidth, fragHeight, r);
              ctx.stroke();
            } else {
              ctx.strokeRect(currentX, fy, fragWidth, fragHeight);
            }
          }
        }

        // Draw text
        const contentX = currentX + this._getPaddingLeft(fStyle.padding);
        const contentY = centerY; // Middle baseline

        ctx.fillStyle = fStyle.color || style.fill || '#000';
        ctx.fillText(frag.text, contentX, contentY);

        currentX += fragWidth;
      });

      currentY += height;
    });

    ctx.restore();
  }

  private _getPaddingLeft(padding?: number | number[]): number {
    if (typeof padding === 'number') return padding;
    if (Array.isArray(padding)) return padding[3] || 0;
    return 0;
  }

  private _getPaddingTop(padding?: number | number[]): number {
    if (typeof padding === 'number') return padding;
    if (Array.isArray(padding)) return padding[0] || 0;
    return 0;
  }

  private _roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

