/**
 * Group - Container for multiple elements
 * Similar to hrender's Group class
 */
import Element from './Element';
export default class Group extends Element {
    constructor(opts = {}) {
        super(opts);
        this._children = [];
    }
    /**
     * Add child element
     */
    add(child) {
        if (child === this) {
            return this;
        }
        // Remove from previous parent if exists
        if (child.__parent) {
            child.__parent.remove(child);
        }
        this._children.push(child);
        child.__parent = this;
        this.markRedraw();
        return this;
    }
    /**
     * Remove child element
     */
    remove(child) {
        const index = this._children.indexOf(child);
        if (index >= 0) {
            this._children.splice(index, 1);
            delete child.__parent;
            this.markRedraw();
        }
        return this;
    }
    /**
     * Remove all children
     */
    removeAll() {
        for (const child of this._children) {
            delete child.__parent;
        }
        this._children = [];
        this.markRedraw();
        return this;
    }
    /**
     * Get child at index
     */
    childAt(index) {
        return this._children[index];
    }
    /**
     * Get child by ID
     */
    childOfName(name) {
        return this._children.find(child => child.id === name);
    }
    /**
     * Get all children
     */
    children() {
        return [...this._children];
    }
    /**
     * Get children count
     */
    childrenCount() {
        return this._children.length;
    }
    /**
     * Traverse children
     */
    traverse(callback, includeSelf = false) {
        if (includeSelf) {
            const result = callback(this);
            if (result === false) {
                return;
            }
        }
        for (const child of this._children) {
            if (child instanceof Group) {
                child.traverse(callback, true);
            }
            else {
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
    getBoundingRect() {
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
    contain(x, y) {
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
    render(ctx) {
        if (this.invisible) {
            return;
        }
        ctx.save();
        // Apply transform
        this.applyTransform(ctx);
        // Apply clip path if exists
        const clipPath = this.getClipPath();
        if (clipPath) {
            ctx.beginPath();
            clipPath.render(ctx);
            ctx.clip();
        }
        // Apply style
        this.applyStyle(ctx);
        // Render children
        for (const child of this._children) {
            if (!child.invisible) {
                child.render(ctx);
            }
        }
        ctx.restore();
    }
}
