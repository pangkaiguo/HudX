/**
 * Image - Image shape element
 */
import HRElement from '../HRElement';
export default class Image extends HRElement {
    constructor(opts) {
        super(opts);
        this.shape = opts.shape;
    }
    getBoundingRect() {
        const shape = this.shape;
        return {
            x: shape.x,
            y: shape.y,
            width: shape.width,
            height: shape.height,
        };
    }
    contain(x, y) {
        const shape = this.shape;
        return x >= shape.x && x <= shape.x + shape.width &&
            y >= shape.y && y <= shape.y + shape.height;
    }
    render(ctx) {
        if (this.invisible) {
            return;
        }
        ctx.save();
        this.applyTransform(ctx);
        this.applyStyle(ctx);
        const shape = this.shape;
        if (shape.sx !== undefined && shape.sy !== undefined &&
            shape.sWidth !== undefined && shape.sHeight !== undefined) {
            // Draw image with source rectangle
            ctx.drawImage(shape.image, shape.sx, shape.sy, shape.sWidth, shape.sHeight, shape.x, shape.y, shape.width, shape.height);
        }
        else {
            // Draw full image
            ctx.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
        }
        ctx.restore();
    }
}
