import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import Text from "../Text";

describe("Text", () => {
  let mockContext: any;

  beforeAll(() => {
    mockContext = {
      font: "",
      measureText: (text: string) => ({ width: text.length * 10 }),
      fillText: vi.fn(),
      strokeText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      scale: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
      rect: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      strokeRect: vi.fn(),
      fillRect: vi.fn(),
      setLineDash: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      arcTo: vi.fn(),
    };

    const mockCanvas = {
      getContext: () => mockContext,
    };

    Object.defineProperty(document, "createElement", {
      value: (tagName: string) => {
        if (tagName === "canvas") {
          return mockCanvas;
        }
        return {
          style: {},
          appendChild: vi.fn(),
          getBoundingClientRect: () => ({ width: 0, height: 0 }),
        };
      },
      writable: true,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const text = new Text();
    expect(text.shape).toEqual({ x: 0, y: 0, text: "" });
  });

  it("should initialize with provided values", () => {
    const text = new Text({
      shape: { x: 10, y: 20, text: "Hello" },
    });
    expect(text.shape).toEqual({ x: 10, y: 20, text: "Hello" });
  });

  it("should support text in style", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "" },
      style: { text: "Hello Style" },
    });
    expect(text.shape.text).toBe("Hello Style");
  });

  it("should calculate bounding rect correctly (mocked)", () => {
    const text = new Text({
      shape: { x: 10, y: 20, text: "Hello" },
      style: { fontSize: 10 },
    });

    const bbox = text.getBoundingRect();
    expect(bbox.width).toBe(50);
    expect(bbox.height).toBe(10);
    expect(bbox.x).toBe(10);
    expect(bbox.y).toBe(12);
  });

  it("should handle text alignment", () => {
    const text = new Text({
      shape: { x: 100, y: 100, text: "Hello" },
      style: { fontSize: 10, textAlign: "center", textBaseline: "middle" },
    });
    const bbox = text.getBoundingRect();
    expect(bbox.x).toBe(75);
    expect(bbox.y).toBe(95);
  });

  it("should handle right/bottom alignment", () => {
    const text = new Text({
      shape: { x: 100, y: 100, text: "Hello" },
      style: { fontSize: 10, textAlign: "right", textBaseline: "bottom" },
    });
    const bbox = text.getBoundingRect();
    expect(bbox.x).toBe(50);
    expect(bbox.y).toBe(90);
  });

  it("should handle padding", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "A" },
      style: { fontSize: 10, padding: 5 },
    });

    const bbox = text.getBoundingRect();
    expect(bbox.width).toBe(20);
    expect(bbox.height).toBe(20);
  });

  it("should check containment", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "Hello" },
      style: { fontSize: 10 },
    });

    expect(text.contain(10, 0)).toBe(true);
    expect(text.contain(60, 0)).toBe(false);
  });

  it("should render multi-line text", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "Line1\nLine2" },
      style: { fontSize: 10 },
    });

    const ctx = document.createElement("canvas").getContext("2d")!;
    text.render(ctx);

    expect(ctx.fillText).toHaveBeenCalledTimes(2);
    expect(ctx.fillText).toHaveBeenCalledWith(
      "Line1",
      expect.any(Number),
      expect.any(Number),
    );
    expect(ctx.fillText).toHaveBeenCalledWith(
      "Line2",
      expect.any(Number),
      expect.any(Number),
    );
  });

  it("should render rich text", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "{a|Hello} {b|World}" },
      style: {
        fontSize: 10,
        rich: {
          a: { color: "red", fontSize: 20 },
          b: { color: "blue" },
        },
      },
    });

    const ctx = document.createElement("canvas").getContext("2d")!;
    text.render(ctx);

    expect(ctx.fillText).toHaveBeenCalledWith(
      "Hello",
      expect.any(Number),
      expect.any(Number),
    );
    expect(ctx.fillText).toHaveBeenCalledWith(
      " ",
      expect.any(Number),
      expect.any(Number),
    );
    expect(ctx.fillText).toHaveBeenCalledWith(
      "World",
      expect.any(Number),
      expect.any(Number),
    );
  });

  it("should render background and border", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "Bg" },
      style: {
        backgroundColor: "yellow",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
      },
    });

    const ctx = document.createElement("canvas").getContext("2d")!;
    text.render(ctx);

    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.arcTo).toHaveBeenCalled();
  });

  it("should not render if invisible", () => {
    const text = new Text({
      shape: { x: 0, y: 0, text: "Invisible" },
      invisible: true,
    });
    const ctx = document.createElement("canvas").getContext("2d")!;
    text.render(ctx);
    expect(ctx.save).not.toHaveBeenCalled();
  });
});
