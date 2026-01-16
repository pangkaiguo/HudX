import { describe, it, expect, vi } from "vitest";
import Line from "../Line";

describe("Line", () => {
  it("should initialize with default shape", () => {
    const line = new Line();
    expect(line.shape).toEqual({ x1: 0, y1: 0, x2: 0, y2: 0 });
  });

  it("should initialize with provided shape", () => {
    const line = new Line({
      shape: { x1: 10, y1: 10, x2: 100, y2: 100 },
    });
    expect(line.shape).toEqual({ x1: 10, y1: 10, x2: 100, y2: 100 });
  });

  it("should calculate bounding rect", () => {
    const line = new Line({
      shape: { x1: 10, y1: 20, x2: 100, y2: 200 },
      style: { lineWidth: 10 },
    });

    const rect = line.getBoundingRect();
    expect(rect).toEqual({
      x: 5,
      y: 15,
      width: 100,
      height: 190,
    });
  });

  it("should check containment", () => {
    const line = new Line({
      shape: { x1: 0, y1: 0, x2: 100, y2: 0 },
      style: { lineWidth: 10 },
    });

    expect(line.contain(50, 0)).toBe(true);
    expect(line.contain(50, 4)).toBe(true);
    expect(line.contain(50, 6)).toBe(false);
    expect(line.contain(-10, 0)).toBe(false);
  });

  it("should handle zero length line containment", () => {
    const line = new Line({
      shape: { x1: 10, y1: 10, x2: 10, y2: 10 },
      style: { lineWidth: 10 },
    });

    expect(line.contain(10, 10)).toBe(false);
  });

  it("should render", () => {
    const line = new Line({
      shape: { x1: 10, y1: 10, x2: 100, y2: 100 },
      style: { stroke: "red", lineWidth: 2 },
    });

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    line.render(ctx);

    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 10);
    expect(ctx.lineTo).toHaveBeenCalledWith(100, 100);
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
  });

  it("should not render if invisible", () => {
    const line = new Line({
      invisible: true,
      shape: { x1: 0, y1: 0, x2: 0, y2: 0 },
    });
    const ctx = { save: vi.fn() } as unknown as CanvasRenderingContext2D;
    line.render(ctx);
    expect(ctx.save).not.toHaveBeenCalled();
  });
});
