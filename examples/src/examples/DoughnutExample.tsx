import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const DoughnutExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Doughnut Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'circle', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'rect', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'triangle', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'diamond', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'pin', symbolSize: 0.4, color: theme.decalColor },
          { symbol: 'arrow', symbolSize: 0.4, color: theme.decalColor }
        ]
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['40%', '70%'],
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent'
        },
        emphasis: {
          scale: true,
          scaleSize: 1.02,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: theme.shadowColor
          },
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        label: {
          show: false,
          position: 'center',
          formatter: '{b}: {c} ({d}%)'
        }
      }
    ],
    animation: true
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = [
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Search Engine' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Direct' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Email' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Union Ads' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Video Ads' }
      ];
      chartInstance.setOption({
        series: [{
          data: newData
        }]
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Doughnut Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Standard doughnut chart with inner radius configuration
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
        width={800}
        height={500}
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

export default DoughnutExample;
