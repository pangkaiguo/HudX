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
  const elementMapRef = useRef<Map<string, any[]>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 900;
    const height = 500;
    const padding = { top: 60, right: 40, bottom: 80, left: 70 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const seriesData = [
      { name: 'Series A', color: '#5470c6', data: [120, 200, 150, 80, 70, 110, 130] },
      { name: 'Series B', color: '#91cc75', data: [100, 150, 120, 110, 90, 140, 120] },
      { name: 'Series C', color: '#fac858', data: [80, 120, 100, 140, 110, 100, 90] }
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
        shape: { text: label, x, y: height - padding.bottom + 25 },
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
    tooltipRef.current = tooltip;

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
    const elementMap = new Map<string, any[]>();
    series.forEach(s => {
      elementMap.set(s.name, []);
    });
    elementMapRef.current = elementMap;

    series.forEach((s, seriesIndex) => {
      const line = new Polyline({
        shape: { points: s.points.map(p => [p.x, p.y]) },
        style: { stroke: s.color, lineWidth: 2, opacity: 0 }
      });
      renderer.add(line);
      elementMap.get(s.name)?.push(line);

      requestAnimationFrame(() => {
        const lineAnim = new Animation(
          line.attr('style'),
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

      s.points.forEach((point, pointIndex) => {
        const circle = new Circle({
          shape: { cx: point.x, cy: point.y, r: 0 },
          style: { fill: s.color, stroke: '#fff', lineWidth: 2 }
        });

        circle.on('mouseover', () => {
          circle.attr({ shape: { r: 7 } });
          const tooltipText = `${s.name}\n${point.label}: ${point.value}`;
          tooltip.show(point.x + 10, point.y - 40, tooltipText);
          renderer.flush();
        });

        circle.on('mouseout', () => {
          circle.attr({ shape: { r: 4 } });
          tooltip.hide();
          renderer.flush();
        });

        renderer.add(circle);
        elementMap.get(s.name)?.push(circle);

        requestAnimationFrame(() => {
          const pointAnim = new Animation(
            circle.attr('shape'),
            'r',
            4,
            500,
            seriesIndex * 120 + pointIndex * 50,
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
      y: 15,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        const elements = elementMap.get(name) || [];
        elements.forEach(el => {
          el.attr({ invisible: !selected });
        });
        renderer.flush();
      }
    });
    legend.setItems(series.map(s => ({ name: s.name, color: s.color })));
    renderer.add(legend);

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
      <div 
        ref={containerRef} 
        role="img"
        aria-label="Advanced line chart with three series showing weekly data"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 900, height: 500 }} 
      />
    </div>
  );
}
