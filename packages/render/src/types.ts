/**
 * Chart type definitions
 */

// We define DecalObject here to avoid circular dependency if possible,
// or we just define it here and pattern imports it (which it does).
// So pattern.ts imports DecalObject from types.ts.
// So types.ts CANNOT import DecalObject from pattern.ts.
// We must define it here.

export interface DecalObject {
  /** Decal symbol pattern */
  symbol?: string | ((...args: any[]) => void);
  /** Size of the symbol */
  symbolSize?: number;
  /** Rotation of the pattern in radians */
  rotation?: number;
  /** Foreground color of the pattern */
  color?: string;
  /** Background color of the pattern */
  backgroundColor?: string;
  /** Dash array for X axis lines */
  dashArrayX?: number[] | number;
  /** Dash array for Y axis lines */
  dashArrayY?: number[] | number;
  /** Maximum tile width */
  maxTileWidth?: number;
  /** Maximum tile height */
  maxTileHeight?: number;
}

export type RenderMode = 'canvas' | 'svg';
export type Theme = 'light' | 'dark' | string;
export type Locale = 'en' | 'zh' | string;

export interface ThemeToken {
  /**
   * Primary text color.
   * Used for main content, body text, and primary labels.
   */
  colorText?: string;
  /**
   * Secondary text color.
   * Used for secondary labels, descriptions, and less emphasized text.
   */
  colorTextSecondary?: string;
  /**
   * Tertiary text color.
   * Used for disabled text, placeholders, or subtle hints.
   */
  colorTextTertiary?: string;
  /**
   * Base background color.
   * Typically used for the chart container background.
   */
  colorBackground?: string;
  /**
   * Page fill color.
   * Used for the overall page background behind the chart.
   */
  colorFillPage?: string;
  /**
   * Container fill color.
   * Used for internal containers or panels within the chart.
   */
  colorFillContainer?: string;
  /**
   * Alternate container fill color.
   * Used for alternating rows or sections.
   */
  colorFillContainerAlt?: string;
  /**
   * Hover fill color.
   * Used for hover states on interactive elements.
   */
  colorFillHover?: string;
  /**
   * Primary border color.
   * Used for major structural borders.
   */
  colorBorder?: string;
  /**
   * Secondary border color.
   * Used for subtle dividers or minor borders.
   */
  colorBorderSecondary?: string;
  /**
   * Grid line color.
   * Used for axis grid lines.
   */
  colorGrid?: string;
  /**
   * Axis line color.
   * Used for the main axis lines (x-axis, y-axis).
   */
  colorAxisLine?: string;
  /**
   * Axis label color.
   * Used for text labels on axes.
   */
  colorAxisLabel?: string;
  /**
   * Tooltip background color.
   */
  colorTooltipBackground?: string;
  /**
   * Tooltip text color.
   */
  colorTooltipText?: string;
  /**
   * Tooltip border color.
   */
  colorTooltipBorder?: string;
  /**
   * Tooltip box shadow.
   * CSS box-shadow value for the tooltip.
   */
  boxShadowTooltip?: string;
  /**
   * Color for the series name in tooltips.
   */
  colorTooltipSeriesName?: string;
  /**
   * Color for sub-item names in tooltips.
   */
  colorTooltipSubitemName?: string;
  /**
   * Color for values in tooltips.
   */
  colorTooltipValue?: string;
  /**
   * Legend text color.
   */
  colorLegendText?: string;
  /**
   * Text color for labels placed directly on series elements.
   */
  colorTextOnSeries?: string;
  /**
   * Primary brand color.
   * Used for active states, primary buttons, or key highlights.
   */
  colorPrimary?: string;
  /**
   * Text color on top of primary color backgrounds.
   */
  colorPrimaryText?: string;
  /**
   * Shadow color.
   * Base color for shadows (e.g., drop shadows).
   */
  colorShadow?: string;
  /**
   * Mask color.
   * Used for overlay masks (e.g., during loading or disabled states).
   */
  colorMask?: string;
  /**
   * Decal color.
   * Base color for pattern fills (accessibility).
   */
  colorDecal?: string;
  /**
   * Code block background color.
   */
  colorCodeBackground?: string;
  /**
   * Code block gutter background color.
   */
  colorCodeGutterBackground?: string;
  /**
   * Code block text color.
   */
  colorCodeText?: string;
  /**
   * Code block gutter text color.
   */
  colorCodeGutterText?: string;
  /**
   * Font family for the entire chart.
   * @example 'Arial, sans-serif'
   */
  fontFamily?: string;
  /**
   * Base font size in pixels.
   * @default 12
   */
  fontSize?: number;
  /**
   * Default color palette for series.
   * The chart will cycle through these colors for each series.
   */
  seriesColors?: string[];
  /**
   * Color gradient for heatmaps.
   * Usually ordered from low value to high value.
   */
  heatmapColors?: string[];
  [key: string]: unknown;
}

