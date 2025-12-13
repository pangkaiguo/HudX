import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Circle, Text } from '@HudX/core';

export default function Interaction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');

    const circles = [];
    for (let i = 0; i < 5; i++) {
      const circle = new Circle({
        shape: { cx: 100 + i * 130, cy: 150, r: 40 },
        style: { fill: '#5470c6', opacity: 0.7 }
      });

      circle.on('click', () => {
        circle.attr({ style: { fill: '#ff6b6b', opacity: 1 } });
        setClickCount(prev => prev + 1);
        renderer.flush();
        setTimeout(() => {
          circle.attr({ style: { fill: '#5470c6', opacity: 0.7 } });
          renderer.flush();
        }, 300);
      });

      circle.on('mouseover', () => {
        circle.attr({ style: { opacity: 1 } });
        renderer.flush();
      });

      circle.on('mouseout', () => {
        circle.attr({ style: { opacity: 0.7 } });
        renderer.flush();
      });

      renderer.add(circle);
      circles.push(circle);
    }

    renderer.add(new Text({
      shape: { text: 'Click circles to interact', x: 400, y: 50 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(800, 300);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Interaction Demo</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Click Count: {clickCount}</p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Interactive demo with 5 clickable circles"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 300 }}
      />
    </div>
  );
}
