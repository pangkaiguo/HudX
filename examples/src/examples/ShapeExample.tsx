import React, { useEffect, useRef, useState } from 'react';
import {
  Renderer,
  Circle,
  Rect,
  Line,
  Polyline,
  Polygon,
  Text,
  ThemeManager,
  Locale,
  Theme,
} from 'hudx-render';
import type { RenderMode } from 'hudx-render';
import { t } from '../i18n';

export const ShapeExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const textColor = themeObj.textColor;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(
      containerRef.current,
      renderMode,
      theme,
      locale,
    );

    renderer.add(
      new Circle({
        shape: { cx: 100, cy: 100, r: 40 },
        style: {
          fill: themeObj.seriesColors?.[0],
          stroke: border,
          lineWidth: 2,
        },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: t(locale, 'examples.shape.circle', 'Circle'), x: 100, y: 160 },
        style: { textAlign: 'center', fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Rect({
        shape: { x: 200, y: 60, width: 80, height: 80 },
        style: { fill: themeObj.seriesColors?.[1] },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: t(locale, 'examples.shape.rect', 'Rect'), x: 240, y: 160 },
        style: { textAlign: 'center', fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Line({
        shape: { x1: 320, y1: 60, x2: 400, y2: 140 },
        style: { stroke: themeObj.seriesColors?.[2], lineWidth: 3 },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: t(locale, 'examples.shape.line', 'Line'), x: 360, y: 160 },
        style: { textAlign: 'center', fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Polyline({
        shape: {
          points: [
            [440, 100],
            [480, 60],
            [520, 100],
            [560, 80],
          ],
        },
        style: { stroke: themeObj.seriesColors?.[3], lineWidth: 2 },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: t(locale, 'examples.shape.polyline', 'Polyline'), x: 500, y: 160 },
        style: { textAlign: 'center', fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Polygon({
        shape: {
          points: [
            [640, 60],
            [680, 100],
            [660, 140],
            [620, 140],
            [600, 100],
          ],
        },
        style: { fill: themeObj.seriesColors?.[4] },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: t(locale, 'examples.shape.polygon', 'Polygon'), x: 640, y: 160 },
        style: { textAlign: 'center', fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Text({
        shape: { text: t(locale, 'examples.shape.title', 'Core API Shapes'), x: 400, y: 30 },
        style: {
          textAlign: 'center',
          fill: textColor,
          fontSize: 16,
          fontWeight: 'bold',
        },
      }),
    );

    renderer.resize(800, 200);
    renderer.flush();

    return () => renderer.dispose();
  }, [locale, renderMode, theme]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.feature.shape', 'Core API Demo')}
      </h2>
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
          <span>{t(locale, 'examples.control.renderMode', 'Render Mode:')}</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: `1px solid ${border}`,
            }}
          >
            <option value='canvas'>{t(locale, 'examples.control.canvas', 'Canvas')}</option>
            <option value='svg'>{t(locale, 'examples.control.svg', 'SVG')}</option>
          </select>
        </label>
      </div>
      <p style={{ marginBottom: 20, color: textSecondary }}>
        {t(
          locale,
          'examples.shape.desc',
          'Demonstrates basic shapes from hudx-render',
        )}
      </p>
      <div
        ref={containerRef}
        style={{
          border: `1px solid ${border}`,
          borderRadius: 8,
          width: 800,
          height: 200,
        }}
      />
    </div>
  );
};

export default ShapeExample;
