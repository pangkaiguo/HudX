import type { Meta, StoryObj } from '@storybook/react';
import { HChart } from 'hudx-charts';

/**
 * ScatterChart displays values for typically two variables for a set of data.
 */
const meta: Meta<typeof HChart> = {
  title: 'Charts/ScatterChart',
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
      title: { text: 'Basic Scatter Chart' },
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
          ],
          type: 'scatter'
        }
      ]
    },
  },
};
