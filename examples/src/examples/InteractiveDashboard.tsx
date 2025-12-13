import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Polyline, Circle, Rect, Text, Tooltip, Legend, Animation, Easing } from '@HudX/core';

export default function InteractiveDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const [selectedSeries, setSelectedSeries] = useState<Set<string>>(new Set(['Series A', 'Series B']));
  const animationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 1000;
    const height = 600;
    const padding = { top: 80, right: 60, bottom: 100, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seriesData = [
      { name: 'Series A', color: '#5470c6', data: [120, 200, 150, 80, 70, 110, 130, 145, 160, 140, 155, 170] },
      { name: 'Series B', color: '#91cc75', data: [100, 150, 120, 110, 90, 140, 120, 135, 150, 130, 145, 160] },
      { name: 'Series C', color: '#fac858', data: [80, 120, 100, 140, 110, 100, 90, 105, 120, 110, 125, 140] }
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
        shape: { text: label, x, y: height - padding.bottom + 30 },
        style: { textAlign: 'center', fill: '#666', fontSize: 11 }
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

      requestAnimationFrame(() => {
        const lineAnim = new Animation(
          line.attr('style'),
          'opacity',
          1,
          600,
          seriesIndex * 150,
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
          circle.attr({ shape: { r: 6 } });
          tooltip.show(point.x + 10, point.y - 40, `${series.name}\n${point.label}: ${point.value}`);
          renderer.flush();
        });

        circle.on('mouseout', () => {
          circle.attr({ shape: { r: 4 } });
          tooltip.hide();
          renderer.flush();
        });

        renderer.add(circle);

        requestAnimationFrame(() => {
          const pointAnim = new Animation(
            circle.attr('shape'),
            'r',
            4,
            500,
            seriesIndex * 150 + pointIndex * 40,
            Easing.cubicOut,
            () => circle.markRedraw()
          );
          animationsRef.current.push(pointAnim);
          pointAnim.start();
        });
      });
    });

    // Create legend
    const legend = new Legend({
      x: padding.left,
      y: 30,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        const newSelected = new Set(selectedSeries);
        if (selected) {
          newSelected.add(name);
        } else {
          newSelected.delete(name);
        }
        setSelectedSeries(newSelected);
      }
    });
    legend.setItems(seriesData.map(s => ({ name: s.name, color: s.color })));
    renderer.add(legend);

    // Title
    renderer.add(new Text({
      shape: { text: 'Interactive Dashboard', x: width / 2, y: 25 },
      style: { textAlign: 'center', fill: '#333', fontSize: 20, fontWeight: 'bold' }
    }));

    // Subtitle
    renderer.add(new Text({
      shape: { text: '12-Month Performance Metrics', x: width / 2, y: 50 },
      style: { textAlign: 'center', fill: '#999', fontSize: 13 }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => {
      animationsRef.current.forEach(anim => anim.stop());
      renderer.dispose();
    };
  }, [selectedSeries]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Interactive Dashboard</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Multi-series line chart • Staggered animations • Interactive legend • Hover tooltips • Responsive updates
      </p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Interactive dashboard showing 12-month performance metrics for three series"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 1000, height: 600 }}
      />
    </div>
  );
}
