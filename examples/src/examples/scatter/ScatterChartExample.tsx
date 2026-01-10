import React, { useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

const ScatterChartExample = () => {
  const chartRef = useRef<HChartRef>(null);
  const theme = ThemeManager.getTheme('light');
  const [showGrid, setShowGrid] = React.useState(true);
  const [gridTop, setGridTop] = React.useState(80);
  const [splitNumber, setSplitNumber] = React.useState(5);
  const [renderMode, setRenderMode] = React.useState<RenderMode>('canvas');

  const option: ChartOption = {
    title: {
      text: 'Scatter Chart',
      subtext: 'Data Distribution',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item',
      layout: 'vertical'
    },
    legend: {
      show: true,
      bottom: 20
    },
    grid: {
      top: gridTop,
      bottom: 60,
      left: 60,
      right: 40
    },
    xAxis: {
      type: 'value',
      name: 'X Axis',
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
      name: 'Y Axis',
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
        name: 'Group A',
        type: 'scatter',
        symbolSize: 12,
        data: [
          [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81],
          [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26],
          [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
        ],
        itemStyle: {
          color: theme.seriesColors?.[0]
        }
      },
      {
        name: 'Group B',
        type: 'scatter',
        symbolSize: 12,
        data: [
          [10.0, 9.14], [8.0, 8.14], [13.0, 8.74], [9.0, 8.77],
          [11.0, 9.26], [14.0, 8.10], [6.0, 6.13], [4.0, 3.10],
          [12.0, 9.13], [7.0, 7.26], [5.0, 4.74]
        ],
        itemStyle: {
          color: theme.seriesColors?.[1]
        }
      }
    ],
    animation: true
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const generateData = () => Array.from({ length: 11 }, () => [
        Number((Math.random() * 15 + 2).toFixed(2)),
        Number((Math.random() * 10 + 2).toFixed(2))
      ]);

      chartInstance.setOption({
        series: [
          { data: generateData() },
          { data: generateData() }
        ]
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: 20, boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ marginBottom: 10 }}>Scatter Chart</h2>
        <p style={{ color: '#666', fontSize: 14 }}>Hover over points to see coordinates</p>
      </div>

      <div style={{ marginBottom: 20, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
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
      </div>

      <div style={{
        width: '100%',
        height: 500,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: 20,
        boxSizing: 'border-box'
      }}>
        <HChart
          ref={chartRef}
          option={option}
          renderMode={renderMode}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

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

export default ScatterChartExample;
