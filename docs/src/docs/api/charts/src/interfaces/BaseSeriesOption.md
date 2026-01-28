[**HudX API**](../../../README.md)

***

# Interface: BaseSeriesOption

Defined in: render/dist/types.d.ts:1391

## Extended by

- [`LineSeriesOption`](LineSeriesOption.md)
- [`BarSeriesOption`](BarSeriesOption.md)
- [`PieSeriesOption`](PieSeriesOption.md)
- [`ScatterSeriesOption`](ScatterSeriesOption.md)
- [`HeatmapSeriesOption`](HeatmapSeriesOption.md)
- [`Bar3DSeriesOption`](Bar3DSeriesOption.md)
- [`StackBar3DSeriesOption`](StackBar3DSeriesOption.md)
- [`UnknownSeriesOption`](UnknownSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:1411

Series color.
If not set, it will pick from the global palette.

***

### cursor?

> `optional` **cursor**: `string`

Defined in: render/dist/types.d.ts:1424

Cursor style when hovering over the series.

#### Default

```ts
'pointer'
```

***

### data?

> `optional` **data**: [`ChartData`](../type-aliases/ChartData.md)[]

Defined in: render/dist/types.d.ts:1445

Series data.
Can be an array of numbers, or objects with `value` property.

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: render/dist/types.d.ts:1440

Emphasis state configuration (hover state).

***

### id?

> `optional` **id**: `string`

Defined in: render/dist/types.d.ts:1401

Component ID.
Unique identifier for the series component.

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: render/dist/types.d.ts:1432

Item style configuration (normal state).

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: render/dist/types.d.ts:1436

Label configuration (normal state).

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1406

Series name.
Used in legend and tooltip.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1428

Whether to show the series.

***

### type?

> `optional` **type**: `string`

Defined in: render/dist/types.d.ts:1396

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

***

### z?

> `optional` **z**: `number`

Defined in: render/dist/types.d.ts:1415

Z-index of the series.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: render/dist/types.d.ts:1419

Z-level of the series.
