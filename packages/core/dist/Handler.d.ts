/**
 * Handler - Handles user interactions (Controller layer)
 * Similar to hrender's Handler class
 */
import IPainter from './painter/IPainter';
import Storage from './Storage';
export default class Handler {
    private _painter;
    private _storage;
    private _hovered;
    private _dragging;
    private _dragStart;
    private _dragStartElementPos;
    constructor(painter: IPainter, storage: Storage);
    /**
     * Initialize event listeners
     */
    private _initEvent;
    /**
     * Get element at point
     */
    private _findHoveredElement;
    /**
     * Convert event coordinates to renderer coordinates
     */
    private _getEventPoint;
    /**
     * Create event data with proper event bubbling
     */
    private _createEventData;
    /**
     * Handle mouse down
     */
    private _onMouseDown;
    /**
     * Handle mouse move
     */
    private _onMouseMove;
    /**
     * Handle mouse up
     */
    private _onMouseUp;
    /**
     * Handle mouse out
     */
    private _onMouseOut;
    /**
     * Handle click
     */
    private _onClick;
    /**
     * Handle double click
     */
    private _onDblClick;
    /**
     * Handle context menu
     */
    private _onContextMenu;
    /**
     * Handle wheel
     */
    private _onWheel;
    /**
     * Handle touch start
     */
    private _onTouchStart;
    /**
     * Handle touch move
     */
    private _onTouchMove;
    /**
     * Handle touch end
     */
    private _onTouchEnd;
    /**
     * Dispose handler
     */
    dispose(): void;
}
