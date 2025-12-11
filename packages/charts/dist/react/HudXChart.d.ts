/**
 * HudXChart - React component wrapper for charts
 * Performance optimized with React hooks
 */
import React from 'react';
import { ChartOption, ChartEvent } from '../types';
import { RenderMode, Theme, Locale } from '@hudx/core';
export interface HudXChartProps {
    option: ChartOption;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    renderMode?: RenderMode;
    theme?: Theme;
    locale?: Locale;
    onEvents?: {
        [eventName: string]: (event: ChartEvent) => void;
    };
    notMerge?: boolean;
    lazyUpdate?: boolean;
}
declare const HudXChart: React.FC<HudXChartProps>;
export default HudXChart;
