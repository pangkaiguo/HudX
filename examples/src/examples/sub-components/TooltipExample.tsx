import React from 'react';
import { HChart, type ChartOption } from 'hudx-charts';

/**
 * Demonstrates TooltipOption properties as defined in types.ts
 */
const TooltipExample: React.FC = () => {
  const baseData = {
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: {},
    series: [
      { name: 'Sales', type: 'line', data: [150, 230, 224, 218, 135] },
      { name: 'Profit', type: 'bar', data: [50, 130, 124, 118, 35] },
    ],
  };

  // 1. Trigger Types
  const itemTriggerOption: ChartOption = {
    ...baseData,
    title: { text: 'Item Trigger' },
    tooltip: {
      show: true,
      trigger: 'item',
    },
  };

  const axisTriggerOption: ChartOption = {
    ...baseData,
    title: { text: 'Axis Trigger (Shadow Pointer)' },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // 2. Formatting
  const formatOption: ChartOption = {
    ...baseData,
    title: { text: 'Custom HTML Formatter' },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#333',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        // params is array for axis trigger
        const items = Array.isArray(params) ? params : [params];
        const title = items[0].name;
        const rows = items.map((item: any) => {
          return `<div style="display:flex; justify-content:space-between; width:120px;">
            <span>${item.marker} ${item.seriesName}</span>
            <span style="font-weight:bold">${item.value}</span>
          </div>`;
        }).join('');
        
        return `<div style="font-size:12px">
          <div style="border-bottom:1px solid #777; margin-bottom:4px; padding-bottom:2px">${title}</div>
          ${rows}
        </div>`;
      },
    },
  };

  // 3. Styling & Layout
  const styleOption: ChartOption = {
    ...baseData,
    title: { text: 'Custom Style & Confine' },
    tooltip: {
      show: true,
      trigger: 'axis',
      confine: true, // Confine within chart container
      backgroundColor: '#fff',
      borderColor: '#4096ff',
      borderWidth: 2,
      padding: 15,
      textStyle: {
        color: '#4096ff',
        fontFamily: 'monospace',
      },
      extraCssText: 'box-shadow: 0 0 10px rgba(0,0,0,0.2);',
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tooltip Configuration</h1>
      <p style={{ color: '#666' }}>Matching <code>TooltipOption</code> interface.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>Item Trigger</h3>
          <p style={{ fontSize: 12 }}>trigger: 'item'</p>
          <HChart option={itemTriggerOption} height={300} />
        </div>
        
        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>Axis Trigger</h3>
          <p style={{ fontSize: 12 }}>trigger: 'axis', axisPointer: 'shadow'</p>
          <HChart option={axisTriggerOption} height={300} />
        </div>

        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>Custom Formatter</h3>
          <p style={{ fontSize: 12 }}>formatter function returning HTML</p>
          <HChart option={formatOption} height={300} />
        </div>

        <div style={{ border: '1px solid #eee', padding: 10 }}>
          <h3>Styling</h3>
          <p style={{ fontSize: 12 }}>backgroundColor, border, textStyle, confine</p>
          <HChart option={styleOption} height={300} />
        </div>
      </div>
    </div>
  );
};

export default TooltipExample;
