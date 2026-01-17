import React, { useEffect, useRef } from 'react';
// @ts-ignore
import LineChart from 'hudx-charts/chart/LineChart';
import type { ChartOption } from 'hudx-charts';

const BundleLineExample: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const option: ChartOption = {
      title: { text: 'Independent LineChart Bundle' },
      tooltip: { show: true, trigger: 'axis' },
      xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: {},
      series: [
        {
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
          smooth: true,
          areaStyle: { opacity: 0.1 },
        },
      ],
    };

    const chart = new LineChart(chartRef.current, option);

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>LineChart Bundle Import</h3>
      <p style={{ fontSize: 12, color: '#666' }}>
        <code>import LineChart from 'hudx-charts/chart/LineChart';</code>
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 300, border: '1px solid #eee' }} />
    </div>
  );
};

export default BundleLineExample;
