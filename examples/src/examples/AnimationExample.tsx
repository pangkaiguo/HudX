import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Circle, Rect, Animation, Easing, ThemeManager, Theme } from 'HudX/core';
import type { RenderMode } from 'HudX/core';

export const AnimationExample = ({ theme = 'light' }: { theme?: Theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, renderMode, theme, 'en');
    const themeObj = ThemeManager.getTheme(theme);

    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 30 },
      style: { fill: themeObj.seriesColors?.[0] }
    });

    const rect = new Rect({
      shape: { x: 300, y: 100, width: 60, height: 60 },
      style: { fill: themeObj.seriesColors?.[1] }
    });

    renderer.add(circle);
    renderer.add(rect);
    renderer.resize(800, 300);

    const anim1 = new Animation(
      circle.shape as unknown as Record<string, unknown>,
      'cx',
      600,
      2000,
      0,
      Easing.cubicInOut,
      () => {
        circle.markRedraw();
        renderer.flush();
      }
    );

    const anim2 = new Animation(
      rect.transform as Record<string, unknown>,
      'scaleX',
      2,
      2000,
      0,
      Easing.elasticOut,
      () => {
        rect.markRedraw();
        renderer.flush();
      }
    );

    const anim3 = new Animation(
      rect.transform as Record<string, unknown>,
      'scaleY',
      2,
      2000,
      0,
      Easing.elasticOut,
      () => {
        rect.markRedraw();
        renderer.flush();
      }
    );

    anim1.start();
    anim2.start();
    anim3.start();

    renderer.flush();

    return () => renderer.dispose();
  }, [renderMode, theme]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Animation Demo</h2>
      <div style={{ marginBottom: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Render Mode:</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd' }}
          >
            <option value="canvas">Canvas</option>
            <option value="svg">SVG</option>
          </select>
        </label>
      </div>
      <p style={{ marginBottom: 20, color: '#666' }}>Circle moves right, Rectangle scales</p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 300 }} />
    </div>
  );
}

export default AnimationExample;