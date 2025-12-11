// Core rendering engine exports
export { default as HRender } from './HRender';
export { default as Renderer } from './HRender'; // Alias for backward compatibility
export { default as Element } from './Element';
export { default as Group } from './Group';
export { default as Storage } from './Storage';
export { default as Handler } from './Handler';

// Painter exports
export type { default as IPainter } from './painter/IPainter';
export { default as CanvasPainter } from './painter/CanvasPainter';
export { default as SVGPainter } from './painter/SVGPainter';

// Shape exports
export { default as Circle } from './shape/Circle';
export { default as Rect } from './shape/Rect';
export { default as Line } from './shape/Line';
export { default as Path } from './shape/Path';
export { default as Text } from './shape/Text';
export { default as Polygon } from './shape/Polygon';
export { default as Polyline } from './shape/Polyline';
export { default as Arc } from './shape/Arc';
export { default as BezierCurve } from './shape/BezierCurve';
export { default as Sector } from './shape/Sector';
export { default as Image } from './shape/Image';

// Animation
export { default as Animation, Easing } from './animation/Animation';
export { default as Animator } from './animation/Animator';

// Event system
export { default as Eventful } from './mixin/Eventful';

// Types
export * from './types';
export type { RenderMode } from './types';

// Utils
export { default as ObjectPool } from './util/ObjectPool';
export { default as BatchUpdater } from './util/BatchUpdater';
export * from './util/matrix';
export * from './util/color';

// Theme and i18n
export { ThemeManager } from './theme/ThemeManager';
export { LocaleManager } from './i18n/LocaleManager';