export interface ThemeConfig {
  /**
   * Background color of the chart container.
   */
  backgroundColor: string;
  /**
   * Primary text color.
   */
  textColor: string;
  /**
   * Secondary text color.
   */
  textColorSecondary?: string;
  /**
   * Tertiary text color.
   */
  textColorTertiary?: string;
  /**
   * Border color for chart elements.
   */
  borderColor: string;
  /**
   * Secondary border color.
   */
  borderSecondaryColor?: string;
  /**
   * Color of the grid lines.
   */
  gridColor: string;
  /**
   * Color of the axis lines.
   */
  axisLineColor: string;
  /**
   * Color of the axis pointer lines.
   */
  axisPointerColor: string;
  /**
   * Color of the axis labels.
   */
  axisLabelColor: string;
  /**
   * Color of the split lines (if different from grid lines).
   */
  splitLineColor?: string;
  /**
   * Background color of the tooltip.
   */
  tooltipBackgroundColor: string;
  /**
   * Text color of the tooltip.
   */
  tooltipTextColor: string;
  /**
   * Border color of the tooltip.
   */
  tooltipBorderColor: string;
  /**
   * Box shadow of the tooltip.
   */
  tooltipBoxShadow: string;
  /**
   * Color of the series name in the tooltip.
   */
  tooltipSeriesNameColor: string;
  /**
   * Color of the sub-item name in the tooltip.
   */
  tooltipSubitemNameColor: string;
  /**
   * Color of the value in the tooltip.
   */
  tooltipValueColor: string;
  /**
   * Text color of the legend.
   */
  legendTextColor: string;
  /**
   * Text color for labels on the series.
   */
  textColorOnSeries?: string;
  /**
   * Primary brand color.
   */
  primaryColor?: string;
  /**
   * Text color on primary background.
   */
  primaryTextColor?: string;
  /**
   * Base shadow color.
   */
  shadowColor: string;
  /**
   * Mask color (e.g. for loading state).
   */
  maskColor: string;
  /**
   * Base decal color.
   */
  decalColor: string;
  /**
   * Series color palette.
   */
  seriesColors: string[];
  /**
   * Color palette (alias for seriesColors).
   */
  color?: string[];
  /**
   * Heatmap color gradient.
   */
  heatmapColors?: string[];
  /**
   * Page fill color.
   */
  fillPageColor?: string;
  /**
   * Container fill color.
   */
  fillContainerColor?: string;
  /**
   * Alternate container fill color.
   */
  fillContainerAltColor?: string;
  /**
   * Hover fill color.
   */
  fillHoverColor?: string;
  /**
   * Code block background color.
   */
  codeBackgroundColor?: string;
  /**
   * Code block gutter background color.
   */
  codeGutterBackgroundColor?: string;
  /**
   * Code block text color.
   */
  codeTextColor?: string;
  /**
   * Code block gutter text color.
   */
  codeGutterTextColor?: string;
  /**
   * Font family.
   */
  fontFamily: string;
  /**
   * Font size.
   */
  fontSize: number;
  /**
   * The raw theme token object.
   */
  token: ThemeToken;
  [key: string]: any;
}

export interface LocaleConfig {
  [key: string]: any;
}

export interface DataURLOpts {
  /** Export image type */
  type?: 'png' | 'jpeg' | 'svg';
  /** Resolution ratio, defaults to window.devicePixelRatio */
  pixelRatio?: number;
  /** Background color */
  backgroundColor?: string;
  /** Image quality (0..1) for jpeg */
  quality?: number;
}

export interface EventData {
  /** Event type string */
  type?: string;
  [key: string]: any;
}

export type EventCallback = (event: EventData) => void;

export interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

