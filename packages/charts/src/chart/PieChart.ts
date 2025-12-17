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
      if (!['pie', 'doughnut', 'half-doughnut'].includes(seriesItem.type)) {
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
      const total = data.reduce((sum: number, item: ChartData) => {
        const value = typeof item === 'object' ? item.value : item;
        return sum + (typeof value === 'number' ? value : 0);
      }, 0);

      if (total === 0) {
        return;
      }

      // Render pie slices
      let startAngle = (seriesItem as any).startAngle !== undefined
        ? (seriesItem as any).startAngle * Math.PI / 180
        : (seriesItem.type === 'half-doughnut' ? -Math.PI : -Math.PI / 2);

      let endAngle = (seriesItem as any).endAngle !== undefined
        ? (seriesItem as any).endAngle * Math.PI / 180
        : (seriesItem.type === 'half-doughnut' ? 0 : startAngle + Math.PI * 2);

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
          // If hidden, we don't advance currentAngle if we want to fill the gap?
          // ECharts behavior: if hidden, the part is removed, other parts expand?
          // Or just hole?
          // Usually re-calculate total without hidden items.
          // But here 'total' included hidden items?
          // Let's re-calculate total if we want dynamic update.
          // For now, let's just skip drawing but advance angle? No, usually we want to re-distribute.
          // The current implementation calculates 'total' from ALL data at the beginning.
          // If we want legend to hide items, we should filter data before loop or recalculate total.
          // Let's stick to existing logic for now, but note that skipping without advancing angle means others will be adjacent.
          // But wait, line 66 says `currentAngle += angle`. This means it reserves space!
          // ECharts default: hiding item removes it and resizes others.
          // The current implementation seems to reserve space (hole).
          // If user wants resize, 'total' must be updated.
          // I will leave this behavior as is for now to avoid scope creep, just updating variables.
          currentAngle += angle;
          return;
        }

        const itemStyle = seriesItem.itemStyle || {};
        const color = (typeof item === 'object' && item.itemStyle?.color) || itemStyle.color || this._getSeriesColor(index);

        // Create sector
        const start = currentAngle;
        const sector = new Sector({
          name: itemName,
          shape: {
            cx,
            cy,
            r,
            r0,
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
            r,
            r0,
            startAngle: currentAngle,
            endAngle: currentAngle + angle,
            anticlockwise: false,
          });
        }

        // Render label if enabled
        if (seriesItem.label?.show) {
          const labelAngle = start + angle / 2;
          // If position outside
          const isOutside = seriesItem.label.position === 'outside';
          const finalLabelRadius = isOutside ? r * 1.1 : (r + r0) / 2;

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

  protected _onLegendHover(name: string, hovered: boolean): void {
    const series = this._option.series || [];
    if (series.length === 0) return;
    const seriesItem = series[0];
    const emphasis = seriesItem.emphasis;

    // Find sector by name
    this._root.traverse((child) => {
      if (child instanceof Sector && (child as any).name === name) {
        this._applyEmphasisAnimation(child, emphasis, hovered);

        // Show/hide tooltip on legend hover
        if (this._tooltip) {
          if (hovered) {
            // Calculate center of sector for tooltip position
            const shape = child.shape;
            const midAngle = (shape.startAngle + shape.endAngle) / 2;
            const r = (shape.r + shape.r0) / 2;
            const cx = shape.cx + Math.cos(midAngle) * r;
            const cy = shape.cy + Math.sin(midAngle) * r;

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
