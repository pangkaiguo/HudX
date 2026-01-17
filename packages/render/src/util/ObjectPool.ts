/**
 * ObjectPool - Object pool for performance optimization
 * Reuses objects to reduce garbage collection
 */

export default class ObjectPool<T> {
  private _createFn: () => T;
  private _resetFn?: (obj: T) => void;
  private _pool: T[] = [];
  private _maxSize: number;

  constructor(
    createFn: () => T,
    resetFn?: (obj: T) => void,
    maxSize: number = 100,
  ) {
    this._createFn = createFn;
    this._resetFn = resetFn;
    this._maxSize = maxSize;
  }

  /**
   * Get object from pool
   */
  acquire(): T {
    if (this._pool.length > 0) {
      return this._pool.pop()!;
    }
    return this._createFn();
  }

  /**
   * Return object to pool
   */
  release(obj: T): void {
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
  clear(): void {
    this._pool = [];
  }

  /**
   * Get pool size
   */
  size(): number {
    return this._pool.length;
  }
}
