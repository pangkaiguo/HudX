import React, { useEffect, useRef } from 'react';
import { Renderer, Rect, Text } from '@hudx/core';

export default function BasicBar() {
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
    const barWidth = chartWidth / data.length * 0.6;

    data.forEach((value, index) => {
      const x = padding.left + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2;
      const barHeight = (value / max) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      renderer.add(new Rect({
        shape: { x, y, width: barWidth, height: barHeight },
        style: { fill: '#5470c6' }
      }));

      renderer.add(new Text({
        shape: { text: labels[index], x: x + barWidth / 2, y: height - padding.bottom + 20 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    renderer.add(new Text({
      shape: { text: 'Weekly Sales', x: width / 2, y: 20 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Basic Bar Chart</h2>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }} />
    </div>
  );
}
