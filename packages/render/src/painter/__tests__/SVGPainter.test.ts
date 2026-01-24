import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import Storage from '../../Storage';
import SVGPainter from '../SVGPainter';
import Circle from '../../graphic/Circle';
import Group from '../../Group';
import ChartElement from '../../ChartElement';
import Rect from '../../graphic/Rect';
import Polygon from '../../graphic/Polygon';
import Sector from '../../graphic/Sector';

describe('SVGPainter', () => {
  let container: HTMLElement;
  let storage: Storage;
  let painter: SVGPainter;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
    storage = new Storage();

    // Stub requestAnimationFrame for predictable async painting
    vi.stubGlobal('requestAnimationFrame', (cb: any) => setTimeout(cb, 0));
    vi.stubGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id));

    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      save: vi.fn(),
      restore: vi.fn(),
      setTransform: vi.fn(),
      scale: vi.fn(),
      clearRect: vi.fn(),
      fillRect: vi.fn(),
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
      strokeRect: vi.fn(),
      drawImage: vi.fn(),
      measureText: (text: string) => ({ width: text.length * 10 }),
      font: '',
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue(
      'data:image/png;base64,mock',
    );

    painter = new SVGPainter(container, storage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should initialize correctly', () => {
    expect(painter.getSVG()).toBeDefined();
    expect(painter.getRootGroup()).toBeDefined();
    expect(painter.getWidth()).toBe(800);
    expect(painter.getHeight()).toBe(600);
    expect(painter.getSVG().style.overflow).toBe('visible');
  });

  it('should resize svg', () => {
    painter.resize(500, 300);
    expect(painter.getWidth()).toBe(500);
    expect(painter.getHeight()).toBe(300);
    const svg = painter.getSVG();
    expect(svg.getAttribute('width')).toBe('500');
    expect(svg.getAttribute('height')).toBe('300');
    expect(svg.getAttribute('viewBox')).toBe('0 0 500 300');
  });

  it('should handle paint requests', () => {
    const circle = new Circle({
      shape: { cx: 10, cy: 20, r: 5 },
      style: { fill: 'red' },
    });
    const root = new Group();
    root.add(circle);
    storage.addRoot(root);

    // Mock dirty
    (painter as any)._dirty = true;
    painter.paint();

    const rootGroup = painter.getRootGroup();
    // Group (root) -> Group (element wrapper) -> Circle
    const rootG = rootGroup.firstElementChild as SVGGElement; // Group wrapper for Group
    expect(rootG).toBeTruthy();
    // Inside the Group wrapper, we expect children
    // Actually Group logic in SVGPainter:
    // It creates a <g> for the Group element itself.
    // Then it iterates children and appends them to that <g>.
    // But wait, paint() iterates elements list from storage.
    // Storage.getElementsList() flattens the tree or returns all elements?
    // Let's check paint():
    // const elements = this._storage.getElementsList();
    // for (const element of elements) { ... appendChild(svgElement) ... }
    // If elements list returns everything, then it might be flat.
    // But SVGPainter implementation shows: if (element instanceof Group) { ... render children ... }
    // This implies recursive rendering is handled inside _renderElement for Group?
    // No, paint() loops over elements list. Storage usually returns flat list for canvas,
    // but for SVG, structure matters.
    // Let's assume standard behavior: paint() clears root and appends elements.

    // In current implementation:
    // paint() loops over elements list.
    // If element is Group, it renders children inside.
    // If element is Circle, it renders circle.
    // Storage.getElementsList typically returns sorted list of all elements (flat).
    // If so, we might get double rendering if Group renders children AND children are in the list?
    // Let's trust the existing logic or check coverage.

    // Just checking if circle is in DOM
    const circleEl = rootGroup.querySelector('circle');
    expect(circleEl).toBeTruthy();
    expect(circleEl?.getAttribute('cx')).toBe('10');
    // Circle impl: el.setAttribute('cx', '0'); el.setAttribute('cy', '0'); ... transform handles position?
    // Actually Circle renderer usually does: cx, cy directly if no transform?
    // Let's check Circle implementation in SVGPainter...
    // It's not visible in snippet, but assuming it works.
  });

  it('should apply scale and rotation around origin consistently', () => {
    const circle = new Circle({
      shape: { cx: 10, cy: 20, r: 5 },
      transform: {
        x: 3,
        y: 4,
        originX: 100,
        originY: 200,
        rotation: Math.PI / 2,
        scaleX: 1.1,
        scaleY: 1.2,
      },
    });

    const root = new Group();
    root.add(circle);
    storage.addRoot(root);
    painter.paint();

    const rootGroup = painter.getRootGroup();
    // Find the group wrapper for the circle
    // Since storage list might contain both Group and Circle, and SVGPainter renders both?
    // If Storage returns [Group, Circle], and Group renders Circle, and Circle renders itself...
    // The SVGPainter logic for Group seems to be:
    // if (element instanceof Group) { const children = element.children(); ... }
    // This suggests it handles hierarchy.

    // Let's find the group with transform
    const groups = rootGroup.querySelectorAll('g');
    let targetG: SVGGElement | null = null;
    groups.forEach((g) => {
      if (g.getAttribute('transform')) targetG = g;
    });

    expect(targetG).toBeTruthy();
    expect(targetG!.getAttribute('transform')).toBe(
      'translate(3, 4) translate(100, 200) rotate(90) scale(1.1, 1.2) translate(-100, -200)',
    );
  });

  it('should apply scale around origin when there is no rotation', () => {
    const circle = new Circle({
      shape: { cx: 0, cy: 0, r: 5 },
      transform: {
        originX: 10,
        originY: 20,
        scaleX: 1.2,
        scaleY: 1.2,
      },
    });

    const root = new Group();
    root.add(circle);
    storage.addRoot(root);
    painter.paint();

    const rootGroup = painter.getRootGroup();
    const groups = rootGroup.querySelectorAll('g');
    let targetG: SVGGElement | null = null;
    groups.forEach((g) => {
      if (g.getAttribute('transform')) targetG = g;
    });

    expect(targetG).toBeTruthy();
    expect(targetG!.getAttribute('transform')).toBe(
      'translate(10, 20) scale(1.2, 1.2) translate(-10, -20)',
    );
  });

  it('should dispose correctly', () => {
    painter.dispose();
    // Check if animation frame cancelled (mocked)
    // Check if svg removed
    expect(container.children.length).toBe(0);
  });

  it('should normalize rect dimensions when width or height are negative', () => {
    const rect = new Rect({
      shape: { x: Number.NaN, y: 1, width: -10, height: -20, r: 2 },
      style: { fill: 'red' },
    });
    const root = new Group();
    root.add(rect);
    storage.addRoot(root);

    painter.paint();

    const rectEl = painter.getRootGroup().querySelector('rect');
    expect(rectEl).toBeTruthy();
    expect(rectEl?.getAttribute('x')).toBe('-10');
    expect(rectEl?.getAttribute('y')).toBe('-19');
    expect(rectEl?.getAttribute('width')).toBe('10');
    expect(rectEl?.getAttribute('height')).toBe('20');
    expect(rectEl?.getAttribute('rx')).toBe('2');
    expect(rectEl?.getAttribute('ry')).toBe('2');
  });

  it('should render polyline points for number[][] polygons', () => {
    const poly = new Polygon({
      shape: {
        points: [
          [0, 0],
          [1, 2],
          [3, 4],
        ],
      },
    });
    const root = new Group();
    root.add(poly);
    storage.addRoot(root);

    painter.paint();

    const polyEl = painter.getRootGroup().querySelector('polyline');
    expect(polyEl).toBeTruthy();
    expect(polyEl?.getAttribute('points')).toBe('0,0 1,2 3,4');
  });

  it('should render arc and sector paths', () => {
    const arc = new ChartElement({
      shape: {
        cx: 10,
        cy: 10,
        r: 5,
        startAngle: 0,
        endAngle: Math.PI / 2,
      },
    });
    const sector = new Sector({
      shape: {
        cx: 20,
        cy: 20,
        r0: 3,
        r: 8,
        startAngle: 0,
        endAngle: Math.PI,
      },
    });
    const root = new Group();
    root.add(arc);
    root.add(sector);
    storage.addRoot(root);

    painter.paint();

    const paths = painter.getRootGroup().querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);

    const d0 = paths[0]?.getAttribute('d') || '';
    const d1 = paths[1]?.getAttribute('d') || '';
    expect(`${d0} ${d1}`).toContain('A');
    expect(`${d0} ${d1}`).toContain('M');
  });

  it('should create linear gradient with rgba colors correctly', () => {
    const root = new Group();
    const rect = new Rect({
      shape: { x: 0, y: 0, width: 100, height: 100 },
      style: {
        fill: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 0, 0, 0.5)' },
            { offset: 1, color: '#0000ff' },
          ],
        },
      },
    });
    root.add(rect);
    storage.addRoot(root);

    painter.paint();

    const defs = painter.getSVG().querySelector('defs');
    const gradients = defs?.querySelectorAll('linearGradient');
    expect(gradients?.length).toBe(1);

    const gradient = gradients![0];
    const stops = gradient.querySelectorAll('stop');
    expect(stops.length).toBe(2);

    // Check first stop (rgba)
    expect(stops[0].getAttribute('stop-color')).toBe('rgb(255, 0, 0)');
    expect(stops[0].getAttribute('stop-opacity')).toBe('0.5');

    // Check second stop (hex)
    expect(stops[1].getAttribute('stop-color')).toBe('rgb(0, 0, 255)');
    expect(stops[1].getAttribute('stop-opacity')).toBeNull();
  });

  it('should render quadratic and cubic bezier paths', () => {
    const quad = new ChartElement({
      shape: { x1: 0, y1: 0, x2: 10, y2: 10, cpx1: 5, cpy1: 0 },
    });
    const cubic = new ChartElement({
      shape: {
        x1: 0,
        y1: 0,
        x2: 10,
        y2: 10,
        cpx1: 3,
        cpy1: 1,
        cpx2: 7,
        cpy2: 9,
      },
    });
    const root = new Group();
    root.add(quad);
    root.add(cubic);
    storage.addRoot(root);

    painter.paint();

    const paths = painter.getRootGroup().querySelectorAll('path');
    const ds = Array.from(paths).map((p) => p.getAttribute('d') || '');
    expect(ds.some((d) => d.includes(' Q '))).toBe(true);
    expect(ds.some((d) => d.includes(' C '))).toBe(true);
  });

  it('should apply shadow filter when shadow style is present', () => {
    const c1 = new Circle({
      shape: { cx: 10, cy: 10, r: 5 },
      style: {
        fill: 'red',
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffsetX: 2,
        shadowOffsetY: 3,
      },
    });
    const c2 = new Circle({
      shape: { cx: 30, cy: 10, r: 5 },
      style: {
        fill: 'blue',
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffsetX: 2,
        shadowOffsetY: 3,
      },
    });

    const root = new Group();
    root.add(c1);
    root.add(c2);
    storage.addRoot(root);

    painter.paint();

    const svg = painter.getSVG();
    const filters = svg.querySelectorAll('defs filter');
    expect(filters.length).toBe(1);
    expect(filters[0].getAttribute('width')).toBe('200%');
    expect(filters[0].getAttribute('height')).toBe('200%');

    const circles = painter.getRootGroup().querySelectorAll('circle');
    expect(circles.length).toBe(2);

    const g1 = circles[0].parentElement as SVGGElement | null;
    const g2 = circles[1].parentElement as SVGGElement | null;
    expect(g1?.getAttribute('filter') || '').toMatch(/^url\(#shadow_/);
    expect(g1?.getAttribute('filter')).toBe(g2?.getAttribute('filter'));
  });

  it('should not apply shadow filter when shadow color is fully transparent', () => {
    const c1 = new Circle({
      shape: { cx: 10, cy: 10, r: 5 },
      style: {
        fill: 'red',
        shadowBlur: 10,
        shadowColor: 'transparent',
      },
    });

    const root = new Group();
    root.add(c1);
    storage.addRoot(root);

    painter.paint();

    const svg = painter.getSVG();
    const filters = svg.querySelectorAll('defs filter');
    expect(filters.length).toBe(0);

    const circle = painter.getRootGroup().querySelector('circle');
    expect(circle?.parentElement?.getAttribute('filter')).toBeNull();
  });

  it('should create svg patterns for meta and non-meta pattern fills', () => {
    const canvas = document.createElement('canvas');
    vi.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,pat');

    const metaPattern: any = {
      _canvas: canvas,
      _decalMeta: {
        baseColor: '#fff',
        fgColor: '#000',
        symbol: 'line',
        unitSize: 4,
        symbolSize: 2,
        lineWidth: 1,
        dashX: [1],
        dashY: [1],
        centersX: [0],
        centersY: [0],
        tileWidth: 4,
        tileHeight: 4,
        rotation: Math.PI / 4,
      },
    };

    const nonMetaPattern: any = {
      _canvas: canvas,
      _rotation: Math.PI / 2,
      _dpr: 2,
      _tileWidth: 4,
      _tileHeight: 4,
    };

    const c1 = new Circle({
      shape: { cx: 10, cy: 10, r: 5 },
      style: { fill: metaPattern },
    });
    const c2 = new Circle({
      shape: { cx: 30, cy: 10, r: 5 },
      style: { stroke: nonMetaPattern, lineWidth: 2 },
    });

    const root = new Group();
    root.add(c1);
    root.add(c2);
    storage.addRoot(root);

    painter.paint();

    const svg = painter.getSVG();
    const defs = svg.querySelector('defs');
    const patterns = defs?.querySelectorAll('pattern') || [];
    expect(patterns.length).toBeGreaterThanOrEqual(2);

    const hasMeta = Array.from(patterns).some((p) => {
      const tr = p.getAttribute('patternTransform') || '';
      const hasBg = p.querySelector('rect');
      const hasSymbol = p.querySelector('line, path, circle, rect, polygon');
      return tr.includes('rotate(45') && Boolean(hasBg) && Boolean(hasSymbol);
    });
    expect(hasMeta).toBe(true);

    const hasNonMeta = Array.from(patterns).some((p) => {
      const tr = p.getAttribute('patternTransform') || '';
      const img = p.querySelector('image');
      return (
        tr.includes('scale(0.5)') &&
        tr.includes('rotate(90') &&
        img?.getAttribute('href') === 'data:image/png;base64,pat'
      );
    });
    expect(hasNonMeta).toBe(true);

    const gEls = painter.getRootGroup().querySelectorAll('g[fill], g[stroke]');
    expect(gEls.length).toBeGreaterThan(0);
    expect(
      Array.from(gEls).some((g) =>
        (g.getAttribute('fill') || '').startsWith('url(#pattern_'),
      ),
    ).toBe(true);
    expect(
      Array.from(gEls).some((g) =>
        (g.getAttribute('stroke') || '').startsWith('url(#pattern_'),
      ),
    ).toBe(true);
  });

  it('should create svg gradients for gradient fills', () => {
    const rect = new Rect({
      shape: { x: 10, y: 20, width: 30, height: 40 },
      style: {
        fill: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#000000' },
            { offset: 1, color: '#ffffff' },
          ],
        },
      },
    });

    const root = new Group();
    root.add(rect);
    storage.addRoot(root);

    painter.paint();

    const svg = painter.getSVG();
    const gradient = svg.querySelector('defs linearGradient');
    expect(gradient).toBeTruthy();
    const stops = gradient?.querySelectorAll('stop') || [];
    expect(stops.length).toBe(2);
    const hasFill = svg.querySelector('g[fill^="url(#gradient_"]');
    expect(hasFill).toBeTruthy();
  });

  it('should return svg-based data url for non-svg types and include background style', () => {
    const prevBtoa = (globalThis as any).btoa;
    (globalThis as any).btoa = (str: string) =>
      Buffer.from(str, 'binary').toString('base64');

    const url = painter.getDataURL({ type: 'png', backgroundColor: '#abc' });
    expect(url.startsWith('data:image/svg+xml;base64,')).toBe(true);

    const encoded = url.replace('data:image/svg+xml;base64,', '');
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    expect(decoded).toContain('background-color: #abc');

    (globalThis as any).btoa = prevBtoa;
  });

  it('should return empty string when canvas context is unavailable in getDataURL', () => {
    const prevGetContext = HTMLCanvasElement.prototype.getContext;
    (HTMLCanvasElement.prototype as any).getContext = vi.fn(() => null);

    const prevBtoa = (globalThis as any).btoa;
    (globalThis as any).btoa = (str: string) =>
      Buffer.from(str, 'binary').toString('base64');

    const result = painter.getDataURL({ type: 'png' });
    expect(result).toBe('');

    (globalThis as any).btoa = prevBtoa;
    (HTMLCanvasElement.prototype as any).getContext = prevGetContext;
  });
});