export interface BoundingRect {
  /** X coordinate of top-left corner */
  x: number;
  /** Y coordinate of top-left corner */
  y: number;
  /** Width of the rectangle */
  width: number;
  /** Height of the rectangle */
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
  /**
   * Main title text.
   * Supports `\n` for newlines.
   */
  text?: string;
  /**
   * Subtitle text.
   * Displayed below the main title.
   */
  subtext?: string;
  /**
   * Horizontal position of the title.
   * - 'left', 'center', 'right'
   * - number (pixels from left)
   * - string (e.g. '20%')
   */
  left?: string | number;
  /**
   * Vertical position of the title.
   * - 'top', 'middle', 'bottom'
   * - number (pixels from top)
   * - string (e.g. '20%')
   */
  top?: string | number;
  /**
   * Style of the main title text.
   */
  textStyle?: TextStyle;
  /**
   * Style of the subtitle text.
   */
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
  /**
   * Whether to show the tooltip.
   */
  show?: boolean;
  /**
   * Trigger type.
   * - 'item': Triggered by data items (scatter, pie).
   * - 'axis': Triggered by axes (line, bar).
   * - 'none': Not triggered by mouse events.
   */
  trigger?: 'item' | 'axis' | 'none';
  /**
   * Preset visual size style.
   */
  size?: 'medium-small' | 'small' | 'medium';
  /**
   * Configuration for the axis pointer (the indicator shown when hovering).
   */
  axisPointer?: {
    type?: 'line' | 'shadow' | 'none';
    lineStyle?: LineStyleOption;
    shadowStyle?: ItemStyleOption;
  };
  /**
   * Content formatter.
   * Can be a string template or a callback function.
   *
   * - With `trigger: 'item'`, `params` is usually a single object.
   * - With `trigger: 'axis'`, `params` is usually an array (multiple series at the same axis point).
   *
   * The `params` object typically contains:
   * `seriesName`, `name` (data name), `value`, `color`, etc.
   */
  formatter?: string | ((params: any) => string);
  /**
   * Background color of the tooltip container.
   */
  backgroundColor?: string;
  /**
   * Border color of the tooltip container.
   */
  borderColor?: string;
  /**
   * Border width of the tooltip container.
   */
  borderWidth?: number;
  /**
   * Border radius of the tooltip container.
   */
  borderRadius?: number;
  /**
   * Padding of the tooltip container.
   * [top, right, bottom, left]
   */
  padding?: number | number[];
  /**
   * Text style for the tooltip content.
   */
  textStyle?: TextStyle;
  /**
   * Extra CSS text to append to the tooltip's DOM element.
   * (Only works when renderMode is 'html')
   */
  extraCssText?: string;
  /**
   * Custom CSS class name for the tooltip container.
   */
  className?: string;
  /**
   * Whether to append the tooltip DOM to document.body.
   * Useful when the chart container has overflow:hidden.
   */
  appendToBody?: boolean;
  /**
   * Whether to confine the tooltip within the chart container.
   */
  confine?: boolean;
  /**
   * Transition duration for tooltip movement (in seconds).
   * Note: This might be in seconds or ms depending on implementation, usually 0.4s.
   */
  transitionDuration?: number;
  /**
   * Tooltip position configuration.
   * - 'top', 'left', 'right', 'bottom', 'inside'
   * - [x, y] (absolute position)
   * - Function returning [x, y]
   */
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
  /**
   * Whether to show the tooltip content.
   */
  showContent?: boolean;
  /**
   * Whether to always show the tooltip content.
   */
  alwaysShowContent?: boolean;
  /**
   * Conditions to trigger the tooltip.
   * - 'mousemove': Trigger on mouse move.
   * - 'click': Trigger on mouse click.
   * - 'mousemove|click': Trigger on both.
   * - 'none': Do not trigger.
   */
  triggerOn?: 'mousemove' | 'click' | 'mousemove|click' | 'none';
  /**
   * Delay before showing the tooltip (ms).
   */
  showDelay?: number;
  /**
   * Delay before hiding the tooltip (ms).
   */
  hideDelay?: number;
  /**
   * Whether the mouse can enter the tooltip container.
   */
  enterable?: boolean;
  /**
   * Render mode for the tooltip.
   * - 'html': Render as HTML DOM (default).
   * - 'richText': Render using canvas rich text.
   */
  renderMode?: 'html' | 'richText';
  /**
   * Sorting order of tooltip items.
   */
  order?: 'seriesAsc' | 'seriesDesc' | 'valueAsc' | 'valueDesc';
  /**
   * Layout mode for tooltip content.
   */
  layout?: 'horizontal' | 'vertical' | 'rich';
  /**
   * Custom CSS styles for generated HTML elements.
   * Allows fine-grained control over internal tooltip structure.
   */
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
  /**
   * Text fill color.
   */
  color?: string;
  /**
   * Font style.
   * - 'normal': Standard text.
   * - 'italic': Italic text.
   * - 'oblique': Oblique text.
   */
  fontStyle?: 'normal' | 'italic' | 'oblique';
  /**
   * Font weight.
   * - 'normal': Standard weight (400).
   * - 'bold': Bold weight (700).
   * - 'bolder': Heavier than inherited.
   * - 'lighter': Lighter than inherited.
   * - number: Specific weight (e.g. 100, 200, 300, etc.).
   */
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  /**
   * Font family.
   * @example 'Arial, Verdana, sans-serif'
   */
  fontFamily?: string;
  /**
   * Font size in pixels.
   */
  fontSize?: number;
  /**
   * Horizontal alignment.
   * - 'left': Align left.
   * - 'center': Align center.
   * - 'right': Align right.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Vertical alignment.
   * - 'top': Align top.
   * - 'middle': Align middle.
   * - 'bottom': Align bottom.
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * Line height in pixels.
   */
  lineHeight?: number;
  /**
   * Width of the text block.
   */
  width?: number;
  /**
   * Height of the text block.
   */
  height?: number;
  /**
   * Color of the text border (stroke).
   */
  textBorderColor?: string;
  /**
   * Width of the text border (stroke).
   */
  textBorderWidth?: number;
  /**
   * Color of the text shadow.
   */
  textShadowColor?: string;
  /**
   * Blur radius of the text shadow.
   */
  textShadowBlur?: number;
  /**
   * X offset of the text shadow.
   */
  textShadowOffsetX?: number;
  /**
   * Y offset of the text shadow.
   */
  textShadowOffsetY?: number;
  /**
   * Text overflow handling.
   * - 'truncate': Truncate with ellipsis.
   * - 'break': Break words.
   * - 'breakAll': Break all characters.
   */
  overflow?: 'truncate' | 'break' | 'breakAll';
  /**
   * String to use for ellipsis when overflow is 'truncate'.
   * @default '...'
   */
  ellipsis?: string;
  /**
   * Background color of the text block.
   */
  backgroundColor?: string;
  /**
   * Border color of the text block.
   */
  borderColor?: string;
  /**
   * Border width of the text block.
   */
  borderWidth?: number;
  /**
   * Border radius of the text block.
   */
  borderRadius?: number;
  /**
   * Padding of the text block.
   * [top, right, bottom, left] or number.
   */
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
  /**
   * Whether to show the legend.
   */
  show?: boolean;
  /**
   * Z-index of the legend component (2nd level).
   * Controls vertical stacking order relative to other components.
   */
  z?: number;
  /**
   * Canvas layer z-level (1st level).
   * Elements with different zlevel are placed in different canvas instances.
   */
  zlevel?: number;
  /**
   * Legend data.
   * - `string[]`: simple list of series names.
   * - `Object[]`: detailed configuration for each item.
   *   - `name`: series name.
   *   - `icon`: icon type for this item.
   *   - `textStyle`: text style for this item.
   */
  data?: string[] | { name: string; icon?: string; textStyle?: TextStyle }[];
  /**
   * Distance from left side of container.
   */
  left?: string | number;
  /**
   * Distance from top side of container.
   */
  top?: string | number;
  /**
   * Distance from right side of container.
   */
  right?: string | number;
  /**
   * Distance from bottom side of container.
   */
  bottom?: string | number;
  /**
   * Width of the legend component.
   */
  width?: string | number;
  /**
   * Height of the legend component.
   */
  height?: string | number;
  /**
   * Layout orientation.
   * - 'horizontal': Items are arranged horizontally.
   * - 'vertical': Items are arranged vertically.
   */
  orient?: 'horizontal' | 'vertical';
  /**
   * Render mode for the legend.
   * - 'canvas': Drawn on the canvas (default).
   * - 'html': Rendered as HTML elements (good for accessibility/SEO).
   */
  renderMode?: 'canvas' | 'html';
  /**
   * Custom formatter for legend labels.
   */
  formatter?: string | ((name: string, item: any) => string | string[]);
  /**
   * Table header labels for HTML render mode.
   */
  tableHead?: string[];
  /**
   * Maximum width of a legend item.
   * Text exceeding this width will be truncated.
   */
  itemMaxWidth?: number;
  /**
   * Text alignment within the legend item.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Padding around the legend component.
   * [top, right, bottom, left]
   */
  padding?: number | number[];
  /**
   * Gap between each legend item.
   */
  itemGap?: number;
  /**
   * Width of the legend symbol (icon).
   */
  itemWidth?: number;
  /**
   * Height of the legend symbol (icon).
   */
  itemHeight?: number;
  /**
   * Whether to keep the aspect ratio of the legend symbol.
   */
  symbolKeepAspect?: boolean;
  /**
   * Selection mode.
   * - true: Multiple selection.
   * - 'single': Single selection (radio button behavior).
   * - 'multiple': Multiple selection (checkbox behavior).
   * - false: Selection disabled.
   */
  selectedMode?: boolean | 'single' | 'multiple';
  /**
   * Color of legend items when they are unselected (inactive).
   */
  inactiveColor?: string;
  /**
   * Initial selected state of legend items.
   * Map of series name to boolean.
   */
  selected?: { [name: string]: boolean };
  /**
   * Text style for legend labels.
   */
  textStyle?: TextStyle;
  /**
   * Tooltip configuration for hovering over legend items.
   */
  tooltip?: TooltipOption;
  /**
   * Icon type for legend items.
   * - 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
   * - 'image://url' for images.
   * - 'path://...' for SVG paths.
   */
  icon?: string;
  /**
   * Background color of the legend component.
   */
  backgroundColor?: string;
  /**
   * Border color of the legend component.
   */
  borderColor?: string;
  /**
   * Border width of the legend component.
   */
  borderWidth?: number;
  /**
   * Border radius of the legend component.
   */
  borderRadius?: number | number[];
  /**
   * Shadow blur size.
   */
  shadowBlur?: number;
  /**
   * Shadow color.
   */
  shadowColor?: string;
  /**
   * Shadow X offset.
   */
  shadowOffsetX?: number;
  /**
   * Shadow Y offset.
   */
  shadowOffsetY?: number;
  /**
   * Initial scroll index (for scrollable legends).
   */
  scrollDataIndex?: number;
  /**
   * Gap between page buttons and legend items.
   */
  pageButtonItemGap?: number;
  /**
   * Gap between page buttons.
   */
  pageButtonGap?: number;
  /**
   * Position of page buttons.
   */
  pageButtonPosition?: 'start' | 'end';
  /**
   * Formatter for page info text (e.g. "1/2").
   */
  pageFormatter?: string | Function;
  /**
   * Icons for page buttons.
   */
  pageIcons?: {
    horizontal?: string[];
    vertical?: string[];
  };
  /**
   * Color of page buttons.
   */
  pageIconColor?: string;
  /**
   * Color of inactive page buttons.
   */
  pageIconInactiveColor?: string;
  /**
   * Size of page buttons.
   */
  pageIconSize?: number | number[];
  /**
   * Text style for page info.
   */
  pageTextStyle?: TextStyle;
  /**
   * Whether to enable animation when switching pages.
   */
  animation?: boolean;
  /**
   * Animation duration for legend updates.
   */
  animationDurationUpdate?: number;
  [key: string]: any;
}

