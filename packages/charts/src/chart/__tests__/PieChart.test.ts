import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import PieChart from '../PieChart';
import { ChartOption } from '../../types';

const mockContext = {
  measureText: (text: string) => ({ width: text.length * 10 }),
  fillText: vi.fn(),
  strokeText: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  scale: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  closePath: vi.fn(),
  rect: vi.fn(),
  arc: vi.fn(),
  clip: vi.fn(),
  setLineDash: vi.fn(),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
  clearRect: vi.fn(),
  setTransform: vi.fn(),
  font: '',
} as unknown as CanvasRenderingContext2D;

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => mockContext,
    writable: true
  });
});

if (!window.requestAnimationFrame) {
  vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 16));
}
if (!window.cancelAnimationFrame) {
  vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));
}
vi.stubGlobal('devicePixelRatio', 1);

describe('PieChart', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
  });

  it('should initialize correctly', () => {
    const chart = new PieChart(container);
    expect(chart).toBeDefined();
  });

  it('should support roseType', () => {
    const chart = new PieChart(container);
    const option: ChartOption = {
      animation: false, // Disable animation to get final values immediately
      series: [
        {
          type: 'pie',
          roseType: 'radius',
          data: [
            { name: 'A', value: 10 },
            { name: 'B', value: 20 }
          ]
        }
      ]
    };
    chart.setOption(option);
    
    const activeSectors = (chart as any)._activeSectors;
    expect(activeSectors.size).toBe(2);
    
    // In rose chart, angles should be equal (total 360 / 2 = 180 deg per sector)
    const sectors = Array.from(activeSectors.values()) as any[];
    const angle1 = sectors[0].shape.endAngle - sectors[0].shape.startAngle;
    const angle2 = sectors[1].shape.endAngle - sectors[1].shape.startAngle;
    
    expect(Math.abs(angle1 - angle2)).toBeLessThan(0.001);
    expect(Math.abs(angle1 - Math.PI)).toBeLessThan(0.001);
  });
});
