import React, { useState, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const BasicBarExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(80);
  const [splitNumber, setSplitNumber] = useState(5);
  const [xInterval, setXInterval] = useState(0);
  const [xAutoInterval, setXAutoInterval] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [inverse, setInverse] = useState(false);
  const [xGridType, setXGridType] = useState<'solid' | 'dashed'>('dashed');
  const [yGridType, setYGridType] = useState<'solid' | 'dashed'>('solid');
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const [barWidth, setBarWidth] = useState<number | 'auto'>('auto');

  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
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
    legend: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 20,
      icon: 'rect',
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
      axisLabel: {
        interval: xAutoInterval ? 'auto' : xInterval,
      },
      splitLine: {
        show: showGrid,
        interval: xAutoInterval ? 'auto' : xInterval,
        lineStyle: {
          color: '#eee',
          type: xGridType,
        },
      },
    },
    yAxis: {
      type: 'value',
      show: true,
      splitNumber: splitNumber,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee',
          type: yGridType,
        },
      },
    },
    series: [
      {
        name: 'Direct',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        barWidth: barWidth === 'auto' ? undefined : barWidth,
        showBackground: showBackground,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        itemStyle: {
          color: themeObj.seriesColors?.[0],
          opacity: 0.8,
          borderWidth: 0,
        },
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        data: [60, 80, 70, 60, 50, 70, 60],
        barWidth: barWidth === 'auto' ? undefined : barWidth,
        showBackground: showBackground,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        itemStyle: {
          color: themeObj.seriesColors?.[1],
          opacity: 0.8,
          borderWidth: 0,
        },
      },
    ],
    animation: true,
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      chartInstance.setOption({
        series: [
          {
            data: newData,
          },
        ],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Bar Chart</h2>
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
            checked={showBackground}
            onChange={(e) => setShowBackground(e.target.checked)}
          />
          Background
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
            checked={inverse}
            onChange={(e) => setInverse(e.target.checked)}
          />
          Inverse X
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Bar Width: {barWidth}</span>
          <input
            type='range'
            min='0'
            max='100'
            step='5'
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
                type='range'
                min='20'
                max='100'
                value={gridTop}
                onChange={(e) => setGridTop(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  checked={xAutoInterval}
                  onChange={(e) => setXAutoInterval(e.target.checked)}
                />
                <span>Auto Interval</span>
              </label>
              {!xAutoInterval && (
                <>
                  <span>Val: {xInterval}</span>
                  <input
                    type='range'
                    min='0'
                    max='3'
                    step='1'
                    value={xInterval}
                    onChange={(e) => setXInterval(Number(e.target.value))}
                    style={{ width: 80 }}
                    title='0: All, 1: Every 2nd, etc.'
                  />
                </>
              )}
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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>X Grid:</span>
              <select
                value={xGridType}
                onChange={(e) =>
                  setXGridType(e.target.value as 'solid' | 'dashed')
                }
                style={{
                  padding: '2px 4px',
                  borderRadius: 4,
                  border: '1px solid #ddd',
                }}
              >
                <option value='solid'>Solid</option>
                <option value='dashed'>Dashed</option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Y Grid:</span>
              <select
                value={yGridType}
                onChange={(e) =>
                  setYGridType(e.target.value as 'solid' | 'dashed')
                }
                style={{
                  padding: '2px 4px',
                  borderRadius: 4,
                  border: '1px solid #ddd',
                }}
              >
                <option value='solid'>Solid</option>
                <option value='dashed'>Dashed</option>
              </select>
            </label>
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

export default BasicBarExample;
