/**
 * IPainter - Painter interface
 * Unified interface for Canvas and SVG painters
 */
export default interface IPainter {
    resize(width?: number, height?: number): void;
    getWidth(): number;
    getHeight(): number;
    markDirty(): void;
    paint(): void;
    dispose(): void;
    getCanvas?(): HTMLCanvasElement;
    getSVG?(): SVGSVGElement;
    getRootGroup?(): SVGGElement;
}
//# sourceMappingURL=IPainter.d.ts.map