/**
 * Polygon - Polygon shape element
 */
import Element from '../Element';
export default class Polygon extends Element {
    constructor(opts = { shape: { points: [] } }) {
        super(opts);
        this.shape = opts.shape || { points: [] };
    }
    getBoundingRect() {
        const points = this.shape.points;
        if (points.length === 0) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const point of points) {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        }
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }
    contain(x, y) {
        const points = this.shape.points;
        if (points.length < 3) {
            return false;
        }
        // Ray casting algorithm
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const xi = points[i].x;
            const yi = points[i].y;
            const xj = points[j].x;
            const yj = points[j].y;
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    }
    render(ctx) {
        if (this.invisible || this.shape.points.length === 0) {
            return;
        }
        ctx.save();
        this.applyTransform(ctx);
        this.applyStyle(ctx);
        const points = this.shape.points;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        if (this.style.fill) {
            ctx.fill();
        }
        if (this.style.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }
}
//# sourceMappingURL=Polygon.js.map