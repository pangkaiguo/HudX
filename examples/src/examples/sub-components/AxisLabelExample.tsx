import React, { useRef, useState } from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import { Locale, Theme } from 'hudx-render';
import { t } from '../../i18n';

export const AxisLabelExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const chartRef = useRef<HChartRef>(null);

  const [rotate, setRotate] = useState(45);
  const [width, setWidth] = useState(60);
  const [overflow, setOverflow] = useState<'break' | 'truncate' | 'none'>(
    'break',
  );

  const [yRotate, setYRotate] = useState(-45);
  const [yWidth, setYWidth] = useState(60);
  const [yOverflow, setYOverflow] = useState<'break' | 'truncate' | 'none'>(
    'break',
  );

  const option: ChartOption = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      bottom: 100,
      top: 80,
    },
    xAxis: {
      type: 'category',
      data: [
        'Long Label One',
        'Long Label Two',
        'Long Label Three',
        'Very Long Label Four',
        'Super Long Label Five',
        'Extremely Long Label Six',
        'Just A Normal Label',
      ],
      axisLabel: {
        rotate: rotate,
        width: width,
        overflow: overflow,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: { color: '#5470c6' },
      },
    ],
  };

  const yOption: ChartOption = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: 150,
      top: 80,
      right: 40,
      bottom: 40,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: [
        'Long Label One',
        'Long Label Two',
        'Long Label Three',
        'Very Long Label Four',
        'Super Long Label Five',
        'Extremely Long Label Six',
        'Just A Normal Label',
      ],
      axisLabel: {
        rotate: yRotate,
        width: yWidth,
        overflow: yOverflow,
        interval: 0,
      },
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: { color: '#91cc75' },
      },
    ],
  };

  const xyOption: ChartOption = {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: 150,
      bottom: 100,
      right: 40,
      top: 80,
    },
    xAxis: {
      type: 'category',
      data: [
        'X Label A',
        'X Label B Long',
        'X Label C Very Long',
        'X Label D',
        'X Label E',
      ],
      axisLabel: {
        rotate: rotate,
        width: width,
        overflow: overflow,
        interval: 0,
      },
    },
    yAxis: {
      type: 'category',
      data: [
        'Y Label 1',
        'Y Label 2 Long',
        'Y Label 3',
        'Y Label 4 Very Long',
        'Y Label 5',
      ],
      axisLabel: {
        rotate: yRotate,
        width: yWidth,
        overflow: yOverflow,
        interval: 0,
      },
    },
    series: [
      {
        name: 'Scatter Data',
        type: 'scatter',
        symbolSize: 20,
        data: [
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [0, 4],
          [4, 0],
          [2, 2],
        ],
        itemStyle: { color: '#fac858' },
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.axisLabel.pageTitle', 'Axis Label Example')}
      </h2>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, marginBottom: 10 }}>
          {t(locale, 'examples.axisLabel.xAxis.title', 'X Axis Settings')}
        </h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {t(locale, 'examples.axisLabel.rotate', 'Rotate')}:
            <input
              type='number'
              value={rotate}
              onChange={(e) => setRotate(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                width: 60,
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {t(locale, 'examples.axisLabel.width', 'Width')}:
            <input
              type='number'
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                width: 60,
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {t(locale, 'examples.axisLabel.overflow', 'Overflow')}:
            <select
              value={overflow}
              onChange={(e) =>
                setOverflow(e.target.value as 'break' | 'truncate' | 'none')
              }
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            >
              <option value='break'>
                {t(locale, 'examples.axisLabel.overflow.break', 'Break')}
              </option>
              <option value='truncate'>
                {t(locale, 'examples.axisLabel.overflow.truncate', 'Truncate')}
              </option>
              <option value='none'>
                {t(locale, 'examples.axisLabel.overflow.none', 'None')}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: 400,
          border: '1px solid #eee',
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <HChart ref={chartRef} option={option} theme={theme} locale={locale} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, marginBottom: 10 }}>
          {t(locale, 'examples.axisLabel.yAxis.title', 'Y Axis Settings')}
        </h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {t(locale, 'examples.axisLabel.rotate', 'Rotate')}:
            <input
              type='number'
              value={yRotate}
              onChange={(e) => setYRotate(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                width: 60,
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {t(locale, 'examples.axisLabel.width', 'Width')}:
            <input
              type='number'
              value={yWidth}
              onChange={(e) => setYWidth(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                width: 60,
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {t(locale, 'examples.axisLabel.overflow', 'Overflow')}:
            <select
              value={yOverflow}
              onChange={(e) =>
                setYOverflow(e.target.value as 'break' | 'truncate' | 'none')
              }
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            >
              <option value='break'>
                {t(locale, 'examples.axisLabel.overflow.break', 'Break')}
              </option>
              <option value='truncate'>
                {t(locale, 'examples.axisLabel.overflow.truncate', 'Truncate')}
              </option>
              <option value='none'>
                {t(locale, 'examples.axisLabel.overflow.none', 'None')}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: 400,
          border: '1px solid #eee',
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <HChart option={yOption} theme={theme} locale={locale} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, marginBottom: 10 }}>
          {t(
            locale,
            'examples.axisLabel.combined.title',
            'Combined Axis Settings (Uses both X and Y settings above)',
          )}
        </h3>
      </div>

      <div
        style={{
          width: '100%',
          height: 400,
          border: '1px solid #eee',
          borderRadius: 8,
        }}
      >
        <HChart option={xyOption} theme={theme} locale={locale} />
      </div>
    </div>
  );
};

export default AxisLabelExample;
