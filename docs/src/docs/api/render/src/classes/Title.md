[**HudX API**](../../../README.md)

***

# Class: Title

Defined in: [render/src/component/Title.ts:12](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/component/Title.ts#L12)

## Extends

- [`Group`](Group.md)

## Constructors

### Constructor

> **new Title**(`option`): `Title`

Defined in: [render/src/component/Title.ts:17](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/component/Title.ts#L17)

#### Parameters

##### option

[`TitleOption`](../interfaces/TitleOption.md) = `{}`

#### Returns

`Title`

#### Overrides

[`Group`](Group.md).[`constructor`](Group.md#constructor)

## Properties

### \_\_parent?

> `optional` **\_\_parent**: [`ChartElement`](ChartElement.md)

Defined in: [render/src/ChartElement.ts:49](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L49)

Parent container

#### Inherited from

[`Group`](Group.md).[`__parent`](Group.md#__parent)

***

### cursor

> **cursor**: `string` = `'default'`

Defined in: [render/src/ChartElement.ts:35](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L35)

Mouse cursor style

#### Inherited from

[`Group`](Group.md).[`cursor`](Group.md#cursor)

***

### data?

> `optional` **data**: `any`

Defined in: [render/src/ChartElement.ts:25](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L25)

User data

#### Inherited from

[`Group`](Group.md).[`data`](Group.md#data)

***

### draggable

> **draggable**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:37](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L37)

Whether the element is draggable

#### Inherited from

[`Group`](Group.md).[`draggable`](Group.md#draggable)

***

### id

> **id**: `string`

Defined in: [render/src/ChartElement.ts:21](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L21)

Unique ID

#### Inherited from

[`Group`](Group.md).[`id`](Group.md#id)

***

### invisible

> **invisible**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:33](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L33)

Whether the element is invisible

#### Inherited from

[`Group`](Group.md).[`invisible`](Group.md#invisible)

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/ChartElement.ts:23](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L23)

Element name

#### Inherited from

[`Group`](Group.md).[`name`](Group.md#name)

***

### progressive

> **progressive**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:39](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L39)

Whether to render progressively

#### Inherited from

[`Group`](Group.md).[`progressive`](Group.md#progressive)

***

### shape

> **shape**: `unknown` = `{}`

Defined in: [render/src/ChartElement.ts:44](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L44)

Shape properties

#### Inherited from

[`Group`](Group.md).[`shape`](Group.md#shape)

***

### silent

> **silent**: `boolean` = `false`

Defined in: [render/src/ChartElement.ts:31](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L31)

Whether to ignore mouse events

#### Inherited from

[`Group`](Group.md).[`silent`](Group.md#silent)

***

### style

> **style**: [`Style`](../interfaces/Style.md) = `{}`

Defined in: [render/src/ChartElement.ts:42](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L42)

Element style

#### Inherited from

[`Group`](Group.md).[`style`](Group.md#style)

***

### transform

> **transform**: [`Transform`](../interfaces/Transform.md) = `{}`

Defined in: [render/src/ChartElement.ts:46](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L46)

Transform properties

#### Inherited from

[`Group`](Group.md).[`transform`](Group.md#transform)

***

### z

> **z**: `number` = `0`

Defined in: [render/src/ChartElement.ts:29](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L29)

Element stacking order within same layer

#### Inherited from

[`Group`](Group.md).[`z`](Group.md#z)

***

### zlevel

> **zlevel**: `number` = `0`

Defined in: [render/src/ChartElement.ts:27](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L27)

Layer index (z-index equivalent)

#### Inherited from

[`Group`](Group.md).[`zlevel`](Group.md#zlevel)

## Methods

### add()

> **add**(`child`): `this`

Defined in: [render/src/Group.ts:18](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L18)

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

Defined in: [render/src/ChartElement.ts:81](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L81)

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

Defined in: [render/src/Group.ts:63](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L63)

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

Defined in: [render/src/Group.ts:70](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L70)

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

Defined in: [render/src/Group.ts:77](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L77)

Get all children

#### Returns

[`ChartElement`](ChartElement.md)[]

#### Inherited from

[`Group`](Group.md).[`children`](Group.md#children)

***

### childrenCount()

> **childrenCount**(): `number`

Defined in: [render/src/Group.ts:84](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L84)

Get children count

#### Returns

`number`

#### Inherited from

[`Group`](Group.md).[`childrenCount`](Group.md#childrencount)

***

### clearDirty()

> **clearDirty**(): `void`

Defined in: [render/src/ChartElement.ts:149](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L149)

#### Returns

`void`

#### Inherited from

[`Group`](Group.md).[`clearDirty`](Group.md#cleardirty)

***

### contain()

> **contain**(`x`, `y`): `boolean`

Defined in: [render/src/Group.ts:146](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L146)

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

### getBoundingRect()

> **getBoundingRect**(): [`BoundingRect`](../interfaces/BoundingRect.md)

Defined in: [render/src/Group.ts:117](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L117)

Get bounding rect (union of all children)

#### Returns

[`BoundingRect`](../interfaces/BoundingRect.md)

#### Inherited from

[`Group`](Group.md).[`getBoundingRect`](Group.md#getboundingrect)

***

### getClipPath()

> **getClipPath**(): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: [render/src/ChartElement.ts:368](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L368)

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

#### Inherited from

[`Group`](Group.md).[`getClipPath`](Group.md#getclippath)

***

### getGlobalTransform()

> **getGlobalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: [render/src/ChartElement.ts:205](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L205)

Get global transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`Group`](Group.md).[`getGlobalTransform`](Group.md#getglobaltransform)

***

### getLocalTransform()

> **getLocalTransform**(): [`Matrix`](../interfaces/Matrix.md)

Defined in: [render/src/ChartElement.ts:181](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L181)

Get local transform matrix

#### Returns

[`Matrix`](../interfaces/Matrix.md)

#### Inherited from

[`Group`](Group.md).[`getLocalTransform`](Group.md#getlocaltransform)

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: [render/src/ChartElement.ts:145](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L145)

#### Returns

`boolean`

#### Inherited from

[`Group`](Group.md).[`isDirty`](Group.md#isdirty)

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

[`Group`](Group.md).[`isSilent`](Group.md#issilent)

***

### markRedraw()

> **markRedraw**(): `void`

Defined in: [render/src/ChartElement.ts:135](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L135)

#### Returns

`void`

#### Inherited from

[`Group`](Group.md).[`markRedraw`](Group.md#markredraw)

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

[`Group`](Group.md).[`off`](Group.md#off)

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

[`Group`](Group.md).[`on`](Group.md#on)

***

### remove()

> **remove**(`child`): `this`

Defined in: [render/src/Group.ts:38](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L38)

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

Defined in: [render/src/Group.ts:51](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L51)

Remove all children

#### Returns

`this`

#### Inherited from

[`Group`](Group.md).[`removeAll`](Group.md#removeall)

***

### render()

> **render**(`ctx`): `void`

Defined in: [render/src/Group.ts:160](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L160)

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

Defined in: [render/src/ChartElement.ts:372](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/ChartElement.ts#L372)

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

Defined in: [render/src/component/Title.ts:50](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/component/Title.ts#L50)

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

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

#### Inherited from

[`Group`](Group.md).[`transformPointToLocal`](Group.md#transformpointtolocal)

***

### traverse()

> **traverse**(`callback`, `includeSelf`): `void`

Defined in: [render/src/Group.ts:91](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Group.ts#L91)

Traverse children

#### Parameters

##### callback

(`child`) => `boolean` \| `void`

##### includeSelf

`boolean` = `false`

#### Returns

`void`

#### Inherited from

[`Group`](Group.md).[`traverse`](Group.md#traverse)

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

[`Group`](Group.md).[`trigger`](Group.md#trigger)

***

### updateOption()

> **updateOption**(`option`): `void`

Defined in: [render/src/component/Title.ts:56](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/component/Title.ts#L56)

#### Parameters

##### option

[`TitleOption`](../interfaces/TitleOption.md)

#### Returns

`void`
