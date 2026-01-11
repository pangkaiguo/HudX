export interface Example {
  id: string;
  category: 'line' | 'bar' | 'pie' | 'scatter' | 'map' | 'candlestick' | 'radar' | 'boxplot' | 'heatmap' | 'graph' | 'tree' | 'treemap' | 'sunburst' | 'parallel' | 'other' | 'axis';
  title: string;
  subtitle: string;
  code: string;
}

export const examples: Example[] = [
  // --- Line Charts ---
  {
    id: 'basic-line',
    category: 'line',
    title: 'Basic Line Chart',
    subtitle: 'Basic Line Chart',
    code: `option = {
  title: {
    text: 'Basic Line Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};`
  },
  {
    id: 'smooth-line',
    category: 'line',
    title: 'Smoothed Line Chart',
    subtitle: 'Smoothed Line Chart',
    code: `option = {
  title: {
    text: 'Smoothed Line Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
};`
  },
  {
    id: 'area-line',
    category: 'line',
    title: 'Basic Area Chart',
    subtitle: 'Basic Area Chart',
    code: `option = {
  title: {
    text: 'Basic Area Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
};`
  },
  {
    id: 'stack-line',
    category: 'line',
    title: 'Stacked Line Chart',
    subtitle: 'Stacked Line Chart',
    code: `option = {
  title: {
    text: 'Stacked Line Chart'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};`
  },

  // --- Bar Charts ---
  {
    id: 'basic-bar',
    category: 'bar',
    title: 'Basic Bar Chart',
    subtitle: 'Basic Bar Chart',
    code: `option = {
  title: {
    text: 'Basic Bar Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};`
  },
  {
    id: 'advanced-bar',
    category: 'bar',
    title: 'Advanced Bar Chart',
    subtitle: 'Advanced Bar Chart',
    code: `option = {
  title: {
    text: 'Advanced Bar Chart',
    subtext: 'Feature Demonstration',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 20,
    icon: 'rect',
    selectedMode: 'single'
  },
  grid: {
    left: 70,
    right: 40,
    top: 80,
    bottom: 60
  },
  xAxis: {
    type: 'category',
    data: ['Q1', 'Q2', 'Q3', 'Q4'],
    show: true
  },
  yAxis: {
    type: 'value',
    show: true
  },
  series: [
    {
      name: 'Product A',
      type: 'bar',
      data: [320, 332, 301, 334],
      barGap: '30%'
    },
    {
      name: 'Product B',
      type: 'bar',
      data: [220, 182, 191, 234],
      barGap: '30%'
    },
    {
      name: 'Product C',
      type: 'bar',
      data: [150, 232, 201, 154],
      barGap: '30%'
    }
  ],
  animation: true,
  animationDuration: 600,
  animationEasing: 'cubicOut'
};`
  },
  {
    id: 'bar-3d',
    category: 'bar',
    title: '3D Bar Chart',
    subtitle: '3D Bar Chart',
    code: `option = {
  title: {
    text: '3D Bar Chart',
    subtext: 'Pseudo-3D Effect',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 20,
    icon: 'rect'
  },
  grid: {
    left: 60,
    right: 60,
    top: 40,
    bottom: 60
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true
  },
  yAxis: {
    type: 'value',
    show: true
  },
  series: [
    {
      name: 'Sales',
      type: 'bar3D',
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: { color: '#5470c6' }
    },
    {
      name: 'Profits',
      type: 'bar3D',
      data: [60, 100, 75, 40, 35, 55, 65],
      itemStyle: { color: '#91cc75' }
    }
  ],
  animation: true
};`
  },
  {
    id: 'stack-bar-3d',
    category: 'bar',
    title: 'Stacked 3D Bar Chart',
    subtitle: 'Stacked 3D Bar Chart',
    code: `option = {
  title: {
    text: 'Stacked 3D Bar Chart',
    subtext: 'Pseudo-3D Effect',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 20,
    icon: 'rect'
  },
  grid: {
    left: 60,
    right: 60,
    top: 40,
    bottom: 60
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true
  },
  yAxis: {
    type: 'value',
    show: true
  },
  series: [
    {
      name: 'Product A',
      type: 'stackBar3D',
      data: [120, 132, 101, 134, 90, 230, 210],
      itemStyle: { color: '#5470c6', borderWidth: 0 }
    },
    {
      name: 'Product B',
      type: 'stackBar3D',
      data: [220, 182, 191, 234, 290, 330, 310],
      itemStyle: { color: '#91cc75', borderWidth: 0 }
    },
    {
      name: 'Product C',
      type: 'stackBar3D',
      data: [150, 232, 201, 154, 190, 330, 410],
      itemStyle: { color: '#fac858', borderWidth: 0 }
    }
  ],
  animation: true
};`
  },
  {
    id: 'stack-bar',
    category: 'bar',
    title: 'Stack Bar Chart',
    subtitle: 'Stack Bar Chart',
    code: `option = {
  title: {
    text: 'Stack Bar Chart',
    subtext: 'Data Accumulation',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'left',
    top: 'middle'
  },
  grid: {
    left: '15%',
    right: '4%',
    bottom: '3%',
    top: 40,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true
    }
  ],
  yAxis: [
    {
      type: 'value',
      show: true
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      emphasis: { focus: 'series' },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'total',
      emphasis: { focus: 'series' },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'bar',
      stack: 'total',
      emphasis: { focus: 'series' },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'total',
      emphasis: { focus: 'series' },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: { focus: 'series' },
      markLine: {
        lineStyle: { type: 'dashed' },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    }
  ]
};`
  },
  {
    id: 'stack-horizontal-bar',
    category: 'bar',
    title: 'Stacked Horizontal Bar Chart',
    subtitle: 'Stacked Horizontal Bar Chart',
    code: `option = {
  title: {
    text: 'Stacked Horizontal Bar',
    subtext: 'Data Accumulation',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
    bottom: 10
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: 80,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: true
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: { show: true },
      emphasis: { focus: 'series' },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: { show: true },
      emphasis: { focus: 'series' },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: { show: true },
      emphasis: { focus: 'series' },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'total',
      label: { show: true },
      emphasis: { focus: 'series' },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      stack: 'total',
      label: { show: true },
      emphasis: { focus: 'series' },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ],
  animation: true
};`
  },

  // --- Pie Charts ---
  {
    id: 'basic-pie',
    category: 'pie',
    title: 'Basic Pie Chart',
    subtitle: 'Basic Pie Chart',
    code: `option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};`
  },
  {
    id: 'doughnut',
    category: 'pie',
    title: 'Doughnut Chart',
    subtitle: 'Doughnut Chart',
    code: `option = {
  title: {
    text: 'Doughnut Chart',
    subtext: 'Inner Radius Config',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'left',
    top: 'middle',
    icon: 'rect'
  },
  series: [
    {
      name: 'Access Source',
      type: 'doughnut',
      radius: ['40%', '70%'],
      itemStyle: {
        borderWidth: 0,
        borderColor: 'transparent'
      },
      emphasis: {
        scale: true,
        scaleSize: 1.03,
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
        },
        label: {
          show: true,
          formatter: '{title|{name}}\\n{value|{value}}\\n{sub|{desc}}'
        }
      },
      data: [
        { value: 1048, name: 'Search Engine', desc: 'Google, Bing' },
        { value: 735, name: 'Direct', desc: 'Direct URL' },
        { value: 580, name: 'Email', desc: 'Marketing' },
        { value: 484, name: 'Union Ads', desc: 'Partners' },
        { value: 300, name: 'Video Ads', desc: 'Youtube' }
      ],
      centerLabel: {
        show: true,
        formatter: '{title|Amount (HKD)}\\n{value|999,999}\\n{sub|Supporting text}',
        rich: {
          title: {
            fontSize: 14,
            color: '#999',
            fontWeight: 'normal',
            padding: [0, 0, 4, 0]
          },
          value: {
            fontSize: 24,
            color: '#333',
            fontWeight: 'bold',
            padding: [4, 0, 4, 0]
          },
          sub: {
            fontSize: 12,
            color: '#aaa',
            fontWeight: 'normal',
            padding: [4, 0, 0, 0]
          }
        }
      },
      label: {
        show: false,
        position: 'center',
        formatter: '{b}: {c} ({d}%)'
      }
    }
  ],
  animation: true
};`
  },
  {
    id: 'half-doughnut',
    category: 'pie',
    title: 'Half Doughnut Chart',
    subtitle: 'Half Doughnut Chart',
    code: `option = {
  title: {
    text: 'Half Doughnut Chart',
    subtext: 'Start/End Angle Config',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'left',
    top: 'middle',
    icon: 'rect'
  },
  series: [
    {
      name: 'Access Source',
      type: 'half-doughnut',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      startAngle: 180,
      endAngle: 360,
      itemStyle: {
        borderWidth: 0,
        borderColor: 'transparent'
      },
      emphasis: {
        scale: true,
        scaleSize: 1.03,
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      label: {
        show: false,
        position: 'center',
        formatter: '{b}'
      }
    }
  ],
  animation: true
};`
  },
  {
    id: 'rich-text-pie',
    category: 'pie',
    title: 'Rich Text Pie Chart',
    subtitle: 'Rich Text Pie Chart',
    code: `option = {
  title: {
    text: 'Rich Text Pie',
    subtext: 'Custom Formatter',
    left: 'center',
    top: 25
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'left',
    top: 'middle',
    height: 150
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
        formatter: '{b|{b}}\\n{hr|}\\n{c|{c}}  {per|{d}%}',
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
        show: true
      }
    }
  ],
  animation: true
};`
  },

  // --- Scatter Charts ---
  {
    id: 'scatter-chart',
    category: 'scatter',
    title: 'Scatter Chart',
    subtitle: 'Scatter Chart',
    code: `option = {
  title: {
    text: 'Scatter Chart',
    subtext: 'Data Distribution',
    left: 'center',
    top: 20
  },
  tooltip: {
    show: true,
    trigger: 'item',
    layout: 'vertical'
  },
  legend: {
    show: true,
    bottom: 20
  },
  grid: {
    top: 80,
    bottom: 60,
    left: 60,
    right: 40
  },
  xAxis: {
    type: 'value',
    name: 'X Axis',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#eee',
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: 'Y Axis',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#eee'
      }
    }
  },
  series: [
    {
      name: 'Group A',
      type: 'scatter',
      symbolSize: 12,
      data: [
        [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81],
        [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26],
        [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
      ],
      itemStyle: { color: '#5470c6' }
    },
    {
      name: 'Group B',
      type: 'scatter',
      symbolSize: 12,
      data: [
        [10.0, 9.14], [8.0, 8.14], [13.0, 8.74], [9.0, 8.77],
        [11.0, 9.26], [14.0, 8.10], [6.0, 6.13], [4.0, 3.10],
        [12.0, 9.13], [7.0, 7.26], [5.0, 4.74]
      ],
      itemStyle: { color: '#91cc75' }
    }
  ],
  animation: true
};`
  },

  // --- Axis ---
  {
    id: 'axis-label',
    category: 'axis',
    title: 'Axis Label Configuration',
    subtitle: 'Axis Label Configuration',
    code: `option = {
  title: {
    text: 'X Axis Label Configuration',
    subtext: 'Rotation and Wrapping',
    left: 'center',
    top: 20
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    bottom: 100,
    top: 80
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
      'Just A Normal Label'
    ],
    axisLabel: {
      rotate: 45,
      width: 60,
      overflow: 'break',
      interval: 0
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: { color: '#5470c6' }
    }
  ]
};`
  },

  // --- Bundle ---
  {
    id: 'bundle-test',
    category: 'other',
    title: 'Unified Bundle Example',
    subtitle: 'Unified Bundle Example',
    code: `option = {
  title: {
    text: 'Unified Bundle Example',
    left: 'center'
  },
  padding: [40, 40, 40, 40],
  grid: {
    left: 60,
    right: 40,
    top: 60,
    bottom: 60,
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    show: true
  },
  yAxis: {
    type: 'value',
    show: true
  },
  series: [{
    type: 'bar',
    name: 'Sales',
    data: [120, 200, 150, 80, 70],
    itemStyle: { color: '#5470c6' }
  }],
  tooltip: {
    show: true
  }
};`
  }
];