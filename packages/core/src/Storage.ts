/**
 * Storage - Manages graphical elements (Model layer)
 * Similar to hrender's Storage class
 */

import HRElement from './HRElement';
import Group from './Group';

export default class Storage {
  private _roots: Group[] = [];
  private _elements: Map<string, HRElement> = new Map();

  /**
   * Add root group
   */
  addRoot(root: Group): void {
    if (this._roots.indexOf(root) < 0) {
      this._roots.push(root);
      this._addElementToMap(root);
    }
  }

  /**
   * Remove root group
   */
  removeRoot(root: Group): void {
    const index = this._roots.indexOf(root);
    if (index >= 0) {
      this._roots.splice(index, 1);
      this._removeElementFromMap(root);
    }
  }

  /**
   * Get all roots
   */
  getRoots(): Group[] {
    return [...this._roots];
  }

  /**
   * Get element by ID
   */
  getElementById(id: string): HRElement | undefined {
    return this._elements.get(id);
  }

  /**
   * Update element in storage
   * Also updates all children if element is a Group
   */
  updateElement(element: HRElement): void {
    this._addElementToMap(element);
  }

  /**
   * Remove element from storage
   * Also removes all children if element is a Group
   */
  removeElement(element: HRElement): void {
    this._removeElementFromMap(element);
  }

  /**
   * Iterate all elements
   */
  iterate<T>(callback: (element: HRElement) => T | void, includeRoot: boolean = false): T | void {
    for (const root of this._roots) {
      if (includeRoot) {
        const result = callback(root);
        if (result !== undefined) {
          return result;
        }
      }
      root.traverse((child) => {
        const result = callback(child);
        if (result !== undefined) {
          return false; // Stop traversal
        }
      });
    }
  }

  /**
   * Get all elements sorted by zlevel and z
   */
  getElementsList(): HRElement[] {
    // Only return root elements, they will render their children
    return [...this._roots].sort((a, b) => {
      if (a.zlevel !== b.zlevel) {
        return a.zlevel - b.zlevel;
      }
      return a.z - b.z;
    });
  }

  /**
   * Clear all elements
   */
  clear(): void {
    this._roots = [];
    this._elements.clear();
  }

  /**
   * Add element and its children to map
   */
  private _addElementToMap(element: HRElement): void {
    this._elements.set(element.id, element);
    if (element instanceof Group) {
      element.traverse((child) => {
        this._elements.set(child.id, child);
      });
    }
  }

  /**
   * Remove element and its children from map
   */
  private _removeElementFromMap(element: HRElement): void {
    this._elements.delete(element.id);
    if (element instanceof Group) {
      element.traverse((child) => {
        this._elements.delete(child.id);
      });
    }
  }
}

