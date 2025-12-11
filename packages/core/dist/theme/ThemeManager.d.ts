/**
 * ThemeManager - Manages theme configuration
 */
import { Theme, ThemeConfig } from '../types';
export declare class ThemeManager {
    private static _themes;
    /**
     * Get theme configuration
     */
    static getTheme(theme: Theme): ThemeConfig;
    /**
     * Register custom theme
     */
    static registerTheme(theme: string, config: ThemeConfig): void;
    /**
     * Get all registered themes
     */
    static getThemes(): string[];
}
