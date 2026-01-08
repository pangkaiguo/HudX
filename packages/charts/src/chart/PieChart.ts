import Chart from '../Chart';
import type { SeriesOption, ChartData, EmphasisOption } from '../types';
import { Sector, Text, Polyline, createDecalPattern, Z_SERIES, Z_LABEL } from 'HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class PieChart extends Chart {
  private _activeSectors: Map<string, Sector> = new Map();
  private _centerLabel: Text | null = null;
  private _restoreTimeout: any = null;

  protected _render(): void {
    try {
      if (this._legend) {
        this._root.remove(this._legend);
      }

      if (this._centerLabel) {
        this._root.remove(this._centerLabel);
        this._centerLabel = null;
      }

      if (!this._activeSectors) {
        this._activeSectors = new Map();
      }

      const oldSectors = this._activeSectors;
      this._activeSectors = new Map();

      this._root.removeAll();
      this._mountTitle();

      const option = this._option;
      const series = option.series || [];

      if (series.length === 0) {
        return;
      }

      const seriesItem = series[0];
      if (!seriesItem.type || !['pie', 'doughnut', 'half-doughnut'].includes(seriesItem.type)) {
        return;
      }

      const data = seriesItem.data || [];
      if (data.length === 0) {
        return;
      }

      const center = this._getCenter(seriesItem);
      const [r0, r] = this._getRadius(seriesItem);
      const cx = center[0];
      const cy = center[1];

      const total = this._calculateTotal(data as any[]);

      if (total === 0) {
        if (option.legend?.show !== false) {
          const items = (data as any[]).map((it: any, i: number) => ({
            name: (typeof it === 'object' && it.name) ? it.name : `item-${i + 1}`,
            color: (typeof it === 'object' && it.itemStyle?.color) || seriesItem.itemStyle?.color || this._getSeriesColor(i),
            textColor: this.getThemeConfig().legendTextColor
          }));
          this._mountLegend(items);
        }
        return;
      }

      const computeAngles = (seriesItem: any) => {
        let startAngle: number;
        const degToRad = (deg: number) => deg * Math.PI / 180;
        if (seriesItem.startAngle !== undefined) {
          startAngle = degToRad(seriesItem.startAngle);
        } else if (seriesItem.type === 'half-doughnut') {
          startAngle = -Math.PI;
        } else {
          startAngle = -Math.PI / 2;
        }

        let endAngle: number;
        if (seriesItem.endAngle !== undefined) {
          endAngle = degToRad(seriesItem.endAngle);
        } else if (seriesItem.type === 'half-doughnut') {
          endAngle = 0;
        } else {
          endAngle = startAngle + Math.PI * 2;
        }

        return { startAngle, endAngle };
      }

      const { startAngle, endAngle } = computeAngles(seriesItem);

      const totalAngle = endAngle - startAngle;
      let currentAngle = startAngle;

      if (option.legend?.show !== false) {
        const items = (data as any[]).map((it: any, i: number) => ({
          name: (typeof it === 'object' && it.name) ? it.name : `item-${i + 1}`,
          color: (typeof it === 'object' && it.itemStyle?.color) || seriesItem.itemStyle?.color || this._getSeriesColor(i),
          icon: option.legend?.icon || 'circle',
          textColor: this.getThemeConfig().legendTextColor
        }));
        this._mountLegend(items);
      }

      const labelLayoutList: any[] = [];

      data.forEach((item: ChartData, index: number) => {
        let value = 0;
        if (typeof item === 'number') value = item;
        else if (Array.isArray(item)) value = item[0] || 0;
        else if (typeof item === 'object' && item !== null) value = item.value;

        if (typeof value !== 'number') return;
        const percent = value / total;
        const angle = percent * totalAngle;
        let itemName = `item-${index + 1}`;
        if (typeof item === 'object' && item !== null && !Array.isArray(item) && item.name) {
          itemName = item.name;
        }
        if (this._legend && !this._legendSelected.has(itemName)) {
          return;
        }

        const itemStyle = seriesItem.itemStyle || {};
        let color: string;
        if (typeof item === 'object' && item !== null && !Array.isArray(item) && item.itemStyle?.color) {
          color = item.itemStyle.color;
        } else {
          color = itemStyle.color || this._getSeriesColor(index);
        }

        let fillStyle: string | CanvasPattern = color;
        const aria = option.aria;
        if (aria?.enabled && aria?.decal?.show) {
          const decals = aria.decal.decals || [];
          const decal = decals[index % decals.length] || { symbol: 'circle' };

          const pattern = createDecalPattern(decal, color);
          if (pattern) {
            fillStyle = pattern;
          }
        }

        const targetStart = currentAngle;
        const targetEnd = currentAngle + angle;

        let initialStart = targetStart;
        let initialEnd = targetStart;

        const oldSector = oldSectors.get(itemName);
        if (oldSector) {
          initialStart = oldSector.shape.startAngle;
          initialEnd = oldSector.shape.endAngle;
        } else if (oldSectors.size > 0) {
        }

        const sector = new Sector({
          name: itemName,
          data: item,
          dataIndex: index,
          shape: {
            cx,
            cy,
            r,
            r0,
            startAngle: initialStart,
            endAngle: initialEnd,
            anticlockwise: false,
          },
          style: {
            fill: fillStyle,
            stroke: seriesItem.itemStyle?.borderColor || '#fff',
            lineWidth: seriesItem.itemStyle?.borderWidth ?? 0,
          },
          transform: {
            x: 0, y: 0, scaleX: 1, scaleY: 1, originX: cx, originY: cy
          },
          z: Z_SERIES,
          cursor: (this._tooltip || seriesItem.emphasis) ? 'pointer' : 'default',
        });
        (sector as any).__baseR = r;
        // Fix: Save initial style immediately to prevent capturing modified style (e.g. opacity) later
        (sector as any).__initialStyle = { ...sector.style };

        this._root.add(sector);
        this._activeSectors.set(itemName, sector);

        if (this._tooltip || seriesItem.emphasis) {
          const emphasis = seriesItem.emphasis;

          EventHelper.bindHoverEvents(
            sector,
            (evt: any) => {
              if (this._restoreTimeout) {
                clearTimeout(this._restoreTimeout);
                this._restoreTimeout = null;
              }

              this._applyEmphasisAnimation(sector, emphasis, true, r);

              if (this._tooltip) {
                let itemName = '';
                if (typeof item === 'object' && item !== null && !Array.isArray(item) && item.name) {
                  itemName = item.name;
                }
                const itemValue = value;

                const params = {
                  componentType: 'series',
                  seriesType: 'pie',
                  seriesIndex: 0,
                  seriesName: seriesItem.name,
                  name: itemName,
                  dataIndex: index,
                  data: item,
                  value: itemValue,
                  percent: percent * 100
                };

                const content = this._generateTooltipContent(params);

                const mx = evt?.offsetX ?? cx;
                const my = evt?.offsetY ?? cy;
                this._tooltip.show(mx, my, content, params);
              }

              const seriesType = seriesItem.type || 'pie';
              if (['doughnut', 'half-doughnut'].includes(seriesType) && r0 > 0) {
                this._showDynamicCenterLabel(seriesItem, item, value, percent, cx, cy, emphasis);
              }
            },
            () => {
              // Delay restore to prevent flickering when moving between sectors
              this._restoreTimeout = setTimeout(() => {
                this._applyEmphasisAnimation(sector, emphasis, false, r);

                if (this._tooltip) {
                  this._tooltip.hide();
                }

                if (this._centerLabel) {
                  this._root.remove(this._centerLabel);
                  this._centerLabel = null;
                }

                this._renderStaticCenterLabel(seriesItem, cx, cy, r0, total);
                this._restoreTimeout = null;
              }, 50);
            }
          );

          sector.on('mousemove', (evt: any) => {

            const mx = evt?.offsetX ?? cx;
            const my = evt?.offsetY ?? cy;
            const currentEnd = sector.shape.endAngle;
            const partPercent = (currentEnd - sector.shape.startAngle) / (Math.PI * 2) * 100;
            let itemName = '';
            if (typeof item === 'object' && item !== null && !Array.isArray(item) && item.name) {
              itemName = item.name;
            }
            const itemValue = value;

            const params = {
              componentType: 'series',
              seriesType: 'pie',
              seriesIndex: 0,
              seriesName: seriesItem.name,
              name: itemName,
              dataIndex: index,
              data: item,
              value: itemValue,
              percent: partPercent
            };
            const content = this._generateTooltipContent(params);

            if (this._tooltip) {
              if (!this._tooltip.isVisible()) {
                this._applyEmphasisAnimation(sector, emphasis, true, r);
              }
              this._tooltip.show(mx, my, content, params);
            }
          });
        }

        if (this._shouldAnimateFor(itemName) || oldSector) {
          const isUpdate = oldSectors.size > 0;
          const delay = isUpdate ? 0 : index * 200;
          const duration = this._getAnimationDuration(isUpdate);
          const easing = this._getAnimationEasing(isUpdate);

          this._animator.animate(
            sector.attr('shape'),
            'startAngle',
            targetStart,
            {
              duration,
              delay,
              easing,
              onUpdate: () => sector.markRedraw()
            }
          ).start();

          this._animator.animate(
            sector.attr('shape'),
            'endAngle',
            targetEnd,
            {
              duration,
              delay,
              easing,
              onUpdate: () => sector.markRedraw()
            }
          ).start();
        } else {
          sector.attr('shape', {
            startAngle: targetStart,
            endAngle: targetEnd
          });
        }

        if (seriesItem.label?.show !== false) {
          const labelAngle = targetStart + angle / 2;
          const isOutside = seriesItem.label?.position === 'outside' || seriesItem.label?.position === undefined;

          let labelText: string;
          const formatter = seriesItem.label?.formatter;
          if (formatter) {
            labelText = this._formatLabel(formatter, {
              name: (item as any).name || '',
              value,
              percent: (percent * 100).toFixed(0),
              data: item
            });
          } else {
            labelText = (item as any).name || '';
          }

          labelLayoutList.push({
            text: labelText,
            angle: labelAngle,
            sector,
            isOutside,
            item,
            color: seriesItem.label?.color || (isOutside ? '#333' : '#fff'),
            itemColor: color,
            seriesItem
          });
        }

        currentAngle += angle;
      });

      this._layoutLabels(labelLayoutList, cx, cy, r, r0);

      this._renderStaticCenterLabel(seriesItem, cx, cy, r0, total);

      this._renderer.flush();
    } catch (e) {
      console.error('[PieChart] Render error:', e);
    }
  }

  private _calculateTotal(data: any[]): number {
    return data.reduce((sum: number, item: ChartData, index: number) => {
      let itemName = `item-${index + 1}`;
      if (typeof item === 'object' && item !== null && !Array.isArray(item) && item.name) {
        itemName = item.name;
      }
      if (this._legend && !this._legendSelected.has(itemName)) {
        return sum;
      }
      let value: number = 0;
      if (typeof item === 'number') {
        value = item;
      } else if (Array.isArray(item)) {
        value = item[0] || 0;
      } else if (typeof item === 'object' && item !== null) {
        value = item.value;
      }
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  }

  private _showDynamicCenterLabel(seriesItem: any, item: any, value: number, percent: number, cx: number, cy: number, emphasis: any): void {
    if (this._centerLabel) {
      this._root.remove(this._centerLabel);
    }

    let itemName = '';
    if (typeof item === 'object' && item !== null && !Array.isArray(item) && item.name) {
      itemName = item.name;
    }
    const itemValue = value;

    let textContent = itemName;
    let rich = emphasis?.label?.rich || seriesItem.label?.rich;
    let style: any = {
      fill: emphasis?.label?.color || seriesItem.label?.color || '#333',
      fontSize: emphasis?.label?.fontSize || 20,
      fontWeight: emphasis?.label?.fontWeight || 'bold',
      textAlign: 'center',
      textBaseline: 'middle'
    };

    // Merge emphasis label style
    if (emphasis?.label) {
      style = { ...style, ...emphasis.label };
    }

    // Ensure rich style falls back to centerLabel.rich if not defined in emphasis/label
    if (!rich) {
      rich = seriesItem.centerLabel?.rich;
    }

    // Use formatter if available
    if (emphasis?.label?.formatter) {
      textContent = this._formatLabel(emphasis.label.formatter, {
        name: itemName,
        value: itemValue,
        percent: percent * 100,
        data: item
      });
    } else if (seriesItem.centerLabel?.formatter) {
      // Reuse centerLabel formatter for generic template
      textContent = this._formatLabel(seriesItem.centerLabel.formatter, {
        name: itemName,
        value: itemValue,
        percent: percent * 100,
        data: item
      });
    }

    this._centerLabel = new Text({
      shape: {
        x: cx,
        y: cy,
        text: textContent
      },
      style: { ...style, rich },
      z: Z_LABEL + 1
    });
    this._root.add(this._centerLabel);
  }

  private _renderStaticCenterLabel(seriesItem: any, cx: number, cy: number, r0: number, total: number): void {
    const centerLabelConfig = seriesItem.centerLabel || {};
    if (centerLabelConfig.show === false || r0 <= 0) return;
    if (this._centerLabel) return;

    let textContent = '';
    let rich = centerLabelConfig.rich || seriesItem.label?.rich;
    const style = {
      fill: seriesItem.label?.color || '#333',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      textBaseline: 'middle',
      ...centerLabelConfig.style
    };

    if (centerLabelConfig.type === 'percentage') {
      const data = seriesItem.data || [];
      if (data.length > 0) {
        const firstVal = (data[0].value || data[0]);
        const percent = (firstVal / total * 100).toFixed(0);
        const defaultFormatter = '{d}%';
        const fmt = centerLabelConfig.formatter || defaultFormatter;
        textContent = this._formatLabel(fmt, { name: data[0].name || '', value: firstVal, percent, data: data[0] });

        if (!centerLabelConfig.style?.backgroundColor) {
          style.backgroundColor = '#eee';
          style.borderRadius = 20;
          style.padding = [5, 15];
        }
      }
    } else {
      const fmt = centerLabelConfig.formatter;
      if (typeof fmt === 'string') {
        textContent = fmt;
      } else if (typeof fmt === 'function') {
        textContent = fmt({ total });
      }
    }

    if (textContent) {
      this._centerLabel = new Text({
        shape: { x: cx, y: cy, text: textContent },
        style: { ...style, rich },
        z: Z_LABEL
      });
      this._root.add(this._centerLabel);
    }
  }



  private _formatLabel(formatter: string | Function, params: { name: string, value: number, percent: string | number, data?: any }): string {
    if (typeof formatter === 'function') {
      return formatter(params);
    }
    if (typeof formatter === 'string') {
      let result = formatter
        .replace(/\{b\}/g, params.name)
        .replace(/\{c\}/g, String(params.value))
        .replace(/\{d\}/g, String(params.percent))
        .replace(/\{name\}/g, params.name)
        .replace(/\{value\}/g, String(params.value))
        .replace(/\{percent\}/g, String(params.percent));

      if (params.data && typeof params.data === 'object') {
        Object.keys(params.data).forEach(key => {
          const val = params.data[key];
          if (typeof val === 'string' || typeof val === 'number') {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
          }
        });
      }
      return result;
    }
    return '';
  }

  private _layoutLabels(labels: any[], cx: number, cy: number, r: number, r0: number): void {
    const leftLabels: any[] = [];
    const rightLabels: any[] = [];

    labels.forEach(label => {
      const angle = label.angle;
      let normalizedAngle = angle % (Math.PI * 2);
      if (normalizedAngle > Math.PI) normalizedAngle -= Math.PI * 2;
      if (normalizedAngle < -Math.PI) normalizedAngle += Math.PI * 2;

      const isRight = normalizedAngle >= -Math.PI / 2 && normalizedAngle <= Math.PI / 2;

      const anchorR = r;
      const anchorX = cx + Math.cos(angle) * anchorR;
      const anchorY = cy + Math.sin(angle) * anchorR;

      label.anchor = { x: anchorX, y: anchorY };
      label.normalizedAngle = normalizedAngle;
      label.isRight = isRight;

      if (label.isOutside) {
        if (isRight) rightLabels.push(label);
        else leftLabels.push(label);
      } else {
        this._renderSingleLabel(label, cx, cy, r, r0);
      }
    });

    rightLabels.sort((a, b) => a.normalizedAngle - b.normalizedAngle);
    rightLabels.sort((a, b) => a.anchor.y - b.anchor.y);
    leftLabels.sort((a, b) => a.anchor.y - b.anchor.y);

    this._adjustLabelPositions(rightLabels, cx, cy, r, 1);
    this._adjustLabelPositions(leftLabels, cx, cy, r, -1);
  }

  private _adjustLabelPositions(labels: any[], cx: number, cy: number, r: number, dir: 1 | -1): void {
    if (labels.length === 0) return;

    const labelHeight = 14;
    const minGap = 5;
    const labelLineLen1 = 15;
    const labelLineLen2 = 15;

    labels.forEach(label => {
      const angle = label.angle;
      const targetR = r + labelLineLen1;
      let y = cy + Math.sin(angle) * targetR;
      label.y = y;
      label.x = cx + Math.cos(angle) * targetR;
    });

    for (let i = 1; i < labels.length; i++) {
      const prev = labels[i - 1];
      const curr = labels[i];
      if (curr.y - prev.y < labelHeight + minGap) {
        curr.y = prev.y + labelHeight + minGap;
      }
    }

    labels.forEach(label => {
      const r2 = r + labelLineLen1;
      let dy = label.y - cy;
      if (Math.abs(dy) > r2) dy = (dy > 0 ? 1 : -1) * r2;

      let dx = Math.sqrt(Math.abs(r2 * r2 - dy * dy));
      let elbowX = cx + (dir * dx);

      const elbowY = label.y;

      const textX = elbowX + (dir * labelLineLen2);
      const textY = elbowY;

      const seriesItem = label.seriesItem;
      const rich = seriesItem.label?.rich;

      const text = new Text({
        shape: {
          x: textX + (dir * 5),
          y: textY,
          text: label.text,
        },
        style: {
          fontSize: seriesItem.label?.fontSize || 12,
          fontWeight: seriesItem.label?.fontWeight || 'normal',
          fill: label.color,
          textAlign: dir === 1 ? 'left' : 'right',
          textBaseline: 'middle',
          rich: rich,
          backgroundColor: seriesItem.label?.backgroundColor,
          borderColor: seriesItem.label?.borderColor,
          borderWidth: seriesItem.label?.borderWidth,
          borderRadius: seriesItem.label?.borderRadius,
          padding: seriesItem.label?.padding
        },
        z: Z_LABEL,
        silent: true
      });
      this._root.add(text);
      (label.sector as any).__label = text;

      if (seriesItem.labelLine?.show !== false) {
        const linePoints = [
          [label.anchor.x, label.anchor.y],
          [elbowX, elbowY],
          [textX, textY]
        ];
        const line = new Polyline({
          shape: { points: linePoints },
          style: {
            stroke: seriesItem.labelLine?.lineStyle?.color || label.itemColor || label.color,
            lineWidth: seriesItem.labelLine?.lineStyle?.width || 1,
            fill: 'none'
          },
          z: Z_LABEL,
          silent: true
        });
        this._root.add(line);
      }
    });
  }

  private _renderSingleLabel(label: any, cx: number, cy: number, r: number, r0: number): void {
    const seriesItem = label.seriesItem;
    const isCenter = seriesItem.label?.position === 'center';
    const angle = label.angle;

    let labelX, labelY;
    if (isCenter) {
      labelX = cx;
      labelY = cy;
    } else {
      const finalLabelRadius = (r + r0) / 2;
      labelX = cx + Math.cos(angle) * finalLabelRadius;
      labelY = cy + Math.sin(angle) * finalLabelRadius;
    }

    const text = new Text({
      shape: {
        x: labelX,
        y: labelY,
        text: label.text,
      },
      style: {
        fontSize: seriesItem.label?.fontSize || 12,
        fontWeight: seriesItem.label?.fontWeight || 'normal',
        fill: label.color,
        textAlign: 'center',
        textBaseline: 'middle',
        rich: seriesItem.label?.rich
      },
      z: Z_LABEL,
      silent: true
    });
    this._root.add(text);
    (label.sector as any).__label = text;
  }


  private _getCenter(seriesItem: SeriesOption): [number, number] {
    const center = (seriesItem as any).center;
    if (Array.isArray(center)) {
      return [
        typeof center[0] === 'string' ? this._parsePercent(center[0], this._width) : center[0],
        typeof center[1] === 'string' ? this._parsePercent(center[1], this._height) : center[1],
      ];
    }
    return [this._width / 2, this._height / 2];
  }

  protected _onLegendHover(name: string, hovered: boolean): void {
    const series = this._option.series || [];
    if (series.length === 0) return;
    const seriesItem = series[0];
    const emphasis = seriesItem.emphasis;
    const [r0, r] = this._getRadius(seriesItem);
    const sector = this._activeSectors.get(name);

    if (!sector) return;

    const cx = sector.shape.cx;
    const cy = sector.shape.cy;

    if (hovered) {
      if (this._restoreTimeout) {
        clearTimeout(this._restoreTimeout);
        this._restoreTimeout = null;
      }

      this._applyEmphasisAnimation(sector, emphasis, true, r);

      const seriesType = seriesItem.type || 'pie';
      if (['doughnut', 'half-doughnut'].includes(seriesType) && r0 > 0) {
        const item = (sector as any).data;
        const total = this._calculateTotal(seriesItem.data || []);
        const value = this._getDataValue(item) || 0;
        const percent = total > 0 ? value / total : 0;

        this._showDynamicCenterLabel(seriesItem, item, value, percent, cx, cy, emphasis);
      }
    } else {
      this._applyEmphasisAnimation(sector, emphasis, false, r);

      const seriesType = seriesItem.type || 'pie';
      if (['doughnut', 'half-doughnut'].includes(seriesType) && r0 > 0) {
        if (this._restoreTimeout) {
          clearTimeout(this._restoreTimeout);
        }

        this._restoreTimeout = setTimeout(() => {
          if (this._centerLabel) {
            this._root.remove(this._centerLabel);
            this._centerLabel = null;
          }

          const total = this._calculateTotal(seriesItem.data || []);
          this._renderStaticCenterLabel(seriesItem, cx, cy, r0, total);
          this._restoreTimeout = null;
        }, 50);
      }
    }
  }

  private _getRadius(seriesItem: SeriesOption): [number, number] {
    const radius = (seriesItem as any).radius;
    const maxRadius = Math.min(this._width, this._height) / 2;

    if (Array.isArray(radius)) {
      return [
        this._parsePercent(radius[0], maxRadius),
        this._parsePercent(radius[1], maxRadius)
      ];
    }

    if (typeof radius === 'string') {
      const outer = this._parsePercent(radius, maxRadius);
      if (seriesItem.type === 'doughnut' || seriesItem.type === 'half-doughnut') {
        return [outer * 0.5, outer];
      }
      return [0, outer];
    }
    if (typeof radius === 'number') {
      if (seriesItem.type === 'doughnut' || seriesItem.type === 'half-doughnut') {
        return [radius * 0.5, radius];
      }
      return [0, radius];
    }
    if (seriesItem.type === 'doughnut' || seriesItem.type === 'half-doughnut') {
      return [maxRadius * 0.4, maxRadius * 0.8];
    }
    return [0, maxRadius * 0.8];
  }

  private _parsePercent(value: string | number, base: number): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string' && value.endsWith('%')) {
      return parseFloat(value) / 100 * base;
    }
    return parseFloat(value as string) || 0;
  }

  private _applyEmphasisAnimation(sector: Sector, emphasis: EmphasisOption | undefined, isEnter: boolean, baseR?: number): void {
    if (isEnter) {
      this._activeSectors.forEach((s) => {
        if (s !== sector) {
          // Check focus policy
          const focus = emphasis?.focus || 'none';
          if (focus === 'self') {
            this._animator.animate(s.style, 'opacity', 0.2, { duration: 200 }).start();
            if ((s as any).__label) {
              this._animator.animate(((s as any).__label).style, 'opacity', 0.2, { duration: 200 }).start();
            }
          }

          // Reset other properties (scale, radius, style) that might be stuck due to cancelled restore
          const sBaseR = (s as any).__baseR;
          if (sBaseR !== undefined) {
            this._animator.animate(s.shape, 'r', sBaseR, { duration: 200, easing: 'cubicOut', onUpdate: () => s.markRedraw() }).start();
          }
          if (s.transform) {
            this._animator.animate(s.transform, 'scaleX', 1, { duration: 200, easing: 'cubicOut', onUpdate: () => s.markRedraw() }).start();
            this._animator.animate(s.transform, 'scaleY', 1, { duration: 200, easing: 'cubicOut', onUpdate: () => s.markRedraw() }).start();
          }

          const init = (s as any).__initialStyle;
          if (init) {
            const targetStyle: Record<string, unknown> = {};
            if (init.shadowBlur !== undefined) targetStyle.shadowBlur = init.shadowBlur; else targetStyle.shadowBlur = 0;
            if (init.shadowOffsetX !== undefined) targetStyle.shadowOffsetX = init.shadowOffsetX; else targetStyle.shadowOffsetX = 0;
            if (init.shadowOffsetY !== undefined) targetStyle.shadowOffsetY = init.shadowOffsetY; else targetStyle.shadowOffsetY = 0;
            if (init.shadowColor !== undefined) targetStyle.shadowColor = init.shadowColor; else targetStyle.shadowColor = 'transparent';
            if (init.fill !== undefined) targetStyle.fill = init.fill;
            if (init.stroke !== undefined) targetStyle.stroke = init.stroke;
            if (init.lineWidth !== undefined) targetStyle.lineWidth = init.lineWidth;

            Object.keys(targetStyle).forEach(key => {
              const value = targetStyle[key];
              if (typeof value === 'number') {
                this._animator.animate(s.style, key, value, { duration: 200, easing: 'cubicOut', onUpdate: () => s.markRedraw() }).start();
              } else {
                (s.style as any)[key] = value;
                s.markRedraw();
              }
            });
          }
        }
      });
    } else {
      this._activeSectors.forEach((s) => {
        this._animator.animate(s.style, 'opacity', 1, { duration: 200 }).start();
        if ((s as any).__label) {
          this._animator.animate(((s as any).__label).style, 'opacity', 1, { duration: 200 }).start();
        }
      });
    }

    if (emphasis?.itemStyle) {
      const style = sector.style as Record<string, unknown>;
      const emphasisStyle = emphasis.itemStyle;

      if (!(sector as any).__initialStyle) {
        (sector as any).__initialStyle = { ...style };
      }

      const targetStyle: Record<string, unknown> = {};

      if (isEnter) {
        if (emphasisStyle.shadowBlur !== undefined) targetStyle.shadowBlur = emphasisStyle.shadowBlur;
        if (emphasisStyle.shadowOffsetX !== undefined) targetStyle.shadowOffsetX = emphasisStyle.shadowOffsetX;
        if (emphasisStyle.shadowOffsetY !== undefined) targetStyle.shadowOffsetY = emphasisStyle.shadowOffsetY;
        if (emphasisStyle.shadowColor !== undefined) targetStyle.shadowColor = emphasisStyle.shadowColor;
        if (emphasisStyle.color !== undefined) targetStyle.fill = emphasisStyle.color;
        if (emphasisStyle.borderColor !== undefined) targetStyle.stroke = emphasisStyle.borderColor;
        if (emphasisStyle.borderWidth !== undefined) targetStyle.lineWidth = emphasisStyle.borderWidth;

        targetStyle.opacity = 1;
      } else {
        const init = (sector as any).__initialStyle;
        if (init.shadowBlur !== undefined) targetStyle.shadowBlur = init.shadowBlur; else targetStyle.shadowBlur = 0;
        if (init.shadowOffsetX !== undefined) targetStyle.shadowOffsetX = init.shadowOffsetX; else targetStyle.shadowOffsetX = 0;
        if (init.shadowOffsetY !== undefined) targetStyle.shadowOffsetY = init.shadowOffsetY; else targetStyle.shadowOffsetY = 0;
        if (init.shadowColor !== undefined) targetStyle.shadowColor = init.shadowColor; else targetStyle.shadowColor = 'transparent';
        if (init.fill !== undefined) targetStyle.fill = init.fill;
        if (init.stroke !== undefined) targetStyle.stroke = init.stroke;
        if (init.lineWidth !== undefined) targetStyle.lineWidth = init.lineWidth;

        targetStyle.opacity = init.opacity !== undefined ? init.opacity : 1;
      }

      Object.keys(targetStyle).forEach(key => {
        const value = targetStyle[key];
        if (typeof value === 'number') {
          this._animator.animate(
            style,
            key,
            value,
            { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
          ).start();
        } else {
          style[key] = value;
          sector.markRedraw();
        }
      });
    } else {
      const initialOpacity = (sector as any).__initialOpacity ?? 1;
      this._animator.animate(
        sector.style as Record<string, unknown>,
        'opacity',
        isEnter ? 1 : initialOpacity,
        { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
      ).start();
    }

    if (emphasis?.scale && baseR !== undefined) {
      const scaleSize = emphasis.scaleSize || 1.1;
      const targetR = isEnter ? baseR * scaleSize : baseR;

      this._animator.animate(
        sector.shape as unknown as Record<string, unknown>,
        'r',
        targetR,
        { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
      ).start();
    } else if (emphasis?.scale) {
      const scaleSize = isEnter ? (emphasis.scaleSize || 1.1) : 1;

      this._animator.animate(
        sector.transform || {},
        'scaleX',
        scaleSize,
        { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
      ).start();

      this._animator.animate(
        sector.transform || {},
        'scaleY',
        scaleSize,
        { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
      ).start();
    }

    const label = (sector as any).__label;
    if (label && emphasis?.label) {
      if (isEnter) {
        if (emphasis.label.show !== undefined) {
          label.invisible = !emphasis.label.show;
          label.style.opacity = emphasis.label.show ? 1 : 0;
        }
        if (emphasis.label.fontSize !== undefined) {
          label.style.fontSize = emphasis.label.fontSize;
        }
        if (emphasis.label.fontWeight !== undefined) {
          label.style.fontWeight = emphasis.label.fontWeight;
        }
        if (emphasis.label.color !== undefined) {
          label.style.fill = emphasis.label.color;
        }
      } else {
        const seriesItem = this._option.series?.[0];
        if (seriesItem?.label) {
          label.invisible = !seriesItem.label.show;
          label.style.opacity = seriesItem.label.show ? 1 : 0;
          label.style.fontSize = seriesItem.label.fontSize || 12;
          label.style.fontWeight = seriesItem.label.fontWeight || 'normal';
        }
      }
      label.markRedraw();
    }
  }
}
