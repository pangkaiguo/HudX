import { describe, it, expect, vi } from "vitest";
import Sector from "../Sector";

describe("Sector", () => {
  it("should initialize with provided values", () => {
    const sector = new Sector({
      shape: {
        cx: 100,
        cy: 100,
        r0: 50,
        r: 100,
        startAngle: 0,
        endAngle: Math.PI / 2,
      },
    });
    expect(sector.shape).toEqual({
      cx: 100,
      cy: 100,
      r0: 50,
      r: 100,
      startAngle: 0,
      endAngle: Math.PI / 2,
    });
  });

  it("should calculate bounding rect correctly", () => {
    const sector = new Sector({
      shape: {
        cx: 100,
        cy: 100,
        r0: 50,
        r: 100,
        startAngle: 0,
        endAngle: Math.PI / 2,
      },
    });
    // Bounding rect logic in Sector.ts is simplified (square around circle), not tight
    // r = 100, padding = 100 + 0.5 = 100.5
    // x = 100 - 100.5 = -0.5
    // y = 100 - 100.5 = -0.5
    // w = 201
    // h = 201
    const bbox = sector.getBoundingRect();
    expect(bbox.width).toBeCloseTo(201);
    expect(bbox.height).toBeCloseTo(201);
  });

  it("should check containment correctly", () => {
    const sector = new Sector({
      shape: {
        cx: 100,
        cy: 100,
        r0: 50,
        r: 100,
        startAngle: 0,
        endAngle: Math.PI / 2,
      },
    });

    // Inside (radius 75, angle 45 deg)
    const x = 100 + 75 * Math.cos(Math.PI / 4);
    const y = 100 + 75 * Math.sin(Math.PI / 4);
    expect(sector.contain(x, y)).toBe(true);

    // Outside radius (> 100)
    expect(sector.contain(250, 100)).toBe(false);

    // Inside radius but outside angle (e.g. 180 deg)
    expect(sector.contain(25, 100)).toBe(false);

    // Inside hole (< 50)
    expect(sector.contain(100, 100)).toBe(false);
  });

  it("should check containment crossing 0", () => {
    // 350 deg to 10 deg
    const startAngle = (350 * Math.PI) / 180;
    const endAngle = (10 * Math.PI) / 180;

    const sector = new Sector({
      shape: { cx: 0, cy: 0, r0: 0, r: 100, startAngle, endAngle },
    });

    // 0 deg (inside)
    expect(sector.contain(50, 0)).toBe(true);
    // 180 deg (outside)
    expect(sector.contain(-50, 0)).toBe(false);
  });

  it("should render pie sector (no hole)", () => {
    const sector = new Sector({
      shape: {
        cx: 100,
        cy: 100,
        r0: 0,
        r: 50,
        startAngle: 0,
        endAngle: Math.PI / 2,
      },
      style: { fill: "red" },
    });

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      arc: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    sector.render(ctx);

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(100, 100);
    expect(ctx.arc).toHaveBeenCalledWith(100, 100, 50, 0, Math.PI / 2, false);
    expect(ctx.closePath).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("should render donut sector (with hole)", () => {
    const sector = new Sector({
      shape: {
        cx: 100,
        cy: 100,
        r0: 20,
        r: 50,
        startAngle: 0,
        endAngle: Math.PI / 2,
      },
      style: { fill: "red" },
    });

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      arc: vi.fn(),
      closePath: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      setLineDash: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    sector.render(ctx);

    expect(ctx.beginPath).toHaveBeenCalled();
    // Should call arc twice: outer and inner (reverse)
    expect(ctx.arc).toHaveBeenCalledTimes(2);
    expect(ctx.arc).toHaveBeenNthCalledWith(
      1,
      100,
      100,
      20,
      0,
      Math.PI / 2,
      false,
    ); // inner first? or outer? Implementation check
    // Implementation:
    // ctx.arc(..., r0, ..., anticlockwise || false);
    // ctx.arc(..., r, ..., !anticlockwise);
    // Wait, standard ring drawing usually outer then inner (reverse) to create hole with non-zero winding rule?
    // Or move to start of outer, arc outer, line to start of inner, arc inner reverse.

    // Let's verify args
    // 1st call: r0 (20), anticlockwise false
    // 2nd call: r (50), anticlockwise true (reversed)

    // Code:
    // ctx.arc(shape.cx, shape.cy, shape.r0, shape.startAngle, shape.endAngle, shape.anticlockwise || false);
    // ctx.arc(shape.cx, shape.cy, shape.r, shape.endAngle, shape.startAngle, !shape.anticlockwise);

    expect(ctx.arc).toHaveBeenNthCalledWith(
      1,
      100,
      100,
      20,
      0,
      Math.PI / 2,
      false,
    );
    expect(ctx.arc).toHaveBeenNthCalledWith(
      2,
      100,
      100,
      50,
      Math.PI / 2,
      0,
      true,
    );

    expect(ctx.closePath).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("should not render if invisible", () => {
    const sector = new Sector({
      shape: { cx: 0, cy: 0, r0: 0, r: 10, startAngle: 0, endAngle: 1 },
      invisible: true,
    });
    const ctx = { save: vi.fn() } as unknown as CanvasRenderingContext2D;
    sector.render(ctx);
    expect(ctx.save).not.toHaveBeenCalled();
  });
});
