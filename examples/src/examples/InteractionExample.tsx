import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Circle, Text, ThemeManager, Theme } from 'hudx-render';
import type { RenderMode } from 'hudx-render';

export const InteractionExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(
      containerRef.current,
      renderMode,
      theme,
      'en',
    );

    const circles = [];
    for (let i = 0; i < 5; i++) {
      const circle = new Circle({
        shape: { cx: 100 + i * 130, cy: 150, r: 40 },
        style: { fill: themeObj.seriesColors?.[0], opacity: 0.7 },
        cursor: 'pointer',
      });

      circle.on('click', () => {
        circle.attr({
          style: { fill: themeObj.seriesColors?.[3], opacity: 1 },
        });
        setClickCount((prev) => prev + 1);
        renderer.flush();
        setTimeout(() => {
          circle.attr({
            style: { fill: themeObj.seriesColors?.[0], opacity: 0.7 },
          });
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

    renderer.add(
      new Text({
        shape: { text: 'Click circles to interact', x: 400, y: 50 },
        style: {
          textAlign: 'center',
          fill: themeObj.textColor,
          fontSize: 16,
          fontWeight: 'bold',
        },
      }),
    );

    renderer.resize(800, 300);
    renderer.flush();

    return () => renderer.dispose();
  }, [renderMode, theme]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Interaction Demo</h2>
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Render Mode:</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: `1px solid ${border}`,
            }}
          >
            <option value='canvas'>Canvas</option>
            <option value='svg'>SVG</option>
          </select>
        </label>
      </div>
      <p style={{ marginBottom: 20, color: textSecondary }}>
        Click Count: {clickCount}
      </p>
      <div
        ref={containerRef}
        role='img'
        aria-label='Interactive demo with 5 clickable circles'
        style={{
          border: `1px solid ${border}`,
          borderRadius: 8,
          width: 800,
          height: 300,
        }}
      />
    </div>
  );
};

export default InteractionExample;
