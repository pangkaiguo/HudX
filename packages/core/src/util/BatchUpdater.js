/**
 * BatchUpdater - Batch DOM updates for performance
 * Uses requestAnimationFrame to batch multiple updates
 */
export default class BatchUpdater {
    constructor() {
        this._pendingUpdates = new Set();
        this._isScheduled = false;
    }
    /**
     * Schedule an update
     */
    schedule(callback) {
        this._pendingUpdates.add(callback);
        this._requestUpdate();
    }
    /**
     * Cancel a scheduled update
     */
    cancel(callback) {
        this._pendingUpdates.delete(callback);
    }
    /**
     * Request update (using requestAnimationFrame)
     */
    _requestUpdate() {
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
    _flush() {
        const updates = Array.from(this._pendingUpdates);
        this._pendingUpdates.clear();
        for (const update of updates) {
            try {
                update();
            }
            catch (error) {
                console.error('Error in batch update:', error);
            }
        }
    }
    /**
     * Force flush all pending updates immediately
     */
    flush() {
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
    dispose() {
        if (this._animationFrameId !== undefined) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
        this._pendingUpdates.clear();
        this._isScheduled = false;
    }
}
//# sourceMappingURL=BatchUpdater.js.map