/**
 * Group - Container for multiple elements
 * Similar to hrender's Group class
 */
import HRElement from './HRElement';
import { ElementOption } from './types';
export default class Group extends HRElement {
    private _children;
    constructor(opts?: ElementOption);
    /**
     * Add child element
     */
    add(child: HRElement): this;
    /**
     * Remove child element
     */
    remove(child: HRElement): this;
    /**
     * Remove all children
     */
    removeAll(): this;
    /**
     * Get child at index
     */
    childAt(index: number): HRElement | undefined;
    /**
     * Get child by ID
     */
    childOfName(name: string): HRElement | undefined;
    /**
     * Get all children
     */
    children(): HRElement[];
    /**
     * Get children count
     */
    childrenCount(): number;
    /**
     * Traverse children
     */
    traverse(callback: (child: HRElement) => void | boolean, includeSelf?: boolean): void;
    /**
     * Get bounding rect (union of all children)
     */
    getBoundingRect(): import('./types').BoundingRect;
    /**
     * Check if point is inside group
     */
    contain(x: number, y: number): boolean;
    /**
     * Render group and children
     */
    render(ctx: CanvasRenderingContext2D): void;
}
