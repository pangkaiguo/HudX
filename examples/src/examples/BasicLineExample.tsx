import { useEffect, useRef } from 'react';
import { Renderer, Polyline, Circle, Text, Tooltip } from '@HudX/core';
import { defaultColors, defaultPadding } from '../config';

export const BasicLineExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    const width = 800;
    const height = 400;
    const padding = defaultPadding.small;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const data = [120, 200, 150, 80, 70, 110, 130];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data);
    const color = defaultColors[0];

    // Grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      renderer.add(new Polyline({
        shape: { points: [[padding.left, y], [width - padding.right, y]] },
        style: { stroke: '#e0e0e0', lineWidth: 1 }
      }));
      renderer.add(new Text({
        shape: { text: String(Math.round(max - (max / 5) * i)), x: padding.left - 10, y },
        style: { textAlign: 'right', textBaseline: 'middle', fill: '#666', fontSize: 12 }
      }));
    }

    // Data points
    const points = data.map((value, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const y = padding.top + chartHeight - (value / max) * chartHeight;
      return [x, y];
    });

    // Line
    renderer.add(new Polyline({
      shape: { points },
      style: { stroke: color, lineWidth: 2 }
    }));

    // Tooltip with smart positioning
    const tooltip = new Tooltip({ confine: true });
    tooltip.setContainer(width, height);
    renderer.add(tooltip);

    // Points with interaction
    points.forEach((point, index) => {
      const circle = new Circle({
        shape: { cx: point[0], cy: point[1], r: 4 },
        style: { fill: color, stroke: '#fff', lineWidth: 2 }
      });

      circle.on('mouseover', () => {
        circle.attr('shape', { r: 7 });
        tooltip.show(point[0], point[1] - 30, `${labels[index]}\n${data[index]}`);
      });

      circle.on('mouseout', () => {
        circle.attr('shape', { r: 4 });
        tooltip.hide();
      });

      renderer.add(circle);

      renderer.add(new Text({
        shape: { text: labels[index], x: point[0], y: height - padding.bottom + 20 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    // Title
    renderer.add(new Text({
      shape: { text: 'Line Chart', x: width / 2, y: 20 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush(); // Initial render

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Line Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over data points to see values</p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Line chart showing weekly data from Monday to Sunday"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }}
      />
    </div>
  );
}

export default BasicLineExample;