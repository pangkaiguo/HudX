import React, { useEffect, useRef } from 'react';
import { Renderer, Circle, Rect, Line, Polyline, Polygon, Text, ThemeManager } from 'HudX/core';

export const ShapeExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    const theme = ThemeManager.getTheme('light');

    renderer.add(new Circle({
      shape: { cx: 100, cy: 100, r: 40 },
      style: { fill: theme.seriesColors?.[0], stroke: '#fff', lineWidth: 2 }
    }));
    renderer.add(new Text({
      shape: { text: 'Circle', x: 100, y: 160 },
      style: { textAlign: 'center', fill: '#333', fontSize: 12 }
    }));

    renderer.add(new Rect({
      shape: { x: 200, y: 60, width: 80, height: 80 },
      style: { fill: theme.seriesColors?.[1] }
    }));
    renderer.add(new Text({
      shape: { text: 'Rect', x: 240, y: 160 },
      style: { textAlign: 'center', fill: '#333', fontSize: 12 }
    }));

    renderer.add(new Line({
      shape: { x1: 320, y1: 60, x2: 400, y2: 140 },
      style: { stroke: theme.seriesColors?.[2], lineWidth: 3 }
    }));
    renderer.add(new Text({
      shape: { text: 'Line', x: 360, y: 160 },
      style: { textAlign: 'center', fill: '#333', fontSize: 12 }
    }));

    renderer.add(new Polyline({
      shape: { points: [[440, 100], [480, 60], [520, 100], [560, 80]] },
      style: { stroke: theme.seriesColors?.[3], lineWidth: 2 }
    }));
    renderer.add(new Text({
      shape: { text: 'Polyline', x: 500, y: 160 },
      style: { textAlign: 'center', fill: '#333', fontSize: 12 }
    }));

    renderer.add(new Polygon({
      shape: { points: [[640, 60], [680, 100], [660, 140], [620, 140], [600, 100]] },
      style: { fill: theme.seriesColors?.[4] }
    }));
    renderer.add(new Text({
      shape: { text: 'Polygon', x: 640, y: 160 },
      style: { textAlign: 'center', fill: '#333', fontSize: 12 }
    }));

    renderer.add(new Text({
      shape: { text: 'Core API Shapes', x: 400, y: 30 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(800, 200);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Core API Demo</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Demonstrates basic shapes from HudX/core</p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 200 }} />
    </div>
  );
}

export default ShapeExample;