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
  /** Fill color or gradient/pattern */
  fill?: string | CanvasGradient | CanvasPattern;
  /** Text color (alias for fill) */
  color?: string;
  /** Stroke color or gradient/pattern */
  stroke?: string | CanvasGradient | CanvasPattern;
  /** Line width */
  lineWidth?: number;
  /** Line dash pattern [dash, gap] */
  lineDash?: number[];
  /** Line dash offset */
  lineDashOffset?: number;
  /** Opacity (0-1) */
  opacity?: number;
  /** Shadow blur radius */
  shadowBlur?: number;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow horizontal offset */
  shadowOffsetX?: number;
  /** Shadow vertical offset */
  shadowOffsetY?: number;
  /** Text content */
  text?: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: string | number;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Text baseline */
  textBaseline?: 'top' | 'middle' | 'bottom' | 'alphabetic';
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number;
  /** Padding [top, right, bottom, left] or number */
  padding?: number | number[];
  /** Rich text style configuration */
  rich?: Record<string, Style>;
  /** Width of the text block */
  width?: number;
  /** Height of the text block */
  height?: number;
}

export interface Transform {
  /** Translation X */
  x?: number;
  /** Translation Y */
  y?: number;
  /** Scale X */
  scaleX?: number;
  /** Scale Y */
  scaleY?: number;
  /** Rotation in radians */
  rotation?: number;
  /** Transform origin X */
  originX?: number;
  /** Transform origin Y */
  originY?: number;
}

export interface ElementOption {
  /** Unique ID */
  id?: string;
  /** Element name */
  name?: string;
  /** User data */
  data?: any;
  /** Layer index (canvas z-index equivalent) */
  zlevel?: number;
  /** Element stacking order within the same layer */
  z?: number;
  /** Whether the element ignores mouse events */
  silent?: boolean;
  /** Whether the element is invisible */
  invisible?: boolean;
  /** Mouse cursor style */
  cursor?: string;
  /** Whether the element is draggable */
  draggable?: boolean;
  /** Whether to render progressively */
  progressive?: boolean;
  /** Element style */
  style?: Style;
  /** Shape definition */
  shape?: Record<string, unknown>;
  /** Transform properties */
  transform?: Transform;
  /** Clip path element */
  clipPath?: any;
  [key: string]: unknown;
}

export interface EventData {
  /** Event type */
  type: string;
  /** Target element */
  target?: any;
  /** Top-most target element */
  topTarget?: any;
  /** Whether to stop propagation */
  cancelBubble?: boolean;
  /** X coordinate relative to container */
  offsetX?: number;
  /** Y coordinate relative to container */
  offsetY?: number;
  /** X coordinate relative to element */
  rX?: number;
  /** Y coordinate relative to element */
  rY?: number;
  /** Original DOM event */
  originalEvent?: Event;
  [key: string]: unknown;
}

export type EventCallback = (event: EventData) => void;

export interface AnimationOption {
  /** Animation duration in ms */
  duration?: number;
  /** Animation delay in ms */
  delay?: number;
  /** Easing function name or custom function */
  easing?: string | ((t: number) => number);
  /** Callback on each frame */
  onUpdate?: (target: Record<string, unknown>, percent: number) => void;
  /** Callback when animation completes */
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
  shadowColor?: string;
  maskColor?: string;
  decalColor?: string;
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

export interface TitleOption {
  /** Whether to show title */
  show?: boolean;
  /** Title text */
  text?: string;
  /** Subtitle text */
  subtext?: string;
  /** Left position (pixel or percent) */
  left?: string | number;
  /** Top position (pixel or percent) */
  top?: string | number;
  /** Right position (pixel or percent) */
  right?: string | number;
  /** Bottom position (pixel or percent) */
  bottom?: string | number;
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
  /** Gap between title and subtitle */
  itemGap?: number;
  /** Title text style */
  textStyle?: Partial<Style>;
  /** Subtitle text style */
  subtextStyle?: Partial<Style>;
  /** Horizontal alignment of title text */
  textAlign?: 'auto' | 'left' | 'right' | 'center';
  [key: string]: any;
}
