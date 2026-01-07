/**
 * Legend - Enhanced legend component (ECharts-like)
 */

import Group from '../Group';
import Rect from '../shape/Rect';
import Text from '../shape/Text';
import Circle from '../shape/Circle';
import Line from '../shape/Line';
import { Z_LEGEND } from '../constants';
import { createDecalPattern } from '../util/pattern';
import type { DecalObject } from '../types';

export interface LegendItem {
  name: string;
  color: string;
  icon?: 'circle' | 'rect' | 'line';
  decal?: DecalObject;
}

export interface LegendOption {
  show?: boolean;
  orient?: 'horizontal' | 'vertical';
  x?: number | 'left' | 'center' | 'right';
  y?: number | 'top' | 'middle' | 'bottom';
  right?: number;
  bottom?: number;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
  fontSize?: number;
  itemGap?: number;
  itemWidth?: number;
  iconGap?: number;
  width?: number;
  height?: number;
  onSelect?: (name: string, selected: boolean) => void;
  onHover?: (name: string, hovered: boolean) => void;
  selectedMode?: 'single' | 'multiple';
}

export default class Legend extends Group {
  private _option: LegendOption;
  private _items: LegendItem[] = [];
  private _selectedItems: Set<string> = new Set();
  private _itemRects: Map<string, any> = new Map();
  private _containerWidth: number = 800;
  private _containerHeight: number = 600;

  constructor(option: LegendOption = {}) {
    super();
    this._option = {
      show: true,
      orient: 'horizontal',
      x: 10,
      y: 10,
      right: undefined,
      bottom: undefined,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      textColor: '#333',
      padding: 8,
      fontSize: 12,
      itemGap: 10,
      itemWidth: 100,
      iconGap: 8,
      selectedMode: 'multiple',
      ...option
    };
    this.z = Z_LEGEND;
  }

  setItems(items: LegendItem[], selected?: string[]): void {
    this._items = items;
    if (selected !== undefined) {
      this._items.forEach(item => {
        // Ensure only valid items are selected
        if (selected.includes(item.name)) {
          this._selectedItems.add(item.name);
        } else {
          this._selectedItems.delete(item.name);
        }
      });
      // Handle case where selected might contain items not in current items list?
      // For now, let's just rebuild the set from the valid intersection
      const validNames = new Set(items.map(i => i.name));
      this._selectedItems = new Set(selected.filter(name => validNames.has(name)));
    } else if (this._selectedItems.size === 0) {
      this._selectedItems.clear();
      items.forEach(item => this._selectedItems.add(item.name));
    } else {
      const valid = new Set(items.map(i => i.name));
      this._selectedItems = new Set([...this._selectedItems].filter(n => valid.has(n)));
      if (this._selectedItems.size === 0) {
        items.forEach(item => this._selectedItems.add(item.name));
      }
    }
    this._render();
  }

  setContainer(width: number, height: number): void {
    this._containerWidth = width;
    this._containerHeight = height;
    this.markRedraw();
  }

  isSelected(name: string): boolean {
    return this._selectedItems.has(name);
  }

  getSelected(): string[] {
    return Array.from(this._selectedItems);
  }

