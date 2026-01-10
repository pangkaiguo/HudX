import React, { useState, useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager, Theme } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

export const StackHorizontalBarExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(80);
  const [splitNumber, setSplitNumber] = useState(5);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Stacked Horizontal Bar',
      subtext: 'Data Accumulation',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: gridTop,
      containLabel: true
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
    xAxis: {
      type: 'value',
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
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee'
        }
      }
    },
    series: [
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        label: { show: true },
        emphasis: { focus: 'series' },
        data: [320, 302, 301, 334, 390, 330, 320],
        itemStyle: { borderWidth: 0 }
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        stack: 'total',
        label: { show: true },
        emphasis: { focus: 'series' },
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: { borderWidth: 0 }
      },
      {
        name: 'Affiliate Ad',
        type: 'bar',
        stack: 'total',
        label: { show: true },
        emphasis: { focus: 'series' },
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { borderWidth: 0 }
      },
      {
        name: 'Video Ad',
        type: 'bar',
        stack: 'total',
        label: { show: true },
        emphasis: { focus: 'series' },
        data: [150, 212, 201, 154, 190, 330, 410],
        itemStyle: { borderWidth: 0 }
      },
      {
        name: 'Search Engine',
        type: 'bar',
        stack: 'total',
        label: { show: true },
        emphasis: { focus: 'series' },
        data: [820, 832, 901, 934, 1290, 1330, 1320],
        itemStyle: { borderWidth: 0 }
      }
    ],
    animation: true
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      const seriesCount = 5;
      const newSeriesData = [];

      for (let i = 0; i < seriesCount; i++) {
        const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 300) + 50);
        newSeriesData.push({ data: newData });
      }

      chartInstance.setOption({
        series: newSeriesData
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Stacked Horizontal Bar Chart</h2>
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
              <span>X Split: {splitNumber}</span>
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
        theme={theme}
        renderMode={renderMode}
        style={{ width: '100%', height: '600px', border: '1px solid #e0e0e0', borderRadius: 8 }}
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

export default StackHorizontalBarExample;
