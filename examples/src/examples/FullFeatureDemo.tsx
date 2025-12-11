import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Polyline, Circle, Rect, Text, Tooltip, Legend, Animation, Easing } from '@hudx/core';

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

    // Draw grid
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

    // Draw X-axis labels
    labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (labels.length - 1)) * index;
      renderer.add(new Text({
        shape: { text: label, x, y: height - padding.bottom + 35 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    // Create tooltip
    const tooltip = new Tooltip({
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      textColor: '#fff',
      padding: 12,
      fontSize: 13
    });
    renderer.add(tooltip);

    let hoverCount = 0;
    let clickCount = 0;

    // Draw series
    seriesData.forEach((series, seriesIndex) => {
      const points = series.data.map((value, index) => ({
        x: padding.left + (chartWidth / (labels.length - 1)) * index,
        y: padding.top + chartHeight - (value / maxValue) * chartHeight,
        value,
        label: labels[index]
      }));

      // Draw line
      const line = new Polyline({
        shape: { points: points.map(p => [p.x, p.y]) },
        style: { stroke: series.color, lineWidth: 2.5, opacity: 0 }
      });
      renderer.add(line);

      // Animate line
      const lineAnim = new Animation(
        line.attr('style'),
        'opacity',
        1,
        800,
        seriesIndex * 200,
        Easing.cubicOut,
        () => renderer.flush()
      );
      animationsRef.current.push(lineAnim);
      lineAnim.start();

      // Draw points
      points.forEach((point, pointIndex) => {
        const circle = new Circle({
          shape: { cx: point.x, cy: point.y, r: 0 },
          style: { fill: series.color, stroke: '#fff', lineWidth: 2 }
        });

        circle.on('mouseover', () => {
          hoverCount++;
          setStats(prev => ({ ...prev, hovered: hoverCount }));
          circle.attr('shape', { r: 7 });
          tooltip.show(point.x + 10, point.y - 40, `${series.name}\n${point.label}: ${point.value}`);
          renderer.flush();
        });

        circle.on('mouseout', () => {
          circle.attr('shape', { r: 4 });
          tooltip.hide();
          renderer.flush();
        });

        circle.on('click', () => {
          clickCount++;
          setStats(prev => ({ ...prev, clicked: clickCount }));
          // Pulse animation on click
          const pulseAnim = new Animation(
            circle.attr('shape'),
            'r',
            8,
            300,
            0,
            Easing.cubicOut,
            () => {
              const returnAnim = new Animation(
                circle.attr('shape'),
                'r',
                4,
                300,
                0,
                Easing.cubicOut,
                () => renderer.flush()
              );
              returnAnim.start();
            },
            () => renderer.flush()
          );
          pulseAnim.start();
        });

        renderer.add(circle);

        // Animate point
        const pointAnim = new Animation(
          circle.attr('shape'),
          'r',
          4,
          600,
          seriesIndex * 200 + pointIndex * 80,
          Easing.elasticOut,
          () => renderer.flush()
        );
        animationsRef.current.push(pointAnim);
        pointAnim.start();
      });
    });

    // Create legend
    const legend = new Legend({
      x: padding.left,
      y: 50,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        renderer.getRoot().children.forEach(child => {
          if (child instanceof Polyline || child instanceof Circle) {
            // Toggle visibility based on legend selection
          }
        });
        renderer.flush();
      }
    });
    legend.setItems(seriesData.map(s => ({ name: s.name, color: s.color })));
    renderer.add(legend);

    // Title
    renderer.add(new Text({
      shape: { text: 'Full Feature Demo', x: width / 2, y: 25 },
      style: { textAlign: 'center', fill: '#333', fontSize: 20, fontWeight: 'bold' }
    }));

    // Subtitle
    renderer.add(new Text({
      shape: { text: 'Hover over points for tooltips • Click for pulse animation • Legend to toggle series', x: width / 2, y: 50 },
      style: { textAlign: 'center', fill: '#999', fontSize: 12 }
    }));

    // Stats box
    const statsBoxX = width - 200;
    const statsBoxY = height - 100;
    renderer.add(new Rect({
      shape: { x: statsBoxX, y: statsBoxY, width: 180, height: 80 },
      style: { fill: '#f5f5f5', stroke: '#ddd', lineWidth: 1 }
    }));

    renderer.add(new Text({
      shape: { text: 'Interactions', x: statsBoxX + 90, y: statsBoxY + 15 },
      style: { textAlign: 'center', fill: '#333', fontSize: 13, fontWeight: 'bold' }
    }));

    renderer.add(new Text({
      shape: { text: `Hovered: ${stats.hovered}`, x: statsBoxX + 10, y: statsBoxY + 40 },
      style: { fill: '#666', fontSize: 12 }
    }));

    renderer.add(new Text({
      shape: { text: `Clicked: ${stats.clicked}`, x: statsBoxX + 10, y: statsBoxY + 60 },
      style: { fill: '#666', fontSize: 12 }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => {
      animationsRef.current.forEach(anim => anim.stop());
      renderer.dispose();
    };
  }, [stats]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Full Feature Demo</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Comprehensive example showcasing all interactive features: animations, tooltips, legend, hover effects, and click handlers
      </p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 1000, height: 650 }} />
      <div style={{ marginTop: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <p style={{ margin: 0, color: '#666' }}>
          <strong>Interactions:</strong> Hovered: {stats.hovered} | Clicked: {stats.clicked}
        </p>
      </div>
    </div>
  );
}
