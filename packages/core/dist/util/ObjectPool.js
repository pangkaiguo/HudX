/**
 * ObjectPool - Object pool for performance optimization
 * Reuses objects to reduce garbage collection
 */
export default class ObjectPool {
    constructor(createFn, resetFn, maxSize = 100) {
        this._pool = [];
        this._createFn = createFn;
        this._resetFn = resetFn;
        this._maxSize = maxSize;
    }
    /**
     * Get object from pool
     */
    acquire() {
        if (this._pool.length > 0) {
            return this._pool.pop();
        }
        return this._createFn();
    }
    /**
     * Return object to pool
     */
    release(obj) {
        if (this._pool.length >= this._maxSize) {
            return; // Pool is full, discard object
        }
        if (this._resetFn) {
            this._resetFn(obj);
        }
        this._pool.push(obj);
    }
    /**
     * Clear pool
     */
    clear() {
        this._pool = [];
    }
    /**
     * Get pool size
     */
    size() {
        return this._pool.length;
    }
}
