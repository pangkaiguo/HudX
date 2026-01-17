import React from 'react';
import { HChart, type ChartOption } from 'hudx-charts';

/**
 * Demonstrates TitleOption properties as defined in types.ts
 */
const TitleExample: React.FC = () => {
  // 1. Basic Positioning Examples
  const topLeftOption: ChartOption = {
    title: { text: 'Top Left', left: 'left', top: 'top' },
    series: [],
  };
  
  const topCenterOption: ChartOption = {
    title: { text: 'Top Center', left: 'center', top: 'top' },
    series: [],
  };

  const topRightOption: ChartOption = {
    title: { text: 'Top Right', left: 'right', top: 'top' },
    series: [],
  };
  
  const bottomCenterOption: ChartOption = {
    title: { text: 'Bottom Center', left: 'center', top: 'bottom' },
    series: [],
  };

  const middleCenterOption: ChartOption = {
    title: { 
      text: 'Middle Center', 
      left: 'center', 
      top: 'middle', 
      textStyle: { fontSize: 24, color: '#4096ff' } 
    },
    series: [],
  };

  // 2. Styling (textStyle, subtextStyle, backgroundColor, border...)
  const styleOption: ChartOption = {
    title: {
      text: 'Main Title',
      subtext: 'Subtitle with custom style',
      left: 'center',
      top: 'center',
      // Container style
      backgroundColor: '#f4f4f4',
      borderColor: '#ccc',
      borderWidth: 2,
      borderRadius: 10,
      padding: [20, 40],
      // Text style
      textStyle: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'serif',
      },
      // Subtext style
      subtextStyle: {
        color: '#888',
        fontSize: 14,
        fontStyle: 'italic',
      },
    },
    series: [],
  };

  // 3. Gap & Alignment
  const gapOption: ChartOption = {
    title: {
      text: 'Title with Large Gap',
      subtext: 'Distance between title and subtitle is 30px',
      left: 'left',
      top: 'top',
      itemGap: 30, // Gap between title and subtext
      textStyle: { fontSize: 16 },
      subtextStyle: { fontSize: 12, color: 'red' }
    },
    series: [],
  };

  const chartStyle = { width: '100%', height: 200, border: '1px solid #eee' };

  return (
    <div style={{ padding: 20 }}>
      <h1>Title Configuration</h1>
      <p style={{ color: '#666' }}>Matching <code>TitleOption</code> interface.</p>
      
      <h3>1. Positioning</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 30 }}>
        <div>
           <p style={{fontSize: 12}}>left: 'left', top: 'top'</p>
           <HChart option={topLeftOption} style={chartStyle} />
        </div>
        <div>
           <p style={{fontSize: 12}}>left: 'center', top: 'top'</p>
           <HChart option={topCenterOption} style={chartStyle} />
        </div>
        <div>
           <p style={{fontSize: 12}}>left: 'right', top: 'top'</p>
           <HChart option={topRightOption} style={chartStyle} />
        </div>
        <div>
           <p style={{fontSize: 12}}>left: 'center', top: 'bottom'</p>
           <HChart option={bottomCenterOption} style={chartStyle} />
        </div>
        <div>
           <p style={{fontSize: 12}}>left: 'center', top: 'middle'</p>
           <HChart option={middleCenterOption} style={chartStyle} />
        </div>
      </div>
      
      <h3>2. Advanced Styling</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <p style={{ fontSize: 12 }}>textStyle, subtextStyle, backgroundColor, border, padding</p>
          <HChart option={styleOption} style={{ width: '100%', height: 300, border: '1px solid #eee' }} />
        </div>
        <div>
          <p style={{ fontSize: 12 }}>itemGap (30px), subtext color</p>
          <HChart option={gapOption} style={{ width: '100%', height: 300, border: '1px solid #eee' }} />
        </div>
      </div>
    </div>
  );
};

export default TitleExample;
