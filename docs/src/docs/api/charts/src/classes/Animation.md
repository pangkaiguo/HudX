[**HudX API**](../../../README.md)

***

# Class: Animation

Defined in: render/dist/animation/Animation.d.ts:36

## Constructors

### Constructor

> **new Animation**(`target`, `property`, `endValue`, `duration?`, `delay?`, `easing?`, `onUpdate?`, `onComplete?`): `Animation`

Defined in: render/dist/animation/Animation.d.ts:50

#### Parameters

##### target

`Record`\<`string`, `unknown`\>

##### property

`string`

##### endValue

`number`

##### duration?

`number`

##### delay?

`number`

##### easing?

`string` | `EasingFunction`

##### onUpdate?

(`target`, `percent`) => `void`

##### onComplete?

() => `void`

#### Returns

`Animation`

## Methods

### pause()

> **pause**(): `this`

Defined in: render/dist/animation/Animation.d.ts:53

#### Returns

`this`

***

### resume()

> **resume**(): `this`

Defined in: render/dist/animation/Animation.d.ts:54

#### Returns

`this`

***

### start()

> **start**(): `this`

Defined in: render/dist/animation/Animation.d.ts:51

#### Returns

`this`

***

### stop()

> **stop**(): `this`

Defined in: render/dist/animation/Animation.d.ts:52

#### Returns

`this`
