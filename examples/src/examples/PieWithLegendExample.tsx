import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';
import { ThemeManager } from '@HudX/core';

export const PieWithLegendExample = () => {
  const theme = ThemeManager.getTheme('light');
  const colors = theme.seriesColors || [];

  const option: ChartOption = {
    title: {
      text: 'Pie Chart with Interactive Legend',
      left: 'center',
      top: 30
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c}\n{d}%'
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 20,
      top: 20
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 120,
        center: ['50%', '50%'],
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
      <h2 style={{ marginBottom: 20 }}>Pie Chart with Interactive Legend</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Hover over slices for tooltip, click legend to show/hide</p>
      <HChart
        option={option}
        width={800}
        height={400}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
}

export default PieWithLegendExample;