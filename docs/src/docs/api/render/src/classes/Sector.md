[**HudX API**](../../../README.md)

***

# Class: Sector

Defined in: [render/src/graphic/Sector.ts:18](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/graphic/Sector.ts#L18)

## Extends

- [`ChartElement`](ChartElement.md)

## Constructors

### Constructor

> **new Sector**(`opts`): `Sector`

Defined in: [render/src/graphic/Sector.ts:21](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/graphic/Sector.ts#L21)

#### Parameters

##### opts

[`ElementOption`](../interfaces/ElementOption.md) & `object`

#### Returns

`Sector`

#### Overrides

[`ChartElement`](ChartElement.md).[`constructor`](ChartElement.md#constructor)

## Properties

### \_\_parent?

> `optional` **\_\_parent**: [`ChartElement`](ChartElement.md)

Defined in: [render/src/ChartElement.ts:49](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L49)

Parent container

#### Inherited from

[`ChartElement`](ChartElement.md).[`__parent`](ChartElement.md#__parent)

***

### cursor

> **cursor**: `string` = `'default'`

Defined in: [render/src/ChartElement.ts:35](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L35)

Mouse cursor style

#### Inherited from

[`ChartElement`](ChartElement.md).[`cursor`](ChartElement.md#cursor)

***

### data?

> `optional` **data**: `any`

Defined in: [render/src/ChartElement.ts:25](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L25)

User data

#### Inherited from

[`ChartElement`](ChartElement.md).[`data`](ChartElement.md#data)

***

### draggable

> **draggable**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:37](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L37)

Whether the element is draggable

#### Inherited from

[`ChartElement`](ChartElement.md).[`draggable`](ChartElement.md#draggable)

***

### id

> **id**: `string`

Defined in: [render/src/ChartElement.ts:21](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L21)

Unique ID

#### Inherited from

[`ChartElement`](ChartElement.md).[`id`](ChartElement.md#id)

***

### invisible

> **invisible**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:33](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L33)

Whether the element is invisible

#### Inherited from

[`ChartElement`](ChartElement.md).[`invisible`](ChartElement.md#invisible)

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/ChartElement.ts:23](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L23)

Element name

#### Inherited from

[`ChartElement`](ChartElement.md).[`name`](ChartElement.md#name)

***

### progressive

> **progressive**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:39](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L39)

Whether to render progressively

#### Inherited from

[`ChartElement`](ChartElement.md).[`progressive`](ChartElement.md#progressive)

***

### shape

> **shape**: [`SectorShape`](../interfaces/SectorShape.md)

Defined in: [render/src/graphic/Sector.ts:19](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/graphic/Sector.ts#L19)

Shape properties

#### Overrides

[`ChartElement`](ChartElement.md).[`shape`](ChartElement.md#shape)

***

### silent

> **silent**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:31](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L31)

Whether to ignore mouse events

#### Inherited from

[`ChartElement`](ChartElement.md).[`silent`](ChartElement.md#silent)

***

### style

> **style**: [`Style`](../interfaces/Style.md) = `{}`

Defined in: [render/src/ChartElement.ts:42](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L42)

Element style

#### Inherited from

[`ChartElement`](ChartElement.md).[`style`](ChartElement.md#style)

***

### transform

> **transform**: [`Transform`](../interfaces/Transform.md) = `{}`

Defined in: [render/src/ChartElement.ts:46](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L46)

Transform properties

#### Inherited from

[`ChartElement`](ChartElement.md).[`transform`](ChartElement.md#transform)

***

### z

> **z**: `number` = `0`

Defined in: [render/src/ChartElement.ts:29](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L29)

Element stacking order within same layer

#### Inherited from

[`ChartElement`](ChartElement.md).[`z`](ChartElement.md#z)

***

### zlevel

> **zlevel**: `number` = `0`

Defined in: [render/src/ChartElement.ts:27](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L27)

Layer index (z-index equivalent)

#### Inherited from

[`ChartElement`](ChartElement.md).[`zlevel`](ChartElement.md#zlevel)

## Methods

### attr()

> **attr**(`key`, `value?`): `any`

Defined in: [render/src/ChartElement.ts:81](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L81)

#### Parameters

##### key

`string` | `Record`\<`string`, `any`\> | `Record`\<`string`, `unknown`\>

##### value?

`unknown`

#### Returns

`any`

#### Inherited from

[`ChartElement`](ChartElement.md).[`attr`](ChartElement.md#attr)

***

### clearDirty()

> **clearDirty**(): `void`

Defined in: [render/src/ChartElement.ts:149](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L149)

#### Returns

`void`

#### Inherited from

[`ChartElement`](ChartElement.md).[`clearDirty`](ChartElement.md#cleardirty)

***

### contain()

> **contain**(`x`, `y`): `boolean`

Defined in: [render/src/graphic/Sector.ts:40](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/graphic/Sector.ts#L40)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`boolean`

#### Overrides

[`ChartElement`](ChartElement.md).[`contain`](ChartElement.md#contain)

***

### getBoundingRect()

> **getBoundingRect**(): [`BoundingRect`](../interfaces/BoundingRect.md)

Defined in: [render/src/graphic/Sector.ts:26](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/graphic/Sector.ts#L26)

#### Returns

[`BoundingRect`](../interfaces/BoundingRect.md)

#### Overrides

[`ChartElement`](ChartElement.md).[`getBoundingRect`](ChartElement.md#getboundingrect)

***

### getClipPath()

> **getClipPath**(): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: [render/src/ChartElement.ts:368](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L368)

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

#### Inherited from

[`ChartElement`](ChartElement.md).[`getClipPath`](ChartElement.md#getclippath)

***

### getGlobalTransform()

> **getGlobalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: [render/src/ChartElement.ts:205](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L205)

Get global transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`ChartElement`](ChartElement.md).[`getGlobalTransform`](ChartElement.md#getglobaltransform)

***

### getLocalTransform()

> **getLocalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: [render/src/ChartElement.ts:181](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L181)

Get local transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`ChartElement`](ChartElement.md).[`getLocalTransform`](ChartElement.md#getlocaltransform)

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: [render/src/ChartElement.ts:145](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L145)

#### Returns

`boolean`

#### Inherited from

[`ChartElement`](ChartElement.md).[`isDirty`](ChartElement.md#isdirty)

***

### isSilent()

> **isSilent**(`event?`): `boolean`

Defined in: [render/src/mixin/Eventful.ts:72](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L72)

Check if event has listeners

#### Parameters

##### event?

`string`

#### Returns

`boolean`

#### Inherited from

[`ChartElement`](ChartElement.md).[`isSilent`](ChartElement.md#issilent)

***

### markRedraw()

> **markRedraw**(): `void`

Defined in: [render/src/ChartElement.ts:135](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L135)

#### Returns

`void`

#### Inherited from

[`ChartElement`](ChartElement.md).[`markRedraw`](ChartElement.md#markredraw)

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: [render/src/mixin/Eventful.ts:24](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L24)

Remove event listener

#### Parameters

##### event?

`string`

##### handler?

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

#### Inherited from

[`ChartElement`](ChartElement.md).[`off`](ChartElement.md#off)

***

### on()

> **on**(`event`, `handler`): `this`

Defined in: [render/src/mixin/Eventful.ts:13](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L13)

Add event listener

#### Parameters

##### event

`string`

##### handler

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

#### Inherited from

[`ChartElement`](ChartElement.md).[`on`](ChartElement.md#on)

***

### render()

> **render**(`ctx`): `void`

Defined in: [render/src/graphic/Sector.ts:88](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/graphic/Sector.ts#L88)

#### Parameters

##### ctx

`CanvasRenderingContext2D`

#### Returns

`void`

#### Overrides

[`ChartElement`](ChartElement.md).[`render`](ChartElement.md#render)

***

### setClipPath()

> **setClipPath**(`clipPath?`): `this`

Defined in: [render/src/ChartElement.ts:372](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L372)

#### Parameters

##### clipPath?

[`ChartElement`](ChartElement.md)

#### Returns

`this`

#### Inherited from

[`ChartElement`](ChartElement.md).[`setClipPath`](ChartElement.md#setclippath)

***

### transformPointToLocal()

> **transformPointToLocal**(`x`, `y`): \[`number`, `number`\] \| `null`

Defined in: [render/src/ChartElement.ts:219](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/ChartElement.ts#L219)

Transform global point to local coordinate space

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

\[`number`, `number`\] \| `null`

#### Inherited from

[`ChartElement`](ChartElement.md).[`transformPointToLocal`](ChartElement.md#transformpointtolocal)

***

### trigger()

> **trigger**(`event`, `eventData?`): `this`

Defined in: [render/src/mixin/Eventful.ts:52](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L52)

Trigger event

#### Parameters

##### event

`string`

##### eventData?

`Record`\<`string`, `any`\>

#### Returns

`this`

#### Inherited from

[`ChartElement`](ChartElement.md).[`trigger`](ChartElement.md#trigger)
