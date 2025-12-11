/**
 * Handler - Handles user interactions (Controller layer)
 * Similar to hrender's Handler class
 */
export default class Handler {
    constructor(painter, storage) {
        this._hovered = null;
        this._dragging = null;
        this._dragStart = null;
        this._dragStartElementPos = null;
        this._painter = painter;
        this._storage = storage;
        this._initEvent();
    }
    /**
     * Initialize event listeners
     */
    _initEvent() {
        // Get target element (canvas or svg)
        const target = this._painter.getCanvas?.() || this._painter.getSVG?.();
        if (!target) {
            return;
        }
        // Mouse events - wrap in Event listener to fix type issues
        target.addEventListener('mousedown', (e) => this._onMouseDown(e));
        target.addEventListener('mousemove', (e) => this._onMouseMove(e));
        target.addEventListener('mouseup', (e) => this._onMouseUp(e));
        target.addEventListener('mouseout', (e) => this._onMouseOut(e));
        target.addEventListener('click', (e) => this._onClick(e));
        target.addEventListener('dblclick', (e) => this._onDblClick(e));
        target.addEventListener('contextmenu', (e) => this._onContextMenu(e));
        target.addEventListener('wheel', (e) => this._onWheel(e));
        // Touch events
        target.addEventListener('touchstart', (e) => this._onTouchStart(e));
        target.addEventListener('touchmove', (e) => this._onTouchMove(e));
        target.addEventListener('touchend', (e) => this._onTouchEnd(e));
    }
    /**
     * Get element at point
     */
    _findHoveredElement(x, y) {
        const elements = this._storage.getElementsList();
        // Check from top to bottom (reverse order)
        for (let i = elements.length - 1; i >= 0; i--) {
            const element = elements[i];
            if (!element.silent && !element.invisible && element.contain(x, y)) {
                return element;
            }
        }
        return null;
    }
    /**
     * Convert event coordinates to renderer coordinates
     */
    _getEventPoint(e) {
        const target = this._painter.getCanvas?.() || this._painter.getSVG?.();
        if (!target) {
            return { x: 0, y: 0 };
        }
        const rect = target.getBoundingClientRect();
        let clientX;
        let clientY;
        if (e instanceof MouseEvent) {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        else {
            const touch = e.touches[0] || e.changedTouches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }
    /**
     * Create event data with proper event bubbling
     */
    _createEventData(type, point, target, originalEvent) {
        // Find top target (root element in hierarchy)
        let topTarget = target;
        if (target) {
            let current = target;
            while (current && current.__parent) {
                current = current.__parent;
                if (current) {
                    topTarget = current;
                }
            }
        }
        return {
            type,
            zrX: point.x,
            zrY: point.y,
            offsetX: point.x,
            offsetY: point.y,
            target,
            topTarget: topTarget || target,
            originalEvent,
        };
    }
    /**
     * Handle mouse down
     */
    _onMouseDown(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        if (element && element.draggable) {
            this._dragging = element;
            this._dragStart = point;
            const transform = element.transform || {};
            this._dragStartElementPos = {
                x: transform.x || 0,
                y: transform.y || 0,
            };
        }
        const eventData = this._createEventData('mousedown', point, element, e);
        if (element) {
            element.trigger('mousedown', eventData);
        }
    }
    /**
     * Handle mouse move
     */
    _onMouseMove(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        // Handle dragging
        if (this._dragging && this._dragStart) {
            const dx = point.x - this._dragStart.x;
            const dy = point.y - this._dragStart.y;
            this._dragging.attr('transform', {
                ...this._dragging.transform,
                x: (this._dragStartElementPos.x + dx),
                y: (this._dragStartElementPos.y + dy),
            });
            this._painter.markDirty();
            const eventData = this._createEventData('drag', point, this._dragging, e);
            this._dragging.trigger('drag', eventData);
        }
        // Handle hover
        if (element !== this._hovered) {
            if (this._hovered) {
                const eventData = this._createEventData('mouseout', point, this._hovered, e);
                this._hovered.trigger('mouseout', eventData);
            }
            if (element) {
                const eventData = this._createEventData('mouseover', point, element, e);
                element.trigger('mouseover', eventData);
            }
            this._hovered = element;
        }
        const eventData = this._createEventData('mousemove', point, element, e);
        if (element) {
            element.trigger('mousemove', eventData);
        }
    }
    /**
     * Handle mouse up
     */
    _onMouseUp(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        if (this._dragging) {
            const eventData = this._createEventData('dragend', point, this._dragging, e);
            this._dragging.trigger('dragend', eventData);
            this._dragging = null;
            this._dragStart = null;
            this._dragStartElementPos = null;
        }
        const eventData = this._createEventData('mouseup', point, element, e);
        if (element) {
            element.trigger('mouseup', eventData);
        }
    }
    /**
     * Handle mouse out
     */
    _onMouseOut(e) {
        if (this._hovered) {
            const point = this._getEventPoint(e);
            const eventData = this._createEventData('mouseout', point, this._hovered, e);
            this._hovered.trigger('mouseout', eventData);
            this._hovered = null;
        }
    }
    /**
     * Handle click
     */
    _onClick(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('click', point, element, e);
        if (element) {
            element.trigger('click', eventData);
        }
    }
    /**
     * Handle double click
     */
    _onDblClick(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('dblclick', point, element, e);
        if (element) {
            element.trigger('dblclick', eventData);
        }
    }
    /**
     * Handle context menu
     */
    _onContextMenu(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('contextmenu', point, element, e);
        if (element) {
            element.trigger('contextmenu', eventData);
        }
    }
    /**
     * Handle wheel
     */
    _onWheel(e) {
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('mousewheel', point, element, e);
        if (element) {
            element.trigger('mousewheel', eventData);
        }
    }
    /**
     * Handle touch start
     */
    _onTouchStart(e) {
        e.preventDefault();
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('touchstart', point, element, e);
        if (element) {
            element.trigger('touchstart', eventData);
        }
    }
    /**
     * Handle touch move
     */
    _onTouchMove(e) {
        e.preventDefault();
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('touchmove', point, element, e);
        if (element) {
            element.trigger('touchmove', eventData);
        }
    }
    /**
     * Handle touch end
     */
    _onTouchEnd(e) {
        e.preventDefault();
        const point = this._getEventPoint(e);
        const element = this._findHoveredElement(point.x, point.y);
        const eventData = this._createEventData('touchend', point, element, e);
        if (element) {
            element.trigger('touchend', eventData);
        }
    }
    /**
     * Dispose handler
     */
    dispose() {
        // Event listeners will be cleaned up when canvas is removed
        this._hovered = null;
        this._dragging = null;
    }
}
