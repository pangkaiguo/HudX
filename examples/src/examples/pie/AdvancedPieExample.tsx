import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager, Theme } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

export const AdvancedPieExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Advanced Pie Chart with Animation',
      subtext: 'Feature Demonstration',
      left: 'center',
      top: 30
    },
    tooltip: {
      show: true,
      trigger: 'item',
      // formatter: '{b}\n{c} ({d}%)'
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'diagonal', color: themeObj.decalColor },
          { symbol: 'dots', color: themeObj.decalColor },
          { symbol: 'diagonal-reverse', color: themeObj.decalColor },
          { symbol: 'checkerboard', color: themeObj.decalColor },
          { symbol: 'crosshatch', color: themeObj.decalColor },
          { symbol: 'rect', color: themeObj.decalColor },
          { symbol: 'circle', color: themeObj.decalColor },
          { symbol: 'triangle', color: themeObj.decalColor },
          { symbol: 'cross', color: themeObj.decalColor },
          { symbol: 'pin', color: themeObj.decalColor },
          { symbol: 'pentagon', color: themeObj.decalColor },
          { symbol: 'arrow', color: themeObj.decalColor }
        ]
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      icon: 'rect',
      // Demonstrating conflict/interaction between width, height and itemWidth
      width: 400,      // Limits the total width. With itemWidth 140, only 1 column fits (2nd column would overflow 200px)
      height: 150,     // Limits height, forcing wrap to 2nd column. But 2nd column is clipped by width.
      itemWidth: 140   // Fixed width for each legend item (icon + text space)
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 200,
        center: ['60%', '50%'],
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          focus: 'self'
        },
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent'
        },
        data: [
          { name: 'Category Label A', value: 335 },
          { name: 'Category Label B', value: 310 },
          { name: 'Category Label C', value: 234 },
          { name: 'Category Label D', value: 135 },
          { name: 'Category Label E', value: 148 },
          { name: 'Category Label F', value: 200 },
          { name: 'Category Label G', value: 180 },
          { name: 'Category Label H', value: 160 },
          { name: 'Category Label I', value: 140 },
          { name: 'Category Label J', value: 120 },
          { name: 'Category Label K', value: 100 },
          { name: 'Category Label L', value: 80 }
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
        { name: 'Category Label A', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label B', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label C', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label D', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label E', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label F', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label G', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label H', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label I', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label J', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label K', value: Math.floor(Math.random() * 500) + 100 },
        { name: 'Category Label L', value: Math.floor(Math.random() * 500) + 100 }
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
        theme={theme}
        renderMode={renderMode}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, height: '600px' }}
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
