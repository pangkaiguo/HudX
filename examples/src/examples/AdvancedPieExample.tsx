import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

export const AdvancedPieExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');
  const theme = ThemeManager.getTheme('light');
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Advanced Pie Chart with Animation',
      left: 'center',
      top: 30
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c} ({d}%)'
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'circle', symbolSize: 0.3, color: theme.decalColor },
          { symbol: 'rect', symbolSize: 0.3, color: theme.decalColor },
          { symbol: 'triangle', symbolSize: 0.3, color: theme.decalColor },
          { symbol: 'diamond', symbolSize: 0.3, color: theme.decalColor },
          { symbol: 'pin', symbolSize: 0.3, color: theme.decalColor },
          { symbol: 'arrow', symbolSize: 0.3, color: theme.decalColor }
        ]
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      icon: 'rect'
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 120,
        center: ['50%', '50%'],
        emphasis: {
          scale: true,
          scaleSize: 1.02
        },
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent'
        },
        data: [
          { name: 'Category A', value: 335, itemStyle: { color: theme.seriesColors?.[0] } },
          { name: 'Category B', value: 310, itemStyle: { color: theme.seriesColors?.[1] } },
          { name: 'Category C', value: 234, itemStyle: { color: theme.seriesColors?.[2] } },
          { name: 'Category D', value: 135, itemStyle: { color: theme.seriesColors?.[3] } },
          { name: 'Category E', value: 148, itemStyle: { color: theme.seriesColors?.[4] } }
        ],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}'
        }
      }
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = [
        { name: 'Category A', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: theme.seriesColors?.[0] } },
        { name: 'Category B', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: theme.seriesColors?.[1] } },
        { name: 'Category C', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: theme.seriesColors?.[2] } },
        { name: 'Category D', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: theme.seriesColors?.[3] } },
        { name: 'Category E', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: theme.seriesColors?.[4] } }
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
      <h2 style={{ marginBottom: 10 }}>Advanced Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth pie slice animations, Percentage display, Interactive legend, Hover tooltips
      </p>
      <div style={{ marginBottom: 20, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Render Mode:</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd' }}
          >
            <option value="canvas">Canvas</option>
            <option value="svg">SVG</option>
          </select>
        </label>

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
        renderMode={renderMode}
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

export default AdvancedPieExample;
