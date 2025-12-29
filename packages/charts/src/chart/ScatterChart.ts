/**
 * ScatterChart - Scatter chart implementation
 */

import Chart from '../Chart';
import { Circle } from 'HudX/core';

export default class ScatterChart extends Chart {
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

    const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
    const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;

    series.forEach((s: any, seriesIndex: number) => {
      if (s.type !== 'scatter') return;

      const data = s.data || [];
      const color = s.color || this._getSeriesColor(seriesIndex);
      const symbolSize = s.symbolSize || 8;

      data.forEach((item: any, index: number) => {
        const [xVal, yVal] = Array.isArray(item) ? item : [item.value?.[0], item.value?.[1]];
        if (xVal === undefined || yVal === undefined) return;

        const x = left + (xVal / 100) * chartWidth;
        const y = top + chartHeight - (yVal / 100) * chartHeight;

        const circle = new Circle({
          shape: { cx: x, cy: y, r: 0 }, // Start with radius 0 for animation
          style: { fill: color, opacity: 0.7 },
          cursor: this._tooltip ? 'pointer' : 'default',
        });

        this._root.add(circle);

        // Animate scatter point if animation is enabled
        if (this._isAnimationEnabled()) {
          const delay = index * 50 + seriesIndex * 100; // Staggered animation delay
          const duration = this._getAnimationDuration() / 2; // Shorter duration for points

          this._animator.animate(
            circle.attr('shape'),
            'r',
            symbolSize,
            {
              duration,
              delay,
              easing: 'elasticOut',
              onUpdate: (target: any, percent: number) => {
                // Also animate opacity for smoother appearance
                circle.attr('style', {
                  fill: color,
                  opacity: 0.7 * percent
                });
              }
            }
          );
        } else {
          // Set final size if animation is disabled
          circle.attr('shape', { cx: x, cy: y, r: symbolSize });
        }
      });
    });

    // Draw axes
    this._drawAxes(left, top, chartWidth, chartHeight, xAxis, yAxis);
  }

  private _drawAxes(left: number, top: number, width: number, height: number, xAxis: any, yAxis: any): void {
    // X axis
    this._root.add(new Circle({
      shape: { cx: left, cy: top + height, r: 0 },
      style: { stroke: '#333', lineWidth: 1 }
    }));

    // Y axis
    this._root.add(new Circle({
      shape: { cx: left, cy: top, r: 0 },
      style: { stroke: '#333', lineWidth: 1 }
    }));
  }
}
