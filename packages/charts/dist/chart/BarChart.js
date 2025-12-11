/**
 * BarChart - Bar chart implementation
 */
import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain, dataToCoordinate } from '../util/coordinate';
import { Rect, Text, Line } from '@hudx/core';
export default class BarChart extends Chart {
    _render() {
        super._render();
        const option = this._option;
        const series = option.series || [];
        const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
        const yAxis = Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis;
        if (series.length === 0) {
            return;
        }
        // Calculate grid area
        const grid = option.grid || {};
        const gridLeft = this._parseSize(grid.left, 60);
        const gridRight = this._parseSize(grid.right, 20);
        const gridTop = this._parseSize(grid.top, 60);
        const gridBottom = this._parseSize(grid.bottom, 60);
        const plotWidth = this._width - gridLeft - gridRight;
        const plotHeight = this._height - gridTop - gridBottom;
        const plotX = gridLeft;
        const plotY = gridTop;
        // Process each series
        series.forEach((seriesItem, seriesIndex) => {
            if (seriesItem.type !== 'bar') {
                return;
            }
            const data = seriesItem.data || [];
            if (data.length === 0) {
                return;
            }
            // Calculate scales
            const xDomain = calculateDomain(xAxis || {}, data, true);
            const yDomain = calculateDomain(yAxis || {}, data, false);
            const xScale = xAxis?.type === 'category'
                ? createOrdinalScale(xDomain, [plotX, plotX + plotWidth])
                : createLinearScale(xDomain, [plotX, plotX + plotWidth]);
            const yScale = createLinearScale(yDomain, [plotY + plotHeight, plotY]);
            // Calculate bar width
            const barWidth = plotWidth / data.length * 0.6;
            const barGap = plotWidth / data.length * 0.4;
            const seriesCount = series.filter(s => s.type === 'bar').length;
            const barWidthPerSeries = barWidth / seriesCount;
            const barOffset = (seriesIndex - (seriesCount - 1) / 2) * barWidthPerSeries;
            // Create bars
            data.forEach((item, index) => {
                const coord = dataToCoordinate(item, xScale, yScale);
                const itemStyle = seriesItem.itemStyle || {};
                const barColor = itemStyle.color || this._getSeriesColor(seriesIndex);
                const barX = coord.x - barWidth / 2 + barOffset;
                const barY = Math.min(coord.y, plotY + plotHeight);
                const barHeight = Math.abs(coord.y - (plotY + plotHeight));
                const rect = new Rect({
                    shape: {
                        x: barX,
                        y: barY,
                        width: barWidthPerSeries,
                        height: barHeight,
                    },
                    style: {
                        fill: barColor,
                        stroke: itemStyle.borderColor || '#fff',
                        lineWidth: itemStyle.borderWidth || 0,
                    },
                    z: seriesIndex,
                });
                this._root.add(rect);
                // Render label if enabled
                if (seriesItem.label?.show) {
                    const labelText = typeof seriesItem.label?.formatter === 'function'
                        ? seriesItem.label.formatter(item)
                        : String(item.value);
                    const text = new Text({
                        shape: {
                            x: coord.x + barOffset,
                            y: barY - 5,
                            text: labelText,
                        },
                        style: {
                            fontSize: 12,
                            fill: '#666',
                            textAlign: 'center',
                            textBaseline: 'bottom',
                        },
                        z: seriesIndex + 1,
                    });
                    this._root.add(text);
                }
            });
        });
        // Render axes
        this._renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight);
        this._renderer.refresh();
    }
    /**
     * Render axes
     */
    _renderAxes(xAxis, yAxis, plotX, plotY, plotWidth, plotHeight) {
        // X axis
        if (xAxis?.show !== false) {
            const xAxisLine = new Line({
                shape: {
                    x1: plotX,
                    y1: plotY + plotHeight,
                    x2: plotX + plotWidth,
                    y2: plotY + plotHeight,
                },
                style: {
                    stroke: '#ccc',
                    lineWidth: 1,
                },
            });
            this._root.add(xAxisLine);
            if (xAxis?.data && xAxis.data.length > 0) {
                const xScale = xAxis.type === 'category'
                    ? createOrdinalScale(xAxis.data, [plotX, plotX + plotWidth])
                    : createLinearScale([0, xAxis.data.length - 1], [plotX, plotX + plotWidth]);
                xAxis.data.forEach((label, index) => {
                    const x = xScale(index);
                    const text = new Text({
                        shape: {
                            x,
                            y: plotY + plotHeight + 20,
                            text: String(label),
                        },
                        style: {
                            fontSize: 12,
                            fill: '#666',
                            textAlign: 'center',
                            textBaseline: 'top',
                        },
                    });
                    this._root.add(text);
                });
            }
        }
        // Y axis
        if (yAxis?.show !== false) {
            const yAxisLine = new Line({
                shape: {
                    x1: plotX,
                    y1: plotY,
                    x2: plotX,
                    y2: plotY + plotHeight,
                },
                style: {
                    stroke: '#ccc',
                    lineWidth: 1,
                },
            });
            this._root.add(yAxisLine);
        }
    }
}
