[**HudX API**](../../../README.md)

***

# Class: CanvasPainter

Defined in: render/dist/painter/CanvasPainter.d.ts:15

## Implements

- [`IPainter`](../interfaces/IPainter.md)

## Constructors

### Constructor

> **new CanvasPainter**(`dom`, `storage`): `CanvasPainter`

Defined in: render/dist/painter/CanvasPainter.d.ts:24

#### Parameters

##### dom

`HTMLElement`

##### storage

[`Storage`](Storage.md)

#### Returns

`CanvasPainter`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: render/dist/painter/CanvasPainter.d.ts:72

Dispose painter

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`dispose`](../interfaces/IPainter.md#dispose)

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement`

Defined in: render/dist/painter/CanvasPainter.d.ts:32

Get canvas element

#### Returns

`HTMLCanvasElement`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getCanvas`](../interfaces/IPainter.md#getcanvas)

***

### getContext()

> **getContext**(): `CanvasRenderingContext2D`

Defined in: render/dist/painter/CanvasPainter.d.ts:36

Get rendering context

#### Returns

`CanvasRenderingContext2D`

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: render/dist/painter/CanvasPainter.d.ts:68

Get data URL

#### Parameters

##### opts?

[`DataURLOpts`](../interfaces/DataURLOpts.md)

#### Returns

`string`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getDataURL`](../interfaces/IPainter.md#getdataurl)

***

### getHeight()

> **getHeight**(): `number`

Defined in: render/dist/painter/CanvasPainter.d.ts:44

Get height

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getHeight`](../interfaces/IPainter.md#getheight)

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/painter/CanvasPainter.d.ts:40

Get width

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getWidth`](../interfaces/IPainter.md#getwidth)

***

### markDirty()

> **markDirty**(): `void`

Defined in: render/dist/painter/CanvasPainter.d.ts:48

Mark as dirty (needs repaint)

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`markDirty`](../interfaces/IPainter.md#markdirty)

***

### paint()

> **paint**(): `void`

Defined in: render/dist/painter/CanvasPainter.d.ts:52

Paint all elements

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`paint`](../interfaces/IPainter.md#paint)

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: render/dist/painter/CanvasPainter.d.ts:28

Resize canvas

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`resize`](../interfaces/IPainter.md#resize)
