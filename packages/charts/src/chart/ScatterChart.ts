import { Chart } from 'hudx-render';
import {
  createLinearScale,
  createOrdinalScale,
  calculateDomain,
} from 'hudx-render';
import { Circle, Z_SERIES } from 'hudx-render';
import {
  findSeriesIndexByDisplayName,
  getSeriesDisplayName,
  resolveAnimationDelay,
} from './chartUtils';

export default class ScatterChart extends Chart {
  private _activeScatters: Map<number, Circle[]> = new Map();

  protected _onLegendHover(name: string, hovered: boolean): void {
    const t = (key: string, defaultValue?: string) => this.t(key, defaultValue);
    const seriesIndex = findSeriesIndexByDisplayName(t, this._option.series || [], name);

    if (seriesIndex === -1) return;

    this._activeScatters.forEach((circles, idx) => {
      if (hovered) {
        if (idx === seriesIndex) {
          // Highlight
          circles.forEach((c) => c.attr('style', { opacity: 1 }));
        } else {
          // Dim
          circles.forEach((c) => c.attr('style', { opacity: 0.1 }));
        }
      } else {
        // Restore
        circles.forEach((c) => c.attr('style', { opacity: 0.8 })); // Default opacity for scatter is often 0.8
      }
    });
  }

  protected _render(): void {
    try {
      super._render();
      if (!this._activeScatters) {
        this._activeScatters = new Map();
      }
      this._activeScatters.clear();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) return;

      if (!Circle) {
        console.error(
          '[ScatterChart] Circle class is not defined. Check imports.',
        );
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
      const yAxis = Array.isArray(option.yAxis)
        ? option.yAxis[0]
        : option.yAxis;

      let data: any[] = [];
      series.forEach((s) => {
        if (s.type === 'scatter' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yDomain = calculateDomain(yAxis || {}, data, false);

      const xScale =
        xAxis?.type === 'category'
          ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
          : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale =
        yAxis?.type === 'category'
          ? createOrdinalScale(yDomain, [plotY + plotHeight, plotY])
          : createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      try {
        this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight, {
          x: xScale,
          y: yScale,
        });
      } catch (e) {
        console.error('[ScatterChart] Error rendering axes:', e);
      }

      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter((s: any) => s.type === 'scatter' && s.show !== false)
          .map((s: any, i: number) => ({
            name: getSeriesDisplayName(
              (key: string, defaultValue?: string) =>
                this.t(key, defaultValue),
              s,
              i,
            ),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: option.legend?.icon || 'circle',
            textColor: this.getThemeConfig().legendTextColor,
            data: s,
          }));
        this._mountLegend(items);
      }

      series.forEach((s: any, seriesIndex: number) => {
        if (s.type !== 'scatter') return;

        const seriesData = s.data || [];
        const color =
          s.itemStyle?.color || s.color || this._getSeriesColor(seriesIndex);
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

          if (xAxis?.type === 'category') {
            if (
              typeof xVal === 'number' &&
              xAxis.data &&
              xAxis.data[xVal] !== undefined
            ) {
              const cat = xAxis.data[xVal];
              cx = xScale(cat);
            } else {
              cx = xScale(xVal);
            }
          } else {
            cx = xScale(xVal);
          }

          if (yAxis?.type === 'category') {
            if (
              typeof yVal === 'number' &&
              yAxis.data &&
              yAxis.data[yVal] !== undefined
            ) {
              const cat = yAxis.data[yVal];
              cy = yScale(cat);
            } else {
              cy = yScale(yVal);
            }
          } else {
            cy = yScale(yVal);
          }

          if (isNaN(cx) || isNaN(cy)) {
            return;
          }

          const circle = new Circle({
            shape: {
              cx,
              cy,
              r: symbolSize / 2,
            },
            style: {
              fill: color,
              opacity: 0.8,
            },
            z: Z_SERIES,
          });
          this._root.add(circle);

          if (!this._activeScatters.has(seriesIndex)) {
            this._activeScatters.set(seriesIndex, []);
          }
          this._activeScatters.get(seriesIndex)!.push(circle);

          if (this._tooltip) {
            circle.on('mouseover', (evt: any) => {
              circle.attr('shape', { r: symbolSize / 2 + 3 });
              circle.attr('style', { opacity: 1 });

              const itemName =
                typeof item === 'object' && item.name ? item.name : '';
              const params = {
                componentType: 'series',
                seriesType: 'scatter',
                seriesIndex,
                seriesName: getSeriesDisplayName(
                  (key: string, defaultValue?: string) =>
                    this.t(key, defaultValue),
                  s,
                  seriesIndex,
                ),
                name: itemName,
                dataIndex: index,
                data: item,
                value: [xVal, yVal],
                color: color,
                marker: this._getTooltipMarker(color),
              };
              const content = this._generateTooltipContent(params);

              const r = symbolSize / 2 + 3;
              const targetRect = {
                x: cx - r,
                y: cy - r,
                width: r * 2,
                height: r * 2,
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

          if (this._isAnimationEnabled()) {
            const baseDelay =
              resolveAnimationDelay(s.animationDelay, index);
            const delay = baseDelay;
            const duration = this._getAnimationDuration() / 2;

            circle.shape.r = 0;

            this._animator.animate(circle.shape, 'r', symbolSize / 2, {
              duration,
              delay,
              easing: 'elasticOut',
              onUpdate: () => circle.markRedraw(),
            });
          } else {
            circle.shape.r = symbolSize / 2;
            circle.markRedraw();
          }

          circle.markRedraw();
        });
      });

      this._renderer.flush();
    } catch (e) {
      console.error('[ScatterChart] Render error:', e);
    }
  }
}
