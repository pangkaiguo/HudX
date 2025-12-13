/**
 * LineChart - Line chart implementation
 */

import Chart from '../Chart';
import type { ChartOption, SeriesOption, ChartData } from '../types';
import { createLinearScale, createOrdinalScale, calculateDomain, dataToCoordinate, Scale } from '../util/coordinate';
import { Group, Polyline, Circle, Text, Line, Point } from '@HudX/core';

export default class LineChart extends Chart {
  protected _render(): void {
    super._render();

    const option = this._option;
    const series = option.series || [];
    const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
    const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;

    if (series.length === 0) {
      return;
    }

    // Calculate grid area
    const grid = option.grid || {};
    const gridLeft = this._parseSize(grid.left, 60);
    const gridRight = this._parseSize(grid.right, 20);
    const gridTop = this._parseSize(grid.top, 60);
    const gridBottom = this._parseSize(grid.bottom, 60);

    const plotWidth = this._width - gridLeft - gridRight;
    const plotHeight = this._height - gridTop - gridBottom;
    const plotX = gridLeft;
    const plotY = gridTop;

    // Process each series
    series.forEach((seriesItem, seriesIndex) => {
      if (seriesItem.type !== 'line') {
        return;
      }

      const data = seriesItem.data || [];
      if (data.length === 0) {
        return;
      }

      // Calculate scales
      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yDomain = calculateDomain(yAxis || {}, data, false);

      const xScale = xAxis?.type === 'category'
        ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
        : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      // Create line points
      const points: Point[] = data.map((item: ChartData) => {
        const coord = dataToCoordinate(item, xScale, yScale);
        return { x: coord.x, y: coord.y };
      });

      // Create polyline
      const lineStyle = seriesItem.lineStyle || {};
      const lineColor = lineStyle.color || this._getSeriesColor(seriesIndex);
      const lineWidth = lineStyle.width || 2;

      const polyline = new Polyline({
        shape: { points: [] }, // Start with empty points for animation
        style: {
          stroke: lineColor,
          lineWidth,
          lineDash: lineStyle.type === 'dashed' ? [5, 5] : undefined,
        },
        z: seriesIndex,
      });

      this._root.add(polyline);

      // Animate line if animation is enabled
      if (this._isAnimationEnabled()) {
        const duration = this._getAnimationDuration();
        const easing = this._getAnimationEasing();

        // Animate line drawing
        const shape = polyline.attr('shape');
        this._animator.animate(
          { t: 0 },
          't',
          1,
          {
            duration,
            easing,
            onUpdate: (target: any, percent: number) => {
              // Gradually build the line by showing more points
              const visiblePoints = Math.ceil(points.length * percent);
              shape.points = points.slice(0, visiblePoints);
              polyline.markRedraw();
            }
          }
        );
      } else {
        // Set final points if animation is disabled
        polyline.attr('shape', { points });
      }

      // Create data points
      if (seriesItem.showSymbol !== false) {
        const itemStyle = seriesItem.itemStyle || {};
        const pointColor = itemStyle.color || lineColor;
        const pointSize = itemStyle.borderWidth || 4;

        points.forEach((point, pointIndex) => {
          const circle = new Circle({
            shape: {
              cx: point.x,
              cy: plotY + plotHeight, // Start from bottom for animation
              r: 0, // Start with radius 0 for animation
            },
            style: {
              fill: pointColor,
              stroke: '#fff',
              lineWidth: 2,
            },
            z: seriesIndex + 1,
          });

          this._root.add(circle);

          // Animate point if animation is enabled
          if (this._isAnimationEnabled()) {
            const delay = pointIndex * 100 + seriesIndex * 200; // Staggered animation delay
            const duration = this._getAnimationDuration() / 2; // Shorter duration for points

            this._animator.animate(
              circle.attr('shape'),
              'r',
              pointSize,
              {
                duration,
                delay,
                easing: 'elasticOut',
                onUpdate: (target, percent) => {
                  // Also animate the y position
                  target.cy = plotY + plotHeight - (plotY + plotHeight - point.y) * percent;
                  circle.markRedraw();
                }
              }
            );
          } else {
            // Set final position if animation is disabled
            circle.attr('shape', {
              cx: point.x,
              cy: point.y,
              r: pointSize,
            });
          }
        });
      }

      // Render labels if enabled
      if (seriesItem.label?.show) {
        points.forEach((point, index) => {
          const item = data[index];
          const labelText = typeof seriesItem.label?.formatter === 'function'
            ? seriesItem.label.formatter(item)
            : String(item.value);

          const text = new Text({
            shape: {
              x: point.x,
              y: point.y - 10,
              text: labelText,
            },
            style: {
              fontSize: 12,
              fill: '#666',
              textAlign: 'center',
              textBaseline: 'bottom',
            },
            z: seriesIndex + 2,
          });

          this._root.add(text);
        });
      }
    });

    // Render axes
    this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);

    this._renderer.refresh();
  }

  /**
   * Render axes
   */
  private _renderAxes(
    xAxis: any,
    yAxis: any,
    plotX: number,
    plotY: number,
    plotWidth: number,
    plotHeight: number
  ): void {
    // X axis
    if (xAxis?.show !== false) {
      // Axis line
      const xAxisLine = new Line({
        shape: {
          x1: plotX,
          y1: plotY + plotHeight,
          x2: plotX + plotWidth,
          y2: plotY + plotHeight,
        },
        style: {
          stroke: '#ccc',
          lineWidth: 1,
        },
      });
      this._root.add(xAxisLine);

      // Axis labels
      if (xAxis?.data && xAxis.data.length > 0) {
        const xScale = xAxis.type === 'category'
          ? createOrdinalScale(xAxis.data, [plotX, plotX + plotWidth])
          : createLinearScale([0, xAxis.data.length - 1], [plotX, plotX + plotWidth]);

        xAxis.data.forEach((label: any, index: number) => {
          const x = xScale(index);
          const text = new Text({
            shape: {
              x,
              y: plotY + plotHeight + 20,
              text: String(label),
            },
            style: {
              fontSize: 12,
              fill: '#666',
              textAlign: 'center',
              textBaseline: 'top',
            },
          });
          this._root.add(text);
        });
      }
    }

    // Y axis
    if (yAxis?.show !== false) {
      const yAxisLine = new Line({
        shape: {
          x1: plotX,
          y1: plotY,
          x2: plotX,
          y2: plotY + plotHeight,
        },
        style: {
          stroke: '#ccc',
          lineWidth: 1,
        },
      });
      this._root.add(yAxisLine);
    }
  }

}

