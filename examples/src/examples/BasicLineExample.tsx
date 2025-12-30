import React, { useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const BasicLineExample = () => {
  const theme = ThemeManager.getTheme('light');
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Line Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{b}\n{c}'
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'center',
      bottom: 20
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
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: theme.seriesColors?.[0] },
        lineStyle: { width: 2 },
        showSymbol: true,
        emphasis: {
          scale: true,
          itemStyle: { color: theme.seriesColors?.[3] }
        }
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
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ marginBottom: 10 }}>Line Chart</h2>
        <p style={{ color: '#666', fontSize: 14 }}>Hover over data points to see values</p>
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

export default BasicLineExample;
