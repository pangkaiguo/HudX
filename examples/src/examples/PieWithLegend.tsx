import React, { useEffect, useRef } from 'react';
import { Renderer, Sector, Text, Tooltip, Legend } from '@HudX/core';

export default function PieWithLegend() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const sectorsRef = useRef<Map<string, Sector>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 120;

    const data = [
      { name: 'Direct', value: 335, color: '#5470c6' },
      { name: 'Email', value: 310, color: '#91cc75' },
      { name: 'Ads', value: 234, color: '#fac858' },
      { name: 'Video', value: 135, color: '#ee6666' },
      { name: 'Search', value: 148, color: '#73c0de' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const tooltip = new Tooltip();
    renderer.add(tooltip);

    let startAngle = -Math.PI / 2;
    sectorsRef.current.clear();

    data.forEach((item) => {
      const angle = (item.value / total) * Math.PI * 2;
      const endAngle = startAngle + angle;

      const sector = new Sector({
        shape: { cx: centerX, cy: centerY, r0: 0, r: radius, startAngle, endAngle },
        style: { fill: item.color, opacity: 0.8 }
      });

      sector.on('mouseover', () => {
        sector.attr('style', { opacity: 1 });
        const percent = ((item.value / total) * 100).toFixed(1);
        tooltip.show(centerX + 80, centerY - 80, `${item.name}\n${item.value}\n${percent}%`);
        renderer.flush();
      });

      sector.on('mouseout', () => {
        sector.attr('style', { opacity: 0.8 });
        tooltip.hide();
        renderer.flush();
      });

      renderer.add(sector);
      sectorsRef.current.set(item.name, sector);

      const midAngle = startAngle + angle / 2;
      const labelX = centerX + Math.cos(midAngle) * (radius + 30);
      const labelY = centerY + Math.sin(midAngle) * (radius + 30);

      renderer.add(new Text({
        shape: { text: item.name, x: labelX, y: labelY },
        style: { textAlign: 'center', fill: '#666', fontSize: 12 }
      }));

      startAngle = endAngle;
    });

    const legend = new Legend({
      x: 20,
      y: 20,
      orient: 'vertical',
      onSelect: (name: string, selected: boolean) => {
        const sector = sectorsRef.current.get(name);
        if (sector) {
          sector.attr('invisible', !selected);
          renderer.flush();
        }
      }
    });
    legend.setItems(data.map(d => ({ name: d.name, color: d.color })));
    renderer.add(legend);

    renderer.add(new Text({
      shape: { text: 'Pie Chart with Interactive Legend', x: width / 2, y: 30 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush();

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Pie Chart with Interactive Legend</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>Hover over slices for tooltip, click legend to show/hide</p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }} />
    </div>
  );
}
