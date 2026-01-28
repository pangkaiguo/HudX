[**HudX API**](../../../README.md)

***

# Interface: Scale()

Defined in: [render/src/util/coordinate.ts:22](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L22)

> **Scale**(`value`): `number`

Defined in: [render/src/util/coordinate.ts:23](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L23)

## Parameters

### value

[`ScaleValue`](../type-aliases/ScaleValue.md)

## Returns

`number`

## Methods

### domain()

#### Call Signature

> **domain**(): [`ScaleValue`](../type-aliases/ScaleValue.md)[]

Defined in: [render/src/util/coordinate.ts:25](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L25)

##### Returns

[`ScaleValue`](../type-aliases/ScaleValue.md)[]

#### Call Signature

> **domain**(`domain`): `Scale`

Defined in: [render/src/util/coordinate.ts:27](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L27)

##### Parameters

###### domain

[`ScaleValue`](../type-aliases/ScaleValue.md)[]

##### Returns

`Scale`

***

### getPixel()?

> `optional` **getPixel**(`value`): `number`

Defined in: [render/src/util/coordinate.ts:30](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L30)

Alias for getPixel (ECharts compatibility)

#### Parameters

##### value

[`ScaleValue`](../type-aliases/ScaleValue.md)

#### Returns

`number`

***

### getValue()?

> `optional` **getValue**(`pixel`): [`ScaleValue`](../type-aliases/ScaleValue.md)

Defined in: [render/src/util/coordinate.ts:32](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L32)

Alias for invert (ECharts compatibility)

#### Parameters

##### pixel

`number`

#### Returns

[`ScaleValue`](../type-aliases/ScaleValue.md)

***

### invert()?

> `optional` **invert**(`value`): [`ScaleValue`](../type-aliases/ScaleValue.md)

Defined in: [render/src/util/coordinate.ts:24](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L24)

#### Parameters

##### value

`number`

#### Returns

[`ScaleValue`](../type-aliases/ScaleValue.md)

***

### range()

#### Call Signature

> **range**(): `number`[]

Defined in: [render/src/util/coordinate.ts:26](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L26)

##### Returns

`number`[]

#### Call Signature

> **range**(`range`): `Scale`

Defined in: [render/src/util/coordinate.ts:28](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/coordinate.ts#L28)

##### Parameters

###### range

`number`[]

##### Returns

`Scale`
