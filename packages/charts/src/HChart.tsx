/**
 * HChart - React component wrapper for charts
 * Performance optimized with React hooks
 */

import React, {
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  type ChartOption,
  type ChartEvent,
  type RenderMode,
  type Theme,
  type Locale,
  Chart,
} from 'hudx-render';
import LineChart from './chart/LineChart';
import BarChart from './chart/BarChart';
import Bar3DChart from './chart/Bar3DChart';
import StackBar3DChart from './chart/StackBar3DChart';
import PieChart from './chart/PieChart';
import DoughnutChart from './chart/DoughnutChart';
import HalfDoughnutChart from './chart/HalfDoughnutChart';
import ScatterChart from './chart/ScatterChart';

export interface HChartProps {
  /**
   * Chart option (ECharts-style).
   *
   * Tip: explicitly set `type` for each series to get more accurate TS IntelliSense.
   */
  option: ChartOption;
  /**
   * Chart width (px).
   *
   * If omitted, the component uses the container element size.
   */
  width?: number;
  /**
   * Chart height (px).
   *
   * If omitted, the component uses the container element size.
   */
  height?: number;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
  /**
   * Render mode.
   * @default 'svg'
   */
  renderMode?: RenderMode;
  /**
   * Theme.
   *
   * If both `theme` and `mode` are provided, `theme` wins.
   */
  theme?: Theme;
  /**
   * Compatibility field for legacy usage: `mode: 'Light' | 'Dark'`.
   *
   * Internally mapped to `theme: 'light' | 'dark'`.
   */
  mode?: string;
  /**
   * Locale (affects built-in components such as tooltip/legend and `LocaleManager.t`).
   * @default 'en'
   */
  locale?: Locale;
  /**
   * Event bindings (similar to ECharts `on`).
   *
   * @example
   * ```tsx
   * <HChart
   *   option={option}
   *   onEvents={{
   *     click: (e) => console.log(e.seriesName, e.value),
   *     mousemove: (e) => {},
   *   }}
   * />
   * ```
   */
  onEvents?: {
    [eventName: string]: (event: ChartEvent) => void;
  };
  /**
   * Disable merge (same meaning as ECharts `setOption` -> `notMerge`).
   * @default false
   */
  notMerge?: boolean;
  /**
   * Enable lazyUpdate (same meaning as ECharts `setOption` -> `lazyUpdate`).
   * @default false
   */
  lazyUpdate?: boolean;
}

export interface HChartRef {
  /**
   * Get the underlying Chart instance.
   *
   * Useful for low-level APIs (e.g. `getDataURL`, `setRenderMode`).
   */
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
      renderMode = 'svg',
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

      return () => {
        if (chartRef.current) {
          chartRef.current.dispose();
          chartRef.current = null;
        }
      };
    }, [chartType]); // Only recreate on chart type change

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

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }

      chartRef.current.resize(width, height);

      if (typeof width !== 'number' || typeof height !== 'number') {
        chartRef.current.makeResponsive();
      } else {
        chartRef.current.stopResponsive();
      }
    }, [width, height]);

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }
      chartRef.current.setTheme(theme);
    }, [theme]);

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }
      chartRef.current.setLocale(locale);
    }, [locale]);

    useEffect(() => {
      if (!chartRef.current) {
        return;
      }
      chartRef.current.setRenderMode(renderMode);
    }, [renderMode]);

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
