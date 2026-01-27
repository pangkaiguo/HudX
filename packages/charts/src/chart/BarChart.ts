import {
  Chart,
  type RenderMode,
  createLinearScale,
  createOrdinalScale,
  calculateDomain,
  Rect,
  Line,
  Text,
  createDecalPattern,
  Z_SERIES,
  Z_AXIS,
  toRgbaWithOpacity,
  SeriesOption,
  ChartData,
  AxisOption,
  EventHelper,
  EVENT_TYPE_SHOW_TIP,
} from 'hudx-render';
import {
  findSeriesIndexByDisplayName,
  getSeriesDisplayName,
  resolveAnimationDelay,
} from './chartUtils';

interface BarRect extends Rect {
  __isPositive?: boolean;
}

/**
 * BarChart - Bar chart implementation
 *
 * Algorithm: Band Scale Layout & Stack Layout
 *
 * Description:
 * Calculates bar positions and widths using the Band Scale model.
 * - Handles grouped bars by subdividing the category bandwidth.
 * - Supports stacked bars by accumulating positive/negative values (Stack Layout algorithm).
 * - Manages coordinate mapping from data domain to pixel space.
 */
export default class BarChart extends Chart {
  private _activeBars: Map<string, BarRect> = new Map();
  private _activeLabels: Map<string, Text> = new Map();
  private _baseBarOpacity: Map<string, number> = new Map();
  private _baseLabelOpacity: Map<string, number> = new Map();

  setRenderMode(renderMode: RenderMode): void {
    if (this.getRenderMode() === renderMode) {
      return;
    }
    this._activeBars = new Map();
    this._activeLabels = new Map();
    this._baseBarOpacity = new Map();
    this._baseLabelOpacity = new Map();
    super.setRenderMode(renderMode);
  }

  protected _onLegendHover(name: string, hovered: boolean): void {
    const t = (key: string, defaultValue?: string) => this.t(key, defaultValue);
    const seriesIndex = findSeriesIndexByDisplayName(
      t,
      this._option.series || [],
      name,
    );

    if (seriesIndex === -1) return;

    if (this._legend && !this._legendSelected.has(name)) return;

    this._activeBars.forEach((bar, key) => {
      const [sIdx] = key.split('-').map(Number);

      if (hovered) {
        if (sIdx === seriesIndex) {
          bar.attr('style', { opacity: 1 });
        } else {
          bar.attr('style', { opacity: 0.4 });
        }
      } else {
        bar.attr('style', { opacity: this._baseBarOpacity.get(key) ?? 1 });
      }
    });

    this._activeLabels.forEach((label, key) => {
      const [sIdx] = key.split('-').map(Number);
      if (hovered) {
        label.attr('style', { opacity: sIdx === seriesIndex ? 1 : 0.4 });
      } else {
        label.attr('style', { opacity: this._baseLabelOpacity.get(key) ?? 1 });
      }
    });
  }

