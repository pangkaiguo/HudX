[**HudX API**](../../../README.md)

***

# Class: Storage

Defined in: render/dist/Storage.d.ts:6

## Constructors

### Constructor

> **new Storage**(): `Storage`

#### Returns

`Storage`

## Methods

### addRoot()

> **addRoot**(`root`): `void`

Defined in: render/dist/Storage.d.ts:12

Add root group

#### Parameters

##### root

[`Group`](Group.md)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: render/dist/Storage.d.ts:50

Clear all elements

#### Returns

`void`

***

### getDisplayList()

> **getDisplayList**(`includeInvisible?`): [`ChartElement`](ChartElement.md)[]

Defined in: render/dist/Storage.d.ts:46

Get all elements in rendering order (flattened)

#### Parameters

##### includeInvisible?

`boolean`

#### Returns

[`ChartElement`](ChartElement.md)[]

***

### getElementById()

> **getElementById**(`id`): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: render/dist/Storage.d.ts:24

Get element by ID

#### Parameters

##### id

`string`

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

***

### getElementsList()

> **getElementsList**(): [`ChartElement`](ChartElement.md)[]

Defined in: render/dist/Storage.d.ts:42

Get all elements sorted by zlevel and z

#### Returns

[`ChartElement`](ChartElement.md)[]

***

### getRoots()

> **getRoots**(): [`Group`](Group.md)[]

Defined in: render/dist/Storage.d.ts:20

Get all roots

#### Returns

[`Group`](Group.md)[]

***

### iterate()

> **iterate**\<`T`\>(`callback`, `includeRoot?`): `void` \| `T`

Defined in: render/dist/Storage.d.ts:38

Iterate all elements

#### Type Parameters

##### T

`T`

#### Parameters

##### callback

(`element`) => `void` \| `T`

##### includeRoot?

`boolean`

#### Returns

`void` \| `T`

***

### removeElement()

> **removeElement**(`element`): `void`

Defined in: render/dist/Storage.d.ts:34

Remove element from storage
Also removes all children if element is a Group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`void`

***

### removeRoot()

> **removeRoot**(`root`): `void`

Defined in: render/dist/Storage.d.ts:16

Remove root group

#### Parameters

##### root

[`Group`](Group.md)

#### Returns

`void`

***

### updateElement()

> **updateElement**(`element`): `void`

Defined in: render/dist/Storage.d.ts:29

Update element in storage
Also updates all children if element is a Group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`void`
