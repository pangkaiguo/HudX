import { describe, it, expect, vi } from "vitest";
import Group from "../Group";
import Rect from "../shape/Rect";
import ChartElement from "../ChartElement";

describe("Group", () => {
  it("should add and remove children", () => {
    const group = new Group();
    const rect = new Rect();

    group.add(rect);
    expect(group.children().length).toBe(1);
    expect(group.childAt(0)).toBe(rect);
    expect((rect as any).__parent).toBe(group);

    group.remove(rect);
    expect(group.children().length).toBe(0);
    expect((rect as any).__parent).toBeUndefined();
  });

  it("should not add self", () => {
    const group = new Group();
    group.add(group);
    expect(group.children().length).toBe(0);
  });

  it("should handle re-parenting", () => {
    const group1 = new Group();
    const group2 = new Group();
    const rect = new Rect();

    group1.add(rect);
    expect((rect as any).__parent).toBe(group1);

    group2.add(rect);
    expect((rect as any).__parent).toBe(group2);
    expect(group1.children().length).toBe(0);
    expect(group2.children().length).toBe(1);
  });

  it("should remove all children", () => {
    const group = new Group();
    const r1 = new Rect();
    const r2 = new Rect();

    group.add(r1);
    group.add(r2);

    expect(group.childrenCount()).toBe(2);

    group.removeAll();
    expect(group.childrenCount()).toBe(0);
    expect((r1 as any).__parent).toBeUndefined();
    expect((r2 as any).__parent).toBeUndefined();
  });

  it("should find child by name (using id)", () => {
    const group = new Group();
    const rect = new Rect({
      id: "my-rect",
      shape: { x: 0, y: 0, width: 10, height: 10 },
    });
    group.add(rect);

    expect(group.childOfName("my-rect")).toBe(rect);
    expect(group.childOfName("non-existent")).toBeUndefined();
  });

  it("should traverse children", () => {
    const group = new Group();
    const g1 = new Group();
    const r1 = new Rect();
    const r2 = new Rect();

    group.add(g1);
    g1.add(r1);
    group.add(r2);

    const visited: ChartElement[] = [];
    group.traverse((child) => {
      visited.push(child);
    });

    expect(visited).toContain(g1);
    expect(visited).toContain(r1);
    expect(visited).toContain(r2);
    expect(visited.length).toBe(3);
  });

  it("should traverse with includeSelf", () => {
    const group = new Group();
    const visited: ChartElement[] = [];
    group.traverse((child) => {
      visited.push(child);
    }, true);

    expect(visited).toContain(group);
  });

  it("should calculate bounding rect", () => {
    const group = new Group();
    const r1 = new Rect({ shape: { x: 0, y: 0, width: 10, height: 10 } });
    const r2 = new Rect({ shape: { x: 20, y: 20, width: 10, height: 10 } });

    group.add(r1);
    group.add(r2);

    const rect = group.getBoundingRect();
    expect(rect).toEqual({
      x: 0,
      y: 0,
      width: 30,
      height: 30,
    });
  });

  it("should return empty rect if no children", () => {
    const group = new Group();
    expect(group.getBoundingRect()).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  });

  it("should check containment", () => {
    const group = new Group();
    const rect = new Rect({ shape: { x: 0, y: 0, width: 100, height: 100 } });
    group.add(rect);

    expect(group.contain(50, 50)).toBe(true);
    expect(group.contain(150, 150)).toBe(false);
  });

  it("should render children", () => {
    const group = new Group();
    const rect = new Rect();
    rect.render = vi.fn();

    group.add(rect);

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    group.render(ctx);

    expect(ctx.save).toHaveBeenCalled();
    expect(rect.render).toHaveBeenCalledWith(ctx);
    expect(ctx.restore).toHaveBeenCalled();
  });

  it("should sort children by z/zlevel before render", () => {
    const group = new Group();
    const r1 = new Rect({ z: 1, shape: { x: 0, y: 0, width: 0, height: 0 } });
    const r2 = new Rect({ z: 2, shape: { x: 0, y: 0, width: 0, height: 0 } });
    const r3 = new Rect({
      zlevel: 1,
      shape: { x: 0, y: 0, width: 0, height: 0 },
    });

    const renderOrder: string[] = [];
    r1.render = () => renderOrder.push("r1");
    r2.render = () => renderOrder.push("r2");
    r3.render = () => renderOrder.push("r3");

    group.add(r2);
    group.add(r3);
    group.add(r1);

    const ctx = {
      save: vi.fn(),
      restore: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
    group.render(ctx);

    expect(renderOrder).toEqual(["r1", "r2", "r3"]);
  });
});
