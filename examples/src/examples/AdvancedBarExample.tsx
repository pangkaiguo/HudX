import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';

export const AdvancedBarExample = () => {
  const option: ChartOption = {
    title: {
      text: 'Advanced Bar Chart with Animation',
      left: 'center',
      top: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis' // Ideally we want axis trigger, but item is supported for now
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 30
    },
    grid: {
      left: 70,
      right: 40,
      top: 80,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
      show: true
    },
    yAxis: {
      type: 'value',
      show: true
    },
    series: [
      {
        name: 'Product A',
        type: 'bar',
        data: [320, 332, 301, 334],
        itemStyle: { color: '#5470c6' }
      },
      {
        name: 'Product B',
        type: 'bar',
        data: [220, 182, 191, 234],
        itemStyle: { color: '#91cc75' }
      },
      {
        name: 'Product C',
        type: 'bar',
        data: [150, 232, 201, 154],
        itemStyle: { color: '#fac858' }
      }
    ],
    animation: true,
    animationDuration: 600,
    animationEasing: 'cubicOut'
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Advanced Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Staggered bar animations • Interactive legend • Hover tooltips with values
      </p>
      <HChart
        option={option}
        width={900}
        height={500}
        style={{ border: '1px solid #e0e0e0', borderRadius: 8 }}
      />
    </div>
  );
};

export default AdvancedBarExample;
