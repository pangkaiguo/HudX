import React, { useState, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const StackBarExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(40);
  const [splitNumber, setSplitNumber] = useState(5);
  const [xSplitNumber, setXSplitNumber] = useState(5);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle',
    },
    grid: {
      left: '15%',
      right: '4%',
      bottom: '3%',
      top: gridTop,
      containLabel: true,
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
        ],
      },
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        show: true,
        splitLine: {
          show: showGrid,
          lineStyle: {
            color: '#eee',
            type: 'dashed',
          },
        },
        splitNumber: xSplitNumber,
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: true,
        splitNumber: splitNumber,
        splitLine: {
          show: showGrid,
          lineStyle: {
            color: '#eee',
          },
        },
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390, 330, 320],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Email',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Union Ads',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Video Ads',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190, 330, 410],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Search Engine',
        type: 'bar',
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        emphasis: {
          focus: 'series',
        },
        markLine: {
          lineStyle: {
            type: 'dashed',
          },
          data: [[{ type: 'min' }, { type: 'max' }]],
        },
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Baidu',
        type: 'bar',
        barWidth: 5,
        stack: 'search',
        emphasis: {
          focus: 'series',
        },
        data: [620, 732, 701, 734, 1090, 1130, 1120],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Google',
        type: 'bar',
        stack: 'search',
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 290, 230, 220],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Bing',
        type: 'bar',
        stack: 'search',
        emphasis: {
          focus: 'series',
        },
        data: [60, 72, 71, 74, 190, 130, 110],
        itemStyle: { borderWidth: 0 },
      },
      {
        name: 'Others',
        type: 'bar',
        stack: 'search',
        emphasis: {
          focus: 'series',
        },
        data: [62, 82, 91, 84, 109, 110, 120],
        itemStyle: { borderWidth: 0 },
      },
    ],
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      const seriesCount = 9;
      const newSeriesData = [];

      for (let i = 0; i < seriesCount; i++) {
        const newData = Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 300) + 50,
        );
        newSeriesData.push({ data: newData });
      }

      chartInstance.setOption({
        series: newSeriesData,
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Stack Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Hover over bars to see values
      </p>

      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Render Mode:</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          >
            <option value='canvas'>Canvas</option>
            <option value='svg'>SVG</option>
          </select>
        </label>

        <label
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <input
            type='checkbox'
            checked={isDecal}
            onChange={(e) => setIsDecal(e.target.checked)}
          />
          Decal Patterns
        </label>

        <label
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <input
            type='checkbox'
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
                type='range'
                min='20'
                max='100'
                value={gridTop}
                onChange={(e) => setGridTop(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>X Split: {xSplitNumber}</span>
              <input
                type='range'
                min='2'
                max='10'
                step='1'
                value={xSplitNumber}
                onChange={(e) => setXSplitNumber(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Y Split: {splitNumber}</span>
              <input
                type='range'
                min='2'
                max='10'
                step='1'
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
        style={{
          width: '100%',
          height: '600px',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
        }}
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
            fontSize: 14,
          }}
        >
          Update Data (via getChartInstance)
        </button>
      </div>
    </div>
  );
};

export default StackBarExample;
