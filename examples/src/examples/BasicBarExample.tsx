import { useEffect, useRef } from 'react';
import { Renderer, Rect, Text, Tooltip } from '@HudX/core';
import { defaultColors, defaultPadding } from '../config';

export const BasicBarExample = () => {
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
    const barWidth = chartWidth / data.length * 0.6;
    const color = defaultColors[0];

    // Grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      renderer.add(new Rect({
        shape: { x: padding.left, y, width: chartWidth, height: 1 },
        style: { fill: '#e0e0e0' }
      }));
      renderer.add(new Text({
        shape: { text: String(Math.round(max - (max / 5) * i)), x: padding.left - 10, y },
        style: { textAlign: 'right', textBaseline: 'middle', fill: '#666', fontSize: 12 }
      }));
    }

    // Tooltip with smart positioning
    const tooltip = new Tooltip({ confine: true });
    tooltip.setContainer(width, height);
    renderer.add(tooltip);

    // Bars with interaction
    data.forEach((value, index) => {
      const x = padding.left + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2;
      const barHeight = (value / max) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      const bar = new Rect({
        shape: { x, y, width: barWidth, height: barHeight },
        style: { fill: color, opacity: 0.8 }
      });

      bar.on('mouseover', () => {
        bar.attr('style', { opacity: 1 });
        tooltip.show(x + barWidth / 2, y - 10, `${labels[index]}\n${value}`);
      });

      bar.on('mouseout', () => {
        bar.attr('style', { opacity: 0.8 });
        tooltip.hide();
      });

      renderer.add(bar);

      renderer.add(new Text({
        shape: { text: labels[index], x: x + barWidth / 2, y: height - padding.bottom + 20 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    // Title
    renderer.add(new Text({
      shape: { text: 'Bar Chart', x: width / 2, y: 20 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush(); // Initial render

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over bars to see values</p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Bar chart showing weekly data from Monday to Sunday"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }}
      />
    </div>
  );
}

export default BasicBarExample;