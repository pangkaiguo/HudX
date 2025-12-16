import React, { useEffect, useRef } from 'react';
import { Renderer, Rect, Text, Tooltip, Legend, Animation, Easing } from '@HudX/core';

interface BarData {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  label: string;
  seriesName: string;
}

export const AdvancedBarExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer>();
  const barsRef = useRef<Map<string, Rect[]>>(new Map());
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

    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const seriesData = [
      { name: 'Product A', color: '#5470c6', data: [320, 332, 301, 334] },
      { name: 'Product B', color: '#91cc75', data: [220, 182, 191, 234] },
      { name: 'Product C', color: '#fac858', data: [150, 232, 201, 154] }
    ];

    const maxValue = Math.max(...seriesData.flatMap(s => s.data));

    // Draw grid
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      renderer.add(new Rect({
        shape: { x: padding.left, y, width: chartWidth, height: 1 },
        style: { fill: '#e0e0e0' }
      }));
      renderer.add(new Text({
        shape: { text: String(Math.round(maxValue - (maxValue / 5) * i)), x: padding.left - 15, y },
        style: { textAlign: 'right', textBaseline: 'middle', fill: '#666', fontSize: 12 }
      }));
    }

    // Draw X-axis labels
    labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / labels.length) * (index + 0.5);
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

    // Draw bars with animation
    const barWidth = chartWidth / labels.length / seriesData.length - 4;
    const barsMap = new Map<string, Rect[]>();

    seriesData.forEach((series, seriesIndex) => {
      const seriesBars: Rect[] = [];

      series.data.forEach((value, dataIndex) => {
        const groupX = padding.left + (chartWidth / labels.length) * dataIndex;
        const barX = groupX + seriesIndex * (barWidth + 4) + 2;
        const barHeight = (value / maxValue) * chartHeight;
        const barY = padding.top + chartHeight - barHeight;

        const bar = new Rect({
          shape: { x: barX, y: padding.top + chartHeight, width: barWidth, height: 0 },
          style: { fill: series.color, opacity: 0.8 }
        });

        bar.on('mouseover', () => {
          bar.attr({ style: { opacity: 1 } });
          tooltip.show(barX + barWidth / 2, barY - 10, `${series.name}\n${labels[dataIndex]}: ${value}`);
          renderer.flush();
        });

        bar.on('mouseout', () => {
          bar.attr({ style: { opacity: 0.8 } });
          tooltip.hide();
          renderer.flush();
        });

        renderer.add(bar);
        seriesBars.push(bar);

        // Delay animation until after first paint
        requestAnimationFrame(() => {
          const barHeightAnim = new Animation(
            bar.attr('shape'),
            'height',
            barHeight,
            600,
            seriesIndex * 100 + dataIndex * 60,
            Easing.cubicOut,
            () => bar.markRedraw()
          );
          const barYAnim = new Animation(
            bar.attr('shape'),
            'y',
            barY,
            600,
            seriesIndex * 100 + dataIndex * 60,
            Easing.cubicOut,
            () => bar.markRedraw()
          );
          animationsRef.current.push(barHeightAnim, barYAnim);
          barHeightAnim.start();
          barYAnim.start();
        });
      });

      barsMap.set(series.name, seriesBars);
    });

    barsRef.current = barsMap;

    // Create legend
    const legend = new Legend({
      x: padding.left,
      y: 15,
      orient: 'horizontal',
      onSelect: (name: string, selected: boolean) => {
        const bars = barsMap.get(name);
        if (bars) {
          bars.forEach(bar => {
            bar.attr({ invisible: !selected });
          });
        }
        renderer.flush();
      }
    });
    legend.setItems(seriesData.map(s => ({ name: s.name, color: s.color })));
    renderer.add(legend);

    // Title
    renderer.add(new Text({
      shape: { text: 'Advanced Bar Chart with Animation', x: width / 2, y: 25 },
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
      <h2 style={{ marginBottom: 10 }}>Advanced Bar Chart</h2>
      <p style={{ marginBottom: 20, color: '#666', fontSize: 14 }}>
        Features: Staggered bar animations • Interactive legend • Hover tooltips with values
      </p>
      <div
        ref={containerRef}
        role="img"
        aria-label="Advanced bar chart showing Product A, B, and C data across Q1 to Q4"
        style={{ border: '1px solid #e0e0e0', borderRadius: 8, width: 900, height: 500 }}
      />
    </div>
  );
}

export default AdvancedBarExample;
