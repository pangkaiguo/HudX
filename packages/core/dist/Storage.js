/**
 * Storage - Manages graphical elements (Model layer)
 * Similar to hrender's Storage class
 */
import Group from './Group';
export default class Storage {
    constructor() {
        this._roots = [];
        this._elements = new Map();
    }
    /**
     * Add root group
     */
    addRoot(root) {
        if (this._roots.indexOf(root) < 0) {
            this._roots.push(root);
            this._addElementToMap(root);
        }
    }
    /**
     * Remove root group
     */
    removeRoot(root) {
        const index = this._roots.indexOf(root);
        if (index >= 0) {
            this._roots.splice(index, 1);
            this._removeElementFromMap(root);
        }
    }
    /**
     * Get all roots
     */
    getRoots() {
        return [...this._roots];
    }
    /**
     * Get element by ID
     */
    getElementById(id) {
        return this._elements.get(id);
    }
    /**
     * Update element in storage
     * Also updates all children if element is a Group
     */
    updateElement(element) {
        this._addElementToMap(element);
    }
    /**
     * Remove element from storage
     * Also removes all children if element is a Group
     */
    removeElement(element) {
        this._removeElementFromMap(element);
    }
    /**
     * Iterate all elements
     */
    iterate(callback, includeRoot = false) {
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
    getElementsList() {
        const elements = [];
        this.iterate((el) => {
            elements.push(el);
        }, true);
        // Sort by zlevel first, then by z
        elements.sort((a, b) => {
            if (a.zlevel !== b.zlevel) {
                return a.zlevel - b.zlevel;
            }
            return a.z - b.z;
        });
        return elements;
    }
    /**
     * Clear all elements
     */
    clear() {
        this._roots = [];
        this._elements.clear();
    }
    /**
     * Add element and its children to map
     */
    _addElementToMap(element) {
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
    _removeElementFromMap(element) {
        this._elements.delete(element.id);
        if (element instanceof Group) {
            element.traverse((child) => {
                this._elements.delete(child.id);
            });
        }
    }
}
