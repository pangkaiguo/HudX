// Core rendering engine exports
export { default as Renderer } from './Renderer';
export { default as Chart } from './Chart';
export { default as ChartElement } from './ChartElement';
export { default as Group } from './Group';
export { default as Storage } from './Storage';
export { default as Handler } from './Handler';

// Painter exports
export type { default as IPainter } from './painter/IPainter';
export { default as CanvasPainter } from './painter/CanvasPainter';
export { default as SVGPainter } from './painter/SVGPainter';

// Shape exports
export { default as Circle, type CircleShape } from './graphic/Circle';
export { default as Rect, type RectShape } from './graphic/Rect';
export { default as Line, type LineShape } from './graphic/Line';
export { default as Path, type PathShape } from './graphic/Path';
export { default as Text, type TextShape } from './graphic/Text';
export { default as Polygon, type PolygonShape } from './graphic/Polygon';
export { default as Polyline, type PolylineShape } from './graphic/Polyline';
export { default as Arc, type ArcShape } from './graphic/Arc';
export { default as BezierCurve, type BezierCurveShape } from './graphic/BezierCurve';
export { default as Sector, type SectorShape } from './graphic/Sector';
export { default as Image, type ImageShape } from './graphic/Image';

// Animation
export { Animation, Easing } from './animation/Animation';
export { default as Animator } from './animation/Animator';

// Event system
export { default as Eventful } from './mixin/Eventful';

// Types
export type * from './types';

// Utils
export { default as ObjectPool } from './util/ObjectPool';
export { default as BatchUpdater } from './util/BatchUpdater';
export { uuidV4, getUnit32RandomValues } from './util/random';
export * from './util/matrix';
export * from './util/color';
export * from './util/pattern';
export * from './util/coordinate';
export * from './util/curve';
export * from './util/symbol';
export { EventHelper } from './util/EventHelper';

// Theme and i18n
export { ThemeManager } from './theme/ThemeManager';
export { LocaleManager } from './i18n/LocaleManager';

// Components
export { default as Tooltip } from './component/Tooltip';
export { default as Legend } from './component/Legend';
export { default as Title } from './component/Title';

// Constants
export * from './constants';
