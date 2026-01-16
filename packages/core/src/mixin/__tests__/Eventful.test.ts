import { describe, it, expect, vi } from 'vitest';
import Eventful from '../Eventful';

describe('Eventful', () => {
  it('should add and trigger event listeners', () => {
    const eventful = new Eventful();
    const handler = vi.fn();

    eventful.on('test', handler);
    eventful.trigger('test');

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({ type: 'test' });
  });

  it('should trigger with data', () => {
    const eventful = new Eventful();
    const handler = vi.fn();

    eventful.on('test', handler);
    eventful.trigger('test', { foo: 'bar' });

    expect(handler).toHaveBeenCalledWith({ type: 'test', foo: 'bar' });
  });

  it('should remove event listeners', () => {
    const eventful = new Eventful();
    const handler = vi.fn();

    eventful.on('test', handler);
    eventful.off('test', handler);
    eventful.trigger('test');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should remove all listeners for an event', () => {
    const eventful = new Eventful();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    eventful.on('test', handler1);
    eventful.on('test', handler2);
    eventful.off('test');
    eventful.trigger('test');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  it('should remove all listeners', () => {
    const eventful = new Eventful();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    eventful.on('test1', handler1);
    eventful.on('test2', handler2);
    eventful.off();

    eventful.trigger('test1');
    eventful.trigger('test2');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  it('should handle removing non-existent listener', () => {
    const eventful = new Eventful();
    const handler = vi.fn();

    // Should not throw
    eventful.off('test', handler);

    // Add one then remove another
    eventful.on('test', handler);
    const otherHandler = vi.fn();
    eventful.off('test', otherHandler);

    eventful.trigger('test');
    expect(handler).toHaveBeenCalled();
  });

  it('should check if event is silent', () => {
    const eventful = new Eventful();

    expect(eventful.isSilent('test')).toBe(true);
    expect(eventful.isSilent()).toBe(true);

    eventful.on('test', () => {});

    expect(eventful.isSilent('test')).toBe(false);
    expect(eventful.isSilent()).toBe(false);

    eventful.off('test');
    expect(eventful.isSilent('test')).toBe(true);
  });

  it('should handle multiple handlers for same event', () => {
    const eventful = new Eventful();
    const order: number[] = [];

    eventful.on('test', () => order.push(1));
    eventful.on('test', () => order.push(2));

    eventful.trigger('test');

    expect(order).toEqual([1, 2]);
  });
});
