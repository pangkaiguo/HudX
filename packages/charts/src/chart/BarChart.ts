import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain, dataToCoordinate } from '../util/coordinate';
import { Rect, createDecalPattern } from '@HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class BarChart extends Chart {
  private _activeBars: Map<string, Rect> = new Map();

  protected _render(): void {
    try {
      super._render();

      // Ensure activeBars is initialized
      if (!this._activeBars) {
        this._activeBars = new Map();
      }

      // Keep track of old bars
      const oldBars = this._activeBars;
      this._activeBars = new Map();

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
        if (s.type === 'bar' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      // Calculate scales
      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yDomain = calculateDomain(yAxis || {}, data, false);

      const xScale = xAxis?.type === 'category'
        ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
        : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      // Prepare bar grouping info based on categories (ECharts-style)
      const barSeries = series.filter(s => s.type === 'bar' && s.show !== false);
      const seriesCount = barSeries.length || 1;
      const categoryCount = xAxis?.type === 'category'
        ? (Array.isArray(xAxis?.data) ? xAxis.data.length : xDomain.length)
        : data.length;
      const groupWidth = categoryCount > 0 ? (plotWidth / categoryCount) : plotWidth;
      const groupInnerWidth = groupWidth * 0.8;
      const barWidthPerSeries = groupInnerWidth / seriesCount;

      // Render axes
      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);

      // Render legend
      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter(s => s.type === 'bar' && s.show !== false)
          .map((s, i) => ({
            name: s.name || this.t('series.name', 'Series') + '-' + (i + 1),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: 'rect',
            textColor: this.getThemeConfig().legendTextColor // Use theme color
          }));
        this._mountLegend(items);
      }

      // Process each series
      series.forEach((seriesItem, seriesIndex) => {
        if (seriesItem.type !== 'bar') {
          return;
        }
        if (seriesItem.show === false) {
          return;
        }
        const seriesName = seriesItem.name || this.t('series.name', 'Series') + '-' + (seriesIndex + 1);
        if (this._legend && !this._legendSelected.has(seriesName)) return;

        const seriesData = seriesItem.data || [];
        const seriesIndexInBars = barSeries.indexOf(seriesItem);
        const barColor = seriesItem.itemStyle?.color || seriesItem.color || this._getSeriesColor(seriesIndex);

        seriesData.forEach((item, index) => {
          let xVal, yVal;
          if (xAxis?.type === 'category') {
            xVal = xDomain[index];
            // Handle object data { value: 120 }
            if (typeof item === 'object' && item !== null && item.value !== undefined) {
              yVal = item.value;
            } else {
              yVal = item;
            }
          } else {
            // Value axis for X (e.g. horizontal bar) - Not fully supported yet in this simple logic
            // Assuming vertical bar chart for now
            xVal = item[0];
            yVal = item[1];
          }

          if (xVal === undefined || yVal === undefined) return;

          const groupCenter = xScale(xVal);
          const groupStart = groupCenter - groupInnerWidth / 2;
          const barX = groupStart + seriesIndexInBars * barWidthPerSeries;
          const barY = yScale(yVal);
          const barHeight = plotY + plotHeight - barY;

          const itemStyle = seriesItem.itemStyle || {};

          // Handle aria decal
          let fillStyle: string | CanvasPattern = barColor;
          const aria = option.aria;
          if (aria?.enabled && aria?.decal?.show) {
            const decals = aria.decal.decals || [];
            // Use series index for bar chart to distinguish series
            const decal = decals[seriesIndex % decals.length] || { symbol: 'rect' };

            const pattern = createDecalPattern(decal, barColor);
            if (pattern) {
              fillStyle = pattern;
            }
          }

          const barKey = `${seriesIndex}-${index}`;
          const oldBar = oldBars.get(barKey);

          let initialHeight = 0;

          if (oldBar) {
            initialHeight = oldBar.shape.height;
          }

          const rect = new Rect({
            shape: {
              x: barX,
              y: plotY + plotHeight - initialHeight, // Start from previous position
              width: barWidthPerSeries,
              height: initialHeight,
              r: itemStyle.borderRadius
            },
            style: {
              fill: fillStyle,
              stroke: itemStyle.borderColor || this.getThemeConfig().borderColor,
              lineWidth: itemStyle.borderWidth || 0,
            },
            z: seriesIndex,
            cursor: this._tooltip ? 'pointer' : 'default',
          });

          this._root.add(rect);
          this._activeBars.set(barKey, rect);

          // Tooltip
          if (this._tooltip) {
            EventHelper.bindHoverEvents(
              rect,
              (evt: any) => {
                rect.attr('style', { opacity: 0.8 });
                const itemName = (typeof item === 'object' && item.name) ? item.name : (xAxis?.data?.[index] || '');
                const itemValue = this._getDataValue(item);

                const content = this._generateTooltipContent({
                  componentType: 'series',
                  seriesType: 'bar',
                  seriesIndex,
                  seriesName: seriesName,
                  name: itemName,
                  dataIndex: index,
                  data: item,
                  value: itemValue
                });

                const mx = evt?.offsetX ?? (barX + barWidthPerSeries / 2);
                const my = evt?.offsetY ?? (barY - 10);
                this._tooltip!.show(mx + 12, my - 16, content);
              },
              () => {
                rect.attr('style', { opacity: 1 });
                this._tooltip!.hide();
              }
            );

            rect.on('mousemove', (evt: any) => {
              if (!this._tooltip!.isVisible()) return;
              const itemName = (typeof item === 'object' && item.name) ? item.name : (xAxis?.data?.[index] || '');
              const itemValue = this._getDataValue(item);

              const content = this._generateTooltipContent({
                componentType: 'series',
                seriesType: 'bar',
                seriesIndex,
                seriesName: seriesName,
                name: itemName,
                dataIndex: index,
                data: item,
                value: itemValue
              });

              const mx = evt?.offsetX ?? (barX + barWidthPerSeries / 2);
              const my = evt?.offsetY ?? (barY - 10);
              this._tooltip!.show(mx + 12, my - 16, content);
            });
          }

          // Animate bar if animation is enabled
          if (this._shouldAnimateFor(seriesName) || oldBar) {
            const isUpdate = !!oldBar;
            const delay = isUpdate ? 0 : (index * 100 + seriesIndex * 200);
            const duration = this._getAnimationDuration(isUpdate);

            this._animator.animate(
              rect.attr('shape'),
              'height',
              barHeight,
              {
                duration,
                delay,
                easing: 'cubicOut',
                onUpdate: (target, percent) => {
                  const currentHeight = initialHeight + (barHeight - initialHeight) * percent;
                  target.height = currentHeight;
                  target.y = plotY + plotHeight - target.height;
                  rect.markRedraw();
                }
              }
            );
          } else {
            rect.attr('shape', {
              x: barX,
              y: barY,
              width: barWidthPerSeries,
              height: barHeight
            });
          }
        });
      });

      this._renderer.flush();
    } catch (e) {
      console.error('[BarChart] Render error:', e);
    }
  }
}
