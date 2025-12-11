import React, { useEffect, useRef } from 'react';
import { Renderer, Polyline, Circle, Text } from '@hudx/core';

export default function BasicLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');

    const width = 800;
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const data = [120, 200, 150, 80, 70, 110, 130];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data);

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      renderer.add(new Polyline({
        shape: { points: [[padding.left, y], [width - padding.right, y]] },
        style: { stroke: '#e0e0e0', lineWidth: 1 }
      }));
      renderer.add(new Text({
        shape: { text: String(Math.round(max - (max / 5) * i)), x: padding.left - 10, y: y },
        style: { textAlign: 'right', textBaseline: 'middle', fill: '#666', fontSize: 12 }
      }));
    }

    const points = data.map((value, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const y = padding.top + chartHeight - (value / max) * chartHeight;
      return [x, y];
    });

    renderer.add(new Polyline({
      shape: { points },
      style: { stroke: '#5470c6', lineWidth: 2 }
    }));

    points.forEach((point, index) => {
      renderer.add(new Circle({
        shape: { cx: point[0], cy: point[1], r: 4 },
        style: { fill: '#5470c6', stroke: '#fff', lineWidth: 2 }
      }));

      renderer.add(new Text({
        shape: { text: labels[index], x: point[0], y: height - padding.bottom + 20 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    renderer.add(new Text({
      shape: { text: 'Weekly Data', x: width / 2, y: 20 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Basic Line Chart</h2>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }} />
    </div>
  );
}
