import { HChart } from 'HudX/charts';
import type { ChartOption } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';
import { defaultColors } from '../config';

export const BasicBarExample = () => {
  const theme = ThemeManager.getTheme('light');
  const colors = theme.seriesColors || defaultColors;

  const option: ChartOption = {
    title: {
      text: 'Bar Chart',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c}'
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
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: colors[0], opacity: 0.8 }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over bars to see values</p>
      <HChart
        option={option}
        width={800}
        height={400}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
}

export default BasicBarExample;