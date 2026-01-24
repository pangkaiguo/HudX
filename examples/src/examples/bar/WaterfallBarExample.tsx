import React, { useState, useRef } from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import { Locale, ThemeManager, Theme, type RenderMode } from 'hudx-render';
import { t } from '../../i18n';

export const WaterfallBarExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const [isDecal, setIsDecal] = useState(false);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        let tar;
        if (params[1] && params[1].value !== 0) {
          tar = params[1];
        } else {
          tar = params[2];
        }
        return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      },
    },
    aria: {
      enabled: true,
      decal: {
        show: isDecal,
        decals: [
          { symbol: 'diagonal', color: themeObj.decalColor },
          { symbol: 'dots', color: themeObj.decalColor },
          { symbol: 'diagonal-reverse', color: themeObj.decalColor },
          { symbol: 'checkerboard', color: themeObj.decalColor },
          { symbol: 'crosshatch', color: themeObj.decalColor },
        ],
      },
    },
    legend: {
      orient: 'horizontal',
      data: ['Expenses', 'Income'],
      left: 'center',
      bottom: 20,
      textStyle: {
        color: themeObj.textColor,
      },
    },
    grid: {
      left: '15%',
      right: '10%',
      bottom: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: (function () {
        let list = [];
        for (let i = 1; i <= 11; i++) {
          list.push('Nov ' + i);
        }
        return list;
      })(),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        silent: true,
        itemStyle: {
          borderColor: 'transparent',
          color: 'rgba(0,0,0,0)',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'rgba(0,0,0,0)',
          },
        },
        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
      },
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#5470c6',
        },
        label: {
          show: true,
          position: 'top',
          formatter: (p: any) => (p.value === 0 ? '' : String(p.value)),
        },
        data: [900, 345, 393, 0, 0, 135, 178, 286, 0, 0, 0] as any[],
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#91cc75',
        },
        label: {
          show: true,
          position: 'bottom',
          formatter: (p: any) => (p.value === 0 ? '' : String(p.value)),
        },
        data: [0, 0, 0, 108, 154, 0, 0, 0, 119, 361, 203] as any[],
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.list.waterfall-bar.title', 'Waterfall Bar Chart')}
      </h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        {t(
          locale,
          'examples.waterfall-bar.hint',
          'Waterfall chart using stacked bars with a transparent series',
        )}
      </p>
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>
            {t(locale, 'examples.control.renderMode', 'Render Mode:')}
          </span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          >
            <option value='canvas'>
              {t(locale, 'examples.control.canvas', 'Canvas')}
            </option>
            <option value='svg'>
              {t(locale, 'examples.control.svg', 'SVG')}
            </option>
          </select>
        </label>
        <label
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <input
            type='checkbox'
            checked={isDecal}
            onChange={(e) => setIsDecal(e.target.checked)}
          />
          {t(locale, 'examples.control.decalPatterns', 'Decal Patterns')}
        </label>
      </div>
      <HChart
        ref={chartRef}
        option={option}
        theme={theme}
        locale={locale}
        renderMode={renderMode}
        style={{
          border: '1px solid #D6D8DA',
          borderRadius: 8,
          height: '600px',
        }}
      />
    </div>
  );
};

export default WaterfallBarExample;