export interface GridOption {
  /**
   * Whether to show the grid.
   */
  show?: boolean;
  /**
   * Z-index of the grid component.
   */
  z?: number;
  /**
   * Z-level of the grid component.
   */
  zlevel?: number;
  /**
   * Distance from left side of container.
   */
  left?: string | number;
  /**
   * Distance from top side of container.
   */
  top?: string | number;
  /**
   * Distance from right side of container.
   */
  right?: string | number;
  /**
   * Distance from bottom side of container.
   */
  bottom?: string | number;
  /**
   * Width of the grid.
   * Can be a pixel number or percentage string.
   */
  width?: string | number;
  /**
   * Height of the grid.
   * Can be a pixel number or percentage string.
   */
  height?: string | number;
  /**
   * Whether the grid region contains the axis tick labels.
   * - true: Labels are considered part of the grid area, preventing overflow.
   * - false: Labels might overflow the container.
   */
  containLabel?: boolean;
  /**
   * Background color of the grid area.
   */
  backgroundColor?: string;
  /**
   * Border color of the grid area.
   */
  borderColor?: string;
  /**
   * Border width of the grid area.
   */
  borderWidth?: number;
  /**
   * Tooltip settings for the grid component.
   */
  tooltip?: TooltipOption;
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
  /**
   * Axis type.
   * - 'value': Numerical axis.
   * - 'category': Category axis (requires `data`).
   * - 'time': Time axis.
   * - 'log': Logarithmic axis.
   */
  type?: 'value' | 'category' | 'time' | 'log';
  /**
   * Axis data.
   * Required for 'category' axis.
   * @example ['Mon', 'Tue', 'Wed']
   */
  data?: any[];
  /**
   * Whether to show the axis.
   */
  show?: boolean;
  /**
   * Index of the grid component this axis belongs to.
   * Useful when there are multiple grids.
   */
  gridIndex?: number;
  /**
   * Axis position.
   * - 'top' or 'bottom' for x-axis.
   * - 'left' or 'right' for y-axis.
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Offset from the default position.
   */
  offset?: number;
  /**
   * Name of the axis.
   */
  name?: string;
  /**
   * Location of the axis name.
   */
  nameLocation?: 'start' | 'middle' | 'center' | 'end';
  /**
   * Text style of the axis name.
   */
  nameTextStyle?: TextStyle;
  /**
   * Gap between axis name and axis line.
   */
  nameGap?: number;
  /**
   * Rotation of the axis name (in degrees).
   */
  nameRotate?: number;
  /**
   * Whether to inverse the axis direction.
   */
  inverse?: boolean;
  /**
   * Boundary gap.
   * - For category axis: boolean (true means data is centered in the band).
   * - For value axis: [min, max] (extend the range).
   */
  boundaryGap?: boolean | [string | number, string | number];
  /**
   * Axis label configuration.
   */
  axisLabel?: AxisLabelOption;
  /**
   * Axis line configuration.
   */
  axisLine?: AxisLineOption;
  /**
   * Axis tick configuration.
   */
  axisTick?: AxisTickOption;
  /**
   * Minor tick configuration.
   */
  minorTick?: AxisTickOption;
  /**
   * Split line configuration (grid lines).
   */
  splitLine?: SplitLineOption;
  /**
   * Minor split line configuration.
   */
  minorSplitLine?: SplitLineOption;
  /**
   * Split area configuration (striped background).
   */
  splitArea?: SplitAreaOption;
  /**
   * Minimum value of the axis.
   * - number: Exact value.
   * - 'dataMin': Minimum value in data.
   * - Function: (value) => number.
   */
  min?: number | 'dataMin' | ((value: { min: number; max: number }) => number);
  /**
   * Maximum value of the axis.
   * - number: Exact value.
   * - 'dataMax': Maximum value in data.
   * - Function: (value) => number.
   */
  max?: number | 'dataMax' | ((value: { min: number; max: number }) => number);
  /**
   * Whether to scale the axis to available data.
   * If true, the axis will not force the zero point to be included.
   */
  scale?: boolean;
  /**
   * Number of segments to split the axis into.
   * (Guideline only).
   */
  splitNumber?: number;
  /**
   * Minimum interval between ticks.
   */
  minInterval?: number;
  /**
   * Maximum interval between ticks.
   */
  maxInterval?: number;
  /**
   * Compulsory interval between ticks.
   */
  interval?: number;
  /**
   * Base of logarithm (for type: 'log').
   * @default 10
   */
  logBase?: number;
  /**
   * Whether the axis is silent (ignores mouse events).
   */
  silent?: boolean;
  /**
   * Whether to trigger mouse events on axis labels/name.
   */
  triggerEvent?: boolean;
  /**
   * Z-index of the axis.
   */
  z?: number;
  /**
   * Z-level of the axis.
   */
  zlevel?: number;
  [key: string]: any;
}

