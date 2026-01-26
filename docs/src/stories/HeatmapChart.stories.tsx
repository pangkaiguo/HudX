import type { Meta, StoryObj } from '@storybook/react';
import { HChart } from 'hudx-charts';

/**
 * HeatmapChart displays individual values in a matrix as colors.
 */
const meta: Meta<typeof HChart> = {
  title: 'Charts/HeatmapChart',
  component: HChart,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number', description: 'Chart width in pixels' },
    height: { control: 'number', description: 'Chart height in pixels' },
    theme: { 
      control: 'radio', 
      options: ['light', 'dark'],
      description: 'Color theme of the chart'
    },
    renderMode: {
      control: 'radio',
      options: ['canvas', 'svg'],
      description: 'Rendering mode: Canvas for performance, SVG for sharpness'
    },
    option: { control: 'object', description: 'ECharts-compatible configuration object' },
  },
};

export default meta;
type Story = StoryObj<typeof HChart>;

// Generate sample data
const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2]];

export const Basic: Story = {
  args: {
    width: 600,
    height: 400,
    option: {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
      },
      series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        }),
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
  },
};
