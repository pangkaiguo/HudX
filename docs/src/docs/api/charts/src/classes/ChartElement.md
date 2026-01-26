[**HudX API**](../../../README.md)

***

# Class: ChartElement

Defined in: render/dist/ChartElement.d.ts:7

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

> **new ChartElement**(`opts?`): `ChartElement`

Defined in: render/dist/ChartElement.d.ts:38

#### Parameters

##### opts?

[`ElementOption`](../interfaces/ElementOption.md)

#### Returns

`ChartElement`

#### Overrides

[`Eventful`](Eventful.md).[`constructor`](Eventful.md#constructor)

## Properties

### \_\_parent?

> `optional` **\_\_parent**: `ChartElement`

Defined in: render/dist/ChartElement.d.ts:35

Parent container

***

### cursor

> **cursor**: `string`

Defined in: render/dist/ChartElement.d.ts:23

Mouse cursor style

***

### data?

> `optional` **data**: `any`

Defined in: render/dist/ChartElement.d.ts:13

User data

***

### draggable

> **draggable**: `boolean`

Defined in: render/dist/ChartElement.d.ts:25

Whether the element is draggable

***

### id

> **id**: `string`

Defined in: render/dist/ChartElement.d.ts:9

Unique ID

***

### invisible

> **invisible**: `boolean`

Defined in: render/dist/ChartElement.d.ts:21

Whether the element is invisible

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/ChartElement.d.ts:11

Element name

***

### progressive

> **progressive**: `boolean`

Defined in: render/dist/ChartElement.d.ts:27

Whether to render progressively

***

### shape

> **shape**: `unknown`

Defined in: render/dist/ChartElement.d.ts:31

Shape properties

***

### silent

> **silent**: `boolean`

Defined in: render/dist/ChartElement.d.ts:19

Whether to ignore mouse events

***

### style

> **style**: [`Style`](../interfaces/Style.md)

Defined in: render/dist/ChartElement.d.ts:29

Element style

***

### transform

> **transform**: [`Transform`](../interfaces/Transform.md)

Defined in: render/dist/ChartElement.d.ts:33

Transform properties

***

### z

> **z**: `number`

Defined in: render/dist/ChartElement.d.ts:17

Element stacking order within same layer

***

### zlevel

> **zlevel**: `number`

Defined in: render/dist/ChartElement.d.ts:15

Layer index (z-index equivalent)

## Methods

### attr()

> **attr**(`key`, `value?`): `any`

Defined in: render/dist/ChartElement.d.ts:39

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

Defined in: render/dist/ChartElement.d.ts:43

#### Returns

`void`

***

### contain()

> **contain**(`x`, `y`): `boolean`

Defined in: render/dist/ChartElement.d.ts:45

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

Defined in: render/dist/ChartElement.d.ts:44

#### Returns

[`BoundingRect`](../interfaces/BoundingRect.md)

***

### getClipPath()

> **getClipPath**(): `ChartElement` \| `undefined`

Defined in: render/dist/ChartElement.d.ts:62

#### Returns

`ChartElement` \| `undefined`

***

### getGlobalTransform()

> **getGlobalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: render/dist/ChartElement.d.ts:54

Get global transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

***

### getLocalTransform()

> **getLocalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: render/dist/ChartElement.d.ts:50

Get local transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: render/dist/ChartElement.d.ts:42

#### Returns

`boolean`

***

### isSilent()

> **isSilent**(`event?`): `boolean`

Defined in: render/dist/mixin/Eventful.d.ts:22

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

Defined in: render/dist/ChartElement.d.ts:41

#### Returns

`void`

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: render/dist/mixin/Eventful.d.ts:14

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

Defined in: render/dist/mixin/Eventful.d.ts:10

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

Defined in: render/dist/ChartElement.d.ts:46

#### Parameters

##### \_ctx

`CanvasRenderingContext2D`

#### Returns

`void`

***

### setClipPath()

> **setClipPath**(`clipPath?`): `this`

Defined in: render/dist/ChartElement.d.ts:63

#### Parameters

##### clipPath?

`ChartElement`

#### Returns

`this`

***

### transformPointToLocal()

> **transformPointToLocal**(`x`, `y`): \[`number`, `number`\] \| `null`

Defined in: render/dist/ChartElement.d.ts:58

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

Defined in: render/dist/mixin/Eventful.d.ts:18

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
