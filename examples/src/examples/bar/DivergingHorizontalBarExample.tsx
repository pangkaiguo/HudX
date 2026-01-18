import React, { useState, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

const DivergingHorizontalBarExample = ({
  theme = 'light',
}: {
  theme?: Theme;
}) => {
  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const profit = [200, 170, 240, 244, 200, 220, 210];
  const income = [320, 302, 341, 374, 390, 450, 420];
  const expenses = [-120, -132, -101, -134, -190, -230, -210];

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
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
      right: 10,
      top: 10,
    },
    grid: {
      left: '15%',
      right: '4%',
      bottom: '10%',
      top: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        show: showGrid,
        lineStyle: { color: '#eee', type: 'dashed' },
      },
    },
    yAxis: {
      type: 'category',
      data: days,
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: {
        show: showGrid,
        lineStyle: { color: '#eee' },
      },
    },
    series: [
      {
        name: 'Profit',
        type: 'bar',
        data: profit,
        label: { show: true, position: 'inside', formatter: '{c}', color: '#fff' },
        itemStyle: { color: themeObj.seriesColors?.[0], borderWidth: 0 },
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: expenses,
        label: { show: true, position: 'outside', formatter: '{c}' },
        itemStyle: { color: themeObj.seriesColors?.[3] || '#4b4f6a', borderWidth: 0 },
      },
      {
        name: 'Income',
        type: 'bar',
        data: income,
        label: { show: true, position: 'inside', formatter: '{c}', color: '#222' },
        itemStyle: { color: themeObj.seriesColors?.[2], borderWidth: 0 },
      },
    ],
    animation: true,
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      const nextProfit = profit.map(() => Math.floor(Math.random() * 260) + 100);
      const nextIncome = income.map(() => Math.floor(Math.random() * 300) + 200);
      const nextExpenses = expenses.map(
        () => -1 * (Math.floor(Math.random() * 180) + 80),
      );

      chartInstance.setOption({
        series: [{ data: nextProfit }, { data: nextExpenses }, { data: nextIncome }],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Diverging Horizontal Bar</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Positive values extend to the right, negative values extend to the left
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
      </div>

      <HChart
        ref={chartRef}
        option={option}
        theme={theme}
        renderMode={renderMode}
        style={{
          width: '100%',
          height: '600px',
          border: '1px solid #D6D8DA',
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

export default DivergingHorizontalBarExample;
