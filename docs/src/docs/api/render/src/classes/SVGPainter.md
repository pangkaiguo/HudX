[**HudX API**](../../../README.md)

***

# Class: SVGPainter

Defined in: [render/src/painter/SVGPainter.ts:22](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L22)

## Implements

- [`IPainter`](../interfaces/IPainter.md)

## Constructors

### Constructor

> **new SVGPainter**(`dom`, `storage`): `SVGPainter`

Defined in: [render/src/painter/SVGPainter.ts:37](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L37)

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

Defined in: [render/src/painter/SVGPainter.ts:1328](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L1328)

Dispose SVG painter

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`dispose`](../interfaces/IPainter.md#dispose)

***

### getDataURL()

> **getDataURL**(`opts`): `string`

Defined in: [render/src/painter/SVGPainter.ts:295](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L295)

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

Defined in: [render/src/painter/SVGPainter.ts:101](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L101)

Get height

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getHeight`](../interfaces/IPainter.md#getheight)

***

### getRootGroup()

> **getRootGroup**(): `SVGGElement`

Defined in: [render/src/painter/SVGPainter.ts:87](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L87)

Get root group

#### Returns

`SVGGElement`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getRootGroup`](../interfaces/IPainter.md#getrootgroup)

***

### getSVG()

> **getSVG**(): `SVGSVGElement`

Defined in: [render/src/painter/SVGPainter.ts:80](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L80)

Get SVG element

#### Returns

`SVGSVGElement`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getSVG`](../interfaces/IPainter.md#getsvg)

***

### getWidth()

> **getWidth**(): `number`

Defined in: [render/src/painter/SVGPainter.ts:94](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L94)

Get width

#### Returns

`number`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`getWidth`](../interfaces/IPainter.md#getwidth)

***

### markDirty()

> **markDirty**(): `void`

Defined in: [render/src/painter/SVGPainter.ts:108](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L108)

Mark as dirty (needs repaint)

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`markDirty`](../interfaces/IPainter.md#markdirty)

***

### paint()

> **paint**(): `void`

Defined in: [render/src/painter/SVGPainter.ts:118](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L118)

Paint all elements

#### Returns

`void`

#### Implementation of

[`IPainter`](../interfaces/IPainter.md).[`paint`](../interfaces/IPainter.md#paint)

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: [render/src/painter/SVGPainter.ts:66](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/painter/SVGPainter.ts#L66)

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
