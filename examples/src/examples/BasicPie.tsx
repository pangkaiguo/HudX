import { useEffect, useRef } from 'react';
import { Renderer, Sector, Text, Tooltip, Legend } from '@HudX/core';
import { defaultColors } from '../config';

export default function BasicPie() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    const radius = 120;

    const data = [
      { name: 'Direct', value: 335 },
      { name: 'Email', value: 310 },
      { name: 'Ads', value: 234 },
      { name: 'Video', value: 135 },
      { name: 'Search', value: 148 }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Tooltip with smart positioning
    const tooltip = new Tooltip({ confine: true });
    tooltip.setContainer(width, height);
    renderer.add(tooltip);

    let startAngle = -Math.PI / 2;
    const sectors: Sector[] = [];

    data.forEach((item, index) => {
      const angle = (item.value / total) * Math.PI * 2;
      const endAngle = startAngle + angle;
      const midAngle = startAngle + angle / 2;
      const color = defaultColors[index % defaultColors.length];

      const sector = new Sector({
        shape: { cx: centerX, cy: centerY, r0: 0, r: radius, startAngle, endAngle },
        style: { fill: color, opacity: 0.8 }
      });

      sector.on('mouseover', () => {
        sector.attr('style', { opacity: 1 });
        const percentage = ((item.value / total) * 100).toFixed(1);
        tooltip.show(
          centerX + Math.cos(midAngle) * (radius + 40),
          centerY + Math.sin(midAngle) * (radius + 40),
          `${item.name}\n${item.value} (${percentage}%)`
        );
      });

      sector.on('mouseout', () => {
        sector.attr('style', { opacity: 0.8 });
        tooltip.hide();
      });

      renderer.add(sector);
      sectors.push(sector);

      // Label
      const labelX = centerX + Math.cos(midAngle) * (radius + 30);
      const labelY = centerY + Math.sin(midAngle) * (radius + 30);

      renderer.add(new Text({
        shape: { text: `${item.name}`, x: labelX, y: labelY },
        style: { textAlign: 'center', textBaseline: 'middle', fill: '#666', fontSize: 12 }
      }));

      startAngle = endAngle;
    });

    // Legend
    const legend = new Legend({
      x: 50,
      y: height - 80,
      orient: 'horizontal',
      onSelect: (name, selected) => {
        data.forEach((item, index) => {
          if (item.name === name) {
            sectors[index].attr('invisible', !selected);
          }
        });
      }
    });
    legend.setItems(data.map((item, index) => ({
      name: item.name,
      color: defaultColors[index % defaultColors.length]
    })));
    renderer.add(legend);

    // Title
    renderer.add(new Text({
      shape: { text: 'Pie Chart', x: width / 2, y: 25 },
      style: { textAlign: 'center', fill: '#333', fontSize: 16, fontWeight: 'bold' }
    }));

    renderer.resize(width, height);
    renderer.flush(); // Initial render

    return () => renderer.dispose();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>Hover over slices to see details • Click legend to toggle</p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Pie chart showing distribution across Direct, Email, Ads, Video, and Search categories"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 800, height: 400 }}
      />
    </div>
  );
}
