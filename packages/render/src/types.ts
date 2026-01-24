/**
 * Chart type definitions
 */

// We define DecalObject here to avoid circular dependency if possible,
// or we just define it here and pattern imports it (which it does).
// So pattern.ts imports DecalObject from types.ts.
// So types.ts CANNOT import DecalObject from pattern.ts.
// We must define it here.

export interface DecalObject {
  symbol?: string | ((...args: any[]) => void);
  symbolSize?: number;
  rotation?: number;
  color?: string;
  backgroundColor?: string;
  dashArrayX?: number[] | number;
  dashArrayY?: number[] | number;
  maxTileWidth?: number;
  maxTileHeight?: number;
}

export type RenderMode = 'canvas' | 'svg';
export type Theme = 'light' | 'dark' | string;
export type Locale = 'en' | 'zh' | string;

export interface ThemeToken {
  colorText?: string;
  colorTextSecondary?: string;
  colorTextTertiary?: string;
  colorBackground?: string;
  colorFillPage?: string;
  colorFillContainer?: string;
  colorFillContainerAlt?: string;
  colorFillHover?: string;
  colorBorder?: string;
  colorBorderSecondary?: string;
  colorGrid?: string;
  colorAxisLine?: string;
  colorAxisLabel?: string;
  colorTooltipBackground?: string;
  colorTooltipText?: string;
  colorTooltipBorder?: string;
  boxShadowTooltip?: string;
  colorTooltipSeriesName?: string;
  colorTooltipSubitemName?: string;
  colorTooltipValue?: string;
  colorLegendText?: string;
  colorTextOnSeries?: string;
  colorPrimary?: string;
  colorPrimaryText?: string;
  colorShadow?: string;
  colorMask?: string;
  colorDecal?: string;
  colorCodeBackground?: string;
  colorCodeGutterBackground?: string;
  colorCodeText?: string;
  colorCodeGutterText?: string;
  fontFamily?: string;
  fontSize?: number;
  seriesColors?: string[];
  heatmapColors?: string[];
  [key: string]: unknown;
}

export interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  textColorSecondary?: string;
  textColorTertiary?: string;
  borderColor: string;
  borderSecondaryColor?: string;
  gridColor: string;
  axisLineColor: string;
  axisLabelColor: string;
  splitLineColor?: string;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  tooltipBorderColor: string;
  tooltipBoxShadow: string;
  tooltipSeriesNameColor: string;
  tooltipSubitemNameColor: string;
  tooltipValueColor: string;
  legendTextColor: string;
  textColorOnSeries?: string;
  primaryColor?: string;
  primaryTextColor?: string;
  shadowColor: string;
  maskColor: string;
  decalColor: string;
  seriesColors: string[];
  color?: string[];
  heatmapColors?: string[];
  fillPageColor?: string;
  fillContainerColor?: string;
  fillContainerAltColor?: string;
  fillHoverColor?: string;
  codeBackgroundColor?: string;
  codeGutterBackgroundColor?: string;
  codeTextColor?: string;
  codeGutterTextColor?: string;
  fontFamily: string;
  fontSize: number;
  token: ThemeToken;
  [key: string]: any;
}

export interface LocaleConfig {
  [key: string]: any;
}

export interface DataURLOpts {
  type?: 'png' | 'jpeg' | 'svg';
  pixelRatio?: number;
  backgroundColor?: string;
  quality?: number;
}

export interface EventData {
  type?: string;
  [key: string]: any;
}

export type EventCallback = (event: EventData) => void;

export interface Point {
  x: number;
  y: number;
}

export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementOption {
  // Base option interface
  [key: string]: any;
}

/**
 * HudX chart option (ECharts-style).
 *
 * This type is used directly by `hudx-charts`' `HChart` (`option` prop) and is the
 * primary surface for TS IntelliSense.
 *
 * @example
 * ```ts
 * import type { ChartOption } from 'hudx-charts';
 *
 * const option: ChartOption = {
 *   title: { text: 'Sales' },
 *   tooltip: { show: true, trigger: 'axis' },
 *   legend: { show: true },
 *   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
 *   yAxis: { type: 'value' },
 *   series: [{ type: 'bar', name: 'Sales', data: [120, 200, 150] }],
 * };
 * ```
 */
