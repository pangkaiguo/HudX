import { useState } from 'react';
import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';
import { ThemeManager } from '@HudX/core';

export const DoughnutExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');
  const colors = theme.seriesColors || [];

  const option: ChartOption = {
    title: {
      text: 'Doughnut Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
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
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['40%', '70%'],
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent'
        },
        emphasis: {
          scale: true,
          scaleSize: 1.02,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        label: {
          show: true,
          formatter: '{b}: {d}%'
        }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Doughnut Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Standard doughnut chart with inner radius configuration
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
        width={800}
        height={500}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
};

export default DoughnutExample;
