import Chart from '../Chart';
import type { ChartOption, SeriesOption, ChartData, EmphasisOption } from '../types';
import { Sector, Text, Point, Legend } from '@HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class PieChart extends Chart {
  protected _render(): void {
    try {
      super._render();

      const option = this._option;
      const series = option.series || [];

      if (series.length === 0) {
        return;
      }

      const seriesItem = series[0];
      if (seriesItem.type !== 'pie') {
        return;
      }

      const data = seriesItem.data || [];
      if (data.length === 0) {
        return;
      }

      // Calculate pie center and radius
      const center = this._getCenter(seriesItem);
      const radius = this._getRadius(seriesItem);
      const cx = center[0];
      const cy = center[1];

      // Calculate total value
      const total = data.reduce((sum: number, item: ChartData) => {
        const value = typeof item === 'object' ? item.value : item;
        return sum + (typeof value === 'number' ? value : 0);
      }, 0);

      if (total === 0) {
        return;
      }

      // Render pie slices
      let currentAngle = -Math.PI / 2; // Start from top

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
        const angle = percent * Math.PI * 2;
        // legend selection
        const itemName = (typeof item === 'object' && item.name) ? item.name : `item-${index + 1}`;
        if (this._legend && !this._legendSelected.has(itemName)) {
          currentAngle += angle;
          return;
        }

        const itemStyle = seriesItem.itemStyle || {};
        const color = (typeof item === 'object' && item.itemStyle?.color) || itemStyle.color || this._getSeriesColor(index);

        // Create sector
        const start = currentAngle;
        const sector = new Sector({
          shape: {
            cx,
            cy,
            r: radius,
            r0: 0,
            startAngle: start,
            endAngle: start, // Start with same angle for animation
            anticlockwise: false,
          },
          style: {
            fill: color,
            stroke: '#fff',
            lineWidth: 2,
          },
          transform: {
            x: 0, y: 0, scaleX: 1, scaleY: 1, originX: cx, originY: cy
          },
          z: index,
          cursor: this._tooltip ? 'pointer' : 'default',
        });

        this._root.add(sector);

        // Tooltip & Emphasis interaction
        if (this._tooltip || seriesItem.emphasis) {
          const emphasis = seriesItem.emphasis;

          EventHelper.bindHoverEvents(
            sector,
            (evt: any) => {
              // Apply emphasis animation
              this._applyEmphasisAnimation(sector, emphasis, true);

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
              this._applyEmphasisAnimation(sector, emphasis, false);

              // Hide tooltip
              if (this._tooltip) {
                this._tooltip.hide();
              }
            }
          );

          sector.on('mousemove', (evt: any) => {
            if (!this._tooltip?.isVisible()) return;
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

            this._tooltip.show(mx + 12, my - 16, content);
          });
        }

        // Animate pie slice if animation is enabled
        if (this._shouldAnimateFor(itemName)) {
          const delay = index * 200; // Staggered animation delay
          const duration = this._getAnimationDuration();
          const easing = this._getAnimationEasing();

          this._animator.animate(
            sector.attr('shape'),
            'endAngle',
            start + angle,
            {
              duration,
              delay,
              easing,
              onUpdate: (target, percent) => {
                // Animate the slice growing from startAngle to endAngle
                target.endAngle = start + angle * percent;
                sector.markRedraw();
              }
            }
          );
        } else {
          // Set final angle if animation is disabled
          sector.attr('shape', {
            cx,
            cy,
            r: radius,
            r0: 0,
            startAngle: currentAngle,
            endAngle: currentAngle + angle,
            anticlockwise: false,
          });
        }

        // Render label if enabled
        if (seriesItem.label?.show) {
          const labelAngle = start + angle / 2;
          const labelRadius = radius * 0.7; // Internal label or external? Usually internal for simple
          // If position outside
          const isOutside = seriesItem.label.position === 'outside';
          const finalLabelRadius = isOutside ? radius * 1.1 : radius * 0.7;

          const labelX = cx + Math.cos(labelAngle) * finalLabelRadius;
          const labelY = cy + Math.sin(labelAngle) * finalLabelRadius;

          const labelText = typeof seriesItem.label?.formatter === 'function'
            ? seriesItem.label.formatter({ name: (item as any).name || '', value, percent: percent * 100 })
            : (seriesItem.label?.formatter === '{b}' ? ((item as any).name || '') : String(value));

          const text = new Text({
            shape: {
              x: labelX,
              y: labelY,
              text: labelText,
            },
            style: {
              fontSize: 12,
              fill: isOutside ? '#333' : '#fff', // White if inside
              textAlign: 'center',
              textBaseline: 'middle',
            },
            z: index + 100,
          });

          this._root.add(text);
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

  /**
   * Get pie radius
   */
  private _getRadius(seriesItem: SeriesOption): number {
    const radius = (seriesItem as any).radius;
    if (typeof radius === 'string') {
      return this._parsePercent(radius, Math.min(this._width, this._height) / 2);
    }
    if (typeof radius === 'number') {
      return radius;
    }
    return Math.min(this._width, this._height) / 2 * 0.8;
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

  private _applyEmphasisAnimation(sector: Sector, emphasis: EmphasisOption | undefined, isEnter: boolean): void {
    // Opacity animation
    this._animator.animate(
      sector.style as Record<string, unknown>,
      'opacity',
      isEnter ? 0.8 : 1,
      { duration: 200, easing: 'cubicOut', onUpdate: () => sector.markRedraw() }
    ).start();

    // Scale animation
    if (emphasis?.scale) {
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
  }
}
