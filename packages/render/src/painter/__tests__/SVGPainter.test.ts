import { describe, it, expect, beforeEach } from 'vitest';
import Storage from '../../Storage';
import SVGPainter from '../SVGPainter';
import Circle from '../../graphic/Circle';
import Group from '../../Group';

describe('SVGPainter', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 600 });
  });

  it('should apply scale and rotation around origin consistently', () => {
    const storage = new Storage();
    const painter = new SVGPainter(container, storage);

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
    const rootG = rootGroup.firstElementChild as SVGGElement;
    const g = rootG?.firstElementChild as SVGGElement;
    expect(g).toBeTruthy();
    expect(g.getAttribute('transform')).toBe(
      'translate(3, 4) translate(100, 200) rotate(90) scale(1.1, 1.2) translate(-100, -200)',
    );
  });

  it('should apply scale around origin when there is no rotation', () => {
    const storage = new Storage();
    const painter = new SVGPainter(container, storage);

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
    const rootG = rootGroup.firstElementChild as SVGGElement;
    const g = rootG?.firstElementChild as SVGGElement;
    expect(g).toBeTruthy();
    expect(g.getAttribute('transform')).toBe(
      'translate(10, 20) scale(1.2, 1.2) translate(-10, -20)',
    );
  });
});
