import React, { useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const BasicLineExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;
  const chartRef = useRef<HChartRef>(null);
  const [showGrid, setShowGrid] = React.useState(false);
  const [gridTop, setGridTop] = React.useState(40);
  const [splitNumber, setSplitNumber] = React.useState(5);
  const [renderMode, setRenderMode] = React.useState<RenderMode>('svg');

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
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
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: themeObj.gridColor,
          type: 'dashed',
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
          color: themeObj.gridColor,
        },
      },
    },
    series: [
      {
        name: 'Weekly Data',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: themeObj.seriesColors?.[0] },
        lineStyle: { width: 1 },
        showSymbol: true,
        emphasis: {
          scale: true,
          itemStyle: { color: themeObj.seriesColors?.[3] },
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
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ marginBottom: 10 }}>Line Chart</h2>
        <p style={{ color: textSecondary, fontSize: 14 }}>
          Hover over data points to see values
        </p>
      </div>
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
              border: `1px solid ${border}`,
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
          border: `1px solid ${border}`,
          borderRadius: 8,
          height: '600px',
        }}
      />
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleUpdateSeries}
          style={{
            padding: '8px 16px',
            backgroundColor: primary,
            color: primaryText,
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

export default BasicLineExample;
