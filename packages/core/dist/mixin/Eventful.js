/**
 * Eventful mixin - provides event handling capabilities
 * Similar to hrender's Eventful mixin
 */
export default class Eventful {
    constructor() {
        this._handlers = new Map();
    }
    /**
     * Add event listener
     */
    on(event, handler) {
        if (!this._handlers.has(event)) {
            this._handlers.set(event, []);
        }
        this._handlers.get(event).push(handler);
        return this;
    }
    /**
     * Remove event listener
     */
    off(event, handler) {
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
    trigger(event, eventData) {
        const handlers = this._handlers.get(event);
        if (handlers) {
            const data = {
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
    isSilent(event) {
        if (!event) {
            return this._handlers.size === 0;
        }
        return !this._handlers.has(event) || this._handlers.get(event).length === 0;
    }
}
