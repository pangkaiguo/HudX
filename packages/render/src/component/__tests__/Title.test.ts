import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from 'vitest';
import Title from '../Title';
import Rect from '../../graphic/Rect';
import Text from '../../graphic/Text';

describe('Title', () => {
  beforeAll(() => {
    const mockContext = {
      measureText: vi.fn((text: string) => ({ width: text.length * 10 })),
      font: '',
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
      globalAlpha: 1,
      shadowColor: '',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      fillStyle: '#000',
      strokeStyle: '#000',
      lineWidth: 1,
    } as unknown as CanvasRenderingContext2D;

    const mockCanvas = {
      getContext: vi.fn().mockReturnValue(mockContext),
      width: 0,
      height: 0,
      toDataURL: vi.fn(),
    } as unknown as HTMLCanvasElement;

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(
      (tag: string, options?: any) => {
        if (tag === 'canvas') return mockCanvas;
        return originalCreateElement(tag, options);
      },
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render only background when no text provided', () => {
    const title = new Title();
    title.setContainer(200, 100);

    const children = title.children();
    expect(children.length).toBe(1);
    expect(children[0]).toBeInstanceOf(Rect);
    expect((children[0] as any).shape).toMatchObject({
      x: 0,
      y: 0,
      width: 10,
      height: 10,
    });
  });

  it('should not render when show is false', () => {
    const title = new Title({ show: false, text: 'Hello' });
    title.setContainer(200, 100);
    expect(title.childrenCount()).toBe(0);
  });

  it('should position and align text and subtext', () => {
    const title = new Title({
      text: 'Hello',
      subtext: 'Sub',
      left: 'center',
      top: 'middle',
      padding: [2, 4],
      itemGap: 3,
      textStyle: { fontSize: 10 },
      subtextStyle: { fontSize: 8 },
    });

    title.setContainer(200, 100);
    const children = title.children();

    const bg = children.find((c) => c instanceof Rect) as Rect | undefined;
    expect(bg).toBeDefined();
    expect((bg as any).shape.x).toBeCloseTo(71, 3);
    expect((bg as any).shape.y).toBeCloseTo(37.5, 3);
    expect((bg as any).shape.width).toBeCloseTo(58, 3);
    expect((bg as any).shape.height).toBeCloseTo(25, 3);

    const texts = children.filter((c) => c instanceof Text) as Text[];
    expect(texts.length).toBe(2);

    const main = texts.find((t) => t.shape.text === 'Hello')!;
    const sub = texts.find((t) => t.shape.text === 'Sub')!;

    expect(main.shape.x).toBeCloseTo(75, 3);
    expect(main.shape.y).toBeCloseTo(39.5, 3);
    expect(sub.shape.x).toBeCloseTo(85, 3);
    expect(sub.shape.y).toBeCloseTo(52.5, 3);
  });

  it('should rerender on updateOption', () => {
    const title = new Title({
      text: 'Hello',
      subtext: 'Sub',
      left: 'center',
      top: 'middle',
      padding: [2, 4],
      itemGap: 3,
      textStyle: { fontSize: 10 },
      subtextStyle: { fontSize: 8 },
    });

    title.setContainer(200, 100);
    const beforeMainX = (
      title.children().find((c) => c instanceof Text) as Text
    ).shape.x;

    title.updateOption({ left: 'right', right: 10 });
    const afterMainX = (title.children().find((c) => c instanceof Text) as Text)
      .shape.x;

    expect(afterMainX).toBeGreaterThan(beforeMainX);
  });
});
