import { useEffect, useRef, useState } from 'react';
import { Renderer, Polyline, Circle, Rect, Text, Tooltip, Legend, Animation, Easing } from '@HudX/core';

export default function FullFeatureDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const [stats, setStats] = useState({ hovered: 0, clicked: 0 });
  const animationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 1000;
    const height = 650;
    const padding = { top: 100, right: 60, bottom: 120, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const seriesData = [
      { name: 'Desktop', color: '#5470c6', data: [120, 200, 150, 80, 70, 110, 130] },
      { name: 'Mobile', color: '#91cc75', data: [100, 150, 120, 110, 90, 140, 120] },
      { name: 'Tablet', color: '#fac858', data: [80, 120, 100, 140, 110, 100, 90] }
    ];

    const maxValue = Math.max(...seriesData.flatMap(s => s.data));

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      renderer.add(new Polyline({
        shape: { points: [[padding.left, y], [width - padding.right, y]] },
        style: { stroke: '#e0e0e0', lineWidth: 1 }
      }));
      renderer.add(new Text({
        shape: { text: String(Math.round(maxValue - (maxValue / 5) * i)), x: padding.left - 15, y },
        style: { textAlign: 'right', textBaseline: 'middle', fill: '#666', fontSize: 12 }
      }));
    }

    labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (labels.length - 1)) * index;
      renderer.add(new Text({
        shape: { text: label, x, y: height - padding.bottom + 35 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    const tooltip = new Tooltip({
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      textColor: '#fff',
      padding: 12,
      fontSize: 13
    });
    renderer.add(tooltip);

    let hoverCount = 0;
    let clickCount = 0;

    seriesData.forEach((series, seriesIndex) => {
      const points = series.data.map((value, index) => ({
        x: padding.left + (chartWidth / (labels.length - 1)) * index,
        y: padding.top + chartHeight - (value / maxValue) * chartHeight,
        value,
        label: labels[index]
      }));

      const line = new Polyline({
        shape: { points: points.map(p => [p.x, p.y]) },
        style: { stroke: series.color, lineWidth: 2.5, opacity: 0 }
      });
      renderer.add(line);

      requestAnimationFrame(() => {
        const lineAnim = new Animation(
          line.attr('style') as Record<string, unknown>,
          'opacity',
          1,
          600,
          seriesIndex * 120,
          Easing.cubicOut,
          () => line.markRedraw()
        );
        animationsRef.current.push(lineAnim);
        lineAnim.start();
      });

      points.forEach((point, pointIndex) => {
        const circle = new Circle({
          shape: { cx: point.x, cy: point.y, r: 0 },
          style: { fill: series.color, stroke: '#fff', lineWidth: 2 }
        });

        circle.on('mouseover', () => {
          hoverCount++;
          setStats(prev => ({ ...prev, hovered: hoverCount }));
          circle.attr({ shape: { r: 7 } });
          tooltip.show(point.x + 10, point.y - 40, `${series.name}\n${point.label}: ${point.value}`);
          renderer.flush();
        });

        circle.on('mouseout', () => {
          circle.attr({ shape: { r: 4 } });
          tooltip.hide();
          renderer.flush();
        });

        circle.on('click', () => {
          clickCount++;
          setStats(prev => ({ ...prev, clicked: clickCount }));
        });

        renderer.add(circle);

        requestAnimationFrame(() => {
          const pointAnim = new Animation(
            circle.attr('shape') as Record<string, unknown>,
            'r',
            4,
            500,
            seriesIndex * 120 + pointIndex * 40,
            Easing.cubicOut,
            () => circle.markRedraw()
          );
          animationsRef.current.push(pointAnim);
          pointAnim.start();
        });
      });
    });

    const legend = new Legend({
      x: padding.left,
      y: 50,
      orient: 'horizontal'
    });
    legend.setItems(seriesData.map(s => ({ name: s.name, color: s.color })));
    renderer.add(legend);

    renderer.add(new Text({
      shape: { text: 'Full Feature Demo', x: width / 2, y: 25 },
      style: { textAlign: 'center', fill: '#333', fontSize: 20, fontWeight: 'bold' }
    }));

    renderer.add(new Text({
      shape: { text: 'Hover over points for tooltips • Click for interaction • Legend to toggle series', x: width / 2, y: 50 },
      style: { textAlign: 'center', fill: '#999', fontSize: 12 }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => {
      animationsRef.current.forEach(anim => anim.stop());
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Full Feature Demo</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Comprehensive example showcasing all interactive features
      </p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Full feature demo with interactive line chart showing Desktop, Mobile, and Tablet data"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 1000, height: 650 }}
      />
      <div style={{ marginTop: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <p style={{ margin: 0, color: '#666' }}>
          <strong>Interactions:</strong> Hovered: {stats.hovered} | Clicked: {stats.clicked}
        </p>
      </div>
    </div>
  );
}
