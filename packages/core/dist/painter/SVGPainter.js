/**
 * SVGPainter - SVG rendering implementation
 */
import Group from '../Group';
export default class SVGPainter {
    constructor(dom, storage) {
        this._width = 0;
        this._height = 0;
        this._dirty = true;
        this._elementMap = new Map();
        this._dom = dom;
        this._storage = storage;
        // Create SVG element
        this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this._svg.style.width = '100%';
        this._svg.style.height = '100%';
        // Create defs for gradients, patterns, etc.
        this._defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        this._svg.appendChild(this._defs);
        // Create root group
        this._rootGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this._svg.appendChild(this._rootGroup);
        this._dom.appendChild(this._svg);
        this.resize();
        this._initEvent();
    }
    /**
     * Resize SVG
     */
    resize(width, height) {
        const rect = this._dom.getBoundingClientRect();
        this._width = width ?? rect.width;
        this._height = height ?? rect.height;
        this._svg.setAttribute('width', String(this._width));
        this._svg.setAttribute('height', String(this._height));
        this._svg.setAttribute('viewBox', `0 0 ${this._width} ${this._height}`);
        this.markDirty();
    }
    /**
     * Get SVG element
     */
    getSVG() {
        return this._svg;
    }
    /**
     * Get root group
     */
    getRootGroup() {
        return this._rootGroup;
    }
    /**
     * Get width
     */
    getWidth() {
        return this._width;
    }
    /**
     * Get height
     */
    getHeight() {
        return this._height;
    }
    /**
     * Mark as dirty (needs repaint)
     */
    markDirty() {
        if (!this._dirty) {
            this._dirty = true;
            this._requestPaint();
        }
    }
    /**
     * Paint all elements
     */
    paint() {
        if (!this._dirty) {
            return;
        }
        // Clear root group
        while (this._rootGroup.firstChild) {
            this._rootGroup.removeChild(this._rootGroup.firstChild);
        }
        this._elementMap.clear();
        // Get all elements sorted by zlevel and z
        const elements = this._storage.getElementsList();
        // Render each element
        for (const element of elements) {
            if (!element.invisible) {
                try {
                    const svgElement = this._renderElement(element);
                    if (svgElement) {
                        this._rootGroup.appendChild(svgElement);
                        this._elementMap.set(element, svgElement);
                    }
                    element.clearDirty();
                }
                catch (error) {
                    console.error('Error rendering element:', error, element);
                }
            }
        }
        this._dirty = false;
    }
    /**
     * Render element to SVG
     */
    _renderElement(element) {
        // Create group for element
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        // Apply transform
        const transform = element.transform;
        if (transform) {
            const transforms = [];
            if (transform.x !== undefined || transform.y !== undefined) {
                transforms.push(`translate(${transform.x ?? 0}, ${transform.y ?? 0})`);
            }
            if (transform.scaleX !== undefined || transform.scaleY !== undefined) {
                transforms.push(`scale(${transform.scaleX ?? 1}, ${transform.scaleY ?? 1})`);
            }
            if (transform.rotation) {
                const originX = transform.originX ?? 0;
                const originY = transform.originY ?? 0;
                transforms.push(`rotate(${(transform.rotation * 180) / Math.PI} ${originX} ${originY})`);
            }
            if (transforms.length > 0) {
                group.setAttribute('transform', transforms.join(' '));
            }
        }
        // Apply style
        const style = element.style;
        if (style) {
            if (style.fill) {
                group.setAttribute('fill', style.fill);
            }
            else {
                group.setAttribute('fill', 'none');
            }
            if (style.stroke) {
                group.setAttribute('stroke', style.stroke);
            }
            if (style.lineWidth !== undefined) {
                group.setAttribute('stroke-width', String(style.lineWidth));
            }
            if (style.opacity !== undefined) {
                group.setAttribute('opacity', String(style.opacity));
            }
        }
        // Render based on element type
        if (element instanceof Group) {
            // Render group children
            const children = element.children();
            for (const child of children) {
                if (!child.invisible) {
                    const childElement = this._renderElement(child);
                    if (childElement) {
                        group.appendChild(childElement);
                    }
                }
            }
        }
        else {
            const shapeElement = this._createShapeElement(element);
            if (shapeElement) {
                group.appendChild(shapeElement);
            }
        }
        return group;
    }
    /**
     * Create SVG shape element
     */
    _createShapeElement(element) {
        const shape = element.shape;
        if (!shape) {
            // Check if it's a Group
            if (element instanceof Group) {
                const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                // Group children will be handled separately
                return group;
            }
            return null;
        }
        // Determine element type by checking shape properties
        if ('cx' in shape && 'cy' in shape && 'r' in shape && !('startAngle' in shape)) {
            // Circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', String(shape.cx));
            circle.setAttribute('cy', String(shape.cy));
            circle.setAttribute('r', String(shape.r));
            return circle;
        }
        else if ('cx' in shape && 'cy' in shape && 'r' in shape && 'startAngle' in shape && 'endAngle' in shape) {
            // Arc or Sector
            if ('r0' in shape) {
                // Sector (donut)
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const d = this._createSectorPath(shape);
                path.setAttribute('d', d);
                return path;
            }
            else {
                // Arc
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const d = this._createArcPath(shape);
                path.setAttribute('d', d);
                return path;
            }
        }
        else if ('x' in shape && 'y' in shape && 'width' in shape && 'height' in shape && !('text' in shape)) {
            // Rect
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', String(shape.x));
            rect.setAttribute('y', String(shape.y));
            rect.setAttribute('width', String(shape.width));
            rect.setAttribute('height', String(shape.height));
            if (shape.r) {
                rect.setAttribute('rx', String(shape.r));
                rect.setAttribute('ry', String(shape.r));
            }
            return rect;
        }
        else if ('x1' in shape && 'y1' in shape && 'x2' in shape && 'y2' in shape && !('cpx1' in shape)) {
            // Line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', String(shape.x1));
            line.setAttribute('y1', String(shape.y1));
            line.setAttribute('x2', String(shape.x2));
            line.setAttribute('y2', String(shape.y2));
            return line;
        }
        else if ('points' in shape && Array.isArray(shape.points)) {
            // Polyline or Polygon - check element type
            let points;
            if (Array.isArray(shape.points[0])) {
                points = shape.points.map(p => `${p[0]},${p[1]}`).join(' ');
            }
            else {
                points = shape.points.map((p) => `${p.x},${p.y}`).join(' ');
            }
            const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            poly.setAttribute('points', points);
            return poly;
        }
        else if ('d' in shape) {
            // Path
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', shape.d);
            return path;
        }
        else if ('x1' in shape && 'y1' in shape && 'x2' in shape && 'y2' in shape && 'cpx1' in shape) {
            // BezierCurve
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = this._createBezierPath(shape);
            path.setAttribute('d', d);
            return path;
        }
        else if ('x' in shape && 'y' in shape && 'text' in shape) {
            // Text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', String(shape.x));
            text.setAttribute('y', String(shape.y));
            text.textContent = shape.text;
            const style = element.style;
            if (style) {
                if (style.fontSize) {
                    text.setAttribute('font-size', String(style.fontSize));
                }
                if (style.fontFamily) {
                    text.setAttribute('font-family', style.fontFamily);
                }
                if (style.textAlign) {
                    text.setAttribute('text-anchor', style.textAlign === 'center' ? 'middle' : style.textAlign);
                }
            }
            return text;
        }
        else if ('image' in shape) {
            // Image
            const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            image.setAttribute('x', String(shape.x));
            image.setAttribute('y', String(shape.y));
            image.setAttribute('width', String(shape.width));
            image.setAttribute('height', String(shape.height));
            if (shape.image instanceof HTMLImageElement) {
                image.setAttribute('href', shape.image.src);
            }
            else if (shape.image instanceof HTMLCanvasElement) {
                image.setAttribute('href', shape.image.toDataURL());
            }
            return image;
        }
        return null;
    }
    /**
     * Create SVG path for arc
     */
    _createArcPath(shape) {
        const cx = shape.cx;
        const cy = shape.cy;
        const r = shape.r;
        const startAngle = shape.startAngle;
        const endAngle = shape.endAngle;
        const anticlockwise = shape.anticlockwise || false;
        const startX = cx + r * Math.cos(startAngle);
        const startY = cy + r * Math.sin(startAngle);
        const endX = cx + r * Math.cos(endAngle);
        const endY = cy + r * Math.sin(endAngle);
        const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
        const sweep = anticlockwise ? 0 : 1;
        return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} ${sweep} ${endX} ${endY}`;
    }
    /**
     * Create SVG path for sector
     */
    _createSectorPath(shape) {
        const cx = shape.cx;
        const cy = shape.cy;
        const r0 = shape.r0 || 0;
        const r = shape.r;
        const startAngle = shape.startAngle;
        const endAngle = shape.endAngle;
        const anticlockwise = shape.anticlockwise || false;
        const startX0 = cx + r0 * Math.cos(startAngle);
        const startY0 = cy + r0 * Math.sin(startAngle);
        const startX = cx + r * Math.cos(startAngle);
        const startY = cy + r * Math.sin(startAngle);
        const endX = cx + r * Math.cos(endAngle);
        const endY = cy + r * Math.sin(endAngle);
        const endX0 = cx + r0 * Math.cos(endAngle);
        const endY0 = cy + r0 * Math.sin(endAngle);
        const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
        const sweep = anticlockwise ? 0 : 1;
        if (r0 > 0) {
            // Donut sector
            return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} ${sweep} ${endX} ${endY} L ${endX0} ${endY0} A ${r0} ${r0} 0 ${largeArc} ${1 - sweep} ${startX0} ${startY0} Z`;
        }
        else {
            // Pie sector
            return `M ${cx} ${cy} L ${startX} ${startY} A ${r} ${r} 0 ${largeArc} ${sweep} ${endX} ${endY} Z`;
        }
    }
    /**
     * Create SVG path for bezier curve
     */
    _createBezierPath(shape) {
        const x1 = shape.x1;
        const y1 = shape.y1;
        const x2 = shape.x2;
        const y2 = shape.y2;
        const cpx1 = shape.cpx1;
        const cpy1 = shape.cpy1;
        if ('cpx2' in shape && shape.cpx2 !== undefined) {
            // Cubic bezier
            const cpx2 = shape.cpx2;
            const cpy2 = shape.cpy2;
            return `M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`;
        }
        else {
            // Quadratic bezier
            return `M ${x1} ${y1} Q ${cpx1} ${cpy1}, ${x2} ${y2}`;
        }
    }
    /**
     * Request paint (using requestAnimationFrame for performance)
     */
    _requestPaint() {
        if (this._animationFrameId !== undefined) {
            return;
        }
        this._animationFrameId = requestAnimationFrame(() => {
            this._animationFrameId = undefined;
            this.paint();
        });
    }
    /**
     * Initialize resize observer
     */
    _initEvent() {
        // Disabled to prevent infinite loop
    }
    /**
     * Handle resize
     */
    _resize() {
        // Disabled
    }
    /**
     * Dispose SVG painter
     */
    dispose() {
        if (this._animationFrameId !== undefined) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
        if (this._svg.parentNode) {
            this._svg.parentNode.removeChild(this._svg);
        }
        this._elementMap.clear();
    }
}
