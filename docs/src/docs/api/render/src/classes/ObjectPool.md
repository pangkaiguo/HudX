[**HudX API**](../../../README.md)

***

# Class: ObjectPool\<T\>

Defined in: [render/src/util/ObjectPool.ts:6](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/ObjectPool.ts#L6)

ObjectPool - Object pool for performance optimization
Reuses objects to reduce garbage collection

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new ObjectPool**\<`T`\>(`createFn`, `resetFn?`, `maxSize?`): `ObjectPool`\<`T`\>

Defined in: [render/src/util/ObjectPool.ts:12](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/ObjectPool.ts#L12)

#### Parameters

##### createFn

() => `T`

##### resetFn?

(`obj`) => `void`

##### maxSize?

`number` = `100`

#### Returns

`ObjectPool`\<`T`\>

## Methods

### acquire()

> **acquire**(): `T`

Defined in: [render/src/util/ObjectPool.ts:25](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/ObjectPool.ts#L25)

Get object from pool

#### Returns

`T`

***

### clear()

> **clear**(): `void`

Defined in: [render/src/util/ObjectPool.ts:48](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/ObjectPool.ts#L48)

Clear pool

#### Returns

`void`

***

### release()

> **release**(`obj`): `void`

Defined in: [render/src/util/ObjectPool.ts:35](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/ObjectPool.ts#L35)

Return object to pool

#### Parameters

##### obj

`T`

#### Returns

`void`

***

### size()

> **size**(): `number`

Defined in: [render/src/util/ObjectPool.ts:55](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/ObjectPool.ts#L55)

Get pool size

#### Returns

`number`
