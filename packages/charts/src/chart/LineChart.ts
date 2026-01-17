import {
  Chart,
  type SeriesOption,
  type ChartData,
  createLinearScale,
  createOrdinalScale,
  calculateDomain,
  Polyline,
  Circle,
  Text,
  Rect,
  Line,
  createDecalPattern,
  Path,
  ChartElement,
  type Point,
  Z_SERIES,
  Z_LABEL,
  Z_AXIS,
  getSmoothPath,
  getSmoothAreaPath,
  createSymbol,
} from 'hudx-render';
import { findSeriesIndexByDisplayName, getSeriesDisplayName } from './chartUtils';

/**
 * LineChart - Line chart implementation
 *
 * Algorithm: Cartesian Mapping & Spline Interpolation
 *
 * Description:
 * Maps data points to Cartesian coordinates.
 * - Delegates smoothing logic to `getSmoothPath` (Catmull-Rom Spline).
 * - Implements "Area Fill" logic by closing the path with the baseline.
 * - Manages point markers and their interactions (hover/tooltip).
 */
export default class LineChart extends Chart {
  private _activeLines: Map<
    number,
    { line: Polyline | Path; symbols: ChartElement[]; area?: Path }
  > = new Map();

  protected _onLegendHover(name: string, hovered: boolean): void {
    const t = (key: string, defaultValue?: string) => this.t(key, defaultValue);
    const seriesIndex = findSeriesIndexByDisplayName(t, this._option.series || [], name);

    if (seriesIndex === -1) return;

    this._activeLines.forEach((item, idx) => {
      if (hovered) {
        if (idx === seriesIndex) {
          // Highlight
          item.line.attr('style', {
            opacity: 1,
            lineWidth: (this._option.series?.[idx].lineStyle?.width || 1) + 1,
          });
          item.symbols.forEach((s) => s.attr('style', { opacity: 1 }));
          if (item.area)
            item.area.attr('style', {
              opacity: this._option.series?.[idx].areaStyle?.opacity || 0.5,
            });
        } else {
          // Dim
          item.line.attr('style', { opacity: 0.1 });
          item.symbols.forEach((s) => s.attr('style', { opacity: 0.1 }));
          if (item.area) item.area.attr('style', { opacity: 0.1 });
        }
      } else {
        // Restore
        item.line.attr('style', {
          opacity: 1,
          lineWidth: this._option.series?.[idx].lineStyle?.width || 1,
        });
        item.symbols.forEach((s) => s.attr('style', { opacity: 1 }));
        if (item.area)
          item.area.attr('style', {
            opacity: this._option.series?.[idx].areaStyle?.opacity || 0.5,
          });
      }
    });
  }

