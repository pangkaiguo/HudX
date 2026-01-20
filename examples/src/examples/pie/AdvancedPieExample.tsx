import React, { useState, useRef } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { Locale, ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';
import { t } from '../../i18n';

export const AdvancedPieExample = ({
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
      show: true,
      trigger: 'item',
      formatter: '{marker} {b} <br/> {c} ({d}%)',
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
          { symbol: 'rect', color: themeObj.decalColor },
          { symbol: 'circle', color: themeObj.decalColor },
          { symbol: 'triangle', color: themeObj.decalColor },
          { symbol: 'cross', color: themeObj.decalColor },
          { symbol: 'pin', color: themeObj.decalColor },
          { symbol: 'pentagon', color: themeObj.decalColor },
          { symbol: 'arrow', color: themeObj.decalColor },
        ],
      },
    },
    legend: {
      show: true,
      orient: 'horizontal',
      right: 10,
      top: 10,
      icon: 'rect',
      // Demonstrating conflict/interaction between width, height and itemWidth
      width: 300, // Limits the total width. With itemWidth 140, only 1 column fits (2nd column would overflow 200px)
      height: 150, // Limits height, forcing wrap to 2nd column. But 2nd column is clipped by width.
      itemWidth: 150, // Fixed width for each legend item (icon + text space)
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: 200,
        center: ['50%', '50%'],
        emphasis: {
          scale: true,
          scaleSize: 1.03,
          focus: 'self',
        },
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent',
        },
        data: [
          { name: 'Category Label A', value: 335 },
          { name: 'Category Label B', value: 310 },
          { name: 'Category Label C', value: 234 },
          { name: 'Category Label D', value: 135 },
          { name: 'Category Label E', value: 148 },
          { name: 'Category Label F', value: 200 },
          { name: 'Category Label G', value: 180 },
          { name: 'Category Label H', value: 160 },
          { name: 'Category Label I', value: 140 },
          { name: 'Category Label J', value: 120 },
          { name: 'Category Label K', value: 100 },
          { name: 'Category Label L', value: 80 },
        ],
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          showOnHover: true,
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
  };

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData = [
        {
          name: 'Category Label A',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label B',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label C',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label D',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label E',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label F',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label G',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label H',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label I',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label J',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label K',
          value: Math.floor(Math.random() * 500) + 100,
        },
        {
          name: 'Category Label L',
          value: Math.floor(Math.random() * 500) + 100,
        },
      ];
      chartInstance.setOption({
        series: [
          {
            data: newData,
          },
        ],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.list.advanced-pie.title', 'Advanced Pie Chart')}
      </h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        {t(
          locale,
          'examples.advanced-pie.features',
          'Features: Smooth pie slice animations, Percentage display, Interactive legend, Hover tooltips',
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

export default AdvancedPieExample;
