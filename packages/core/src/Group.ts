/**
 * Group - Container for multiple elements
 */

import ChartElement from "./ChartElement";
import type { ElementOption } from "./types";

export default class Group extends ChartElement {
  private _children: ChartElement[] = [];

  constructor(opts: ElementOption = {}) {
    super(opts);
  }

  /**
   * Add child element
   */
  add(child: ChartElement): this {
    if (child === this) {
      return this;
    }

    // Remove from previous parent if exists
    const childRecord = child as unknown as Record<string, unknown>;
    if (childRecord.__parent) {
      (childRecord.__parent as any).remove(child);
    }

    this._children.push(child);
    childRecord.__parent = this;
    this.markRedraw();
    return this;
  }

  /**
   * Remove child element
   */
  remove(child: ChartElement): this {
    const index = this._children.indexOf(child);
    if (index >= 0) {
      this._children.splice(index, 1);
      delete (child as unknown as Record<string, unknown>).__parent;
      this.markRedraw();
    }
    return this;
  }

  /**
   * Remove all children
   */
  removeAll(): this {
    for (const child of this._children) {
      delete (child as unknown as Record<string, unknown>).__parent;
    }
    this._children = [];
    this.markRedraw();
    return this;
  }

  /**
   * Get child at index
   */
  childAt(index: number): ChartElement | undefined {
    return this._children[index];
  }

  /**
   * Get child by ID
   */
  childOfName(name: string): ChartElement | undefined {
    return this._children.find((child) => child.id === name);
  }

  /**
   * Get all children
   */
  children(): ChartElement[] {
    return [...this._children];
  }

  /**
   * Get children count
   */
  childrenCount(): number {
    return this._children.length;
  }

  /**
   * Traverse children
   */
  traverse(
    callback: (child: ChartElement) => void | boolean,
    includeSelf: boolean = false,
  ): void {
    if (includeSelf) {
      const result = callback(this);
      if (result === false) {
        return;
      }
    }

    for (const child of this._children) {
      if (child instanceof Group) {
        child.traverse(callback, true);
      } else {
        const result = callback(child);
        if (result === false) {
          return;
        }
      }
    }
  }

  /**
   * Get bounding rect (union of all children)
   */
  getBoundingRect(): import("./types").BoundingRect {
    if (this._children.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const child of this._children) {
      const rect = child.getBoundingRect();
      minX = Math.min(minX, rect.x);
      minY = Math.min(minY, rect.y);
      maxX = Math.max(maxX, rect.x + rect.width);
      maxY = Math.max(maxY, rect.y + rect.height);
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  /**
   * Check if point is inside group
   */
  contain(x: number, y: number): boolean {
    // Check children in reverse order (top to bottom)
    for (let i = this._children.length - 1; i >= 0; i--) {
      const child = this._children[i];
      if (!child.invisible && child.contain(x, y)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Render group and children
   */
  render(ctx: CanvasRenderingContext2D): void {
    if (this.invisible) {
      return;
    }

    ctx.save();
    this.applyTransform(ctx);
    this.applyStyle(ctx);

    // Sort children by zlevel and z
    const sortedChildren = [...this._children].sort((a, b) => {
      if (a.zlevel !== b.zlevel) {
        return a.zlevel - b.zlevel;
      }
      return a.z - b.z;
    });

    // Render children
    for (const child of sortedChildren) {
      if (!child.invisible) {
        // Child handles its own save/restore
        child.render(ctx);
      }
    }

    ctx.restore();
  }
}
