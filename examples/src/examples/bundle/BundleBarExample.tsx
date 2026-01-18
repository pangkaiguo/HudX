import React, { useEffect, useRef } from 'react';
// @ts-ignore
import BarChart from 'hudx-charts/chart/BarChart';
import type { ChartOption } from 'hudx-charts';
import type { Locale } from 'hudx-render';
import { t } from '../../i18n';

const BundleBarExample: React.FC<{ locale?: Locale }> = ({ locale = 'zh-CN' }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const option: ChartOption = {
      title: {
        text: t(locale, 'examples.bundle.barChart.chartTitle', 'Independent BarChart Bundle'),
      },
      tooltip: { show: true },
      xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [10, 52, 200, 334, 390],
          itemStyle: { color: '#5470c6' },
        },
      ],
    };

    const chart = new BarChart(chartRef.current, option, 'svg', undefined, locale);

    return () => {
      chart.dispose();
    };
  }, [locale]);

  return (
    <div style={{ padding: 20 }}>
      <h3>{t(locale, 'examples.bundle.barChart.title', 'BarChart Bundle Import')}</h3>
      <p style={{ fontSize: 12, color: '#666' }}>
        <code>import BarChart from 'hudx-charts/chart/BarChart';</code>
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 300, border: '1px solid #eee' }} />
    </div>
  );
};

export default BundleBarExample;
