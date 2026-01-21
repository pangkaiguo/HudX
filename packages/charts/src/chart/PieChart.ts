import { Chart, Animator } from 'hudx-render';
import type { SeriesOption, ChartData, EmphasisOption, RenderMode } from 'hudx-render';
import { resolveAnimationDelay } from './chartUtils';
import {
  Sector,
  Rect,
  Text,
  Polyline,
  createDecalPattern,
  Z_SERIES,
  Z_LABEL,
  EventHelper,
} from 'hudx-render';

interface PieSector extends Sector {
  __baseR?: number;
  __initialStyle?: Record<string, any>;
  __seriesItem?: SeriesOption;
  __label?: Text;
  __labelLine?: Polyline;
  __targetShape?: {
    startAngle: number;
    endAngle: number;
    r: number;
    r0: number;
  };
  __hoverOpacityOverride?: number;
}

/**
 * PieChart - Pie chart implementation
 *
 * Algorithm: Polar Coordinate Layout
 *
 * Description:
 * Converts data values to angles (radians).
 * - Accumulates angles to determine start/end angles for each sector.
 * - Handles "Rose Type" (Nightingale Chart) by mapping values to radius instead of (or in addition to) angle.
 * - Implements sector interaction (scale on hover) and label positioning.
 */
// TODO: Define a proper interface for the extended Sector to avoid 'any' casting throughout the file.
// Currently relying on monkey-patching properties like __initialStyle, __label, etc.

export default class PieChart extends Chart {
  private _activeSectors: Map<string, PieSector> = new Map();
  private _centerLabel: Text | null = null;
  private _restoreTimeout: any = null;
  private _prevRoseType: boolean | string = false;
  private _hoverAnimator: Animator = new Animator();
  private _hoveredSectorName: string | null = null;

  setRenderMode(renderMode: RenderMode): void {
    if (this.getRenderMode() === renderMode) {
      return;
    }
    this._activeSectors = new Map();
    this._hoveredSectorName = null;
    this._hoverAnimator.stopAll();
    if (this._restoreTimeout) {
      clearTimeout(this._restoreTimeout);
      this._restoreTimeout = null;
    }
    super.setRenderMode(renderMode);
  }

  protected _render(): void {
    try {
      const oldSectors = this._resetChartState();

      const { seriesItem, data } = this._getValidSeriesAndData();
      if (!seriesItem || !data) return;

      const bounds = this._getPieBounds();
      this._renderGridBackground(bounds);

      const total = this._calculateTotal(data);

      this._renderLegendIfNeeded(data, seriesItem, total);

      if (total === 0) return;

      const { cx, cy, r0, r } = this._getGeometry(seriesItem);
      const { startAngle, endAngle } = this._computeGlobalAngles(seriesItem);
      const totalAngle = endAngle - startAngle;
      const maxValue = this._getMaxValueForRoseType(seriesItem, data);

      // Check if we switched to Rose Type
      const currentRoseType = seriesItem.roseType;
      // const isSwitchingToRose = !!currentRoseType && !this._prevRoseType;
      this._prevRoseType = currentRoseType || false;

      // Always try to reuse old sectors for smooth transition
      const sectorsToUse = oldSectors;

      const labelLayoutList = this._createSectorsAndPrepareLabels({
        data,
        seriesItem,
        total,
        totalAngle,
        startAngle,
        cx,
        cy,
        r,
        r0,
        maxValue,
        oldSectors: sectorsToUse,
      });

      this._renderStaticCenterLabel(seriesItem, cx, cy, r0, total);
      this._layoutLabels(labelLayoutList, cx, cy, r, r0);

      this._renderer.flush();
    } catch (e) {
      console.error('[PieChart] Render error:', e);
    }
  }

  // --- Render Helpers ---

  private _resetChartState(): Map<string, PieSector> {
    if (this._legend) {
      this._root.remove(this._legend);
    }
    if (this._centerLabel) {
      this._root.remove(this._centerLabel);
      this._centerLabel = null;
    }

    const oldSectors = this._forceReinitOnNextRender
      ? new Map()
      : this._activeSectors || new Map();
    this._activeSectors = new Map();
    this._root.removeAll();
    this._mountTitle();

    return oldSectors;
  }

  private _getValidSeriesAndData() {
    const option = this._option;
    const series = option.series || [];
    if (series.length === 0) return { seriesItem: null, data: null };

    const seriesItem = series[0];
    if (
      !seriesItem.type ||
      !['pie', 'doughnut', 'half-doughnut'].includes(seriesItem.type)
    ) {
      return { seriesItem: null, data: null };
    }

    const data = seriesItem.data || [];
    if (data.length === 0) return { seriesItem: null, data: null };

    return { seriesItem, data: data as any[] };
  }

  private _getGeometry(seriesItem: SeriesOption) {
    const center = this._getCenter(seriesItem);
    const [r0, r] = this._getRadius(seriesItem);
    return { cx: center[0], cy: center[1], r0, r };
  }

  private _renderLegendIfNeeded(
    data: any[],
    seriesItem: any,
    total: number,
  ): void {
    if (this._option.legend?.show === false) return;

    const aria = this._option.aria;
    const ariaDecals =
      aria?.enabled && aria?.decal?.show ? aria.decal.decals || [] : [];

    // TODO: Extract Legend item creation logic to a separate mapper
    const items = data.map((it: any, i: number) => {
      let value = 0;
      if (typeof it === 'number') value = it;
      else if (Array.isArray(it)) value = it[0] || 0;
      else if (typeof it === 'object' && it !== null) value = it.value;

      const percent = total > 0 ? value / total : 0;

      return {
        name: typeof it === 'object' && it.name ? it.name : `item-${i + 1}`,
        color:
          (typeof it === 'object' && it.itemStyle?.color) ||
          seriesItem.itemStyle?.color ||
          this._getSeriesColor(i),
        icon: this._option.legend?.icon || 'circle',
        textColor: this.getThemeConfig().legendTextColor,
        value,
        percent,
        data: it,
        decal:
          (typeof it === 'object' && it.itemStyle?.decal) ||
          seriesItem.itemStyle?.decal ||
          (ariaDecals.length
            ? ariaDecals[i % ariaDecals.length] || { symbol: 'circle' }
            : undefined),
      };
    });

    this._mountLegend(items);
  }

  // --- Helper to get icon shape from Legend style ---
  private _getIconShape(type: string | undefined): string {
    if (type === 'rect') return 'border-radius:2px;';
    if (type === 'circle') return 'border-radius:50%;';
    if (type === 'line') return 'height:2px;margin-top:4px;';
    return 'border-radius:50%;';
  }

