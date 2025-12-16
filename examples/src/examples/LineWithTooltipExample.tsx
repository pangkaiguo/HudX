import React, { useEffect, useRef } from 'react';
import { Renderer, Polyline, Circle, Text, Tooltip, Legend } from '@HudX/core';

export const LineWithTooltipExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const pointsRef = useRef<Map<number, Circle>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 800;
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const data = [120, 200, 150, 80, 70, 110, 130];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data);

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      renderer.add(new Polyline({
        shape: { points: [[padding.left, y], [width - padding.right, y]] },
        style: { stroke: '#e0e0e0', lineWidth: 1 }
      }));
    }

    const points = data.map((value, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const y = padding.top + chartHeight - (value / max) * chartHeight;
      return [x, y];
    });

    renderer.add(new Polyline({
      shape: { points },
      style: { stroke: '#5470c6', lineWidth: 2 }
    }));

    const tooltip = new Tooltip();
    renderer.add(tooltip);

    pointsRef.current.clear();

    points.forEach((point, index) => {
      const circle = new Circle({
        shape: { cx: point[0], cy: point[1], r: 4 },
        style: { fill: '#5470c6', stroke: '#fff', lineWidth: 2 }
      });

      circle.on('mouseover', () => {
        circle.attr('style', { fill: '#ff6b6b' });
        tooltip.show(point[0] + 10, point[1] - 30, `${labels[index]}\n${data[index]}`);
        renderer.flush();
      });

      circle.on('mouseout', () => {
        circle.attr('style', { fill: '#5470c6' });
        tooltip.hide();
        renderer.flush();
      });

      renderer.add(circle);
      pointsRef.current.set(index, circle);
    });

    const legend = new Legend({
      x: 20,
      y: 20,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        pointsRef.current.forEach((point) => {
          point.attr('invisible', !selected);
        });
        renderer.flush();
      }
    });
    legend.setItems([{ name: 'Weekly Data', color: '#5470c6' }]);
    renderer.add(legend);

    renderer.add(new Text({
      shape: { text: 'Line Chart with Interactive Legend', x: width / 2, y: 20 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Line Chart with Interactive Legend</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Hover over data points for tooltip, click legend to show/hide</p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }} />
    </div>
  );
}

export default LineWithTooltipExample;