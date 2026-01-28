[**HudX API**](../../../README.md)

***

# Interface: IPainter

Defined in: [render/src/painter/IPainter.ts:8](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L8)

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [render/src/painter/IPainter.ts:14](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L14)

#### Returns

`void`

***

### getCanvas()?

> `optional` **getCanvas**(): `HTMLCanvasElement`

Defined in: [render/src/painter/IPainter.ts:16](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L16)

#### Returns

`HTMLCanvasElement`

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: [render/src/painter/IPainter.ts:15](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L15)

#### Parameters

##### opts?

[`DataURLOpts`](DataURLOpts.md)

#### Returns

`string`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [render/src/painter/IPainter.ts:11](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L11)

#### Returns

`number`

***

### getRootGroup()?

> `optional` **getRootGroup**(): `SVGGElement`

Defined in: [render/src/painter/IPainter.ts:18](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L18)

#### Returns

`SVGGElement`

***

### getSVG()?

> `optional` **getSVG**(): `SVGSVGElement`

Defined in: [render/src/painter/IPainter.ts:17](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L17)

#### Returns

`SVGSVGElement`

***

### getWidth()

> **getWidth**(): `number`

Defined in: [render/src/painter/IPainter.ts:10](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L10)

#### Returns

`number`

***

### markDirty()

> **markDirty**(): `void`

Defined in: [render/src/painter/IPainter.ts:12](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L12)

#### Returns

`void`

***

### paint()

> **paint**(): `void`

Defined in: [render/src/painter/IPainter.ts:13](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L13)

#### Returns

`void`

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: [render/src/painter/IPainter.ts:9](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/painter/IPainter.ts#L9)

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`void`
