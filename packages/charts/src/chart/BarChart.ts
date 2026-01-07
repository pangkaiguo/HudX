import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain } from '../util/coordinate';
import { Rect, createDecalPattern, Z_SERIES } from 'HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class BarChart extends Chart {
  private _activeBars: Map<string, Rect> = new Map();

  protected _render(): void {
    try {
      super._render();

      if (!this._activeBars) {
        this._activeBars = new Map();
      }

      const oldBars = this._activeBars;
      this._activeBars = new Map();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) return;

      const { x: plotX, y: plotY, width: plotWidth, height: plotHeight } = this._calculateGrid(option);

      const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
      const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;
      const isHorizontal = yAxis?.type === 'category';

      let data: any[] = [];
      series.forEach(s => {
        if (s.type === 'bar' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      const hasStack = series.some(s => s.type === 'bar' && s.stack);
      let finalData = data;

      if (hasStack) {
        const stackTotals: Record<number, Record<string, { pos: number, neg: number }>> = {};

        series.forEach(s => {
          if (s.type !== 'bar' || s.show === false) return;
          const stackId = s.stack || `__no_stack_${s.name || Math.random()}`;
          const sData = s.data || [];
          sData.forEach((val: any, idx: number) => {
            const value = (typeof val === 'object' && val !== null && val.value !== undefined) ? val.value : val;
            if (typeof value !== 'number') return;

            if (!stackTotals[idx]) stackTotals[idx] = {};
            if (!stackTotals[idx][stackId]) stackTotals[idx][stackId] = { pos: 0, neg: 0 };

            if (value >= 0) stackTotals[idx][stackId].pos += value;
            else stackTotals[idx][stackId].neg += value;
          });
        });

        const stackData: number[] = [];
        Object.values(stackTotals).forEach(catStacks => {
          Object.values(catStacks).forEach(stack => {
            stackData.push(stack.pos);
            stackData.push(stack.neg);
          });
        });

        finalData = [...data, ...stackData];
      }

      const xDataForDomain = isHorizontal ? finalData : data;
      const yDataForDomain = isHorizontal ? data : finalData;

      const xDomain = calculateDomain(xAxis || {}, xDataForDomain, true);
      const yDomain = calculateDomain(yAxis || {}, yDataForDomain, false);

      const xScale = xAxis?.type === 'category'
        ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
        : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = yAxis?.type === 'category'
        ? createOrdinalScale(yDomain, [plotY, plotY + plotHeight])
        : createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      const barSeries = series.filter(s => s.type === 'bar' && s.show !== false);
      const seriesCount = barSeries.length || 1;
      let categoryCount: number;
      if (isHorizontal) {
        categoryCount = (Array.isArray(yAxis?.data) ? yAxis.data.length : yDomain.length);
      } else if (xAxis?.type === 'category') {
        categoryCount = (Array.isArray(xAxis?.data) ? xAxis.data.length : xDomain.length);
      } else {
        categoryCount = data.length;
      }

      const stacks: Record<string, any[]> = {};
      series.forEach((s, i) => {
        if (s.type !== 'bar' || s.show === false) return;
        const seriesName = s.name || this.t('series.name', 'Series') + '-' + (i + 1);
        const stackId = s.stack || `__no_stack_${seriesName}`;

        if (!stacks[stackId]) {
          stacks[stackId] = [];
        }
        stacks[stackId].push(s);
      });

      const stackGroups = Object.keys(stacks).length;
      const stackGroupSeries = Object.values(stacks);

      const axisLength = isHorizontal ? plotHeight : plotWidth;
      const categoryWidth = categoryCount > 0 ? (axisLength / categoryCount) : axisLength;

      const firstSeries = barSeries[0] || {};
      const barCategoryGapStr = firstSeries.barCategoryGap ?? '20%';
      const barGapStr = firstSeries.barGap ?? '30%';

      const parsePercent = (val: string | number) => {
        if (typeof val === 'string' && val.endsWith('%')) {
          return parseFloat(val) / 100;
        }
        return 0;
      };

      const categoryGapPercent = parsePercent(barCategoryGapStr);
      const availableWidth = categoryWidth * (1 - categoryGapPercent);

      let barWidthPerSeries: number;
      let gapWidth: number;

      const groupCount = stackGroups;

      if (typeof barGapStr === 'string' && barGapStr.endsWith('%')) {
        const gapPercent = parsePercent(barGapStr);
        barWidthPerSeries = availableWidth / (groupCount + (groupCount - 1) * gapPercent);
        gapWidth = barWidthPerSeries * gapPercent;
      } else {
        gapWidth = parseFloat(String(barGapStr));
        if (isNaN(gapWidth)) gapWidth = 0;

        const totalGapWidth = (groupCount - 1) * gapWidth;
        if (totalGapWidth >= availableWidth) {
          barWidthPerSeries = 0;
        } else {
          barWidthPerSeries = (availableWidth - totalGapWidth) / groupCount;
        }
      }

      const groupInnerWidth = groupCount * barWidthPerSeries + (groupCount - 1) * gapWidth;

      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);

      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter(s => s.type === 'bar' && s.show !== false)
          .map((s, i) => ({
            name: s.name || this.t('series.name', 'Series') + '-' + (i + 1),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: option.legend?.icon || 'rect',
            textColor: this.getThemeConfig().legendTextColor
          }));
        this._mountLegend(items);
      }

      const stackValues: Record<string, Record<string, { pos: number, neg: number }>> = {};
      const lastBars: Record<string, Record<string, { pos?: Rect, neg?: Rect }>> = {};

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
        const stackId = seriesItem.stack || `__no_stack_${seriesName}`;
        const stackGroupIndex = Object.keys(stacks).indexOf(stackId);

        const barColor = seriesItem.itemStyle?.color || seriesItem.color || this._getSeriesColor(seriesIndex);

        seriesData.forEach((item, index) => {
          let xVal, yVal;
          if (isHorizontal) {
            yVal = yDomain[index];
            if (typeof item === 'object' && item !== null && item.value !== undefined) {
              xVal = item.value;
            } else if (Array.isArray(item)) {
              xVal = item[0];
            } else {
              xVal = item;
            }
          } else if (xAxis?.type === 'category') {
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

          if (xVal === undefined || yVal === undefined) return;

          const catKey = String(index);

          if (!stackValues[catKey]) {
            stackValues[catKey] = {};
          }
          if (!stackValues[catKey][stackId]) {
            stackValues[catKey][stackId] = { pos: 0, neg: 0 };
          }

          const valueVal = isHorizontal ? xVal : yVal;

          const currentStack = stackValues[catKey][stackId];
          const isPositive = valueVal >= 0;
          const baseValue = isPositive ? currentStack.pos : currentStack.neg;

          if (isPositive) {
            currentStack.pos += valueVal;
          } else {
            currentStack.neg += valueVal;
          }

          const topValue = baseValue + valueVal;

          const categoryScale = isHorizontal ? yScale : xScale;
          const valueScale = isHorizontal ? xScale : yScale;
          const categoryVal = isHorizontal ? yVal : xVal;

          const groupCenter = categoryScale(categoryVal);
          const groupStart = groupCenter - groupInnerWidth / 2;
          const barCategoryPos = groupStart + stackGroupIndex * (barWidthPerSeries + gapWidth);

          const barValueEnd = valueScale(topValue);
          const barValueStart = valueScale(baseValue);

          let barX, barY, barWidth, barHeight;

          if (isHorizontal) {
            barX = Math.min(barValueStart, barValueEnd);
            barWidth = Math.abs(barValueEnd - barValueStart);
            barY = barCategoryPos;
            barHeight = barWidthPerSeries;
          } else {
            barX = barCategoryPos;
            barWidth = barWidthPerSeries;
            barY = Math.min(barValueStart, barValueEnd);
            barHeight = Math.abs(barValueEnd - barValueStart);
          }

          const itemStyle = seriesItem.itemStyle || {};

          let fillStyle: string | CanvasPattern = barColor;
          const aria = option.aria;
          if (aria?.enabled && aria?.decal?.show) {
            const decals = aria.decal.decals || [];
            const decal = decals[seriesIndex % decals.length] || { symbol: 'rect' };

            const pattern = createDecalPattern(decal, barColor);
            if (pattern) {
              fillStyle = pattern;
            }
          }

          const barKey = `${seriesIndex}-${index}`;
          const oldBar = oldBars.get(barKey);

          let initialX = barX;
          let initialY = barY;
          let initialWidth = barWidth;
          let initialHeight = barHeight;

          if (oldBar) {
            initialX = oldBar.shape.x;
            initialY = oldBar.shape.y;
            initialWidth = oldBar.shape.width;
            initialHeight = oldBar.shape.height;
          } else {
            if (isHorizontal) {
              initialWidth = 0;
              initialX = valueScale(baseValue);
              initialY = barY;
              initialHeight = barHeight;
            } else {
              initialHeight = 0;
              initialY = valueScale(baseValue);
              initialX = barX;
              initialWidth = barWidth;
            }
          }

          const rect = new Rect({
            shape: {
              x: initialX,
              y: initialY,
              width: initialWidth,
              height: initialHeight,
              r: itemStyle.borderRadius as any
            },
            style: {
              fill: fillStyle,
              stroke: itemStyle.borderColor || this.getThemeConfig().borderColor,
              lineWidth: itemStyle.borderWidth || 0,
            },
            z: Z_SERIES,
            cursor: this._tooltip ? 'pointer' : 'default',
          });
          (rect as any).__isPositive = isPositive;

          // Update lastBars for the next item in the stack
          if (!lastBars[catKey]) {
            lastBars[catKey] = {};
          }
          if (!lastBars[catKey][stackId]) {
            lastBars[catKey][stackId] = {};
          }
          if (isPositive) {
            lastBars[catKey][stackId].pos = rect;
          } else {
            lastBars[catKey][stackId].neg = rect;
          }

          this._root.add(rect);
          this._activeBars.set(barKey, rect);

          if (this._tooltip) {
            EventHelper.bindHoverEvents(
              rect,
              (evt: any) => {
                rect.attr('style', { opacity: 0.8 });
                const itemName = (typeof item === 'object' && item.name) ? item.name : (isHorizontal ? yDomain[index] : (xAxis?.data?.[index] || ''));
                const itemValue = this._getDataValue(item);

                const params = {
                  componentType: 'series',
                  seriesType: 'bar',
                  seriesIndex,
                  seriesName: seriesName,
                  name: itemName,
                  dataIndex: index,
                  data: item,
                  value: itemValue
                };
                const content = this._generateTooltipContent(params);

                const mx = evt?.offsetX ?? (barX + barWidth / 2);
                const my = evt?.offsetY ?? (barY + barHeight / 2);
                this._tooltip!.show(mx, my, content, params, rect.attr('shape'));
              },
              () => {
                rect.attr('style', { opacity: 1 });
                this._tooltip!.hide();
              }
            );

            rect.on('mousemove', (evt: any) => {
              const itemName = (typeof item === 'object' && item.name) ? item.name : (isHorizontal ? yDomain[index] : (xAxis?.data?.[index] || ''));
              const itemValue = this._getDataValue(item);

              const params = {
                componentType: 'series',
                seriesType: 'bar',
                seriesIndex,
                seriesName: seriesName,
                name: itemName,
                dataIndex: index,
                data: item,
                value: itemValue
              };
              const content = this._generateTooltipContent(params);

              const mx = evt?.offsetX ?? (barX + barWidth / 2);
              const my = evt?.offsetY ?? (barY + barHeight / 2);

              if (this._tooltip) {
                if (!this._tooltip.isVisible()) {
                  rect.attr('style', { opacity: 0.8 });
                }
                this._tooltip.show(mx, my, content, params, rect.attr('shape'));
              }
            });
          }

          if (this._shouldAnimateFor(seriesName) || oldBar) {
            const isUpdate = !!oldBar;
            // If chart has existing bars (update scenario), skip staggered delay to ensure sync
            const hasOldBars = oldBars.size > 0;
            const delay = (isUpdate || hasOldBars) ? 0 : (index * 100 + seriesIndex * 200);
            const duration = this._getAnimationDuration(isUpdate);

            // Animate properties
            this._animator.animate(
              rect.attr('shape'),
              'height',
              barHeight,
              { duration, delay, easing: 'cubicOut', onUpdate: () => rect.markRedraw() }
            ).start();

            this._animator.animate(
              rect.attr('shape'),
              'y',
              barY,
              { duration, delay, easing: 'cubicOut', onUpdate: () => rect.markRedraw() }
            ).start();

            this._animator.animate(
              rect.attr('shape'),
              'width',
              barWidth,
              { duration, delay, easing: 'cubicOut', onUpdate: () => rect.markRedraw() }
            ).start();

            this._animator.animate(
              rect.attr('shape'),
              'x',
              barX,
              { duration, delay, easing: 'cubicOut', onUpdate: () => rect.markRedraw() }
            ).start();

          } else {
            rect.attr('shape', {
              x: barX,
              y: barY,
              width: barWidth,
              height: barHeight
            });
          }
        });
      });

      // Handle exit animation for removed bars
      oldBars.forEach((bar, key) => {
        if (!this._activeBars.has(key)) {
          // Ensure exiting bars are behind new bars
          bar.z = Z_SERIES - 1;
          this._root.add(bar);
          const isPositive = (bar as any).__isPositive ?? true;

          if (isHorizontal) {
            const initialW = bar.shape.width;
            const initialX = bar.shape.x;
            const targetX = isPositive ? initialX : (initialX + initialW);

            this._animator.animate(
              bar.shape,
              'width',
              0,
              { duration: 300, easing: 'cubicOut', onUpdate: () => bar.markRedraw() }
            ).start();

            this._animator.animate(
              bar.shape,
              'x',
              targetX,
              { duration: 300, easing: 'cubicOut', onUpdate: () => bar.markRedraw() }
            ).start();
          } else {
            const initialH = bar.shape.height;
            const initialY = bar.shape.y;
            const targetY = isPositive ? (initialY + initialH) : initialY;

            this._animator.animate(
              bar.shape,
              'height',
              0,
              { duration: 300, easing: 'cubicOut', onUpdate: () => bar.markRedraw() }
            ).start();

            this._animator.animate(
              bar.shape,
              'y',
              targetY,
              { duration: 300, easing: 'cubicOut', onUpdate: () => bar.markRedraw() }
            ).start();
          }
        }
      });

      this._renderer.flush();
    } catch (e) {
      console.error('[BarChart] Render error:', e);
    }
  }
}
