import React, { useEffect, useRef } from 'react';
import { Renderer, Polygon, Circle, Tooltip, Legend } from '@HudX/core';

export default function TestPolygon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');

    const width = 800;
    const height = 600;

    // Create tooltip
    const tooltip = new Tooltip({
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      textColor: '#fff',
      padding: 12,
      fontSize: 13
    });
    renderer.add(tooltip);

    // Test Polygon with number[][] format
    const polygon1 = new Polygon({
      shape: {
        points: [[100, 100], [200, 50], [300, 100], [250, 200], [150, 200]]
      },
      style: { fill: '#5470c6', stroke: '#333', lineWidth: 2, opacity: 0.8 }
    });

    polygon1.on('mouseover', () => {
      polygon1.attr('style', { opacity: 1 });
      tooltip.show(150, 80, 'Polygon 1\nHover me!');
      renderer.flush();
    });

    polygon1.on('mouseout', () => {
      polygon1.attr('style', { opacity: 0.8 });
      tooltip.hide();
      renderer.flush();
    });

    renderer.add(polygon1);

    // Test Polygon with Point[] format
    const polygon2 = new Polygon({
      shape: {
        points: [
          { x: 400, y: 100 },
          { x: 500, y: 50 },
          { x: 600, y: 100 },
          { x: 550, y: 200 },
          { x: 450, y: 200 }
        ]
      },
      style: { fill: '#91cc75', stroke: '#333', lineWidth: 2, opacity: 0.8 }
    });

    polygon2.on('mouseover', () => {
      polygon2.attr('style', { opacity: 1 });
      tooltip.show(450, 80, 'Polygon 2\nPoint[] format');
      renderer.flush();
    });

    polygon2.on('mouseout', () => {
      polygon2.attr('style', { opacity: 0.8 });
      tooltip.hide();
      renderer.flush();
    });

    renderer.add(polygon2);

    // Test star polygon
    const starPoints = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5;
      const radius = i % 2 === 0 ? 50 : 25;
      starPoints.push([250 + Math.cos(angle) * radius, 400 + Math.sin(angle) * radius]);
    }

    const star = new Polygon({
      shape: { points: starPoints },
      style: { fill: '#fac858', stroke: '#333', lineWidth: 2, opacity: 0.8 }
    });

    star.on('mouseover', () => {
      star.attr('style', { opacity: 1 });
      tooltip.show(250, 350, 'Star Polygon\nDynamic points');
      renderer.flush();
    });

    star.on('mouseout', () => {
      star.attr('style', { opacity: 0.8 });
      tooltip.hide();
      renderer.flush();
    });

    renderer.add(star);

    // Create legend
    const legend = new Legend({
      x: 50,
      y: 500,
      orient: 'horizontal',
      onSelect: (name, selected) => {
        if (name === 'Polygon 1') polygon1.attr('invisible', !selected);
        if (name === 'Polygon 2') polygon2.attr('invisible', !selected);
        if (name === 'Star') star.attr('invisible', !selected);
        renderer.flush();
      }
    });

    legend.setItems([
      { name: 'Polygon 1', color: '#5470c6' },
      { name: 'Polygon 2', color: '#91cc75' },
      { name: 'Star', color: '#fac858' }
    ]);
    renderer.add(legend);

    renderer.resize(width, height);
    renderer.flush();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Polygon Test</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Multiple polygon formats • Hover tooltips • Interactive legend
      </p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 600 }} />
    </div>
  );
}
