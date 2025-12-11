/**
 * BatchUpdater - Batch DOM updates for performance
 * Uses requestAnimationFrame to batch multiple updates
 */
type UpdateCallback = () => void;
export default class BatchUpdater {
    private _pendingUpdates;
    private _animationFrameId?;
    private _isScheduled;
    /**
     * Schedule an update
     */
    schedule(callback: UpdateCallback): void;
    /**
     * Cancel a scheduled update
     */
    cancel(callback: UpdateCallback): void;
    /**
     * Request update (using requestAnimationFrame)
     */
    private _requestUpdate;
    /**
     * Flush all pending updates
     */
    private _flush;
    /**
     * Force flush all pending updates immediately
     */
    flush(): void;
    /**
     * Dispose batch updater
     */
    dispose(): void;
}
export {};
//# sourceMappingURL=BatchUpdater.d.ts.map