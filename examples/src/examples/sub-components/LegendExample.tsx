import React from 'react';
import { HChart, type ChartOption } from 'hudx-charts';
import { Locale, Theme } from 'hudx-render';
import { t } from '../../i18n';

/**
 * Demonstrates LegendOption properties as defined in types.ts
 */
const LegendExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const baseData = {
    xAxis: { data: ['A', 'B', 'C'] },
    yAxis: {},
    series: [
      { name: 'Series A', type: 'bar', data: [10, 20, 30] },
      { name: 'Series B', type: 'bar', data: [20, 30, 40] },
      { name: 'Series C', type: 'line', data: [30, 40, 10] },
    ],
  };

  // 1. Orientation & Position
  const orientOption: ChartOption = {
    ...baseData,
    title: { text: t(locale, 'examples.legend.chartTitle.verticalRight', 'Vertical Right') },
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      top: 10,
      backgroundColor: '#f9f9f9',
      borderColor: '#eee',
      borderWidth: 1,
      padding: 10,
    },
  };

  // 2. Styling (Item gap, width, height)
  const styleOption: ChartOption = {
    ...baseData,
    title: { text: t(locale, 'examples.legend.chartTitle.customItemStyle', 'Custom Item Style') },
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      top: 10,
      itemGap: 30,
      itemWidth: 40,
      itemHeight: 20,
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5470c6',
      },
    },
  };

  // 3. Data Format (Custom Icons)
  const dataOption: ChartOption = {
    ...baseData,
    title: { text: t(locale, 'examples.legend.chartTitle.customDataIcons', 'Custom Data Icons') },
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      top: 10,
      data: [
        { name: 'Series A', icon: 'circle', textStyle: { color: 'red' } },
        { name: 'Series B', icon: 'rect' },
        { name: 'Series C', icon: 'triangle' },
      ],
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{t(locale, 'examples.legend.pageTitle', 'Legend Configuration')}</h1>
      <p style={{ color: '#666' }}>
        {t(locale, 'examples.legend.pageDesc.prefix', 'Matching')} <code>LegendOption</code>{' '}
        {t(locale, 'examples.legend.pageDesc.suffix', 'interface.')}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>{t(locale, 'examples.legend.section.orient', 'Orientation & Position')}</h3>
          <p style={{ fontSize: 12 }}>
            {t(locale, 'examples.legend.section.orient.desc', 'vertical, right, top, border, background')}
          </p>
          <HChart option={orientOption} height={300} theme={theme} locale={locale} />
        </div>
        
        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>{t(locale, 'examples.legend.section.style', 'Item Styling')}</h3>
          <p style={{ fontSize: 12 }}>
            {t(locale, 'examples.legend.section.style.desc', 'itemGap, itemWidth, itemHeight, textStyle')}
          </p>
          <HChart option={styleOption} height={300} theme={theme} locale={locale} />
        </div>

        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>{t(locale, 'examples.legend.section.customData', 'Custom Data')}</h3>
          <p style={{ fontSize: 12 }}>
            {t(locale, 'examples.legend.section.customData.desc', 'per-item icon and textStyle')}
          </p>
          <HChart option={dataOption} height={300} theme={theme} locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default LegendExample;
