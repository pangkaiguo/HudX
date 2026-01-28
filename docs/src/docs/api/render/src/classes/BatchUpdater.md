[**HudX API**](../../../README.md)

***

# Class: BatchUpdater

Defined in: [render/src/util/BatchUpdater.ts:8](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/BatchUpdater.ts#L8)

## Constructors

### Constructor

> **new BatchUpdater**(): `BatchUpdater`

#### Returns

`BatchUpdater`

## Methods

### cancel()

> **cancel**(`callback`): `void`

Defined in: [render/src/util/BatchUpdater.ts:24](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/BatchUpdater.ts#L24)

Cancel a scheduled update

#### Parameters

##### callback

`UpdateCallback`

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: [render/src/util/BatchUpdater.ts:74](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/BatchUpdater.ts#L74)

Dispose batch updater

#### Returns

`void`

***

### flush()

> **flush**(): `void`

Defined in: [render/src/util/BatchUpdater.ts:62](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/BatchUpdater.ts#L62)

Force flush all pending updates immediately

#### Returns

`void`

***

### schedule()

> **schedule**(`callback`): `void`

Defined in: [render/src/util/BatchUpdater.ts:16](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/BatchUpdater.ts#L16)

Schedule an update

#### Parameters

##### callback

`UpdateCallback`

#### Returns

`void`
