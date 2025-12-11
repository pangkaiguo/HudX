import React, { useEffect, useRef } from 'react';
import { Renderer, Rect, Text, Tooltip, Legend } from '@hudx/core';

export default function BarWithLegend() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const barsRef = useRef<Map<number, Rect>>(new Map());

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
    const barWidth = chartWidth / data.length * 0.6;

    const tooltip = new Tooltip();
    renderer.add(tooltip);

    barsRef.current.clear();

    data.forEach((value, index) => {
      const x = padding.left + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2;
      const barHeight = (value / max) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      const rect = new Rect({
        shape: { x, y, width: barWidth, height: barHeight },
        style: { fill: '#5470c6', opacity: 0.8 }
      });

      rect.on('mouseover', () => {
        rect.attr('style', { fill: '#ff6b6b', opacity: 1 });
        tooltip.show(x + barWidth / 2, y - 10, `${labels[index]}\n${value}`);
        renderer.flush();
      });

      rect.on('mouseout', () => {
        rect.attr('style', { fill: '#5470c6', opacity: 0.8 });
        tooltip.hide();
        renderer.flush();
      });

      renderer.add(rect);
      barsRef.current.set(index, rect);

      renderer.add(new Text({
        shape: { text: labels[index], x: x + barWidth / 2, y: height - padding.bottom + 20 },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));
    });

    const legend = new Legend({
      x: 20,
      y: 20,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        barsRef.current.forEach((bar) => {
          bar.attr('invisible', !selected);
        });
        renderer.flush();
      }
    });
    legend.setItems([{ name: 'Sales', color: '#5470c6' }]);
    renderer.add(legend);

    renderer.add(new Text({
      shape: { text: 'Bar Chart with Interactive Legend', x: width / 2, y: 20 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Bar Chart with Interactive Legend</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Hover over bars for tooltip, click legend to show/hide all bars</p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }} />
    </div>
  );
}
