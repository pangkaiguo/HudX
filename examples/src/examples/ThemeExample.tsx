import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Rect, Circle, Text, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const ThemeExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const [themeName, setThemeName] = useState<'light' | 'dark'>(
    theme as 'light' | 'dark',
  );
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');

  useEffect(() => {
    setThemeName(theme as 'light' | 'dark');
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(
      containerRef.current,
      renderMode,
      themeName,
      'en',
    );
    rendererRef.current = renderer;

    const drawChart = () => {
      renderer.getRoot().removeAll();
      const theme = renderer.getThemeConfig();

      renderer.add(
        new Rect({
          shape: { x: 50, y: 50, width: 200, height: 100 },
          style: {
            fill: theme.seriesColors?.[0] || '#5470c6',
            stroke: theme.textColor,
            lineWidth: 2,
          },
        }),
      );

      renderer.add(
        new Circle({
          shape: { cx: 400, cy: 100, r: 50 },
          style: { fill: theme.seriesColors?.[1] || '#91cc75' },
        }),
      );

      renderer.add(
        new Text({
          shape: { text: `Theme: ${themeName}`, x: 400, y: 200 },
          style: {
            textAlign: 'center',
            fill: theme.textColor,
            fontSize: 20,
            fontWeight: 'bold',
          },
        }),
      );

      renderer.resize(800, 300);
      renderer.flush();
    };

    drawChart();

    return () => renderer.dispose();
  }, [themeName]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Theme Switch Demo</h2>
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setThemeName('light')}
            aria-label='Switch to light theme'
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Light
          </button>
          <button
            onClick={() => setThemeName('dark')}
            aria-label='Switch to dark theme'
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Dark
          </button>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Render Mode:</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          >
            <option value='canvas'>Canvas</option>
            <option value='svg'>SVG</option>
          </select>
        </label>
      </div>
      <div
        ref={containerRef}
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          width: 800,
          height: 300,
        }}
      />
    </div>
  );
};

export default ThemeExample;
