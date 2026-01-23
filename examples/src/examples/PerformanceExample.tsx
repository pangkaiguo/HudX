import React, { useEffect, useRef, useState } from 'react';
import {
  Renderer,
  Circle,
  Rect,
  Line,
  Polyline,
  Polygon,
  getUnit32RandomValues,
  Locale,
  Theme,
  type RenderMode,
} from 'hudx-render';
import { t } from '../i18n';
import { EXAMPLES_COLORS, EXAMPLES_RENDERER_CANVAS } from '../constants';

type ShapeType = 'circle' | 'rect' | 'line' | 'polyline' | 'polygon';

export const PerformanceExample = ({
  theme = 'light',
  locale = 'zh-CN',
}: {
  theme?: Theme;
  locale?: Locale;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1000);
  const [renderTime, setRenderTime] = useState(0);
  const [mode, setMode] = useState<RenderMode>('svg');
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const normalizedTheme = (theme || 'light').toLowerCase();

  useEffect(() => {
    if (!containerRef.current) return;

    const startTime = performance.now();
    const renderer = Renderer.init(containerRef.current, mode, theme, locale);

    const width = EXAMPLES_RENDERER_CANVAS.width;
    const height = EXAMPLES_RENDERER_CANVAS.performanceHeight;

    for (let i = 0; i < count; i++) {
      const x = getUnit32RandomValues() * width;
      const y = getUnit32RandomValues() * height;
      const color = `hsl(${getUnit32RandomValues() * 360}, 70%, 60%)`;

      let element;
      switch (shapeType) {
        case 'circle':
          element = new Circle({
            shape: { cx: x, cy: y, r: getUnit32RandomValues() * 5 + 2 },
            style: { fill: color, opacity: 0.6 },
          });
          break;
        case 'rect':
          element = new Rect({
            shape: {
              x,
              y,
              width: getUnit32RandomValues() * 10 + 5,
              height: getUnit32RandomValues() * 10 + 5,
            },
            style: { fill: color, opacity: 0.6 },
          });
          break;
        case 'line':
          element = new Line({
            shape: {
              x1: x,
              y1: y,
              x2: x + getUnit32RandomValues() * 20,
              y2: y + getUnit32RandomValues() * 20,
            },
            style: { stroke: color, lineWidth: 2, opacity: 0.6 },
          });
          break;
        case 'polyline':
          const points = [];
          for (let j = 0; j < 3; j++) {
            points.push([
              x + getUnit32RandomValues() * 20,
              y + getUnit32RandomValues() * 20,
            ]);
          }
          element = new Polyline({
            shape: { points },
            style: { stroke: color, lineWidth: 2, opacity: 0.6 },
          });
          break;
        case 'polygon':
          const polyPoints = [];
          for (let j = 0; j < 4; j++) {
            polyPoints.push([
              x + getUnit32RandomValues() * 20,
              y + getUnit32RandomValues() * 20,
            ]);
          }
          element = new Polygon({
            shape: { points: polyPoints },
            style: { fill: color, opacity: 0.6 },
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
  }, [count, locale, mode, shapeType, theme]);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>
        {t(locale, 'examples.performance.title', 'Performance Test')}
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
            value={mode}
            onChange={(e) => setMode(e.target.value as 'canvas' | 'svg')}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          >
            <option value='canvas'>{t(locale, 'examples.control.canvas', 'Canvas')}</option>
            <option value='svg'>{t(locale, 'examples.control.svg', 'SVG')}</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>{t(locale, 'examples.performance.elementCount', 'Element Count')}:</span>
          <input
            type='number'
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              width: 80,
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>{t(locale, 'examples.performance.shapeType', 'Shape Type')}:</span>
          <select
            value={shapeType}
            onChange={(e) => setShapeType(e.target.value as ShapeType)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          >
            <option value='circle'>{t(locale, 'examples.shape.circle', 'Circle')}</option>
            <option value='rect'>{t(locale, 'examples.shape.rect', 'Rect')}</option>
            <option value='line'>{t(locale, 'examples.shape.line', 'Line')}</option>
            <option value='polyline'>{t(locale, 'examples.shape.polyline', 'Polyline')}</option>
            <option value='polygon'>{t(locale, 'examples.shape.polygon', 'Polygon')}</option>
          </select>
        </label>
      </div>

      <div
        style={{
          marginBottom: 20,
          padding: 16,
          backgroundColor: normalizedTheme === 'dark' ? '#333' : '#f5f5f5',
          color: normalizedTheme === 'dark' ? '#eee' : 'inherit',
          borderRadius: 8,
        }}
      >
        <strong>{t(locale, 'examples.performance.renderTime', 'Render Time')}:</strong> {renderTime}ms |{' '}
        <strong>{t(locale, 'examples.performance.elements', 'Elements')}:</strong> {count} |{' '}
        <strong>{t(locale, 'examples.performance.mode', 'Mode')}:</strong>{' '}
        {mode === 'canvas'
          ? t(locale, 'examples.control.canvas', 'Canvas')
          : t(locale, 'examples.control.svg', 'SVG')}{' '}
        | <strong>{t(locale, 'examples.performance.shape', 'Shape')}:</strong>{' '}
        {shapeType === 'circle'
          ? t(locale, 'examples.shape.circle', 'Circle')
          : shapeType === 'rect'
            ? t(locale, 'examples.shape.rect', 'Rect')
            : shapeType === 'line'
              ? t(locale, 'examples.shape.line', 'Line')
              : shapeType === 'polyline'
                ? t(locale, 'examples.shape.polyline', 'Polyline')
                : t(locale, 'examples.shape.polygon', 'Polygon')}
      </div>

      <div
        ref={containerRef}
        style={{
          border: `1px solid ${EXAMPLES_COLORS.border}`,
          borderRadius: 8,
          width: EXAMPLES_RENDERER_CANVAS.width,
          height: EXAMPLES_RENDERER_CANVAS.performanceHeight,
        }}
      />
    </div>
  );
};

export default PerformanceExample;
