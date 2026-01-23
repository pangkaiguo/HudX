import React, { useMemo, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { Locale, ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';
import { t } from '../../i18n';

export const SmoothLineExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const chartRef = useRef<HChartRef>(null);
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;

  const [renderMode, setRenderMode] = React.useState<RenderMode>('canvas');
  const [showGrid, setShowGrid] = React.useState(true);
  const [gridTop, setGridTop] = React.useState(60);
  const [splitNumber, setSplitNumber] = React.useState(5);
  const [xSplitNumber, setXSplitNumber] = React.useState(8);
  const [smoothEnabled, setSmoothEnabled] = React.useState(true);
  const [tension, setTension] = React.useState(0.5);
  const [showSymbol, setShowSymbol] = React.useState(false);

  const data = useMemo(() => {
    const points = 60;
    const xs: string[] = [];
    const ys: number[] = [];
    for (let i = 0; i < points; i++) {
      const x = i + 1;
      xs.push(String(x));
      const base = Math.sin(i / 6) * 40 + 120;
      const noise = (Math.random() - 0.5) * 10;
      ys.push(Math.round(base + noise));
    }
    return { xs, ys };
  }, []);

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
    legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
    grid: { left: 60, right: 40, top: gridTop, bottom: 60 },
    xAxis: {
      type: 'category',
      data: data.xs,
      show: true,
      splitNumber: xSplitNumber,
      axisLabel: {
        interval: (index: number) => index % 6 === 0,
      },
      splitLine: {
        show: showGrid,
        lineStyle: { color: themeObj.gridColor, type: 'dashed' },
      },
    },
    yAxis: {
      type: 'value',
      show: true,
      splitNumber,
      splitLine: {
        show: showGrid,
        lineStyle: { color: themeObj.gridColor },
      },
    },
    series: [
      {
        name: 'Smooth Series',
        type: 'line',
        data: data.ys,
        smooth: smoothEnabled ? tension : false,
        showSymbol,
        itemStyle: { color: themeObj.seriesColors?.[0] },
        lineStyle: { width: 1 },
      },
    ],
    animation: true,
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (!chartInstance) return;

    const newData = Array.from({ length: 60 }, (_, i) => {
      const base = Math.sin(i / 6) * 40 + 120;
      const noise = (Math.random() - 0.5) * 10;
      return Math.round(base + noise);
    });
    chartInstance.setOption({ series: [{ data: newData }] });
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ marginBottom: 10 }}>
          {t(locale, 'examples.list.smooth-line.title', 'Smooth Line Chart')}
        </h2>
        <p style={{ color: textSecondary, fontSize: 14 }}>
          {t(
            locale,
            'examples.list.smooth-line.subtitle',
            'Smooth uses Catmull-Rom; tension 0~1 controls curve tightness',
          )}
        </p>
      </div>

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
              border: `1px solid ${border}`,
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
            checked={smoothEnabled}
            onChange={(e) => setSmoothEnabled(e.target.checked)}
          />
          {t(locale, 'examples.control.smooth', 'Smooth')}
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>
            {t(locale, 'examples.control.tension', 'Tension')}: {tension.toFixed(2)}
          </span>
          <input
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={tension}
            onChange={(e) => setTension(Number(e.target.value))}
            style={{ width: 120 }}
            disabled={!smoothEnabled}
          />
        </div>

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
            checked={showSymbol}
            onChange={(e) => setShowSymbol(e.target.checked)}
          />
          {t(locale, 'examples.control.showSymbol', 'Show Symbol')}
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
                max='120'
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
                max='12'
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
                max='10'
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
          border: `1px solid ${border}`,
          borderRadius: 8,
          height: '600px',
        }}
      />

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleUpdateSeries}
          style={{
            padding: '8px 16px',
            backgroundColor: themeObj.seriesColors?.[0] || '#5470c6',
            color: '#fff',
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

export default SmoothLineExample;
