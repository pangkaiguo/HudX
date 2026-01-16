/**
 * IPainter - Painter interface
 * Unified interface for Canvas and SVG painters
 */

import type { DataURLOpts } from "../types";

export default interface IPainter {
  resize(width?: number, height?: number): void;
  getWidth(): number;
  getHeight(): number;
  markDirty(): void;
  paint(): void;
  dispose(): void;
  getDataURL(opts?: DataURLOpts): string;
  getCanvas?(): HTMLCanvasElement;
  getSVG?(): SVGSVGElement;
  getRootGroup?(): SVGGElement;
}
