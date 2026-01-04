/**
 * Chart type definitions
 */

import type { DecalObject } from 'HudX/core';
export type { DecalObject };

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
  [key: string]: any;
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
  /** Layout orientation */
  orient?: 'horizontal' | 'vertical';
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
  /** Axis name */
  name?: string;
  /** Axis data (for category axis) */
  data?: any[];
  /** Minimum value */
  min?: number | 'dataMin';
  /** Maximum value */
  max?: number | 'dataMax';
  /** Axis position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Show axis */
  show?: boolean;
  [key: string]: any;
}

export interface SeriesOption {
  /** Series type (line, bar, pie, etc.) */
  type?: string;
  /** Series name */
  name?: string;
  /** Data points */
  data?: any[];
  /** Index of x-axis to use */
  xAxisIndex?: number;
  /** Index of y-axis to use */
  yAxisIndex?: number;
  /** Item style */
  itemStyle?: ItemStyle;
  /** Line style (for line chart) */
  lineStyle?: LineStyle;
  /** Area style (for area chart) */
  areaStyle?: AreaStyle;
  /** Label configuration */
  label?: LabelOption;
  /** Emphasis state configuration */
  emphasis?: EmphasisOption;
  [key: string]: any;
}

export interface EmphasisOption {
  /** Whether to scale up on hover */
  scale?: boolean;
  /** Scale factor */
  scaleSize?: number;
  /** Emphasis item style */
  itemStyle?: ItemStyle;
  /** Emphasis label style */
  label?: LabelOption;
  // Focus effects
  focus?: 'none' | 'self' | 'series';
  blurScope?: 'coordinateSystem' | 'series' | 'global';
  [key: string]: any;
}

export interface TextStyle {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  [key: string]: any;
}

export interface ItemStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  [key: string]: any;
}

export interface LineStyle {
  color?: string;
  width?: number;
  type?: 'solid' | 'dashed' | 'dotted';
  [key: string]: any;
}

export interface AreaStyle {
  color?: string;
  opacity?: number;
  [key: string]: any;
}

export interface LabelOption {
  show?: boolean;
  position?: string;
  formatter?: string | ((params: any) => string);
  [key: string]: any;
}

export interface ChartData {
  name?: string;
  value: number | number[];
  [key: string]: any;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface ChartEvent {
  type: string;
  data?: any;
  [key: string]: any;
}

