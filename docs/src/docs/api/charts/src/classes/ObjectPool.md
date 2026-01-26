[**HudX API**](../../../README.md)

***

# Class: ObjectPool\<T\>

Defined in: render/dist/util/ObjectPool.d.ts:5

ObjectPool - Object pool for performance optimization
Reuses objects to reduce garbage collection

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new ObjectPool**\<`T`\>(`createFn`, `resetFn?`, `maxSize?`): `ObjectPool`\<`T`\>

Defined in: render/dist/util/ObjectPool.d.ts:10

#### Parameters

##### createFn

() => `T`

##### resetFn?

(`obj`) => `void`

##### maxSize?

`number`

#### Returns

`ObjectPool`\<`T`\>

## Methods

### acquire()

> **acquire**(): `T`

Defined in: render/dist/util/ObjectPool.d.ts:14

Get object from pool

#### Returns

`T`

***

### clear()

> **clear**(): `void`

Defined in: render/dist/util/ObjectPool.d.ts:22

Clear pool

#### Returns

`void`

***

### release()

> **release**(`obj`): `void`

Defined in: render/dist/util/ObjectPool.d.ts:18

Return object to pool

#### Parameters

##### obj

`T`

#### Returns

`void`

***

### size()

> **size**(): `number`

Defined in: render/dist/util/ObjectPool.d.ts:26

Get pool size

#### Returns

`number`
