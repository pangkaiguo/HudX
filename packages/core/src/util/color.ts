/**
 * Color utilities
 */

/**
 * Parse color string to rgba array
 */
export const parseColor = (
  color: string,
): [number, number, number, number] | null => {
  if (!color) return null;

  // Hex color
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return [r, g, b, 1];
    } else if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b, 1];
    } else if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      return [r, g, b, a];
    }
  }

  // RGB/RGBA color
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const values = rgbMatch[1].split(",").map((v) => parseFloat(v.trim()));
    if (values.length >= 3) {
      return [
        values[0],
        values[1],
        values[2],
        values[3] !== undefined ? values[3] : 1,
      ];
    }
  }

  // Named colors (basic support)
  const namedColors: Record<string, [number, number, number, number]> = {
    black: [0, 0, 0, 1],
    white: [255, 255, 255, 1],
    red: [255, 0, 0, 1],
    green: [0, 128, 0, 1],
    blue: [0, 0, 255, 1],
    yellow: [255, 255, 0, 1],
    cyan: [0, 255, 255, 1],
    magenta: [255, 0, 255, 1],
    transparent: [0, 0, 0, 0],
  };

  const lowerColor = color.toLowerCase();
  if (namedColors[lowerColor]) {
    return namedColors[lowerColor];
  }

  return null;
};

/**
 * Convert rgba array to color string
 */
export const rgbaToString = (
  rgba: [number, number, number, number],
): string => {
  if (rgba[3] === 1) {
    return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
  }
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
};

/**
 * Lighten color
 */
export const lighten = (color: string, amount: number): string => {
  const rgba = parseColor(color);
  if (!rgba) return color;

  const r = Math.min(255, rgba[0] + amount * 255);
  const g = Math.min(255, rgba[1] + amount * 255);
  const b = Math.min(255, rgba[2] + amount * 255);

  return rgbaToString([r, g, b, rgba[3]]);
};

/**
 * Darken color
 */
export const darken = (color: string, amount: number): string => {
  const rgba = parseColor(color);
  if (!rgba) return color;

  const r = Math.max(0, rgba[0] - amount * 255);
  const g = Math.max(0, rgba[1] - amount * 255);
  const b = Math.max(0, rgba[2] - amount * 255);

  return rgbaToString([r, g, b, rgba[3]]);
};

/**
 * Linear interpolation between two colors
 */
export const lerp = (start: string, end: string, percent: number): string => {
  const startRgba = parseColor(start);
  const endRgba = parseColor(end);

  if (!startRgba || !endRgba) return end;

  const r = Math.round(startRgba[0] + (endRgba[0] - startRgba[0]) * percent);
  const g = Math.round(startRgba[1] + (endRgba[1] - startRgba[1]) * percent);
  const b = Math.round(startRgba[2] + (endRgba[2] - startRgba[2]) * percent);
  const a = startRgba[3] + (endRgba[3] - startRgba[3]) * percent;

  return rgbaToString([r, g, b, a]);
};

/**
 * Lift color (lighten or darken)
 * @param color Color string
 * @param level Level of lift (-1 to 1). Positive for lighten, negative for darken.
 */
export const lift = (color: string, level: number): string => {
  const rgba = parseColor(color);
  if (!rgba) return color;

  if (level > 0) {
    // Lighten
    const r = Math.min(255, rgba[0] + level * 255);
    const g = Math.min(255, rgba[1] + level * 255);
    const b = Math.min(255, rgba[2] + level * 255);
    return rgbaToString([r, g, b, rgba[3]]);
  } else {
    // Darken
    const r = Math.max(0, rgba[0] + level * 255);
    const g = Math.max(0, rgba[1] + level * 255);
    const b = Math.max(0, rgba[2] + level * 255);
    return rgbaToString([r, g, b, rgba[3]]);
  }
};

/**
 * Convert color to hex string
 * toHex('rgba(255, 153,51,0.5)') // '#ff993380'
 * toHex('rgb(255, 153,51)') // '#ff9933'
 * toHex('#ff9933') // '#ff9933' parseColor success, alpha = 1
 * toHex('unknown') // 'unknown' parseColor failed
 */
export const toHex = (color: string): string => {
  const rgba = parseColor(color);
  if (!rgba) return color;

  const r = Math.round(rgba[0]).toString(16).padStart(2, "0");
  const g = Math.round(rgba[1]).toString(16).padStart(2, "0");
  const b = Math.round(rgba[2]).toString(16).padStart(2, "0");

  if (rgba[3] < 1) {
    const a = Math.round(rgba[3] * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${b}${a}`;
  }

  return `#${r}${g}${b}`;
};

/**
 * Parse color with opacity
 * toRgbaWithOpacity('#ff9933', 0.6) // 'rgba(255, 153, 51, 0.6)'
 * toRgbaWithOpacity('rgba(255, 153, 51, 0.5)', 0.6) // 'rgba(255, 153, 51, 0.6)'
 * toRgbaWithOpacity('rgb(255, 153, 51)', 0.6) // 'rgba(255, 153, 51, 0.6)'
 * toRgbaWithOpacity('unknown', 0.6) // 'unknown' parseColor failed
 * toRgbaWithOpacity('red', 0.6) // 'rgba(255, 0, 0, 0.6)'
 */
export const toRgbaWithOpacity = (color: string, opacity: number): string => {
  const rgba = parseColor(color);
  if (!rgba) return color;

  const [r, g, b, a] = rgba;
  const clampedOpacity = Math.min(1, Math.max(0, opacity));
  const finalA = Math.max(0, Math.min(1, a * clampedOpacity));

  if (finalA === 1 && a === 1) {
    return color;
  }
  return rgbaToString([Math.round(r), Math.round(g), Math.round(b), finalA]);
};
