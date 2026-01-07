import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain } from '../util/coordinate';
import {
  Polyline, Circle, Text, Rect, createDecalPattern,
  type Point, Z_SERIES, Z_LABEL
} from 'HudX/core';

export default class LineChart extends Chart {
  protected _render(): void {
    try {
      super._render();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) return;

      const { x: plotX, y: plotY, width: plotWidth, height: plotHeight } = this._calculateGrid(option);

      const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
      const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;

      let data: any[] = [];
      series.forEach(s => {
        if (s.type === 'line' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

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

      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);

      if (this._tooltip && option.tooltip?.trigger === 'axis') {
        const interact = new Rect({
          shape: { x: plotX, y: plotY, width: plotWidth, height: plotHeight, r: 0 },
          style: { fill: 'transparent' },
          silent: false,
          cursor: 'crosshair'
        });
        const domain = xAxis?.type === 'category' && Array.isArray(xAxis?.data) ? xAxis.data : xDomain;
        let lastX = -1;
        let lastY = -1;
        (interact as any).on('mousemove', (evt: any) => {
          const mx = evt.offsetX;
          const my = evt.offsetY;
          lastX = mx;
          lastY = my;

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
            idx = Math.max(0, Math.min(Math.round((xv - xDomain[0]) / ((xDomain[1] - xDomain[0]) || 1)), domain.length - 1));
            name = xv;
          }
          if (idx < 0 || idx >= domain.length) {
            this._tooltip!.hide();
            return;
          }
          const lines: string[] = [];
          series.forEach((s) => {
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

          if (!this._tooltip!.isVisible()) {
            this._tooltip!.show(mx + 12, my - 16, lines.join('\n'));
          } else {
            this._tooltip!.show(mx + 12, my - 16, lines.join('\n'));
          }
        });
        (interact as any).on('mouseout', () => this._tooltip!.hide());
        this._root.add(interact as any);
      }

      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter(s => s.type === 'line' && s.show !== false)
          .map((s, i) => ({
            name: s.name || this.t('series.name', 'Series') + '-' + (i + 1),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: option.legend?.icon || 'rect',
            textColor: this.getThemeConfig().legendTextColor
          }));
        this._mountLegend(items);
      }

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

        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        console.info(pathData);

        const line = new Polyline({
          shape: {
            points: [],
          },
          style: {
            stroke: lineColor,
            lineWidth: seriesItem.lineStyle?.width || 2,
            fill: 'none',
          },
          z: Z_SERIES,
        });

        this._root.add(line);

        if (this._shouldAnimateFor(seriesName)) {
          const duration = this._getAnimationDuration();
          const easing = this._getAnimationEasing();
          const shape = line.attr('shape');
          this._animator.animate(
            { t: 0 },
            't',
            1,
            {
              duration,
              easing,
              onUpdate: (target: any, percent: number) => {
                const visiblePoints = Math.ceil(points.length * percent);
                shape.points = points.slice(0, visiblePoints);
                line.markRedraw();
              }
            }
          );
        } else {
          line.attr('shape', { points });
        }

        if (seriesItem.showSymbol !== false) {
          const itemStyle = seriesItem.itemStyle || {};
          const pointColor = itemStyle.color || lineColor;
          const pointSize = itemStyle.borderWidth || 4;

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
                cy: point.y,
                r: 0,
              },
              style: {
                fill: pointFill,
                stroke: '#fff',
                lineWidth: 2,
              },
              z: Z_SERIES + 1,
              silent: false,
              cursor: this._tooltip ? 'pointer' : 'default',
            });

            this._root.add(circle);

            if (this._tooltip) {
              circle.on('mouseover', () => {
                circle.attr('shape', { r: pointSize + 3 });

                const itemName = (typeof item === 'object' && item.name) ? item.name : (xAxis?.data?.[pointIndex] || '');
                const itemValue = this._getDataValue(item);

                const params = {
                  componentType: 'series',
                  seriesType: 'line',
                  seriesIndex,
                  seriesName: seriesName,
                  name: itemName,
                  dataIndex: pointIndex,
                  data: item,
                  value: itemValue
                };

                const content = this._generateTooltipContent(params);

                const r = pointSize + 3;
                const targetRect = {
                  x: point.x - r,
                  y: point.y - r,
                  width: r * 2,
                  height: r * 2
                };

                this._tooltip!.show(point.x, point.y, content, params, targetRect);
              });

              circle.on('mouseout', () => {
                circle.attr('shape', { r: pointSize });
                this._tooltip!.hide();
              });
            }

            if (this._shouldAnimateFor(seriesName)) {
              const lineDuration = this._getAnimationDuration();
              const delay = (pointIndex / points.length) * lineDuration;

              this._animator.animate(
                { t: 0 },
                't',
                1,
                {
                  duration: 300,
                  delay,
                  easing: 'cubicOut',
                  onUpdate: (_target: any, percent: number) => {
                    const r = pointSize * percent;
                    circle.attr('shape', { r });
                    circle.markRedraw();
                  }
                }
              );
            } else {
              circle.attr('shape', { cx: point.x, cy: point.y, r: pointSize });
            }
          });
        }

        if (seriesItem.label?.show) {
          points.forEach((point, index) => {
            const item = data[index];
            const labelText = typeof seriesItem.label?.formatter === 'function'
              ? seriesItem.label.formatter(item)
              : String(item.value || item);

            const text = new Text({
              shape: { x: point.x, y: point.y - 10, text: labelText },
              style: { fontSize: 12, fill: '#666', textAlign: 'center', textBaseline: 'bottom' },
              z: Z_LABEL
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
