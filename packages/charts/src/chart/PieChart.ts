import Chart from '../Chart';
import type { SeriesOption, ChartData, EmphasisOption } from '../types';
import { Sector, Text, createDecalPattern } from 'HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class PieChart extends Chart {
  private _activeSectors: Map<string, Sector> = new Map();

  protected _render(): void {
    try {
      // We manually manage children clearing to support smooth transitions
      // Do NOT call super._render() which clears everything
      // But we need to ensure tooltip is present
      if (this._tooltip) {
        this._root.remove(this._tooltip);
      }
      if (this._legend) {
        this._root.remove(this._legend);
      }

      // Ensure activeSectors is initialized (first render called from super constructor)
      if (!this._activeSectors) {
        this._activeSectors = new Map();
      }

      // Keep track of old sectors
      const oldSectors = this._activeSectors;
      this._activeSectors = new Map();

      // Clear root but we will re-add reused sectors
      this._root.removeAll();

      if (this._tooltip) {
        this._root.add(this._tooltip);
      }

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

      // Calculate pie center and radius
      const center = this._getCenter(seriesItem);
      const [r0, r] = this._getRadius(seriesItem);
      const cx = center[0];
      const cy = center[1];

      // Calculate total value
      const total = data.reduce((sum: number, item: ChartData, index: number) => {
        const itemName = (typeof item === 'object' && item.name) ? item.name : `item-${index + 1}`;
        if (this._legend && !this._legendSelected.has(itemName)) {
          return sum;
        }
        const value = typeof item === 'object' ? item.value : item;
        return sum + (typeof value === 'number' ? value : 0);
      }, 0);

      if (total === 0) {
        // If all hidden, we still need to render legend
        if (option.legend?.show !== false) {
          const items = (data as any[]).map((it: any, i: number) => ({
            name: (typeof it === 'object' && it.name) ? it.name : `item-${i + 1}`,
            color: (typeof it === 'object' && it.itemStyle?.color) || seriesItem.itemStyle?.color || this._getSeriesColor(i),
            icon: 'circle',
            textColor: this.getThemeConfig().legendTextColor
          }));
          this._mountLegend(items);
        }
        return;
      }

      // Render pie slices
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

      // Legend for pie (use data item names)
      if (option.legend?.show !== false) {
        const items = (data as any[]).map((it: any, i: number) => ({
          name: (typeof it === 'object' && it.name) ? it.name : `item-${i + 1}`,
          color: (typeof it === 'object' && it.itemStyle?.color) || seriesItem.itemStyle?.color || this._getSeriesColor(i),
          icon: 'circle',
          textColor: this.getThemeConfig().legendTextColor // Use theme color
        }));
        this._mountLegend(items);
      }

      data.forEach((item: ChartData, index: number) => {
        const value = typeof item === 'object' ? item.value : item;
        if (typeof value !== 'number') return;
        const percent = value / total;
        const angle = percent * totalAngle;
        // legend selection
        const itemName = (typeof item === 'object' && item.name) ? item.name : `item-${index + 1}`;
        if (this._legend && !this._legendSelected.has(itemName)) {
          return;
        }

        const itemStyle = seriesItem.itemStyle || {};
        const color = (typeof item === 'object' && item.itemStyle?.color) || itemStyle.color || this._getSeriesColor(index);

        // Handle aria decal
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

        // Calculate target angles
        const targetStart = currentAngle;
        const targetEnd = currentAngle + angle;

        // Determine initial angles for animation
        let initialStart = targetStart;
        let initialEnd = targetStart; // Default for new items (grow from 0)

        const oldSector = oldSectors.get(itemName);
        if (oldSector) {
          initialStart = oldSector.shape.startAngle;
          initialEnd = oldSector.shape.endAngle;
        } else if (oldSectors.size > 0) {
          // If we have other sectors but this one is new (e.g. data added), 
          // maybe grow from previous sector's end? 
          // For now, grow from targetStart is fine.
        }

        // Create sector
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
          z: index,
          cursor: (this._tooltip || seriesItem.emphasis) ? 'pointer' : 'default',
        });

        this._root.add(sector);
        this._activeSectors.set(itemName, sector);

        // Tooltip & Emphasis interaction
        if (this._tooltip || seriesItem.emphasis) {
          const emphasis = seriesItem.emphasis;

          EventHelper.bindHoverEvents(
            sector,
            (evt: any) => {
              // Apply emphasis animation
              this._applyEmphasisAnimation(sector, emphasis, true, r);

              // Show tooltip
              if (this._tooltip) {
                const itemName = (typeof item === 'object' && item.name) ? item.name : '';
                const itemValue = value;

                const content = this._generateTooltipContent({
                  componentType: 'series',
                  seriesType: 'pie',
                  seriesIndex: 0,
                  seriesName: seriesItem.name,
                  name: itemName,
                  dataIndex: index,
                  data: item,
                  value: itemValue,
                  percent: percent * 100
                });

                const mx = evt?.offsetX ?? cx;
                const my = evt?.offsetY ?? cy;
                this._tooltip.show(mx + 12, my - 16, content);
              }
            },
            () => {
              // Restore emphasis
              this._applyEmphasisAnimation(sector, emphasis, false, r);

              // Hide tooltip
              if (this._tooltip) {
                this._tooltip.hide();
              }
            }
          );

          sector.on('mousemove', (evt: any) => {

            const mx = evt?.offsetX ?? cx;
            const my = evt?.offsetY ?? cy;
            // Recompute content to avoid stale percent (during animation)
            const currentEnd = sector.shape.endAngle;
            const partPercent = (currentEnd - sector.shape.startAngle) / (Math.PI * 2) * 100;
            const itemName = (typeof item === 'object' && item.name) ? item.name : '';
            const itemValue = value;

            const content = this._generateTooltipContent({
              componentType: 'series',
              seriesType: 'pie',
              seriesIndex: 0,
              seriesName: seriesItem.name,
              name: itemName,
              dataIndex: index,
              data: item,
              value: itemValue,
              percent: partPercent
            });

            if (this._tooltip) {
              if (!this._tooltip.isVisible()) {
                this._applyEmphasisAnimation(sector, emphasis, true, r);
              }
              this._tooltip.show(mx + 12, my - 16, content);
            }
          });
        }

        // Animate pie slice
        if (this._shouldAnimateFor(itemName) || oldSector) {
          const isUpdate = oldSectors.size > 0;
          const delay = isUpdate ? 0 : index * 200; // Stagger only for new entrance
          const duration = this._getAnimationDuration(isUpdate);
          const easing = this._getAnimationEasing(isUpdate);

          // Animate startAngle
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

          // Animate endAngle
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
          // Set final angle if animation is disabled
          sector.attr('shape', {
            startAngle: targetStart,
            endAngle: targetEnd
          });
        }

        // Render label if defined (even if hidden initially, it might show on emphasis)
        if (seriesItem.label) {
          const labelAngle = targetStart + angle / 2; // Use target angle for label
          // If position outside
          const isOutside = seriesItem.label.position === 'outside';
          const isCenter = seriesItem.label.position === 'center';
          let labelX, labelY;
          let textAlign: 'center' | 'left' | 'right' = 'center';
          let textBaseline: 'middle' | 'top' | 'bottom' = 'middle';

          if (isCenter) {
            labelX = cx;
            labelY = cy;
            textAlign = 'center';
            textBaseline = 'middle';
          } else {
            const finalLabelRadius = isOutside ? r * 1.1 : (r + r0) / 2;
            labelX = cx + Math.cos(labelAngle) * finalLabelRadius;
            labelY = cy + Math.sin(labelAngle) * finalLabelRadius;
            textAlign = 'center';
            textBaseline = 'middle';
          }

          let labelText: string;
          const formatter = seriesItem.label?.formatter;
          if (typeof formatter === 'function') {
            labelText = formatter({ name: (item as any).name || '', value, percent: percent * 100 });
          } else if (formatter === '{b}') {
            labelText = (item as any).name || '';
          } else {
            labelText = String(value);
          }
          const text = new Text({
            shape: {
              x: labelX,
              y: labelY,
              text: labelText,
            },
            style: {
              fontSize: seriesItem.label.fontSize || 12,
              fontWeight: seriesItem.label.fontWeight || 'normal',
              fill: seriesItem.label.color || (isOutside || isCenter ? '#333' : '#fff'), // White if inside
              textAlign: textAlign,
              textBaseline: textBaseline,
              opacity: seriesItem.label.show ? 1 : 0, // Use opacity as well
            },
            z: index + 1000, // Increase z-index
            invisible: !seriesItem.label.show, // Handle visibility
            silent: true // Prevent label from capturing mouse events
          });

          this._root.add(text);
          // Store label reference for interaction
          (sector as any).__label = text;
        }

        currentAngle += angle;
      });

      this._renderer.flush();
    } catch (e) {
      console.error('[PieChart] Render error:', e);
    }
  }

  /**
   * Get pie center
   */
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
    // TODO
    console.info(r0);

    // Find sector by name
    this._root.traverse((child: any) => {
      if (child instanceof Sector && (child as any)?.name === name) {
        this._applyEmphasisAnimation(child, emphasis, hovered, r);

        // Show/hide tooltip on legend hover
        if (this._tooltip) {
          if (hovered) {
            // Calculate center of sector for tooltip position
            const shape = child.shape;
            const midAngle = (shape.startAngle + shape.endAngle) / 2;
            const r = (shape.r + shape.r0) / 2;
            const cx = shape.cx + Math.cos(midAngle) * r;
            const cy = shape.cy + Math.sin(midAngle) * r;

            // TODO
            console.info(cx, cy);

            // Construct params
            // We need to find the data item for this sector
            // Since we attached name to sector, we assume unique names or we can rely on data index if we attached it.
            // But we didn't attach data index.
            // However, child has 'data' property if we set it.
            // Let's set 'data' property in Sector creation too?
            // Or just use 'name' to display basic tooltip.

            // The tooltip formatter needs params.
            // We can retrieve data from series using name?
            // Or better, let's attach 'data' and 'index' to sector in PieChart render loop.

            // For now, just emphasize visual.
          } else {
            // this._tooltip.hide();
          }
        }
      }
    });
  }

  /**
   * Get pie radius
   */
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

  /**
   * Parse percent string
   */
  private _parsePercent(value: string, base: number): number {
    if (value.endsWith('%')) {
      return parseFloat(value) / 100 * base;
    }
    return parseFloat(value) || 0;
  }

  private _applyEmphasisAnimation(sector: Sector, emphasis: EmphasisOption | undefined, isEnter: boolean, baseR?: number): void {
    // Style animation (shadow, opacity, etc.)
    if (emphasis?.itemStyle) {
      const style = sector.style as Record<string, unknown>;
      const emphasisStyle = emphasis.itemStyle;

      // Store initial styles if not already stored
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

        // Opacity is handled separately above, but we can merge it if we want consistency
        targetStyle.opacity = 0.8; // Default emphasis opacity
      } else {
        // Restore to initial style
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

      // Apply style animation
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
          // For non-numeric properties (colors), set directly to avoid breaking animator
          // which expects numbers. Color interpolation can be added later if needed.
          style[key] = value;
          sector.markRedraw();
        }
      });
    } else {
      // Fallback simple opacity animation if no specific itemStyle is provided
      const initialOpacity = (sector as any).__initialOpacity ?? 1;
      this._animator.animate(
        sector.style as Record<string, unknown>,
        'opacity',
        isEnter ? 0.8 : initialOpacity,
        { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
      ).start();
    }

    // Scale animation (Radius Expansion)
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
      // Fallback to transform scale if baseR is not provided
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

    // Label emphasis
    const label = (sector as any).__label;
    if (label && emphasis?.label) {
      if (isEnter) {
        // Show label and apply emphasis styles
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
        // Restore original style
        const seriesItem = this._option.series?.[0];
        if (seriesItem?.label) {
          label.invisible = !seriesItem.label.show;
          label.style.opacity = seriesItem.label.show ? 1 : 0;
          label.style.fontSize = seriesItem.label.fontSize || 12;
          label.style.fontWeight = seriesItem.label.fontWeight || 'normal';
          // We don't restore color perfectly here (simplified), but it should be enough for now
        }
      }
      label.markRedraw();
    }
  }
}
