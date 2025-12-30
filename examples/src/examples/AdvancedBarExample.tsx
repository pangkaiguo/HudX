import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const AdvancedBarExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Advanced Bar Chart with Animation',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis' // Ideally we want axis trigger, but item is supported for now
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'rect', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'circle', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'triangle', symbolSize: 0.4, color: theme.decalColor }
        ]
      }
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
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
      show: true
    },
    yAxis: {
      type: 'value',
      show: true
    },
    series: [
      {
        name: 'Product A',
        type: 'bar',
        data: [320, 332, 301, 334],
        itemStyle: { color: theme.seriesColors?.[0] }
      },
      {
        name: 'Product B',
        type: 'bar',
        data: [220, 182, 191, 234],
        itemStyle: { color: theme.seriesColors?.[1] }
      },
      {
        name: 'Product C',
        type: 'bar',
        data: [150, 232, 201, 154],
        itemStyle: { color: theme.seriesColors?.[2] }
      }
    ],
    animation: true,
    animationDuration: 600,
    animationEasing: 'cubicOut'
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data for all 3 series
      const newDataA = Array.from({ length: 4 }, () => Math.floor(Math.random() * 400) + 100);
      const newDataB = Array.from({ length: 4 }, () => Math.floor(Math.random() * 400) + 100);
      const newDataC = Array.from({ length: 4 }, () => Math.floor(Math.random() * 400) + 100);

      chartInstance.setOption({
        series: [
          { data: newDataA },
          { data: newDataB },
          { data: newDataC }
        ]
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Advanced Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Staggered bar animations, Interactive legend, Hover tooltips with values
      </p>
      <div style={{ marginBottom: 20 }}>
        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={isDecal}
            onChange={(e) => setIsDecal(e.target.checked)}
          />
          Decal Patterns
        </label>
      </div>
      <HChart
        ref={chartRef}
        option={option}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleUpdateSeries}
          style={{
            padding: '8px 16px',
            backgroundColor: '#5470c6',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Update Data (via getChartInstance)
        </button>
      </div>
    </div>
  );
};

export default AdvancedBarExample;