export interface ChartOption {
  /** Title configuration */
  title?: TitleOption;
  /** Tooltip configuration */
  tooltip?: TooltipOption;
  /** Legend configuration */
  legend?: LegendOption;
  /** Grid configuration */
  grid?: GridOption;
  /** X-axis configuration */
  xAxis?: AxisOption | AxisOption[];
  /** Y-axis configuration */
  yAxis?: AxisOption | AxisOption[];
  /**
   * Series list.
   *
   * Tip: explicitly set `type` (e.g. `'line' | 'bar' | 'pie'`) to get more accurate
   * field suggestions for that series.
   */
  series?: SeriesOption[];
  /** Background color */
  backgroundColor?: string;
  /** Whether to enable animation */
  animation?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Animation easing function */
  animationEasing?: string;
  /** Accessibility options */
  aria?: AriaOption;
  [key: string]: any;
}

export interface AriaOption {
  /** Enable accessibility features */
  enabled?: boolean;
  /** Decal pattern configuration for color blindness */
  decal?: DecalOption;
  [key: string]: any;
}

export interface DecalOption {
  /** Show decal patterns */
  show?: boolean;
  /** List of decal patterns to cycle through */
  decals?: DecalObject[];
}

/**
 * Title option (similar to ECharts `title`).
 *
 * Supports basic box styles (background/border/padding) and text styles via
 * `textStyle` / `subtextStyle`.
 *
 * @example
 * ```ts
 * const option: ChartOption = {
 *   title: { text: 'HudX Charts', subtext: 'Hello', left: 'center', top: 10 },
 *   series: [],
 * };
 * ```
 */
export interface TitleOption {
  /** Title text */
  text?: string;
  /** Subtitle text */
  subtext?: string;
  /**
   * Horizontal position.
   *
   * Common values: `'left' | 'center' | 'right'` or a pixel number.
   */
  left?: string | number;
  /**
   * Vertical position.
   *
   * Common values: `'top' | 'middle' | 'bottom'` or a pixel number.
   */
  top?: string | number;
  /** Title text style */
  textStyle?: TextStyle;
  /** Subtitle text style */
  subtextStyle?: TextStyle;
  [key: string]: any;
}

/**
 * Tooltip option (similar to ECharts `tooltip`).
 *
 * HudX tooltip is rendered as DOM by default (`renderMode: 'html'`) and `formatter`
 * can return an HTML string.
 *
 * @example
 * ```ts
 * const option: ChartOption = {
 *   tooltip: {
 *     show: true,
 *     trigger: 'axis',
 *     formatter: (params) => {
 *       const items = Array.isArray(params) ? params : [params];
 *       return items.map((it) => `${it.seriesName}: ${it.value}`).join('<br/>');
 *     },
 *   },
 * };
 * ```
 */