  protected _getTooltipMarker(color: string): string {
    const legendIcon = this._option.legend?.icon || 'circle';
    let borderRadius = '50%'; // Default circle
    let sizeStyle = 'width:12px;height:12px;';

    if (legendIcon === 'rect') {
      borderRadius = '2px';
    } else if (legendIcon === 'line') {
      borderRadius = '0';
      sizeStyle = 'width:12px;height:2px;margin-top:4px;';
    }

    return `<span style="display:inline-block;margin-right:8px;${sizeStyle}border-radius:${borderRadius};background-color:${color};"></span>`;
  }

  private _getMaxValueForRoseType(seriesItem: any, data: any[]): number {
    if (!seriesItem.roseType) return 0;
    return data.reduce((max: number, item: any) => {
      let v = 0;
      if (typeof item === 'number') v = item;
      else if (Array.isArray(item)) v = item[0] || 0;
      else if (typeof item === 'object' && item !== null) v = item.value;
      return Math.max(max, v);
    }, 0);
  }

  private _computeGlobalAngles(seriesItem: any) {
    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    let startAngle: number;

    if (seriesItem.startAngle !== undefined) {
      startAngle = degToRad(seriesItem.startAngle);
    } else if (seriesItem.type === 'half-doughnut') {
      startAngle = -Math.PI;
    } else {
      startAngle = -Math.PI / 2;
    }

    let endAngle: number;
    if (seriesItem.endAngle !== undefined) {
      endAngle = degToRad(seriesItem.endAngle);
    } else if (seriesItem.type === 'half-doughnut') {
      endAngle = 0;
    } else {
      endAngle = startAngle + Math.PI * 2;
    }

    return { startAngle, endAngle };
  }

