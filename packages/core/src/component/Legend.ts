/**
 * Legend - Legend component
 */

import Group from '../Group';
import Rect from '../shape/Rect';
import Text from '../shape/Text';

export interface LegendItem {
  name: string;
  color: string;
}

export interface LegendOption {
  show?: boolean;
  orient?: 'horizontal' | 'vertical';
  x?: number;
  y?: number;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
  fontSize?: number;
  onSelect?: (name: string, selected: boolean) => void;
}

export default class Legend extends Group {
  private _option: LegendOption;
  private _items: LegendItem[] = [];
  private _selectedItems: Set<string> = new Set();
  private _itemRects: Map<string, Rect> = new Map();

  constructor(option: LegendOption = {}) {
    super();
    this._option = {
      show: true,
      orient: 'horizontal',
      x: 10,
      y: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      textColor: '#333',
      padding: 8,
      fontSize: 12,
      ...option
    };
  }

  setItems(items: LegendItem[]): void {
    this._items = items;
    this._selectedItems.clear();
    items.forEach(item => this._selectedItems.add(item.name));
    this._render();
  }

  isSelected(name: string): boolean {
    return this._selectedItems.has(name);
  }

  private _render(): void {
    this.removeAll();
    this._itemRects.clear();

    const padding = this._option.padding || 8;
    const fontSize = this._option.fontSize || 12;
    const itemHeight = fontSize + 4;
    const itemWidth = 150;

    const bgRect = new Rect({
      shape: { x: 0, y: 0, width: this._items.length * itemWidth + padding * 2, height: itemHeight + padding * 2 },
      style: { fill: this._option.backgroundColor, stroke: '#ddd', lineWidth: 1 }
    });
    this.add(bgRect);

    this._items.forEach((item, i) => {
      const x = i * itemWidth + padding;
      const y = padding;

      // Interactive rect
      const interactRect = new Rect({
        shape: { x, y, width: itemWidth - 4, height: itemHeight },
        style: { fill: 'transparent' }
      });

      const isSelected = this._selectedItems.has(item.name);
      const colorBox = new Rect({
        shape: { x, y, width: 12, height: 12 },
        style: { 
          fill: isSelected ? item.color : '#ccc',
          opacity: isSelected ? 1 : 0.3
        }
      });

      const label = new Text({
        shape: { text: item.name, x: x + 18, y: y + 9 },
        style: { 
          fill: this._option.textColor, 
          fontSize,
          opacity: isSelected ? 1 : 0.5
        }
      });

      interactRect.on('click', () => {
        if (this._selectedItems.has(item.name)) {
          this._selectedItems.delete(item.name);
        } else {
          this._selectedItems.add(item.name);
        }
        if (this._option.onSelect) {
          this._option.onSelect(item.name, this._selectedItems.has(item.name));
        }
        this._render();
        this.markRedraw();
      });

      interactRect.on('mouseover', () => {
        interactRect.attr('style', { fill: '#f0f0f0' });
        this.markRedraw();
      });

      interactRect.on('mouseout', () => {
        interactRect.attr('style', { fill: 'transparent' });
        this.markRedraw();
      });

      this.add(interactRect);
      this.add(colorBox);
      this.add(label);
      this._itemRects.set(item.name, colorBox);
    });

    this.attr('transform', { x: this._option.x, y: this._option.y });
  }
}