export interface TooltipOption {
  /** Show tooltip */
  show?: boolean;
  /** Trigger type */
  trigger?: 'item' | 'axis' | 'none';
  /** Visual size preset */
  size?: 'medium-small' | 'small' | 'medium';
  /** Axis pointer configuration */
  axisPointer?: {
    type?: 'line' | 'shadow' | 'none';
    lineStyle?: LineStyleOption;
    shadowStyle?: ItemStyleOption;
  };
  /**
   * Content formatter.
   *
   * - With `trigger: 'item'`, `params` is usually a single object.\n
   * - With `trigger: 'axis'`, `params` is usually an array (multiple series at the same axis point).\n
   *
   * The `params` shape is similar to `ChartEvent` and typically contains
   * `seriesName/name/value/color` etc.
   */
  formatter?: string | ((params: any) => string);
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number;
  /** Padding */
  padding?: number | number[];
  /** Text style */
  textStyle?: TextStyle;
  /** Extra CSS text */
  extraCssText?: string;
  /** Class name */
  className?: string;
  /** Whether to append to body */
  appendToBody?: boolean;
  /** Whether to confine tooltip within chart */
  confine?: boolean;
  /** Transition duration */
  transitionDuration?: number;
  /** Position configuration */
  position?:
    | string
    | number[]
    | ((
        point: number[],
        params: any,
        dom: HTMLElement,
        rect: any,
        size: any,
      ) => number[]);
  /** Show content */
  showContent?: boolean;
  /** Always show content */
  alwaysShowContent?: boolean;
  /** Trigger on */
  triggerOn?: 'mousemove' | 'click' | 'mousemove|click' | 'none';
  /** Show delay */
  showDelay?: number;
  /** Hide delay */
  hideDelay?: number;
  /** Enterable */
  enterable?: boolean;
  /** Render mode */
  renderMode?: 'html' | 'richText';
  /** Order */
  order?: 'seriesAsc' | 'seriesDesc' | 'valueAsc' | 'valueDesc';
  /** Layout mode */
  layout?: 'horizontal' | 'vertical' | 'rich';
  /** Custom CSS styles for generated HTML elements */
  htmlStyles?: {
    /** Style for the container of a single item row */
    row?: string;
    /** Style for the container block in vertical/rich layout */
    blockContainer?: string;
    /** Style for the label container (marker + title) */
    labelContainer?: string;
    /** Style for the label text */
    label?: string;
    /** Style for the value text */
    value?: string;
    /** Style for rich layout row */
    richRow?: string;
    /** Style for rich layout label */
    richLabel?: string;
    /** Style for rich layout value */
    richValue?: string;
  };
  [key: string]: any;
}

/**
 * Text style (used by title/legend/axisLabel/label, etc.).
 *
 * Note: supported fields may vary by component, but common fields such as
 * `color/fontSize/fontFamily/fontWeight/lineHeight` are widely supported.
 */
export interface TextStyle {
  color?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fontFamily?: string;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  lineHeight?: number;
  width?: number;
  height?: number;
  textBorderColor?: string;
  textBorderWidth?: number;
  textShadowColor?: string;
  textShadowBlur?: number;
  textShadowOffsetX?: number;
  textShadowOffsetY?: number;
  overflow?: 'truncate' | 'break' | 'breakAll';
  ellipsis?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number | number[];
}

/**
 * Legend option (similar to ECharts `legend`).
 *
 * @example
 * ```ts
 * const option: ChartOption = {
 *   legend: { show: true, orient: 'vertical', right: 10, top: 10 },
 *   series: [{ type: 'line', name: 'A', data: [1, 2, 3] }],
 * };
 * ```
 */
export interface LegendOption {
  /** Show legend */
  show?: boolean;
  z?: number;
  zlevel?: number;
  /**
   * Legend data.
   *
   * - `string[]`: each item is a series name\n
   * - `{ name, icon, textStyle }[]`: allows custom icon and text style\n
   */
  data?: string[] | { name: string; icon?: string; textStyle?: TextStyle }[];
  /** Left position */
  left?: string | number;
  /** Top position */
  top?: string | number;
  /** Right position */
  right?: string | number;
  /** Bottom position */
  bottom?: string | number;
  width?: string | number;
  height?: string | number;
  /** Layout orientation */
  orient?: 'horizontal' | 'vertical';
  /** Render mode */
  renderMode?: 'canvas' | 'html';
  /** Custom formatter */
  formatter?: string | ((name: string, item: any) => string | string[]);
  /** Table header for html mode */
  tableHead?: string[];
  /** Item max width */
  itemMaxWidth?: number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  padding?: number | number[];
  itemGap?: number;
  itemWidth?: number;
  itemHeight?: number;
  symbolKeepAspect?: boolean;
  selectedMode?: boolean | 'single' | 'multiple';
  inactiveColor?: string;
  selected?: { [name: string]: boolean };
  textStyle?: TextStyle;
  tooltip?: TooltipOption;
  icon?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number | number[];
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  scrollDataIndex?: number;
  pageButtonItemGap?: number;
  pageButtonGap?: number;
  pageButtonPosition?: 'start' | 'end';
  pageFormatter?: string | Function;
  pageIcons?: {
    horizontal?: string[];
    vertical?: string[];
  };
  pageIconColor?: string;
  pageIconInactiveColor?: string;
  pageIconSize?: number | number[];
  pageTextStyle?: TextStyle;
  animation?: boolean;
  animationDurationUpdate?: number;
  [key: string]: any;
}

