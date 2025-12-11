import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Circle, Rect, Line, Polyline, Polygon } from '@hudx/core';

type ShapeType = 'circle' | 'rect' | 'line' | 'polyline' | 'polygon';

export default function PerformanceTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1000);
  const [renderTime, setRenderTime] = useState(0);
  const [mode, setMode] = useState<'canvas' | 'svg'>('canvas');
  const [shapeType, setShapeType] = useState<ShapeType>('circle');

  useEffect(() => {
    if (!containerRef.current) return;

    const startTime = performance.now();
    const renderer = Renderer.init(containerRef.current, mode, 'light', 'en');

    const width = 800;
    const height = 600;

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = `hsl(${Math.random() * 360}, 70%, 60%)`;

      let element;
      switch (shapeType) {
        case 'circle':
          element = new Circle({
            shape: { cx: x, cy: y, r: Math.random() * 5 + 2 },
            style: { fill: color, opacity: 0.6 }
          });
          break;
        case 'rect':
          element = new Rect({
            shape: { x, y, width: Math.random() * 10 + 5, height: Math.random() * 10 + 5 },
            style: { fill: color, opacity: 0.6 }
          });
          break;
        case 'line':
          element = new Line({
            shape: { x1: x, y1: y, x2: x + Math.random() * 20, y2: y + Math.random() * 20 },
            style: { stroke: color, lineWidth: 2, opacity: 0.6 }
          });
          break;
        case 'polyline':
          const points = [];
          for (let j = 0; j < 3; j++) {
            points.push([x + Math.random() * 20, y + Math.random() * 20]);
          }
          element = new Polyline({
            shape: { points },
            style: { stroke: color, lineWidth: 2, opacity: 0.6 }
          });
          break;
        case 'polygon':
          const polyPoints = [];
          for (let j = 0; j < 4; j++) {
            polyPoints.push([x + Math.random() * 20, y + Math.random() * 20]);
          }
          element = new Polygon({
            shape: { points: polyPoints },
            style: { fill: color, opacity: 0.6 }
          });
          break;
      }

      if (element) {
        renderer.add(element);
      }
    }

    renderer.resize(width, height);
    renderer.flush();
    const endTime = performance.now();
    setRenderTime(Math.round(endTime - startTime));

    return () => renderer.dispose();
  }, [count, mode, shapeType]);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Performance Test</h2>
      
      <div style={{ marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <label>
          Element Count:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{ marginLeft: 10, padding: '4px 8px', width: '100%' }}
          />
        </label>
        
        <label>
          Render Mode:
          <select value={mode} onChange={(e) => setMode(e.target.value as 'canvas' | 'svg')} style={{ marginLeft: 10, padding: '4px 8px', width: '100%' }}>
            <option value="canvas">Canvas</option>
            <option value="svg">SVG</option>
          </select>
        </label>

        <label>
          Shape Type:
          <select value={shapeType} onChange={(e) => setShapeType(e.target.value as ShapeType)} style={{ marginLeft: 10, padding: '4px 8px', width: '100%' }}>
            <option value="circle">Circle</option>
            <option value="rect">Rect</option>
            <option value="line">Line</option>
            <option value="polyline">Polyline</option>
            <option value="polygon">Polygon</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <strong>Render Time:</strong> {renderTime}ms | <strong>Elements:</strong> {count} | <strong>Mode:</strong> {mode.toUpperCase()} | <strong>Shape:</strong> {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)}
      </div>

      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 600 }} />
    </div>
  );
}