export interface AxisTickOption {
  /**
   * Whether to show axis ticks.
   */
  show?: boolean;
  /**
   * Align tick with label.
   * Useful for category axes where the tick should be between categories.
   */
  alignWithLabel?: boolean;
  /**
   * Tick interval.
   * - number: Show every Nth tick.
   * - Function: Custom logic.
   */
  interval?: number | Function;
  /**
   * Place tick inside the axis line.
   */
  inside?: boolean;
  /**
   * Length of the tick line.
   */
  length?: number;
  /**
   * Style of the tick line.
   */
  lineStyle?: LineStyleOption;
}

export interface SplitAreaOption {
  /** Show split area */
  show?: boolean;
  /** Split area interval */
  interval?: number | Function;
  /** Area style */
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
   * Whether to show axis labels.
   */
  show?: boolean;
  /**
   * Text color of the label.
   */
  color?: string;
  /**
   * Font size of the label.
   */
  fontSize?: number;
  /**
   * Rotation angle of the label (in degrees).
   */
  rotate?: number;
  /**
   * Width constraint for the label.
   */
  width?: number;
  /**
   * Overflow behavior when width is set.
   * - 'truncate': Truncate with ellipsis.
   * - 'break': Break words.
   * - 'breakAll': Break all characters.
   */
  overflow?: 'break' | 'breakAll' | 'truncate' | 'none';
  /**
   * Line height of the label.
   */
  lineHeight?: number;
  /**
   * Display interval of the labels.
   * - number: Show every Nth label.
   * - 'auto': Automatically hide overlapping labels.
   * - Function: Custom logic.
   */
  interval?: number | 'auto' | ((index: number, value: string) => boolean);
  /**
   * Label formatter.
   *
   * When `formatter` is a function it receives:
   * - `value`: tick value
   * - `index`: tick index
   */
  formatter?: string | ((value: any, index: number) => string);
  [key: string]: any;
}

