/**
 * Legend - Enhanced legend component (ECharts-like)
 *
 * Algorithm: Flex/Grid Layout & Interaction State Management
 *
 * Description:
 * Implements a flexible layout system for legend items, supporting:
 * - Flow layout (horizontal/vertical) with wrapping
 * - Alignment (left/center/right, top/middle/bottom)
 * - Custom item styling and rich text formatting
 * Manages selection state (single/multiple) and coordinates with the Chart
 * via callbacks (onSelect, onHover) to trigger re-renders or highlights.
 */

import Group from '../Group';
import Rect from '../graphic/Rect';
import Text from '../graphic/Text';
import Circle from '../graphic/Circle';
import Line from '../graphic/Line';
import { COLOR_TRANSPARENT, DEFAULT_BORDER_RADIUS, Z_LEGEND } from '../constants';
import { createDecalPattern } from '../util/pattern';
import type { DecalObject } from '../types';
import { ThemeManager } from '../theme/ThemeManager';

export interface LegendItem {
  name: string;
  color: string;
  icon?: 'circle' | 'rect' | 'line';
  decal?: DecalObject;
  value?: number;
  percent?: number;
  data?: any;
  textStyle?: any; // Allow custom text style per item
}

export interface LegendOption {
  show?: boolean;
  orient?: 'horizontal' | 'vertical';
  x?: number | 'left' | 'center' | 'right';
  y?: number | 'top' | 'middle' | 'bottom';
  right?: number | string;
  bottom?: number | string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  textColor?: string;
  inactiveColor?: string;
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
  formatter?: string | ((name: string, item: LegendItem) => string | string[]);
  renderMode?: 'canvas' | 'html';
  itemMaxWidth?: number;
  align?: 'left' | 'center' | 'right';
  tableHead?: string[];
  itemPadding?: number;
}

export default class Legend extends Group {
  private _option: LegendOption;
  private _items: LegendItem[] = [];
  private _selectedItems: Set<string> = new Set();
  private _itemRects: Map<string, any> = new Map();
  private _containerWidth: number = 800;
  private _containerHeight: number = 600;
  private _htmlEl: HTMLElement | null = null;
  private _domContainer: HTMLElement | null = null;

  constructor(option: LegendOption = {}) {
    super();
    const theme = ThemeManager.getTheme();
    this._option = {
      show: true,
      orient: 'horizontal',
      x: undefined,
      y: undefined,
      right: undefined,
      bottom: undefined,
      backgroundColor: theme.backgroundColor,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: DEFAULT_BORDER_RADIUS,
      textColor: theme.legendTextColor,
      inactiveColor: theme.borderColor,
      padding: 8,
      itemPadding: 8,
      fontSize: theme.fontSize,
      itemGap: 0,
      itemWidth: 100,
      iconGap: 8,
      selectedMode: 'multiple',
      renderMode: 'canvas',
      align: 'left',
      ...option,
    };
    this.z = Z_LEGEND;
  }

  setItems(items: LegendItem[], selected?: string[]): void {
    this._items = items;
    if (selected !== undefined) {
      this._items.forEach((item) => {
        if (selected.includes(item.name)) {
          this._selectedItems.add(item.name);
        } else {
          this._selectedItems.delete(item.name);
        }
      });
      const validNames = new Set(items.map((i) => i.name));
      this._selectedItems = new Set(
        selected.filter((name) => validNames.has(name)),
      );
    } else if (this._selectedItems.size === 0) {
      this._selectedItems.clear();
      items.forEach((item) => this._selectedItems.add(item.name));
    } else {
      const valid = new Set(items.map((i) => i.name));
      this._selectedItems = new Set(
        [...this._selectedItems].filter((n) => valid.has(n)),
      );
      if (this._selectedItems.size === 0) {
        items.forEach((item) => this._selectedItems.add(item.name));
      }
    }
    this._render();
  }

  setContainer(width: number, height: number): void {
    this._containerWidth = width;
    this._containerHeight = height;
    this.markRedraw();
  }

  setDomContainer(container: HTMLElement): void {
    this._domContainer = container;
  }

  isSelected(name: string): boolean {
    return this._selectedItems.has(name);
  }

  getSelected(): string[] {
    return Array.from(this._selectedItems);
  }

