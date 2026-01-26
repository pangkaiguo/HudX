[**HudX API**](../../../README.md)

***

# Class: Eventful

Defined in: render/dist/mixin/Eventful.d.ts:5

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

Defined in: render/dist/mixin/Eventful.d.ts:22

Check if event has listeners

#### Parameters

##### event?

`string`

#### Returns

`boolean`

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: render/dist/mixin/Eventful.d.ts:14

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

Defined in: render/dist/mixin/Eventful.d.ts:10

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

Defined in: render/dist/mixin/Eventful.d.ts:18

Trigger event

#### Parameters

##### event

`string`

##### eventData?

`Record`\<`string`, `any`\>

#### Returns

`this`