  private _createSectorsAndPrepareLabels(params: {
    data: any[];
    seriesItem: any;
    total: number;
    totalAngle: number;
    startAngle: number;
    cx: number;
    cy: number;
    r: number;
    r0: number;
    maxValue: number;
    oldSectors: Map<string, PieSector>;
  }): any[] {
    const {
      data,
      seriesItem,
      total,
      totalAngle,
      startAngle,
      cx,
      cy,
      r,
      r0,
      maxValue,
      oldSectors,
    } = params;
    const labelLayoutList: any[] = [];

    // Pre-calculate angles to handle minAngle
    const count = data.length;
    const angles: number[] = new Array(count).fill(0);
    const itemRs: number[] = new Array(count).fill(r);

    // 1. Calculate raw angles and radius
    data.forEach((item: ChartData, index: number) => {
      const value = this._getDataValue(item);
      if (typeof value !== 'number') return;

      const percent = total > 0 ? value / total : 0;
      const { angle, itemR } = this._calculateSectorGeometry(
        seriesItem,
        value,
        percent,
        totalAngle,
        count,
        r,
        r0,
        maxValue,
      );
      angles[index] = angle;
      itemRs[index] = itemR;
    });

    // 2. Apply minAngle (only for non-roseType)
    if (!seriesItem.roseType && seriesItem.minAngle) {
      const minAngleRad = (seriesItem.minAngle * Math.PI) / 180;
      let angleSum = 0;
      let restAngle = totalAngle;
      let restCount = count;

      // First pass: identify sectors needing minAngle
      const needsFix: number[] = [];
      angles.forEach((a, i) => {
        if (a < minAngleRad) {
          needsFix.push(i);
          restAngle -= minAngleRad;
          restCount--;
        } else {
          angleSum += a;
        }
      });

      if (restAngle < 0) {
        const scale = totalAngle / (needsFix.length * minAngleRad + angleSum);
      } else {
        needsFix.forEach(i => {
          angles[i] = minAngleRad;
        });
        if (angleSum > 0) {
          const scale = restAngle / angleSum;
          angles.forEach((a, i) => {
            if (!needsFix.includes(i)) {
              angles[i] *= scale;
            }
          });
        }
      }
    }

    let currentAngle = startAngle;
    const clockwise = seriesItem.clockwise !== false;

    data.forEach((item: ChartData, index: number) => {
      const value = this._getDataValue(item);
      if (typeof value !== 'number') return;

      const angle = angles[index];
      const itemR = itemRs[index];
      const percent = total > 0 ? value / total : 0;

      let itemName = `item-${index + 1}`;
      if (
        typeof item === 'object' &&
        item !== null &&
        !Array.isArray(item) &&
        item.name
      ) {
        itemName = item.name;
      }

      // Skip if filtered by legend
      if (this._legend && !this._legendSelected.has(itemName)) {
        return;
      }

      let targetStart: number;
      let targetEnd: number;

      if (clockwise) {
        targetStart = currentAngle;
        targetEnd = currentAngle + angle;
        currentAngle += angle;
      } else {
        targetStart = currentAngle;
        targetEnd = currentAngle - angle;
        currentAngle -= angle;
      }

      // Animation Logic
      let initialStart = targetStart;
      let initialEnd = targetStart;
      let initialR = itemR;
      let initialR0 = r0;

      const oldSector = oldSectors.get(itemName);
      if (oldSector) {
        initialStart = oldSector.shape.startAngle;
        initialEnd = oldSector.shape.endAngle;
        // Also animate radius if roseType changes
        initialR = oldSector.shape.r;
        initialR0 = oldSector.shape.r0;
      }

      const realAngle = targetEnd - targetStart;

      const sector = this._createSector({
        item,
        index,
        itemName,
        seriesItem,
        cx,
        cy,
        itemR,
        r0,
        currentAngle: initialStart,
        angle: initialEnd - initialStart,
        clockwise,
        anticlockwise: realAngle < 0,
      });
      sector.__targetShape = {
        startAngle: targetStart,
        endAngle: targetEnd,
        r: itemR,
        r0,
      };

      // Override radius for initial state if animating
      if (oldSector) {
        sector.shape.r = initialR;
        sector.shape.r0 = initialR0;
      } else {
        if (seriesItem.roseType) {
          sector.shape.r = r0; // Start from inner radius
        }
      }

      this._root.add(sector);
      this._activeSectors.set(itemName, sector);

      // Animate
      const shouldAnimate = this._shouldAnimateFor(itemName);
      if (shouldAnimate) {
        const delay = oldSector ? 0 : resolveAnimationDelay(seriesItem.animationDelay, index);
        const duration = seriesItem.animationDuration || 500;
        const easing = seriesItem.animationEasing || 'cubicOut';

        // Check if angles need animation
        if (
          Math.abs(initialStart - targetStart) > 0.001 ||
          Math.abs(initialEnd - targetEnd) > 0.001
        ) {
          this._animator
            .animate(sector.shape, 'startAngle', targetStart, {
              duration,
              delay,
              easing,
              onUpdate: () => {
                sector.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
          this._animator
            .animate(sector.shape, 'endAngle', targetEnd, {
              duration,
              delay,
              easing,
              onUpdate: () => {
                sector.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
        } else {
          sector.shape.startAngle = targetStart;
          sector.shape.endAngle = targetEnd;
        }

        // Check if radius needs animation (Rose Chart or Resize)
        if (seriesItem.roseType || Math.abs(initialR - itemR) > 0.1) {
          this._animator
            .animate(sector.shape, 'r', itemR, {
              duration,
              delay,
              easing,
              onUpdate: () => {
                sector.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
        }

        // Check if inner radius needs animation
        if (Math.abs(sector.shape.r0 - r0) > 0.1) {
          this._animator
            .animate(sector.shape, 'r0', r0, {
              duration,
              delay,
              easing,
              onUpdate: () => {
                sector.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
        }
      } else {
        sector.shape.startAngle = targetStart;
        sector.shape.endAngle = targetEnd;
        sector.shape.anticlockwise = targetEnd - targetStart < 0;
        sector.shape.r = itemR;
        sector.shape.r0 = r0;
      }

      // Bind Events
      const handlers = this._bindSectorEvents(
        sector,
        seriesItem,
        item,
        index,
        value,
        percent,
        cx,
        cy,
        r,
        r0,
        total,
      );

      // Prepare Label
      const labelConfig = this._prepareLabelConfig({
        seriesItem,
        item,
        value,
        percent,
        currentAngle: targetStart,
        angle: targetEnd - targetStart,
        sector,
        handlers,
        color: sector.style.fill as string,
      });

      if (labelConfig) {
        // Fix: Initially hide label if entry animation is active
        if (shouldAnimate && !oldSector && labelConfig.isVisible) {
          labelConfig.isVisible = false;
          labelConfig.opacity = 0;
          labelConfig.fadeIn = true;
        }
        labelLayoutList.push(labelConfig);
      }
    });

    return labelLayoutList;
  }

  private _calculateSectorGeometry(
    seriesItem: any,
    value: number,
    percent: number,
    totalAngle: number,
    dataLength: number,
    r: number,
    r0: number,
    maxValue: number,
  ) {
    let angle: number;
    let itemR = r;

    if (seriesItem.roseType) {
      angle = totalAngle / dataLength;
      if (maxValue > 0) {
        if (seriesItem.roseType === 'area') {
          itemR = r0 + (r - r0) * Math.sqrt(value / maxValue);
        } else {
          itemR = r0 + (r - r0) * (value / maxValue);
        }
      }
    } else {
      angle = percent * totalAngle;
    }
    return { angle, itemR };
  }

  private _createSector(params: {
    item: any;
    index: number;
    itemName: string;
    seriesItem: any;
    cx: number;
    cy: number;
    itemR: number;
    r0: number;
    currentAngle: number;
    angle: number;
    clockwise?: boolean;
    anticlockwise?: boolean;
  }): PieSector {
    const {
      item,
      index,
      itemName,
      seriesItem,
      cx,
      cy,
      itemR,
      r0,
      currentAngle,
      angle,
      clockwise,
      anticlockwise,
    } = params;

    const itemStyle = seriesItem.itemStyle || {};
    let color: string;
    if (
      typeof item === 'object' &&
      item !== null &&
      !Array.isArray(item) &&
      item.itemStyle?.color
    ) {
      color = item.itemStyle.color;
    } else {
      color = itemStyle.color || this._getSeriesColor(index);
    }

    let fillStyle: string | CanvasPattern = color;
    const aria = this._option.aria;
    if (aria?.enabled && aria?.decal?.show) {
      const decals = aria.decal.decals || [];
      const decal = decals[index % decals.length] || { symbol: 'circle' };
      const pattern = createDecalPattern(decal, color);
      if (pattern) {
        fillStyle = pattern;
      }
    }

    const sector = new Sector({
      name: itemName,
      data: item,
      dataIndex: index,
      shape: {
        cx,
        cy,
        r: itemR,
        r0,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        anticlockwise: anticlockwise,
      },
      style: {
        fill: fillStyle,
        stroke:
          seriesItem.itemStyle?.borderColor || this.getThemeConfig().backgroundColor,
        lineWidth: seriesItem.itemStyle?.borderWidth ?? 0,
      },
      transform: {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        originX: cx,
        originY: cy,
      },
      z: Z_SERIES,
      cursor: this._tooltip || seriesItem.emphasis ? 'pointer' : 'default',
    }) as PieSector;

    // TODO: Replace these monkey-patched properties with a proper storage or extended class
    sector.__baseR = itemR;
    sector.__initialStyle = { ...sector.style };
    sector.__seriesItem = seriesItem;

    return sector;
  }

  private _bindSectorEvents(
    sector: PieSector,
    seriesItem: any,
    item: any,
    index: number,
    value: number,
    percent: number,
    cx: number,
    cy: number,
    r: number,
    r0: number,
    total: number,
  ) {
    if (!this._tooltip && !seriesItem.emphasis) return undefined;

    const emphasis = seriesItem.emphasis;
    const itemName =
      typeof item === 'object' && item !== null && !Array.isArray(item) && item.name
        ? String(item.name)
        : `item-${index + 1}`;

    const onMouseOver = (evt: any) => {
      if (this._restoreTimeout) {
        clearTimeout(this._restoreTimeout);
        this._restoreTimeout = null;
      }

      if (this._hoveredSectorName !== itemName) {
        this._hoveredSectorName = itemName;
        this._hoverAnimator.stopAll();
        this._applyEmphasisAnimation(sector, emphasis, true);
      }

      if (this._tooltip) {
        const params = this._createTooltipParams(
          seriesItem,
          item,
          index,
          value,
          percent,
          sector.style.fill as string,
        );
        const content = this._generateTooltipContent(params);
        const mx = evt?.offsetX ?? cx;
        const my = evt?.offsetY ?? cy;
        this._tooltip.show(mx, my, content, params);
      }

      const seriesType = seriesItem.type || 'pie';
      if (['doughnut', 'half-doughnut'].includes(seriesType) && r0 > 0) {
        this._showDynamicCenterLabel(
          seriesItem,
          item,
          value,
          percent,
          cx,
          cy,
          emphasis,
        );
      }
    };

    const onMouseOut = () => {
      if (this._hoveredSectorName === itemName) {
        this._hoveredSectorName = null;
      }
      if (this._restoreTimeout) {
        clearTimeout(this._restoreTimeout);
      }
      this._restoreTimeout = setTimeout(() => {
        if (this._hoveredSectorName !== null) {
          return;
        }

        this._hoverAnimator.stopAll();
        this._applyEmphasisAnimation(sector, emphasis, false);

        if (this._tooltip) {
          this._tooltip.hide();
        }

        if (this._centerLabel) {
          this._root.remove(this._centerLabel);
          this._centerLabel = null;
        }

        this._renderStaticCenterLabel(seriesItem, cx, cy, r0, total);
        this._restoreTimeout = null;
      }, 80);
    };

    EventHelper.bindHoverEvents(sector, onMouseOver, onMouseOut);

    let rafId: number | null = null;
    sector.on('mousemove', (evt: any) => {
      // Throttle tooltip updates to prevent flickering and performance issues
      if (rafId) {
        return;
      }

      const mx = evt?.offsetX ?? cx;
      const my = evt?.offsetY ?? cy;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const currentEnd = sector.shape.endAngle;
        const partPercent =
          ((currentEnd - sector.shape.startAngle) / (Math.PI * 2)) * 100;

        const params = this._createTooltipParams(
          seriesItem,
          item,
          index,
          value,
          partPercent / 100,
          sector.style.fill as string,
        );
        const content = this._generateTooltipContent(params);

        const label = sector.__label;
        const showOnHover = seriesItem?.label?.showOnHover;
        const needsEmphasis =
          showOnHover &&
          label &&
          (label.invisible || (label.style.opacity as number) < 1);

        if (this._tooltip) {
          if (!this._tooltip.isVisible() || needsEmphasis) {
            if (this._hoveredSectorName !== itemName) {
              if (this._restoreTimeout) {
                clearTimeout(this._restoreTimeout);
                this._restoreTimeout = null;
              }
              this._hoveredSectorName = itemName;
              this._hoverAnimator.stopAll();
              this._applyEmphasisAnimation(sector, emphasis, true);
            }
          }
          this._tooltip.show(mx, my, content, params);
        } else if (needsEmphasis) {
          if (this._hoveredSectorName !== itemName) {
            if (this._restoreTimeout) {
              clearTimeout(this._restoreTimeout);
              this._restoreTimeout = null;
            }
            this._hoveredSectorName = itemName;
            this._hoverAnimator.stopAll();
            this._applyEmphasisAnimation(sector, emphasis, true);
          }
        }
      });
    });

    return { onMouseOver, onMouseOut };
  }

  private _prepareLabelConfig(params: {
    seriesItem: any;
    item: any;
    value: number;
    percent: number;
    currentAngle: number;
    angle: number;
    sector: PieSector;
    handlers: any;
    color: string;
  }) {
    const {
      seriesItem,
      item,
      value,
      percent,
      currentAngle,
      angle,
      sector,
      handlers,
      color,
    } = params;

    const showOnHover = seriesItem.label?.showOnHover;
    const shouldCreate =
      seriesItem.label?.show !== false ||
      seriesItem.emphasis?.label?.show === true ||
      showOnHover === true;

    if (!shouldCreate) return null;

    const labelAngle = currentAngle + angle / 2;
    const isOutside =
      seriesItem.label?.position === 'outside' ||
      seriesItem.label?.position === undefined;

    let labelText: string;
    const formatter = seriesItem.label?.formatter;
    if (formatter) {
      labelText = this._formatLabel(formatter, {
        name: (item as any).name || '',
        value,
        percent: (percent * 100).toFixed(0),
        data: item,
      });
    } else {
      labelText = (item as any).name || '';
    }

    const isVisible = seriesItem.label?.show !== false && !showOnHover;

    return {
      text: labelText,
      angle: labelAngle,
      sector,
      isOutside,
      item,
      color:
        seriesItem.label?.color ||
        (isOutside
          ? this.getThemeConfig().textColor
          : (((this.getThemeConfig().token as any).colorTextOnSeries as string) ||
            this.getThemeConfig().tooltipTextColor)),
      itemColor: color,
      seriesItem,
      handlers,
      isVisible,
      opacity: isVisible ? 1 : 0,
      fadeIn: false,
    };
  }

  // --- Logic Helpers ---

  protected _getDataValue(item: ChartData): number {
    if (typeof item === 'number') return item;
    if (Array.isArray(item)) return item[0] || 0;
    if (typeof item === 'object' && item !== null) return item.value;
    return 0;
  }

  private _createTooltipParams(
    seriesItem: any,
    item: any,
    index: number,
    value: number,
    percent: number,
    color: string,
  ) {
    let itemName = '';
    if (
      typeof item === 'object' &&
      item !== null &&
      !Array.isArray(item) &&
      item.name
    ) {
      itemName = item.name;
    }
    return {
      type: 'showTip',
      componentType: 'series',
      seriesType: 'pie',
      seriesIndex: 0,
      seriesName: seriesItem.name,
      name: itemName,
      dataIndex: index,
      data: item,
      value: value,
      percent: percent * 100,
      color: color,
      marker: this._getTooltipMarker(color),
    };
  }

  private _calculateTotal(data: any[]): number {
    return data.reduce((sum: number, item: ChartData, index: number) => {
      let itemName = `item-${index + 1}`;
      if (
        typeof item === 'object' &&
        item !== null &&
        !Array.isArray(item) &&
        item.name
      ) {
        itemName = item.name;
      }
      if (this._legend && !this._legendSelected.has(itemName)) {
        return sum;
      }
      const value = this._getDataValue(item);
      return sum + value;
    }, 0);
  }

  // --- Center Label ---

  private _showDynamicCenterLabel(
    seriesItem: any,
    item: any,
    value: number,
    percent: number,
    cx: number,
    cy: number,
    emphasis: any,
  ): void {
    if (this._centerLabel) {
      this._root.remove(this._centerLabel);
    }

    let itemName = '';
    if (
      typeof item === 'object' &&
      item !== null &&
      !Array.isArray(item) &&
      item.name
    ) {
      itemName = item.name;
    }

    let textContent = itemName;
    let rich = emphasis?.label?.rich || seriesItem.label?.rich;
    let style: any = {
      fill:
        emphasis?.label?.color || seriesItem.label?.color || this.getThemeConfig().textColor,
      fontSize: emphasis?.label?.fontSize || 20,
      fontWeight: emphasis?.label?.fontWeight || 'bold',
      textAlign: 'center',
      textBaseline: 'middle',
    };

    if (emphasis?.label) {
      style = { ...style, ...emphasis.label };
    }

    if (!rich) {
      rich = seriesItem.centerLabel?.rich;
    }

    if (emphasis?.label?.formatter) {
      textContent = this._formatLabel(emphasis.label.formatter, {
        name: itemName,
        value,
        percent: percent * 100,
        data: item,
      });
    } else if (seriesItem.centerLabel?.formatter) {
      textContent = this._formatLabel(seriesItem.centerLabel.formatter, {
        name: itemName,
        value,
        percent: percent * 100,
        data: item,
      });
    }

    this._centerLabel = new Text({
      shape: { x: cx, y: cy, text: textContent },
      style: { ...style, rich },
      z: Z_LABEL + 1,
    });
    this._root.add(this._centerLabel);
  }

  private _renderStaticCenterLabel(
    seriesItem: any,
    cx: number,
    cy: number,
    r0: number,
    total: number,
  ): void {
    const centerLabelConfig = seriesItem.centerLabel || {};
    if (centerLabelConfig.show === false || r0 <= 0) return;
    if (this._centerLabel) return;

    let textContent = '';
    let rich = centerLabelConfig.rich || seriesItem.label?.rich;
    const style = {
      fill: seriesItem.label?.color || this.getThemeConfig().textColor,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      textBaseline: 'middle',
      ...centerLabelConfig.style,
    };

    if (centerLabelConfig.type === 'percentage') {
      const data = seriesItem.data || [];
      if (data.length > 0) {
        const firstVal = data[0].value || data[0];
        const percent = ((firstVal / total) * 100).toFixed(0);
        const defaultFormatter = '{d}%';
        const fmt = centerLabelConfig.formatter || defaultFormatter;
        textContent = this._formatLabel(fmt, {
          name: data[0].name || '',
          value: firstVal,
          percent,
          data: data[0],
        });

        if (!centerLabelConfig.style?.backgroundColor) {
          style.backgroundColor = this.getThemeConfig().gridColor;
          style.borderRadius = 20;
          style.padding = [5, 15];
        }
      }
    } else {
      const fmt = centerLabelConfig.formatter;
      if (typeof fmt === 'string') {
        textContent = fmt;
      } else if (typeof fmt === 'function') {
        textContent = fmt({ total });
      }
    }

    if (textContent) {
      this._centerLabel = new Text({
        shape: { x: cx, y: cy, text: textContent },
        style: { ...style, rich },
        z: Z_LABEL,
      });
      this._root.add(this._centerLabel);
    }
  }

  private _formatLabel(
    formatter: string | Function,
    params: {
      name: string;
      value: number;
      percent: string | number;
      data?: any;
    },
  ): string {
    if (typeof formatter === 'function') {
      return formatter(params);
    }
    if (typeof formatter === 'string') {
      let result = formatter
        .replace(/\{b\}/g, params.name)
        .replace(/\{c\}/g, String(params.value))
        .replace(/\{d\}/g, String(params.percent))
        .replace(/\{name\}/g, params.name)
        .replace(/\{value\}/g, String(params.value))
        .replace(/\{percent\}/g, String(params.percent));

      if (params.data && typeof params.data === 'object') {
        Object.keys(params.data).forEach((key) => {
          const val = params.data[key];
          if (typeof val === 'string' || typeof val === 'number') {
            result = result.replace(
              new RegExp(`\\{${key}\\}`, 'g'),
              String(val),
            );
          }
        });
      }
      return result;
    }
    return '';
  }

  // --- Layout & Rendering of Labels ---

  private _layoutLabels(
    labels: any[],
    cx: number,
    cy: number,
    r: number,
    r0: number,
  ): void {
    const leftLabels: any[] = [];
    const rightLabels: any[] = [];

    labels.forEach((label) => {
      const angle = label.angle;
      let normalizedAngle = angle % (Math.PI * 2);
      if (normalizedAngle > Math.PI) normalizedAngle -= Math.PI * 2;
      if (normalizedAngle < -Math.PI) normalizedAngle += Math.PI * 2;

      const isRight =
        normalizedAngle >= -Math.PI / 2 && normalizedAngle <= Math.PI / 2;
      const anchorR = r;
      const anchorX = cx + Math.cos(angle) * anchorR;
      const anchorY = cy + Math.sin(angle) * anchorR;

      label.anchor = { x: anchorX, y: anchorY };
      label.normalizedAngle = normalizedAngle;
      label.isRight = isRight;

      if (label.isOutside) {
        if (isRight) rightLabels.push(label);
        else leftLabels.push(label);
      } else {
        this._renderSingleLabel(label, cx, cy, r, r0);
      }
    });

    rightLabels.sort((a, b) => a.normalizedAngle - b.normalizedAngle);
    rightLabels.sort((a, b) => a.anchor.y - b.anchor.y);
    leftLabels.sort((a, b) => a.anchor.y - b.anchor.y);

    this._adjustLabelPositions(rightLabels, cx, cy, r, 1);
    this._adjustLabelPositions(leftLabels, cx, cy, r, -1);
  }

  private _adjustLabelPositions(
    labels: any[],
    cx: number,
    cy: number,
    r: number,
    dir: 1 | -1,
  ): void {
    if (labels.length === 0) return;

    // TODO: Make these configurable via options
    const labelHeight = 14;
    const minGap = 5;
    const labelLineLen1 = 15;
    const labelLineLen2 = 15;

    labels.forEach((label) => {
      const angle = label.angle;
      const targetR = r + labelLineLen1;
      label.y = cy + Math.sin(angle) * targetR;
      label.x = cx + Math.cos(angle) * targetR;
    });

    // Resolve overlapping
    for (let i = 1; i < labels.length; i++) {
      const prev = labels[i - 1];
      const curr = labels[i];
      if (curr.y - prev.y < labelHeight + minGap) {
        curr.y = prev.y + labelHeight + minGap;
      }
    }

    labels.forEach((label) => {
      const r2 = r + labelLineLen1;
      let dy = label.y - cy;
      if (Math.abs(dy) > r2) dy = (dy > 0 ? 1 : -1) * r2;

      // Calculate elbow point
      let dx = Math.sqrt(Math.abs(r2 * r2 - dy * dy));
      let elbowX = cx + dir * dx;
      const elbowY = label.y;

      const textX = elbowX + dir * labelLineLen2;
      const textY = elbowY;

      const seriesItem = label.seriesItem;
      const rich = seriesItem.label?.rich;

      const text = new Text({
        shape: {
          x: textX + dir * 5,
          y: textY,
          text: label.text,
        },
        style: {
          fontSize: seriesItem.label?.fontSize || 12,
          fontWeight: seriesItem.label?.fontWeight || 'normal',
          fill: label.color,
          textAlign: dir === 1 ? 'left' : 'right',
          textBaseline: 'middle',
          rich: rich,
          backgroundColor: seriesItem.label?.backgroundColor,
          borderColor: seriesItem.label?.borderColor,
          borderWidth: seriesItem.label?.borderWidth,
          borderRadius: seriesItem.label?.borderRadius,
          padding: seriesItem.label?.padding,
          opacity: label.opacity, // Use calculated opacity
        },
        z: Z_LABEL,
        silent: false,
        invisible: !label.isVisible && !label.fadeIn, // Keep visible if fading in
      });
      this._root.add(text);
      (label.sector as PieSector).__label = text;
      (text as any).__initialStyle = {
        ...text.style,
        opacity: label.fadeIn ? 1 : text.style.opacity,
      };

      if (label.fadeIn) {
        // Animate fade in
        this._animator
          .animate(text.style, 'opacity', 1, {
            duration: seriesItem.animationDuration || 500,
            delay: 100, // Small delay to let sector expand a bit
            onUpdate: () => {
              const override = (text as any).__hoverOpacityOverride;
              if (override !== undefined) {
                text.style.opacity = override;
              }
              text.markRedraw();
              this._renderer.refresh();
            },
          })
          .start();
      }

      if (label.handlers) {
        EventHelper.bindHoverEvents(
          text,
          label.handlers.onMouseOver,
          label.handlers.onMouseOut,
        );
      }

      if (seriesItem.labelLine?.show !== false) {
        const linePoints = [
          [label.anchor.x, label.anchor.y],
          [elbowX, elbowY],
          [textX, textY],
        ];
        const line = new Polyline({
          shape: { points: linePoints },
          style: {
            stroke:
              seriesItem.labelLine?.lineStyle?.color ||
              label.itemColor ||
              label.color,
            lineWidth: seriesItem.labelLine?.lineStyle?.width || 1,
            fill: 'none',
            opacity: label.opacity, // Use calculated opacity
          },
          z: Z_LABEL,
          silent: false,
          invisible: !label.isVisible && !label.fadeIn,
        });
        this._root.add(line);
        (label.sector as PieSector).__labelLine = line;
        (line as unknown as { __initialStyle: any }).__initialStyle = {
          ...line.style,
          opacity: label.fadeIn ? 1 : line.style.opacity,
        };

        if (label.fadeIn) {
          this._animator
            .animate(line.style, 'opacity', 1, {
              duration: seriesItem.animationDuration || 500,
              delay: 100,
              onUpdate: () => {
                const override = (line as any).__hoverOpacityOverride;
                if (override !== undefined) {
                  line.style.opacity = override;
                }
                line.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
        }

        if (label.handlers) {
          EventHelper.bindHoverEvents(
            line,
            label.handlers.onMouseOver,
            label.handlers.onMouseOut,
          );
        }
      }
    });
  }

  private _renderSingleLabel(
    label: any,
    cx: number,
    cy: number,
    r: number,
    r0: number,
  ): void {
    const seriesItem = label.seriesItem;
    const isCenter = seriesItem.label?.position === 'center';
    const angle = label.angle;

    let labelX, labelY;
    if (isCenter) {
      labelX = cx;
      labelY = cy;
    } else {
      const finalLabelRadius = (r + r0) / 2;
      labelX = cx + Math.cos(angle) * finalLabelRadius;
      labelY = cy + Math.sin(angle) * finalLabelRadius;
    }

    const showOnHover = seriesItem.label?.showOnHover;
    const isVisible = seriesItem.label?.show !== false && !showOnHover;

    const text = new Text({
      shape: {
        x: labelX,
        y: labelY,
        text: label.text,
      },
      style: {
        fontSize: seriesItem.label?.fontSize || 12,
        fontWeight: seriesItem.label?.fontWeight || 'normal',
        fill: label.color,
        textAlign: 'center',
        textBaseline: 'middle',
        rich: seriesItem.label?.rich,
        opacity: isVisible ? 1 : 0,
      },
      z: Z_LABEL,
      silent: false,
      invisible: !isVisible,
    });
    this._root.add(text);
    (label.sector as PieSector).__label = text;
    (text as any).__initialStyle = { ...text.style };

    if (label.handlers) {
      EventHelper.bindHoverEvents(
        text,
        label.handlers.onMouseOver,
        label.handlers.onMouseOut,
      );
    }
  }

  // --- Geometry Helpers ---

  private _getCenter(seriesItem: SeriesOption): [number, number] {
    const bounds = this._getPieBounds();
    const center = (seriesItem as any).center;
    if (Array.isArray(center)) {
      return [
        typeof center[0] === 'string'
          ? bounds.x + this._parsePercent(center[0], bounds.width)
          : center[0],
        typeof center[1] === 'string'
          ? bounds.y + this._parsePercent(center[1], bounds.height)
          : center[1],
      ];
    }
    return [bounds.x + bounds.width / 2, bounds.y + bounds.height / 2];
  }

  private _getRadius(seriesItem: SeriesOption): [number, number] {
    const radius = (seriesItem as any).radius;
    const bounds = this._getPieBounds();
    const maxRadius = Math.min(bounds.width, bounds.height) / 2;

    if (Array.isArray(radius)) {
      return [
        this._parsePercent(radius[0], maxRadius),
        this._parsePercent(radius[1], maxRadius),
      ];
    }

    if (typeof radius === 'string') {
      const outer = this._parsePercent(radius, maxRadius);
      if (
        seriesItem.type === 'doughnut' ||
        seriesItem.type === 'half-doughnut'
      ) {
        return [outer * 0.5, outer];
      }
      return [0, outer];
    }
    if (typeof radius === 'number') {
      if (
        seriesItem.type === 'doughnut' ||
        seriesItem.type === 'half-doughnut'
      ) {
        return [radius * 0.5, radius];
      }
      return [0, radius];
    }
    if (seriesItem.type === 'doughnut' || seriesItem.type === 'half-doughnut') {
      return [maxRadius * 0.4, maxRadius * 0.8];
    }
    return [0, maxRadius * 0.8];
  }

  private _getPieBounds(): { x: number; y: number; width: number; height: number } {
    const grid = Array.isArray(this._option.grid) ? this._option.grid[0] : this._option.grid;
    if (!grid) {
      return { x: 0, y: 0, width: this._width, height: this._height };
    }

    const parse = (v: any, total: number, defaultVal: number): number => {
      if (v === undefined || v === null) return defaultVal;
      if (typeof v === 'number') return v;
      const str = String(v).trim();
      if (str.endsWith('%')) {
        const p = parseFloat(str);
        return Number.isFinite(p) ? (p / 100) * total : defaultVal;
      }
      const n = parseFloat(str);
      return Number.isFinite(n) ? n : defaultVal;
    };

    const left = parse((grid as any).left, this._width, 0);
    const right = parse((grid as any).right, this._width, 0);
    const top = parse((grid as any).top, this._height, 0);
    const bottom = parse((grid as any).bottom, this._height, 0);

    const width = Math.max(0, this._width - left - right);
    const height = Math.max(0, this._height - top - bottom);
    return { x: left, y: top, width, height };
  }

  private _renderGridBackground(bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): void {
    const grid = Array.isArray(this._option.grid) ? this._option.grid[0] : this._option.grid;
    if (!grid) return;

    const show = (grid as any).show === true;
    const fill =
      (grid as any).backgroundColor !== undefined
        ? (grid as any).backgroundColor
        : 'transparent';
    const stroke =
      (grid as any).borderColor !== undefined
        ? (grid as any).borderColor
        : show
          ? this.getThemeConfig().borderColor
          : 'transparent';
    const lineWidth =
      (grid as any).borderWidth !== undefined ? (grid as any).borderWidth : show ? 1 : 0;

    if (!show && fill === 'transparent' && (stroke === 'transparent' || lineWidth === 0)) {
      return;
    }

    const rect = new Rect({
      shape: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height, r: 0 },
      style: { fill, stroke, lineWidth },
      z: 0,
    });
    this._root.add(rect);
  }

  private _parsePercent(value: string | number, base: number): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string' && value.endsWith('%')) {
      return (parseFloat(value) / 100) * base;
    }
    return parseFloat(value as string) || 0;
  }

  // --- Interaction & Animation ---

  protected _onLegendHover(name: string, hovered: boolean): void {
    const series = this._option.series || [];
    if (series.length === 0) return;
    const seriesItem = series[0];
    const emphasis = seriesItem.emphasis;
    const [r0, r] = this._getRadius(seriesItem);
    const sector = this._activeSectors.get(name);

    if (!sector) return;

    const cx = sector.shape.cx;
    const cy = sector.shape.cy;

    if (hovered) {
      if (this._restoreTimeout) {
        clearTimeout(this._restoreTimeout);
        this._restoreTimeout = null;
      }

      this._hoveredSectorName = name;
      this._hoverAnimator.stopAll();
      this._applyEmphasisAnimation(sector, emphasis, true);

      const seriesType = seriesItem.type || 'pie';
      if (['doughnut', 'half-doughnut'].includes(seriesType) && r0 > 0) {
        const item = (sector as any).data;
        const total = this._calculateTotal(seriesItem.data || []);
        const value = this._getDataValue(item) || 0;
        const percent = total > 0 ? value / total : 0;

        this._showDynamicCenterLabel(
          seriesItem,
          item,
          value,
          percent,
          cx,
          cy,
          emphasis,
        );
      }
    } else {
      if (this._hoveredSectorName === name) {
        this._hoveredSectorName = null;
      }
      this._hoverAnimator.stopAll();
      this._applyEmphasisAnimation(sector, emphasis, false);

      const seriesType = seriesItem.type || 'pie';
      if (['doughnut', 'half-doughnut'].includes(seriesType) && r0 > 0) {
        if (this._restoreTimeout) {
          clearTimeout(this._restoreTimeout);
        }

        this._restoreTimeout = setTimeout(() => {
          if (this._centerLabel) {
            this._root.remove(this._centerLabel);
            this._centerLabel = null;
          }

          const total = this._calculateTotal(seriesItem.data || []);
          this._renderStaticCenterLabel(seriesItem, cx, cy, r0, total);
          this._restoreTimeout = null;
        }, 80);
      }
    }
  }

  private _applyEmphasisAnimation(
    sector: PieSector,
    emphasis: EmphasisOption | undefined,
    isEnter: boolean,
  ): void {
    if (isEnter) {
      this._applyEnterEmphasis(sector, emphasis);
    } else {
      this._applyLeaveEmphasis(sector);
    }
  }

  private _applyEnterEmphasis(
    sector: PieSector,
    emphasis: EmphasisOption | undefined,
  ) {
    const seriesItem = sector.__seriesItem;
    const showOnHover = seriesItem?.label?.showOnHover;
    const focus = emphasis?.focus || 'none';

    // 1. Handle OTHER sectors (dimming)
    this._activeSectors.forEach((s) => {
      if (s !== sector) {
        if (focus === 'self') {
          s.style.opacity = 0.2;
          s.markRedraw();
        }

        const seriesType = s.__seriesItem?.type || 'pie';
        const isDoughnut =
          seriesType === 'doughnut' || seriesType === 'half-doughnut';
        if (isDoughnut) {
          const baseR = s.__baseR;
          if (baseR !== undefined && s.shape && typeof s.shape === 'object') {
            (s.shape as any).r = baseR;
            s.markRedraw();
          }
        }

        // Handle Label & Line
        this._animateLabelAndLineOpacity(s, focus, showOnHover, false);

        if (s.transform) {
          this._hoverAnimator
            .animate(s.transform, 'scaleX', 1, {
              duration: 200,
              easing: 'cubicOut',
              onUpdate: () => {
                s.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
          this._hoverAnimator
            .animate(s.transform, 'scaleY', 1, {
              duration: 200,
              easing: 'cubicOut',
              onUpdate: () => {
                s.markRedraw();
                this._renderer.refresh();
              },
            })
            .start();
        }
        this._restoreSectorStyle(s);
      }
    });

    // Check for font changes
    if (
      emphasis?.label?.fontSize ||
      emphasis?.label?.fontWeight ||
      emphasis?.label?.color
    ) {
      if (emphasis.label.color) {
        // this._animator.animate(label.style, 'fill', emphasis.label.color, { duration: 200, onUpdate: () => label.markRedraw() }).start();
        // Color animation is complex, let's just set it for now or implement color tweening later
        // But we can animate opacity
      }
    }

    // Scale animation (handled in _applyScaleAnimation)
    this._applyScaleAnimation(sector, emphasis, true);

    // Label animation
    this._animateCurrentLabel(sector, emphasis, showOnHover);

    // Style animation (shadow, etc)
    const emphasisStyle = emphasis?.itemStyle || {};
    this._applyEmphasisStyle(sector, emphasisStyle);
  }

  private _applyLeaveEmphasis(sector: Sector): void {
    // Restore ALL sectors
    this._activeSectors.forEach((s) => {
      const initOpacity = (s as any).__initialStyle?.opacity ?? 1;
      s.style.opacity = initOpacity;
      const baseR = (s as any).__baseR;
      if (baseR !== undefined && s.shape && typeof s.shape === 'object') {
        (s.shape as any).r = baseR;
      }
      if (s.transform) {
        s.transform.scaleX = 1;
        s.transform.scaleY = 1;
      }

      // Restore Label & Line
      this._restoreLabelAndLine(s);
      this._restoreSectorStyle(s);
      s.markRedraw();
    });

    // Restore Style
    this._restoreSectorStyle(sector);
    this._renderer.refresh();
  }

  private _animateLabelAndLineOpacity(
    sector: PieSector,
    focus: string,
    showOnHover: boolean | undefined,
    isCurrent: boolean,
  ) {
    const label = sector.__label;
    const labelLine = sector.__labelLine;

    if (label) {
      const initLabelOpacity = (label as any).__initialStyle?.opacity ?? 1;
      let targetOpacity = initLabelOpacity;

      if (!isCurrent) {
        if (focus === 'self') {
          targetOpacity = showOnHover ? 0 : 0.2;
        } else if (showOnHover) {
          targetOpacity = 0;
        }
      }
      label.style.opacity = targetOpacity;
      label.invisible = targetOpacity === 0;
      (label as any).__hoverOpacityOverride = targetOpacity;
      label.markRedraw();
    }

    if (labelLine) {
      const initLineOpacity = (labelLine as unknown as { __initialStyle: any }).__initialStyle?.opacity ?? 1;
      let targetOpacity = initLineOpacity;

      if (!isCurrent) {
        if (focus === 'self') {
          targetOpacity = showOnHover ? 0 : 0.2;
        } else if (showOnHover) {
          targetOpacity = 0;
        }
      }
      labelLine.style.opacity = targetOpacity;
      labelLine.invisible = targetOpacity === 0;
      (labelLine as any).__hoverOpacityOverride = targetOpacity;
      labelLine.markRedraw();
    }
    this._renderer.refresh();
  }

  private _restoreLabelAndLine(sector: PieSector) {
    const label = sector.__label;
    const labelLine = sector.__labelLine;

    if (label) {
      const initLabelOpacity = (label as any).__initialStyle?.opacity ?? 1;
      label.style.opacity = initLabelOpacity;
      label.invisible = initLabelOpacity === 0;
      (label as any).__hoverOpacityOverride = initLabelOpacity;
      label.markRedraw();
    }

    if (labelLine) {
      const initLineOpacity = (labelLine as unknown as { __initialStyle: any }).__initialStyle?.opacity ?? 1;
      let targetOpacity = initLineOpacity;
      labelLine.invisible = initLineOpacity === 0;
      (labelLine as any).__hoverOpacityOverride = initLineOpacity;
      labelLine.markRedraw();
    }
    this._renderer.refresh();
  }

  private _animateCurrentLabel(
    sector: PieSector,
    emphasis: EmphasisOption | undefined,
    showOnHover: boolean | undefined,
  ) {
    const label = sector.__label;
    const labelLine = sector.__labelLine;
    if (!label) return;

    const empLabel = emphasis?.label || {};

    // Fallback logic: if showOnHover is undefined, try to retrieve it from sector
    let finalShowOnHover = showOnHover;
    if (finalShowOnHover === undefined) {
      finalShowOnHover = sector.__seriesItem?.label?.showOnHover;
    }

    if (empLabel.show !== undefined) {
      label.invisible = !empLabel.show;
      label.style.opacity = empLabel.show ? 1 : 0;
      (label as any).__hoverOpacityOverride = label.style.opacity;
    } else if (finalShowOnHover) {
      label.invisible = false;
      label.style.opacity = 1;
      (label as any).__hoverOpacityOverride = 1;
    } else {
      if (!label.invisible && (label.style.opacity as number) < 1) {
        label.style.opacity = 1;
        (label as any).__hoverOpacityOverride = 1;
      }
    }

    // Apply styles
    if (empLabel.fontSize !== undefined)
      label.style.fontSize = empLabel.fontSize;
    if (empLabel.fontWeight !== undefined)
      label.style.fontWeight = empLabel.fontWeight;
    if (empLabel.color !== undefined) {
      label.style.fill = empLabel.color;
      if (labelLine) labelLine.style.stroke = empLabel.color;
    }

    // Ensure labelLine matches
    if (labelLine) {
      if (labelLine.invisible || (labelLine.style.opacity as number) < 1) {
        labelLine.invisible = false;
        labelLine.style.opacity = 1;
        (labelLine as any).__hoverOpacityOverride = 1;
      }
    }

    label.markRedraw();
    if (labelLine) labelLine.markRedraw();
    this._renderer.refresh();
  }

  private _applyEmphasisStyle(sector: Sector, emphasisStyle: any) {
    const style = sector.style as any;
    // Save initial style if not present (though should be done at creation)
    if (!(sector as any).__initialStyle) {
      (sector as any).__initialStyle = { ...style };
    }

    const targetStyle: Record<string, unknown> = {};
    if (emphasisStyle.shadowBlur !== undefined)
      targetStyle.shadowBlur = emphasisStyle.shadowBlur;
    if (emphasisStyle.shadowOffsetX !== undefined)
      targetStyle.shadowOffsetX = emphasisStyle.shadowOffsetX;
    if (emphasisStyle.shadowOffsetY !== undefined)
      targetStyle.shadowOffsetY = emphasisStyle.shadowOffsetY;
    if (emphasisStyle.shadowColor !== undefined)
      targetStyle.shadowColor = emphasisStyle.shadowColor;
    if (emphasisStyle.color !== undefined)
      targetStyle.fill = emphasisStyle.color;
    if (emphasisStyle.borderColor !== undefined)
      targetStyle.stroke = emphasisStyle.borderColor;
    if (emphasisStyle.borderWidth !== undefined)
      targetStyle.lineWidth = emphasisStyle.borderWidth;
    targetStyle.opacity = 1;

    Object.keys(targetStyle).forEach((key) => {
      const value = targetStyle[key];
      style[key] = value as any;
    });
    sector.markRedraw();
    this._renderer.refresh();
  }

  private _restoreSectorStyle(sector: Sector) {
    const init = (sector as any).__initialStyle;
    if (!init) return;

    const style = sector.style as any;
    const targetStyle: Record<string, unknown> = {};

    // Explicitly restore key properties
    targetStyle.shadowBlur = init.shadowBlur ?? 0;
    targetStyle.shadowOffsetX = init.shadowOffsetX ?? 0;
    targetStyle.shadowOffsetY = init.shadowOffsetY ?? 0;
    targetStyle.shadowColor = init.shadowColor ?? 'transparent';
    if (init.fill !== undefined) targetStyle.fill = init.fill;
    if (init.stroke !== undefined) targetStyle.stroke = init.stroke;
    if (init.lineWidth !== undefined) targetStyle.lineWidth = init.lineWidth;

    Object.keys(targetStyle).forEach((key) => {
      const value = targetStyle[key];
      style[key] = value as any;
    });
    sector.markRedraw();
    this._renderer.refresh();
  }

  private _applyScaleAnimation(
    sector: PieSector,
    emphasis: EmphasisOption | undefined,
    isEnter: boolean,
  ) {
    const scaleSize = isEnter && emphasis ? emphasis.scaleSize || 1.1 : 1;
    const duration = isEnter ? 160 : 220;

    const seriesType = sector.__seriesItem?.type || 'pie';
    const isDoughnut =
      seriesType === 'doughnut' || seriesType === 'half-doughnut';
    if (isDoughnut) {
      const baseR = sector.__baseR;
      if (baseR !== undefined && sector.shape && typeof sector.shape === 'object') {
        if (sector.transform) {
          sector.transform.scaleX = 1;
          sector.transform.scaleY = 1;
        }
        this._hoverAnimator
          .animate(sector.shape as any, 'r', baseR * scaleSize, {
            duration,
            easing: 'cubicOut',
            onUpdate: () => {
              sector.markRedraw();
              this._renderer.refresh();
            },
          })
          .start();
        return;
      }
    }

    this._hoverAnimator
      .animate(sector.transform || {}, 'scaleX', scaleSize, {
        duration,
        easing: 'cubicOut',
        onUpdate: () => {
          sector.markRedraw();
          this._renderer.refresh();
        },
      })
      .start();
    this._hoverAnimator
      .animate(sector.transform || {}, 'scaleY', scaleSize, {
        duration,
        easing: 'cubicOut',
        onUpdate: () => {
          sector.markRedraw();
          this._renderer.refresh();
        },
      })
      .start();
  }
}
