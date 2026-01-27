import type { Meta, StoryObj } from '@storybook/react';
import { HChart } from 'hudx-charts';

/**
 * LineChart is used to represent data points connected by straight line segments.
 * It is often used to visualize a trend in data over intervals of time.
 */
const meta: Meta<typeof HChart> = {
  title: 'Charts/LineChart',
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

export const Basic: Story = {
  args: {
    width: 600,
    height: 400,
    option: {
      title: { text: 'Basic Line Chart' },
      tooltip: { show: true, trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    },
  },
};

export const MultipleSeries: Story = {
  args: {
    width: 600,
    height: 400,
    option: {
      title: { text: 'Multiple Line Series' },
      tooltip: { show: true, trigger: 'axis' },
      legend: { show: true, data: ['Email', 'Union Ads', 'Video Ads'] },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    },
  },
};

export const SmoothLine: Story = {
  args: {
    width: 600,
    height: 400,
    option: {
      title: { text: 'Smooth Line Chart' },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    },
  },
};
