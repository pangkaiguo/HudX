import React, { useRef } from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import { Locale, ThemeManager, Theme, type RenderMode } from 'hudx-render';
import { t } from '../../i18n';

export const StackLineExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);
  const [showGrid, setShowGrid] = React.useState(true);
  const [gridTop, setGridTop] = React.useState(60);
  const [splitNumber, setSplitNumber] = React.useState(10);
  const [xSplitNumber, setXSplitNumber] = React.useState(10);
  const [renderMode, setRenderMode] = React.useState<RenderMode>('svg');

  const option: ChartOption = {
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
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      top: 10,
      icon: 'rect',
    },
    grid: {
      left: 70,
      right: 40,
      top: gridTop,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true,
      splitLine: {
        show: showGrid,
        interval: 0,
        lineStyle: {
          color: '#eee',
          type: 'dashed',
        },
      },
      splitNumber: xSplitNumber,
    },
    yAxis: {
      type: 'value',
      show: true,
      splitNumber: splitNumber,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee',
        },
      },
    },
    series: [
      {
        name: 'Series A',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: themeObj.seriesColors?.[0] },
        lineStyle: { width: 1 },
        showSymbol: true,
        symbol: 'circle',
      },
      {
        name: 'Series B',
        type: 'line',
        data: [100, 150, 120, 110, 90, 140, 120],
        itemStyle: { color: themeObj.seriesColors?.[1] },
        lineStyle: { width: 1 },
        showSymbol: true,
        symbol: 'circle',
      },
      {
        name: 'Series C',
        type: 'line',
        data: [80, 120, 100, 140, 110, 100, 90],
        itemStyle: { color: themeObj.seriesColors?.[2] },
        lineStyle: { width: 1 },
        showSymbol: true,
        symbol: 'circle',
      },
    ],
    animation: true,
    animationDuration: 600,
    animationEasing: 'cubicOut',
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data for all 3 series
      const newDataA = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      const newDataB = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      const newDataC = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );

      chartInstance.setOption({
        series: [{ data: newDataA }, { data: newDataB }, { data: newDataC }],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.list.stack-line.title', 'Stack Line Chart')}
      </h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        {t(
          locale,
          'examples.stack-line.features',
          'Features: Smooth animations on load, Interactive legend (click to toggle), Hover tooltips with data details',
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
          <span>{t(locale, 'examples.control.renderMode', 'Render Mode:')}</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          >
            <option value='canvas'>{t(locale, 'examples.control.canvas', 'Canvas')}</option>
            <option value='svg'>{t(locale, 'examples.control.svg', 'SVG')}</option>
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
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          {t(locale, 'examples.control.showGrid', 'Show Grid')}
        </label>

        {showGrid && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>
                {t(locale, 'examples.control.gridTop', 'Grid Top')}: {gridTop}
              </span>
              <input
                type='range'
                min='20'
                max='150'
                value={gridTop}
                onChange={(e) => setGridTop(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>
                {t(locale, 'examples.control.xSplit', 'X Split')}: {xSplitNumber}
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
          border: '1px solid #D6D8DA',
          borderRadius: 8,
          height: '600px',
        }}
      />
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleUpdateSeries}
          style={{
            padding: '8px 16px',
            backgroundColor: '#5470c6',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          {t(
            locale,
            'examples.control.updateData',
            'Update Data (via getChartInstance)',
          )}
        </button>
      </div>
    </div>
  );
};

export default StackLineExample;
