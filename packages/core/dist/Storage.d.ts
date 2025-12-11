/**
 * Storage - Manages graphical elements (Model layer)
 * Similar to hrender's Storage class
 */
import Element from './Element';
import Group from './Group';
export default class Storage {
    private _roots;
    private _elements;
    /**
     * Add root group
     */
    addRoot(root: Group): void;
    /**
     * Remove root group
     */
    removeRoot(root: Group): void;
    /**
     * Get all roots
     */
    getRoots(): Group[];
    /**
     * Get element by ID
     */
    getElementById(id: string): Element | undefined;
    /**
     * Update element in storage
     * Also updates all children if element is a Group
     */
    updateElement(element: Element): void;
    /**
     * Remove element from storage
     * Also removes all children if element is a Group
     */
    removeElement(element: Element): void;
    /**
     * Iterate all elements
     */
    iterate<T>(callback: (element: Element) => T | void, includeRoot?: boolean): T | void;
    /**
     * Get all elements sorted by zlevel and z
     */
    getElementsList(): Element[];
    /**
     * Clear all elements
     */
    clear(): void;
    /**
     * Add element and its children to map
     */
    private _addElementToMap;
    /**
     * Remove element and its children from map
     */
    private _removeElementFromMap;
}
