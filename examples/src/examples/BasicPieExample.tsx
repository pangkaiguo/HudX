import { HChart } from 'HudX/charts';
import type { ChartOption } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';
import { defaultColors } from '../config';

export const BasicPieExample = () => {
  const theme = ThemeManager.getTheme('light');
  const colors = theme.seriesColors || defaultColors;

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
      orient: 'horizontal',
      left: 'center',
      bottom: 20
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 120,
        center: ['50%', '55%'],
        data: [
          { name: 'Direct', value: 335, itemStyle: { color: colors[0] } },
          { name: 'Email', value: 310, itemStyle: { color: colors[1] } },
          { name: 'Ads', value: 234, itemStyle: { color: colors[2] } },
          { name: 'Video', value: 135, itemStyle: { color: colors[3] } },
          { name: 'Search', value: 148, itemStyle: { color: colors[4] } }
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
        }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over slices to see details • Click legend to toggle</p>
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