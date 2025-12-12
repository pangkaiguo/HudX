/**
 * Storage - Manages graphical elements (Model layer)
 * Similar to hrender's Storage class
 */
import HRElement from './HRElement';
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
    getElementById(id: string): HRElement | undefined;
    /**
     * Update element in storage
     * Also updates all children if element is a Group
     */
    updateElement(element: HRElement): void;
    /**
     * Remove element from storage
     * Also removes all children if element is a Group
     */
    removeElement(element: HRElement): void;
    /**
     * Iterate all elements
     */
    iterate<T>(callback: (element: HRElement) => T | void, includeRoot?: boolean): T | void;
    /**
     * Get all elements sorted by zlevel and z
     */
    getElementsList(): HRElement[];
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
