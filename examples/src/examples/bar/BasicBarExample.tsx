import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager, Theme } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

export const BasicBarExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(40);
  const [splitNumber, setSplitNumber] = useState(5);
  const [showBackground, setShowBackground] = useState(false);
  const [inverse, setInverse] = useState(false);

  const themeObj = ThemeManager.getTheme(theme);
  const option: ChartOption = {
    title: {
      text: 'Bar Chart',
      subtext: 'Basic Example',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item'
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
          { symbol: 'crosshatch', color: themeObj.decalColor }
        ]
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 20,
      icon: 'rect'
    },
    grid: {
      left: 60,
      right: 40,
      top: gridTop,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true,
      inverse: inverse,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee',
    },
    yAxis: {
      show: true,
      splitNumber: splitNumber,
          type: 'dashed'
        show: showGrid,
        lineStyle: {
          color: '#eee'
        }
      }
    },
    series: [
      {
        name: 'Weekly Data',
        type: 'bar',
          color: '#eee'
        showBackground: showBackground,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: { color: themeObj.seriesColors?.[0], opacity: 0.8, borderWidth: 0 }
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
      <div style={{ marginBottom: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
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

        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          Show Grid
        </label>

        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={showBackground}
            onChange={(e) => setShowBackground(e.target.checked)}
          />
          Background
        </label>

        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={inverse}
            onChange={(e) => setInverse(e.target.checked)}
          />
          Inverse X
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Bar Width: {barWidth}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={barWidth === 'auto' ? 0 : barWidth}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBarWidth(val === 0 ? 'auto' : val);
            }}
            style={{ width: 100 }}
          />
        </div>

        {showGrid && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Grid Top: {gridTop}</span>
              <input
                type="range"
                min="20"
                max="100"
                value={gridTop}
                onChange={(e) => setGridTop(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Y Split: {splitNumber}</span>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={splitNumber}
                onChange={(e) => setSplitNumber(Number(e.target.value))}
                style={{ width: 100 }}
          Update Data (via getChartInstance)
        </button>
      </div>
    </div>
  );
}

export default BasicBarExample;
