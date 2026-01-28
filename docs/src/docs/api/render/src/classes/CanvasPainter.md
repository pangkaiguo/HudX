[**HudX API**](../../../README.md)

***

# Class: CanvasPainter

Defined in: [render/src/painter/CanvasPainter.ts:17](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L17)

## Implements

- [`IPainter`](../interfaces/IPainter.md)

## Constructors

### Constructor

> **new CanvasPainter**(`dom`, `storage`): `CanvasPainter`

Defined in: [render/src/painter/CanvasPainter.ts:27](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L27)

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

Defined in: [render/src/painter/CanvasPainter.ts:241](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L241)

Dispose painter

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`dispose`](../interfaces/IPainter.md#dispose)

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement`

Defined in: [render/src/painter/CanvasPainter.ts:77](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L77)

Get canvas element

#### Returns

`HTMLCanvasElement`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getCanvas`](../interfaces/IPainter.md#getcanvas)

***

### getContext()

> **getContext**(): `CanvasRenderingContext2D`

Defined in: [render/src/painter/CanvasPainter.ts:84](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L84)

Get rendering context

#### Returns

`CanvasRenderingContext2D`

***

### getDataURL()

> **getDataURL**(`opts`): `string`

Defined in: [render/src/painter/CanvasPainter.ts:211](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L211)

Get data URL

#### Parameters

##### opts

[`DataURLOpts`](../interfaces/DataURLOpts.md) = `{}`

#### Returns

`string`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getDataURL`](../interfaces/IPainter.md#getdataurl)

***

### getHeight()

> **getHeight**(): `number`

Defined in: [render/src/painter/CanvasPainter.ts:98](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L98)

Get height

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getHeight`](../interfaces/IPainter.md#getheight)

***

### getWidth()

> **getWidth**(): `number`

Defined in: [render/src/painter/CanvasPainter.ts:91](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L91)

Get width

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getWidth`](../interfaces/IPainter.md#getwidth)

***

### markDirty()

> **markDirty**(): `void`

Defined in: [render/src/painter/CanvasPainter.ts:105](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L105)

Mark as dirty (needs repaint)

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`markDirty`](../interfaces/IPainter.md#markdirty)

***

### paint()

> **paint**(): `void`

Defined in: [render/src/painter/CanvasPainter.ts:115](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L115)

Paint all elements

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`paint`](../interfaces/IPainter.md#paint)

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: [render/src/painter/CanvasPainter.ts:45](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/CanvasPainter.ts#L45)

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
