import React from 'react';
import { HChart, type ChartOption } from 'hudx-charts';
import { Locale, Theme, ThemeManager } from 'hudx-render';
import { t } from '../../i18n';

/**
 * Demonstrates TitleOption properties as defined in types.ts
 */
const TitleExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const primary =
    ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;
  const textTertiary = ui.colorTextTertiary || themeObj.axisLabelColor;

  // 1. Basic Positioning Examples
  const topLeftOption: ChartOption = {
    title: {
      text: t(locale, 'examples.title.chartTitle.topLeft', 'Top Left'),
      left: 'left',
      top: 'top',
    },
    series: [],
  };

  const topCenterOption: ChartOption = {
    title: {
      text: t(locale, 'examples.title.chartTitle.topCenter', 'Top Center'),
      left: 'center',
      top: 'top',
    },
    series: [],
  };

  const topRightOption: ChartOption = {
    title: {
      text: t(locale, 'examples.title.chartTitle.topRight', 'Top Right'),
      left: 'right',
      top: 'top',
    },
    series: [],
  };

  const bottomCenterOption: ChartOption = {
    title: {
      text: t(
        locale,
        'examples.title.chartTitle.bottomCenter',
        'Bottom Center',
      ),
      left: 'center',
      top: 'bottom',
    },
    series: [],
  };

  const middleCenterOption: ChartOption = {
    title: {
      text: t(
        locale,
        'examples.title.chartTitle.middleCenter',
        'Middle Center',
      ),
      left: 'center',
      top: 'middle',
      textStyle: { fontSize: 24, color: primary },
    },
    series: [],
  };

  // 2. Styling (textStyle, subtextStyle, backgroundColor, border...)
  const styleOption: ChartOption = {
    title: {
      text: t(locale, 'examples.title.chartTitle.mainTitle', 'Main Title'),
      subtext: t(
        locale,
        'examples.title.chartTitle.subTitleCustom',
        'Subtitle with custom style',
      ),
      left: 'center',
      top: 'center',
      // Container style
      backgroundColor: ui.colorFillContainerAlt || themeObj.gridColor,
      borderColor: border,
      borderWidth: 2,
      borderRadius: 10,
      padding: [20, 40],
      // Text style
      textStyle: {
        color: themeObj.textColor,
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'serif',
      },
      // Subtext style
      subtextStyle: {
        color: textTertiary,
        fontSize: 14,
        fontStyle: 'italic',
      },
    },
    series: [],
  };

  // 3. Gap & Alignment
  const gapOption: ChartOption = {
    title: {
      text: t(
        locale,
        'examples.title.chartTitle.largeGap',
        'Title with Large Gap',
      ),
      subtext: t(
        locale,
        'examples.title.chartTitle.largeGapDesc',
        'Distance between title and subtitle is 30px',
      ),
      left: 'left',
      top: 'top',
      itemGap: 30, // Gap between title and subtext
      textStyle: { fontSize: 16 },
      subtextStyle: { fontSize: 12, color: 'red' },
    },
    series: [],
  };

  const chartStyle = {
    width: '100%',
    height: 200,
    border: `1px solid ${themeObj.gridColor}`,
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{t(locale, 'examples.title.pageTitle', 'Title Configuration')}</h1>
      <p style={{ color: textSecondary }}>
        {t(locale, 'examples.title.pageDesc.prefix', 'Matching')}{' '}
        <code>TitleOption</code>{' '}
        {t(locale, 'examples.title.pageDesc.suffix', 'interface.')}
      </p>

      <h3>
        {t(locale, 'examples.title.section.positioning', '1. Positioning')}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.hint.topLeft',
              "left: 'left', top: 'top'",
            )}
          </p>
          <HChart
            option={topLeftOption}
            style={chartStyle}
            theme={theme}
            locale={locale}
          />
        </div>
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.hint.topCenter',
              "left: 'center', top: 'top'",
            )}
          </p>
          <HChart
            option={topCenterOption}
            style={chartStyle}
            theme={theme}
            locale={locale}
          />
        </div>
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.hint.topRight',
              "left: 'right', top: 'top'",
            )}
          </p>
          <HChart
            option={topRightOption}
            style={chartStyle}
            theme={theme}
            locale={locale}
          />
        </div>
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.hint.bottomCenter',
              "left: 'center', top: 'bottom'",
            )}
          </p>
          <HChart
            option={bottomCenterOption}
            style={chartStyle}
            theme={theme}
            locale={locale}
          />
        </div>
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.hint.middleCenter',
              "left: 'center', top: 'middle'",
            )}
          </p>
          <HChart
            option={middleCenterOption}
            style={chartStyle}
            theme={theme}
            locale={locale}
          />
        </div>
      </div>

      <h3>
        {t(locale, 'examples.title.section.advanced', '2. Advanced Styling')}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.section.advanced.desc1',
              'textStyle, subtextStyle, backgroundColor, border, padding',
            )}
          </p>
          <HChart
            option={styleOption}
            style={{ width: '100%', height: 300, border: '1px solid #eee' }}
            theme={theme}
            locale={locale}
          />
        </div>
        <div>
          <p style={{ fontSize: 12 }}>
            {t(
              locale,
              'examples.title.section.advanced.desc2',
              'itemGap (30px), subtext color',
            )}
          </p>
          <HChart
            option={gapOption}
            style={{ width: '100%', height: 300, border: '1px solid #eee' }}
            theme={theme}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleExample;
