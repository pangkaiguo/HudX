[**HudX API**](../../../README.md)

***

# Interface: BaseSeriesOption

Defined in: [render/src/types.ts:1427](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1427)

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

Defined in: [render/src/types.ts:1447](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1447)

Series color.
If not set, it will pick from the global palette.

***

### cursor?

> `optional` **cursor**: `string`

Defined in: [render/src/types.ts:1460](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1460)

Cursor style when hovering over the series.

#### Default

```ts
'pointer'
```

***

### data?

> `optional` **data**: [`ChartData`](../type-aliases/ChartData.md)[]

Defined in: [render/src/types.ts:1481](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1481)

Series data.
Can be an array of numbers, or objects with `value` property.

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: [render/src/types.ts:1476](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1476)

Emphasis state configuration (hover state).

***

### id?

> `optional` **id**: `string`

Defined in: [render/src/types.ts:1437](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1437)

Component ID.
Unique identifier for the series component.

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: [render/src/types.ts:1468](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1468)

Item style configuration (normal state).

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: [render/src/types.ts:1472](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1472)

Label configuration (normal state).

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:1442](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1442)

Series name.
Used in legend and tooltip.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1464](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1464)

Whether to show the series.

***

### type?

> `optional` **type**: `string`

Defined in: [render/src/types.ts:1432](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1432)

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

***

### z?

> `optional` **z**: `number`

Defined in: [render/src/types.ts:1451](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1451)

Z-index of the series.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: [render/src/types.ts:1455](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1455)

Z-level of the series.
