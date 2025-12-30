import React, { useState } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const BasicPieExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');

  const option: ChartOption = {
    title: {
      text: 'Pie Chart',
      left: 'center',
      top: 25
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c} ({d}%)'
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    aria: {
      show: true,
      decal: {
        show: isDecal,
        decals: [
          {
            symbol: 'rect',
            symbolSize: 0.4,
            color: theme.decalColor,
          }
        ]
      }
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 120,
        center: ['50%', '55%'],
        data: [
          { name: 'Direct', value: 335, itemStyle: { color: theme.seriesColors?.[0] } },
          { name: 'Email', value: 310, itemStyle: { color: theme.seriesColors?.[1] } },
          { name: 'Ads', value: 234, itemStyle: { color: theme.seriesColors?.[2] } },
          { name: 'Video', value: 135, itemStyle: { color: theme.seriesColors?.[3] } },
          { name: 'Search', value: 148, itemStyle: { color: theme.seriesColors?.[4] } }
        ],
        itemStyle: {
          opacity: 0.8
        },
        emphasis: {
          scale: true,
          scaleSize: 1.05,
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

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over slices to see details, Click legend to toggle</p>
      <div style={{ marginBottom: 20 }}>
        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={isDecal}
            onChange={(e) => setIsDecal(e.target.checked)}
          />
          Decal Patterns
        </label>
      </div>
      <HChart
        option={option}
        width={800}
        height={400}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
}

export default BasicPieExample;