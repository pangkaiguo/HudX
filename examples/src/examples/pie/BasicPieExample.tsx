import React, { useState, useRef } from 'react';
import { HChart } from 'hudx';
import type { ChartOption, HChartRef } from 'hudx';
import { ThemeManager, Theme } from 'hudx';
import type { RenderMode } from 'hudx';

export const BasicPieExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const [isDecal, setIsDecal] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');
  const [roseType, setRoseType] = useState<boolean | 'radius' | 'area'>(false);
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    title: {
      text: 'Pie Chart',
      subtext: roseType ? 'Nightingale Rose Chart' : 'Basic Example',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item'
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      icon: 'rect',
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
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: roseType ? [30, 200] : 200,
        center: ['50%', '55%'],
        roseType: roseType,
        data: [
          { name: 'Direct', value: 335, itemStyle: { color: themeObj.seriesColors?.[0] } },
          { name: 'Email', value: 310, itemStyle: { color: themeObj.seriesColors?.[1] } },
          { name: 'Ads', value: 234, itemStyle: { color: themeObj.seriesColors?.[2] } },
          { name: 'Video', value: 135, itemStyle: { color: themeObj.seriesColors?.[3] } },
          { name: 'Search', value: 148, itemStyle: { color: themeObj.seriesColors?.[4] } }
        ],
        itemStyle: {
          opacity: 0.8,
          borderRadius: roseType ? 5 : 0
        },
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          itemStyle: {
            opacity: 1
          }
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}'
        }
      }
    ],
    animation: true
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = [
        { name: 'Direct', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: themeObj.seriesColors?.[0] } },
        { name: 'Email', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: themeObj.seriesColors?.[1] } },
        { name: 'Ads', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: themeObj.seriesColors?.[2] } },
        { name: 'Video', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: themeObj.seriesColors?.[3] } },
        { name: 'Search', value: Math.floor(Math.random() * 500) + 100, itemStyle: { color: themeObj.seriesColors?.[4] } }
      ];
      chartInstance.setOption({
        series: [{
          data: newData
        }]
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over slices to see details, Click legend to toggle</p>
      <div style={{ marginBottom: 20, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
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
        
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Rose Type:</span>
          <select
            value={String(roseType)}
            onChange={(e) => {
               const val = e.target.value;
               if (val === 'false') setRoseType(false);
               else if (val === 'true') setRoseType(true); // default 'radius' usually but let's see logic
               else setRoseType(val as any);
            }}
            style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd' }}
          >
            <option value="false">None</option>
            <option value="radius">Radius</option>
            <option value="area">Area</option>
          </select>
        </label>
      </div>
      <HChart
        ref={chartRef}
        option={option}
        theme={theme}
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
}

export default BasicPieExample;
