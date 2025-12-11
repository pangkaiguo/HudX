import React, { useEffect, useRef } from 'react';
import { Renderer, Polyline, Circle, Text, Tooltip, Legend, Animation, Easing } from '@hudx/core';

interface DataPoint {
  x: number;
  y: number;
  value: number;
  label: string;
}

interface Series {
  name: string;
  color: string;
  data: number[];
  points: DataPoint[];
}

export default function AdvancedLineChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const seriesRef = useRef<Series[]>([]);
  const tooltipRef = useRef<Tooltip>();
  const animationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 900;
    const height = 500;
    const padding = { top: 60, right: 40, bottom: 80, left: 70 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Sample data with multiple series
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const seriesData = [
      { name: 'Series A', color: '#5470c6', data: [120, 200, 150, 80, 70, 110, 130] },
      { name: 'Series B', color: '#91cc75', data: [100, 150, 120, 110, 90, 140, 120] },
      { name: 'Series C', color: '#fac858', data: [80, 120, 100, 140, 110, 100, 90] }
    ];

    // Draw grid
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

    // Draw X-axis labels
    labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (labels.length - 1)) * index;
      renderer.add(new Text({
        shape: { text: label, x, y: height - padding.bottom + 25 },
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
    tooltipRef.current = tooltip;

    // Process series data
    const series: Series[] = seriesData.map(s => ({
      ...s,
      points: s.data.map((value, index) => ({
        x: padding.left + (chartWidth / (labels.length - 1)) * index,
        y: padding.top + chartHeight - (value / maxValue) * chartHeight,
        value,
        label: labels[index]
      }))
    }));

    seriesRef.current = series;

    // Draw lines and points with animation
    series.forEach((s, seriesIndex) => {
      // Draw line
      const line = new Polyline({
        shape: { points: s.points.map(p => [p.x, p.y]) },
        style: { stroke: s.color, lineWidth: 2, opacity: 0 }
      });
      renderer.add(line);

      // Animate line opacity
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

      // Draw points with animation
      s.points.forEach((point, pointIndex) => {
        const circle = new Circle({
          shape: { cx: point.x, cy: point.y, r: 0 },
          style: { fill: s.color, stroke: '#fff', lineWidth: 2 }
        });

        circle.on('mouseover', () => {
          circle.attr('shape', { r: 7 });
          const tooltipText = `${s.name}\n${point.label}: ${point.value}`;
          tooltip.show(point.x + 10, point.y - 40, tooltipText);
          renderer.flush();
        });

        circle.on('mouseout', () => {
          circle.attr('shape', { r: 4 });
          tooltip.hide();
          renderer.flush();
        });

        renderer.add(circle);

        // Animate point radius
        const pointAnim = new Animation(
          circle.attr('shape'),
          'r',
          4,
          600,
          seriesIndex * 200 + pointIndex * 100,
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
      y: 15,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        series.forEach(s => {
          if (s.name === name) {
            s.points.forEach(point => {
              const circles = renderer.getRoot().children.filter(
                child => child instanceof Circle && 
                Math.abs((child as any).shape.cx - point.x) < 1 &&
                Math.abs((child as any).shape.cy - point.y) < 1
              );
              circles.forEach(circle => {
                (circle as any).attr('invisible', !selected);
              });
            });
          }
        });
        renderer.flush();
      }
    });
    legend.setItems(series.map(s => ({ name: s.name, color: s.color })));
    renderer.add(legend);

    // Title
    renderer.add(new Text({
      shape: { text: 'Advanced Line Chart with Animation', x: width / 2, y: 25 },
      style: { textAlign: 'center', fill: '#333', fontSize: 18, fontWeight: 'bold' }
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
      <h2 style={{ marginBottom: 10 }}>Advanced Line Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth animations on load • Interactive legend (click to toggle) • Hover tooltips with data details
      </p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 900, height: 500 }} />
    </div>
  );
}
