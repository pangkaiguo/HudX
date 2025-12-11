/**
 * LocaleManager - Manages internationalization
 */
import { Locale, LocaleConfig } from '../types';
export declare class LocaleManager {
    private static _locales;
    /**
     * Get locale configuration
     */
    static getLocale(locale: Locale): LocaleConfig;
    /**
     * Get translated text
     */
    static t(locale: Locale, key: string, defaultValue?: string): string;
    /**
     * Register custom locale
     */
    static registerLocale(locale: Locale, config: LocaleConfig): void;
    /**
     * Get all registered locales
     */
    static getLocales(): Locale[];
}
//# sourceMappingURL=LocaleManager.d.ts.map