export interface AxisLineOption {
  /** Show axis line */
  show?: boolean;
  /** Line style */
  lineStyle?: LineStyleOption;
}

export interface SplitLineOption {
  /** Show split line */
  show?: boolean;
  /** Split line interval */
  interval?: number | 'auto' | Function;
  /** Line style */
  lineStyle?: LineStyleOption;
}

export interface LineStyleOption {
  /** Line color */
  color?: string;
  /** Line width */
  width?: number;
  /** Line type */
  type?: 'solid' | 'dashed' | 'dotted';
  /** Opacity */
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
  /**
   * Series type (explicitly set it to get more accurate IntelliSense).
   * e.g., 'line', 'bar', 'pie'.
   */
  type?: string;
  /**
   * Component ID.
   * Unique identifier for the series component.
   */
  id?: string;
  /**
   * Series name.
   * Used in legend and tooltip.
   */
  name?: string;
  /**
   * Series color.
   * If not set, it will pick from the global palette.
   */
  color?: string;
  /**
   * Z-index of the series.
   */
  z?: number;
  /**
   * Z-level of the series.
   */
  zlevel?: number;
  /**
   * Cursor style when hovering over the series.
   * @default 'pointer'
   */
  cursor?: string;
  /**
   * Whether to show the series.
   */
  show?: boolean;
  /**
   * Item style configuration (normal state).
   */
  itemStyle?: ItemStyleOption;
  /**
   * Label configuration (normal state).
   */
  label?: LabelOption;
  /**
   * Emphasis state configuration (hover state).
   */
  emphasis?: EmphasisOption;
  /**
   * Series data.
   * Can be an array of numbers, or objects with `value` property.
   */
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
  /**
   * Whether to smooth the line.
   * - boolean: true/false.
   * - number: 0 to 1 (degree of smoothness).
   */
  smooth?: boolean | number;
  /**
   * Symbol type.
   * - 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'.
   * - 'image://url'
   * - 'path://...'
   */
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
  /**
   * Symbol size.
   * - number: Single size.
   * - [width, height]: Separate width and height.
   * - Function: (value, params) => number | number[]
   */
  symbolSize?:
    | number
    | number[]
    | ((value: any, params: any) => number | number[]);
  /**
   * Symbol rotation in degrees.
   */
  symbolRotate?: number;
  /**
   * Whether to keep the aspect ratio of the symbol.
   */
  symbolKeepAspect?: boolean;
  /**
   * Symbol offset.
   * [x, y] in pixels or percentages.
   */
  symbolOffset?: [string | number, string | number];
  /**
   * Whether to show symbols on the line.
   * - true: Always show.
   * - false: Only show on hover (if emphasis configured).
   */
  showSymbol?: boolean;
  /**
   * Whether to connect points across null values.
   */
  connectNulls?: boolean;
  /**
   * Step line type.
   * - 'start': Step at the start.
   * - 'middle': Step in the middle.
   * - 'end': Step at the end.
   */
  step?: boolean | 'start' | 'middle' | 'end';
  /**
   * Line style configuration.
   */
  lineStyle?: LineStyleOption;
  /**
   * Area style configuration (for area charts).
   */
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
  /**
   * Stack name.
   * Series with the same stack name will be stacked on top of each other.
   */
  stack?: string;
  /**
   * Bar width.
   * Can be absolute pixel value or percentage relative to bandwidth.
   */
  barWidth?: string | number;
  /**
   * Maximum bar width.
   * Useful when bar width is auto-calculated.
   */
  barMaxWidth?: string | number;
  /**
   * Minimum bar height.
   * Useful to make small values visible.
   */
  barMinHeight?: number;
  /**
   * Gap between bars of different series in the same category.
   * Defaults to '30%'.
   */
  barGap?: string | number;
  /**
   * Gap between bar categories.
   * Defaults to '20%'.
   */
  barCategoryGap?: string | number;
  /**
   * Whether to show background behind bars.
   */
  showBackground?: boolean;
  /**
   * Style of the background.
   */
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
export interface CenterLabelOption {
  /**
   * Whether to show the center label.
   */
  show?: boolean;
  /**
   * Label type.
   * - 'text': Static text (default).
   * - 'percentage': Show percentage of the first data item.
   */
  type?: 'text' | 'percentage';
  /**
   * Label formatter.
   * Supports string template (e.g., '{b}: {c}') or callback function.
   */
  formatter?: string | ((params: any) => string);
  /**
   * Text style.
   */
  style?: TextStyle;
  /**
   * Rich text style.
   */
  rich?: { [key: string]: TextStyle };
}

export interface PieSeriesOption extends BaseSeriesOption {
  type: 'pie' | 'doughnut' | 'half-doughnut';
  /**
   * Radius of the pie chart.
   * - number: Pixel value.
   * - string: Percentage (e.g. '50%').
   * - Array: [innerRadius, outerRadius] for doughnut charts.
   */
  radius?: number | string | (number | string)[];
  /**
   * Center position of the pie chart.
   * [x, y] - can be pixels or percentages.
   * @default ['50%', '50%']
   */
  center?: (number | string)[];
  /**
   * Center label configuration.
   * Only valid for doughnut charts.
   */
  centerLabel?: CenterLabelOption;
  /**
   * Whether to display as Nightingale rose chart.
   * - 'radius': Fan angle is same, radius varies.
   * - 'area': Fan area varies with value.
   */
  roseType?: boolean | 'radius' | 'area';
  /**
   * Whether to enable automatic label layout to avoid overlap.
   */
  avoidLabelOverlap?: boolean;
  /**
   * Whether to still show a sector if all data values are zero.
   */
  stillShowZeroSum?: boolean;
  /**
   * Start angle of the pie chart (in degrees).
   * @default 90 (12 o'clock)
   */
  startAngle?: number;
  /**
   * End angle of the pie chart.
   * Only used if you want a partial pie.
   */
  endAngle?: number;
  /**
   * Minimum angle of a sector.
   * Useful to ensure small values are visible.
   */
  minAngle?: number;
  /**
   * Configuration for the label guide line.
   */
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
  /**
   * Symbol type.
   * Same as LineSeriesOption.symbol.
   */
  symbol?: LineSeriesOption['symbol'];
  /**
   * Symbol size.
   * Same as LineSeriesOption.symbolSize.
   */
  symbolSize?: LineSeriesOption['symbolSize'];
  /**
   * Symbol rotation in degrees.
   */
  symbolRotate?: number;
  /**
   * Whether to keep the aspect ratio of the symbol.
   */
  symbolKeepAspect?: boolean;
  /**
   * Symbol offset.
   * [x, y] in pixels or percentages.
   */
  symbolOffset?: [string | number, string | number];
}

/**
 * Heatmap series (primarily used by `HeatmapChart`).
 *
 * Data is typically an array of `[x, y, value]`.
 */
export interface HeatmapSeriesOption extends BaseSeriesOption {
  type: 'heatmap';
  /**
   * Heatmap data.
   * Array of [x, y, value] points.
   */
  data?: ChartData[];
}

/**
 * 3D bar series (`Bar3DChart`).
 */
export interface Bar3DSeriesOption extends BaseSeriesOption {
  type: 'bar3D';
  /**
   * Stack name.
   */
  stack?: string;
  /**
   * Bar width.
   */
  barWidth?: string | number;
  /**
   * Bar gap.
   */
  barGap?: string | number;
  /**
   * Bar category gap.
   */
  barCategoryGap?: string | number;
}

/**
 * 3D stacked bar series (`StackBar3DChart`).
 */
export interface StackBar3DSeriesOption extends BaseSeriesOption {
  type: 'stackBar3D';
  /**
   * Stack name.
   */
  stack?: string;
  /**
   * Bar width.
   */
  barWidth?: string | number;
  /**
   * Bar gap.
   */
  barGap?: string | number;
  /**
   * Bar category gap.
   */
  barCategoryGap?: string | number;
}

/**
 * Fallback for custom/unsupported series.\n
 * If you use a non-built-in `type`, it falls back to this type to avoid blocking typing.
 */
export interface UnknownSeriesOption extends BaseSeriesOption {
  /** Series type */
  type?: string;
}

export interface GradientColorStop {
  /** Offset (0..1) */
  offset: number;
  /** Color at offset */
  color: string;
}

export interface LinearGradientColor {
  type: 'linear';
  /** Start X (0..1 or pixel) */
  x?: number;
  /** Start Y (0..1 or pixel) */
  y?: number;
  /** End X (0..1 or pixel) */
  x2?: number;
  /** End Y (0..1 or pixel) */
  y2?: number;
  /** Color stops */
  colorStops: GradientColorStop[];
  /** Whether coordinates are global (pixel) */
  global?: boolean;
}

export interface RadialGradientColor {
  type: 'radial';
  /** Center X */
  x?: number;
  /** Center Y */
  y?: number;
  /** Radius */
  r?: number;
  /** Color stops */
  colorStops: GradientColorStop[];
  /** Whether coordinates are global */
  global?: boolean;
}

export type GradientColor = LinearGradientColor | RadialGradientColor;

export interface AreaStyleOption {
  /** Fill color */
  color?: string | GradientColor;
  /** Origin position */
  origin?: 'auto' | 'start' | 'end';
  /** Shadow blur size */
  shadowBlur?: number;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow X offset */
  shadowOffsetX?: number;
  /** Shadow Y offset */
  shadowOffsetY?: number;
  /** Opacity */
  opacity?: number;
}

export interface LabelLineOption {
  /** Show label line */
  show?: boolean;
  /** Show above */
  showAbove?: boolean;
  /** Length of the first segment */
  length?: number;
  /** Length of the second segment */
  length2?: number;
  /** Smoothness */
  smooth?: boolean | number;
  /** Minimum turn angle */
  minTurnAngle?: number;
  /** Line style */
  lineStyle?: LineStyleOption;
}

export interface ItemStyleOption {
  /** Fill color */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border type */
  borderType?: 'solid' | 'dashed' | 'dotted';
  /** Opacity */
  opacity?: number;
  /** Border radius */
  borderRadius?: number | number[];
  [key: string]: any;
}

export interface LabelOption {
  /** Show label */
  show?: boolean;
  /** Show label on hover */
  showOnHover?: boolean;
  /** Label position */
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
  /** Text color */
  color?: string;
  /** Font size */
  fontSize?: number;
  /** Label formatter */
  formatter?: string | ((params: any) => string);
  [key: string]: any;
}

export interface EmphasisOption {
  /** Item style in emphasis state */
  itemStyle?: ItemStyleOption;
  /** Label in emphasis state */
  label?: LabelOption;
  /** Whether to scale */
  scale?: boolean;
  /** Scale size */
  scaleSize?: number;
  /** Focus scope */
  focus?: 'none' | 'self' | 'series';
  /** Blur scope */
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
      /** Data name */
      name?: string;
      /** Data value */
      value: any;
      /** Item style */
      itemStyle?: ItemStyleOption;
      /** Label */
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
  /**
   * Event type.
   *
   * Common values:
   * - `EVENT_TYPE_SHOW_TIP` ('showTip'): Event for triggering tooltip display
   * - 'click', 'mousemove', etc.: Native DOM events
   */
  type: string;
  /** Original event object */
  event?: any;
  /** Component type */
  componentType?: string;
  /** Component index */
  componentIndex?: number;
  /** Series type */
  seriesType?: string;
  /** Series index */
  seriesIndex?: number;
  /** Series name */
  seriesName?: string;
  /** Data name */
  name?: string;
  /** Data index */
  dataIndex?: number;
  /** Data item */
  data?: any;
  /** Data value */
  value?: any;
  [key: string]: any;
}

export interface Coordinate {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

export interface Style {
  fill?: string | CanvasGradient | CanvasPattern;
  stroke?: string | CanvasGradient | CanvasPattern;
  lineWidth?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  opacity?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  [key: string]: any;
}

export interface Transform {
  x?: number;
  y?: number;
  originX?: number;
  originY?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  [key: string]: any;
}
