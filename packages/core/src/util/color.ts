/**
 * Color utilities
 * Similar to hrender's color utilities
 */

/**
 * Parse color string to rgba array
 */
export function parseColor(color: string): [number, number, number, number] | null {
  if (!color) return null;

  // Hex color
  if (color.startsWith('#')) {
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
    const values = rgbMatch[1].split(',').map(v => parseFloat(v.trim()));
    if (values.length >= 3) {
      return [
        values[0],
        values[1],
        values[2],
        values[3] !== undefined ? values[3] : 1
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
    transparent: [0, 0, 0, 0]
  };

  const lowerColor = color.toLowerCase();
  if (namedColors[lowerColor]) {
    return namedColors[lowerColor];
  }

  return null;
}

/**
 * Convert rgba array to color string
 */
export function rgbaToString(rgba: [number, number, number, number]): string {
  if (rgba[3] === 1) {
    return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
  }
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

/**
 * Lighten color
 */
export function lighten(color: string, amount: number): string {
  const rgba = parseColor(color);
  if (!rgba) return color;

  const r = Math.min(255, rgba[0] + amount * 255);
  const g = Math.min(255, rgba[1] + amount * 255);
  const b = Math.min(255, rgba[2] + amount * 255);

  return rgbaToString([r, g, b, rgba[3]]);
}

/**
 * Darken color
 */
export function darken(color: string, amount: number): string {
  const rgba = parseColor(color);
  if (!rgba) return color;

  const r = Math.max(0, rgba[0] - amount * 255);
  const g = Math.max(0, rgba[1] - amount * 255);
  const b = Math.max(0, rgba[2] - amount * 255);

  return rgbaToString([r, g, b, rgba[3]]);
}

/**
 * Adjust opacity
 */
export function adjustOpacity(color: string, opacity: number): string {
  const rgba = parseColor(color);
  if (!rgba) return color;

  return rgbaToString([rgba[0], rgba[1], rgba[2], opacity]);
}

