import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain } from '../util/coordinate';
import { Rect, Polygon, Group, lighten, darken, createDecalPattern, Z_SERIES } from 'HudX/core';
import { EventHelper } from '../util/EventHelper';

export default class Bar3DChart extends Chart {
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

      const { x: plotX, y: plotY, width: plotWidth, height: plotHeight } = this._calculateGrid(option);

      const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
      const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;

      let data: any[] = [];
      series.forEach(s => {
        if (s.type === 'bar3D' && s.show !== false) {
          data = data.concat(s.data || []);
        }
      });

      if (data.length === 0) return;

      const xDomain = calculateDomain(xAxis || {}, data, true);
      const yDomain = calculateDomain(yAxis || {}, data, false);

      const xScale = xAxis?.type === 'category'
        ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
        : createLinearScale(xDomain, [plotX, plotX + plotWidth]);

      const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);

      const barSeries = series.filter(s => s.type === 'bar3D' && s.show !== false);
      const seriesCount = barSeries.length || 1;

      // Layout calculation (simplified from BarChart)
      let categoryCount: number;
      if (xAxis?.type === 'category') {
        categoryCount = (Array.isArray(xAxis?.data) ? xAxis.data.length : xDomain.length);
      } else {
        categoryCount = data.length;
      }

      const categoryWidth = categoryCount > 0 ? (plotWidth / categoryCount) : plotWidth;

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

      if (typeof barGapStr === 'string' && barGapStr.endsWith('%')) {
        const gapPercent = parsePercent(barGapStr);
        barWidthPerSeries = availableWidth / (seriesCount + (seriesCount - 1) * gapPercent);
        gapWidth = barWidthPerSeries * gapPercent;
      } else {
        gapWidth = parseFloat(String(barGapStr));
        if (isNaN(gapWidth)) gapWidth = 0;
        const totalGapWidth = (seriesCount - 1) * gapWidth;
        barWidthPerSeries = (availableWidth - totalGapWidth) / seriesCount;
      }

      const groupInnerWidth = seriesCount * barWidthPerSeries + (seriesCount - 1) * gapWidth;

      this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);

      // Legend
      if (option.legend?.show !== false) {
        const items = (series as any[])
          .filter(s => s.type === 'bar3D' && s.show !== false)
          .map((s, i) => ({
            name: s.name || this.t('series.name', 'Series') + '-' + (i + 1),
            color: s.itemStyle?.color || s.color || this._getSeriesColor(i),
            icon: option.legend?.icon || 'rect',
            textColor: this.getThemeConfig().legendTextColor,
            data: s
          }));
        this._mountLegend(items);
      }

      // 3D parameters
      const depth = 10;
      const angle = Math.PI / 4;
      const shiftX = depth * Math.cos(angle);
      const shiftY = -depth * Math.sin(angle);

      series.forEach((seriesItem, seriesIndex) => {
        if (seriesItem.type !== 'bar3D') return;
        if (seriesItem.show === false) return;

        const seriesName = seriesItem.name || this.t('series.name', 'Series') + '-' + (seriesIndex + 1);
        if (this._legend && !this._legendSelected.has(seriesName)) return;

        const seriesData = seriesItem.data || [];
        const seriesIndexInBars = barSeries.indexOf(seriesItem);
        const barColor = seriesItem.itemStyle?.color || seriesItem.color || this._getSeriesColor(seriesIndex);

        // Handle aria decal
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

        // Calculate colors for faces
        const topColor = lighten(barColor, 0.3);
        const sideColor = darken(barColor, 0.2);

        seriesData.forEach((item: any, index: number) => {
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

          if (xVal === undefined || yVal === undefined) return;

          const groupCenter = xScale(xVal);
          const groupStart = groupCenter - groupInnerWidth / 2;
          const barX = groupStart + seriesIndexInBars * (barWidthPerSeries + gapWidth);
          const barY = yScale(yVal);
          const barHeight = plotY + plotHeight - barY;

          const barKey = `${seriesIndex}-${index}`;
          const oldGroup = oldGroups.get(barKey);

          // Initial state for animation
          let initialHeight = 0;
          if (oldGroup) {
            // Retrieve previous height if possible, or just start from 0
            // Assuming we store height in some way or just use 0 for simplicity if complex
            initialHeight = (oldGroup as any).__currentHeight || 0;
          }

          const group = new Group({ z: Z_SERIES });

          // Helper to create shapes based on height
          const createShapes = (h: number) => {
            const currentY = plotY + plotHeight - h;

            // Front face
            const front = new Rect({
              shape: {
                x: barX,
                y: currentY,
                width: barWidthPerSeries,
                height: h
              },
              style: { fill: fillStyle },
              cursor: this._tooltip ? 'pointer' : 'default'
            });

            // Top face
            const top = new Polygon({
              shape: {
                points: [
                  [barX, currentY],
                  [barX + barWidthPerSeries, currentY],
                  [barX + barWidthPerSeries + shiftX, currentY + shiftY],
                  [barX + shiftX, currentY + shiftY]
                ]
              },
              style: { fill: topColor },
              cursor: this._tooltip ? 'pointer' : 'default'
            });

            // Side face
            const side = new Polygon({
              shape: {
                points: [
                  [barX + barWidthPerSeries, currentY],
                  [barX + barWidthPerSeries, currentY + h],
                  [barX + barWidthPerSeries + shiftX, currentY + h + shiftY],
                  [barX + barWidthPerSeries + shiftX, currentY + shiftY]
                ]
              },
              style: { fill: sideColor },
              cursor: this._tooltip ? 'pointer' : 'default'
            });

            // Bind hover events to shapes since Group bubbling might be issue
            if (this._tooltip) {
              const handleMouseOver = (evt: any) => {
                group.attr('opacity', 0.8);
                const itemName = (typeof item === 'object' && item.name) ? item.name : (xAxis?.data?.[index] || '');
                const params = {
                  componentType: 'series',
                  seriesType: 'bar3D',
                  seriesIndex,
                  seriesName,
                  name: itemName,
                  dataIndex: index,
                  data: item,
                  value: yVal
                };
                const content = this._generateTooltipContent(params);

                const mx = evt?.offsetX ?? (barX + barWidthPerSeries / 2);
                const my = evt?.offsetY ?? (barY - 10);

                const targetRect = {
                  x: barX,
                  y: plotY + plotHeight - barHeight,
                  width: barWidthPerSeries,
                  height: barHeight
                };

                this._tooltip!.show(mx, my, content, params, targetRect);
              };

              const handleMouseOut = () => {
                group.attr('opacity', 1);
                this._tooltip!.hide();
              };

              EventHelper.bindHoverEvents(front, handleMouseOver, handleMouseOut);
              EventHelper.bindHoverEvents(top, handleMouseOver, handleMouseOut);
              EventHelper.bindHoverEvents(side, handleMouseOver, handleMouseOut);
            }

            return [side, top, front]; // Order: Side (back), Top, Front
          };

          // Animation logic
          const animateHeight = (targetHeight: number) => {
            if (this._shouldAnimateFor(seriesName) || oldGroup) {
              const isUpdate = !!oldGroup;
              const delay = isUpdate ? 0 : (index * 100 + seriesIndex * 200);
              const duration = this._getAnimationDuration(isUpdate);

              const animatorObj = { height: initialHeight };

              this._animator.animate(
                animatorObj,
                'height',
                targetHeight,
                {
                  duration,
                  delay,
                  easing: 'cubicOut',
                  onUpdate: (target: any, percent: number) => {
                    const h = target.height;
                    (group as any).__currentHeight = h;
                    group.removeAll();
                    const shapes = createShapes(h);
                    shapes.forEach(s => group.add(s));
                  }
                }
              );
            } else {
              (group as any).__currentHeight = targetHeight;
              const shapes = createShapes(targetHeight);
              shapes.forEach(s => group.add(s));
            }
          };

          animateHeight(barHeight);

          this._root.add(group);
          this._activeGroups.set(barKey, group);

          // Original Group binding removed as we bind to children now
        });
      });

      this._renderer.flush();
    } catch (e) {
      console.error(e);
    }
  }

  // Helper for internal use if needed
  // private _getDataValue(item: any): any {
  //    if (typeof item === 'object' && item !== null && item.value !== undefined) {
  //       return item.value;
  //    }
  //    return item;
  // }
}
