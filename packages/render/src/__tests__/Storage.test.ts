import { describe, it, expect } from 'vitest';
import Storage from '../Storage';
import Group from '../Group';
import ChartElement from '../ChartElement';

class Box extends ChartElement {
  getBoundingRect() {
    return { x: 0, y: 0, width: 10, height: 10 };
  }
}

describe('Storage', () => {
  it('should add and remove roots idempotently', () => {
    const storage = new Storage();
    const root = new Group();

    storage.addRoot(root);
    storage.addRoot(root);
    expect(storage.getRoots().length).toBe(1);
    expect(storage.getElementById(root.id)).toBe(root);

    storage.removeRoot(root);
    storage.removeRoot(root);
    expect(storage.getRoots().length).toBe(0);
    expect(storage.getElementById(root.id)).toBeUndefined();
  });

  it('should keep element map in sync for groups', () => {
    const storage = new Storage();
    const group = new Group();
    const child = new Box();
    group.add(child);

    storage.updateElement(group);
    expect(storage.getElementById(group.id)).toBe(group);
    expect(storage.getElementById(child.id)).toBe(child);

    storage.removeElement(group);
    expect(storage.getElementById(group.id)).toBeUndefined();
    expect(storage.getElementById(child.id)).toBeUndefined();
  });

  it('should iterate elements and support early exit', () => {
    const storage = new Storage();
    const root = new Group({ id: 'root' });
    const a = new Box({ id: 'a' });
    const b = new Box({ id: 'b' });
    root.add(a);
    root.add(b);
    storage.addRoot(root);

    const visited: string[] = [];
    storage.iterate((el) => {
      visited.push(el.id);
    });
    expect(visited).toEqual(['a', 'b']);

    const visitedWithRoot: string[] = [];
    storage.iterate((el) => {
      visitedWithRoot.push(el.id);
    }, true);
    expect(visitedWithRoot).toEqual(['root', 'a', 'b']);

    const early: string[] = [];
    const returned = storage.iterate((el) => {
      early.push(el.id);
      return 'stop';
    });
    expect(returned).toBeUndefined();
    expect(early).toEqual(['a']);

    const returnedFromRoot = storage.iterate((el) => {
      if (el.id === 'root') return 'found';
    }, true);
    expect(returnedFromRoot).toBe('found');
  });

  it('should return elements list sorted by zlevel and z', () => {
    const storage = new Storage();
    const r1 = new Group({ id: 'r1', zlevel: 1, z: 10 });
    const r2 = new Group({ id: 'r2', zlevel: 0, z: 99 });
    const r3 = new Group({ id: 'r3', zlevel: 1, z: 0 });
    storage.addRoot(r1);
    storage.addRoot(r2);
    storage.addRoot(r3);

    expect(storage.getElementsList().map((r) => r.id)).toEqual(['r2', 'r3', 'r1']);
  });

  it('should build display list and optionally include invisible elements', () => {
    const storage = new Storage();
    const root = new Group({ id: 'root' });
    root.silent = true;
    const visible = new Box({ id: 'visible' });
    const invisible = new Box({ id: 'invisible' });
    invisible.invisible = true;
    root.add(visible);
    root.add(invisible);
    storage.addRoot(root);

    expect(storage.getDisplayList().map((e) => e.id)).toEqual(['root', 'visible']);
    expect(storage.getDisplayList(true).map((e) => e.id)).toEqual([
      'root',
      'visible',
      'invisible',
    ]);
  });

  it('should clear all elements', () => {
    const storage = new Storage();
    storage.addRoot(new Group());
    expect(storage.getRoots().length).toBe(1);
    storage.clear();
    expect(storage.getRoots().length).toBe(0);
  });
});