export interface GridOption {
  /**
   * Grid option (similar to ECharts `grid`).
   *
   * Primarily affects Cartesian series (line/bar/scatter) layout and plotting area.
   */
  show?: boolean;
  z?: number;
  zlevel?: number;
  /** Left margin */
  left?: string | number;
  /** Right margin */
  right?: string | number;
  /** Top margin */
  top?: string | number;
  /** Bottom margin */
  bottom?: string | number;
  width?: string | number;
  height?: string | number;
  /** Whether grid area contains label */
  containLabel?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  tooltip?: any; // Grid specific tooltip config
  [key: string]: any;
}

/**
 * Axis option (similar to ECharts `xAxis` / `yAxis`).
 *
 * HudX currently focuses on `value` and `category`. If `type` is omitted but `data`
 * is provided, some charts may auto-detect it as `category`.
 *
 * @example
 * ```ts
 * const option: ChartOption = {
 *   xAxis: { type: 'category', data: ['Mon', 'Tue'] },
 *   yAxis: { type: 'value' },
 *   series: [{ type: 'line', data: [10, 20] }],
 * };
 * ```
 */
export interface AxisOption {
  /** Axis type */
  type?: 'value' | 'category' | 'time' | 'log';
  /** Axis data (for category axis) */
  data?: any[];
  /** Whether to show axis */
  show?: boolean;
  gridIndex?: number;
  /** Axis position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  /** Axis name */
  name?: string;
  nameLocation?: 'start' | 'middle' | 'center' | 'end';
  nameTextStyle?: TextStyle;
  nameGap?: number;
  nameRotate?: number;
  inverse?: boolean;
  boundaryGap?: boolean | [string | number, string | number];
  /** Axis label configuration */
  axisLabel?: AxisLabelOption;
  /** Axis line configuration */
  axisLine?: AxisLineOption;
  /** Axis tick configuration */
  axisTick?: AxisTickOption;
  /** Minor tick configuration */
  minorTick?: AxisTickOption;
  /** Split line configuration */
  splitLine?: SplitLineOption;
  /** Minor split line configuration */
  minorSplitLine?: SplitLineOption;
  /** Split area configuration */
  splitArea?: SplitAreaOption;
  /** Min value */
  min?: number | 'dataMin' | ((value: { min: number; max: number }) => number);
  /** Max value */
  max?: number | 'dataMax' | ((value: { min: number; max: number }) => number);
  scale?: boolean;
  splitNumber?: number;
  minInterval?: number;
  maxInterval?: number;
  interval?: number;
  logBase?: number;
  silent?: boolean;
  triggerEvent?: boolean;
  z?: number;
  zlevel?: number;
  [key: string]: any;
}

export interface AxisTickOption {
  show?: boolean;
  alignWithLabel?: boolean;
  interval?: number | Function;
  inside?: boolean;
  length?: number;
  lineStyle?: LineStyleOption;
}

export interface SplitAreaOption {
  show?: boolean;
  interval?: number | Function;
  areaStyle?: {
    color?: string[];
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    opacity?: number;
  };
}

export interface AxisLabelOption {
  /**
   * Label formatter.
   *
   * When `formatter` is a function it receives:\n
   * - `value`: tick value\n
   * - `index`: tick index\n
   */
  show?: boolean;
  color?: string;
  fontSize?: number;
  rotate?: number;
  width?: number;
  overflow?: 'break' | 'breakAll' | 'truncate' | 'none';
  lineHeight?: number;
  interval?: number | 'auto' | ((index: number, value: string) => boolean);
  formatter?: string | ((value: any, index: number) => string);
  [key: string]: any;
}

export interface AxisLineOption {
  show?: boolean;
  lineStyle?: LineStyleOption;
}

export interface SplitLineOption {
  show?: boolean;
  interval?: number | 'auto' | Function;
  lineStyle?: LineStyleOption;
}

