import { describe, it, expect } from 'vitest';
import Group from '../Group';
import Rect from '../shape/Rect';

describe('Group', () => {
  it('should add and remove children', () => {
    const group = new Group();
    const rect = new Rect();

    group.add(rect);
    expect(group.children().length).toBe(1);
    expect((rect as any).__parent).toBe(group);

    group.remove(rect);
    expect(group.children().length).toBe(0);
    expect((rect as any).__parent).toBeUndefined();
  });

  it('should remove all children', () => {
    const group = new Group();
    group.add(new Rect());
    group.add(new Rect());

    expect(group.children().length).toBe(2);

    group.removeAll();
    expect(group.children().length).toBe(0);
  });
});
