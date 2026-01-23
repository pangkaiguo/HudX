import React, { useRef } from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import type { Locale, Theme } from 'hudx-render';

import { t } from '../../i18n';

export const AdvancedDoughnutExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const portionRef = useRef<HChartRef>(null);
  const progressRef = useRef<HChartRef>(null);
  const nestedRef = useRef<HChartRef>(null);
  const rightLegendRef = useRef<HChartRef>(null);

  // 1. Portion Doughnut Chart - Rich Text Label
  const portionOption: ChartOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 10,
      icon: 'circle',
    },
    series: [
      {
        name: 'Portion',
        type: 'doughnut',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            formatter: '{title|{name}}\n{value|{value}}\n{sub|{d}%}',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        centerLabel: {
          show: true,
          formatter: '{title|Total}\n{value|3,147}\n{sub|Visits}',
          rich: {
            title: {
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
            },
            value: {
              fontSize: 28,
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 30,
            },
            sub: {
              fontSize: 12,
              color: '#999',
              lineHeight: 20,
            },
          },
        },
      },
    ],
  };

  // 2. Progress Doughnut Chart - Percentage Label
  const progressOption: ChartOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 10,
    },
    series: [
      {
        name: 'Access From',
        type: 'doughnut',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Completed' },
          { value: 300, name: 'Remaining', itemStyle: { color: '#eee' } },
        ],
        centerLabel: {
          show: true,
          type: 'percentage',
          formatter: '{d}%',
          style: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
        },
      },
    ],
  };

  // 3. Nested Doughnut Chart
  const nestedOption: ChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      data: [
        'Direct',
        'Marketing',
        'Search Engine',
        'Email',
        'Union Ads',
        'Video Ads',
        'Baidu',
        'Google',
        'Bing',
        'Others',
      ],
      orient: 'vertical',
      right: 10,
      top: 10,
    },
    series: [
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['30%', '45%'],
        center: ['50%', '50%'],
        label: {
          position: 'inside',
          fontSize: 10,
          formatter: '{b}\n{d}%',
          color: '#fff',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: 'Direct' },
          { value: 679, name: 'Marketing' },
          { value: 1548, name: 'Search Engine' },
        ],
        centerLabel: {
          show: false, // No center label for inner ring
        },
      },
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['55%', '75%'],
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 234, name: 'Union Ads' },
          { value: 135, name: 'Video Ads' },
          { value: 1048, name: 'Baidu' },
          { value: 251, name: 'Google' },
          { value: 147, name: 'Bing' },
          { value: 102, name: 'Others' },
        ],
        centerLabel: {
          show: true,
          formatter: '{title|Total}\n{value|3,562}',
          rich: {
            title: {
              fontSize: 12,
              color: '#999',
              lineHeight: 16,
            },
            value: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 20,
            },
          },
        },
      },
    ],
  };

  // 4. HTML Legend Doughnut Chart (Right)
  const rightLegendOption: ChartOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 10,
      renderMode: 'html',
      tableHead: ['Category', 'Amount', 'Ratio'],
      formatter: (name: string, item: any) => {
        const percent = item.percent
          ? (item.percent * 100).toFixed(0) + '%'
          : '0%';
        const value = item.value ? `HKD ${Math.round(item.value / 10)}M` : '0';
        return [
          `<span style="font-weight: bold; color: ${item.color}">${name}</span>`,
          `<span style="color: #666;">${value}</span>`,
          `<span style="color: #666;">${percent}</span>`,
        ];
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'doughnut',
        radius: ['45%', '60%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: { show: false },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        centerLabel: {
          show: true,
          formatter: 'Right',
          style: { fontSize: 20, fontWeight: 'bold', color: '#333' },
        },
      },
    ],
  };

  const chartStyle = {
    height: '400px',
    width: '100%',
    border: '1px solid #D6D8DA',
    borderRadius: 8,
    marginBottom: '20px',
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>
        {t(
          locale,
          'examples.list.advanced-doughnut.title',
          'Advanced Doughnut Charts',
        )}
      </h2>
      <p style={{ marginBottom: 20, color: '#666' }}>
        {t(
          locale,
          'examples.advanced-doughnut.desc',
          'Demonstrating various center label configurations and nested layouts.',
        )}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
        }}
      >
        <div>
          <HChart
            ref={portionRef}
            option={portionOption}
            theme={theme}
            locale={locale}
            style={chartStyle}
          />
        </div>
        <div>
          <HChart
            ref={progressRef}
            option={progressOption}
            theme={theme}
            locale={locale}
            style={chartStyle}
          />
        </div>
        <div>
          <HChart
            ref={nestedRef}
            option={nestedOption}
            theme={theme}
            locale={locale}
            style={chartStyle}
          />
        </div>
        <div>
          <HChart
            ref={rightLegendRef}
            option={rightLegendOption}
            theme={theme}
            locale={locale}
            style={chartStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedDoughnutExample;
