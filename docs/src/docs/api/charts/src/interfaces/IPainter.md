[**HudX API**](../../../README.md)

***

# Interface: IPainter

Defined in: render/dist/painter/IPainter.d.ts:6

## Methods

### dispose()

> **dispose**(): `void`

Defined in: render/dist/painter/IPainter.d.ts:12

#### Returns

`void`

***

### getCanvas()?

> `optional` **getCanvas**(): `HTMLCanvasElement`

Defined in: render/dist/painter/IPainter.d.ts:14

#### Returns

`HTMLCanvasElement`

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: render/dist/painter/IPainter.d.ts:13

#### Parameters

##### opts?

[`DataURLOpts`](DataURLOpts.md)

#### Returns

`string`

***

### getHeight()

> **getHeight**(): `number`

Defined in: render/dist/painter/IPainter.d.ts:9

#### Returns

`number`

***

### getRootGroup()?

> `optional` **getRootGroup**(): `SVGGElement`

Defined in: render/dist/painter/IPainter.d.ts:16

#### Returns

`SVGGElement`

***

### getSVG()?

> `optional` **getSVG**(): `SVGSVGElement`

Defined in: render/dist/painter/IPainter.d.ts:15

#### Returns

`SVGSVGElement`

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/painter/IPainter.d.ts:8

#### Returns

`number`

***

### markDirty()

> **markDirty**(): `void`

Defined in: render/dist/painter/IPainter.d.ts:10

#### Returns

`void`

***

### paint()

> **paint**(): `void`

Defined in: render/dist/painter/IPainter.d.ts:11

#### Returns

`void`

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: render/dist/painter/IPainter.d.ts:7

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`void`
