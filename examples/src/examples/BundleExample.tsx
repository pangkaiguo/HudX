import React, { useRef, useEffect } from 'react';
import { Rect, Circle, Group, Renderer, HChart, type ChartOption } from 'hudx';

// This example demonstrates importing everything from the unified 'hudx' package
export const BundleExample: React.FC<{ theme?: any }> = ({ theme }) => {
  const coreRef = useRef<HTMLDivElement>(null);

  // Example 1: Using HChart component from hudx package
  const barOption: ChartOption = {
    padding: [40, 40, 40, 40],
    grid: {
      left: 60,
      right: 40,
      top: 40,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      show: true,
    },
    yAxis: {
      type: 'value',
      show: true,
    },
    series: [
      {
        type: 'bar',
        name: 'Sales',
        data: [120, 200, 150, 80, 70],
        itemStyle: { color: '#5470c6' },
      },
    ],
    tooltip: {
      show: true,
    },
  };

  // Example 2: Using Core components directly from hudx package
  useEffect(() => {
    if (!coreRef.current) return;

    // Initialize renderer directly
    const renderer = new Renderer(coreRef.current, 'canvas');
    renderer.resize(600, 200);

    // Create some shapes
    const rect = new Rect({
      shape: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
      },
      style: {
        fill: '#4f46e5',
        stroke: '#312e81',
        lineWidth: 2,
      },
    });

    const circle = new Circle({
      shape: {
        cx: 250,
        cy: 100,
        r: 50,
      },
      style: {
        fill: '#ec4899',
        stroke: '#831843',
        lineWidth: 2,
      },
    });

    // Add interactivity
    rect.on('mouseenter', () => {
      rect.attr('style', { fill: '#6366f1' });
      renderer.refresh();
    });

    rect.on('mouseleave', () => {
      rect.attr('style', { fill: '#4f46e5' });
      renderer.refresh();
    });

    renderer.add(rect);
    renderer.add(circle);
    renderer.flush(); // Initial paint

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Unified Bundle Example</h1>
      <p>
        This example demonstrates importing both Charts and Core components from
        the single <code>hudx</code> package.
      </p>

      <div style={{ marginBottom: 40 }}>
        <h2>1. HChart Component imported from 'hudx'</h2>
        <div style={{ border: '1px solid #ccc', display: 'inline-block' }}>
          <HChart
            option={barOption}
            width={600}
            height={400}
            theme={theme || 'light'}
          />
        </div>
      </div>

      <div>
        <h2>2. Core Shapes (Rect, Circle) imported from 'hudx'</h2>
        <div
          ref={coreRef}
          style={{
            border: '1px solid #ccc',
            display: 'inline-block',
            height: 200,
            width: 600,
          }}
        />
      </div>
    </div>
  );
};
