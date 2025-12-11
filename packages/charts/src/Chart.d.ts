/**
 * Chart - Base chart class
 */
import { HRender, Group, RenderMode, Theme, Locale } from '@hudx/core';
import { ChartOption, ChartEvent } from './types';
export default class Chart {
    protected _renderer: HRender;
    protected _option: ChartOption;
    protected _root: Group;
    protected _width: number;
    protected _height: number;
    constructor(dom: HTMLElement, option?: ChartOption, renderMode?: RenderMode, theme?: Theme, locale?: Locale);
    /**
     * Get render mode
     */
    getRenderMode(): RenderMode;
    /**
     * Set render mode
     */
    setRenderMode(renderMode: RenderMode): void;
    /**
     * Get theme
     */
    getTheme(): Theme;
    /**
     * Set theme
     */
    setTheme(theme: Theme): void;
    /**
     * Get locale
     */
    getLocale(): Locale;
    /**
     * Set locale
     */
    setLocale(locale: Locale): void;
    /**
     * Get translated text
     */
    t(key: string, defaultValue?: string): string;
    /**
     * Initialize chart
     */
    protected _init(): void;
    /**
     * Set chart option
     */
    setOption(option: ChartOption, notMerge?: boolean): void;
    /**
     * Get chart option
     */
    getOption(): ChartOption;
    /**
     * Resize chart
     */
    resize(width?: number, height?: number): void;
    /**
     * Get width
     */
    getWidth(): number;
    /**
     * Get height
     */
    getHeight(): number;
    /**
     * Render chart (to be implemented by subclasses)
     */
    protected _render(): void;
    /**
     * Add event listener
     */
    on(event: string, handler: (event: ChartEvent) => void): void;
    /**
     * Remove event listener
     */
    off(event?: string, handler?: (event: ChartEvent) => void): void;
    /**
     * Dispose chart
     */
    dispose(): void;
    /**
     * Get HRender instance
     */
    getRenderer(): HRender;
    /**
     * Parse size (number or string like '10%')
     */
    protected _parseSize(size: string | number | undefined, defaultSize: number): number;
    /**
     * Get series color
     */
    protected _getSeriesColor(index: number): string;
}
//# sourceMappingURL=Chart.d.ts.map