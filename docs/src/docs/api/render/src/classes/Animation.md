[**HudX API**](../../../README.md)

***

# Class: Animation

Defined in: [render/src/animation/Animation.ts:93](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/animation/Animation.ts#L93)

## Constructors

### Constructor

> **new Animation**(`target`, `property`, `endValue`, `duration`, `delay`, `easing`, `onUpdate?`, `onComplete?`): `Animation`

Defined in: [render/src/animation/Animation.ts:112](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/animation/Animation.ts#L112)

#### Parameters

##### target

`Record`\<`string`, `unknown`\>

##### property

`string`

##### endValue

`number`

##### duration

`number` = `1000`

##### delay

`number` = `0`

##### easing

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

Defined in: [render/src/animation/Animation.ts:158](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/animation/Animation.ts#L158)

#### Returns

`this`

***

### resume()

> **resume**(): `this`

Defined in: [render/src/animation/Animation.ts:166](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/animation/Animation.ts#L166)

#### Returns

`this`

***

### start()

> **start**(): `this`

Defined in: [render/src/animation/Animation.ts:137](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/animation/Animation.ts#L137)

#### Returns

`this`

***

### stop()

> **stop**(): `this`

Defined in: [render/src/animation/Animation.ts:150](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/animation/Animation.ts#L150)

#### Returns

`this`
