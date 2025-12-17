import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain, dataToCoordinate, Scale } from '../util/coordinate';
import {
  Polyline, Circle, Text, Rect, createDecalPattern,
  type Point
} from '@HudX/core';

export default class LineChart extends Chart {
  protected _render(): void {
    try {
      super._render();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) return;

      // Calculate grid area
      const { x: plotX, y: plotY, width: plotWidth, height: plotHeight } = this._calculateGrid(option);

      const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
      const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;

      // Collect all data to calculate domain
      let data: any[] = [];
      series.forEach(s => {
        if (s.type === 'line' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      // Calculate scales
      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yValues: number[] = [];
      series.forEach(s => {
        if (s.type === 'line' && s.show !== false) {
          (s.data || []).forEach((item: any) => {
            if (typeof item === 'number') {
              yValues.push(item);
            } else if (Array.isArray(item)) {
              if (typeof item[1] === 'number') yValues.push(item[1]);
            } else if (typeof item === 'object' && item !== null) {
              if (typeof item.value === 'number') {
                yValues.push(item.value);
              } else if (Array.isArray(item.value) && typeof item.value[1] === 'number') {
                yValues.push(item.value[1]);
              }
            }
          });
        }
      });
      let yMin = yValues.length ? Math.min(...yValues) : 0;
      let yMax = yValues.length ? Math.max(...yValues) : 100;
      if (yMax === yMin) {
        yMin = yMin - 1;
        yMax = yMax + 1;
      }
      const yPad = (yMax - yMin) * 0.1;
      const yDomain = [yMin - yPad, yMax + yPad];

      const xScale = xAxis?.type === 'category'
        ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
        : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      // Render axes
      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);

      // Axis-trigger tooltip interaction (follow mouse)
      if (this._tooltip && option.tooltip?.trigger === 'axis') {
        const interact = new Rect({
          shape: { x: plotX, y: plotY, width: plotWidth, height: plotHeight, r: 0 },
          style: { fill: 'transparent' },
          silent: false,
          cursor: 'crosshair'
        });
        const domain = xAxis?.type === 'category'
          ? (Array.isArray(xAxis?.data) ? xAxis.data : xDomain)
          : xDomain;
        (interact as any).on('mousemove', (evt: any) => {
          const mx = evt.offsetX;
          const my = evt.offsetY;
          if (mx < plotX || mx > plotX + plotWidth || my < plotY || my > plotY + plotHeight) {
            this._tooltip!.hide();
            return;
          }
          let idx = 0;
          let name: any = '';
          if (xAxis?.type === 'category') {
            const label = (xScale as any).invert(mx);
            idx = domain.indexOf(label);
            name = label;
          } else {
            const xv = (xScale as any).invert(mx);
            // nearest index by value
            idx = Math.max(0, Math.min(Math.round((xv - xDomain[0]) / ((xDomain[1] - xDomain[0]) || 1)), domain.length - 1));
            name = xv;
          }
          if (idx < 0 || idx >= domain.length) {
            this._tooltip!.hide();
            return;
          }
          const lines: string[] = [];
          series.forEach((s, si) => {
            if (s.type !== 'line' || s.show === false) return;
            const item = (s.data || [])[idx];
            if (item === undefined) return;

            const val = this._getDataValue(item);
            if (typeof val === 'number') {
              const seriesName = s.name ? s.name + '\n' : '';
              lines.push(`${seriesName}${name ? name + ': ' : ''}${val}`);
            }
          });
          if (lines.length === 0) {
            this._tooltip!.hide();
            return;
          }
          this._tooltip!.show(mx + 12, my - 16, lines.join('\n'));
        });
        (interact as any).on('mouseout', () => this._tooltip!.hide());
        this._root.add(interact as any);
      }

      // Render legend
      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter(s => s.type === 'line' && s.show !== false)
          .map((s, i) => ({
            name: s.name || this.t('series.name', 'Series') + '-' + (i + 1),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: 'line',
            textColor: this.getThemeConfig().legendTextColor // Use theme color
          }));
        this._mountLegend(items);
      }

      // Process each series
      series.forEach((seriesItem, seriesIndex) => {
        if (seriesItem.type !== 'line') return;
        if (seriesItem.show === false) return;
        const seriesName = seriesItem.name || this.t('series.name', 'Series') + '-' + (seriesIndex + 1);
        if (this._legend && !this._legendSelected.has(seriesName)) return;

        const data = seriesItem.data || [];
        const lineColor = seriesItem.itemStyle?.color || seriesItem.color || this._getSeriesColor(seriesIndex);
        const points: Point[] = [];

        data.forEach((item, index) => {
          let xVal, yVal;
          if (xAxis?.type === 'category') {
            xVal = xDomain[index];
            if (typeof item === 'object' && item !== null && item.value !== undefined) {
              yVal = item.value;
            } else {
              yVal = item;
            }
          } else {
            xVal = item[0];
            yVal = item[1];
          }

          if (xVal !== undefined && yVal !== undefined) {
            points.push({
              x: xScale(xVal),
              y: yScale(yVal)
            });
          }
        });

        if (points.length === 0) return;

        // Create line path
        // Simple polyline for now, support smooth curve later
        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

        const line = new Polyline({
          shape: {
            points: [], // Start with empty points for animation
          },
          style: {
            stroke: lineColor,
            lineWidth: seriesItem.lineStyle?.width || 2,
            fill: 'none',
          },
          z: seriesIndex,
        });

        this._root.add(line);

        // Animate line
        if (this._shouldAnimateFor(seriesName)) {
          const duration = this._getAnimationDuration();
          const easing = this._getAnimationEasing();
          // Animate line drawing
          const shape = line.attr('shape');
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
                line.markRedraw();
              }
            }
          );
        } else {
          // Set final points if animation is disabled
          line.attr('shape', { points });
        }

        // Create data points
        if (seriesItem.showSymbol !== false) {
          const itemStyle = seriesItem.itemStyle || {};
          const pointColor = itemStyle.color || lineColor;
          const pointSize = itemStyle.borderWidth || 4;

          // Handle aria decal
          let pointFill: string | CanvasPattern = pointColor;
          const aria = option.aria;
          if (aria?.enabled && aria?.decal?.show) {
            const decals = aria.decal.decals || [];
            const decal = decals[seriesIndex % decals.length] || { symbol: 'circle' };

            const pattern = createDecalPattern(decal, pointColor);
            if (pattern) {
              pointFill = pattern;
            }
          }

          points.forEach((point, pointIndex) => {
            const item = data[pointIndex];
            const circle = new Circle({
              shape: {
                cx: point.x,
                cy: plotY + plotHeight, // Start from bottom for animation
                r: 0, // Start with radius 0 for animation
              },
              style: {
                fill: pointFill,
                stroke: '#fff',
                lineWidth: 2,
              },
              z: seriesIndex + 1,
              cursor: this._tooltip ? 'pointer' : 'default',
            });

            this._root.add(circle);

            // Tooltip
            if (this._tooltip) {
              circle.on('mouseover', () => {
                circle.attr('shape', { r: pointSize + 3 });

                const itemName = (typeof item === 'object' && item.name) ? item.name : (xAxis?.data?.[pointIndex] || '');
                const itemValue = this._getDataValue(item);

                const content = this._generateTooltipContent({
                  componentType: 'series',
                  seriesType: 'line',
                  seriesIndex,
                  seriesName: seriesName,
                  name: itemName,
                  dataIndex: pointIndex,
                  data: item,
                  value: itemValue
                });

                this._tooltip!.show(point.x, point.y - 10, content);
              });

              circle.on('mouseout', () => {
                circle.attr('shape', { r: pointSize });
                this._tooltip!.hide();
              });
            }

            // Animate point if animation is enabled
            if (this._shouldAnimateFor(seriesName)) {
              const delay = pointIndex * 50 + seriesIndex * 100;
              const duration = this._getAnimationDuration();
              this._animator.animate(
                { t: 0 },
                't',
                1,
                {
                  duration,
                  delay,
                  easing: 'cubicOut',
                  onUpdate: (_target: any, percent: number) => {
                    const cy = plotY + plotHeight - (plotY + plotHeight - point.y) * percent;
                    const r = pointSize * percent;
                    circle.attr('shape', { cx: point.x, cy, r });
                    circle.markRedraw();
                  }
                }
              );
            } else {
              circle.attr('shape', { cx: point.x, cy: point.y, r: pointSize });
            }
          });
        }

        // Render labels
        if (seriesItem.label?.show) {
          points.forEach((point, index) => {
            const item = data[index];
            const labelText = typeof seriesItem.label?.formatter === 'function'
              ? seriesItem.label.formatter(item)
              : String(item.value || item);

            const text = new Text({
              shape: { x: point.x, y: point.y - 10, text: labelText },
              style: { fontSize: 12, fill: '#666', textAlign: 'center', textBaseline: 'bottom' },
              z: seriesIndex + 2
            });
            this._root.add(text);
          });
        }
      });

      this._renderer.flush();
    } catch (e) {
      console.error('[LineChart] Render error:', e);
    }
  }
}
