import React, { useRef, useState, useMemo } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { Locale, ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';
import { t } from '../../i18n';

export const StackBar3DExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const chartRef = useRef<HChartRef>(null);
  const themeObj = ThemeManager.getTheme(theme);

  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(40);
  const [splitNumber, setSplitNumber] = useState(10);
  const [xSplitNumber, setXSplitNumber] = useState(10);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');

  const option = useMemo<ChartOption>(
    () => ({
      tooltip: {
        show: true,
        trigger: 'item',
        // formatter: '{b}\n{c}'
      },
      legend: {
        show: true,
        orient: 'vertical',
        right: 10,
        top: 10,
        icon: 'rect',
      },
      grid: {
        left: 60,
        right: 60,
        top: gridTop,
        bottom: 60,
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
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        show: true,
        splitLine: {
          show: showGrid,
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
          name: 'Product A',
          type: 'stackBar3D',
          data: [120, 132, 101, 134, 90, 230, 210],
          itemStyle: { color: '#5470c6', borderWidth: 0 },
        },
        {
          name: 'Product B',
          type: 'stackBar3D',
          data: [220, 182, 191, 234, 290, 330, 310],
          itemStyle: { color: '#91cc75', borderWidth: 0 },
        },
        {
          name: 'Product C',
          type: 'stackBar3D',
          data: [150, 232, 201, 154, 190, 330, 410],
          itemStyle: { color: '#fac858', borderWidth: 0 },
        },
      ],
      animation: true,
    }),
    [isDecal, showGrid, gridTop, splitNumber, xSplitNumber, themeObj],
  );

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData1 = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      const newData2 = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      const newData3 = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );

      chartInstance.setOption({
        series: [{ data: newData1 }, { data: newData2 }, { data: newData3 }],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.stack-bar-3d.title', 'Stacked 3D Bar Chart')}
      </h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        {t(
          locale,
          'examples.stack-bar-3d.subtitle',
          'Stacked bars with pseudo-3D effect',
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

export default StackBar3DExample;
