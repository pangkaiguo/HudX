import React, { useEffect, useRef } from 'react';
// @ts-ignore
import PieChart from 'hudx-charts/chart/PieChart';
import type { ChartOption } from 'hudx-charts';
import type { Locale } from 'hudx-render';
import { t } from '../../i18n';

const BundlePieExample: React.FC<{ locale?: Locale }> = ({ locale = 'zh-CN' }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const option: ChartOption = {
      title: {
        text: t(locale, 'examples.bundle.pieChart.chartTitle', 'Independent PieChart Bundle'),
        left: 'center',
      },
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    const chart = new PieChart(chartRef.current, option, 'svg', undefined, locale);

    return () => {
      chart.dispose();
    };
  }, [locale]);

  return (
    <div style={{ padding: 20 }}>
      <h3>{t(locale, 'examples.bundle.pieChart.title', 'PieChart Bundle Import')}</h3>
      <p style={{ fontSize: 12, color: '#666' }}>
        <code>import PieChart from 'hudx-charts/chart/PieChart';</code>
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 300, border: '1px solid #eee' }} />
    </div>
  );
};

export default BundlePieExample;
