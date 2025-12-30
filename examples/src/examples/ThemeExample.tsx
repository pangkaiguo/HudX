import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Rect, Circle, Text } from 'HudX/core';

export const ThemeExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', themeName, 'en');
    rendererRef.current = renderer;

    const drawChart = () => {
      renderer.getRoot().removeAll();
      const theme = renderer.getThemeConfig();

      renderer.add(new Rect({
        shape: { x: 50, y: 50, width: 200, height: 100 },
        style: { fill: theme.seriesColors?.[0] || '#5470c6', stroke: theme.textColor, lineWidth: 2 }
      }));

      renderer.add(new Circle({
        shape: { cx: 400, cy: 100, r: 50 },
        style: { fill: theme.seriesColors?.[1] || '#91cc75' }
      }));

      renderer.add(new Text({
        shape: { text: `Theme: ${themeName}`, x: 400, y: 200 },
        style: { textAlign: 'center', fill: theme.textColor, fontSize: 20, fontWeight: 'bold' }
      }));

      renderer.resize(800, 300);
      renderer.flush();
    };

    drawChart();

    return () => renderer.dispose();
  }, [themeName]);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Theme Switch Demo</h2>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setThemeName('light')}
          aria-label="Switch to light theme"
          style={{ marginRight: 10, padding: '8px 16px', cursor: 'pointer' }}
        >
          Light
        </button>
        <button
          onClick={() => setThemeName('dark')}
          aria-label="Switch to dark theme"
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Dark
        </button>
      </div>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 300 }} />
    </div>
  );
}

export default ThemeExample;