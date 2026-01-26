[**HudX API**](../../../README.md)

***

# Class: Animator

Defined in: [render/src/animation/Animator.ts:15](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/animation/Animator.ts#L15)

## Constructors

### Constructor

> **new Animator**(): `Animator`

#### Returns

`Animator`

## Methods

### animate()

> **animate**(`target`, `property`, `endValue`, `options`): [`Animation`](Animation.md)

Defined in: [render/src/animation/Animator.ts:21](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/animation/Animator.ts#L21)

Animate target property

#### Parameters

##### target

`any`

##### property

`string`

##### endValue

`number`

##### options

`AnimatorOption` = `{}`

#### Returns

[`Animation`](Animation.md)

***

### getAnimationCount()

> **getAnimationCount**(): `number`

Defined in: [render/src/animation/Animator.ts:85](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/animation/Animator.ts#L85)

Get active animations count

#### Returns

`number`

***

### pauseAll()

> **pauseAll**(): `void`

Defined in: [render/src/animation/Animator.ts:67](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/animation/Animator.ts#L67)

Pause all animations

#### Returns

`void`

***

### resumeAll()

> **resumeAll**(): `void`

Defined in: [render/src/animation/Animator.ts:76](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/animation/Animator.ts#L76)

Resume all animations

#### Returns

`void`

***

### stopAll()

> **stopAll**(): `void`

Defined in: [render/src/animation/Animator.ts:57](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/animation/Animator.ts#L57)

Stop all animations

#### Returns

`void`