export interface LineStyleOption {
  color?: string;
  width?: number;
  type?: 'solid' | 'dashed' | 'dotted';
  opacity?: number;
  [key: string]: any;
}

/**
 * Series option (similar to ECharts `series`), modeled as a discriminated union to improve TS IntelliSense.
 *
 * - When you specify `type: 'bar' | 'line' | 'pie' ...` in an object literal, the editor can prefer the relevant fields.\n
 * - `UnknownSeriesOption` is kept as a fallback for custom or not-yet-modeled series types.\n
 */
export type SeriesOption =
  | LineSeriesOption
  | BarSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | HeatmapSeriesOption
  | Bar3DSeriesOption
  | StackBar3DSeriesOption
  | UnknownSeriesOption;

export interface BaseSeriesOption {
  /** Series type (explicitly set it to get more accurate IntelliSense). */
  type?: string;
  id?: string;
  name?: string;
  color?: string;
  z?: number;
  zlevel?: number;
  cursor?: string;
  show?: boolean;
  itemStyle?: ItemStyleOption;
  label?: LabelOption;
  emphasis?: EmphasisOption;
  data?: ChartData[];
  [key: string]: any;
}

/**
 * Line series.
 *
 * @example
 * ```ts
 * series: [{ type: 'line', name: 'A', smooth: true, data: [120, 200, 150] }]
 * ```
 */
export interface LineSeriesOption extends BaseSeriesOption {
  type: 'line';
  smooth?: boolean | number;
  symbol?:
    | string
    | 'none'
    | 'circle'
    | 'rect'
    | 'roundRect'
    | 'triangle'
    | 'diamond'
    | 'pin'
    | 'arrow';
  symbolSize?:
    | number
    | number[]
    | ((value: any, params: any) => number | number[]);
  symbolRotate?: number;
  symbolKeepAspect?: boolean;
  symbolOffset?: [string | number, string | number];
  showSymbol?: boolean;
  connectNulls?: boolean;
  step?: boolean | 'start' | 'middle' | 'end';
  lineStyle?: LineStyleOption;
  areaStyle?: AreaStyleOption;
}

/**
 * Bar series.
 *
 * @example
 * ```ts
 * series: [{ type: 'bar', name: 'Sales', data: [120, 200, 150], barGap: '30%' }]
 * ```
 */
export interface BarSeriesOption extends BaseSeriesOption {
  type: 'bar';
  stack?: string;
  barWidth?: string | number;
  barMaxWidth?: string | number;
  barMinHeight?: number;
  barGap?: string | number;
  barCategoryGap?: string | number;
  showBackground?: boolean;
  backgroundStyle?: ItemStyleOption;
}

/**
 * Pie series.
 *
 * @example
 * ```ts
 * series: [{
 *   type: 'pie',
 *   radius: '60%',
 *   data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }],
 * }]
 * ```
 */
export interface PieSeriesOption extends BaseSeriesOption {
  type: 'pie';
  radius?: number | string | (number | string)[];
  center?: (number | string)[];
  roseType?: boolean | 'radius' | 'area';
  avoidLabelOverlap?: boolean;
  stillShowZeroSum?: boolean;
  startAngle?: number;
  endAngle?: number;
  minAngle?: number;
  labelLine?: LabelLineOption;
}

/**
 * Scatter series.
 *
 * @example
 * ```ts
 * series: [{ type: 'scatter', data: [[10, 20], [15, 30]] }]
 * ```
 */
export interface ScatterSeriesOption extends BaseSeriesOption {
  type: 'scatter';
  symbol?: LineSeriesOption['symbol'];
  symbolSize?: LineSeriesOption['symbolSize'];
  symbolRotate?: number;
  symbolKeepAspect?: boolean;
  symbolOffset?: [string | number, string | number];
}

/**
 * Heatmap series (primarily used by `HeatmapChart`).
 *
 * Data is typically an array of `[x, y, value]`.
 */
export interface HeatmapSeriesOption extends BaseSeriesOption {
  type: 'heatmap';
  data?: ChartData[];
}

/**
 * 3D bar series (`Bar3DChart`).
 */
