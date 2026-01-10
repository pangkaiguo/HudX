import { Point } from 'HudX/core';

/**
 * Calculate smooth line path data using Catmull-Rom spline algorithm (Centripetal or Uniform)
 * converted to Cubic Bezier for rendering.
 * This matches ECharts style smoothness.
 * 
 * @param points Data points
 * @param tension Tension factor (0-1). 0 is straight lines, 1 is very loose. Default is 0.5.
 * @param close Whether to close the path
 */
export function getSmoothPath(points: Point[], tension: number = 0.5, close: boolean = false): string {
  if (points.length < 2) return '';

  // ECharts default tension is 0.5, but we need to scale it for our bezier logic
  // Typically, Catmull-Rom to Bezier factor is 1/6 (approx 0.166)
  // If tension is 0.5, k should be around 0.166
  // Let's use tension / 3 as the factor directly
  const k = tension / 3;

  const size = points.length;
  let path = `M ${points[0].x} ${points[0].y}`;

  // If only 2 points, straight line
  if (size === 2) {
    path += ` L ${points[1].x} ${points[1].y}`;
    if (close) path += ' Z';
    return path;
  }

  // Helper to get point at index with clamping
  const getPt = (i: number) => {
    if (i < 0) return points[0];
    if (i >= size) return points[size - 1];
    return points[i];
  };

  for (let i = 0; i < size - 1; i++) {
    const p0 = getPt(i - 1);
    const p1 = getPt(i);
    const p2 = getPt(i + 1);
    const p3 = getPt(i + 2);

    // Catmull-Rom to Cubic Bezier conversion
    // For segment p1 -> p2
    // Tangent at p1 is (p2 - p0) * tension
    // Tangent at p2 is (p3 - p1) * tension
    // But ECharts smooth parameter acts like "smoothness" factor.
    // If smooth=0, straight line.
    // If smooth=1, full catmull-rom.
    // Standard Catmull-Rom has tension implicitly.
    // 
    // ECharts logic (simplified):
    // cp1 = p1 + (p2 - p0) * tension
    // cp2 = p2 - (p3 - p1) * tension
    // Usually scaled by distance or some factor.

    // A robust standard conversion:
    // cp1 = p1 + (p2 - p0) / 6 * k
    // cp2 = p2 - (p3 - p1) / 6 * k
    // where k is tension/smoothness. ECharts default smooth: 0.5 roughly maps to standard catmull-rom behavior.

    // Let's use 0.5 as the scaling factor for standard Catmull-Rom when tension is "normal".
    // If user passes 0-1, we treat it as the multiplier directly if we assume the formula involves a constant.

    // Actually, tension in ECharts context:
    // smooth: 0.5 (default) -> nice curve.
    // smooth: 0 -> straight.

    const cp1x = p1.x + (p2.x - p0.x) * k;
    const cp1y = p1.y + (p2.y - p0.y) * k;

    const cp2x = p2.x - (p3.x - p1.x) * k;
    const cp2y = p2.y - (p3.y - p1.y) * k;

    path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }

  if (close) {
    path += ' Z';
  }

  return path;
}

/**
 * Generate smooth area path
 */
export function getSmoothAreaPath(points: Point[], y0: number, tension: number = 0.5): string {
  if (points.length < 2) return '';

  let path = getSmoothPath(points, tension, false);

  // Close the area
  const last = points[points.length - 1];
  const first = points[0];

  // Ensure we go straight down, then across, then up
  path += ` L ${last.x} ${y0} L ${first.x} ${y0} Z`;

  return path;
}
