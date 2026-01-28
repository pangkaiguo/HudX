[**HudX API**](../../../README.md)

***

# Class: Storage

Defined in: [render/src/Storage.ts:8](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L8)

## Constructors

### Constructor

> **new Storage**(): `Storage`

#### Returns

`Storage`

## Methods

### addRoot()

> **addRoot**(`root`): `void`

Defined in: [render/src/Storage.ts:15](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L15)

Add root group

#### Parameters

##### root

[`Group`](Group.md)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [render/src/Storage.ts:138](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L138)

Clear all elements

#### Returns

`void`

***

### getDisplayList()

> **getDisplayList**(`includeInvisible`): [`ChartElement`](ChartElement.md)[]

Defined in: [render/src/Storage.ts:102](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L102)

Get all elements in rendering order (flattened)

#### Parameters

##### includeInvisible

`boolean` = `false`

#### Returns

[`ChartElement`](ChartElement.md)[]

***

### getElementById()

> **getElementById**(`id`): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: [render/src/Storage.ts:43](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L43)

Get element by ID

#### Parameters

##### id

`string`

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

***

### getElementsList()

> **getElementsList**(): [`ChartElement`](ChartElement.md)[]

Defined in: [render/src/Storage.ts:89](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L89)

Get all elements sorted by zlevel and z

#### Returns

[`ChartElement`](ChartElement.md)[]

***

### getRoots()

> **getRoots**(): [`Group`](Group.md)[]

Defined in: [render/src/Storage.ts:36](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L36)

Get all roots

#### Returns

[`Group`](Group.md)[]

***

### iterate()

> **iterate**\<`T`\>(`callback`, `includeRoot`): `void` \| `T`

Defined in: [render/src/Storage.ts:66](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L66)

Iterate all elements

#### Type Parameters

##### T

`T`

#### Parameters

##### callback

(`element`) => `void` \| `T`

##### includeRoot

`boolean` = `false`

#### Returns

`void` \| `T`

***

### removeElement()

> **removeElement**(`element`): `void`

Defined in: [render/src/Storage.ts:59](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L59)

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

Defined in: [render/src/Storage.ts:25](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L25)

Remove root group

#### Parameters

##### root

[`Group`](Group.md)

#### Returns

`void`

***

### updateElement()

> **updateElement**(`element`): `void`

Defined in: [render/src/Storage.ts:51](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/Storage.ts#L51)

Update element in storage
Also updates all children if element is a Group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`void`
