import React, { useEffect, useRef } from 'react';
import { Renderer, Arc, Text, Tooltip, Legend, Animation, Easing } from '@hudx/core';

interface PieSlice {
  name: string;
  value: number;
  color: string;
  startAngle: number;
  endAngle: number;
  arc?: Arc;
}

export default function AdvancedPieChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const slicesRef = useRef<PieSlice[]>([]);
  const tooltipRef = useRef<Tooltip>();
  const animationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(containerRef.current, 'canvas', 'light', 'en');
    rendererRef.current = renderer;

    const width = 900;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    const radius = 120;

    const data = [
      { name: 'Category A', value: 335, color: '#5470c6' },
      { name: 'Category B', value: 310, color: '#91cc75' },
      { name: 'Category C', value: 234, color: '#fac858' },
      { name: 'Category D', value: 135, color: '#ee6666' },
      { name: 'Category E', value: 148, color: '#73c0de' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Create tooltip
    const tooltip = new Tooltip({
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      textColor: '#fff',
      padding: 12,
      fontSize: 13
    });
    renderer.add(tooltip);
    tooltipRef.current = tooltip;

    // Calculate angles and create slices
    let currentAngle = -Math.PI / 2;
    const slices: PieSlice[] = [];

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      const midAngle = (startAngle + endAngle) / 2;

      const arc = new Arc({
        shape: {
          cx: centerX,
          cy: centerY,
          r: radius,
          r0: 0,
          startAngle: startAngle,
          endAngle: startAngle,
          clockwise: true
        },
        style: { fill: item.color, opacity: 0.8 }
      });

      arc.on('mouseover', () => {
        arc.attr('style', { opacity: 1 });
        const percentage = ((item.value / total) * 100).toFixed(1);
        tooltip.show(
          centerX + Math.cos(midAngle) * (radius + 40),
          centerY + Math.sin(midAngle) * (radius + 40),
          `${item.name}\n${item.value} (${percentage}%)`
        );
        renderer.flush();
      });

      arc.on('mouseout', () => {
        arc.attr('style', { opacity: 0.8 });
        tooltip.hide();
        renderer.flush();
      });

      renderer.add(arc);

      const slice: PieSlice = {
        name: item.name,
        value: item.value,
        color: item.color,
        startAngle,
        endAngle,
        arc
      };

      slices.push(slice);

      // Animate arc
      const arcAnim = new Animation(
        arc.attr('shape'),
        'endAngle',
        endAngle,
        1000,
        index * 150,
        Easing.cubicOut,
        () => renderer.flush()
      );
      animationsRef.current.push(arcAnim);
      arcAnim.start();

      // Add label
      const labelDistance = radius + 50;
      const labelX = centerX + Math.cos(midAngle) * labelDistance;
      const labelY = centerY + Math.sin(midAngle) * labelDistance;

      renderer.add(new Text({
        shape: { text: item.name, x: labelX, y: labelY },
        style: {
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#333',
          fontSize: 12,
          opacity: 0
        }
      }));

      // Animate label opacity
      const children = renderer.getRoot().children();
      const labelText = children[children.length - 1];
      const labelAnim = new Animation(
        labelText.attr('style'),
        'opacity',
        1,
        600,
        index * 150 + 500,
        Easing.cubicOut,
        () => renderer.flush()
      );
      animationsRef.current.push(labelAnim);
      labelAnim.start();

      currentAngle = endAngle;
    });

    slicesRef.current = slices;

    // Create legend
    const legend = new Legend({
      x: width - 200,
      y: 80,
      orient: 'vertical',
      onSelect: (name: string, selected: boolean) => {
        slices.forEach(slice => {
          if (slice.name === name && slice.arc) {
            slice.arc.attr('invisible', !selected);
          }
        });
        renderer.flush();
      }
    });
    legend.setItems(data.map(item => ({ name: item.name, color: item.color })));
    renderer.add(legend);

    // Title
    renderer.add(new Text({
      shape: { text: 'Advanced Pie Chart with Animation', x: width / 2, y: 30 },
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
      <h2 style={{ marginBottom: 10 }}>Advanced Pie Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Smooth pie slice animations • Percentage display • Interactive legend • Hover tooltips
      </p>
      <div ref={containerRef} style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 900, height: 500 }} />
    </div>
  );
}
