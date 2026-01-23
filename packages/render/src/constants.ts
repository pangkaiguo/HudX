/**
 * Global constants for Z-ordering
 */

export const Z_BACKGROUND = 0;
export const Z_AXIS = 1;
export const Z_SERIES = 2;
export const Z_LABEL = 4;
export const Z_TITLE = 5;
export const Z_LEGEND = 5;
export const Z_TOOLTIP = 100;

export const COLOR_TRANSPARENT = 'transparent';
export const CSS_PX = 'px';
export const TOOLTIP_DEFAULT_PADDING: [number, number, number, number] = [
  8, 24, 8, 12,
];
export const TOOLTIP_DEFAULT_BORDER_WIDTH = 1;
export const TOOLTIP_DEFAULT_LINE_HEIGHT = 20;
export const TOOLTIP_DOM_Z_INDEX = 9_999_999;
export const TOOLTIP_TRANSITION_BEZIER = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const TOOLTIP_DEFAULT_PADDING_PX = 8;
export const TOOLTIP_DEFAULT_BORDER_RADIUS = 4;
export const TOOLTIP_MARKER_BORDER_RADIUS = 2;

export const DECAL_AUTO_FG_ALPHA = 0.35;
export const DECAL_AUTO_FG_LUMINANCE_THRESHOLD = 0.35;
export const DECAL_DEFAULT_DASH_SEGMENT = 5;
