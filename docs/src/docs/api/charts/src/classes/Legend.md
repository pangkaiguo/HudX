[**HudX API**](../../../README.md)

***

# Class: Legend

Defined in: render/dist/component/Legend.d.ts:58

## Extends

- [`Group`](Group.md)

## Constructors

### Constructor

> **new Legend**(`option?`): `Legend`

Defined in: render/dist/component/Legend.d.ts:67

#### Parameters

##### option?

`LegendOption`

#### Returns

`Legend`

#### Overrides

[`Group`](Group.md).[`constructor`](Group.md#constructor)

## Properties

### \_\_parent?

> `optional` **\_\_parent**: [`ChartElement`](ChartElement.md)

Defined in: render/dist/ChartElement.d.ts:35

Parent container

#### Inherited from

[`Group`](Group.md).[`__parent`](Group.md#__parent)

***

### cursor

> **cursor**: `string`

Defined in: render/dist/ChartElement.d.ts:23

Mouse cursor style

#### Inherited from

[`Group`](Group.md).[`cursor`](Group.md#cursor)

***

### data?

> `optional` **data**: `any`

Defined in: render/dist/ChartElement.d.ts:13

User data

#### Inherited from

[`Group`](Group.md).[`data`](Group.md#data)

***

### draggable

> **draggable**: `boolean`

Defined in: render/dist/ChartElement.d.ts:25

Whether the element is draggable

#### Inherited from

[`Group`](Group.md).[`draggable`](Group.md#draggable)

***

### id

> **id**: `string`

Defined in: render/dist/ChartElement.d.ts:9

Unique ID

#### Inherited from

[`Group`](Group.md).[`id`](Group.md#id)

***

### invisible

> **invisible**: `boolean`

Defined in: render/dist/ChartElement.d.ts:21

Whether the element is invisible

#### Inherited from

[`Group`](Group.md).[`invisible`](Group.md#invisible)

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/ChartElement.d.ts:11

Element name

#### Inherited from

[`Group`](Group.md).[`name`](Group.md#name)

***

### progressive

> **progressive**: `boolean`

Defined in: render/dist/ChartElement.d.ts:27

Whether to render progressively

#### Inherited from

[`Group`](Group.md).[`progressive`](Group.md#progressive)

***

### shape

> **shape**: `unknown`

Defined in: render/dist/ChartElement.d.ts:31

Shape properties

#### Inherited from

[`Group`](Group.md).[`shape`](Group.md#shape)

***

### silent

> **silent**: `boolean`

Defined in: render/dist/ChartElement.d.ts:19

Whether to ignore mouse events

#### Inherited from

[`Group`](Group.md).[`silent`](Group.md#silent)

***

### style

> **style**: [`Style`](../interfaces/Style.md)

Defined in: render/dist/ChartElement.d.ts:29

Element style

#### Inherited from

[`Group`](Group.md).[`style`](Group.md#style)

***

### transform

> **transform**: [`Transform`](../interfaces/Transform.md)

Defined in: render/dist/ChartElement.d.ts:33

Transform properties

#### Inherited from

[`Group`](Group.md).[`transform`](Group.md#transform)

***

### z

> **z**: `number`

Defined in: render/dist/ChartElement.d.ts:17

Element stacking order within same layer

#### Inherited from

[`Group`](Group.md).[`z`](Group.md#z)

***

### zlevel

> **zlevel**: `number`

Defined in: render/dist/ChartElement.d.ts:15

Layer index (z-index equivalent)

#### Inherited from

[`Group`](Group.md).[`zlevel`](Group.md#zlevel)

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

#### Inherited from

[`Group`](Group.md).[`add`](Group.md#add)

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

[`Group`](Group.md).[`attr`](Group.md#attr)

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

#### Inherited from

[`Group`](Group.md).[`childAt`](Group.md#childat)

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

#### Inherited from

[`Group`](Group.md).[`childOfName`](Group.md#childofname)

***

### children()

> **children**(): [`ChartElement`](ChartElement.md)[]

Defined in: render/dist/Group.d.ts:32

Get all children

#### Returns

[`ChartElement`](ChartElement.md)[]

#### Inherited from

[`Group`](Group.md).[`children`](Group.md#children)

***

### childrenCount()

> **childrenCount**(): `number`

Defined in: render/dist/Group.d.ts:36

Get children count

#### Returns

`number`

#### Inherited from

[`Group`](Group.md).[`childrenCount`](Group.md#childrencount)

***

### clearDirty()

> **clearDirty**(): `void`

Defined in: render/dist/ChartElement.d.ts:43

#### Returns

`void`

#### Inherited from

[`Group`](Group.md).[`clearDirty`](Group.md#cleardirty)

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

#### Inherited from

[`Group`](Group.md).[`contain`](Group.md#contain)

***

### dispose()

> **dispose**(): `void`

Defined in: render/dist/component/Legend.d.ts:73

#### Returns

`void`

***

### getBoundingRect()

> **getBoundingRect**(): [`BoundingRect`](../interfaces/BoundingRect.md)

Defined in: render/dist/Group.d.ts:44

Get bounding rect (union of all children)

#### Returns

[`BoundingRect`](../interfaces/BoundingRect.md)

#### Inherited from

[`Group`](Group.md).[`getBoundingRect`](Group.md#getboundingrect)

***

### getClipPath()

> **getClipPath**(): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: render/dist/ChartElement.d.ts:62

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

#### Inherited from

[`Group`](Group.md).[`getClipPath`](Group.md#getclippath)

***

### getGlobalTransform()

> **getGlobalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: render/dist/ChartElement.d.ts:54

Get global transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`Group`](Group.md).[`getGlobalTransform`](Group.md#getglobaltransform)

***

### getLocalTransform()

> **getLocalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: render/dist/ChartElement.d.ts:50

Get local transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`Group`](Group.md).[`getLocalTransform`](Group.md#getlocaltransform)

***

### getSelected()

> **getSelected**(): `string`[]

Defined in: render/dist/component/Legend.d.ts:72

#### Returns

`string`[]

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: render/dist/ChartElement.d.ts:42

#### Returns

`boolean`

#### Inherited from

[`Group`](Group.md).[`isDirty`](Group.md#isdirty)

***

### isSelected()

> **isSelected**(`name`): `boolean`

Defined in: render/dist/component/Legend.d.ts:71

#### Parameters

##### name

`string`

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

[`Group`](Group.md).[`isSilent`](Group.md#issilent)

***

### markRedraw()

> **markRedraw**(): `void`

Defined in: render/dist/ChartElement.d.ts:41

#### Returns

`void`

#### Inherited from

[`Group`](Group.md).[`markRedraw`](Group.md#markredraw)

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

[`Group`](Group.md).[`off`](Group.md#off)

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

[`Group`](Group.md).[`on`](Group.md#on)

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

#### Inherited from

[`Group`](Group.md).[`remove`](Group.md#remove)

***

### removeAll()

> **removeAll**(): `this`

Defined in: render/dist/Group.d.ts:20

Remove all children

#### Returns

`this`

#### Inherited from

[`Group`](Group.md).[`removeAll`](Group.md#removeall)

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

#### Inherited from

[`Group`](Group.md).[`render`](Group.md#render)

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

[`Group`](Group.md).[`setClipPath`](Group.md#setclippath)

***

### setContainer()

> **setContainer**(`width`, `height`): `void`

Defined in: render/dist/component/Legend.d.ts:69

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### setDomContainer()

> **setDomContainer**(`container`): `void`

Defined in: render/dist/component/Legend.d.ts:70

#### Parameters

##### container

`HTMLElement`

#### Returns

`void`

***

### setItems()

> **setItems**(`items`, `selected?`): `void`

Defined in: render/dist/component/Legend.d.ts:68

#### Parameters

##### items

`LegendItem`[]

##### selected?

`string`[]

#### Returns

`void`

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

[`Group`](Group.md).[`transformPointToLocal`](Group.md#transformpointtolocal)

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

#### Inherited from

[`Group`](Group.md).[`traverse`](Group.md#traverse)

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

[`Group`](Group.md).[`trigger`](Group.md#trigger)
