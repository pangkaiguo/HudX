/**
 * HChart - React component wrapper for charts
 * Performance optimized with React hooks
 */

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { ChartOption, ChartEvent } from '../types';
import type { RenderMode, Theme, Locale } from 'hux-core';
import Chart from '../Chart';
import LineChart from '../chart/LineChart';
import BarChart from '../chart/BarChart';
import Bar3DChart from '../chart/Bar3DChart';
import StackBar3DChart from '../chart/StackBar3DChart';
import PieChart from '../chart/PieChart';
import DoughnutChart from '../chart/DoughnutChart';
import HalfDoughnutChart from '../chart/HalfDoughnutChart';
import ScatterChart from '../chart/ScatterChart';

export interface HChartProps {
  /** Chart configuration option */
  option: ChartOption;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** CSS class name */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
  /** Render mode: 'canvas' or 'svg' */
  renderMode?: RenderMode;
  /** Theme: 'light' or 'dark' */
  theme?: Theme;
  /** Mode: 'Light' or 'Dark' (for compatibility) */
  mode?: string;
  /** Locale: 'en', 'zh', etc. */
  locale?: Locale;
  /** Event handlers */
  onEvents?: {
    [eventName: string]: (event: ChartEvent) => void;
  };
  /** Whether to merge option */
  notMerge?: boolean;
  /** Whether to update lazily */
  lazyUpdate?: boolean;
}

export interface HChartRef {
  getChartInstance: () => Chart | null;
}

const HChart = forwardRef<HChartRef, HChartProps>(
  (
    {
      option,
      width,
      height,
      className,
      style,
      renderMode = 'canvas',
      theme: propTheme,
      mode,
      locale = 'en',
      onEvents,
      notMerge = false,
      lazyUpdate = false,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const optionRef = useRef<ChartOption>(option);

    // Determine the effective theme
    const theme = useMemo(() => {
      if (propTheme) {
        return propTheme;
      }
      if (mode) {
        return mode.toLowerCase() === 'dark' ? 'dark' : 'light';
      }
      return 'light';
    }, [propTheme, mode]);

    useImperativeHandle(ref, () => ({
      getChartInstance: () => chartRef.current,
    }));

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

      let ChartClass: typeof Chart;
      switch (chartType) {
        case 'line':
          ChartClass = LineChart;
          break;
        case 'bar':
          ChartClass = BarChart;
          break;
        case 'bar3D':
          ChartClass = Bar3DChart;
          break;
        case 'stackBar3D':
          ChartClass = StackBar3DChart;
          break;
        case 'pie':
          ChartClass = PieChart;
          break;
        case 'doughnut':
          ChartClass = DoughnutChart;
          break;
        case 'half-doughnut':
          ChartClass = HalfDoughnutChart;
          break;
        case 'scatter':
          ChartClass = ScatterChart;
          break;
        default:
          ChartClass = LineChart;
      }

      chartRef.current = new ChartClass(
        containerRef.current,
        option,
        renderMode,
        theme,
        locale,
      );
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
      } else {
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
      handleResize(); // Initial resize

      // Auto resize on window resize if dimensions are not fixed numbers
      if (typeof width !== 'number' || typeof height !== 'number') {
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

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          width: width === undefined ? '100%' : width,
          height: height === undefined ? 300 : height,
          ...style,
        }}
      />
    );
  },
);

HChart.displayName = 'HChart';

export default HChart;
