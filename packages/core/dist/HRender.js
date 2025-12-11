/**
 * HRender - Main rendering engine class
 * High-performance rendering engine supporting Canvas and SVG modes
 */
import Storage from './Storage';
import Handler from './Handler';
import Group from './Group';
import CanvasPainter from './painter/CanvasPainter';
import SVGPainter from './painter/SVGPainter';
import { ThemeManager } from './theme/ThemeManager';
import { LocaleManager } from './i18n/LocaleManager';
export default class HRender {
    constructor(dom, renderMode = 'canvas', theme = 'light', locale = 'en') {
        this._dom = dom;
        this._storage = new Storage();
        this._root = new Group();
        this._storage.addRoot(this._root);
        this._renderMode = renderMode;
        this._theme = theme;
        this._locale = locale;
        // Create painter based on render mode
        if (renderMode === 'svg') {
            this._painter = new SVGPainter(dom, this._storage);
        }
        else {
            this._painter = new CanvasPainter(dom, this._storage);
        }
        this._handler = new Handler(this._painter, this._storage);
        // Apply theme
        this._applyTheme();
        // Listen to storage changes
        this._root.on('dirty', () => {
            this._painter.markDirty();
        });
    }
    /**
     * Initialize HRender instance
     */
    static init(dom, renderMode = 'canvas', theme = 'light', locale = 'en') {
        let element;
        if (typeof dom === 'string') {
            const found = document.querySelector(dom);
            if (!found) {
                throw new Error(`Element not found: ${dom}`);
            }
            element = found;
        }
        else {
            element = dom;
        }
        return new HRender(element, renderMode, theme, locale);
    }
    /**
     * Get render mode
     */
    getRenderMode() {
        return this._renderMode;
    }
    /**
     * Switch render mode (requires reinitialization)
     */
    setRenderMode(renderMode) {
        if (this._renderMode === renderMode) {
            return;
        }
        // Dispose old painter and handler
        this._handler.dispose();
        this._painter.dispose();
        // Create new painter
        this._renderMode = renderMode;
        if (renderMode === 'svg') {
            this._painter = new SVGPainter(this._dom, this._storage);
        }
        else {
            this._painter = new CanvasPainter(this._dom, this._storage);
        }
        // Recreate handler
        this._handler = new Handler(this._painter, this._storage);
        // Refresh
        this._painter.markDirty();
    }
    /**
     * Add element to root group
     */
    add(element) {
        this._root.add(element);
        this._storage.updateElement(element);
        this._painter.markDirty();
        return this;
    }
    /**
     * Remove element from root group
     */
    remove(element) {
        this._root.remove(element);
        this._storage.removeElement(element);
        this._painter.markDirty();
        return this;
    }
    /**
     * Remove all elements
     */
    removeAll() {
        this._root.removeAll();
        this._storage.clear();
        this._storage.addRoot(this._root);
        this._painter.markDirty();
        return this;
    }
    /**
     * Get element by ID
     */
    getElementById(id) {
        return this._storage.getElementById(id);
    }
    /**
     * Get root group
     */
    getRoot() {
        return this._root;
    }
    /**
     * Resize renderer
     */
    resize(width, height) {
        this._painter.resize(width, height);
        return this;
    }
    /**
     * Refresh/repaint
     */
    refresh() {
        this._painter.markDirty();
        return this;
    }
    /**
     * Flush pending paints immediately
     */
    flush() {
        this._painter.paint();
        return this;
    }
    /**
     * Set background color
     */
    setBackgroundColor(color) {
        if (this._renderMode === 'canvas') {
            const canvas = this._painter.getCanvas?.();
            if (canvas) {
                canvas.style.backgroundColor = color;
            }
        }
        else {
            const svg = this._painter.getSVG?.();
            if (svg) {
                svg.style.backgroundColor = color;
            }
        }
        return this;
    }
    /**
     * Add event listener
     */
    on(event, handler) {
        this._root.on(event, handler);
        return this;
    }
    /**
     * Remove event listener
     */
    off(event, handler) {
        this._root.off(event, handler);
        return this;
    }
    /**
     * Trigger event
     */
    trigger(event, eventData) {
        this._root.trigger(event, eventData);
        return this;
    }
    /**
     * Get width
     */
    getWidth() {
        return this._painter.getWidth();
    }
    /**
     * Get height
     */
    getHeight() {
        return this._painter.getHeight();
    }
    /**
     * Get canvas element (Canvas mode only)
     */
    getCanvas() {
        if (this._painter.getCanvas) {
            return this._painter.getCanvas();
        }
        return undefined;
    }
    /**
     * Get SVG element (SVG mode only)
     */
    getSVG() {
        if (this._painter.getSVG) {
            return this._painter.getSVG();
        }
        return undefined;
    }
    /**
     * Get theme
     */
    getTheme() {
        return this._theme;
    }
    /**
     * Set theme
     */
    setTheme(theme) {
        if (this._theme === theme) {
            return this;
        }
        this._theme = theme;
        this._applyTheme();
        this._painter.markDirty();
        return this;
    }
    /**
     * Get theme configuration
     */
    getThemeConfig() {
        return ThemeManager.getTheme(this._theme);
    }
    /**
     * Get locale
     */
    getLocale() {
        return this._locale;
    }
    /**
     * Set locale
     */
    setLocale(locale) {
        if (this._locale === locale) {
            return this;
        }
        this._locale = locale;
        this._painter.markDirty();
        return this;
    }
    /**
     * Get translated text
     */
    t(key, defaultValue) {
        return LocaleManager.t(this._locale, key, defaultValue);
    }
    /**
     * Apply theme to DOM
     */
    _applyTheme() {
        const themeConfig = ThemeManager.getTheme(this._theme);
        if (this._renderMode === 'canvas') {
            const canvas = this._painter.getCanvas?.();
            if (canvas) {
                canvas.style.backgroundColor = themeConfig.backgroundColor;
            }
        }
        else {
            const svg = this._painter.getSVG?.();
            if (svg) {
                svg.style.backgroundColor = themeConfig.backgroundColor;
            }
        }
    }
    /**
     * Dispose HRender instance
     */
    dispose() {
        this._handler.dispose();
        this._painter.dispose();
        this._storage.clear();
        this._root.off();
    }
}
//# sourceMappingURL=HRender.js.map