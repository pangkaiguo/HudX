import { HChart } from '@HudX/charts';
import type { ChartOption } from '@HudX/charts';

export const AdvancedPieExample = () => {
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
          scaleSize: 1.1
        },
        data: [
          { name: 'Category A', value: 335, itemStyle: { color: '#5470c6' } },
          { name: 'Category B', value: 310, itemStyle: { color: '#91cc75' } },
          { name: 'Category C', value: 234, itemStyle: { color: '#fac858' } },
          { name: 'Category D', value: 135, itemStyle: { color: '#ee6666' } },
          { name: 'Category E', value: 148, itemStyle: { color: '#73c0de' } }
        ],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}'
        }
      }
    ],
    animation: true,
    animationDuration: 800,
    animationEasing: 'cubicOut'
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Advanced Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth pie slice animations • Percentage display • Interactive legend • Hover tooltips
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

export default AdvancedPieExample;
