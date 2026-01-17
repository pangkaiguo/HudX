/**
 * Eventful mixin - provides event handling capabilities
 */

import type { EventData, EventCallback } from '../types';

export default class Eventful {
  private _handlers: Map<string, EventCallback[]> = new Map();

  /**
   * Add event listener
   */
  on(event: string, handler: EventCallback): this {
    if (!this._handlers.has(event)) {
      this._handlers.set(event, []);
    }
    this._handlers.get(event)!.push(handler);
    return this;
  }

  /**
   * Remove event listener
   */
  off(event?: string, handler?: EventCallback): this {
    if (!event) {
      this._handlers.clear();
      return this;
    }

    if (!handler) {
      this._handlers.delete(event);
      return this;
    }

    const handlers = this._handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index >= 0) {
        handlers.splice(index, 1);
      }
      if (handlers.length === 0) {
        this._handlers.delete(event);
      }
    }

    return this;
  }

  /**
   * Trigger event
   */
  trigger(event: string, eventData?: Record<string, any>): this {
    const handlers = this._handlers.get(event);
    if (handlers) {
      const data: EventData = {
        type: event,
        ...eventData,
      };

      // Copy handlers array to avoid issues if handlers are modified during iteration
      const handlersCopy = [...handlers];
      for (const handler of handlersCopy) {
        handler.call(this, data);
      }
    }
    return this;
  }

  /**
   * Check if event has listeners
   */
  isSilent(event?: string): boolean {
    if (!event) {
      return this._handlers.size === 0;
    }
    return (
      !this._handlers.has(event) || this._handlers.get(event)!.length === 0
    );
  }
}
