import React, { useState, useRef } from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import {
  Locale,
  ThemeManager,
  Theme,
  toRgbaWithOpacity,
  type RenderMode,
} from 'hudx-render';
import { t } from '../../i18n';

export const WaterfallBarExample = ({
  theme = 'light',
  locale = 'en-US',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(80);
  const [splitNumber, setSplitNumber] = useState(10);
  const [xInterval, setXInterval] = useState(0);
  const [xAutoInterval, setXAutoInterval] = useState(true);
  const [xSplitNumber, setXSplitNumber] = useState(10);
  const [xGridType, setXGridType] = useState<'solid' | 'dashed'>('dashed');
  const [yGridType, setYGridType] = useState<'solid' | 'dashed'>('solid');
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const [barWidth, setBarWidth] = useState<number | 'auto'>('auto');

  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const chartRef = useRef<HChartRef>(null);

  const option: ChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        if (!Array.isArray(params)) return '';
        const visibleParams = params.filter(
          (p) => p.seriesName !== 'Placeholder' && p.value !== 0,
        );
        if (visibleParams.length === 0) return '';

        const title = visibleParams[0].name;
        const items = visibleParams.map((p) => {
          let color = p.color;
          // Ensure color is a string to prevent "Cannot convert object to primitive value" error
          if (typeof color !== 'string') {
            if (
              color &&
              typeof color === 'object' &&
              'colorStops' in color &&
              Array.isArray(color.colorStops)
            ) {
              color = color.colorStops[0]?.color || 'transparent';
            } else {
              color = 'transparent';
            }
          }
          const marker = `<span style="display:inline-block;margin-right:8px;border-radius:2px;width:12px;height:12px;background-color:${color};"></span>`;
          return `${marker} <b>${p.seriesName}</b>  ${p.value}`;
        });

        return `${title}<br/>${items.join('<br/>')}`;
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
      top: gridTop,
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
      axisLabel: {
        interval: xAutoInterval ? 'auto' : xInterval,
      },
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: themeObj.gridColor,
          type: xGridType,
        },
      },
      splitNumber: xSplitNumber,
    },
    yAxis: {
      type: 'value',
      splitNumber: splitNumber,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: themeObj.gridColor,
          type: yGridType,
        },
      },
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        silent: true,
        barWidth: barWidth === 'auto' ? undefined : barWidth,
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
        barWidth: barWidth === 'auto' ? undefined : barWidth,
        backgroundStyle: {
          color: toRgbaWithOpacity(themeObj.borderColor, 0.2),
        },
        itemStyle: {
          color: '#5470c6',
        },
        label: {
          show: true,
          position: 'top',
          formatter: (p: any) => (p.value === 0 ? '' : String(p.value)),
        },
        emphasis: {
          focus: 'self',
        },
        data: [900, 345, 393, 0, 0, 135, 178, 286, 0, 0, 0] as any[],
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        barWidth: barWidth === 'auto' ? undefined : barWidth,
        backgroundStyle: {
          color: toRgbaWithOpacity(themeObj.borderColor, 0.2),
        },
        itemStyle: {
          color: '#91cc75',
        },
        label: {
          show: true,
          position: 'bottom',
          formatter: (p: any) => (p.value === 0 ? '' : String(p.value)),
        },
        emphasis: {
          focus: 'self',
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
              border: `1px solid ${border}`,
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
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          {t(locale, 'examples.control.showGrid', 'Show Grid')}
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>
            {t(locale, 'examples.control.barWidth', 'Bar Width')}: {barWidth}
          </span>
          <input
            type='range'
            min='0'
            max='100'
            step='5'
            value={barWidth === 'auto' ? 0 : barWidth}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBarWidth(val === 0 ? 'auto' : val);
            }}
            style={{ width: 100 }}
          />
        </div>

        {showGrid && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>
                {t(locale, 'examples.control.gridTop', 'Grid Top')}: {gridTop}
              </span>
              <input
                type='range'
                min='20'
                max='100'
                value={gridTop}
                onChange={(e) => setGridTop(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>
                {t(locale, 'examples.control.xSplit', 'X Split')}:{' '}
                {xSplitNumber}
              </span>
              <input
                type='range'
                min='2'
                max='20'
                step='1'
                value={xSplitNumber}
                onChange={(e) => setXSplitNumber(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  checked={xAutoInterval}
                  onChange={(e) => setXAutoInterval(e.target.checked)}
                />
                <span>
                  {t(locale, 'examples.control.autoInterval', 'Auto Interval')}
                </span>
              </label>
              {!xAutoInterval && (
                <>
                  <span>
                    {t(locale, 'examples.control.intervalValue', 'Val')}:{' '}
                    {xInterval}
                  </span>
                  <input
                    type='range'
                    min='0'
                    max='3'
                    step='1'
                    value={xInterval}
                    onChange={(e) => setXInterval(Number(e.target.value))}
                    style={{ width: 80 }}
                    title={t(
                      locale,
                      'examples.control.intervalHelp',
                      '0: All, 1: Every 2nd, etc.',
                    )}
                  />
                </>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>
                {t(locale, 'examples.control.ySplit', 'Y Split')}: {splitNumber}
              </span>
              <input
                type='range'
                min='2'
                max='20'
                step='1'
                value={splitNumber}
                onChange={(e) => setSplitNumber(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{t(locale, 'examples.control.xGrid', 'X Grid:')}</span>
              <select
                value={xGridType}
                onChange={(e) =>
                  setXGridType(e.target.value as 'solid' | 'dashed')
                }
                style={{
                  padding: '2px 4px',
                  borderRadius: 4,
                  border: `1px solid ${border}`,
                }}
              >
                <option value='solid'>
                  {t(locale, 'examples.control.solid', 'Solid')}
                </option>
                <option value='dashed'>
                  {t(locale, 'examples.control.dashed', 'Dashed')}
                </option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{t(locale, 'examples.control.yGrid', 'Y Grid:')}</span>
              <select
                value={yGridType}
                onChange={(e) =>
                  setYGridType(e.target.value as 'solid' | 'dashed')
                }
                style={{
                  padding: '2px 4px',
                  borderRadius: 4,
                  border: `1px solid ${border}`,
                }}
              >
                <option value='solid'>
                  {t(locale, 'examples.control.solid', 'Solid')}
                </option>
                <option value='dashed'>
                  {t(locale, 'examples.control.dashed', 'Dashed')}
                </option>
              </select>
            </label>
          </>
        )}
      </div>
      <HChart
        ref={chartRef}
        option={option}
        theme={theme}
        locale={locale}
        renderMode={renderMode}
        style={{
          border: `1px solid ${border}`,
          borderRadius: 8,
          height: '600px',
        }}
      />
    </div>
  );
};

export default WaterfallBarExample;
