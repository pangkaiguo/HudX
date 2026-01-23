/**
 * HeatmapChart - Heatmap chart implementation
 */

import { Chart, Rect } from 'hudx-render';

export default class HeatmapChart extends Chart {
  protected _render(): void {
    super._render();

    const option = this._option;
    const series = option.series || [];
    if (series.length === 0) return;

    const grid = option.grid || {};
    const left = this._parseSize(grid.left, 60);
    const top = this._parseSize(grid.top, 60);
    const right = this._parseSize(grid.right, 60);
    const bottom = this._parseSize(grid.bottom, 60);
    const chartWidth = this._width - left - right;
    const chartHeight = this._height - top - bottom;

    series.forEach((s: any) => {
      if (s.type !== 'heatmap') return;

      const data = s.data || [];
      const cellWidth = chartWidth / (s.xAxisData?.length || 10);
      const cellHeight = chartHeight / (s.yAxisData?.length || 10);

      data.forEach((row: any[], rowIndex: number) => {
        row.forEach((value: number, colIndex: number) => {
          const x = left + colIndex * cellWidth;
          const y = top + rowIndex * cellHeight;
          const intensity = Math.min(value / 100, 1);
          const color = this._getHeatmapColor(intensity);

          const rect = new Rect({
            shape: { x, y, width: cellWidth, height: cellHeight },
            style: {
              fill: color,
              stroke: this.getThemeConfig().backgroundColor,
              lineWidth: 1,
              opacity: 0,
            },
            cursor: this._tooltip ? 'pointer' : 'default',
          });

          this._root.add(rect);

          // Tooltip
          if (this._tooltip) {
            rect.on('mouseover', (evt: any) => {
              // Highlight
              rect.attr('style', {
                stroke: this.getThemeConfig().textColor,
                lineWidth: 2,
              });

              const xName = s.xAxisData?.[colIndex] || colIndex;
              const yName = s.yAxisData?.[rowIndex] || rowIndex;

              const columnCount =
                (s.xAxisData?.length ?? (Array.isArray(row) ? row.length : 0)) || 0;
              const params = {
                type: 'showTip',
                componentType: 'series',
                seriesType: 'heatmap',
                seriesName: s.name,
                dataIndex: rowIndex * columnCount + colIndex,
                cellIndex: [rowIndex, colIndex],
                value: value,
                name: `${xName}, ${yName}`,
              };

              const content = this._generateTooltipContent(params);

              const targetRect = {
                x,
                y,
                width: cellWidth,
                height: cellHeight,
              };

              const mx = evt?.offsetX ?? x + cellWidth / 2;
              const my = evt?.offsetY ?? y + cellHeight / 2;

              this._tooltip!.show(mx, my, content, params, targetRect);
            });

            rect.on('mouseout', () => {
              // Restore
              rect.attr('style', {
                stroke: this.getThemeConfig().backgroundColor,
                lineWidth: 1,
              });
              this._tooltip!.hide();
            });
          }

          // Animate heatmap cell if animation is enabled
          if (this._isAnimationEnabled()) {
            const delay = (rowIndex + colIndex) * 20; // Staggered animation delay based on position
            const duration = this._getAnimationDuration() / 3; // Shorter duration for cells

            this._animator.animate(rect.attr('style'), 'opacity', 1, {
              duration,
              delay,
              easing: 'cubicOut',
              onUpdate: (target: any, percent: number) => {
                // Animate opacity for fade-in effect
                target.opacity = percent;
                rect.markRedraw();
              },
            });
          } else {
            // Set final opacity if animation is disabled
            rect.attr('style', {
              fill: color,
              stroke: this.getThemeConfig().backgroundColor,
              lineWidth: 1,
              opacity: 1,
            });
          }
        });
      });
    });
  }

  private _getHeatmapColor(intensity: number): string {
    const theme = this.getThemeConfig();
    const palette = theme.heatmapColors || theme.token.heatmapColors || theme.seriesColors;
    const colors = palette.length >= 4 ? palette : theme.seriesColors;
    if (intensity < 0.25) return colors[0] || theme.seriesColors[0]!;
    if (intensity < 0.5) return colors[1] || theme.seriesColors[1]!;
    if (intensity < 0.75) return colors[2] || theme.seriesColors[2]!;
    return colors[3] || theme.seriesColors[3]!;
  }
}
