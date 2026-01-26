[**HudX API**](../../../README.md)

***

# Class: ChartElement

Defined in: [render/src/ChartElement.ts:19](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L19)

## Extends

- [`Eventful`](Eventful.md)

## Extended by

- [`Group`](Group.md)
- [`Circle`](Circle.md)
- [`Rect`](Rect.md)
- [`Line`](Line.md)
- [`Path`](Path.md)
- [`Text`](Text.md)
- [`Polygon`](Polygon.md)
- [`Polyline`](Polyline.md)
- [`Arc`](Arc.md)
- [`BezierCurve`](BezierCurve.md)
- [`Sector`](Sector.md)
- [`Image`](Image.md)

## Constructors

### Constructor

> **new ChartElement**(`opts`): `ChartElement`

Defined in: [render/src/ChartElement.ts:54](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L54)

#### Parameters

##### opts

[`ElementOption`](../interfaces/ElementOption.md) = `{}`

#### Returns

`ChartElement`

#### Overrides

[`Eventful`](Eventful.md).[`constructor`](Eventful.md#constructor)

## Properties

### \_\_parent?

> `optional` **\_\_parent**: `ChartElement`

Defined in: [render/src/ChartElement.ts:49](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L49)

Parent container

***

### cursor

> **cursor**: `string` = `'default'`

Defined in: [render/src/ChartElement.ts:35](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L35)

Mouse cursor style

***

### data?

> `optional` **data**: `any`

Defined in: [render/src/ChartElement.ts:25](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L25)

User data

***

### draggable

> **draggable**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:37](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L37)

Whether the element is draggable

***

### id

> **id**: `string`

Defined in: [render/src/ChartElement.ts:21](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L21)

Unique ID

***

### invisible

> **invisible**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:33](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L33)

Whether the element is invisible

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/ChartElement.ts:23](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L23)

Element name

***

### progressive

> **progressive**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:39](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L39)

Whether to render progressively

***

### shape

> **shape**: `unknown` = `{}`

Defined in: [render/src/ChartElement.ts:44](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L44)

Shape properties

***

### silent

> **silent**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:31](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L31)

Whether to ignore mouse events

***

### style

> **style**: [`Style`](../interfaces/Style.md) = `{}`

Defined in: [render/src/ChartElement.ts:42](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L42)

Element style

***

### transform

> **transform**: [`Transform`](../interfaces/Transform.md) = `{}`

Defined in: [render/src/ChartElement.ts:46](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L46)

Transform properties

***

### z

> **z**: `number` = `0`

Defined in: [render/src/ChartElement.ts:29](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L29)

Element stacking order within same layer

***

### zlevel

> **zlevel**: `number` = `0`

Defined in: [render/src/ChartElement.ts:27](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L27)

Layer index (z-index equivalent)

## Methods

### attr()

> **attr**(`key`, `value?`): `any`

Defined in: [render/src/ChartElement.ts:81](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L81)

#### Parameters

##### key

`string` | `Record`\<`string`, `any`\> | `Record`\<`string`, `unknown`\>

##### value?

`unknown`

#### Returns

`any`

***

### clearDirty()

> **clearDirty**(): `void`

Defined in: [render/src/ChartElement.ts:149](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L149)

#### Returns

`void`

***

### contain()

> **contain**(`x`, `y`): `boolean`

Defined in: [render/src/ChartElement.ts:157](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L157)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`boolean`

***

### getBoundingRect()

> **getBoundingRect**(): [`BoundingRect`](../interfaces/BoundingRect.md)

Defined in: [render/src/ChartElement.ts:153](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L153)

#### Returns

[`BoundingRect`](../interfaces/BoundingRect.md)

***

### getClipPath()

> **getClipPath**(): `ChartElement` \| `undefined`

Defined in: [render/src/ChartElement.ts:368](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L368)

#### Returns

`ChartElement` \| `undefined`

***

### getGlobalTransform()

> **getGlobalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: [render/src/ChartElement.ts:205](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L205)

Get global transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

***

### getLocalTransform()

> **getLocalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: [render/src/ChartElement.ts:181](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L181)

Get local transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: [render/src/ChartElement.ts:145](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L145)

#### Returns

`boolean`

***

### isSilent()

> **isSilent**(`event?`): `boolean`

Defined in: [render/src/mixin/Eventful.ts:72](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/mixin/Eventful.ts#L72)

Check if event has listeners

#### Parameters

##### event?

`string`

#### Returns

`boolean`

#### Inherited from

[`Eventful`](Eventful.md).[`isSilent`](Eventful.md#issilent)

***

### markRedraw()

> **markRedraw**(): `void`

Defined in: [render/src/ChartElement.ts:135](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L135)

#### Returns

`void`

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: [render/src/mixin/Eventful.ts:24](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/mixin/Eventful.ts#L24)

Remove event listener

#### Parameters

##### event?

`string`

##### handler?

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

#### Inherited from

[`Eventful`](Eventful.md).[`off`](Eventful.md#off)

***

### on()

> **on**(`event`, `handler`): `this`

Defined in: [render/src/mixin/Eventful.ts:13](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/mixin/Eventful.ts#L13)

Add event listener

#### Parameters

##### event

`string`

##### handler

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

#### Inherited from

[`Eventful`](Eventful.md).[`on`](Eventful.md#on)

***

### render()

> **render**(`_ctx`): `void`

Defined in: [render/src/ChartElement.ts:174](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L174)

#### Parameters

##### \_ctx

`CanvasRenderingContext2D`

#### Returns

`void`

***

### setClipPath()

> **setClipPath**(`clipPath?`): `this`

Defined in: [render/src/ChartElement.ts:372](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L372)

#### Parameters

##### clipPath?

`ChartElement`

#### Returns

`this`

***

### transformPointToLocal()

> **transformPointToLocal**(`x`, `y`): \[`number`, `number`\] \| `null`

Defined in: [render/src/ChartElement.ts:219](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L219)

Transform global point to local coordinate space

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

\[`number`, `number`\] \| `null`

***

### trigger()

> **trigger**(`event`, `eventData?`): `this`

Defined in: [render/src/mixin/Eventful.ts:52](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/mixin/Eventful.ts#L52)

Trigger event

#### Parameters

##### event

`string`

##### eventData?

`Record`\<`string`, `any`\>

#### Returns

`this`

#### Inherited from

[`Eventful`](Eventful.md).[`trigger`](Eventful.md#trigger)
