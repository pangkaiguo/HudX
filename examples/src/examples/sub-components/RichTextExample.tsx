import { HChart, type ChartOption } from 'hudx-charts';
import { Locale, Theme, ThemeManager } from 'hudx-render';
import { t } from '../../i18n';

export const RichTextExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;

  const option: ChartOption = {
    tooltip: {
      show: true,
      trigger: 'item',
      // formatter: '{b}\n{c} ({d}%)'
    },
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      top: 10,
      height: 150,
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: [50, 140],
        center: ['50%', '55%'],
        data: [
          { name: 'Direct', value: 335 },
          { name: 'Email', value: 310 },
          { name: 'Ads', value: 234 },
          { name: 'Video', value: 135 },
          { name: 'Search', value: 148 },
          { name: 'Baidu', value: 256 },
          { name: 'Google', value: 102 },
          { name: 'Bing', value: 147 },
          { name: 'Others', value: 102 },
        ],
        itemStyle: {
          borderWidth: 2,
          borderColor: themeObj.backgroundColor,
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b|{b}}\n{hr|}\n{c|{c}}  {per|{d}%}',
          rich: {
            b: {
              color: themeObj.textColor,
              fontSize: 14,
              fontWeight: 'bold',
              padding: [3, 4],
            },
            hr: {
              borderColor: themeObj.borderColor,
              width: '100%',
              borderWidth: 1,
              height: 0,
              padding: [0, 0],
            },
            c: {
              color: themeObj.textColor,
              fontSize: 12,
              fontWeight: 'bold',
              padding: [3, 4],
            },
            per: {
              color: primaryText,
              backgroundColor: primary,
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            // color should be automatic if not specified
          },
        },
      },
    ],
    animation: true,
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.richText.title', 'Rich Text Pie Chart')}
      </h2>
      <p style={{ marginBottom: 20, color: ui.colorTextSecondary || themeObj.axisLabelColor, fontSize: 14 }}>
        {t(
          locale,
          'examples.richText.desc',
          'Demonstrating rich text labels and auto-colored label lines.',
        )}
      </p>
      <div style={{ height: 500, border: `1px solid ${themeObj.gridColor}` }}>
        <HChart
          option={option}
          theme={theme}
          locale={locale}
          style={{ width: '100%', height: '600px' }}
        />
      </div>
    </div>
  );
};

export default RichTextExample;
