import { useState } from 'react';
import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';
import { ThemeManager } from '@HudX/core';

export const HalfDoughnutExample = () => {
  const [isDecal, setIsDecal] = useState(false);
  const theme = ThemeManager.getTheme('light');
  const colors = theme.seriesColors || [];

  const option: ChartOption = {
    title: {
      text: 'Half Doughnut Chart (Gauge)',
      left: 'center',
      top: '50%',
      textStyle: {
        fontSize: 20
      }
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
      top: 'center'
    },
    series: [
      {
        name: 'Access Source',
        type: 'half-doughnut',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start angle
        startAngle: 180,
        endAngle: 360,
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent'
        },
        emphasis: {
          scale: true,
          scaleSize: 1.05,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
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
          show: false,
          position: 'center',
          formatter: '{b}'
        }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Half Doughnut Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Half-doughnut / Gauge style chart (180 degree arc)
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

export default HalfDoughnutExample;
