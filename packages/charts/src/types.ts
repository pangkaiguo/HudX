/**
 * Chart type definitions
 */

import type { DecalObject } from 'HudX/core';
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
  position?: string | number[] | ((point: number[], params: any, dom: HTMLElement, rect: any, size: any) => number[]);
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
  /** Legend data items */
  data?: string[];
  /** Left position */
  left?: string | number;
  /** Top position */
  top?: string | number;
  /** Right position */
  right?: string | number;
  /** Bottom position */
  bottom?: string | number;
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
  [key: string]: any;
}

export interface GridOption {
  /** Left margin */
  left?: string | number;
  /** Right margin */
  right?: string | number;
  /** Top margin */
  top?: string | number;
  /** Bottom margin */
  bottom?: string | number;
  /** Whether grid area contains label */
  containLabel?: boolean;
  [key: string]: any;
}

export interface AxisOption {
  /** Axis type */
  type?: 'value' | 'category' | 'time' | 'log';
  /** Axis data (for category axis) */
  data?: any[];
  /** Whether to show axis */
  show?: boolean;
  /** Axis position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Axis name */
  name?: string;
  /** Axis label configuration */
  axisLabel?: AxisLabelOption;
  /** Axis line configuration */
  axisLine?: AxisLineOption;
  /** Split line configuration */
  splitLine?: SplitLineOption;
  /** Min value */
  min?: number | 'dataMin' | ((value: { min: number, max: number }) => number);
  /** Max value */
  max?: number | 'dataMax' | ((value: { min: number, max: number }) => number);
  [key: string]: any;
}

export interface AxisLabelOption {
  show?: boolean;
  color?: string;
  fontSize?: number;
  rotate?: number;
  width?: number;
  overflow?: 'break' | 'breakAll' | 'truncate' | 'none';
  lineHeight?: number;
  formatter?: string | ((value: any, index: number) => string);
  [key: string]: any;
}

export interface AxisLineOption {
  show?: boolean;
  lineStyle?: LineStyleOption;
}

export interface SplitLineOption {
  show?: boolean;
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
  name?: string;
  data?: any[];
  stack?: string;
  barGap?: string | number;
  barCategoryGap?: string | number;
  itemStyle?: ItemStyleOption;
  label?: LabelOption;
  emphasis?: EmphasisOption;
  show?: boolean;
  [key: string]: any;
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
  position?: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideBottomLeft' | 'insideTopRight' | 'insideBottomRight' | 'outside' | 'center';
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

export type ChartData = number | number[] | {
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
