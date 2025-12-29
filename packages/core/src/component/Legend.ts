/**
 * Legend - Enhanced legend component (ECharts-like)
 */

import Group from '../Group';
import Rect from '../shape/Rect';
import Text from '../shape/Text';
import Circle from '../shape/Circle';

export interface LegendItem {
  name: string;
  color: string;
  icon?: 'circle' | 'rect' | 'line';
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
  onSelect?: (name: string, selected: boolean) => void;
  onHover?: (name: string, hovered: boolean) => void;
  selectedMode?: 'single' | 'multiple';
}

export default class Legend extends Group {
  private _option: LegendOption;
  private _items: LegendItem[] = [];
  private _selectedItems: Set<string> = new Set();
  private _itemRects: Map<string, Rect> = new Map();
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
      itemWidth: 150,
      selectedMode: 'multiple',
      ...option
    };
  }

  setItems(items: LegendItem[], selected?: string[]): void {
    this._items = items;
    if (selected && selected.length > 0) {
      this._selectedItems = new Set(selected);
    } else if (this._selectedItems.size === 0) {
      this._selectedItems.clear();
      items.forEach(item => this._selectedItems.add(item.name));
    } else {
      // Keep existing selection across updates; remove selections not in items
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

  private _render(): void {
    this.removeAll();
    this._itemRects.clear();

    const padding = this._option.padding || 8;
    const fontSize = this._option.fontSize || 12;
    const itemGap = this._option.itemGap || 10;
    const itemWidth = this._option.itemWidth || 150;
    const itemHeight = fontSize + 4;

    let totalWidth = 0;
    let totalHeight = 0;

    let perRow = this._items.length;
    let rows = 1;
    if (this._option.orient === 'horizontal') {
      perRow = Math.max(1, Math.floor((this._containerWidth - padding * 2) / itemWidth));
      rows = Math.max(1, Math.ceil(this._items.length / perRow));
      totalWidth = Math.min(this._containerWidth - padding * 2, perRow * itemWidth) + padding * 2;
      totalHeight = rows * (itemHeight + itemGap) - itemGap + padding * 2;
    } else {
      totalWidth = itemWidth + padding * 2;
      totalHeight = this._items.length * (itemHeight + itemGap) - itemGap + padding * 2;
    }

    const bgRect = new Rect({
      shape: { x: 0, y: 0, width: totalWidth, height: totalHeight, r: 4 },
      style: { fill: this._option.backgroundColor, stroke: '#ddd', lineWidth: 1 }
    });
    this.add(bgRect);

    this._items.forEach((item, i) => {
      let x: number;
      let y: number;

      if (this._option.orient === 'horizontal') {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        x = padding + col * itemWidth;
        y = padding + row * (itemHeight + itemGap);
      } else {
        x = padding;
        y = padding + i * (itemHeight + itemGap);
      }

      const isSelected = this._selectedItems.has(item.name);

      const interactRect = new Rect({
        shape: { x, y, width: itemWidth - 4, height: itemHeight },
        style: { fill: 'transparent' },
        cursor: 'pointer'
      });

      const icon = item.icon || 'circle';
      let iconElement: any;

      if (icon === 'circle') {
        iconElement = new Circle({
          shape: { cx: x + 6, cy: y + itemHeight / 2, r: 4 },
          style: {
            fill: isSelected ? item.color : '#ccc',
            opacity: isSelected ? 1 : 0.3
          }
        });
      } else {
        iconElement = new Rect({
          shape: { x, y: y + itemHeight / 2 - 4, width: 8, height: 8, r: 1 },
          style: {
            fill: isSelected ? item.color : '#ccc',
            opacity: isSelected ? 1 : 0.3
          }
        });
      }

      const label = new Text({
        shape: { text: item.name, x: x + 16, y: y + itemHeight / 2 + 4 },
        style: {
          fill: this._option.textColor,
          fontSize,
          opacity: isSelected ? 1 : 0.5
        }
      });

      (interactRect as any).on('click', () => {
        if (this._option.selectedMode === 'single') {
          this._selectedItems.clear();
          this._selectedItems.add(item.name);
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
        interactRect.attr('style', { fill: '#f0f0f0' });
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
      this.add(iconElement);
      this.add(label);
      this._itemRects.set(item.name, iconElement);
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
