/**
 * Eventful mixin - provides event handling capabilities
 * Similar to hrender's Eventful mixin
 */
import { EventData, EventCallback } from '../types';
export default class Eventful {
    private _handlers;
    /**
     * Add event listener
     */
    on(event: string, handler: EventCallback): this;
    /**
     * Remove event listener
     */
    off(event?: string, handler?: EventCallback): this;
    /**
     * Trigger event
     */
    trigger(event: string, eventData?: EventData): this;
    /**
     * Check if event has listeners
     */
    isSilent(event?: string): boolean;
}
//# sourceMappingURL=Eventful.d.ts.map