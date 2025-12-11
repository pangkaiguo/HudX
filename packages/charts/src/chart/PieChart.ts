/**
 * PieChart - Pie chart implementation
 */

import Chart from '../Chart';
import { ChartOption, SeriesOption, ChartData } from '../types';
import { Arc, Text, Point } from '@hudx/core';

export default class PieChart extends Chart {
  protected _render(): void {
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
      const value = typeof item.value === 'number' ? item.value : 0;
      return sum + value;
    }, 0);

    if (total === 0) {
      return;
    }

    // Render pie slices
    let currentAngle = -Math.PI / 2; // Start from top

    data.forEach((item: ChartData, index: number) => {
      const value = typeof item.value === 'number' ? item.value : 0;
      const percent = value / total;
      const angle = percent * Math.PI * 2;

      const itemStyle = seriesItem.itemStyle || {};
      const color = itemStyle.color || this._getSeriesColor(index);

      // Create arc
      const arc = new Arc({
        shape: {
          cx,
          cy,
          r: radius,
          startAngle: currentAngle,
          endAngle: currentAngle + angle,
          anticlockwise: false,
        },
        style: {
          fill: color,
          stroke: '#fff',
          lineWidth: 2,
        },
        z: index,
      });

      this._root.add(arc);

      // Render label if enabled
      if (seriesItem.label?.show) {
        const labelAngle = currentAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = cx + Math.cos(labelAngle) * labelRadius;
        const labelY = cy + Math.sin(labelAngle) * labelRadius;

        const labelText = typeof seriesItem.label?.formatter === 'function'
          ? seriesItem.label.formatter({ ...item, percent: percent * 100 })
          : `${item.name || ''}: ${(percent * 100).toFixed(1)}%`;

        const text = new Text({
          shape: {
            x: labelX,
            y: labelY,
            text: labelText,
          },
          style: {
            fontSize: 12,
            fill: '#333',
            textAlign: 'center',
            textBaseline: 'middle',
          },
          z: index + 100,
        });

        this._root.add(text);
      }

      currentAngle += angle;
    });

    this._renderer.refresh();
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

}

