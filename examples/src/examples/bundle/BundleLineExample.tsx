import React, { useEffect, useRef } from 'react';
// @ts-ignore
import LineChart from 'hudx-charts/chart/LineChart';
import type { ChartOption } from 'hudx-charts';
import type { Locale } from 'hudx-render';
import { t } from '../../i18n';

const BundleLineExample: React.FC<{ locale?: Locale }> = ({ locale = 'zh-CN' }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const option: ChartOption = {
      title: {
        text: t(locale, 'examples.bundle.lineChart.chartTitle', 'Independent LineChart Bundle'),
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params: any) => {
          const items = Array.isArray(params) ? params : [params];
          if (items.length === 0) return '';
          const title = items[0]?.name ?? '';

          const rows = items
            .map((item: any) => {
              const marker = item.marker || '';
              const label = item.seriesName || item.name || '';
              const value = item.value ?? '-';
              return `
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="display:flex;align-items:center;">
                    ${marker}
                    <span style="font-weight:bold;margin-left:4px;">${label}</span>
                  </div>
                  <div style="padding-left:18px;">${value}</div>
                </div>
              `;
            })
            .join('');

          return `
            <div>
              <div style="font-weight:bold;margin-bottom:6px;">${title}</div>
              ${rows}
            </div>
          `;
        },
      },
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

    const chart = new LineChart(chartRef.current, option, 'svg', undefined, locale);

    return () => {
      chart.dispose();
    };
  }, [locale]);

  return (
    <div style={{ padding: 20 }}>
      <h3>{t(locale, 'examples.bundle.lineChart.title', 'LineChart Bundle Import')}</h3>
      <p style={{ fontSize: 12, color: '#666' }}>
        <code>import LineChart from 'hudx-charts/chart/LineChart';</code>
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 300, border: '1px solid #eee' }} />
    </div>
  );
};

export default BundleLineExample;
