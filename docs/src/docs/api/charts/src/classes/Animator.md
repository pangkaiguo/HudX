[**HudX API**](../../../README.md)

***

# Class: Animator

Defined in: render/dist/animation/Animator.d.ts:12

## Constructors

### Constructor

> **new Animator**(): `Animator`

#### Returns

`Animator`

## Methods

### animate()

> **animate**(`target`, `property`, `endValue`, `options?`): [`Animation`](Animation.md)

Defined in: render/dist/animation/Animator.d.ts:17

Animate target property

#### Parameters

##### target

`any`

##### property

`string`

##### endValue

`number`

##### options?

`AnimatorOption`

#### Returns

[`Animation`](Animation.md)

***

### getAnimationCount()

> **getAnimationCount**(): `number`

Defined in: render/dist/animation/Animator.d.ts:33

Get active animations count

#### Returns

`number`

***

### pauseAll()

> **pauseAll**(): `void`

Defined in: render/dist/animation/Animator.d.ts:25

Pause all animations

#### Returns

`void`

***

### resumeAll()

> **resumeAll**(): `void`

Defined in: render/dist/animation/Animator.d.ts:29

Resume all animations

#### Returns

`void`

***

### stopAll()

> **stopAll**(): `void`

Defined in: render/dist/animation/Animator.d.ts:21

Stop all animations

#### Returns

`void`
