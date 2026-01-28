[**HudX API**](../../../README.md)

***

# Class: Eventful

Defined in: [render/src/mixin/Eventful.ts:7](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L7)

## Extended by

- [`ChartElement`](ChartElement.md)

## Constructors

### Constructor

> **new Eventful**(): `Eventful`

#### Returns

`Eventful`

## Methods

### isSilent()

> **isSilent**(`event?`): `boolean`

Defined in: [render/src/mixin/Eventful.ts:72](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L72)

Check if event has listeners

#### Parameters

##### event?

`string`

#### Returns

`boolean`

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: [render/src/mixin/Eventful.ts:24](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L24)

Remove event listener

#### Parameters

##### event?

`string`

##### handler?

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

***

### on()

> **on**(`event`, `handler`): `this`

Defined in: [render/src/mixin/Eventful.ts:13](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L13)

Add event listener

#### Parameters

##### event

`string`

##### handler

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

***

### trigger()

> **trigger**(`event`, `eventData?`): `this`

Defined in: [render/src/mixin/Eventful.ts:52](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/mixin/Eventful.ts#L52)

Trigger event

#### Parameters

##### event

`string`

##### eventData?

`Record`\<`string`, `any`\>

#### Returns

`this`
