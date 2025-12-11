/**
 * Color utilities
 * Similar to hrender's color utilities
 */
/**
 * Parse color string to rgba array
 */
export declare function parseColor(color: string): [number, number, number, number] | null;
/**
 * Convert rgba array to color string
 */
export declare function rgbaToString(rgba: [number, number, number, number]): string;
/**
 * Lighten color
 */
export declare function lighten(color: string, amount: number): string;
/**
 * Darken color
 */
export declare function darken(color: string, amount: number): string;
/**
 * Adjust opacity
 */
export declare function adjustOpacity(color: string, opacity: number): string;
//# sourceMappingURL=color.d.ts.map