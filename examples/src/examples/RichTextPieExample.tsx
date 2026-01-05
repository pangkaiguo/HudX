import React from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption } from 'HudX/charts';
import { ThemeManager } from 'HudX/core';

export const RichTextPieExample = () => {
  const theme = ThemeManager.getTheme('light');

  const option: ChartOption = {
    title: {
      text: 'Rich Text Pie',
      left: 'center',
      top: 25
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b}\n{c} ({d}%)'
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      top: 'middle',
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
          { name: 'Others', value: 102 }
        ],
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff',
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b|{b}}\n{hr|}\n{c|{c}}  {per|{d}%}',
          rich: {
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              padding: [3, 4],
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0,
              padding: [0, 0]
            },
            c: {
              color: '#4C5058',
              fontSize: 12,
              fontWeight: 'bold',
              padding: [3, 4],
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        labelLine: {
          show: true,
          lineStyle: {
            // color should be automatic if not specified
          }
        }
      }
    ],
    animation: true
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Rich Text Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Demonstrating rich text labels and auto-colored label lines.
      </p>
      <div style={{ height: 500, border: '1px solid #eee' }}>
        <HChart option={option} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default RichTextPieExample;
