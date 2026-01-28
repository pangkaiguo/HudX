[**HudX API**](../../../README.md)

***

# Interface: Bar3DSeriesOption

Defined in: render/dist/types.d.ts:1709

3D bar series (`Bar3DChart`).

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### barCategoryGap?

> `optional` **barCategoryGap**: `string` \| `number`

Defined in: render/dist/types.d.ts:1726

Bar category gap.

***

### barGap?

> `optional` **barGap**: `string` \| `number`

Defined in: render/dist/types.d.ts:1722

Bar gap.

***

### barWidth?

> `optional` **barWidth**: `string` \| `number`

Defined in: render/dist/types.d.ts:1718

Bar width.

***

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:1411

Series color.
If not set, it will pick from the global palette.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`color`](BaseSeriesOption.md#color)

***

### cursor?

> `optional` **cursor**: `string`

Defined in: render/dist/types.d.ts:1424

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

Defined in: render/dist/types.d.ts:1445

Series data.
Can be an array of numbers, or objects with `value` property.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`data`](BaseSeriesOption.md#data)

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: render/dist/types.d.ts:1440

Emphasis state configuration (hover state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`emphasis`](BaseSeriesOption.md#emphasis)

***

### id?

> `optional` **id**: `string`

Defined in: render/dist/types.d.ts:1401

Component ID.
Unique identifier for the series component.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`id`](BaseSeriesOption.md#id)

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: render/dist/types.d.ts:1432

Item style configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`itemStyle`](BaseSeriesOption.md#itemstyle)

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: render/dist/types.d.ts:1436

Label configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`label`](BaseSeriesOption.md#label)

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1406

Series name.
Used in legend and tooltip.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`name`](BaseSeriesOption.md#name)

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1428

Whether to show the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`show`](BaseSeriesOption.md#show)

***

### stack?

> `optional` **stack**: `string`

Defined in: render/dist/types.d.ts:1714

Stack name.

***

### type

> **type**: `"bar3D"`

Defined in: render/dist/types.d.ts:1710

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

#### Overrides

[`BaseSeriesOption`](BaseSeriesOption.md).[`type`](BaseSeriesOption.md#type)

***

### z?

> `optional` **z**: `number`

Defined in: render/dist/types.d.ts:1415

Z-index of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`z`](BaseSeriesOption.md#z)

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: render/dist/types.d.ts:1419

Z-level of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`zlevel`](BaseSeriesOption.md#zlevel)
