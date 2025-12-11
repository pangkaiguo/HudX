/**
 * Chart - Base chart class
 */
import { Renderer } from '@hudx/core';
export default class Chart {
    constructor(dom, option = {}, renderMode = 'canvas', theme = 'light', locale = 'en') {
        this._width = 0;
        this._height = 0;
        this._renderer = Renderer.init(dom, renderMode, theme, locale);
        this._option = option;
        this._root = this._renderer.getRoot();
        this._init();
    }
    /**
     * Get render mode
     */
    getRenderMode() {
        return this._renderer.getRenderMode();
    }
    /**
     * Set render mode
     */
    setRenderMode(renderMode) {
        this._renderer.setRenderMode(renderMode);
        this._render();
    }
    /**
     * Get theme
     */
    getTheme() {
        return this._renderer.getTheme();
    }
    /**
     * Set theme
     */
    setTheme(theme) {
        this._renderer.setTheme(theme);
        this._render();
    }
    /**
     * Get locale
     */
    getLocale() {
        return this._renderer.getLocale();
    }
    /**
     * Set locale
     */
    setLocale(locale) {
        this._renderer.setLocale(locale);
        this._render();
    }
    /**
     * Get translated text
     */
    t(key, defaultValue) {
        return this._renderer.t(key, defaultValue);
    }
    /**
     * Initialize chart
     */
    _init() {
        this.resize();
        this.setOption(this._option);
    }
    /**
     * Set chart option with advanced options
     */
    setOption(option, notMerge, lazyUpdate) {
        // Handle parameter overloading
        let opts = {
            notMerge: false,
            lazyUpdate: false,
            silent: false
        };
        if (typeof notMerge === 'object') {
            opts = { ...opts, ...notMerge };
        }
        else if (typeof notMerge === 'boolean') {
            opts.notMerge = notMerge;
        }
        if (typeof lazyUpdate === 'boolean') {
            opts.lazyUpdate = lazyUpdate;
        }
        // Merge option
        if (opts.notMerge) {
            this._option = option;
        }
        else {
            this._option = { ...this._option, ...option };
        }
        // Emit event if not silent
        if (!opts.silent) {
            const event = new CustomEvent('optionchanged', {
                detail: { option: this._option }
            });
            this._renderer.getDom().dispatchEvent(event);
        }
        // Render immediately if not lazy update
        if (!opts.lazyUpdate) {
            this._render();
        }
        return this;
    }
    /**
     * Get chart option
     */
    getOption() {
        return { ...this._option };
    }
    /**
     * Resize chart
     */
    resize(width, height) {
        this._renderer.resize(width, height);
        this._width = this._renderer.getWidth();
        this._height = this._renderer.getHeight();
        this._render();
    }
    /**
     * Get width
     */
    getWidth() {
        return this._width;
    }
    /**
     * Get height
     */
    getHeight() {
        return this._height;
    }
    /**
     * Render chart (to be implemented by subclasses)
     */
    _render() {
        this._root.removeAll();
        // To be implemented by subclasses
    }
    /**
     * Add event listener
     */
    on(event, handler) {
        this._renderer.on(event, handler);
    }
    /**
     * Remove event listener
     */
    off(event, handler) {
        this._renderer.off(event, handler);
    }
    /**
     * Dispose chart
     */
    dispose() {
        this._renderer.dispose();
    }
    /**
     * Clear chart (remove all elements)
     */
    clear() {
        this._root.removeAll();
        this._option = {};
        return this;
    }
    /**
     * Check if chart is disposed
     */
    isDisposed() {
        return this._renderer.isDisposed();
    }
    /**
     * Get container DOM element
     */
    getDom() {
        return this._renderer.getDom();
    }
    /**
     * Get Renderer instance
     */
    getRenderer() {
        return this._renderer;
    }
    /**
     * Parse size (number or string like '10%')
     */
    _parseSize(size, defaultSize) {
        if (size === undefined) {
            return defaultSize;
        }
        if (typeof size === 'number') {
            return size;
        }
        if (typeof size === 'string' && size.endsWith('%')) {
            const percent = parseFloat(size) / 100;
            return size.includes('left') || size.includes('right')
                ? this._width * percent
                : this._height * percent;
        }
        return parseFloat(size) || defaultSize;
    }
    /**
     * Get series color
     */
    _getSeriesColor(index) {
        const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
        return colors[index % colors.length];
    }
}
