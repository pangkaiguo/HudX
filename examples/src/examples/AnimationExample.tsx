import React, { useEffect, useRef, useState } from 'react';
import {
  Renderer,
  Circle,
  Rect,
  Animation,
  Easing,
  ThemeManager,
  Locale,
  Theme,
  type RenderMode,
} from 'hudx-render';
import { t } from '../i18n';
import { EXAMPLES_COLORS, EXAMPLES_RENDERER_CANVAS } from '../constants';

export const AnimationExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('canvas');

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(
      containerRef.current,
      renderMode,
      theme,
      locale,
    );
    const themeObj = ThemeManager.getTheme(theme);

    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 30 },
      style: { fill: themeObj.seriesColors?.[0] },
    });

    const rect = new Rect({
      shape: { x: 300, y: 100, width: 60, height: 60 },
      style: { fill: themeObj.seriesColors?.[1] },
    });

    renderer.add(circle);
    renderer.add(rect);
    renderer.resize(EXAMPLES_RENDERER_CANVAS.width, EXAMPLES_RENDERER_CANVAS.height);

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
      },
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
      },
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
      },
    );

    anim1.start();
    anim2.start();
    anim3.start();

    renderer.flush();

    return () => renderer.dispose();
  }, [locale, renderMode, theme]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {t(locale, 'examples.animation.title', 'Animation Demo')}
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
              border: `1px solid ${EXAMPLES_COLORS.controlBorder}`,
            }}
          >
            <option value='canvas'>{t(locale, 'examples.control.canvas', 'Canvas')}</option>
            <option value='svg'>{t(locale, 'examples.control.svg', 'SVG')}</option>
          </select>
        </label>
      </div>
      <p style={{ marginBottom: 20, color: EXAMPLES_COLORS.secondaryText }}>
        {t(
          locale,
          'examples.animation.desc',
          'Circle moves right, Rectangle scales',
        )}
      </p>
      <div
        ref={containerRef}
        style={{
          border: `1px solid ${EXAMPLES_COLORS.border}`,
          borderRadius: 8,
          width: EXAMPLES_RENDERER_CANVAS.width,
          height: EXAMPLES_RENDERER_CANVAS.height,
        }}
      />
    </div>
  );
};

export default AnimationExample;
