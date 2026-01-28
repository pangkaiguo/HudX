[**HudX API**](../../../README.md)

***

# Interface: BaseSeriesOption

Defined in: [render/src/types.ts:1431](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1431)

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

Defined in: [render/src/types.ts:1451](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1451)

Series color.
If not set, it will pick from the global palette.

***

### cursor?

> `optional` **cursor**: `string`

Defined in: [render/src/types.ts:1464](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1464)

Cursor style when hovering over the series.

#### Default

```ts
'pointer'
```

***

### data?

> `optional` **data**: [`ChartData`](../type-aliases/ChartData.md)[]

Defined in: [render/src/types.ts:1485](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1485)

Series data.
Can be an array of numbers, or objects with `value` property.

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: [render/src/types.ts:1480](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1480)

Emphasis state configuration (hover state).

***

### id?

> `optional` **id**: `string`

Defined in: [render/src/types.ts:1441](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1441)

Component ID.
Unique identifier for the series component.

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: [render/src/types.ts:1472](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1472)

Item style configuration (normal state).

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: [render/src/types.ts:1476](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1476)

Label configuration (normal state).

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:1446](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1446)

Series name.
Used in legend and tooltip.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1468](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1468)

Whether to show the series.

***

### type?

> `optional` **type**: `string`

Defined in: [render/src/types.ts:1436](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1436)

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

***

### z?

> `optional` **z**: `number`

Defined in: [render/src/types.ts:1455](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1455)

Z-index of the series.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: [render/src/types.ts:1459](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1459)

Z-level of the series.
