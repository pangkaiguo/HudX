import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const BasicBarExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Bar Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c}'
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'rect', symbolSize: 0.4, color: theme.decalColor },
        ]
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'center',
      bottom: 20
    },
    grid: {
      left: 60,
      right: 40,
      top: 40,
      bottom: 60,
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
        name: 'Weekly Data',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: theme.seriesColors?.[0], opacity: 0.8 }
      }
    ],
    animation: true
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);
      chartInstance.setOption({
        series: [{
          data: newData
        }]
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over bars to see values</p>
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
        width={800}
        height={400}
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
}

export default BasicBarExample;
