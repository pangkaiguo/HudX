import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';
import { ThemeManager } from '@HudX/core';

export const LineWithTooltipExample = () => {
  const theme = ThemeManager.getTheme('light');
  const colors = theme.seriesColors || [];

  const option: ChartOption = {
    title: {
      text: 'Line Chart with Interactive Legend',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{b}\n{c}'
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 20,
      top: 20
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true
    },
    yAxis: {
      type: 'value',
      show: true
    },
    series: [
      {
        name: 'Weekly Data',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: colors[0] },
        lineStyle: { width: 2 },
        showSymbol: true,
        emphasis: {
          scale: true,
          itemStyle: {
            color: colors[3]
          }
        }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Line Chart with Interactive Legend</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Hover over data points for tooltip, click legend to show/hide</p>
      <HChart
        option={option}
        width={800}
        height={400}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
}

export default LineWithTooltipExample;