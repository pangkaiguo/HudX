import Chart from '../Chart';
import { Circle } from 'HudX/core';
import { EventHelper } from '../util/EventHelper';

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
          shape: { cx: x, cy: y, r: 0 },
          style: { fill: color, opacity: 0.7 },
          cursor: this._tooltip ? 'pointer' : 'default',
        });

        this._root.add(circle);

        if (this._tooltip) {
          circle.on('mouseover', (evt: any) => {
            const currentR = circle.shape.r;
            circle.attr('shape', { r: symbolSize + 3 });
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

            const r = symbolSize + 3;
            const targetRect = {
              x: x - r,
              y: y - r,
              width: r * 2,
              height: r * 2
            };

            const mx = evt?.offsetX ?? x;
            const my = evt?.offsetY ?? y;
            this._tooltip!.show(mx, my, content, params, targetRect);
          });

          circle.on('mouseout', () => {
            circle.attr('shape', { r: symbolSize });
            circle.attr('style', { opacity: 0.7 });
            this._tooltip!.hide();
          });
        }

        if (this._isAnimationEnabled()) {
          const delay = index * 50 + seriesIndex * 100;
          const duration = this._getAnimationDuration() / 2;

          this._animator.animate(
            circle.attr('shape'),
            'r',
            symbolSize,
            {
              duration,
              delay,
              easing: 'elasticOut',
              onUpdate: (target: any, percent: number) => {
                circle.attr('style', {
                  fill: color,
                  opacity: 0.7 * percent
                });
              }
            }
          );
        } else {
          circle.attr('shape', { cx: x, cy: y, r: symbolSize });
        }
      });
    });

    this._drawAxes(left, top, chartWidth, chartHeight, xAxis, yAxis);
  }

  private _drawAxes(left: number, top: number, width: number, height: number, xAxis: any, yAxis: any): void {
    this._root.add(new Circle({
      shape: { cx: left, cy: top + height, r: 0 },
      style: { stroke: '#333', lineWidth: 1 }
    }));

    this._root.add(new Circle({
      shape: { cx: left, cy: top, r: 0 },
      style: { stroke: '#333', lineWidth: 1 }
    }));
  }
}
