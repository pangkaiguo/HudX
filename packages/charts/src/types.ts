/**
 * Chart type definitions
 */

export interface ChartOption {
  title?: TitleOption;
  tooltip?: TooltipOption;
  legend?: LegendOption;
  grid?: GridOption;
  xAxis?: AxisOption | AxisOption[];
  yAxis?: AxisOption | AxisOption[];
  series?: SeriesOption[];
  backgroundColor?: string;
  animation?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  [key: string]: any;
}

export interface TitleOption {
  text?: string;
  subtext?: string;
  left?: string | number;
  top?: string | number;
  textStyle?: TextStyle;
  subtextStyle?: TextStyle;
  [key: string]: any;
}

export interface TooltipOption {
  show?: boolean;
  trigger?: 'item' | 'axis' | 'none';
  formatter?: string | ((params: any) => string);
  [key: string]: any;
}

export interface LegendOption {
  show?: boolean;
  data?: string[];
  left?: string | number;
  top?: string | number;
  orient?: 'horizontal' | 'vertical';
  [key: string]: any;
}

export interface GridOption {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
  containLabel?: boolean;
  [key: string]: any;
}

export interface AxisOption {
  type?: 'value' | 'category' | 'time' | 'log';
  name?: string;
  data?: any[];
  min?: number | 'dataMin';
  max?: number | 'dataMax';
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
  [key: string]: any;
}

export interface SeriesOption {
  type: string;
  name?: string;
  data?: any[];
  xAxisIndex?: number;
  yAxisIndex?: number;
  itemStyle?: ItemStyle;
  lineStyle?: LineStyle;
  areaStyle?: AreaStyle;
  label?: LabelOption;
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

