import React, { useState, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const DoughnutExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'item',
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
      left: 'left',
      top: 'middle',
      icon: 'rect',
    },
    series: [
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['40%', '70%'],
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent',
        },
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: themeObj.shadowColor,
          },
          label: {
            show: true,
            formatter: '{title|{name}}\n{value|{value}}\n{sub|{desc}}',
          },
        },
        data: [
          { value: 1048, name: 'Search Engine', desc: 'Google, Bing' },
          { value: 735, name: 'Direct', desc: 'Direct URL' },
          { value: 580, name: 'Email', desc: 'Marketing' },
          { value: 484, name: 'Union Ads', desc: 'Partners' },
          { value: 300, name: 'Video Ads', desc: 'Youtube' },
        ],
        centerLabel: {
          show: true,
          formatter:
            '{title|Amount (HKD)}\n{value|999,999}\n{sub|Supporting text}',
          rich: {
            title: {
              fontSize: 14,
              color: '#999',
              fontWeight: 'normal',
              padding: [0, 0, 4, 0],
            },
            value: {
              fontSize: 24,
              color: '#333',
              fontWeight: 'bold',
              padding: [4, 0, 4, 0],
            },
            sub: {
              fontSize: 12,
              color: '#aaa',
              fontWeight: 'normal',
              padding: [4, 0, 0, 0],
            },
          },
        },
        label: {
          show: false,
          position: 'center',
          formatter: '{b}: {c} ({d}%)',
        },
      },
    ],
    animation: true,
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = [
        {
          value: Math.floor(Math.random() * 1000) + 200,
          name: 'Search Engine',
        },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Direct' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Email' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Union Ads' },
        { value: Math.floor(Math.random() * 1000) + 200, name: 'Video Ads' },
      ];
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
      <h2 style={{ marginBottom: 10 }}>Doughnut Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Standard doughnut chart with inner radius configuration
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

export default DoughnutExample;
