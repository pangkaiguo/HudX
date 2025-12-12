/**
 * Circle - Circle shape element
 */
import HRElement from '../HRElement';
export default class Circle extends HRElement {
    constructor(opts = { shape: { cx: 0, cy: 0, r: 0 } }) {
        super(opts);
        this.shape = opts.shape || { cx: 0, cy: 0, r: 0 };
    }
    getBoundingRect() {
        const shape = this.shape;
        return {
            x: shape.cx - shape.r,
            y: shape.cy - shape.r,
            width: shape.r * 2,
            height: shape.r * 2,
        };
    }
    contain(x, y) {
        const shape = this.shape;
        const dx = x - shape.cx;
        const dy = y - shape.cy;
        return dx * dx + dy * dy <= shape.r * shape.r;
    }
    render(ctx) {
        if (this.invisible) {
            return;
        }
        ctx.save();
        this.applyTransform(ctx);
        this.applyStyle(ctx);
        const shape = this.shape;
        ctx.beginPath();
        ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, false);
        if (this.style.fill) {
            ctx.fill();
        }
        if (this.style.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }
}
