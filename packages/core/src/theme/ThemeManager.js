/**
 * ThemeManager - Manages theme configuration
 */
export class ThemeManager {
    /**
     * Get theme configuration
     */
    static getTheme(theme) {
        return ThemeManager._themes.get(theme) || ThemeManager._themes.get('light');
    }
    /**
     * Register custom theme
     */
    static registerTheme(theme, config) {
        ThemeManager._themes.set(theme, config);
    }
    /**
     * Get all registered themes
     */
    static getThemes() {
        return Array.from(ThemeManager._themes.keys());
    }
}
ThemeManager._themes = new Map();
(() => {
    // Light theme
    ThemeManager._themes.set('light', {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        borderColor: '#cccccc',
        gridColor: '#e6e6e6',
        axisLineColor: '#333333',
        axisLabelColor: '#666666',
        seriesColors: [
            '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
            '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6'
        ],
        tooltipBackgroundColor: 'rgba(50, 50, 50, 0.9)',
        tooltipTextColor: '#ffffff',
        legendTextColor: '#333333',
    });
    // Dark theme
    ThemeManager._themes.set('dark', {
        backgroundColor: '#1e1e1e',
        textColor: '#e0e0e0',
        borderColor: '#444444',
        gridColor: '#2d2d2d',
        axisLineColor: '#888888',
        axisLabelColor: '#aaaaaa',
        seriesColors: [
            '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
            '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6'
        ],
        tooltipBackgroundColor: 'rgba(200, 200, 200, 0.9)',
        tooltipTextColor: '#1e1e1e',
        legendTextColor: '#e0e0e0',
    });
})();
//# sourceMappingURL=ThemeManager.js.map