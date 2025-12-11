import { jsx as _jsx } from "react/jsx-runtime";
/**
 * HudXChart - React component wrapper for charts
 * Performance optimized with React hooks
 */
import { useEffect, useRef, useMemo, useCallback } from 'react';
import LineChart from '../chart/LineChart';
import BarChart from '../chart/BarChart';
import PieChart from '../chart/PieChart';
import ScatterChart from '../chart/ScatterChart';
const HudXChart = ({ option, width, height, className, style, renderMode = 'canvas', theme = 'light', locale = 'en', onEvents, notMerge = false, lazyUpdate = false, }) => {
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const optionRef = useRef(option);
    // Determine chart type from option
    const chartType = useMemo(() => {
        const series = option.series || [];
        if (series.length > 0) {
            return series[0].type || 'line';
        }
        return 'line';
    }, [option.series]);
    // Create chart instance
    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        let ChartClass;
        switch (chartType) {
            case 'line':
                ChartClass = LineChart;
                break;
            case 'bar':
                ChartClass = BarChart;
                break;
            case 'pie':
                ChartClass = PieChart;
                break;
            case 'scatter':
                ChartClass = ScatterChart;
                break;
            default:
                ChartClass = LineChart;
        }
        chartRef.current = new ChartClass(containerRef.current, option, renderMode, theme, locale);
        optionRef.current = option;
        // Bind events
        if (onEvents) {
            Object.keys(onEvents).forEach((eventName) => {
                chartRef.current?.on(eventName, onEvents[eventName]);
            });
        }
        return () => {
            if (chartRef.current) {
                // Unbind events
                if (onEvents) {
                    Object.keys(onEvents).forEach((eventName) => {
                        chartRef.current?.off(eventName, onEvents[eventName]);
                    });
                }
                chartRef.current.dispose();
                chartRef.current = null;
            }
        };
    }, [chartType, renderMode, theme, locale]); // Recreate on chart type, render mode, theme, or locale change
    // Update option
    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        // Use lazy update for performance
        if (lazyUpdate) {
            const timer = setTimeout(() => {
                if (chartRef.current) {
                    chartRef.current.setOption(option, notMerge);
                    optionRef.current = option;
                }
            }, 0);
            return () => clearTimeout(timer);
        }
        else {
            chartRef.current.setOption(option, notMerge);
            optionRef.current = option;
        }
    }, [option, notMerge, lazyUpdate]);
    // Handle resize
    const handleResize = useCallback(() => {
        if (chartRef.current) {
            chartRef.current.resize(width, height);
        }
    }, [width, height]);
    useEffect(() => {
        if (width !== undefined || height !== undefined) {
            handleResize();
        }
        else {
            // Auto resize on window resize
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [width, height, handleResize]);
    // Update events
    useEffect(() => {
        if (!chartRef.current || !onEvents) {
            return;
        }
        // Remove old event listeners
        Object.keys(onEvents).forEach((eventName) => {
            chartRef.current?.off(eventName);
        });
        // Add new event listeners
        Object.keys(onEvents).forEach((eventName) => {
            chartRef.current?.on(eventName, onEvents[eventName]);
        });
    }, [onEvents]);
    return (_jsx("div", { ref: containerRef, className: className, style: {
            width: width || '100%',
            height: height || '400px',
            ...style,
        } }));
};
export default HudXChart;
