import React, { useState } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const AdvancedPieExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');

  const option: ChartOption = {
    title: {
      text: 'Advanced Pie Chart with Animation',
      left: 'center',
      top: 30
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c} ({d}%)'
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'circle', symbolSize: 0.4, color: 'rgba(0, 0, 0, 0.2)' },
          { symbol: 'rect', symbolSize: 0.4, color: 'rgba(0, 0, 0, 0.2)' },
          { symbol: 'triangle', symbolSize: 0.4, color: 'rgba(0, 0, 0, 0.2)' },
          { symbol: 'diamond', symbolSize: 0.4, color: 'rgba(0, 0, 0, 0.2)' },
          { symbol: 'pin', symbolSize: 0.4, color: 'rgba(0, 0, 0, 0.2)' },
          { symbol: 'arrow', symbolSize: 0.4, color: 'rgba(0, 0, 0, 0.2)' }
        ]
      }
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 30
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 120,
        center: ['50%', '50%'],
        emphasis: {
          scale: true,
          scaleSize: 1.02
        },
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent'
        },
        data: [
          { name: 'Category A', value: 335, itemStyle: { color: theme.seriesColors?.[0] } },
          { name: 'Category B', value: 310, itemStyle: { color: theme.seriesColors?.[1] } },
          { name: 'Category C', value: 234, itemStyle: { color: theme.seriesColors?.[2] } },
          { name: 'Category D', value: 135, itemStyle: { color: theme.seriesColors?.[3] } },
          { name: 'Category E', value: 148, itemStyle: { color: theme.seriesColors?.[4] } }
        ],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}'
        }
      }
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Advanced Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth pie slice animations • Percentage display • Interactive legend • Hover tooltips
      </p>
      <div style={{ marginBottom: 20 }}>
        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={isDecal}
            onChange={(e) => setIsDecal(e.target.checked)}
          />
          Enable Accessibility Decal Patterns
        </label>
      </div>
      <HChart
        option={option}
        width={900}
        height={500}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
};

export default AdvancedPieExample;
