/**
 * Element - Base class for all graphical elements
 */
import Eventful from './mixin/Eventful';
export default class Element extends Eventful {
    constructor(opts = {}) {
        super();
        this.zlevel = 0;
        this.z = 0;
        this.silent = false;
        this.invisible = false;
        this.cursor = 'default';
        this.draggable = false;
        this.progressive = false;
        this.style = {};
        this.shape = {};
        this.transform = {};
        this._dirty = true;
        this.id = opts.id || this._generateId();
        this.zlevel = opts.zlevel ?? 0;
        this.z = opts.z ?? 0;
        this.silent = opts.silent ?? false;
        this.invisible = opts.invisible ?? false;
        this.cursor = opts.cursor || 'default';
        this.draggable = opts.draggable ?? false;
        this.progressive = opts.progressive ?? false;
        if (opts.style) {
            this.style = { ...opts.style };
        }
        if (opts.shape) {
            this.shape = { ...opts.shape };
        }
        if (opts.transform) {
            this.transform = { ...opts.transform };
        }
        if (opts.clipPath) {
            this._clipPath = opts.clipPath;
        }
    }
    attr(key, value) {
        if (typeof key === 'string' && value === undefined && arguments.length === 1) {
            if (key === 'style') {
                return this.style;
            }
            else if (key === 'shape') {
                return this.shape;
            }
            else if (key === 'transform') {
                return this.transform;
            }
            return this[key];
        }
        if (typeof key === 'string') {
            this._setAttr(key, value);
        }
        else {
            for (const k in key) {
                this._setAttr(k, key[k]);
            }
        }
        this.markRedraw();
        return this;
    }
    _setAttr(key, value) {
        if (key === 'style') {
            this.style = { ...this.style, ...value };
        }
        else if (key === 'shape') {
            this.shape = { ...this.shape, ...value };
        }
        else if (key === 'transform') {
            this.transform = { ...this.transform, ...value };
        }
        else if (key === 'invisible') {
            this.invisible = value;
        }
        else {
            this[key] = value;
        }
    }
    markRedraw() {
        this._dirty = true;
        this.trigger('dirty');
    }
    isDirty() {
        return this._dirty;
    }
    clearDirty() {
        this._dirty = false;
    }
    getBoundingRect() {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    contain(x, y) {
        return false;
    }
    render(ctx) {
        // To be implemented by subclasses
    }
    applyTransform(ctx) {
        const transform = this.transform;
        if (!transform)
            return;
        const originX = transform.originX ?? 0;
        const originY = transform.originY ?? 0;
        if (transform.x !== undefined || transform.y !== undefined) {
            ctx.translate(transform.x ?? 0, transform.y ?? 0);
        }
        if (originX !== 0 || originY !== 0) {
            ctx.translate(originX, originY);
        }
        if (transform.rotation) {
            ctx.rotate(transform.rotation);
        }
        if (transform.scaleX !== undefined || transform.scaleY !== undefined) {
            ctx.scale(transform.scaleX ?? 1, transform.scaleY ?? 1);
        }
        if (originX !== 0 || originY !== 0) {
            ctx.translate(-originX, -originY);
        }
    }
    applyStyle(ctx) {
        const style = this.style;
        if (!style)
            return;
        if (style.fill) {
            ctx.fillStyle = style.fill;
        }
        if (style.stroke) {
            ctx.strokeStyle = style.stroke;
        }
        if (style.lineWidth !== undefined) {
            ctx.lineWidth = style.lineWidth;
        }
        if (style.lineDash) {
            ctx.setLineDash(style.lineDash);
            if (style.lineDashOffset !== undefined) {
                ctx.lineDashOffset = style.lineDashOffset;
            }
        }
        if (style.opacity !== undefined) {
            ctx.globalAlpha = style.opacity;
        }
        if (style.shadowBlur !== undefined) {
            ctx.shadowBlur = style.shadowBlur;
        }
        if (style.shadowColor) {
            ctx.shadowColor = style.shadowColor;
        }
        if (style.shadowOffsetX !== undefined) {
            ctx.shadowOffsetX = style.shadowOffsetX;
        }
        if (style.shadowOffsetY !== undefined) {
            ctx.shadowOffsetY = style.shadowOffsetY;
        }
    }
    getClipPath() {
        return this._clipPath;
    }
    setClipPath(clipPath) {
        this._clipPath = clipPath;
        this.markRedraw();
        return this;
    }
    _generateId() {
        return `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