  protected _render(): void {
    try {
      super._render();
      if (!this._activeLines) {
        this._activeLines = new Map();
      }
      this._activeLines.clear();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) {
        this._renderer.flush();
        return;
      }

      const {
        x: plotX,
        y: plotY,
        width: plotWidth,
        height: plotHeight,
      } = this._calculateGrid(option);

      const xAxis = Array.isArray(option.xAxis)
        ? option.xAxis[0]
        : option.xAxis;

      // Auto-detect category axis if data is provided but type is missing
      if (xAxis && !xAxis.type && xAxis.data && xAxis.data.length > 0) {
        xAxis.type = 'category';
      }

      const yAxis = Array.isArray(option.yAxis)
        ? option.yAxis[0]
        : option.yAxis;

      let data: any[] = [];
      series.forEach((s) => {
        if (s.type === 'line' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yValues: number[] = [];
      series.forEach((s) => {
        if (s.type === 'line' && s.show !== false) {
          (s.data || []).forEach((item: any) => {
            if (typeof item === 'number') {
              yValues.push(item);
            } else if (Array.isArray(item)) {
              if (typeof item[1] === 'number') yValues.push(item[1]);
            } else if (typeof item === 'object' && item !== null) {
              if (typeof item.value === 'number') {
                yValues.push(item.value);
              } else if (
                Array.isArray(item.value) &&
                typeof item.value[1] === 'number'
              ) {
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

      const xRange = xAxis?.inverse
        ? [plotX + plotWidth, plotX]
        : [plotX, plotX + plotWidth];
      const yRange = yAxis?.inverse
        ? [plotY, plotY + plotHeight]
        : [plotY + plotHeight, plotY];

      const xScale =
        xAxis?.type === 'category'
          ? createOrdinalScale(xDomain, xRange)
          : createLinearScale(xDomain, xRange);

      const yScale = createLinearScale(yDomain, yRange);

      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight, {
        x: xScale,
        y: yScale,
      });

      if (this._tooltip && option.tooltip?.trigger === 'axis') {
        const interact = new Rect({
          shape: {
            x: plotX,
            y: plotY,
            width: plotWidth,
            height: plotHeight,
            r: 0,
          },
          style: { fill: 'transparent' },
          silent: false,
          cursor: 'crosshair',
        });

        // Axis Pointer Line
        const axisPointerLine = new Line({
          shape: { x1: 0, y1: plotY, x2: 0, y2: plotY + plotHeight },
          style: {
            stroke: 'rgba(0,0,0,0.3)',
            lineWidth: 1,
            lineDash: [4, 4],
          },
          z: Z_AXIS + 1,
          invisible: true,
        });
        this._root.add(axisPointerLine);

        const domain =
          xAxis?.type === 'category' && Array.isArray(xAxis?.data)
            ? xAxis.data
            : xDomain;
        let lastX = -1;
        let lastY = -1;
        (interact as any).on('mousemove', (evt: any) => {
          const mx = evt.offsetX;
          const my = evt.offsetY;
          lastX = mx;
          lastY = my;

          if (
            mx < plotX ||
            mx > plotX + plotWidth ||
            my < plotY ||
            my > plotY + plotHeight
          ) {
            this._tooltip!.hide();
            axisPointerLine.attr('invisible', true);
            return;
          }
          let idx = 0;
          let name: any = '';
          let currentX = mx;

          if (xAxis?.type === 'category') {
            const label = (xScale as any).invert(mx);
            idx = domain.indexOf(label);
            name = label;
            // Snap to band center
            if (idx >= 0) {
              currentX = xScale(label);
            }
          } else {
            const xv = (xScale as any).invert(mx);
            idx = Math.max(
              0,
              Math.min(
                Math.round((xv - xDomain[0]) / (xDomain[1] - xDomain[0] || 1)),
                domain.length - 1,
              ),
            );
            name = xv;
            // Snap to data point? Or keep raw for value axis?
            // Usually value axis snaps to data point x
            if (idx >= 0 && idx < data.length) {
              // Assuming data is sorted/linear for simple line chart
              // currentX = xScale(xv);
            }
            // For value axis, just use mouse X usually, or snap to nearest data x
            currentX = mx;
          }

          if (idx < 0 || idx >= domain.length) {
            this._tooltip!.hide();
            axisPointerLine.attr('invisible', true);
            return;
          }

          // Show Axis Pointer
          axisPointerLine.attr('shape', { x1: currentX, x2: currentX });
          axisPointerLine.attr('invisible', false);

          const paramsList: any[] = [];
          series.forEach((s, sIndex) => {
            if (s.type !== 'line' || s.show === false) return;
            const item = (s.data || [])[idx];
            if (item === undefined) return;

            let val = this._getDataValue(item);

            // Fallback for single value array [120] which is common in some chart libraries
            if (
              val === undefined &&
              Array.isArray(item) &&
              item.length === 1 &&
              typeof item[0] === 'number'
            ) {
              val = item[0];
            }

            if (typeof val === 'number') {
              const seriesName = s.name || '';
              const color =
                s.itemStyle?.color || s.color || this._getSeriesColor(sIndex);

              paramsList.push({
                componentType: 'series',
                seriesType: 'line',
                seriesIndex: sIndex,
                seriesName: seriesName,
                name: name,
                dataIndex: idx,
                data: item,
                value: val,
                color: typeof color === 'string' ? color : undefined,
                marker:
                  typeof color === 'string'
                    ? this._getTooltipMarker(color)
                    : undefined,
              });
            }
          });

          if (paramsList.length === 0) {
            this._tooltip!.hide();
            return;
          }

          const content = this._generateTooltipContent(paramsList);

          if (!this._tooltip!.isVisible()) {
            this._tooltip!.show(mx + 12, my - 16, content, paramsList);
          } else {
            this._tooltip!.show(mx + 12, my - 16, content, paramsList);
          }
        });
        (interact as any).on('mouseout', () => {
          this._tooltip!.hide();
          axisPointerLine.attr('invisible', true);
        });
        this._root.add(interact as any);
      }

      if (option.legend?.show !== false) {
        const aria = option.aria;
        const ariaDecals =
          aria?.enabled && aria?.decal?.show ? aria.decal.decals || [] : [];
        const items = (series as any[])
          .filter((s) => s.type === 'line' && s.show !== false)
          .map((s, i) => ({
            name: getSeriesDisplayName(
              (key: string, defaultValue?: string) =>
                this.t(key, defaultValue),
              s,
              i,
            ),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: option.legend?.icon || 'rect',
            textColor: this.getThemeConfig().legendTextColor,
            data: s,
            decal:
              s.itemStyle?.decal ||
              (ariaDecals.length
                ? ariaDecals[i % ariaDecals.length] || { symbol: 'circle' }
                : undefined),
          }));
        this._mountLegend(items);
      }

      series.forEach((seriesItem, seriesIndex) => {
        if (seriesItem.type !== 'line') return;
        if (seriesItem.show === false) return;
        const seriesName = getSeriesDisplayName(
          (key: string, defaultValue?: string) => this.t(key, defaultValue),
          seriesItem,
          seriesIndex,
        );
        if (this._legend && !this._legendSelected.has(seriesName)) return;

        const data = seriesItem.data || [];
        const lineColor =
          seriesItem.itemStyle?.color ||
          seriesItem.color ||
          this._getSeriesColor(seriesIndex);
        const points: Point[] = [];

        data.forEach((item, index) => {
          let xVal, yVal;
          if (xAxis?.type === 'category') {
            xVal = xDomain[index];
            if (
              typeof item === 'object' &&
              item !== null &&
              item.value !== undefined
            ) {
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
              y: yScale(yVal),
            });
          }
        });

        if (points.length === 0) return;

        const isSmooth = seriesItem.smooth;
        let line: Polyline | Path;
        let area: Path | undefined;

        // Render Area
        if (seriesItem.areaStyle) {
          const areaColor = seriesItem.areaStyle.color || lineColor;
          const opacity = seriesItem.areaStyle.opacity || 0.5;

          // Calculate baseline for area
          // Default to the bottom of the chart (min value of domain)
          // This prevents the area from extending to y=0 if 0 is far off-chart
          const domain = yScale.domain();
          const y0 = yScale(domain[0]);

          let areaPathData = '';
          const tension = typeof isSmooth === 'number' ? isSmooth : 0.5;
          if (isSmooth) {
            areaPathData = getSmoothAreaPath(points, y0, tension);
          } else {
            // Simple polygon path
            areaPathData = points
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
              .join(' ');
            areaPathData += ` L ${points[points.length - 1].x} ${y0} L ${points[0].x} ${y0} Z`;
          }

          area = new Path({
            shape: { d: areaPathData },
            style: {
              fill: areaColor,
              stroke: 'none',
              opacity: 0, // Start invisible for animation
            },
            z: Z_SERIES - 1,
          });
          this._root.add(area);
        }

        // Render Line
        if (isSmooth) {
          const tension = typeof isSmooth === 'number' ? isSmooth : 0.5;
          const d = getSmoothPath(points, tension);
          line = new Path({
            shape: { d },
            style: {
              stroke: lineColor,
              lineWidth: seriesItem.lineStyle?.width || 1,
              fill: 'none',
              opacity: 1,
            },
            z: Z_SERIES,
          });
        } else {
          line = new Polyline({
            shape: {
              points: [],
            },
            style: {
              stroke: lineColor,
              lineWidth: seriesItem.lineStyle?.width || 1,
              fill: 'none',
            },
            z: Z_SERIES,
          });
        }

        this._root.add(line);

        if (!this._activeLines.has(seriesIndex)) {
          this._activeLines.set(seriesIndex, { line, symbols: [], area });
        } else {
          const item = this._activeLines.get(seriesIndex)!;
          item.line = line;
          item.area = area;
          // Clear old symbols if any, they will be re-added below
          // Actually we are re-rendering, so old symbols are gone with this._root.clear() implicitly if we cleared root?
          // Wait, this._root is NOT cleared. But this._activeLines.clear() was called?
          // No, this._activeLines.clear() clears the map, but doesn't remove elements from root.
          // The base Chart._render() calls this._root.clear()! So we are safe.
          item.symbols = [];
        }

        if (this._shouldAnimateFor(seriesName)) {
          const duration = this._getAnimationDuration();
          const easing = this._getAnimationEasing();

          if (line instanceof Polyline) {
            const shape = line.attr('shape');
            this._animator.animate({ t: 0 }, 't', 1, {
              duration,
              easing,
              onUpdate: (target: any, percent: number) => {
                const visiblePoints = Math.ceil(points.length * percent);
                shape.points = points.slice(0, visiblePoints);
                line.markRedraw();
              },
            });
          } else {
            // Path animation (Clip or Dash) - simplified to Opacity for now
            line.attr('style', { opacity: 0 });
            this._animator.animate({ opacity: 0 }, 'opacity', 1, {
              duration,
              easing,
              onUpdate: (target: any, percent: number) => {
                line.attr('style', { opacity: target.opacity });
                line.markRedraw();
              },
            });
          }

          if (area) {
            this._animator.animate(
              { opacity: 0 },
              'opacity',
              seriesItem.areaStyle?.opacity || 0.5,
              {
                duration,
                easing,
                onUpdate: (target: any, percent: number) => {
                  area!.attr('style', { opacity: target.opacity });
                  area!.markRedraw();
                },
              },
            );
          }
        } else {
          if (line instanceof Polyline) {
            line.attr('shape', { points });
          }
          if (area) {
            area.attr('style', {
              opacity: seriesItem.areaStyle?.opacity || 0.5,
            });
          }
        }

        if (seriesItem.showSymbol !== false) {
          const itemStyle = seriesItem.itemStyle || {};
          const pointColor = itemStyle.color || lineColor;
          const pointSize = seriesItem.symbolSize || itemStyle.borderWidth || 4; // Use symbolSize if available
          const symbolType = seriesItem.symbol || 'circle';

          let pointFill: string | CanvasPattern = pointColor;
          const aria = option.aria;
          if (aria?.enabled && aria?.decal?.show) {
            const decals = aria.decal.decals || [];
            const decal = decals[seriesIndex % decals.length] || {
              symbol: 'circle',
            };

            const pattern = createDecalPattern(decal, pointColor);
            if (pattern) {
              pointFill = pattern;
            }
          }

          points.forEach((point, pointIndex) => {
            const item = data[pointIndex];

            // Calculate size if it's a function or array
            let finalSize = 4;
            if (typeof pointSize === 'number') finalSize = pointSize;
            else if (Array.isArray(pointSize)) finalSize = pointSize[0];
            else if (typeof pointSize === 'function')
              finalSize = (pointSize as any)(item, {});

            const shouldAnimate = this._shouldAnimateFor(seriesName);
            const initialSize = shouldAnimate ? 0 : finalSize;

            const symbol = createSymbol(
              symbolType,
              point.x,
              point.y,
              initialSize,
              {
                fill: pointFill,
                stroke: '#fff',
                lineWidth: 2,
              },
              Z_SERIES + 1,
            );

            if (!symbol) return;

            (symbol as any).cursor = this._tooltip ? 'pointer' : 'default';

            this._root.add(symbol);
            this._activeLines.get(seriesIndex)?.symbols.push(symbol);

            if (this._tooltip) {
              symbol.on('mouseover', () => {
                if (symbolType === 'circle') {
                  symbol.attr('shape', { r: finalSize + 3 });
                }
                // TODO: scale logic for other shapes

                const itemName =
                  typeof item === 'object' && item.name
                    ? item.name
                    : xAxis?.data?.[pointIndex] || '';
                const itemValue = this._getDataValue(item);

                const params = {
                  componentType: 'series',
                  seriesType: 'line',
                  seriesIndex,
                  seriesName: seriesName,
                  name: itemName,
                  dataIndex: pointIndex,
                  data: item,
                  value: itemValue,
                  color: typeof pointFill === 'string' ? pointFill : undefined,
                };

                const content = this._generateTooltipContent(params);

                const r = finalSize + 3;
                const targetRect = {
                  x: point.x - r,
                  y: point.y - r,
                  width: r * 2,
                  height: r * 2,
                };

                this._tooltip!.show(
                  point.x,
                  point.y,
                  content,
                  params,
                  targetRect,
                );
              });

              symbol.on('mouseout', () => {
                if (symbolType === 'circle') {
                  symbol.attr('shape', { r: finalSize });
                }
                this._tooltip!.hide();
              });
            }

            if (shouldAnimate) {
              const lineDuration = this._getAnimationDuration();
              const delay = (pointIndex / points.length) * lineDuration;

              this._animator.animate({ t: 0 }, 't', 1, {
                duration: 300,
                delay,
                easing: 'cubicOut',
                onUpdate: (_target: any, percent: number) => {
                  const currentSize = finalSize * percent;
                  if (symbolType === 'circle') {
                    symbol.attr('shape', { r: currentSize });
                  } else if (symbol instanceof Rect) {
                    const half = currentSize / 2;
                    symbol.attr('shape', {
                      x: point.x - half,
                      y: point.y - half,
                      width: currentSize,
                      height: currentSize,
                    });
                  }
                  symbol.markRedraw();
                },
              });
            }
          });
        }

        if (seriesItem.label?.show) {
          points.forEach((point, index) => {
            const item = data[index];
            const labelText =
              typeof seriesItem.label?.formatter === 'function'
                ? seriesItem.label.formatter(item)
                : String(item.value || item);

            const text = new Text({
              shape: { x: point.x, y: point.y - 10, text: labelText },
              style: {
                fontSize: 12,
                fill: '#666',
                textAlign: 'center',
                textBaseline: 'bottom',
              },
              z: Z_LABEL,
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
