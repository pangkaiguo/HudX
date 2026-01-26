[**HudX API**](../../../README.md)

***

# Class: Group

Defined in: render/dist/Group.d.ts:6

## Extends

- [`ChartElement`](ChartElement.md)

## Extended by

- [`Legend`](Legend.md)
- [`Title`](Title.md)

## Constructors

### Constructor

> **new Group**(`opts?`): `Group`

Defined in: render/dist/Group.d.ts:8

#### Parameters

##### opts?

[`ElementOption`](../interfaces/ElementOption.md)

#### Returns

`Group`

#### Overrides

[`ChartElement`](ChartElement.md).[`constructor`](ChartElement.md#constructor)

## Properties

### \_\_parent?

> `optional` **\_\_parent**: [`ChartElement`](ChartElement.md)

Defined in: render/dist/ChartElement.d.ts:35

Parent container

#### Inherited from

[`ChartElement`](ChartElement.md).[`__parent`](ChartElement.md#__parent)

***

### cursor

> **cursor**: `string`

Defined in: render/dist/ChartElement.d.ts:23

Mouse cursor style

#### Inherited from

[`ChartElement`](ChartElement.md).[`cursor`](ChartElement.md#cursor)

***

### data?

> `optional` **data**: `any`

Defined in: render/dist/ChartElement.d.ts:13

User data

#### Inherited from

[`ChartElement`](ChartElement.md).[`data`](ChartElement.md#data)

***

### draggable

> **draggable**: `boolean`

Defined in: render/dist/ChartElement.d.ts:25

Whether the element is draggable

#### Inherited from

[`ChartElement`](ChartElement.md).[`draggable`](ChartElement.md#draggable)

***

### id

> **id**: `string`

Defined in: render/dist/ChartElement.d.ts:9

Unique ID

#### Inherited from

[`ChartElement`](ChartElement.md).[`id`](ChartElement.md#id)

***

### invisible

> **invisible**: `boolean`

Defined in: render/dist/ChartElement.d.ts:21

Whether the element is invisible

#### Inherited from

[`ChartElement`](ChartElement.md).[`invisible`](ChartElement.md#invisible)

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/ChartElement.d.ts:11

Element name

#### Inherited from

[`ChartElement`](ChartElement.md).[`name`](ChartElement.md#name)

***

### progressive

> **progressive**: `boolean`

Defined in: render/dist/ChartElement.d.ts:27

Whether to render progressively

#### Inherited from

[`ChartElement`](ChartElement.md).[`progressive`](ChartElement.md#progressive)

***

### shape

> **shape**: `unknown`

Defined in: render/dist/ChartElement.d.ts:31

Shape properties

#### Inherited from

[`ChartElement`](ChartElement.md).[`shape`](ChartElement.md#shape)

***

### silent

> **silent**: `boolean`

Defined in: render/dist/ChartElement.d.ts:19

Whether to ignore mouse events

#### Inherited from

[`ChartElement`](ChartElement.md).[`silent`](ChartElement.md#silent)

***

### style

> **style**: [`Style`](../interfaces/Style.md)

Defined in: render/dist/ChartElement.d.ts:29

Element style

#### Inherited from

[`ChartElement`](ChartElement.md).[`style`](ChartElement.md#style)

***

### transform

> **transform**: [`Transform`](../interfaces/Transform.md)

Defined in: render/dist/ChartElement.d.ts:33

Transform properties

#### Inherited from

[`ChartElement`](ChartElement.md).[`transform`](ChartElement.md#transform)

***

### z

> **z**: `number`

Defined in: render/dist/ChartElement.d.ts:17

Element stacking order within same layer

#### Inherited from

[`ChartElement`](ChartElement.md).[`z`](ChartElement.md#z)

***

### zlevel

> **zlevel**: `number`

Defined in: render/dist/ChartElement.d.ts:15

Layer index (z-index equivalent)

#### Inherited from

[`ChartElement`](ChartElement.md).[`zlevel`](ChartElement.md#zlevel)

## Methods

### add()

> **add**(`child`): `this`

Defined in: render/dist/Group.d.ts:12

Add child element

#### Parameters

##### child

[`ChartElement`](ChartElement.md)

#### Returns

`this`

***

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

#### Inherited from

[`ChartElement`](ChartElement.md).[`attr`](ChartElement.md#attr)

***

### childAt()

> **childAt**(`index`): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: render/dist/Group.d.ts:24

Get child at index

#### Parameters

##### index

`number`

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

***

### childOfName()

> **childOfName**(`name`): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: render/dist/Group.d.ts:28

Get child by ID

#### Parameters

##### name

`string`

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

***

### children()

> **children**(): [`ChartElement`](ChartElement.md)[]

Defined in: render/dist/Group.d.ts:32

Get all children

#### Returns

[`ChartElement`](ChartElement.md)[]

***

### childrenCount()

> **childrenCount**(): `number`

Defined in: render/dist/Group.d.ts:36

Get children count

#### Returns

`number`

***

### clearDirty()

> **clearDirty**(): `void`

Defined in: render/dist/ChartElement.d.ts:43

#### Returns

`void`

#### Inherited from

[`ChartElement`](ChartElement.md).[`clearDirty`](ChartElement.md#cleardirty)

***

### contain()

> **contain**(`x`, `y`): `boolean`

Defined in: render/dist/Group.d.ts:48

Check if point is inside group

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

Defined in: render/dist/Group.d.ts:44

Get bounding rect (union of all children)

#### Returns

[`BoundingRect`](../interfaces/BoundingRect.md)

#### Overrides

[`ChartElement`](ChartElement.md).[`getBoundingRect`](ChartElement.md#getboundingrect)

***

### getClipPath()

> **getClipPath**(): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: render/dist/ChartElement.d.ts:62

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

#### Inherited from

[`ChartElement`](ChartElement.md).[`getClipPath`](ChartElement.md#getclippath)

***

### getGlobalTransform()

> **getGlobalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: render/dist/ChartElement.d.ts:54

Get global transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`ChartElement`](ChartElement.md).[`getGlobalTransform`](ChartElement.md#getglobaltransform)

***

### getLocalTransform()

> **getLocalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: render/dist/ChartElement.d.ts:50

Get local transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`ChartElement`](ChartElement.md).[`getLocalTransform`](ChartElement.md#getlocaltransform)

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: render/dist/ChartElement.d.ts:42

#### Returns

`boolean`

#### Inherited from

[`ChartElement`](ChartElement.md).[`isDirty`](ChartElement.md#isdirty)

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

[`ChartElement`](ChartElement.md).[`isSilent`](ChartElement.md#issilent)

***

### markRedraw()

> **markRedraw**(): `void`

Defined in: render/dist/ChartElement.d.ts:41

#### Returns

`void`

#### Inherited from

[`ChartElement`](ChartElement.md).[`markRedraw`](ChartElement.md#markredraw)

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

[`ChartElement`](ChartElement.md).[`off`](ChartElement.md#off)

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

[`ChartElement`](ChartElement.md).[`on`](ChartElement.md#on)

***

### remove()

> **remove**(`child`): `this`

Defined in: render/dist/Group.d.ts:16

Remove child element

#### Parameters

##### child

[`ChartElement`](ChartElement.md)

#### Returns

`this`

***

### removeAll()

> **removeAll**(): `this`

Defined in: render/dist/Group.d.ts:20

Remove all children

#### Returns

`this`

***

### render()

> **render**(`ctx`): `void`

Defined in: render/dist/Group.d.ts:52

Render group and children

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

Defined in: render/dist/ChartElement.d.ts:63

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

Defined in: render/dist/ChartElement.d.ts:58

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

### traverse()

> **traverse**(`callback`, `includeSelf?`): `void`

Defined in: render/dist/Group.d.ts:40

Traverse children

#### Parameters

##### callback

(`child`) => `boolean` \| `void`

##### includeSelf?

`boolean`

#### Returns

`void`

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

[`ChartElement`](ChartElement.md).[`trigger`](ChartElement.md#trigger)
