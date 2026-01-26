import type { Meta, StoryObj } from '@storybook/react';
import { HChart } from 'hudx-charts';

/**
 * HalfDoughnutChart displays a semi-circular gauge or meter chart.
 */
const meta: Meta<typeof HChart> = {
  title: 'Charts/HalfDoughnutChart',
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
      title: {
        text: 'System Status',
        left: 'center',
        top: 'bottom'
      },
      series: [
        {
          type: 'half-doughnut',
          radius: ['50%', '100%'],
          center: ['50%', '70%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 50, name: 'Completed' },
            { value: 50, name: 'Remaining' }
          ]
        }
      ]
    },
  },
};