  private _render(): void {
    this.removeAll();
    this._itemRects.clear();

    const padding = this._option.padding || 8;
    const fontSize = this._option.fontSize || 12;
    const itemGap = this._option.itemGap || 10;
    const itemWidth = this._option.itemWidth || 100;
    const iconGap = this._option.iconGap || 8;
    const iconWidth = 12;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${fontSize}px sans-serif`;

    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split('');
      let lines: string[] = [];
      let currentLine = '';

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const width = ctx.measureText(currentLine + char).width;
        if (width < maxWidth) {
          currentLine += char;
        } else {
          lines.push(currentLine);
          currentLine = char;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const layoutItems: any[] = [];
    let currentX = padding;
    let currentY = padding;
    let maxRowHeight = 0;
    let totalWidth = 0;
    let totalHeight = 0;

    const textMaxWidth = Math.max(10, itemWidth - iconWidth - iconGap);

    const measurements = this._items.map(item => {
      const lines = wrapText(item.name, textMaxWidth);
      const lineHeight = fontSize + 4;
      const textHeight = lines.length * lineHeight;
      const itemH = Math.max(16, textHeight);
      return { item, lines, lineHeight, itemH };
    });

    let itemsPerColLimit = measurements.length;
    const containerWidth = this._option.width || this._containerWidth;
    const containerHeight = this._option.height || this._containerHeight;

    if (this._option.orient === 'vertical') {
      const effectiveHeight = containerHeight - padding;

      let maxItemsPhysically = 0;
      let simY = padding;
      for (const m of measurements) {
        if (simY + m.itemH > effectiveHeight) break;
        simY += m.itemH + itemGap;
        maxItemsPhysically++;
      }
      maxItemsPhysically = Math.max(1, maxItemsPhysically);

      const totalItems = measurements.length;
      const numCols = Math.ceil(totalItems / maxItemsPhysically);
      const balancedCount = Math.ceil(totalItems / numCols);

      itemsPerColLimit = Math.min(maxItemsPhysically, balancedCount);
    }

    let colItemCount = 0;

    measurements.forEach((m, i) => {
      const { item, lines, lineHeight, itemH } = m;

      if (this._option.orient === 'horizontal') {
        if (currentX + itemWidth > containerWidth - padding && i > 0) {
          currentX = padding;
          currentY += maxRowHeight + itemGap;
          maxRowHeight = 0;
        }

        layoutItems.push({
          item,
          x: currentX,
          y: currentY,
          width: itemWidth,
          height: itemH,
          lines,
          lineHeight
        });

        maxRowHeight = Math.max(maxRowHeight, itemH);
        totalWidth = Math.max(totalWidth, currentX + itemWidth);
        currentX += itemWidth + itemGap;
      } else {
        const needsWrap = (colItemCount >= itemsPerColLimit) ||
          (currentY + itemH > containerHeight - padding);

        if (needsWrap && i > 0) {
          totalHeight = Math.max(totalHeight, currentY - itemGap + padding);
          currentY = padding;
          currentX += itemWidth + itemGap;
          colItemCount = 0;
        }

        if (currentX + itemWidth > containerWidth - padding) {
          return;
        }

        layoutItems.push({
          item,
          x: currentX,
          y: currentY,
          width: itemWidth,
          height: itemH,
          lines,
          lineHeight
        });

        totalWidth = Math.max(totalWidth, currentX + itemWidth);
        currentY += itemH + itemGap;
        colItemCount++;
      }
    });

    if (this._option.orient === 'horizontal') {
      totalHeight = currentY + maxRowHeight + padding;
      totalWidth += padding;
    } else {
      totalHeight = Math.max(totalHeight, currentY - itemGap + padding);
      totalWidth += padding;
    }

    const bgRect = new Rect({
      shape: { x: 0, y: 0, width: totalWidth, height: totalHeight, r: 4 },
      style: { fill: this._option.backgroundColor, stroke: '#ddd', lineWidth: 1 }
    });
    this.add(bgRect);

    layoutItems.forEach(layout => {
      const { item, x, y, width, height, lines, lineHeight } = layout;
      const isSelected = this._selectedItems.has(item.name);

      const icon = item.icon || 'rect';
      let iconElement: any;

      let fillStyle: string | CanvasPattern = item.color;
      let strokeStyle: string | CanvasPattern = item.color;

      if (item.decal) {
        const pattern = createDecalPattern(item.decal, item.color);
        if (pattern) {
          fillStyle = pattern;
          strokeStyle = pattern;
        }
      }
      const firstLineCenterY = y + lineHeight / 2;

      if (icon === 'circle') {
        iconElement = new Circle({
          shape: { cx: x + 6, cy: firstLineCenterY, r: 4 },
          style: {
            fill: isSelected ? fillStyle : '#ccc',
            opacity: isSelected ? 1 : 0.3
          }
        });
      } else if (icon === 'line') {
        iconElement = new Line({
          shape: {
            x1: x,
            y1: firstLineCenterY,
            x2: x + 12,
            y2: firstLineCenterY
          },
          style: {
            stroke: isSelected ? strokeStyle : '#ccc',
            lineWidth: 2,
            opacity: isSelected ? 1 : 0.3
          }
        });
      } else {
        iconElement = new Rect({
          shape: { x, y: firstLineCenterY - 6, width: 12, height: 12, r: 2 },
          style: {
            fill: isSelected ? fillStyle : '#ccc',
            opacity: isSelected ? 1 : 0.3
          }
        });
      }

      this.add(iconElement);
      this._itemRects.set(item.name, iconElement);

      lines.forEach((line: string, lineIndex: number) => {
        const label = new Text({
          shape: {
            text: line,
            x: x + iconWidth + iconGap,
            y: y + lineHeight * lineIndex + lineHeight / 2
          },
          style: {
            fill: this._option.textColor,
            fontSize,
            opacity: isSelected ? 1 : 0.5,
            textBaseline: 'middle'
          }
        });
        this.add(label);
      });

      const interactRect = new Rect({
        shape: { x, y, width: width, height: height },
        style: { fill: 'transparent' },
        cursor: 'pointer'
      });

      (interactRect as any).on('click', () => {
        if (this._option.selectedMode === 'single') {
          if (this._selectedItems.has(item.name) && this._selectedItems.size === 1) {
            // Already selected and it's the only one -> Restore all
            this._items.forEach(i => this._selectedItems.add(i.name));
          } else {
            this._selectedItems.clear();
            this._selectedItems.add(item.name);
          }
        } else {
          if (this._selectedItems.has(item.name)) {
            this._selectedItems.delete(item.name);
          } else {
            this._selectedItems.add(item.name);
          }
        }
        if (this._option.onSelect) {
          this._option.onSelect(item.name, this._selectedItems.has(item.name));
        }
        this._render();
        this.markRedraw();
      });

      (interactRect as any).on('mouseover', () => {
        interactRect.attr('style', { fill: 'transparent' });
        if (this._option.onHover) {
          this._option.onHover(item.name, true);
        }
        this.markRedraw();
      });

      (interactRect as any).on('mouseout', () => {
        interactRect.attr('style', { fill: 'transparent' });
        if (this._option.onHover) {
          this._option.onHover(item.name, false);
        }
        this.markRedraw();
      });

      this.add(interactRect);
    });

    let x: number;
    if (typeof this._option.x === 'number') {
      x = this._option.x;
    } else if (this._option.x === 'left') {
      x = 10;
    } else if (this._option.x === 'center') {
      x = Math.max(0, (this._containerWidth - totalWidth) / 2);
    } else {
      x = Math.max(0, this._containerWidth - totalWidth - (this._option.right ?? 10));
    }

    let y: number;
    if (typeof this._option.y === 'number') {
      y = this._option.y;
    } else if (this._option.y === 'top') {
      y = 10;
    } else if (this._option.y === 'middle') {
      y = Math.max(0, (this._containerHeight - totalHeight) / 2);
    } else {
      y = Math.max(0, this._containerHeight - totalHeight - (this._option.bottom ?? 10));
    }
    this.attr('transform', { x, y });
  }
}
