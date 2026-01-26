[**HudX API**](../../../README.md)

***

# Interface: Scale()

Defined in: render/dist/util/coordinate.d.ts:18

> **Scale**(`value`): `number`

Defined in: render/dist/util/coordinate.d.ts:19

## Parameters

### value

[`ScaleValue`](../type-aliases/ScaleValue.md)

## Returns

`number`

## Methods

### domain()

#### Call Signature

> **domain**(): [`ScaleValue`](../type-aliases/ScaleValue.md)[]

Defined in: render/dist/util/coordinate.d.ts:21

##### Returns

[`ScaleValue`](../type-aliases/ScaleValue.md)[]

#### Call Signature

> **domain**(`domain`): `Scale`

Defined in: render/dist/util/coordinate.d.ts:23

##### Parameters

###### domain

[`ScaleValue`](../type-aliases/ScaleValue.md)[]

##### Returns

`Scale`

***

### getPixel()?

> `optional` **getPixel**(`value`): `number`

Defined in: render/dist/util/coordinate.d.ts:26

Alias for getPixel (ECharts compatibility)

#### Parameters

##### value

[`ScaleValue`](../type-aliases/ScaleValue.md)

#### Returns

`number`

***

### getValue()?

> `optional` **getValue**(`pixel`): [`ScaleValue`](../type-aliases/ScaleValue.md)

Defined in: render/dist/util/coordinate.d.ts:28

Alias for invert (ECharts compatibility)

#### Parameters

##### pixel

`number`

#### Returns

[`ScaleValue`](../type-aliases/ScaleValue.md)

***

### invert()?

> `optional` **invert**(`value`): [`ScaleValue`](../type-aliases/ScaleValue.md)

Defined in: render/dist/util/coordinate.d.ts:20

#### Parameters

##### value

`number`

#### Returns

[`ScaleValue`](../type-aliases/ScaleValue.md)

***

### range()

#### Call Signature

> **range**(): `number`[]

Defined in: render/dist/util/coordinate.d.ts:22

##### Returns

`number`[]

#### Call Signature

> **range**(`range`): `Scale`

Defined in: render/dist/util/coordinate.d.ts:24

##### Parameters

###### range

`number`[]

##### Returns

`Scale`