export interface Bar3DSeriesOption extends BaseSeriesOption {
  type: 'bar3D';
  stack?: string;
  barWidth?: string | number;
  barGap?: string | number;
  barCategoryGap?: string | number;
}

/**
 * 3D stacked bar series (`StackBar3DChart`).
 */
export interface StackBar3DSeriesOption extends BaseSeriesOption {
  type: 'stackBar3D';
  stack?: string;
  barWidth?: string | number;
  barGap?: string | number;
  barCategoryGap?: string | number;
}

/**
 * Fallback for custom/unsupported series.\n
 * If you use a non-built-in `type`, it falls back to this type to avoid blocking typing.
 */
export interface UnknownSeriesOption extends BaseSeriesOption {
  type?: string;
}

export interface GradientColorStop {
  offset: number;
  color: string;
}

export interface LinearGradientColor {
  type: 'linear';
  x?: number;
  y?: number;
  x2?: number;
  y2?: number;
  colorStops: GradientColorStop[];
  global?: boolean;
}

export interface RadialGradientColor {
  type: 'radial';
  x?: number;
  y?: number;
  r?: number;
  colorStops: GradientColorStop[];
  global?: boolean;
}

export type GradientColor = LinearGradientColor | RadialGradientColor;

export interface AreaStyleOption {
  color?: string | GradientColor;
  origin?: 'auto' | 'start' | 'end';
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  opacity?: number;
}

export interface LabelLineOption {
  show?: boolean;
  showAbove?: boolean;
  length?: number;
  length2?: number;
  smooth?: boolean | number;
  minTurnAngle?: number;
  lineStyle?: LineStyleOption;
}

export interface ItemStyleOption {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  borderType?: 'solid' | 'dashed' | 'dotted';
  opacity?: number;
  borderRadius?: number | number[];
  [key: string]: any;
}

export interface LabelOption {
  show?: boolean;
  showOnHover?: boolean;
  position?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'inside'
    | 'insideLeft'
    | 'insideRight'
    | 'insideTop'
    | 'insideBottom'
    | 'insideTopLeft'
    | 'insideBottomLeft'
    | 'insideTopRight'
    | 'insideBottomRight'
    | 'outside'
    | 'center';
  color?: string;
  fontSize?: number;
  formatter?: string | ((params: any) => string);
  [key: string]: any;
}

export interface EmphasisOption {
  itemStyle?: ItemStyleOption;
  label?: LabelOption;
  scale?: boolean;
  scaleSize?: number;
  focus?: 'none' | 'self' | 'series';
  blurScope?: 'coordinateSystem' | 'series' | 'global';
  [key: string]: any;
}

/**
 * Common `series.data` shapes (similar to ECharts).
 *
 * - `number`: single numeric value\n
 * - `number[]`: multi-dimensional values (e.g. scatter `[x, y]`)\n
 * - object: supports `name/value/itemStyle/label` etc.\n
 *
 * @example
 * ```ts
 * // Bar/Line
 * series: [{ type: 'bar', data: [120, 200, 150] }]
 *
 * // Scatter
 * series: [{ type: 'scatter', data: [[10, 20], [15, 35]] }]
 *
 * // With name/value
 * series: [{ type: 'pie', data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }] }]
 * ```
 */
export type ChartData =
  | number
  | number[]
  | {
      name?: string;
      value: any;
      itemStyle?: ItemStyleOption;
      label?: LabelOption;
      [key: string]: any;
    };

/**
 * Chart event payload (similar to ECharts event params) used by `HChartProps.onEvents`.
 *
 * Different components/series may populate different fields, but it typically includes:\n
 * - `seriesType/seriesIndex/seriesName`\n
 * - `name/dataIndex/value`\n
 */
export interface ChartEvent {
  type: string;
  event?: any;
  componentType?: string;
  componentIndex?: number;
  seriesType?: string;
  seriesIndex?: number;
  seriesName?: string;
  name?: string;
  dataIndex?: number;
  data?: any;
  value?: any;
  [key: string]: any;
}

export interface Coordinate {
  x: number;
  y: number;
}
