import Chart from "../Chart";
import {
  createLinearScale,
  createOrdinalScale,
  calculateDomain,
  niceDomain,
} from "../util/coordinate";
import {
  Rect,
  Polygon,
  Group,
  lighten,
  darken,
  createDecalPattern,
  Z_SERIES,
} from "hux-core";
import { EventHelper } from "../util/EventHelper";

export default class StackBar3DChart extends Chart {
  private _activeGroups: Map<string, Group> = new Map();

  protected _render(): void {
    try {
      super._render();

      if (!this._activeGroups) {
        this._activeGroups = new Map();
      }
      const oldGroups = this._activeGroups;
      this._activeGroups = new Map();

      const option = this._option;
      const series = option.series || [];
      if (series.length === 0) return;

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

      // Filter stack bar series
      const barSeries = series.filter(
        (s) => s.type === "stackBar3D" && s.show !== false,
      );
      if (barSeries.length === 0) return;

      // 1. Calculate Data for Domain
      // We need to know x-axis labels/indices first
      let xData: any[] = [];
      if (xAxis?.type === "category") {
        if (xAxis.data) {
          xData = xAxis.data;
        } else {
          // Collect from series
          const categories = new Set<string>();
          barSeries.forEach((s) => {
            (s.data || []).forEach((item: any) => {
              if (typeof item === "object" && item.name)
                categories.add(item.name);
            });
          });
          xData = Array.from(categories);
        }
      } else {
        // Assuming linear x, we collect x values
        const xValues = new Set<number>();
        barSeries.forEach((s) => {
          (s.data || []).forEach((item: any) => {
            // item is [x, y]
            if (Array.isArray(item)) xValues.add(item[0]);
          });
        });
        xData = Array.from(xValues).sort((a, b) => a - b);
      }

      // Map x-value (or index) to stack sum
      const stackSumPos = new Map<string | number, number>();
      const stackSumNeg = new Map<string | number, number>();

      // We need to iterate series to calculate stack sums for domain
      barSeries.forEach((s) => {
        (s.data || []).forEach((item: any, index: number) => {
          let xKey: string | number;
          let yVal: number;

          if (xAxis?.type === "category") {
            xKey = xData[index] ?? index; // Use label or index
            if (typeof item === "object" && item.value !== undefined)
              yVal = item.value;
            else yVal = item;
          } else {
            // X is value
            xKey = item[0];
            yVal = item[1];
          }

          if (yVal >= 0) {
            stackSumPos.set(xKey, (stackSumPos.get(xKey) || 0) + yVal);
          } else {
            stackSumNeg.set(xKey, (stackSumNeg.get(xKey) || 0) + yVal);
          }
        });
      });

      // Calculate Y Domain
      let yMin = 0;
      let yMax = 0;
      for (const val of stackSumPos.values()) yMax = Math.max(yMax, val);
      for (const val of stackSumNeg.values()) yMin = Math.min(yMin, val);

      // If yAxis has min/max set, use them
      const dataMin = yMin;
      const dataMax = yMax;
      if (yAxis?.min !== undefined && yAxis.min !== "dataMin") {
        if (typeof yAxis.min === "function") {
          yMin = yAxis.min({ min: dataMin, max: dataMax });
        } else {
          yMin = yAxis.min;
        }
      }
      if (yAxis?.max !== undefined && yAxis.max !== "dataMax") {
        if (typeof yAxis.max === "function") {
          yMax = yAxis.max({ min: dataMin, max: dataMax });
        } else {
          yMax = yAxis.max;
        }
      }

      const yDomain = niceDomain(yMin, yMax);

      // X Domain
      const xDomain =
        xAxis?.type === "category"
          ? xData
          : [xData[0] || 0, xData[xData.length - 1] || 0];

      // Scales
      const xScale =
        xAxis?.type === "category"
          ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
          : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      // Layout
      const categoryCount = xData.length || 1;
      const categoryWidth = plotWidth / categoryCount;
      const barCategoryGapStr = barSeries[0].barCategoryGap ?? "20%";
      const parsePercent = (val: string | number) => {
        if (typeof val === "string" && val.endsWith("%"))
          return parseFloat(val) / 100;
        return 0;
      };
      const categoryGapPercent = parsePercent(barCategoryGapStr);
      const barWidth = categoryWidth * (1 - categoryGapPercent); // Single bar width (since stacked)

      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight, {
        x: xScale,
        y: yScale,
      });

      // Legend
      if (option.legend?.show !== false) {
        const items = barSeries.map((s, i) => ({
          name: s.name || this.t("series.name", "Series") + "-" + (i + 1),
          color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
          icon: option.legend?.icon || "rect",
          textColor: this.getThemeConfig().legendTextColor,
          data: s,
        }));
        this._mountLegend(items);
      }

      // 3D params
      const depth = 10;
      const angle = Math.PI / 4;
      const shiftX = depth * Math.cos(angle);
      const shiftY = -depth * Math.sin(angle);

      // Current stack height map for rendering
      const currentStackPos = new Map<string | number, number>();
      const currentStackNeg = new Map<string | number, number>();

      barSeries.forEach((seriesItem, seriesIndex) => {
        const seriesName =
          seriesItem.name ||
          this.t("series.name", "Series") + "-" + (seriesIndex + 1);
        if (this._legend && !this._legendSelected.has(seriesName)) return;

        const seriesData = seriesItem.data || [];
        const barColor =
          seriesItem.itemStyle?.color ||
          seriesItem.color ||
          this._getSeriesColor(seriesIndex);

        // Handle aria decal
        let fillStyle: string | CanvasPattern = barColor;
        const aria = option.aria;
        if (aria?.enabled && aria?.decal?.show) {
          const decals = aria.decal.decals || [];
          const decal = decals[seriesIndex % decals.length] || {
            symbol: "rect",
          };
          const pattern = createDecalPattern(decal, barColor);
          if (pattern) {
            fillStyle = pattern;
          }
        }

        const topColor = lighten(barColor, 0.3);
        const sideColor = darken(barColor, 0.2);

        seriesData.forEach((item: any, index: number) => {
          let xKey: string | number;
          let yVal: number;
          let xVal: any;

          if (xAxis?.type === "category") {
            xKey = xData[index] ?? index;
            xVal = xKey;
            if (typeof item === "object" && item.value !== undefined)
              yVal = item.value;
            else yVal = item;
          } else {
            xKey = item[0];
            xVal = xKey;
            yVal = item[1];
          }

          if (yVal === undefined) return;

          const isPositive = yVal >= 0;
          const prevStackVal = isPositive
            ? currentStackPos.get(xKey) || 0
            : currentStackNeg.get(xKey) || 0;
          const newStackVal = prevStackVal + yVal;

          if (isPositive) currentStackPos.set(xKey, newStackVal);
          else currentStackNeg.set(xKey, newStackVal);

          const barXCenter = xScale(xVal);
          const barX = barXCenter - barWidth / 2;

          // Y positions
          // yStart (bottom of this segment) -> corresponding to prevStackVal
          // yEnd (top of this segment) -> corresponding to newStackVal

          const yBottom = yScale(prevStackVal);
          const yTop = yScale(newStackVal);

          const h = Math.abs(yBottom - yTop);
          const y = Math.min(yBottom, yTop); // Top-left Y coordinate

          // Note: if value is negative, yBottom < yTop (since Y goes down, larger value is higher up? No, Y goes down. Larger value is lower pixel.)
          // Scale: 0 -> plotY + plotHeight. Max -> plotY.
          // So Positive: prev=0 (bottom), new=10 (higher). yBottom > yTop.
          // Negative: prev=0 (bottom), new=-10 (lower). yBottom < yTop.

          // Correct rect Y is always the smaller pixel value (top-most pixel).
          // If positive: Rect is from yTop to yBottom.
          // If negative: Rect is from yBottom to yTop.

          const rectY = yTop; // yTop is the pixel for the "top" of the bar (higher value)
          // Wait, if positive, yTop is smaller pixel (higher). Correct.
          // If negative, yTop is larger pixel (lower).
          // Rect y should be yBottom (0) ?

          // Let's stick to: y is top-left.
          // If positive: y = yTop, height = yBottom - yTop.
          // If negative: y = yBottom, height = yTop - yBottom.

          let finalY = isPositive ? yTop : yBottom;

          const barKey = `${seriesIndex}-${index}`;
          const oldGroup = oldGroups.get(barKey);

          const group = new Group({ z: Z_SERIES });

          // Animation? Simplified for now: just draw final state

          // Front
          const front = new Rect({
            shape: {
              x: barX,
              y: finalY,
              width: barWidth,
              height: h,
            },
            style: { fill: fillStyle },
          });

          // Top
          const top = new Polygon({
            shape: {
              points: [
                [barX, finalY],
                [barX + barWidth, finalY],
                [barX + barWidth + shiftX, finalY + shiftY],
                [barX + shiftX, finalY + shiftY],
              ],
            },
            style: { fill: topColor },
          });

          // Side (Right)
          const side = new Polygon({
            shape: {
              points: [
                [barX + barWidth, finalY],
                [barX + barWidth, finalY + h],
                [barX + barWidth + shiftX, finalY + h + shiftY],
                [barX + barWidth + shiftX, finalY + shiftY],
              ],
            },
            style: { fill: sideColor },
          });

          // Order: Side, Top, Front.
          // Note: For stacked, if positive, top bar covers bottom bar's top?
          // No, bottom bar is below.
          // Top face of bottom bar is at `prevStackVal`.
          // Bottom face of top bar is at `prevStackVal`.
          // They meet.
          // Draw order: bottom to top?
          // Series loop order is usually 0 to N.
          // If stacked positive: 0 is bottom, 1 is on top.
          // If we draw 0, then 1. 1's bottom covers 0's top.
          // So 0's top face is hidden?
          // Yes. But we draw it anyway.

          group.add(side);
          group.add(top);
          group.add(front);

          if (this._tooltip) {
            const handleMouseOver = (evt: any) => {
              group.attr("opacity", 0.8);
              const itemName =
                typeof item === "object" && item.name ? item.name : xKey || "";
              const params = {
                componentType: "series",
                seriesType: "stackBar3D",
                seriesIndex,
                seriesName,
                name: itemName,
                dataIndex: index,
                data: item,
                value: yVal,
                color: typeof barColor === "string" ? barColor : undefined,
                marker:
                  typeof barColor === "string"
                    ? this._getTooltipMarker(barColor)
                    : undefined,
              };
              const content = this._generateTooltipContent(params);
              const mx = evt?.offsetX ?? barX + barWidth / 2;
              const my = evt?.offsetY ?? finalY;

              // StackBar3D height is tricky, let's estimate
              const targetRect = {
                x: barX,
                y: finalY, // finalY is the top of the bar segment?
                width: barWidth,
                height: Math.abs(yVal), // Approximate
              };

              this._tooltip!.show(mx, my, content, params, targetRect);
            };

            const handleMouseOut = () => {
              group.attr("opacity", 1);
              this._tooltip!.hide();
            };

            EventHelper.bindHoverEvents(front, handleMouseOver, handleMouseOut);
            EventHelper.bindHoverEvents(top, handleMouseOver, handleMouseOut);
            EventHelper.bindHoverEvents(side, handleMouseOver, handleMouseOut);
          }

          this._root.add(group);
          this._activeGroups.set(barKey, group);

          // Original Group binding removed
        });
      });

      this._renderer.flush();
    } catch (e) {
      console.error(e);
    }
  }
}
