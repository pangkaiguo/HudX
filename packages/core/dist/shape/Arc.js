/**
 * Arc - Arc shape element
 */
import HRElement from '../HRElement';
export default class Arc extends HRElement {
    constructor(opts) {
        super(opts);
        this.shape = opts.shape;
    }
    getBoundingRect() {
        const shape = this.shape;
        const r = shape.r;
        const lineWidth = this.style.lineWidth || 1;
        const padding = r + lineWidth / 2;
        return {
            x: shape.cx - padding,
            y: shape.cy - padding,
            width: padding * 2,
            height: padding * 2,
        };
    }
    contain(x, y) {
        const shape = this.shape;
        const dx = x - shape.cx;
        const dy = y - shape.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const lineWidth = this.style.lineWidth || 1;
        const threshold = lineWidth / 2;
        if (Math.abs(dist - shape.r) > threshold) {
            return false;
        }
        // Check angle
        let angle = Math.atan2(dy, dx);
        if (angle < 0) {
            angle += Math.PI * 2;
        }
        let startAngle = shape.startAngle;
        let endAngle = shape.endAngle;
        // Normalize angles
        while (startAngle < 0)
            startAngle += Math.PI * 2;
        while (endAngle < 0)
            endAngle += Math.PI * 2;
        while (startAngle >= Math.PI * 2)
            startAngle -= Math.PI * 2;
        while (endAngle >= Math.PI * 2)
            endAngle -= Math.PI * 2;
        if (shape.anticlockwise) {
            if (endAngle > startAngle) {
                return angle >= startAngle || angle <= endAngle;
            }
            else {
                return angle >= startAngle && angle <= endAngle;
            }
        }
        else {
            if (endAngle > startAngle) {
                return angle >= startAngle && angle <= endAngle;
            }
            else {
                return angle >= startAngle || angle <= endAngle;
            }
        }
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
        ctx.arc(shape.cx, shape.cy, shape.r, shape.startAngle, shape.endAngle, shape.anticlockwise || false);
        if (this.style.fill) {
            ctx.fill();
        }
        if (this.style.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }
}
