import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  beforeAll(() => {
    // Mock requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      return setTimeout(callback, 0);
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      clearTimeout(id);
    });
  });

  it('should initialize correctly', () => {
    const tooltip = new Tooltip();
    expect(tooltip.isVisible()).toBe(false);
  });

  it('should show content correctly', () => {
    const tooltip = new Tooltip();
    const container = document.createElement('div');
    // Mock getComputedStyle for container
    container.style.position = 'relative';
    tooltip.setContainer(container);

    tooltip.show(100, 100, 'Test Content');

    expect(tooltip.isVisible()).toBe(true);

    // Verify DOM element existence and styles
    const el = (tooltip as any)._el as HTMLElement;
    expect(el).toBeDefined();
    expect(el.style.display).toBe('block');
    // Check content
    expect(el.innerHTML).toBe('Test Content');
    // Check position (default offset 15)
    // left = 100 + 15 = 115
    // But it depends on container rect. Mock container rect?
    // In happy-dom/jsdom, getBoundingClientRect usually returns 0,0,0,0 unless mocked.
  });

  it('should handle positioning logic (confine)', () => {
    const tooltip = new Tooltip({ confine: true });
    const container = document.createElement('div');

    // Mock container size
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 100,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => { }
    });

    tooltip.setContainer(container);

    // Mock tooltip element size
    const el = (tooltip as any)._el as HTMLElement;
    vi.spyOn(el, 'offsetWidth', 'get').mockReturnValue(50);
    vi.spyOn(el, 'offsetHeight', 'get').mockReturnValue(20);

    // Try to show at right edge (90, 50). Tooltip width 50.
    // 90 + 15 (offset) + 50 = 155 > 100 (container width)
    // Should flip left?
    // Logic in Tooltip.ts:
    // if (left + elWidth > viewWidth) left = x - elWidth - 15;

    tooltip.show(90, 50, 'Long Content');

    const leftStyle = parseFloat(el.style.left);
    // Expected: 90 - 50 - 15 = 25
    expect(leftStyle).toBe(25);
  });

  it('should optimize rendering when content is same', () => {
    const tooltip = new Tooltip();
    const container = document.createElement('div');
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 600,
      left: 0,
      top: 0,
      right: 800,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: () => { }
    });
    tooltip.setContainer(container);

    // First show
    tooltip.show(100, 100, 'Same Content');
    const el = (tooltip as any)._el as HTMLElement;
    const initialHTML = el.innerHTML;

    // Second show with same content, different position
    tooltip.show(200, 200, 'Same Content');

    // HTML should remain same (optimization check logic isn't explicitly exposed but we can verify behavior)
    expect(el.innerHTML).toBe(initialHTML);

    const left = parseFloat(el.style.left);
    const top = parseFloat(el.style.top);

    // 200 + 15 = 215
    expect(left).toBe(215);
    expect(top).toBe(215);
  });

  it('should hide correctly', () => {
    const tooltip = new Tooltip();
    const container = document.createElement('div');
    tooltip.setContainer(container);

    tooltip.show(100, 100, 'Test');
    expect(tooltip.isVisible()).toBe(true);

    tooltip.hide();
    expect(tooltip.isVisible()).toBe(false);
  });
});
