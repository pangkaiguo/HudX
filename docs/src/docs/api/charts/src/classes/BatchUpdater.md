[**HudX API**](../../../README.md)

***

# Class: BatchUpdater

Defined in: render/dist/util/BatchUpdater.d.ts:6

## Constructors

### Constructor

> **new BatchUpdater**(): `BatchUpdater`

#### Returns

`BatchUpdater`

## Methods

### cancel()

> **cancel**(`callback`): `void`

Defined in: render/dist/util/BatchUpdater.d.ts:17

Cancel a scheduled update

#### Parameters

##### callback

`UpdateCallback`

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: render/dist/util/BatchUpdater.d.ts:33

Dispose batch updater

#### Returns

`void`

***

### flush()

> **flush**(): `void`

Defined in: render/dist/util/BatchUpdater.d.ts:29

Force flush all pending updates immediately

#### Returns

`void`

***

### schedule()

> **schedule**(`callback`): `void`

Defined in: render/dist/util/BatchUpdater.d.ts:13

Schedule an update

#### Parameters

##### callback

`UpdateCallback`

#### Returns

`void`
