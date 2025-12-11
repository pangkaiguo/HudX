/**
 * Group - Container for multiple elements
 * Similar to hrender's Group class
 */
import Element from './Element';
import { ElementOption } from './types';
export default class Group extends Element {
    private _children;
    constructor(opts?: ElementOption);
    /**
     * Add child element
     */
    add(child: Element): this;
    /**
     * Remove child element
     */
    remove(child: Element): this;
    /**
     * Remove all children
     */
    removeAll(): this;
    /**
     * Get child at index
     */
    childAt(index: number): Element | undefined;
    /**
     * Get child by ID
     */
    childOfName(name: string): Element | undefined;
    /**
     * Get all children
     */
    children(): Element[];
    /**
     * Get children count
     */
    childrenCount(): number;
    /**
     * Traverse children
     */
    traverse(callback: (child: Element) => void | boolean, includeSelf?: boolean): void;
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
//# sourceMappingURL=Group.d.ts.map