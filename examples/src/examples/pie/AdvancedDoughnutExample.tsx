import React, { useRef } from 'react';
import { HChart } from 'HudX/charts';
import type { ChartOption, HChartRef } from 'HudX/charts';

export const AdvancedDoughnutExample = () => {
  const portionRef = useRef<HChartRef>(null);
  const progressRef = useRef<HChartRef>(null);
  const darkRef = useRef<HChartRef>(null);
  const nestedRef = useRef<HChartRef>(null);

  // 1. Portion Doughnut Chart - Rich Text Label
  const portionOption: ChartOption = {
    title: {
      text: 'Portion Doughnut Chart',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 10,
      left: 'center',
      icon: 'circle'
    },
    series: [
      {
        name: 'Portion',
        type: 'doughnut',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        centerLabel: {
          show: true,
          formatter: '{title|Total}\n{value|3,147}\n{sub|Visits}',
          rich: {
            title: {
              fontSize: 14,
              color: '#666',
              lineHeight: 20
            },
            value: {
              fontSize: 28,
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 30
            },
            sub: {
              fontSize: 12,
              color: '#999',
              lineHeight: 20
            }
          }
        }
      }
    ]
  };

  // 2. Progress Doughnut Chart - Percentage Label
  const progressOption: ChartOption = {
    title: {
      text: 'Progress Doughnut Chart',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'doughnut',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Completed' },
          { value: 300, name: 'Remaining', itemStyle: { color: '#eee' } }
        ],
        centerLabel: {
          show: true,
          type: 'percentage',
          formatter: '{d}%',
          style: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333'
          }
        }
      }
    ]
  };

  // 3. Dark Mode Doughnut Chart
  const darkOption: ChartOption = {
    backgroundColor: '#1a1a1a',
    title: {
      text: 'Dark Mode Doughnut',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'doughnut',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        centerLabel: {
          show: true,
          formatter: '{title|Traffic}\n{value|High}',
          rich: {
            title: {
              fontSize: 14,
              color: '#aaa',
              lineHeight: 20
            },
            value: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
              lineHeight: 30
            }
          }
        }
      }
    ]
  };

  // 4. Nested Doughnut Chart
  const nestedOption: ChartOption = {
    title: {
      text: 'Nested Doughnut Chart',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      data: ['Direct', 'Marketing', 'Search Engine', 'Email', 'Union Ads', 'Video Ads', 'Baidu', 'Google', 'Bing', 'Others'],
      top: 'bottom',
      left: 'center'
    },
    series: [
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['30%', '45%'],
        center: ['50%', '50%'],
        label: {
          position: 'inside',
          fontSize: 10,
          formatter: '{b}\n{d}%',
          color: '#fff'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: 'Direct' },
          { value: 679, name: 'Marketing' },
          { value: 1548, name: 'Search Engine' }
        ],
        centerLabel: {
          show: false // No center label for inner ring
        }
      },
      {
        name: 'Access Source',
        type: 'doughnut',
        radius: ['55%', '75%'],
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 234, name: 'Union Ads' },
          { value: 135, name: 'Video Ads' },
          { value: 1048, name: 'Baidu' },
          { value: 251, name: 'Google' },
          { value: 147, name: 'Bing' },
          { value: 102, name: 'Others' }
        ],
        centerLabel: {
          show: true,
          formatter: '{title|Total}\n{value|3,562}',
          rich: {
            title: {
              fontSize: 12,
              color: '#999',
              lineHeight: 16
            },
            value: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 20
            }
          }
        }
      }
    ]
  };

  const chartStyle = {
    height: '400px',
    width: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    marginBottom: '20px'
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Advanced Doughnut Charts</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>
        Demonstrating various center label configurations and nested layouts.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div>
          <HChart
            ref={portionRef}
            option={portionOption}
            style={chartStyle}
          />
        </div>
        <div>
          <HChart
            ref={progressRef}
            option={progressOption}
            style={chartStyle}
          />
        </div>
        <div>
          <HChart
            ref={darkRef}
            option={darkOption}
            style={chartStyle}
          />
        </div>
        <div>
          <HChart
            ref={nestedRef}
            option={nestedOption}
            style={chartStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedDoughnutExample;
