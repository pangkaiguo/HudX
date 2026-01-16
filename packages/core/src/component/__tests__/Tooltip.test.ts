import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Tooltip, { TooltipOption } from "../Tooltip";

describe("Tooltip", () => {
  let container: HTMLElement;
  let tooltip: Tooltip;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    container.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 500,
      height: 500,
      right: 500,
      bottom: 500,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  afterEach(() => {
    if (tooltip) {
      tooltip.dispose();
    }
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  it("should initialize with default options", () => {
    tooltip = new Tooltip();
    const el = (tooltip as any)._el as HTMLElement;
    expect(el).toBeDefined();
    expect(el.style.position).toBe("absolute");
    expect(el.style.display).toBe("none");
    expect(el.style.backgroundColor).toBe("rgba(50, 50, 50, 0.7)");
  });

  it("should apply custom styling options", () => {
    const options: TooltipOption = {
      backgroundColor: "#ff0000",
      borderColor: "#00ff00",
      borderWidth: 2,
      padding: [10, 20],
      textStyle: {
        color: "#0000ff",
        fontSize: 16,
        fontFamily: "Arial",
      },
      className: "custom-tooltip",
      extraCssText: "box-shadow: none;",
    };

    tooltip = new Tooltip(options);
    const el = (tooltip as any)._el as HTMLElement;

    expect(el.style.backgroundColor).toBe("#ff0000");
    expect(el.style.borderColor).toBe("#00ff00");
    expect(el.style.borderWidth).toBe("2px");
    expect(el.style.padding).toBe("10px 20px");
    expect(el.style.color).toBe("#0000ff");
    expect(el.style.fontSize).toBe("16px");
    expect(el.style.fontFamily).toBe("Arial");
    expect(el.className).toBe("custom-tooltip");
    expect(el.style.boxShadow).toBe("none");
  });

  it("should update styling via setOption", () => {
    tooltip = new Tooltip();
    const el = (tooltip as any)._el as HTMLElement;

    tooltip.setOption({
      backgroundColor: "#000000",
    });

    expect(el.style.backgroundColor).toBe("#000000");
  });

  it("should handle showContent option", () => {
    tooltip = new Tooltip({ showContent: false });
    tooltip.setContainer(container);
    vi.useFakeTimers();

    tooltip.show(100, 100, "Content");
    vi.runAllTimers();

    expect(tooltip.isVisible()).toBe(false);

    tooltip.setOption({ showContent: true });
    tooltip.show(100, 100, "Content");
    vi.runAllTimers();
    expect(tooltip.isVisible()).toBe(true);

    vi.useRealTimers();
  });

  it("should handle showDelay and hideDelay", () => {
    tooltip = new Tooltip({
      showDelay: 100,
      hideDelay: 200,
    });
    tooltip.setContainer(container);
    vi.useFakeTimers();

    tooltip.show(100, 100, "Content");
    expect(tooltip.isVisible()).toBe(false);

    vi.advanceTimersByTime(50);
    expect(tooltip.isVisible()).toBe(false);

    vi.advanceTimersByTime(60);
    expect(tooltip.isVisible()).toBe(true);

    tooltip.hide();
    expect(tooltip.isVisible()).toBe(true);

    vi.advanceTimersByTime(100);
    expect(tooltip.isVisible()).toBe(true);

    vi.advanceTimersByTime(110);
    expect(tooltip.isVisible()).toBe(false);

    vi.useRealTimers();
  });

  it("should apply transitionDuration", () => {
    tooltip = new Tooltip({
      transitionDuration: 0.5,
    });
    const el = (tooltip as any)._el as HTMLElement;
    expect(el.style.transition).toContain("0.5s");
  });

  it("should show and hide content", () => {
    tooltip = new Tooltip();
    tooltip.setContainer(container);

    vi.useFakeTimers();

    tooltip.show(100, 100, "Test Content");
    vi.runAllTimers();

    const el = (tooltip as any)._el as HTMLElement;
    expect(el.style.display).toBe("block"); // show sets display block then visibility visible
    expect(el.style.visibility).toBe("visible");
    expect(el.innerHTML).toBe("Test Content");
    expect(tooltip.isVisible()).toBe(true);

    tooltip.hide();
    expect(el.style.display).toBe("none");
    expect(tooltip.isVisible()).toBe(false);

    vi.useRealTimers();
  });

  it("should handle positioning", () => {
    tooltip = new Tooltip();
    tooltip.setContainer(container);
    vi.useFakeTimers();

    const el = (tooltip as any)._el as HTMLElement;
    Object.defineProperty(el, "offsetWidth", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(el, "offsetHeight", {
      configurable: true,
      value: 50,
    });

    tooltip.show(100, 100, "Content");
    vi.runAllTimers();

    expect(el.style.left).toBe("115px");
    expect(el.style.top).toBe("115px");

    vi.useRealTimers();
  });

  it("should support custom position function", () => {
    tooltip = new Tooltip({
      position: (point) => {
        return [point[0] + 50, point[1] + 50];
      },
    });
    tooltip.setContainer(container);
    vi.useFakeTimers();

    tooltip.show(100, 100, "Content");
    vi.runAllTimers();

    const el = (tooltip as any)._el as HTMLElement;
    expect(el.style.left).toBe("150px");
    expect(el.style.top).toBe("150px");

    vi.useRealTimers();
  });

  it("should confine tooltip within container", () => {
    tooltip = new Tooltip({
      confine: true,
    });
    tooltip.setContainer(container);
    vi.useFakeTimers();

    const el = (tooltip as any)._el as HTMLElement;
    Object.defineProperty(el, "offsetWidth", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(el, "offsetHeight", {
      configurable: true,
      value: 50,
    });

    tooltip.show(450, 100, "Content");
    vi.runAllTimers();

    expect(el.style.left).toBe("335px");

    vi.useRealTimers();
  });

  it("should handle enterable option (pointer-events)", () => {
    tooltip = new Tooltip({ enterable: true });
    const el = (tooltip as any)._el as HTMLElement;
    expect(el.style.pointerEvents).toBe("auto");

    tooltip.setOption({ enterable: false });
    expect(el.style.pointerEvents).toBe("none");
  });

  it("should append to body if configured", () => {
    tooltip = new Tooltip({ appendToBody: true });
    tooltip.setContainer(container);

    const el = (tooltip as any)._el as HTMLElement;
    expect(el.parentNode).toBe(document.body);
  });
});
