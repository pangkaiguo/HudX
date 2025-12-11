/**
 * Handler - Handles user interactions (Controller layer)
 * Similar to hrender's Handler class
 */

import IPainter from './painter/IPainter';
import Storage from './Storage';
import Element from './Element';
import { EventData, Point } from './types';

export default class Handler {
  private _painter: IPainter;
  private _storage: Storage;
  private _hovered: Element | null = null;
  private _dragging: Element | null = null;
  private _dragStart: Point | null = null;
  private _dragStartElementPos: Point | null = null;

  constructor(painter: IPainter, storage: Storage) {
    this._painter = painter;
    this._storage = storage;
    this._initEvent();
  }

  /**
   * Initialize event listeners
   */
  private _initEvent(): void {
    // Get target element (canvas or svg)
    const target = this._painter.getCanvas?.() || this._painter.getSVG?.();
    if (!target) {
      return;
    }

    // Mouse events
    target.addEventListener('mousedown', this._onMouseDown.bind(this));
    target.addEventListener('mousemove', this._onMouseMove.bind(this));
    target.addEventListener('mouseup', this._onMouseUp.bind(this));
    target.addEventListener('mouseout', this._onMouseOut.bind(this));
    target.addEventListener('click', this._onClick.bind(this));
    target.addEventListener('dblclick', this._onDblClick.bind(this));
    target.addEventListener('contextmenu', this._onContextMenu.bind(this));
    target.addEventListener('wheel', this._onWheel.bind(this));

    // Touch events
    target.addEventListener('touchstart', this._onTouchStart.bind(this));
    target.addEventListener('touchmove', this._onTouchMove.bind(this));
    target.addEventListener('touchend', this._onTouchEnd.bind(this));
  }

  /**
   * Get element at point
   */
  private _findHoveredElement(x: number, y: number): Element | null {
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
  private _getEventPoint(e: MouseEvent | TouchEvent): Point {
    const target = this._painter.getCanvas?.() || this._painter.getSVG?.();
    if (!target) {
      return { x: 0, y: 0 };
    }
    const rect = target.getBoundingClientRect();
    
    let clientX: number;
    let clientY: number;

    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
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
  private _createEventData(
    type: string,
    point: Point,
    target?: Element,
    originalEvent?: Event
  ): EventData {
    // Find top target (root element in hierarchy)
    let topTarget = target;
    if (target) {
      let current: any = target;
      while (current && (current as any).__parent) {
        current = (current as any).__parent;
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
  private _onMouseDown(e: MouseEvent): void {
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
  private _onMouseMove(e: MouseEvent): void {
    const point = this._getEventPoint(e);
    const element = this._findHoveredElement(point.x, point.y);

    // Handle dragging
    if (this._dragging && this._dragStart) {
      const dx = point.x - this._dragStart.x;
      const dy = point.y - this._dragStart.y;
      
      this._dragging.attr('transform', {
        ...this._dragging.transform,
        x: (this._dragStartElementPos!.x + dx),
        y: (this._dragStartElementPos!.y + dy),
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
  private _onMouseUp(e: MouseEvent): void {
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
  private _onMouseOut(e: MouseEvent): void {
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
  private _onClick(e: MouseEvent): void {
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
  private _onDblClick(e: MouseEvent): void {
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
  private _onContextMenu(e: MouseEvent): void {
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
  private _onWheel(e: WheelEvent): void {
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
  private _onTouchStart(e: TouchEvent): void {
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
  private _onTouchMove(e: TouchEvent): void {
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
  private _onTouchEnd(e: TouchEvent): void {
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
  dispose(): void {
    // Event listeners will be cleaned up when canvas is removed
    this._hovered = null;
    this._dragging = null;
  }
}

