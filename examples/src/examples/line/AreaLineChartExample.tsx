import React, { useRef, useState, useMemo } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const AreaLineChartExample = ({
  theme = 'light',
}: {
  theme?: Theme;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [gridTop, setGridTop] = useState(60);
  const [splitNumber, setSplitNumber] = useState(5);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');
  const [isSmooth, setIsSmooth] = useState(true);

  // Generate more data points (e.g. 100)
  const generateData = (count: number) => {
    const data: string[] = [];
    const valuesA: number[] = [];
    const valuesB: number[] = [];
    const valuesC: number[] = [];

    let baseValue = Math.random() * 100;
    let date = new Date(2023, 0, 1);

    for (let i = 0; i < count; i++) {
      date.setDate(date.getDate() + 1);
      data.push([date.getMonth() + 1, date.getDate()].join('/'));

      baseValue = baseValue + Math.random() * 20 - 10;
      valuesA.push(Math.abs(baseValue) + 50);
      valuesB.push(Math.abs(baseValue) + 20 + Math.random() * 20);
      valuesC.push(Math.abs(baseValue) + 80 + Math.random() * 20);
    }

    return { category: data, valuesA, valuesB, valuesC };
  };

  const initialData = useMemo(() => generateData(30), []);
  const [chartData, setChartData] = useState(initialData);

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
      left: 50,
      right: 40,
      top: gridTop,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      data: chartData.category,
      show: true,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee',
          type: 'dashed',
        },
      },
      axisLabel: {
        // Show fewer labels to avoid clutter
        interval: (index: number) => index % 5 === 0,
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
        },
      },
    },
    series: [
      {
        name: 'Series A',
        type: 'line',
        data: chartData.valuesA,
        itemStyle: { color: themeObj.seriesColors?.[0] },
        lineStyle: { width: 2 },
        showSymbol: false,
        smooth: isSmooth,
        areaStyle: { opacity: 0.3 },
      },
      {
        name: 'Series B',
        type: 'line',
        data: chartData.valuesB,
        itemStyle: { color: themeObj.seriesColors?.[1] },
        lineStyle: { width: 2 },
        showSymbol: false,
        smooth: isSmooth,
        areaStyle: { opacity: 0.3 },
      },
      {
        name: 'Series C',
        type: 'line',
        data: chartData.valuesC,
        itemStyle: { color: themeObj.seriesColors?.[2] },
        lineStyle: { width: 2 },
        showSymbol: false,
        smooth: isSmooth,
        areaStyle: { opacity: 0.3 },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
  };

  const handleUpdateSeries = () => {
    const newData = generateData(30);
    setChartData(newData);
    // Directly updating state will trigger re-render and HChart will update via props
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Area Line Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Large dataset (30 points), Area fill, Smooth curves, Symbol
        hidden by default
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
            checked={isSmooth}
            onChange={(e) => setIsSmooth(e.target.checked)}
          />
          Smooth
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
                max='150'
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
          Update Data (Random 30 points)
        </button>
      </div>
    </div>
  );
};

export default AreaLineChartExample;
