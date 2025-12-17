/**
 * Core type definitions for HudX rendering engine
 */

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
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  textBaseline?: 'top' | 'middle' | 'bottom' | 'alphabetic';
}

export interface Transform {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  originX?: number;
  originY?: number;
}

export interface ElementOption {
  id?: string;
  name?: string;
  data?: any;
  zlevel?: number;
  z?: number;
  silent?: boolean;
  invisible?: boolean;
  cursor?: string;
  draggable?: boolean;
  progressive?: boolean;
  style?: Style;
  shape?: Record<string, unknown>;
  transform?: Transform;
  clipPath?: any;
  [key: string]: unknown;
}

export interface EventData {
  type: string;
  target?: any;
  topTarget?: any;
  cancelBubble?: boolean;
  offsetX?: number;
  offsetY?: number;
  rX?: number;
  rY?: number;
  originalEvent?: Event;
  [key: string]: unknown;
}

export type EventCallback = (event: EventData) => void;

export interface AnimationOption {
  duration?: number;
  delay?: number;
  easing?: string | ((t: number) => number);
  onUpdate?: (target: Record<string, unknown>, percent: number) => void;
  onComplete?: () => void;
}

/**
 * Rendering mode
 */
export type RenderMode = 'canvas' | 'svg';

/**
 * Theme mode
 */
export type Theme = 'light' | 'dark' | string;

/**
 * Locale
 */
export type Locale = 'en' | 'zh' | 'zh-CN' | 'zh-TW';

/**
 * Theme Token
 */
export interface ThemeToken {
  [key: string]: string | number | string[] | number[];
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  gridColor: string;
  axisLineColor: string;
  axisLabelColor: string;
  seriesColors?: string[];
  color?: string[];
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  legendTextColor: string;
  fontFamily?: string;
  fontSize?: number;
  token?: ThemeToken;
  [key: string]: string | number | string[] | number[] | ThemeToken | undefined;
}

/**
 * Locale configuration
 */
export interface LocaleConfig {
  [key: string]: string;
}

/**
 * Rendering context interface (unified for Canvas and SVG)
 */
export interface RenderingContext {
  // Canvas context methods
  canvas?: HTMLCanvasElement;
  fillStyle?: string | CanvasGradient | CanvasPattern;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  lineWidth?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  globalAlpha?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  font?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  save(): void;
  restore(): void;
  beginPath(): void;
  closePath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
  rect(x: number, y: number, width: number, height: number): void;
  fill(): void;
  stroke(): void;
  fillText(text: string, x: number, y: number): void;
  strokeText(text: string, x: number, y: number): void;
  clip(): void;
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  scale(x: number, y: number): void;
  clearRect(x: number, y: number, width: number, height: number): void;
  fillRect(x: number, y: number, width: number, height: number): void;
  getImageData?(sx: number, sy: number, sw: number, sh: number): ImageData;
  putImageData?(imagedata: ImageData, dx: number, dy: number): void;
  measureText?(text: string): TextMetrics;
  isPointInPath?(x: number, y: number): boolean;
  isPointInStroke?(x: number, y: number): boolean;
  // SVG specific
  svgElement?: SVGElement;
  svgGroup?: SVGGElement;
}

export interface CanvasRenderingContext2D {
  canvas: HTMLCanvasElement;
  fillStyle: string | CanvasGradient | CanvasPattern;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  lineWidth: number;
  lineDash: number[];
  lineDashOffset: number;
  globalAlpha: number;
  shadowBlur: number;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  save(): void;
  restore(): void;
  beginPath(): void;
  closePath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
  rect(x: number, y: number, width: number, height: number): void;
  fill(): void;
  stroke(): void;
  fillText(text: string, x: number, y: number): void;
  strokeText(text: string, x: number, y: number): void;
  clip(): void;
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  scale(x: number, y: number): void;
  clearRect(x: number, y: number, width: number, height: number): void;
  fillRect(x: number, y: number, width: number, height: number): void;
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
  putImageData(imagedata: ImageData, dx: number, dy: number): void;
  measureText(text: string): TextMetrics;
  isPointInPath(x: number, y: number): boolean;
  isPointInStroke(x: number, y: number): boolean;
}

/**
 * SetOption options interface (ECharts compatible)
 */
export interface SetOptionOpts {
  notMerge?: boolean;
  replaceMerge?: string | string[];
  lazyUpdate?: boolean;
  silent?: boolean;
}

/**
 * Resize options interface
 */
export interface ResizeOpts {
  width?: number | string;
  height?: number | string;
  silent?: boolean;
  animation?: {
    duration?: number;
    easing?: string;
  };
}

/**
 * Data URL export options
 */
export interface DataURLOpts {
  type?: 'png' | 'jpg' | 'svg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}

/**
 * Element parent reference interface
 */
export interface ElementWithParent {
  __parent?: any;
}

export interface DecalObject {
  symbol?: 'circle' | 'rect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | string;
  symbolSize?: number;
  symbolKeepAspect?: boolean;
  color?: string;
  backgroundColor?: string;
  dashArrayX?: number[] | number;
  dashArrayY?: number[] | number;
  rotation?: number;
  maxTileWidth?: number;
  maxTileHeight?: number;
}
