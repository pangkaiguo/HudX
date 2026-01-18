import React, { useState, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const GroupBarExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [barGap, setBarGap] = useState<number | string>(30); // Use number for percent, or could be string for px
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(80);
  const [splitNumber, setSplitNumber] = useState(5);
  const [xSplitNumber, setXSplitNumber] = useState(5);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis', // Ideally we want axis trigger, but item is supported for now
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'rect', symbolSize: 0.3, color: themeObj.decalColor },
          { symbol: 'circle', symbolSize: 0.3, color: themeObj.decalColor },
          { symbol: 'triangle', symbolSize: 0.3, color: themeObj.decalColor },
          { symbol: 'diagonal', color: themeObj.decalColor },
          { symbol: 'diagonal-reverse', color: themeObj.decalColor },
        ],
      },
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 20,
      icon: 'rect',
      selectedMode: 'single',
    },
    grid: {
      left: 70,
      right: 40,
      top: gridTop,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
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
    yAxis: {
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
    series: [
      {
        name: 'Product A',
        type: 'bar',
        data: [320, 332, 301, 334],
        itemStyle: { color: themeObj.seriesColors?.[0], borderWidth: 0 },
        barGap: typeof barGap === 'number' ? `${barGap}%` : barGap,
      },
      {
        name: 'Product B',
        type: 'bar',
        data: [220, 182, 191, 234],
        itemStyle: { color: themeObj.seriesColors?.[1], borderWidth: 0 },
        barGap: typeof barGap === 'number' ? `${barGap}%` : barGap,
      },
      {
        name: 'Product C',
        type: 'bar',
        data: [150, 232, 201, 154],
        itemStyle: { color: themeObj.seriesColors?.[2], borderWidth: 0 },
        barGap: typeof barGap === 'number' ? `${barGap}%` : barGap,
      },
    ],
    animation: true,
    animationDuration: 600,
    animationEasing: 'cubicOut',
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data for all 3 series
      const newDataA = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 400) + 100,
      );
      const newDataB = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 400) + 100,
      );
      const newDataC = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 400) + 100,
      );

      chartInstance.setOption({
        series: [{ data: newDataA }, { data: newDataB }, { data: newDataC }],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Group Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Staggered bar animations, Interactive legend, Hover tooltips
        with values
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>
            Bar Gap: {typeof barGap === 'number' ? `${barGap}%` : barGap}
          </span>
          <select
            value={typeof barGap === 'number' ? 'percent' : 'pixel'}
            onChange={(e) => {
              if (e.target.value === 'percent') {
                setBarGap(30); // Reset to default percent
              } else {
                setBarGap('10'); // Default pixel
              }
            }}
            style={{ marginRight: 8 }}
          >
            <option value='percent'>Percent</option>
            <option value='pixel'>Pixel</option>
          </select>

          {typeof barGap === 'number' ? (
            <input
              type='range'
              min='0'
              max='100'
              value={barGap}
              onChange={(e) => setBarGap(Number(e.target.value))}
              style={{ width: 100 }}
            />
          ) : (
            <input
              type='number'
              value={barGap}
              onChange={(e) => setBarGap(e.target.value)}
              style={{ width: 60 }}
            />
          )}
        </div>
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
                max='150'
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
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          height: '600px',
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

export default GroupBarExample;
