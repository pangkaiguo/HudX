[**HudX API**](../../../README.md)

***

# Class: SVGPainter

Defined in: render/dist/painter/SVGPainter.d.ts:14

## Implements

- [`IPainter`](../interfaces/IPainter.md)

## Constructors

### Constructor

> **new SVGPainter**(`dom`, `storage`): `SVGPainter`

Defined in: render/dist/painter/SVGPainter.d.ts:28

#### Parameters

##### dom

`HTMLElement`

##### storage

[`Storage`](Storage.md)

#### Returns

`SVGPainter`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: render/dist/painter/SVGPainter.d.ts:105

Dispose SVG painter

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`dispose`](../interfaces/IPainter.md#dispose)

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: render/dist/painter/SVGPainter.d.ts:64

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

Defined in: render/dist/painter/SVGPainter.d.ts:48

Get height

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getHeight`](../interfaces/IPainter.md#getheight)

***

### getRootGroup()

> **getRootGroup**(): `SVGGElement`

Defined in: render/dist/painter/SVGPainter.d.ts:40

Get root group

#### Returns

`SVGGElement`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getRootGroup`](../interfaces/IPainter.md#getrootgroup)

***

### getSVG()

> **getSVG**(): `SVGSVGElement`

Defined in: render/dist/painter/SVGPainter.d.ts:36

Get SVG element

#### Returns

`SVGSVGElement`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getSVG`](../interfaces/IPainter.md#getsvg)

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/painter/SVGPainter.d.ts:44

Get width

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getWidth`](../interfaces/IPainter.md#getwidth)

***

### markDirty()

> **markDirty**(): `void`

Defined in: render/dist/painter/SVGPainter.d.ts:52

Mark as dirty (needs repaint)

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`markDirty`](../interfaces/IPainter.md#markdirty)

***

### paint()

> **paint**(): `void`

Defined in: render/dist/painter/SVGPainter.d.ts:56

Paint all elements

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`paint`](../interfaces/IPainter.md#paint)

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: render/dist/painter/SVGPainter.d.ts:32

Resize SVG

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`resize`](../interfaces/IPainter.md#resize)
