/**
 * HeatmapChart - Heatmap chart implementation
 */

import Chart from '../Chart';
import { Rect, Text } from '@hudx/core';

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

          this._root.add(new Rect({
            shape: { x, y, width: cellWidth, height: cellHeight },
            style: { fill: color, stroke: '#fff', lineWidth: 1 }
          }));
        });
      });
    });
  }

  private _getHeatmapColor(intensity: number): string {
    if (intensity < 0.25) return '#313695';
    if (intensity < 0.5) return '#4575b4';
    if (intensity < 0.75) return '#fee090';
    return '#d73027';
  }
}
