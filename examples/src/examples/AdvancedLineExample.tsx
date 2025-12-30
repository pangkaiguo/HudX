import React from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const AdvancedLineExample = () => {
  const theme = ThemeManager.getTheme('light');

  const option: ChartOption = {
    title: {
      text: 'Advanced Line Chart with Animation',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'center',
      bottom: 30
    },
    grid: {
      left: 70,
      right: 40,
      top: 80,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true
    },
    yAxis: {
      type: 'value',
      show: true
    },
    series: [
      {
        name: 'Series A',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: theme.seriesColors?.[0] },
        lineStyle: { width: 2 },
        showSymbol: true
      },
      {
        name: 'Series B',
        type: 'line',
        data: [100, 150, 120, 110, 90, 140, 120],
        itemStyle: { color: theme.seriesColors?.[1] },
        lineStyle: { width: 2 },
        showSymbol: true
      },
      {
        name: 'Series C',
        type: 'line',
        data: [80, 120, 100, 140, 110, 100, 90],
        itemStyle: { color: theme.seriesColors?.[2] },
        lineStyle: { width: 2 },
        showSymbol: true
      }
    ],
    animation: true,
    animationDuration: 600,
    animationEasing: 'cubicOut'
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Advanced Line Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth animations on load, Interactive legend (click to toggle), Hover tooltips with data details
      </p>
      <HChart
        option={option}
        width={900}
        height={500}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
};

export default AdvancedLineExample;
