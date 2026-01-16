/**
 * Chart type definitions
 */

import type { DecalObject } from 'hux-core';
export type { DecalObject };

// Re-export Scale from coordinate to avoid duplication if it was there,
// but wait, coordinate imports types. Circular?
// Let's remove Scale from here if it causes conflict, or keep it and fix index.ts.
// The error was "Module './types' has already exported a member named 'Scale'".
// I will remove Scale from here and let coordinate.ts be the source of truth if possible.
// But types.ts is often the central place.
// Let's keep Scale here and remove it from coordinate.ts export? No, coordinate defines it.
// I will remove Scale from here.

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
  /** Series list */
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

export interface TitleOption {
  /** Title text */
  text?: string;
  /** Subtitle text */
  subtext?: string;
  /** Left position (pixel or percent) */
  left?: string | number;
  /** Top position (pixel or percent) */
  top?: string | number;
  /** Title text style */
  textStyle?: TextStyle;
  /** Subtitle text style */
  subtextStyle?: TextStyle;
  [key: string]: any;
}

export interface TooltipOption {
  /** Show tooltip */
  show?: boolean;
  /** Trigger type */
  trigger?: 'item' | 'axis' | 'none';
  /** Axis pointer configuration */
  axisPointer?: {
    type?: 'line' | 'shadow' | 'none';
    lineStyle?: LineStyleOption;
    shadowStyle?: ItemStyleOption;
  };
  /** Content formatter */
  formatter?: string | ((params: any) => string);
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
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

export interface LegendOption {
  /** Show legend */
  show?: boolean;
  z?: number;
  zlevel?: number;
  /** Legend data items */
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

export interface SeriesOption {
  type?: string;
  id?: string;
  name?: string;
  color?: string;
  z?: number;
  zlevel?: number;
  data?: any[];
  stack?: string;
  cursor?: string;

  // Bar specific
  barWidth?: string | number;
  barMaxWidth?: string | number;
  barMinHeight?: number;
  barGap?: string | number;
  barCategoryGap?: string | number;
  showBackground?: boolean;
  backgroundStyle?: ItemStyleOption;

  // Line specific
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

  // Pie specific
  radius?: number | string | (number | string)[];
  center?: (number | string)[];
  roseType?: boolean | 'radius' | 'area';
  avoidLabelOverlap?: boolean;
  stillShowZeroSum?: boolean;
  startAngle?: number;
  endAngle?: number;
  minAngle?: number;
  itemStyle?: ItemStyleOption;
  label?: LabelOption;
  labelLine?: LabelLineOption;
  emphasis?: EmphasisOption;
  show?: boolean;

  // Scatter specific
  // Reuses symbol, symbolSize etc.

  [key: string]: any;
}

export interface AreaStyleOption {
  color?: string | any; // Gradient support
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

export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Point = { x: number; y: number };

// Scale interface is defined in coordinate.ts, removing from here to avoid conflict
// export interface Scale { ... }
