/**
 * ObjectPool - Object pool for performance optimization
 * Reuses objects to reduce garbage collection
 */
export default class ObjectPool<T> {
    private _createFn;
    private _resetFn?;
    private _pool;
    private _maxSize;
    constructor(createFn: () => T, resetFn?: (obj: T) => void, maxSize?: number);
    /**
     * Get object from pool
     */
    acquire(): T;
    /**
     * Return object to pool
     */
    release(obj: T): void;
    /**
     * Clear pool
     */
    clear(): void;
    /**
     * Get pool size
     */
    size(): number;
}