  protected _render(): void {
    try {
      super._render();

      if (!this._activeBars) {
        this._activeBars = new Map();
      }

      const oldBars = this._forceReinitOnNextRender
        ? new Map()
        : this._activeBars;
      this._activeBars = new Map();
      this._baseBarOpacity = new Map();

      if (!this._activeLabels) {
        this._activeLabels = new Map();
      }
      const oldLabels = this._forceReinitOnNextRender
        ? new Map()
        : this._activeLabels;
      this._activeLabels = new Map();
      this._baseLabelOpacity = new Map();

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
      const isHorizontal = yAxis?.type === 'category';

      const legendData = option.legend?.data;
      const legendNameSet = new Set<string>();
      if (Array.isArray(legendData)) {
        legendData.forEach((item) => {
          const name =
            typeof item === 'string'
              ? item
              : typeof item === 'object' && item
                ? item.name
                : undefined;
          if (name) legendNameSet.add(name);
        });
      }
      const hasLegendData = legendNameSet.size > 0;
      const legendSelectedMap =
        option.legend?.selected && typeof option.legend.selected === 'object'
          ? (option.legend.selected as Record<string, boolean>)
          : null;
      const isSeriesVisibleByLegend = (seriesName: string) => {
        if (!this._legend) return true;
        if (hasLegendData && !legendNameSet.has(seriesName)) return true;
        if (this._hasInitLegend) return this._legendSelected.has(seriesName);
        if (legendSelectedMap) {
          const entry = legendSelectedMap[seriesName];
          if (entry === undefined) return true;
          return entry !== false;
        }
        return true;
      };

      let data: ChartData[] = [];
      series.forEach((s, i) => {
        if (s.type !== 'bar' || s.show === false) return;
        const seriesName = getSeriesDisplayName(
          (key: string, defaultValue?: string) => this.t(key, defaultValue),
          s,
          i,
        );
        if (!isSeriesVisibleByLegend(seriesName)) return;
        data = data.concat(s.data || []);
      });

      if (data.length === 0) return;

      const hasStack = series.some((s, i) => {
        if (s.type !== 'bar' || s.show === false || !s.stack) return false;
        const seriesName = getSeriesDisplayName(
          (key: string, defaultValue?: string) => this.t(key, defaultValue),
          s,
          i,
        );
        return isSeriesVisibleByLegend(seriesName);
      });
      let finalData = data;

      if (hasStack) {
        const stackTotals: Record<
          number,
          Record<string, { pos: number; neg: number }>
        > = {};

        series.forEach((s, i) => {
          if (s.type !== 'bar' || s.show === false) return;
          const seriesName = getSeriesDisplayName(
            (key: string, defaultValue?: string) => this.t(key, defaultValue),
            s,
            i,
          );
          if (!isSeriesVisibleByLegend(seriesName)) return;
          const stackId = s.stack || `__no_stack_${seriesName}`;
          const sData = s.data || [];
          sData.forEach((val: ChartData, idx: number) => {
            const value =
              typeof val === 'object' && val !== null && 'value' in val
                ? Array.isArray(val.value)
                  ? val.value[0]
                  : val.value
                : typeof val === 'number'
                  ? val
                  : 0;
            if (typeof value !== 'number') return;

            if (!stackTotals[idx]) stackTotals[idx] = {};
            if (!stackTotals[idx][stackId])
              stackTotals[idx][stackId] = { pos: 0, neg: 0 };

            if (value >= 0) stackTotals[idx][stackId].pos += value;
            else stackTotals[idx][stackId].neg += value;
          });
        });

        const stackData: number[] = [];
        Object.values(stackTotals).forEach((catStacks) => {
          Object.values(catStacks).forEach((stack) => {
            stackData.push(stack.pos);
            stackData.push(stack.neg);
          });
        });

        finalData = [...data, ...stackData];
      }

      const xDataForDomain = isHorizontal ? finalData : data;
      const yDataForDomain = isHorizontal ? data : finalData;

      const xDomain = calculateDomain(
        (xAxis || {}) as AxisOption,
        xDataForDomain,
        true,
      );
      const yDomain = calculateDomain(
        (yAxis || {}) as AxisOption,
        yDataForDomain,
        false,
      );

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

      const yScale =
        yAxis?.type === 'category'
          ? createOrdinalScale(yDomain, yRange)
          : createLinearScale(yDomain, yRange);

      const barSeries = series.filter((s, i) => {
        if (s.type !== 'bar' || s.show === false) return false;
        const seriesName = getSeriesDisplayName(
          (key: string, defaultValue?: string) => this.t(key, defaultValue),
          s,
          i,
        );
        return isSeriesVisibleByLegend(seriesName);
      });
      const seriesCount = barSeries.length || 1;
      let categoryCount: number;
      if (isHorizontal) {
        categoryCount = Array.isArray(yAxis?.data)
          ? yAxis.data.length
          : yDomain.length;
      } else if (xAxis?.type === 'category') {
        categoryCount = Array.isArray(xAxis?.data)
          ? xAxis.data.length
          : xDomain.length;
      } else {
        categoryCount = data.length;
      }

      const stacks: Record<string, SeriesOption[]> = {};
      const stackOrder: string[] = [];
      series.forEach((s, i) => {
        if (s.type !== 'bar' || s.show === false) return;
        const seriesName = getSeriesDisplayName(
          (key: string, defaultValue?: string) => this.t(key, defaultValue),
          s,
          i,
        );
        if (!isSeriesVisibleByLegend(seriesName)) return;
        const stackId = s.stack || `__no_stack_${seriesName}`;

        if (!stacks[stackId]) {
          stacks[stackId] = [];
          stackOrder.push(stackId);
        }
        stacks[stackId].push(s);
      });

      const stackGroups = Object.keys(stacks).length;
      const stackGroupSeries = Object.values(stacks);

      const axisLength = isHorizontal ? plotHeight : plotWidth;
      const categoryWidth =
        categoryCount > 0 ? axisLength / categoryCount : axisLength;

      const firstSeries = barSeries[0] || {};
      const barCategoryGapStr = firstSeries.barCategoryGap ?? '20%';
      const barGapStr = firstSeries.barGap ?? '30%';

      const parsePercent = (val: string | number, total: number) => {
        if (typeof val === 'string' && val.endsWith('%')) {
          return (parseFloat(val) / 100) * total;
        }
        return Number(val);
      };

      const parseGapPercent = (val: string | number) => {
        if (typeof val === 'string' && val.endsWith('%')) {
          return parseFloat(val) / 100;
        }
        return 0;
      };

      const categoryGapPercent = parseGapPercent(barCategoryGapStr);
      const availableWidth = categoryWidth * (1 - categoryGapPercent);

      let barWidthPerSeries: number;
      let gapWidth: number;

      const groupCount = stackGroups;

      // Explicit barWidth check
      const explicitBarWidth = firstSeries.barWidth;

      if (explicitBarWidth !== undefined) {
        barWidthPerSeries = parsePercent(explicitBarWidth, categoryWidth);
        // If barWidth is fixed, we recalculate gap if needed or just center them
        // For ECharts compatibility, barGap is relative to barWidth usually
        if (typeof barGapStr === 'string' && barGapStr.endsWith('%')) {
          const gapPercent = parseFloat(barGapStr) / 100;
          gapWidth = barWidthPerSeries * gapPercent;
        } else {
          gapWidth = parseFloat(String(barGapStr)) || 0;
        }
      } else {
        // Auto calculate
        if (typeof barGapStr === 'string' && barGapStr.endsWith('%')) {
          const gapPercent = parseGapPercent(barGapStr);
          barWidthPerSeries =
            availableWidth / (groupCount + (groupCount - 1) * gapPercent);
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
      }

      // Max/Min Width/Height constraints
      if (firstSeries.barMaxWidth !== undefined) {
        const maxW = parsePercent(firstSeries.barMaxWidth, categoryWidth);
        if (barWidthPerSeries > maxW) barWidthPerSeries = maxW;
      }
      if (firstSeries.barMinWidth !== undefined) {
        // Although not standard ECharts, good to have
        // ...
      }

      const groupInnerWidth =
        groupCount * barWidthPerSeries + (groupCount - 1) * gapWidth;

      // Setup Axis Pointer (Guide Line)
      let axisPointerLine: Line | null = null;

      // Default to 'shadow' or 'none' for BarChart unless 'line' is explicitly requested
      const axisPointerType = option.tooltip?.axisPointer?.type;

      if (
        this._tooltip &&
        option.tooltip?.trigger === 'axis' &&
        axisPointerType === 'line'
      ) {
        axisPointerLine = new Line({
          shape: { x1: 0, y1: 0, x2: 0, y2: 0 },
          style: {
            stroke:
              option.tooltip?.axisPointer?.lineStyle?.color ||
              this.getThemeConfig().axisPointerColor,
            lineWidth: option.tooltip?.axisPointer?.lineStyle?.width || 1,
            lineDash: option.tooltip?.axisPointer?.lineStyle?.type === 'dashed'
              ? [4, 4]
              : undefined,
          },
          z: Z_AXIS + 1,
          invisible: true,
        });
        this._root.add(axisPointerLine);
      }

      if (option.legend?.show !== false) {
        const aria = option.aria;
        const ariaDecals =
          aria?.enabled && aria?.decal?.show ? aria.decal.decals || [] : [];
        const items = series
          .filter((s) => s.type === 'bar' && s.show !== false)
          .map((s, i) => ({
            name: getSeriesDisplayName(
              (key: string, defaultValue?: string) => this.t(key, defaultValue),
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

      const stackValues: Record<
        string,
        Record<string, { pos: number; neg: number }>
      > = {};
      const stackPixels: Record<
        string,
        Record<string, { pos?: number; neg?: number }>
      > = {};
      const lastBars: Record<
        string,
        Record<string, { pos?: Rect; neg?: Rect }>
      > = {};

      series.forEach((seriesItem, seriesIndex) => {
        if (seriesItem.type !== 'bar') {
          return;
        }
        if (seriesItem.show === false) {
          return;
        }
        const seriesName = getSeriesDisplayName(
          (key: string, defaultValue?: string) => this.t(key, defaultValue),
          seriesItem,
          seriesIndex,
        );
        if (!isSeriesVisibleByLegend(seriesName)) return;

        const seriesData = seriesItem.data || [];
        const stackId = seriesItem.stack || `__no_stack_${seriesName}`;
        const stackGroupIndex = stackOrder.indexOf(stackId);

        const barColor =
          seriesItem.itemStyle?.color ||
          seriesItem.color ||
          this._getSeriesColor(seriesIndex);

        seriesData.forEach((item, index) => {
          let xVal, yVal;
          if (isHorizontal) {
            yVal = yDomain[index];
            const raw =
              typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item) &&
                'value' in item
                ? item.value
                : item;
            xVal = Array.isArray(raw) ? raw[0] : raw;
          } else if (xAxis?.type === 'category') {
            xVal = xDomain[index];
            const raw =
              typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item) &&
                'value' in item
                ? item.value
                : item;
            yVal = Array.isArray(raw) ? (raw[1] ?? raw[0]) : raw;
          } else {
            const raw =
              typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item) &&
                'value' in item
                ? item.value
                : item;
            if (!Array.isArray(raw)) return;
            xVal = raw[0];
            yVal = raw[1];
          }

          if (xVal === undefined || yVal === undefined) return;

          const catKey = String(index);

          if (!stackValues[catKey]) {
            stackValues[catKey] = {};
          }
          if (!stackValues[catKey][stackId]) {
            stackValues[catKey][stackId] = { pos: 0, neg: 0 };
          }
          if (!stackPixels[catKey]) {
            stackPixels[catKey] = {};
          }
          if (!stackPixels[catKey][stackId]) {
            stackPixels[catKey][stackId] = {};
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
          const barCategoryPos =
            groupStart + stackGroupIndex * (barWidthPerSeries + gapWidth);

          const rawBarValueEnd = valueScale(topValue);
          const barValueEnd = Math.round(rawBarValueEnd);
          const pixelState = stackPixels[catKey][stackId];
          if (pixelState.pos === undefined || pixelState.neg === undefined) {
            const zeroPx = Math.round(valueScale(0));
            if (pixelState.pos === undefined) pixelState.pos = zeroPx;
            if (pixelState.neg === undefined) pixelState.neg = zeroPx;
          }
          const barValueStart = isPositive
            ? (pixelState.pos ?? Math.round(valueScale(baseValue)))
            : (pixelState.neg ?? Math.round(valueScale(baseValue)));
          if (isPositive) {
            pixelState.pos = barValueEnd;
          } else {
            pixelState.neg = barValueEnd;
          }

          let barX: number, barY: number, barWidth: number, barHeight: number;

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

          // Draw Background if enabled
          if (seriesItem.showBackground) {
            const bgStyle = seriesItem.backgroundStyle || {};
            const bgRect = new Rect({
              shape: {
                x: isHorizontal ? plotX : barX,
                y: isHorizontal ? barY : plotY,
                width: isHorizontal ? plotWidth : barWidth,
                height: isHorizontal ? barHeight : plotHeight,
              },
              style: {
                fill:
                  bgStyle.color ||
                  toRgbaWithOpacity(this.getThemeConfig().borderColor, 0.2),
                stroke: bgStyle.borderColor,
                lineWidth: bgStyle.borderWidth,
                opacity: bgStyle.opacity,
              },
              z: Z_SERIES - 1, // Behind bars
              silent: true,
            });
            if (Math.abs(baseValue) < 1e-9) {
              this._root.add(bgRect);
            }
          }

          let fillStyle: string | CanvasPattern = barColor;
          const aria = option.aria;
          if (aria?.enabled && aria?.decal?.show) {
            const decals = aria.decal.decals || [];
            const decal = decals[seriesIndex % decals.length] || {
              symbol: 'rect',
            };

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
              initialX = barValueStart;
              initialY = barY;
              initialHeight = barHeight;
            } else {
              initialHeight = 0;
              initialY = barValueStart;
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
              r: itemStyle.borderRadius as any,
            },
            style: {
              fill: fillStyle,
              stroke:
                itemStyle.borderColor || this.getThemeConfig().borderColor,
              lineWidth: itemStyle.borderWidth || 0,
              opacity: itemStyle.opacity ?? 1,
            },
            z: Z_SERIES,
            cursor: this._tooltip ? 'pointer' : 'default',
          }) as BarRect;
          rect.__isPositive = isPositive;

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
          this._baseBarOpacity.set(barKey, rect.attr('style')?.opacity ?? 1);

          const seriesLabel = seriesItem.label;
          const itemLabel =
            typeof item === 'object' && item !== null && 'label' in item
              ? item.label
              : undefined;
          const labelOpt = { ...(seriesLabel || {}), ...(itemLabel || {}) };
          const showLabel = labelOpt && labelOpt.show === true;

          if (showLabel) {
            const theme = this.getThemeConfig();
            const position = (labelOpt.position || 'outside') as string;
            const value = this._getDataValue(item);
            const itemName =
              typeof item === 'object' && item !== null && 'name' in item
                ? item.name
                : isHorizontal
                  ? yDomain[index]
                  : xAxis?.data?.[index] || '';

            const resolvedPosition =
              position === 'outside'
                ? isHorizontal
                  ? isPositive
                    ? 'right'
                    : 'left'
                  : isPositive
                    ? 'top'
                    : 'bottom'
                : position;

            const paramsForLabel = {
              componentType: 'series',
              seriesType: 'bar',
              seriesIndex,
              seriesName,
              name: itemName,
              dataIndex: index,
              data: item,
              value,
            };

            const formatLabel = (formatter: any): string => {
              if (typeof formatter === 'function')
                return formatter(paramsForLabel);
              if (typeof formatter === 'string') {
                let result = formatter
                  .replace(/\{a\}/g, String(seriesName ?? ''))
                  .replace(/\{b\}/g, String(itemName ?? ''))
                  .replace(/\{c\}/g, String(value ?? ''))
                  .replace(/\{name\}/g, String(itemName ?? ''))
                  .replace(/\{value\}/g, String(value ?? ''));

                if (item && typeof item === 'object') {
                  Object.keys(item).forEach((k) => {
                    const v = (item as any)[k];
                    if (typeof v === 'string' || typeof v === 'number') {
                      result = result.replace(
                        new RegExp(`\\{${k}\\}`, 'g'),
                        String(v),
                      );
                    }
                  });
                }
                return result;
              }
              return String(value ?? '');
            };

            const labelText = formatLabel(labelOpt.formatter);

            const getLabelLayout = (
              x: number,
              y: number,
              w: number,
              h: number,
            ) => {
              const offset = 4;
              const cx = x + w / 2;
              const cy = y + h / 2;
              let lx = cx;
              let ly = cy;
              let textAlign: CanvasTextAlign = 'center';
              let textBaseline: CanvasTextBaseline = 'middle';

              const pos = resolvedPosition;

              if (pos === 'center' || pos === 'inside') {
                lx = cx;
                ly = cy;
              } else if (pos === 'top') {
                lx = cx;
                ly = y - offset;
                textBaseline = 'bottom';
              } else if (pos === 'bottom') {
                lx = cx;
                ly = y + h + offset;
                textBaseline = 'top';
              } else if (pos === 'insideTop') {
                lx = cx;
                ly = y + offset;
                textBaseline = 'top';
              } else if (pos === 'insideBottom') {
                lx = cx;
                ly = y + h - offset;
                textBaseline = 'bottom';
              } else if (pos === 'left') {
                lx = x - offset;
                ly = cy;
                textAlign = 'right';
              } else if (pos === 'right') {
                lx = x + w + offset;
                ly = cy;
                textAlign = 'left';
              } else if (pos === 'insideLeft') {
                lx = x + offset;
                ly = cy;
                textAlign = 'left';
              } else if (pos === 'insideRight') {
                lx = x + w - offset;
                ly = cy;
                textAlign = 'right';
              } else if (pos === 'insideTopLeft') {
                lx = x + offset;
                ly = y + offset;
                textAlign = 'left';
                textBaseline = 'top';
              } else if (pos === 'insideTopRight') {
                lx = x + w - offset;
                ly = y + offset;
                textAlign = 'right';
                textBaseline = 'top';
              } else if (pos === 'insideBottomLeft') {
                lx = x + offset;
                ly = y + h - offset;
                textAlign = 'left';
                textBaseline = 'bottom';
              } else if (pos === 'insideBottomRight') {
                lx = x + w - offset;
                ly = y + h - offset;
                textAlign = 'right';
                textBaseline = 'bottom';
              }

              return { x: lx, y: ly, textAlign, textBaseline };
            };

            const initialLayout = getLabelLayout(
              initialX,
              initialY,
              initialWidth,
              initialHeight,
            );
            const finalLayout = getLabelLayout(barX, barY, barWidth, barHeight);

            const oldLabel = oldLabels.get(barKey);
            const shouldAnimate =
              this._shouldAnimateFor(seriesName) || oldLabel;
            const isUpdate = !!oldLabel;
            const hasOldLabels = oldLabels.size > 0;
            const delay =
              isUpdate || hasOldLabels
                ? 0
                : resolveAnimationDelay(seriesItem.animationDelay, index);
            const duration = this._getAnimationDuration(isUpdate);

            const isInside =
              String(resolvedPosition).startsWith('inside') ||
              resolvedPosition === 'inside' ||
              resolvedPosition === 'center';

            const label = new Text({
              shape: {
                x: oldLabel ? oldLabel.shape.x : initialLayout.x,
                y: oldLabel ? oldLabel.shape.y : initialLayout.y,
                text: labelText,
              },
              style: {
                fill:
                  labelOpt.color ||
                  (isInside
                    ? theme.textColorOnSeries ||
                    theme.token.colorTextOnSeries ||
                    '#fff'
                    : theme.axisLabelColor || theme.textColor),
                fontSize: labelOpt.fontSize ?? theme.fontSize,
                fontFamily: theme.fontFamily,
                textAlign: finalLayout.textAlign,
                textBaseline: finalLayout.textBaseline,
                opacity: labelOpt.opacity ?? 1,
              },
              z: Z_SERIES + 1,
              silent: true,
            });

            this._root.add(label);
            this._activeLabels.set(barKey, label);
            this._baseLabelOpacity.set(
              barKey,
              label.attr('style')?.opacity ?? 1,
            );

            if (shouldAnimate) {
              this._animator
                .animate(label.attr('shape'), 'x', finalLayout.x, {
                  duration,
                  delay,
                  easing: 'cubicOut',
                  onUpdate: () => label.markRedraw(),
                })
                .start();
              this._animator
                .animate(label.attr('shape'), 'y', finalLayout.y, {
                  duration,
                  delay,
                  easing: 'cubicOut',
                  onUpdate: () => label.markRedraw(),
                })
                .start();
            } else {
              label.attr('shape', { x: finalLayout.x, y: finalLayout.y });
            }
          }

          if (this._tooltip) {
            const restoreAllOpacities = () => {
              this._activeBars.forEach((bar, key) => {
                bar.attr('style', {
                  opacity: this._baseBarOpacity.get(key) ?? 1,
                });
              });
              this._activeLabels.forEach((label, key) => {
                label.attr('style', {
                  opacity: this._baseLabelOpacity.get(key) ?? 1,
                });
              });
            };

            const applyHoverEmphasis = () => {
              const emphasis = seriesItem.emphasis || {};
              const focus = emphasis.focus;

              if (focus === 'series') {
                this._activeBars.forEach((bar, key) => {
                  const [sIdx] = key.split('-').map(Number);
                  if (sIdx === seriesIndex) {
                    bar.attr('style', { opacity: 1 });
                  } else {
                    bar.attr('style', { opacity: 0.4 });
                  }
                });
                this._activeLabels.forEach((label, key) => {
                  const [sIdx] = key.split('-').map(Number);
                  if (sIdx === seriesIndex) {
                    label.attr('style', { opacity: 1 });
                  } else {
                    label.attr('style', { opacity: 0.4 });
                  }
                });
                return;
              }

              if (focus === 'self') {
                this._activeBars.forEach((bar, key) => {
                  bar.attr('style', { opacity: key === barKey ? 1 : 0.4 });
                });
                this._activeLabels.forEach((label, key) => {
                  label.attr('style', { opacity: key === barKey ? 1 : 0.4 });
                });
                return;
              }

              rect.attr('style', { opacity: 0.8 });
              const label = this._activeLabels.get(barKey);
              if (label) label.attr('style', { opacity: 0.8 });
            };

            const resolveTooltipValue = (dataItem: any): number | undefined => {
              if (typeof dataItem === 'number') return dataItem;
              if (Array.isArray(dataItem)) {
                if (isHorizontal) {
                  const v = dataItem[0];
                  return typeof v === 'number' ? v : undefined;
                }
                const v = dataItem.length > 1 ? dataItem[1] : dataItem[0];
                return typeof v === 'number' ? v : undefined;
              }
              if (typeof dataItem === 'object' && dataItem !== null) {
                const raw =
                  'value' in dataItem ? (dataItem as any).value : undefined;
                if (typeof raw === 'number') return raw;
                if (Array.isArray(raw)) {
                  if (isHorizontal) {
                    const v = raw[0];
                    return typeof v === 'number' ? v : undefined;
                  }
                  const v = raw.length > 1 ? raw[1] : raw[0];
                  return typeof v === 'number' ? v : undefined;
                }
              }
              return undefined;
            };

            const showTooltipAt = (evt: any) => {
              if (!this._tooltip) return;
              const mx = evt?.offsetX ?? barX + barWidth / 2;
              const my = evt?.offsetY ?? barY + barHeight / 2;

              const isAxisTrigger = option.tooltip?.trigger === 'axis';
              const hasCategoryAxis =
                isHorizontal || xAxis?.type === 'category';

              if (isAxisTrigger && hasCategoryAxis) {
                const axisName = isHorizontal
                  ? yDomain[index]
                  : (xAxis?.data?.[index] ?? xDomain[index] ?? '');
                const paramsList: any[] = [];
                series.forEach((seriesItem, sIdx) => {
                  if (seriesItem.type !== 'bar' || seriesItem.show === false)
                    return;
                  const sName = getSeriesDisplayName(
                    (key: string, defaultValue?: string) =>
                      this.t(key, defaultValue),
                    seriesItem,
                    sIdx,
                  );
                  if (!isSeriesVisibleByLegend(sName)) return;
                  const sData = seriesItem.data || [];
                  const sItem = sData[index];
                  const sValue = resolveTooltipValue(sItem);
                  if (sValue === undefined) return;
                  const sColor =
                    seriesItem.itemStyle?.color ||
                    seriesItem.color ||
                    this._getSeriesColor(sIdx);
                  paramsList.push({
                    type: EVENT_TYPE_SHOW_TIP,
                    componentType: 'series',
                    seriesType: 'bar',
                    seriesIndex: sIdx,
                    seriesName: sName,
                    name: axisName,
                    dataIndex: index,
                    data: sItem,
                    value: sValue,
                    color: typeof sColor === 'string' ? sColor : undefined,
                    marker:
                      typeof sColor === 'string'
                        ? this._getTooltipMarker(sColor)
                        : undefined,
                  });
                });
                if (paramsList.length === 0) {
                  this._tooltip.hide();
                  if (axisPointerLine) axisPointerLine.attr('invisible', true);
                  return;
                }
                const content = this._generateTooltipContent(paramsList);
                this._tooltip.show(mx + 12, my - 16, content, paramsList);

                if (axisPointerLine) {
                  if (isHorizontal) {
                    const cy = yScale(yDomain[index]);
                    axisPointerLine.attr('shape', {
                      x1: plotX,
                      y1: cy,
                      x2: plotX + plotWidth,
                      y2: cy,
                    });
                  } else {
                    const cx = xScale(xDomain[index]);
                    axisPointerLine.attr('shape', {
                      x1: cx,
                      y1: plotY,
                      x2: cx,
                      y2: plotY + plotHeight,
                    });
                  }
                  axisPointerLine.attr('invisible', false);
                }
                return;
              }

              const itemName =
                typeof item === 'object' &&
                  item !== null &&
                  !Array.isArray(item) &&
                  'name' in item &&
                  typeof item.name === 'string'
                  ? item.name
                  : isHorizontal
                    ? yDomain[index]
                    : xAxis?.data?.[index] || '';
              const itemValue = resolveTooltipValue(item);

              const params = {
                type: EVENT_TYPE_SHOW_TIP,
                componentType: 'series',
                seriesType: 'bar',
                seriesIndex,
                seriesName: seriesName,
                name: itemName,
                dataIndex: index,
                data: item,
                value: itemValue,
                color: typeof barColor === 'string' ? barColor : undefined,
                marker:
                  typeof barColor === 'string'
                    ? this._getTooltipMarker(barColor)
                    : undefined,
              };
              const content = this._generateTooltipContent(params);
              this._tooltip.show(mx, my, content, params, rect.attr('shape'));

              if (axisPointerLine) {
                if (isHorizontal) {
                  axisPointerLine.attr('shape', {
                    x1: plotX,
                    y1: barY + barHeight / 2,
                    x2: plotX + plotWidth,
                    y2: barY + barHeight / 2,
                  });
                } else {
                  axisPointerLine.attr('shape', {
                    x1: barX + barWidth / 2,
                    y1: plotY,
                    x2: barX + barWidth / 2,
                    y2: plotY + plotHeight,
                  });
                }
                axisPointerLine.attr('invisible', false);
              }
            };

            EventHelper.bindHoverEvents(
              rect,
              (evt: any) => {
                applyHoverEmphasis();
                showTooltipAt(evt);
              },
              () => {
                const emphasis = seriesItem.emphasis || {};
                const focus = emphasis.focus;

                if (focus === 'series' || focus === 'self') {
                  restoreAllOpacities();
                } else {
                  rect.attr('style', {
                    opacity: this._baseBarOpacity.get(barKey) ?? 1,
                  });
                  const label = this._activeLabels.get(barKey);
                  if (label) {
                    label.attr('style', {
                      opacity: this._baseLabelOpacity.get(barKey) ?? 1,
                    });
                  }
                }
                this._tooltip!.hide();
                if (axisPointerLine) {
                  axisPointerLine.attr('invisible', true);
                }
              },
            );

            rect.on('mousemove', (evt: any) => {
              if (this._tooltip) {
                if (!this._tooltip.isVisible()) {
                  applyHoverEmphasis();
                }
                showTooltipAt(evt);
              }
            });
          }

          if (this._shouldAnimateFor(seriesName) || oldBar) {
            const isUpdate = !!oldBar;
            // If chart has existing bars (update scenario), skip staggered delay to ensure sync
            const hasOldBars = oldBars.size > 0;
            const delay =
              isUpdate || hasOldBars
                ? 0
                : resolveAnimationDelay(seriesItem.animationDelay, index);
            const duration = this._getAnimationDuration(isUpdate);

            // Animate properties
            this._animator
              .animate(rect.attr('shape'), 'height', barHeight, {
                duration,
                delay,
                easing: 'cubicOut',
                onUpdate: () => rect.markRedraw(),
              })
              .start();

            this._animator
              .animate(rect.attr('shape'), 'y', barY, {
                duration,
                delay,
                easing: 'cubicOut',
                onUpdate: () => rect.markRedraw(),
              })
              .start();

            this._animator
              .animate(rect.attr('shape'), 'width', barWidth, {
                duration,
                delay,
                easing: 'cubicOut',
                onUpdate: () => rect.markRedraw(),
              })
              .start();

            this._animator
              .animate(rect.attr('shape'), 'x', barX, {
                duration,
                delay,
                easing: 'cubicOut',
                onUpdate: () => rect.markRedraw(),
              })
              .start();
          } else {
            rect.attr('shape', {
              x: barX,
              y: barY,
              width: barWidth,
              height: barHeight,
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
            const targetX = isPositive ? initialX : initialX + initialW;

            this._animator
              .animate(bar.shape, 'width', 0, {
                duration: 300,
                easing: 'cubicOut',
                onUpdate: () => bar.markRedraw(),
              })
              .start();

            this._animator
              .animate(bar.shape, 'x', targetX, {
                duration: 300,
                easing: 'cubicOut',
                onUpdate: () => bar.markRedraw(),
              })
              .start();
          } else {
            const initialH = bar.shape.height;
            const initialY = bar.shape.y;
            const targetY = isPositive ? initialY + initialH : initialY;

            this._animator
              .animate(bar.shape, 'height', 0, {
                duration: 300,
                easing: 'cubicOut',
                onUpdate: () => bar.markRedraw(),
              })
              .start();

            this._animator
              .animate(bar.shape, 'y', targetY, {
                duration: 300,
                easing: 'cubicOut',
                onUpdate: () => bar.markRedraw(),
              })
              .start();
          }
        }
      });

      oldLabels.forEach((label, key) => {
        if (!this._activeLabels.has(key)) {
          label.z = Z_SERIES + 1;
          this._root.add(label);
          this._animator
            .animate(label.style, 'opacity', 0, {
              duration: 200,
              easing: 'cubicOut',
              onUpdate: () => label.markRedraw(),
            })
            .start();
        }
      });

      this._renderAxes(
        (xAxis || {}) as AxisOption,
        (yAxis || {}) as AxisOption,
        plotX,
        plotY,
        plotWidth,
        plotHeight,
        {
          x: xScale,
          y: yScale,
        },
      );

      this._renderer.flush();
    } catch (e) {
      console.error('[BarChart] Render error:', e);
    }
  }
}
