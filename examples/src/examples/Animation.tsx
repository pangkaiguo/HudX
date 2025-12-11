import React, { useEffect, useRef } from 'react';
import { Renderer, Circle, Rect, Animation, Easing } from '@hudx/core';

export default function AnimationExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');

    const circle = new Circle({
      shape: { cx: 100, cy: 100, r: 30 },
      style: { fill: '#5470c6' }
    });

    const rect = new Rect({
      shape: { x: 300, y: 100, width: 60, height: 60 },
      style: { fill: '#91cc75' }
    });

    renderer.add(circle);
    renderer.add(rect);
    renderer.resize(800, 300);

    // Animate circle position
    const anim1 = new Animation(
      circle.shape,
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

    // Animate rect scale
    const anim2 = new Animation(
      rect.transform,
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

    // Animate rect scale Y
    const anim3 = new Animation(
      rect.transform,
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
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Animation Demo</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Circle moves right, Rectangle scales</p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 300 }} />
    </div>
  );
}
