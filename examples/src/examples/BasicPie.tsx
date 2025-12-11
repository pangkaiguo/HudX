import React, { useEffect, useRef } from 'react';
import { Renderer, Sector, Text } from '@hudx/core';

export default function BasicPie() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 120;

    const data = [
      { name: 'Direct', value: 335, color: '#5470c6' },
      { name: 'Email', value: 310, color: '#91cc75' },
      { name: 'Ads', value: 234, color: '#fac858' },
      { name: 'Video', value: 135, color: '#ee6666' },
      { name: 'Search', value: 148, color: '#73c0de' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -Math.PI / 2;

    data.forEach((item) => {
      const angle = (item.value / total) * Math.PI * 2;
      const endAngle = startAngle + angle;

      renderer.add(new Sector({
        shape: { cx: centerX, cy: centerY, r0: 0, r: radius, startAngle, endAngle },
        style: { fill: item.color }
      }));

      const midAngle = startAngle + angle / 2;
      const labelX = centerX + Math.cos(midAngle) * (radius + 30);
      const labelY = centerY + Math.sin(midAngle) * (radius + 30);

      renderer.add(new Text({
        shape: { text: `${item.name}: ${item.value}`, x: labelX, y: labelY },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));

      startAngle = endAngle;
    });

    renderer.add(new Text({
      shape: { text: 'Traffic Sources', x: width / 2, y: 30 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Basic Pie Chart</h2>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }} />
    </div>
  );
}
