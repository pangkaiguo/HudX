import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';

export const BarWithLegendExample = () => {
  const option: ChartOption = {
    title: {
      text: 'Bar Chart with Interactive Legend',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'item'
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 20
    },
    grid: {
      left: 60,
      right: 40,
      top: 40,
      bottom: 60
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
        name: 'Sales',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: '#5470c6' }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Bar Chart with Interactive Legend</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Hover over bars for tooltip, click legend to show/hide all bars</p>
      <HChart
        option={option}
        width={800}
        height={400}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
};

export default BarWithLegendExample;
