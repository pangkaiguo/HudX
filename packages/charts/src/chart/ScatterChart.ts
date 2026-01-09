import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain } from '../util/coordinate';
import { Circle } from 'HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class ScatterChart extends Chart {
  protected _render(): void {
    try {
      super._render();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) return;

      if (!Circle) {
        console.error('[ScatterChart] Circle class is not defined. Check imports.');
        return;
      }

      const { x: plotX, y: plotY, width: plotWidth, height: plotHeight } = this._calculateGrid(option);

      const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
      const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;

      // Collect data for domain calculation
      let data: any[] = [];
      series.forEach(s => {
        if (s.type === 'scatter' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yDomain = calculateDomain(yAxis || {}, data, false);

      const xScale = xAxis?.type === 'category'
        ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
        : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = yAxis?.type === 'category'
        ? createOrdinalScale(yDomain, [plotY + plotHeight, plotY])
        : createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      try {
        this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight, { x: xScale, y: yScale });
      } catch (e) {
        console.error('[ScatterChart] Error rendering axes:', e);
      }

      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter((s: any) => s.type === 'scatter' && s.show !== false)
          .map((s: any, i: number) => ({
            name: s.name || this.t('series.name', 'Series') + '-' + (i + 1),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: option.legend?.icon || 'circle',
            textColor: this.getThemeConfig().legendTextColor,
            data: s
          }));
        this._mountLegend(items);
      }

      series.forEach((s: any, seriesIndex: number) => {
        if (s.type !== 'scatter') return;

        const seriesData = s.data || [];
        const color = s.itemStyle?.color || s.color || this._getSeriesColor(seriesIndex);
        const symbolSize = s.symbolSize || 10;

        seriesData.forEach((item: any, index: number) => {
          let xVal: any, yVal: any;
          if (Array.isArray(item)) {
            xVal = item[0];
            yVal = item[1];
          } else if (typeof item === 'object') {
            xVal = item.value?.[0];
            yVal = item.value?.[1];
          }

          if (xVal === undefined || yVal === undefined) return;

          let cx: number, cy: number;

          // Calculate X position
          if (xAxis?.type === 'category') {
            if (typeof xVal === 'number' && xAxis.data && xAxis.data[xVal] !== undefined) {
              const cat = xAxis.data[xVal];
              cx = xScale(cat);
            } else {
              cx = xScale(xVal);
            }
          } else {
            cx = xScale(xVal);
          }

          // Calculate Y position
          if (yAxis?.type === 'category') {
            if (typeof yVal === 'number' && yAxis.data && yAxis.data[yVal] !== undefined) {
              const cat = yAxis.data[yVal];
              cy = yScale(cat);
            } else {
              cy = yScale(yVal);
            }
          } else {
            cy = yScale(yVal);
          }

          if (isNaN(cx) || isNaN(cy)) {
            // console.warn('[ScatterChart] Invalid position for item:', item, { cx, cy, xVal, yVal, xAxisType: xAxis?.type, yAxisType: yAxis?.type });
            return;
          }

          const circle = new Circle({
            shape: { cx, cy, r: 0 },
            style: { fill: color, opacity: 0.8 },
            z: 2, // Z_SERIES
            cursor: this._tooltip ? 'pointer' : 'default',
          });

          this._root.add(circle);

          if (this._tooltip) {
            circle.on('mouseover', (evt: any) => {
              circle.attr('shape', { r: symbolSize / 2 + 3 });
              circle.attr('style', { opacity: 1 });

              const itemName = (typeof item === 'object' && item.name) ? item.name : '';
              const params = {
                componentType: 'series',
                seriesType: 'scatter',
                seriesIndex,
                seriesName: s.name,
                name: itemName,
                dataIndex: index,
                data: item,
                value: [xVal, yVal]
              };
              const content = this._generateTooltipContent(params);

              const r = symbolSize / 2 + 3;
              const targetRect = {
                x: cx - r,
                y: cy - r,
                width: r * 2,
                height: r * 2
              };

              const mx = evt?.offsetX ?? cx;
              const my = evt?.offsetY ?? cy;
              this._tooltip!.show(mx, my, content, params, targetRect);
            });

            circle.on('mouseout', () => {
              circle.attr('shape', { r: symbolSize / 2 });
              circle.attr('style', { opacity: 0.8 });
              this._tooltip!.hide();
            });
          }

          // Animation
          if (this._isAnimationEnabled()) {
            const delay = index * 50 + seriesIndex * 100;
            const duration = this._getAnimationDuration() / 2;

            this._animator.animate(
              circle.shape,
              'r',
              symbolSize / 2,
              {
                duration,
                delay,
                easing: 'elasticOut'
              }
            ).start();
          } else {
            circle.shape.r = symbolSize / 2;
          }
        });
      });
    } catch (e) {
      console.error('[ScatterChart] Render error:', e);
    }
  }
}
