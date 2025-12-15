import React, { useEffect, useRef, useState } from 'react';
import { BarChart, LineChart, PieChart, ScatterChart, HeatmapChart } from '@HudX/charts';

export default function ChartAnimation() {
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const scatterChartRef = useRef<HTMLDivElement>(null);
  const heatmapChartRef = useRef<HTMLDivElement>(null);

  const chartsRef = useRef<{
    bar?: BarChart;
    line?: LineChart;
    pie?: PieChart;
    scatter?: ScatterChart;
    heatmap?: HeatmapChart;
  }>({});

  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [animationEasing, setAnimationEasing] = useState('cubicOut');

  const barChartOption = {
    animation: animationEnabled,
    animationDuration,
    animationEasing,
    title: {
      text: 'Bar Chart with Animation',
      left: 'center'
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
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: '#5470c6'
        }
      }
    ]
  };

  const lineChartOption = {
    animation: animationEnabled,
    animationDuration,
    animationEasing,
    title: {
      text: 'Line Chart with Animation',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330],
        itemStyle: {
          color: '#91cc75'
        },
        lineStyle: {
          width: 3
        },
        showSymbol: true
      }
    ]
  };

  const pieChartOption = {
    animation: animationEnabled,
    animationDuration,
    animationEasing,
    title: {
      text: 'Pie Chart with Animation',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 234, name: 'Ads' },
          { value: 135, name: 'Video' },
          { value: 1548, name: 'Search' }
        ],
        label: {
          show: true,
          formatter: '{b}: {d}%'
        }
      }
    ]
  };

  const scatterChartOption = {
    animation: animationEnabled,
    animationDuration,
    animationEasing,
    title: {
      text: 'Scatter Chart with Animation',
      left: 'center'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'scatter',
        symbolSize: 20,
        data: [
          [10, 8], [8, 10], [13, 7], [9, 6], [11, 9],
          [14, 8], [6, 5], [4, 7], [12, 6], [7, 8]
        ],
        itemStyle: {
          color: '#fac858'
        }
      }
    ]
  };

  const heatmapChartOption = {
    animation: animationEnabled,
    animationDuration,
    animationEasing,
    title: {
      text: 'Heatmap Chart with Animation',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5']
    },
    series: [
      {
        type: 'heatmap',
        data: [
          [10, 20, 30, 40, 50],
          [20, 30, 40, 50, 60],
          [30, 40, 50, 60, 70],
          [40, 50, 60, 70, 80],
          [50, 60, 70, 80, 90]
        ]
      }
    ]
  };

  useEffect(() => {
    const initOrUpdate = (
      key: keyof typeof chartsRef.current,
      domRef: React.RefObject<HTMLDivElement>,
      ChartClass: any,
      option: any
    ) => {
      if (!domRef.current) {
        console.warn(`[ChartAnimationDemo] ${key} domRef is null`);
        return;
      }

      console.log(`[ChartAnimationDemo] ${key} init/update. Size: ${domRef.current.clientWidth}x${domRef.current.clientHeight}`);

      if (!chartsRef.current[key]) {
        const chart = new ChartClass(domRef.current, option);
        chart.mount(); // Ensure chart is mounted
        chart.resize(); // Force resize to ensure canvas has correct size
        chartsRef.current[key] = chart;
      } else {
        chartsRef.current[key]!.setOption(option);
        chartsRef.current[key]!.resize(); // Ensure resize on update too
      }
    };

    initOrUpdate('bar', barChartRef, BarChart, barChartOption);
    initOrUpdate('line', lineChartRef, LineChart, lineChartOption);
    initOrUpdate('pie', pieChartRef, PieChart, pieChartOption);
    initOrUpdate('scatter', scatterChartRef, ScatterChart, scatterChartOption);
    initOrUpdate('heatmap', heatmapChartRef, HeatmapChart, heatmapChartOption);

  }, [animationEnabled, animationDuration, animationEasing]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(chartsRef.current).forEach(chart => chart?.dispose());
      chartsRef.current = {};
    };
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Chart Animation Demo</h2>

      <div style={{ marginBottom: 30, padding: 20, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <h3 style={{ marginBottom: 15 }}>Animation Controls</h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={animationEnabled}
              onChange={(e) => setAnimationEnabled(e.target.checked)}
            />
            Enable Animation
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Duration (ms):
            <input
              type="number"
              value={animationDuration}
              onChange={(e) => setAnimationDuration(Number(e.target.value))}
              min="100"
              max="5000"
              step="100"
              style={{ width: 80, padding: 4 }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Easing:
            <select
              value={animationEasing}
              onChange={(e) => setAnimationEasing(e.target.value)}
              style={{ padding: 4 }}
            >
              <option value="linear">Linear</option>
              <option value="cubicIn">Cubic In</option>
              <option value="cubicOut">Cubic Out</option>
              <option value="cubicInOut">Cubic InOut</option>
              <option value="elasticOut">Elastic Out</option>
              <option value="bounceOut">Bounce Out</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <div ref={barChartRef} style={{ height: 300 }} />
        </div>

        <div>
          <div ref={lineChartRef} style={{ height: 300 }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <div ref={pieChartRef} style={{ height: 300 }} />
        </div>

        <div>
          <div ref={scatterChartRef} style={{ height: 300 }} />
        </div>
      </div>

      <div>
        <div ref={heatmapChartRef} style={{ height: 300 }} />
      </div>
    </div>
  );
}