import React, { useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

export const AdvancedLineExample = () => {
  const theme = ThemeManager.getTheme('light');
  const chartRef = useRef<HChartRef>(null);
  const [showGrid, setShowGrid] = React.useState(false);
  const [gridTop, setGridTop] = React.useState(80);
  const [splitNumber, setSplitNumber] = React.useState(5);
  const [renderMode, setRenderMode] = React.useState<RenderMode>('canvas');

  const option: ChartOption = {
    title: {
      text: 'Advanced Line Chart with Animation',
      subtext: 'Feature Demonstration',
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
      left: 'right',
      top: 20,
      icon: 'rect'
    },
    grid: {
      left: 70,
      right: 40,
      top: gridTop,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      show: true,
      splitNumber: splitNumber,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee'
        }
      }
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

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data for all 3 series
      const newDataA = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);
      const newDataB = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);
      const newDataC = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);

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
      <h2 style={{ marginBottom: 10 }}>Advanced Line Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth animations on load, Interactive legend (click to toggle), Hover tooltips with data details
      </p>
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
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          Show Grid
        </label>

        {showGrid && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Grid Top: {gridTop}</span>
              <input
                type="range"
                min="20"
                max="150"
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
              />
            </div>
          </>
        )}
      </div>
      <HChart
        ref={chartRef}
        option={option}
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

export default AdvancedLineExample;
