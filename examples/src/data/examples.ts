export interface Example {
  id: string;
  category: 'line' | 'bar' | 'pie' | 'scatter' | 'sub-components' | 'bundle';
  title: string;
  subtitle: string;
  code: string;
}

export const examples: Example[] = [
  {
    id: 'basic-line',
    category: 'line',
    title: 'Basic Line Chart',
    subtitle: 'Basic line with tooltip, legend and optional grid lines',
    code: `option = {
  tooltip: { show: true, trigger: 'axis' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  grid: { left: 60, right: 40, top: 40, bottom: 60 },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true,
    splitNumber: 10,
    splitLine: { show: false, lineStyle: { color: '#e6e6e6', type: 'dashed' } }
  },
  yAxis: {
    type: 'value',
    show: true,
    splitNumber: 10,
    splitLine: { show: false, lineStyle: { color: '#e6e6e6' } }
  },
  series: [{
    name: 'Weekly Data',
    type: 'line',
    data: [120, 200, 150, 80, 70, 110, 130],
    itemStyle: { color: '#5470c6' },
    lineStyle: { width: 1 },
    showSymbol: true,
    emphasis: { scale: true, itemStyle: { color: '#ee6666' } }
  }],
  animation: true
};`,
  },
  {
    id: 'stack-line',
    category: 'line',
    title: 'Stack Line Chart',
    subtitle: 'Multi-series line with symbols and dashed grid',
    code: `option = {
  tooltip: { show: true, trigger: 'axis' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  grid: { left: 70, right: 40, top: 60, bottom: 60 },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true,
    splitNumber: 10,
    splitLine: { show: true, lineStyle: { color: '#eee', type: 'dashed' } }
  },
  yAxis: {
    type: 'value',
    show: true,
    splitNumber: 10,
    splitLine: { show: true, lineStyle: { color: '#eee' } }
  },
  series: [
    {
      name: 'Series A',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: { color: '#5470c6' },
      lineStyle: { width: 1 },
      showSymbol: true,
      symbol: 'circle'
    },
    {
      name: 'Series B',
      type: 'line',
      data: [100, 150, 120, 110, 90, 140, 120],
      itemStyle: { color: '#91cc75' },
      lineStyle: { width: 1 },
      showSymbol: true,
      symbol: 'rect',
      symbolSize: 8
    },
    {
      name: 'Series C',
      type: 'line',
      data: [80, 120, 100, 140, 110, 100, 90],
      itemStyle: { color: '#fac858' },
      lineStyle: { width: 1 },
      showSymbol: true,
      symbol: 'triangle',
      symbolSize: 10
    }
  ],
  animation: true,
  animationDuration: 600,
  animationEasing: 'cubicOut'
};`,
  },
  {
    id: 'area-line',
    category: 'line',
    title: 'Area Line Chart',
    subtitle: 'Area fill + smooth curves + denser x-axis labels',
    code: `const category = [
  '1/2','1/3','1/4','1/5','1/6','1/7','1/8','1/9','1/10','1/11',
  '1/12','1/13','1/14','1/15','1/16','1/17','1/18','1/19','1/20','1/21',
  '1/22','1/23','1/24','1/25','1/26','1/27','1/28','1/29','1/30','1/31'
];
const valuesA = [120,124,123,126,130,128,132,136,140,139,142,145,147,149,151,150,153,156,158,160,161,163,165,166,168,170,172,174,175,176];
const valuesB = [90,92,91,93,95,97,98,100,101,103,105,106,108,110,112,111,113,115,116,118,120,121,123,124,126,127,129,130,131,133];
const valuesC = [140,142,143,145,147,149,150,152,154,156,158,159,161,163,165,166,168,170,172,173,175,177,179,180,182,184,185,187,189,190];

option = {
  tooltip: { show: true, trigger: 'axis' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  grid: { left: 50, right: 40, top: 60, bottom: 60 },
  xAxis: {
    type: 'category',
    data: category,
    show: true,
    splitNumber: 10,
    splitLine: { show: true, lineStyle: { color: '#eee', type: 'dashed' } },
    axisLabel: { interval: function (index) { return index % 5 === 0; } }
  },
  yAxis: {
    type: 'value',
    show: true,
    splitNumber: 10,
    splitLine: { show: true, lineStyle: { color: '#eee' } }
  },
  series: [
    { name: 'Series A', type: 'line', data: valuesA, itemStyle: { color: '#5470c6' }, lineStyle: { width: 1 }, showSymbol: false, smooth: true, areaStyle: { opacity: 0.3 } },
    { name: 'Series B', type: 'line', data: valuesB, itemStyle: { color: '#91cc75' }, lineStyle: { width: 1 }, showSymbol: false, smooth: true, areaStyle: { opacity: 0.3 } },
    { name: 'Series C', type: 'line', data: valuesC, itemStyle: { color: '#fac858' }, lineStyle: { width: 1 }, showSymbol: false, smooth: true, areaStyle: { opacity: 0.3 } }
  ],
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut'
};`,
  },
  {
    id: 'smooth-line',
    category: 'line',
    title: 'Smooth Line Chart',
    subtitle: 'Smooth line with tension control',
    code: `const xs = Array.from({ length: 60 }, (_, i) => String(i + 1));
const ys = xs.map((_, i) => Math.round(Math.sin(i / 6) * 40 + 120));

option = {
  tooltip: { show: true, trigger: 'axis' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  grid: { left: 60, right: 40, top: 60, bottom: 60 },
  xAxis: {
    type: 'category',
    data: xs,
    show: true,
    splitNumber: 8,
    axisLabel: { interval: function (index) { return index % 6 === 0; } },
    splitLine: { show: true, lineStyle: { color: '#eee', type: 'dashed' } }
  },
  yAxis: {
    type: 'value',
    show: true,
    splitNumber: 5,
    splitLine: { show: true, lineStyle: { color: '#eee' } }
  },
  series: [{
    name: 'Smooth Series',
    type: 'line',
    data: ys,
    smooth: 0.5,
    showSymbol: false,
    lineStyle: { width: 1 }
  }],
  animation: true
};`,
  },
  {
    id: 'basic-bar',
    category: 'bar',
    title: 'Basic Bar Chart',
    subtitle: 'Axis tooltip + optional grid + optional background',
    code: `option = {
  tooltip: { show: true, trigger: 'axis' },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  grid: { left: 60, right: 40, top: 80, bottom: 60 },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true,
    axisLabel: { interval: 'auto' },
    splitNumber: 10,
    splitLine: { show: false, interval: 'auto', lineStyle: { color: '#e6e6e6', type: 'dashed' } }
  },
  yAxis: {
    type: 'value',
    show: true,
    splitNumber: 10,
    splitLine: { show: false, lineStyle: { color: '#e6e6e6', type: 'solid' } }
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
      label: { show: true, position: 'outside', formatter: '{b}: {c}' },
      showBackground: false,
      backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
      itemStyle: { color: '#5470c6', opacity: 0.8, borderWidth: 0 }
    },
  ],
  animation: true
};`,
  },
  {
    id: 'group-bar',
    category: 'bar',
    title: 'Group Bar Chart',
    subtitle: 'Grouped bars with configurable barGap and optional decals',
    code: `option = {
  tooltip: { show: true, trigger: 'axis' },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'rect', symbolSize: 0.3, color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'circle', symbolSize: 0.3, color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'triangle', symbolSize: 0.3, color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect', selectedMode: 'single' },
  grid: { left: 70, right: 40, top: 80, bottom: 60 },
  xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } } },
  yAxis: { type: 'value', show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee' } } },
  series: [
    { name: 'Product A', type: 'bar', data: [320, 332, 301, 334], label: { show: true, position: 'top', formatter: '{c}' }, itemStyle: { color: '#5470c6', borderWidth: 0 }, barGap: '30%' },
    { name: 'Product B', type: 'bar', data: [220, 182, 191, 234], label: { show: true, position: 'top', formatter: '{c}' }, itemStyle: { color: '#91cc75', borderWidth: 0 }, barGap: '30%' },
    { name: 'Product C', type: 'bar', data: [150, 232, 201, 154], label: { show: true, position: 'top', formatter: '{c}' }, itemStyle: { color: '#fac858', borderWidth: 0 }, barGap: '30%' }
  ],
  animation: true,
  animationDuration: 600,
  animationEasing: 'cubicOut'
};`,
  },
  {
    id: 'diverging-horizontal-bar',
    category: 'bar',
    title: 'Diverging Horizontal Bar',
    subtitle: 'Horizontal grouped bars with positive/negative values',
    code: `option = {
  tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10 },
  grid: { left: '15%', right: '4%', bottom: '10%', top: 40, containLabel: true },
  xAxis: { type: 'value', axisLine: { show: true }, axisTick: { show: true }, splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } } },
  yAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], axisTick: { show: false }, axisLine: { show: false }, splitLine: { show: false, lineStyle: { color: '#eee' } } },
  series: [
    { name: 'Profit', type: 'bar', data: [200,170,240,244,200,220,210], label: { show: true, position: 'inside', formatter: '{c}', color: '#fff' } },
    { name: 'Expenses', type: 'bar', data: [-120,-132,-101,-134,-190,-230,-210], label: { show: true, position: 'outside', formatter: '{c}' } },
    { name: 'Income', type: 'bar', data: [320,302,341,374,390,450,420], label: { show: true, position: 'inside', formatter: '{c}', color: '#222' } }
  ],
  animation: true
};`,
  },
  {
    id: 'diverging-vertical-bar',
    category: 'bar',
    title: 'Diverging Vertical Bar',
    subtitle: 'Vertical grouped bars with positive/negative values',
    code: `option = {
  tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10 },
  grid: { left: '15%', right: '4%', bottom: '10%', top: 40, containLabel: true },
  xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], axisTick: { show: false }, axisLine: { show: false }, splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } } },
  yAxis: { type: 'value', splitLine: { show: false, lineStyle: { color: '#eee' } } },
  series: [
    { name: 'Profit', type: 'bar', data: [200,170,240,244,200,220,210], label: { show: true, position: 'inside', formatter: '{c}', color: '#fff' } },
    { name: 'Expenses', type: 'bar', data: [-120,-132,-101,-134,-190,-230,-210], label: { show: true, position: 'outside', formatter: '{c}' } },
    { name: 'Income', type: 'bar', data: [320,302,341,374,390,450,420], label: { show: true, position: 'inside', formatter: '{c}', color: '#222' } }
  ],
  animation: true
};`,
  },
  {
    id: 'stack-bar',
    category: 'bar',
    title: 'Stack Bar Chart',
    subtitle: 'Stacked bars with axisPointer and markLine',
    code: `option = {
  tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { show: true, orient: 'vertical', right: 10, top: 10 },
  grid: { left: '15%', right: '4%', bottom: '10%', top: 40, containLabel: true },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  xAxis: [{
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: true,
    splitNumber: 10,
    splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } }
  }],
  yAxis: [{
    type: 'value',
    show: true,
    splitNumber: 10,
    splitLine: { show: false, lineStyle: { color: '#eee' } }
  }],
  series: [
    { name: 'Direct', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}' }, emphasis: { focus: 'series' }, data: [320, 332, 301, 334, 390, 330, 320], itemStyle: { borderWidth: 0 } },
    { name: 'Email', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}' }, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210], itemStyle: { borderWidth: 0 } },
    { name: 'Union Ads', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}' }, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310], itemStyle: { borderWidth: 0 } },
    { name: 'Video Ads', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}' }, emphasis: { focus: 'series' }, data: [150, 232, 201, 154, 190, 330, 410], itemStyle: { borderWidth: 0 } },
  ]
};`,
  },
  {
    id: 'stack-horizontal-bar',
    category: 'bar',
    title: 'Stacked Horizontal Bar Chart',
    subtitle: 'Horizontal stacked bars with labels',
    code: `option = {
  tooltip: { show: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'] },
  grid: { left: '15%', right: '4%', bottom: '10%', top: 80, containLabel: true },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  xAxis: { type: 'value', show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } } },
  yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], show: true, splitLine: { show: false, lineStyle: { color: '#eee' } } },
  series: [
    { name: 'Direct', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10 }, emphasis: { focus: 'series' }, data: [320, 302, 301, 334, 390, 330, 320], itemStyle: { borderWidth: 0 } },
    { name: 'Mail Ad', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10 }, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210], itemStyle: { borderWidth: 0 } },
    { name: 'Affiliate Ad', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10 }, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310], itemStyle: { borderWidth: 0 } },
    { name: 'Video Ad', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10 }, emphasis: { focus: 'series' }, data: [150, 212, 201, 154, 190, 330, 410], itemStyle: { borderWidth: 0 } },
    { name: 'Search Engine', type: 'bar', stack: 'total', label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10 }, emphasis: { focus: 'series' }, data: [820, 832, 901, 934, 1290, 1330, 1320], itemStyle: { borderWidth: 0 } }
  ],
  animation: true
};`,
  },
  //   {
  //     id: 'bar-3d',
  //     category: 'bar',
  //     title: '3D Bar Chart',
  //     subtitle: 'Pseudo-3D bar chart (bar3D)',
  //     code: `option = {
  //   tooltip: { show: true, trigger: 'item' },
  //   legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  //   grid: { left: 60, right: 60, top: 40, bottom: 60 },
  //   aria: {
  //     enabled: true,
  //     decal: {
  //       show: false,
  //       decals: [
  //         { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
  //       ]
  //     }
  //   },
  //   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } } },
  //   yAxis: { type: 'value', show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee' } } },
  //   series: [
  //     { name: 'Sales', type: 'bar3D', data: [120, 200, 150, 80, 70, 110, 130], itemStyle: { color: '#5470c6', borderWidth: 0 } },
  //     { name: 'Profits', type: 'bar3D', data: [60, 100, 75, 40, 35, 55, 65], itemStyle: { color: '#91cc75', borderWidth: 0 } }
  //   ],
  //   animation: true
  // };`,
  //   },
  //   {
  //     id: 'stack-bar-3d',
  //     category: 'bar',
  //     title: 'Stacked 3D Bar Chart',
  //     subtitle: 'Pseudo-3D stacked bars (stackBar3D)',
  //     code: `option = {
  //   tooltip: { show: true, trigger: 'item' },
  //   legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  //   grid: { left: 60, right: 60, top: 40, bottom: 60 },
  //   aria: {
  //     enabled: true,
  //     decal: {
  //       show: false,
  //       decals: [
  //         { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
  //         { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
  //       ]
  //     }
  //   },
  //   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee', type: 'dashed' } } },
  //   yAxis: { type: 'value', show: true, splitNumber: 10, splitLine: { show: false, lineStyle: { color: '#eee' } } },
  //   series: [
  //     { name: 'Product A', type: 'stackBar3D', data: [120, 132, 101, 134, 90, 230, 210], itemStyle: { color: '#5470c6', borderWidth: 0 } },
  //     { name: 'Product B', type: 'stackBar3D', data: [220, 182, 191, 234, 290, 330, 310], itemStyle: { color: '#91cc75', borderWidth: 0 } },
  //     { name: 'Product C', type: 'stackBar3D', data: [150, 232, 201, 154, 190, 330, 410], itemStyle: { color: '#fac858', borderWidth: 0 } }
  //   ],
  //   animation: true
  // };`,
  //   },
  {
    id: 'basic-pie',
    category: 'pie',
    title: 'Pie Chart',
    subtitle: 'Pie / roseType + tooltip formatter + optional decals',
    code: `option = {
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    textStyle: { color: '#333' },
    formatter: function (params) {
      return (
        '<div style="display:flex;align-items:center;">' +
          params.marker +
          '<span style="font-weight:bold;margin-left:4px;">' + params.name + '</span>' +
        '</div>' +
        '<div style="padding-left:18px;">' +
          params.value + ' <span style="color:#666">(' + params.percent + '%)</span>' +
        '</div>'
      );
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  series: [{
    name: 'Distribution',
    type: 'pie',
    radius: 200,
    center: ['50%', '55%'],
    roseType: false,
    data: [
      { name: 'Direct', value: 335, itemStyle: { color: '#5470c6' } },
      { name: 'Email', value: 310, itemStyle: { color: '#91cc75' } },
      { name: 'Ads', value: 234, itemStyle: { color: '#fac858' } },
      { name: 'Video', value: 135, itemStyle: { color: '#ee6666' } },
      { name: 'Search', value: 148, itemStyle: { color: '#73c0de' } }
    ],
    itemStyle: { opacity: 0.8, borderRadius: 0 },
    emphasis: { scale: true, scaleSize: 1.03, itemStyle: { opacity: 1 }, focus: 'self' },
    label: { show: true, position: 'outside', formatter: '{b}\\n{c} ({d}%)', showOnHover: true }
  }],
  animation: true
};`,
  },
  {
    id: 'advanced-pie',
    category: 'pie',
    title: 'Advanced Pie Chart',
    subtitle: 'Legend wrap + tooltip formatter + optional decals',
    code: `option = {
  tooltip: { show: true, trigger: 'item', formatter: '{marker} {b} <br/> {c} ({d}%)' },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'rect', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'circle', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'triangle', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'cross', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'pin', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'pentagon', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'arrow', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: {
    show: true,
    orient: 'horizontal',
    right: 10,
    top: 10,
    icon: 'rect',
    width: 400,
    height: 150,
    itemWidth: 140
  },
  series: [{
    name: 'Distribution',
    type: 'pie',
    radius: 200,
    center: ['60%', '50%'],
    emphasis: { scale: true, scaleSize: 1.03, focus: 'self' },
    itemStyle: { borderWidth: 0, borderColor: 'transparent' },
    data: [
      { name: 'Category Label A', value: 335 },
      { name: 'Category Label B', value: 310 },
      { name: 'Category Label C', value: 234 },
      { name: 'Category Label D', value: 135 },
      { name: 'Category Label E', value: 148 },
      { name: 'Category Label F', value: 200 },
      { name: 'Category Label G', value: 180 },
      { name: 'Category Label H', value: 160 },
      { name: 'Category Label I', value: 140 },
      { name: 'Category Label J', value: 120 },
      { name: 'Category Label K', value: 100 },
      { name: 'Category Label L', value: 80 }
    ],
    label: { show: true, position: 'outside', formatter: '{b}', showOnHover: true }
  }],
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut'
};`,
  },
  {
    id: 'doughnut',
    category: 'pie',
    title: 'Doughnut Chart',
    subtitle: 'Doughnut type + rich centerLabel + hover emphasis',
    code: `option = {
  tooltip: { show: true, trigger: 'item' },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  series: [{
    name: 'Access Source',
    type: 'doughnut',
    radius: ['40%', '70%'],
    itemStyle: { borderWidth: 0, borderColor: 'transparent' },
    emphasis: {
      scale: true,
      scaleSize: 1.03,
      itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.6)' },
      label: { show: true, formatter: '{title|{name}}\\n{value|{value}}\\n{sub|{desc}}' }
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
        title: { fontSize: 14, color: '#999', fontWeight: 'normal', padding: [0, 0, 4, 0] },
        value: { fontSize: 24, color: '#333', fontWeight: 'bold', padding: [4, 0, 4, 0] },
        sub: { fontSize: 12, color: '#aaa', fontWeight: 'normal', padding: [4, 0, 0, 0] }
      }
    },
    label: { show: false, position: 'center', formatter: '{b}: {c} ({d}%)' }
  }],
  animation: true
};`,
  },
  {
    id: 'advanced-doughnut',
    category: 'pie',
    title: 'Advanced Doughnut',
    subtitle: 'Doughnut centerLabel + emphasis rich text (portion demo)',
    code: `option = {
  tooltip: { trigger: 'item' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'circle' },
  series: [{
    name: 'Portion',
    type: 'doughnut',
    radius: ['50%', '70%'],
    center: ['50%', '50%'],
    avoidLabelOverlap: false,
    label: { show: false, position: 'center' },
    emphasis: {
      scale: true,
      scaleSize: 1.03,
      label: { show: true, fontSize: 20, fontWeight: 'bold', formatter: '{title|{name}}\\n{value|{value}}\\n{sub|{d}%}' }
    },
    labelLine: { show: false },
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ],
    centerLabel: {
      show: true,
      formatter: '{title|Total}\\n{value|3,147}\\n{sub|Visits}',
      rich: {
        title: { fontSize: 14, color: '#666', lineHeight: 20 },
        value: { fontSize: 28, fontWeight: 'bold', color: '#333', lineHeight: 30 },
        sub: { fontSize: 12, color: '#999', lineHeight: 20 }
      }
    }
  }]
};`,
  },
  {
    id: 'half-doughnut',
    category: 'pie',
    title: 'Half Doughnut',
    subtitle: 'Half-doughnut type (180° arc)',
    code: `option = {
  tooltip: { show: true, trigger: 'item' },
  aria: {
    enabled: true,
    decal: {
      show: false,
      decals: [
        { symbol: 'diagonal', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'dots', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'diagonal-reverse', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'checkerboard', color: 'rgba(0, 0, 0, 0.2)' },
        { symbol: 'crosshatch', color: 'rgba(0, 0, 0, 0.2)' }
      ]
    }
  },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, icon: 'rect' },
  series: [{
    name: 'Access Source',
    type: 'half-doughnut',
    radius: ['40%', '70%'],
    center: ['50%', '70%'],
    startAngle: 180,
    endAngle: 360,
    itemStyle: { borderWidth: 0, borderColor: 'transparent' },
    emphasis: {
      scale: true,
      scaleSize: 1.03,
      itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.6)' },
      label: { show: true, fontSize: 16, fontWeight: 'bold' }
    },
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ],
    label: { show: false, position: 'center', formatter: '{b}' }
  }],
  animation: true
};`,
  },
  {
    id: 'scatter-chart',
    category: 'scatter',
    title: 'Scatter Chart',
    subtitle: 'Two scatter series with legend and grid lines',
    code: `option = {
  tooltip: { show: true, trigger: 'item', layout: 'vertical' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10 },
  grid: { top: 80, bottom: 60, left: 60, right: 40 },
  xAxis: {
    type: 'value',
    name: 'X Axis',
    splitNumber: 10,
    splitLine: { show: true, lineStyle: { color: '#eee', type: 'dashed' } }
  },
  yAxis: {
    type: 'value',
    name: 'Y Axis',
    splitNumber: 10,
    splitLine: { show: true, lineStyle: { color: '#eee', type: 'solid' } }
  },
  series: [
    {
      name: 'Group A',
      type: 'scatter',
      symbolSize: 12,
      data: [
        [10.0, 8.04],[8.0, 6.95],[13.0, 7.58],[9.0, 8.81],[11.0, 8.33],
        [14.0, 9.96],[6.0, 7.24],[4.0, 4.26],[12.0, 10.84],[7.0, 4.82],[5.0, 5.68]
      ],
      itemStyle: { color: '#5470c6' }
    },
    {
      name: 'Group B',
      type: 'scatter',
      symbolSize: 12,
      data: [
        [10.0, 9.14],[8.0, 8.14],[13.0, 8.74],[9.0, 8.77],[11.0, 9.26],
        [14.0, 8.10],[6.0, 6.13],[4.0, 3.10],[12.0, 9.13],[7.0, 7.26],[5.0, 4.74]
      ],
      itemStyle: { color: '#91cc75' }
    }
  ],
  animation: true
};`,
  },
  {
    id: 'axis-label',
    category: 'sub-components',
    title: 'Axis Label',
    subtitle: 'AxisLabel rotate/width/overflow',
    code: `option = {
  tooltip: { trigger: 'axis' },
  grid: { bottom: 100, top: 80 },
  xAxis: {
    type: 'category',
    data: [
      'Long Label One','Long Label Two','Long Label Three',
      'Very Long Label Four','Super Long Label Five','Extremely Long Label Six','Just A Normal Label'
    ],
    axisLabel: { rotate: 45, width: 60, overflow: 'break', interval: 0 }
  },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar', itemStyle: { color: '#5470c6' } }]
};`,
  },
  {
    id: 'title-example',
    category: 'sub-components',
    title: 'Title',
    subtitle: 'TitleOption styling demo (subset)',
    code: `option = {
  title: {
    text: 'Main Title',
    subtext: 'Subtitle with custom style',
    left: 'center',
    top: 10,
    backgroundColor: '#f4f4f4',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    padding: [20, 40],
    textStyle: { color: '#333', fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
    subtextStyle: { color: '#888', fontSize: 14, fontStyle: 'italic' }
  },
  series: []
};`,
  },
  {
    id: 'legend-example',
    category: 'sub-components',
    title: 'Legend',
    subtitle: 'LegendOption orientation & style (subset)',
    code: `option = {
  title: { text: 'Vertical Right' },
  xAxis: { data: ['A', 'B', 'C'] },
  yAxis: {},
  series: [
    { name: 'Series A', type: 'bar', data: [10, 20, 30] },
    { name: 'Series B', type: 'bar', data: [20, 30, 40] },
    { name: 'Series C', type: 'line', data: [30, 40, 10] }
  ],
  legend: {
    show: true,
    orient: 'vertical',
    right: 10,
    top: 'center',
    backgroundColor: '#f9f9f9',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 10
  }
};`,
  },
  {
    id: 'tooltip-example',
    category: 'sub-components',
    title: 'Tooltip',
    subtitle: 'TooltipOption formatter & style (subset)',
    code: `option = {
  title: { text: 'Custom HTML Formatter' },
  xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: {},
  series: [
    { name: 'Sales', type: 'line', data: [150, 230, 224, 218, 135] },
    { name: 'Profit', type: 'bar', data: [50, 130, 124, 118, 35] }
  ],
  tooltip: {
    show: true,
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#333',
    textStyle: { color: '#fff' },
    formatter: function (params) {
      var items = Array.isArray(params) ? params : [params];
      var title = items[0].name;
      var rows = items.map(function (item) {
        return '<div style="display:flex; justify-content:space-between; width:120px;">' +
          '<span>' + item.marker + ' ' + item.seriesName + '</span>' +
          '<span style="font-weight:bold">' + item.value + '</span>' +
        '</div>';
      }).join('');
      return '<div style="font-size:12px">' +
        '<div style="border-bottom:1px solid #777; margin-bottom:4px; padding-bottom:2px">' + title + '</div>' +
        rows +
      '</div>';
    }
  }
};`,
  },
  {
    id: 'rich-text-example',
    category: 'sub-components',
    title: 'Rich Text',
    subtitle: 'Rich text label formatter for pie chart',
    code: `option = {
  tooltip: { show: true, trigger: 'item' },
  legend: { show: true, orient: 'vertical', right: 10, top: 10, height: 150 },
  series: [{
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
    itemStyle: { borderWidth: 2, borderColor: '#ffffff' },
    label: {
      show: true,
      position: 'outside',
      formatter: '{b|{b}}\\n{hr|}\\n{c|{c}}  {per|{d}%}',
      rich: {
        b: { color: '#4C5058', fontSize: 14, fontWeight: 'bold', padding: [3, 4] },
        hr: { borderColor: '#8C8D8E', width: '100%', borderWidth: 1, height: 0, padding: [0, 0] },
        c: { color: '#4C5058', fontSize: 12, fontWeight: 'bold', padding: [3, 4] },
        per: { color: '#fff', backgroundColor: '#4C5058', padding: [3, 4], borderRadius: 4 }
      }
    },
    labelLine: { show: true, lineStyle: {} }
  }],
  animation: true
};`,
  },
  {
    id: 'bundle-test',
    category: 'bundle',
    title: 'Unified Bundle',
    subtitle: 'Import from the single hudx package (HChart + Core)',
    code: `option = {
  padding: [40, 40, 40, 40],
  grid: { left: 60, right: 40, top: 40, bottom: 60 },
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'], show: true },
  yAxis: { type: 'value', show: true },
  series: [{ type: 'bar', name: 'Sales', data: [120, 200, 150, 80, 70], itemStyle: { color: '#5470c6' } }],
  tooltip: { show: true }
};`,
  },
  {
    id: 'bundle-bar',
    category: 'bundle',
    title: 'BarChart Import',
    subtitle: "import BarChart from 'hudx-charts/chart/BarChart'",
    code: `option = {
  title: { text: 'Independent BarChart Bundle' },
  tooltip: { show: true },
  xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: {},
  series: [{ type: 'bar', data: [10, 52, 200, 334, 390], itemStyle: { color: '#5470c6' } }]
};`,
  },
  {
    id: 'bundle-line',
    category: 'bundle',
    title: 'LineChart Import',
    subtitle: "import LineChart from 'hudx-charts/chart/LineChart'",
    code: `option = {
  title: { text: 'Independent LineChart Bundle' },
  tooltip: { show: true, trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [150, 230, 224, 218, 135, 147, 260], itemStyle: { color: '#5470c6' } }]
};`,
  },
  {
    id: 'bundle-pie',
    category: 'bundle',
    title: 'PieChart Import',
    subtitle: "import PieChart from 'hudx-charts/chart/PieChart'",
    code: `option = {
  title: { text: 'Independent PieChart Bundle' },
  tooltip: { show: true, trigger: 'item' },
  series: [{
    type: 'pie',
    radius: '60%',
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ],
    itemStyle: { borderColor: 'transparent', borderWidth: 2 }
  }]
};`,
  },
];
