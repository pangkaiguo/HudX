import { ChartElement, Circle, Rect, Polygon, Path } from "hux-core";

export type SymbolType =
  | "circle"
  | "rect"
  | "roundRect"
  | "triangle"
  | "diamond"
  | "pin"
  | "arrow"
  | "none"
  | string;

export function createSymbol(
  type: SymbolType,
  x: number,
  y: number,
  size: number,
  style: any,
  z: number = 0,
): ChartElement | null {
  if (type === "none") return null;

  const half = size / 2;

  switch (type) {
    case "rect":
      return new Rect({
        shape: {
          x: x - half,
          y: y - half,
          width: size,
          height: size,
        },
        style,
        z,
      });

    case "roundRect":
      return new Rect({
        shape: {
          x: x - half,
          y: y - half,
          width: size,
          height: size,
          r: size / 4,
        },
        style,
        z,
      });

    case "triangle":
      return new Polygon({
        shape: {
          points: [
            [x, y - half],
            [x - half, y + half],
            [x + half, y + half],
          ],
        },
        style,
        z,
      });

    case "diamond":
      return new Polygon({
        shape: {
          points: [
            [x, y - half],
            [x + half, y],
            [x, y + half],
            [x - half, y],
          ],
        },
        style,
        z,
      });

    case "pin":
      // Simplified pin path
      const pR = size / 2;
      const pY = y - size / 4;
      // Use Path for pin
      const dPin = `M${x},${pY} m${-pR},0 a${pR},${pR} 0 1,0 ${size},0 a${pR},${pR} 0 1,0 ${-size},0 Z M${x},${pY + pR} L${x},${y + half}`;
      // Actually a pin usually looks like a balloon. Let's do a simple circle + triangle or path.
      // Path: Circle at top, triangle at bottom.
      const r = size / 2;
      const h = size * 1.5;
      const pinPath = `M${x},${y - r} A${r},${r} 0 1,1 ${x - 0.01},${y - r} L${x},${y + r} Z`;
      return new Path({
        shape: { d: pinPath },
        style,
        z,
      });

    case "arrow":
      return new Polygon({
        shape: {
          points: [
            [x, y - half],
            [x + half, y + half],
            [x, y + half / 2],
            [x - half, y + half],
          ],
        },
        style,
        z,
      });

    case "circle":
    default:
      // Check if type starts with 'path://' or 'image://' (not implemented yet)
      return new Circle({
        shape: {
          cx: x,
          cy: y,
          r: half,
        },
        style,
        z,
      });
  }
}
