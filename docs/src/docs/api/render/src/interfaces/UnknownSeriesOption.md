[**HudX API**](../../../README.md)

***

# Interface: UnknownSeriesOption

Defined in: [render/src/types.ts:1809](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1809)

Fallback for custom/unsupported series.\n
If you use a non-built-in `type`, it falls back to this type to avoid blocking typing.

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### color?

> `optional` **color**: `string`

Defined in: [render/src/types.ts:1447](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1447)

Series color.
If not set, it will pick from the global palette.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`color`](BaseSeriesOption.md#color)

***

### cursor?

> `optional` **cursor**: `string`

Defined in: [render/src/types.ts:1460](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1460)

Cursor style when hovering over the series.

#### Default

```ts
'pointer'
```

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`cursor`](BaseSeriesOption.md#cursor)

***

### data?

> `optional` **data**: [`ChartData`](../type-aliases/ChartData.md)[]

Defined in: [render/src/types.ts:1481](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1481)

Series data.
Can be an array of numbers, or objects with `value` property.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`data`](BaseSeriesOption.md#data)

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: [render/src/types.ts:1476](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1476)

Emphasis state configuration (hover state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`emphasis`](BaseSeriesOption.md#emphasis)

***

### id?

> `optional` **id**: `string`

Defined in: [render/src/types.ts:1437](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1437)

Component ID.
Unique identifier for the series component.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`id`](BaseSeriesOption.md#id)

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: [render/src/types.ts:1468](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1468)

Item style configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`itemStyle`](BaseSeriesOption.md#itemstyle)

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: [render/src/types.ts:1472](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1472)

Label configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`label`](BaseSeriesOption.md#label)

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:1442](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1442)

Series name.
Used in legend and tooltip.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`name`](BaseSeriesOption.md#name)

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1464](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1464)

Whether to show the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`show`](BaseSeriesOption.md#show)

***

### type?

> `optional` **type**: `string`

Defined in: [render/src/types.ts:1811](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1811)

Series type

#### Overrides

[`BaseSeriesOption`](BaseSeriesOption.md).[`type`](BaseSeriesOption.md#type)

***

### z?

> `optional` **z**: `number`

Defined in: [render/src/types.ts:1451](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1451)

Z-index of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`z`](BaseSeriesOption.md#z)

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: [render/src/types.ts:1455](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1455)

Z-level of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`zlevel`](BaseSeriesOption.md#zlevel)