  dispose(): void {
    if (this._htmlEl && this._htmlEl.parentNode) {
      this._htmlEl.parentNode.removeChild(this._htmlEl);
    }
    this._htmlEl = null;
  }

  private _render(): void {
    if (this._option.renderMode === 'html') {
      this._renderHtml();
      return;
    } else {
      if (this._htmlEl && this._htmlEl.parentNode) {
        this._htmlEl.parentNode.removeChild(this._htmlEl);
        this._htmlEl = null;
      }
    }

    this.removeAll();
    this._itemRects.clear();

    const padding = this._option.padding || 8;
    const fontSize = this._option.fontSize || 12;
    const itemGap = this._option.itemGap ?? 0;
    const itemWidth = this._option.itemWidth || 100;
    const iconGap = this._option.iconGap || 8;
    const iconWidth = 12;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${fontSize}px ${ThemeManager.getTheme().fontFamily}`;

    const wrapText = (text: string, maxWidth: number): string[] => {
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

    const measurements = this._items.map((item) => {
      let currentItemWidth = itemWidth;
      let currentTextMaxWidth = Math.max(
        10,
        currentItemWidth - iconWidth - iconGap,
      );

      if (this._option.itemMaxWidth) {
        const textWidth = ctx.measureText(item.name).width;
        const maxAvailableTextWidth =
          this._option.itemMaxWidth - iconWidth - iconGap;

        if (textWidth <= maxAvailableTextWidth) {
          currentTextMaxWidth = maxAvailableTextWidth; // Allow wrapping if somehow needed, but width is auto
          currentItemWidth = textWidth + iconWidth + iconGap;
        } else {
          currentTextMaxWidth = maxAvailableTextWidth;
          currentItemWidth = this._option.itemMaxWidth;
        }
      }

      const lines = wrapText(item.name, currentTextMaxWidth);

      // Re-calculate width if using maxWidth (auto width behavior)
      if (this._option.itemMaxWidth) {
        let maxLineWidth = 0;
        lines.forEach(
          (l) =>
            (maxLineWidth = Math.max(maxLineWidth, ctx.measureText(l).width)),
        );
        currentItemWidth = maxLineWidth + iconWidth + iconGap;
      }

      const lineHeight = fontSize + 4;
      const textHeight = lines.length * lineHeight;
      const itemH = Math.max(16, textHeight);

      const paddingX = this._option.itemPadding ?? 8;
      const paddingY = this._option.itemPadding ?? 8;

      return {
        item,
        lines,
        lineHeight,
        itemH: itemH + paddingY * 2,
        itemW: currentItemWidth + paddingX * 2,
        contentW: currentItemWidth,
        contentH: itemH,
      };
    });

    const containerWidth = this._option.width || this._containerWidth;
    const containerHeight = this._option.height || this._containerHeight;

    const rows: { items: any[]; width: number; height: number }[] = [];
    let currentRowItems: any[] = [];
    let currentRowWidth = 0;
    let currentRowHeight = 0;

    if (this._option.orient === 'horizontal') {
      measurements.forEach((m, i) => {
        const { itemW, itemH } = m;
        if (
          currentRowWidth + itemW > containerWidth - padding &&
          i > 0 &&
          currentRowItems.length > 0
        ) {
          rows.push({
            items: currentRowItems,
            width: currentRowWidth - itemGap,
            height: currentRowHeight,
          });
          currentRowItems = [];
          currentRowWidth = 0;
          currentRowHeight = 0;
        }

        currentRowItems.push(m);
        currentRowWidth += itemW + itemGap;
        currentRowHeight = Math.max(currentRowHeight, itemH);
      });
      if (currentRowItems.length > 0) {
        rows.push({
          items: currentRowItems,
          width: currentRowWidth - itemGap,
          height: currentRowHeight,
        });
      }
    } else {
      const effectiveHeight = containerHeight - padding * 2;
      let currentY = 0;

      measurements.forEach((m) => {
        if (
          currentY + m.itemH > effectiveHeight &&
          currentRowItems.length > 0
        ) {
          rows.push({
            items: currentRowItems,
            width: currentRowWidth,
            height: currentY,
          });
          currentRowItems = [];
          currentY = 0;
          currentRowWidth = 0;
        }

        currentRowItems.push(m);
        currentY += m.itemH + itemGap;
        currentRowWidth = Math.max(currentRowWidth, m.itemW);
      });

      if (currentRowItems.length > 0) {
        const finalHeight = currentY > 0 ? currentY - itemGap : 0;
        rows.push({
          items: currentRowItems,
          width: currentRowWidth,
          height: finalHeight,
        });
      }
    }

    let maxLineMetric = 0;
    rows.forEach((r) => {
      maxLineMetric = Math.max(
        maxLineMetric,
        this._option.orient === 'horizontal' ? r.width : r.height,
      );
    });

    const layoutItems: any[] = [];
    let currentX = padding;
    let currentY = padding;
    let totalWidth = 0;
    let totalHeight = 0;
    const align = this._option.align || 'left';

    // If width is specified in option, use it for alignment reference?
    const referenceWidth = this._option.width
      ? this._option.width - padding * 2
      : maxLineMetric;

    if (this._option.orient === 'horizontal') {
      rows.forEach((row) => {
        let startX = currentX;
        if (align === 'center') {
          startX += (referenceWidth - row.width) / 2;
        } else if (align === 'right') {
          startX += referenceWidth - row.width;
        }

        let rowX = startX;
        row.items.forEach((m) => {
          layoutItems.push({
            item: m.item,
            x: rowX,
            y: currentY,
            width: m.itemW,
            height: m.itemH,
            lines: m.lines,
            lineHeight: m.lineHeight,
          });
          rowX += m.itemW + itemGap;
        });
        currentY += row.height + itemGap;
      });
      totalWidth = referenceWidth + padding * 2;
      if (!this._option.width) {
        totalWidth = maxLineMetric + padding * 2;
      }
      totalHeight = currentY - itemGap + padding;
    } else {
      rows.forEach((col) => {
        let colX = currentX;

        col.items.forEach((m) => {
          let itemX = colX;
          if (align === 'center') {
            itemX += (col.width - m.itemW) / 2;
          } else if (align === 'right') {
            itemX += col.width - m.itemW;
          }

          layoutItems.push({
            item: m.item,
            x: itemX,
            y: currentY,
            width: m.itemW,
            height: m.itemH,
            lines: m.lines,
            lineHeight: m.lineHeight,
          });
          currentY += m.itemH + itemGap;
        });

        currentX += col.width + itemGap;
        currentY = padding; // Reset Y for next column
      });

      totalWidth = currentX - itemGap + padding;
      // totalHeight is max column height
      let maxH = 0;
      rows.forEach((r) => (maxH = Math.max(maxH, r.height)));
      totalHeight = maxH + padding * 2;
    }

    const bgRect = new Rect({
      shape: {
        x: 0,
        y: 0,
        width: totalWidth,
        height: totalHeight,
        r: this._option.borderRadius ?? 0,
      },
      style: {
        fill: this._option.backgroundColor,
        stroke: this._option.borderColor,
        lineWidth: this._option.borderWidth,
      },
    });
    this.add(bgRect);

    layoutItems.forEach((layout) => {
      const { item, x, y, width, height, lines, lineHeight } = layout;
      const isSelected = this._selectedItems.has(item.name);

      const itemPadding = this._option.itemPadding || 8;
      const contentX = x + itemPadding;
      const contentY = y + itemPadding;

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
      const firstLineCenterY = contentY + lineHeight / 2;

      if (icon === 'circle') {
        iconElement = new Circle({
          shape: { cx: contentX + 6, cy: firstLineCenterY, r: 4 },
          style: {
            fill: isSelected ? fillStyle : this._option.inactiveColor || item.color,
            opacity: isSelected ? 1 : 0.3,
          },
        });
      } else if (icon === 'line') {
        iconElement = new Line({
          shape: {
            x1: contentX,
            y1: firstLineCenterY,
            x2: contentX + 12,
            y2: firstLineCenterY,
          },
          style: {
            stroke: isSelected ? strokeStyle : this._option.inactiveColor || item.color,
            lineWidth: 2,
            opacity: isSelected ? 1 : 0.3,
          },
        });
      } else {
        iconElement = new Rect({
          shape: {
            x: contentX,
            y: firstLineCenterY - 6,
            width: 12,
            height: 12,
            r: 2,
          },
          style: {
            fill: isSelected ? fillStyle : this._option.inactiveColor || item.color,
            opacity: isSelected ? 1 : 0.3,
          },
        });
      }

      this.add(iconElement);
      this._itemRects.set(item.name, iconElement);

      lines.forEach((line: string, lineIndex: number) => {
        const customTextStyle = item.textStyle || {};
        const label = new Text({
          shape: {
            text: line,
            x: contentX + iconWidth + iconGap,
            y: contentY + lineHeight * lineIndex + lineHeight / 2,
          },
          style: {
            fill: customTextStyle.color || this._option.textColor,
            fontSize: customTextStyle.fontSize || fontSize,
            fontWeight: customTextStyle.fontWeight,
            fontFamily: customTextStyle.fontFamily,
            opacity: isSelected ? 1 : 0.5,
            textBaseline: 'middle',
          },
        });
        this.add(label);
      });

      const interactRect = new Rect({
        shape: { x, y, width: width, height: height },
        style: { fill: COLOR_TRANSPARENT },
        cursor: 'pointer',
      });

      (interactRect as any).on('click', () => {
        if (this._option.selectedMode === 'single') {
          if (
            this._selectedItems.has(item.name) &&
            this._selectedItems.size === 1
          ) {
            // Already selected and it's the only one -> Restore all
            this._items.forEach((i) => this._selectedItems.add(i.name));
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
        interactRect.attr('style', { fill: COLOR_TRANSPARENT });
        if (this._option.onHover) {
          this._option.onHover(item.name, true);
        }
        this.markRedraw();
      });

      (interactRect as any).on('mouseout', () => {
        interactRect.attr('style', { fill: COLOR_TRANSPARENT });
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
    } else if (this._option.x === 'right') {
      x = Math.max(0, this._containerWidth - totalWidth - 10);
    } else if (this._option.x === 'center') {
      x = Math.max(0, (this._containerWidth - totalWidth) / 2);
    } else if (this._option.right !== undefined) {
      const rightVal = this._option.right;
      const rightPx =
        typeof rightVal === 'number'
          ? rightVal
          : parseFloat(String(rightVal)) || 10;
      x = Math.max(0, this._containerWidth - totalWidth - rightPx);
    } else {
      x = Math.max(0, this._containerWidth - totalWidth - 10);
    }

    let y: number;
    if (typeof this._option.y === 'number') {
      y = this._option.y;
    } else if (this._option.y === 'top') {
      y = 10;
    } else if (this._option.y === 'middle') {
      y = Math.max(0, (this._containerHeight - totalHeight) / 2);
    } else if (this._option.bottom !== undefined) {
      const bottomVal = this._option.bottom;
      const bottomPx =
        typeof bottomVal === 'number'
          ? bottomVal
          : parseFloat(String(bottomVal)) || 10;
      y = Math.max(0, this._containerHeight - totalHeight - bottomPx);
    } else {
      y = 10;
    }
    this.attr('transform', { x, y });
  }

  private _renderHtml(): void {
    if (!this._domContainer) return;
    this.removeAll();

    if (!this._htmlEl) {
      this._htmlEl = document.createElement('div');
      this._htmlEl.style.position = 'absolute';
      this._htmlEl.style.zIndex = '999';
      this._domContainer.appendChild(this._htmlEl);
    }

    const opt = this._option;
    const theme = ThemeManager.getTheme();
    const s = this._htmlEl.style;
    s.backgroundColor = String(opt.backgroundColor ?? theme.backgroundColor);
    s.padding = (opt.padding || 8) + 'px';
    s.fontSize = (opt.fontSize || 12) + 'px';
    s.color = String(opt.textColor ?? theme.legendTextColor);
    s.borderRadius = `${opt.borderRadius ?? DEFAULT_BORDER_RADIUS}px`;
    s.pointerEvents = 'auto';
    s.display = 'block';

    s.transform = '';
    s.left = '';
    s.right = '';
    s.top = '';
    s.bottom = '';

    const formatSize = (val: number | string | undefined) => {
      if (val === undefined) return undefined;
      if (typeof val === 'number') return val + 'px';
      return val;
    };

    if (typeof opt.x === 'number') s.left = opt.x + 'px';
    else if (opt.x === 'left') s.left = '10px';
    else if (opt.x === 'right') s.right = '10px';
    else if (opt.x === 'center') {
      s.left = '50%';
      s.transform = 'translateX(-50%)';
    } else {
      if (opt.right !== undefined) s.right = formatSize(opt.right) || '';
      else s.right = '10px';
    }

    if (typeof opt.y === 'number') s.top = opt.y + 'px';
    else if (opt.y === 'top') s.top = '10px';
    else if (opt.y === 'bottom') s.bottom = '10px';
    else if (opt.y === 'middle') {
      s.top = '50%';
      s.transform = s.transform
        ? s.transform + ' translateY(-50%)'
        : 'translateY(-50%)';
    } else {
      if (opt.bottom !== undefined) s.bottom = formatSize(opt.bottom) || '';
      else s.top = '10px';
    }

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

    if (opt.tableHead) {
      const thead = document.createElement('thead');
      const trHead = document.createElement('tr');
      // Add empty th for icon column
      const thIcon = document.createElement('th');
      trHead.appendChild(thIcon);

      opt.tableHead.forEach((headText) => {
        const th = document.createElement('th');
        th.innerHTML = headText;
        th.style.textAlign = 'left';
        th.style.padding = '4px 8px';
        th.style.borderBottom = `1px solid ${opt.borderColor ?? theme.borderColor}`;
        trHead.appendChild(th);
      });
      thead.appendChild(trHead);
      table.appendChild(thead);
    }

    this._items.forEach((item) => {
      const isSelected = this._selectedItems.has(item.name);
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.style.opacity = isSelected ? '1' : '0.5';

      tr.onclick = (e) => {
        e.stopPropagation();
        if (opt.selectedMode === 'single') {
          if (
            this._selectedItems.has(item.name) &&
            this._selectedItems.size === 1
          ) {
            this._items.forEach((i) => this._selectedItems.add(i.name));
          } else {
            this._selectedItems.clear();
            this._selectedItems.add(item.name);
          }
        } else {
          if (this._selectedItems.has(item.name))
            this._selectedItems.delete(item.name);
          else this._selectedItems.add(item.name);
        }
        if (opt.onSelect)
          opt.onSelect(item.name, this._selectedItems.has(item.name));
        this._renderHtml();
      };

      tr.onmouseover = () => {
        if (opt.onHover) {
          opt.onHover(item.name, true);
        }
      };

      tr.onmouseout = () => {
        if (opt.onHover) {
          opt.onHover(item.name, false);
        }
      };

      const tdIcon = document.createElement('td');
      const itemPadding = (opt.itemPadding ?? 8) + 'px';
      tdIcon.style.paddingTop = itemPadding;
      tdIcon.style.paddingBottom = itemPadding;
      tdIcon.style.paddingLeft = itemPadding;
      tdIcon.style.paddingRight = (opt.iconGap || 8) + 'px';
      tdIcon.style.verticalAlign = 'middle';

      const icon = document.createElement('span');
      icon.style.display = 'inline-block';
      icon.style.width = '12px';
      icon.style.height = '12px';
      icon.style.backgroundColor = item.color;
      if (item.icon === 'circle') icon.style.borderRadius = '50%';
      else if (item.icon === 'rect') icon.style.borderRadius = '2px';
      else if (item.icon === 'line') {
        icon.style.height = '2px';
        icon.style.width = '12px';
        icon.style.marginTop = '5px';
      }

      tdIcon.appendChild(icon);
      tr.appendChild(tdIcon);

      let labelContent: string | string[] = item.name;
      if (opt.formatter) {
        if (typeof opt.formatter === 'string') {
          labelContent = opt.formatter;
        } else {
          labelContent = opt.formatter(item.name, item);
        }
      }

      if (Array.isArray(labelContent)) {
        labelContent.forEach((content) => {
          const td = document.createElement('td');
          td.style.verticalAlign = 'middle';
          td.style.padding = (opt.itemPadding ?? 8) + 'px';
          td.innerHTML = content;
          tr.appendChild(td);
        });
      } else {
        const tdLabel = document.createElement('td');
        tdLabel.style.verticalAlign = 'middle';
        tdLabel.innerHTML = labelContent;
        tdLabel.style.padding = (opt.itemPadding ?? 8) + 'px';
        tr.appendChild(tdLabel);
      }

      table.appendChild(tr);
    });

    this._htmlEl.innerHTML = '';
    this._htmlEl.appendChild(table);
  }
}
