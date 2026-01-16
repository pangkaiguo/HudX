/**
 * BatchUpdater - Batch DOM updates for performance
 * Uses requestAnimationFrame to batch multiple updates
 */

type UpdateCallback = () => void;

export default class BatchUpdater {
  private _pendingUpdates: Set<UpdateCallback> = new Set();
  private _animationFrameId?: number;
  private _isScheduled: boolean = false;

  /**
   * Schedule an update
   */
  schedule(callback: UpdateCallback): void {
    this._pendingUpdates.add(callback);
    this._requestUpdate();
  }

  /**
   * Cancel a scheduled update
   */
  cancel(callback: UpdateCallback): void {
    this._pendingUpdates.delete(callback);
  }

  /**
   * Request update (using requestAnimationFrame)
   */
  private _requestUpdate(): void {
    if (this._isScheduled) {
      return;
    }

    this._isScheduled = true;
    this._animationFrameId = requestAnimationFrame(() => {
      this._isScheduled = false;
      this._flush();
    });
  }

  /**
   * Flush all pending updates
   */
  private _flush(): void {
    const updates = Array.from(this._pendingUpdates);
    this._pendingUpdates.clear();

    for (const update of updates) {
      try {
        update();
      } catch (error) {
        console.error("Error in batch update:", error);
      }
    }
  }

  /**
   * Force flush all pending updates immediately
   */
  flush(): void {
    if (this._animationFrameId !== undefined) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
      this._isScheduled = false;
    }
    this._flush();
  }

  /**
   * Dispose batch updater
   */
  dispose(): void {
    if (this._animationFrameId !== undefined) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
    this._pendingUpdates.clear();
    this._isScheduled = false;
  }
}
