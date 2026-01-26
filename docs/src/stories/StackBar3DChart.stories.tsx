import type { Meta, StoryObj } from '@storybook/react';
import { HChart } from 'hudx-charts';

/**
 * StackBar3DChart displays stacked categorical data in a pseudo-3D perspective.
 */
const meta: Meta<typeof HChart> = {
  title: 'Charts/StackBar3DChart',
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
      title: { text: 'Stacked 3D Bar Chart' },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Direct',
          type: 'stackBar3D',
          stack: 'total',
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: 'Mail Ad',
          type: 'stackBar3D',
          stack: 'total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Affiliate Ad',
          type: 'stackBar3D',
          stack: 'total',
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ],
    },
  },
};
