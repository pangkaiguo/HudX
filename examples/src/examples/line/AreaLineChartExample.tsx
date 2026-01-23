import React, { useRef, useState, useMemo } from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import { Locale, ThemeManager, Theme, type RenderMode } from 'hudx-render';
import { t } from '../../i18n';

export const AreaLineChartExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const chartRef = useRef<HChartRef>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [gridTop, setGridTop] = useState(60);
  const [splitNumber, setSplitNumber] = useState(10);
  const [xSplitNumber, setXSplitNumber] = useState(10);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const [isSmooth, setIsSmooth] = useState(true);

  // Generate more data points (e.g. 100)
  const generateData = (count: number) => {
    const data: string[] = [];
    const valuesA: number[] = [];
    const valuesB: number[] = [];
    const valuesC: number[] = [];

    let baseValue = Math.random() * 100;
    let date = new Date(2023, 0, 1);

    for (let i = 0; i < count; i++) {
      date.setDate(date.getDate() + 1);
      data.push([date.getMonth() + 1, date.getDate()].join('/'));

      baseValue = baseValue + Math.random() * 20 - 10;
      valuesA.push(Math.abs(baseValue) + 50);
      valuesB.push(Math.abs(baseValue) + 20 + Math.random() * 20);
      valuesC.push(Math.abs(baseValue) + 80 + Math.random() * 20);
    }

    return { category: data, valuesA, valuesB, valuesC };
  };

  const initialData = useMemo(() => generateData(30), []);
  const [chartData, setChartData] = useState(initialData);

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
      left: 50,
      right: 40,
      top: gridTop,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      data: chartData.category,
      show: true,
      splitLine: {
        show: showGrid,
        lineStyle: {
          color: '#eee',
          type: 'dashed',
        },
      },
      splitNumber: xSplitNumber,
      axisLabel: {
        // Show fewer labels to avoid clutter
        interval: (index: number) => index % 5 === 0,
      },
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
        data: chartData.valuesA,
        itemStyle: { color: themeObj.seriesColors?.[0] },
        lineStyle: { width: 1 },
        showSymbol: false,
        smooth: isSmooth,
        areaStyle: { opacity: 0.3 },
      },
      {
        name: 'Series B',
        type: 'line',
        data: chartData.valuesB,
        itemStyle: { color: themeObj.seriesColors?.[1] },
        lineStyle: { width: 1 },
        showSymbol: false,
        smooth: isSmooth,
        areaStyle: { opacity: 0.3 },
      },
      {
        name: 'Series C',
        type: 'line',
        data: chartData.valuesC,
        itemStyle: { color: themeObj.seriesColors?.[2] },
        lineStyle: { width: 1 },
        showSymbol: false,
        smooth: isSmooth,
        areaStyle: { opacity: 0.3 },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
  };

  const handleUpdateSeries = () => {
    const newData = generateData(30);
    setChartData(newData);
    // Directly updating state will trigger re-render and HChart will update via props
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.list.area-line.title', 'Area Line Chart')}
      </h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        {t(
          locale,
          'examples.list.area-line.subtitle',
          'Area fill + smooth curves + denser x-axis labels',
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
            <option value='canvas'>
              {t(locale, 'examples.control.canvas', 'Canvas')}
            </option>
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
            checked={isSmooth}
            onChange={(e) => setIsSmooth(e.target.checked)}
          />
          {t(locale, 'examples.control.smooth', 'Smooth')}
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
            'examples.area-line.updateData',
            'Update Data (Random 30 points)',
          )}
        </button>
      </div>
    </div>
  );
};

export default AreaLineChartExample;
