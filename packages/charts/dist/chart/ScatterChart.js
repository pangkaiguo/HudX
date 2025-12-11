/**
 * ScatterChart - Scatter chart implementation
 */
import Chart from '../Chart';
import { createLinearScale, createOrdinalScale, calculateDomain, dataToCoordinate } from '../util/coordinate';
import { Circle, Line } from '@hudx/core';
export default class ScatterChart extends Chart {
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
            if (seriesItem.type !== 'scatter') {
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
            // Create scatter points
            const itemStyle = seriesItem.itemStyle || {};
            const pointColor = itemStyle.color || this._getSeriesColor(seriesIndex);
            const pointSize = seriesItem.symbolSize || 10;
            data.forEach((item) => {
                const coord = dataToCoordinate(item, xScale, yScale);
                const circle = new Circle({
                    shape: {
                        cx: coord.x,
                        cy: coord.y,
                        r: pointSize / 2,
                    },
                    style: {
                        fill: pointColor,
                        stroke: '#fff',
                        lineWidth: 1,
                        opacity: itemStyle.opacity || 0.8,
                    },
                    z: seriesIndex,
                });
                this._root.add(circle);
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
//# sourceMappingURL=ScatterChart.js.map