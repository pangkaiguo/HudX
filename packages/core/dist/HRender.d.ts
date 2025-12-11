/**
 * HRender - Main rendering engine class
 * High-performance rendering engine supporting Canvas and SVG modes
 */
import Element from './Element';
import Group from './Group';
import { EventData, EventCallback, RenderMode, Theme, Locale, ThemeConfig } from './types';
export default class HRender {
    private _dom;
    private _storage;
    private _painter;
    private _handler;
    private _root;
    private _renderMode;
    private _theme;
    private _locale;
    constructor(dom: HTMLElement, renderMode?: RenderMode, theme?: Theme, locale?: Locale);
    /**
     * Initialize HRender instance
     */
    static init(dom: HTMLElement | string, renderMode?: RenderMode, theme?: Theme, locale?: Locale): HRender;
    /**
     * Get render mode
     */
    getRenderMode(): RenderMode;
    /**
     * Switch render mode (requires reinitialization)
     */
    setRenderMode(renderMode: RenderMode): void;
    /**
     * Add element to root group
     */
    add(element: Element): this;
    /**
     * Remove element from root group
     */
    remove(element: Element): this;
    /**
     * Remove all elements
     */
    removeAll(): this;
    /**
     * Get element by ID
     */
    getElementById(id: string): Element | undefined;
    /**
     * Get root group
     */
    getRoot(): Group;
    /**
     * Resize renderer
     */
    resize(width?: number, height?: number): this;
    /**
     * Refresh/repaint
     */
    refresh(): this;
    /**
     * Flush pending paints immediately
     */
    flush(): this;
    /**
     * Set background color
     */
    setBackgroundColor(color: string): this;
    /**
     * Add event listener
     */
    on(event: string, handler: EventCallback): this;
    /**
     * Remove event listener
     */
    off(event?: string, handler?: EventCallback): this;
    /**
     * Trigger event
     */
    trigger(event: string, eventData?: EventData): this;
    /**
     * Get width
     */
    getWidth(): number;
    /**
     * Get height
     */
    getHeight(): number;
    /**
     * Get canvas element (Canvas mode only)
     */
    getCanvas(): HTMLCanvasElement | undefined;
    /**
     * Get SVG element (SVG mode only)
     */
    getSVG(): SVGSVGElement | undefined;
    /**
     * Get theme
     */
    getTheme(): Theme;
    /**
     * Set theme
     */
    setTheme(theme: Theme): this;
    /**
     * Get theme configuration
     */
    getThemeConfig(): ThemeConfig;
    /**
     * Get locale
     */
    getLocale(): Locale;
    /**
     * Set locale
     */
    setLocale(locale: Locale): this;
    /**
     * Get translated text
     */
    t(key: string, defaultValue?: string): string;
    /**
     * Apply theme to DOM
     */
    private _applyTheme;
    /**
     * Dispose HRender instance
     */
    dispose(): void;
}
//# sourceMappingURL=HRender.d.ts.map