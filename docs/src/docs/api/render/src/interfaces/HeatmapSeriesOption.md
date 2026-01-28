[**HudX API**](../../../README.md)

***

# Interface: HeatmapSeriesOption

Defined in: [render/src/types.ts:1754](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1754)

Heatmap series (primarily used by `HeatmapChart`).

Data is typically an array of `[x, y, value]`.

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### color?

> `optional` **color**: `string`

Defined in: [render/src/types.ts:1451](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1451)

Series color.
If not set, it will pick from the global palette.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`color`](BaseSeriesOption.md#color)

***

### cursor?

> `optional` **cursor**: `string`

Defined in: [render/src/types.ts:1464](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1464)

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

Defined in: [render/src/types.ts:1760](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1760)

Heatmap data.
Array of [x, y, value] points.

#### Overrides

[`BaseSeriesOption`](BaseSeriesOption.md).[`data`](BaseSeriesOption.md#data)

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: [render/src/types.ts:1480](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1480)

Emphasis state configuration (hover state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`emphasis`](BaseSeriesOption.md#emphasis)

***

### id?

> `optional` **id**: `string`

Defined in: [render/src/types.ts:1441](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1441)

Component ID.
Unique identifier for the series component.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`id`](BaseSeriesOption.md#id)

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: [render/src/types.ts:1472](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1472)

Item style configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`itemStyle`](BaseSeriesOption.md#itemstyle)

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: [render/src/types.ts:1476](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1476)

Label configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`label`](BaseSeriesOption.md#label)

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:1446](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1446)

Series name.
Used in legend and tooltip.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`name`](BaseSeriesOption.md#name)

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1468](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1468)

Whether to show the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`show`](BaseSeriesOption.md#show)

***

### type

> **type**: `"heatmap"`

Defined in: [render/src/types.ts:1755](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1755)

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

#### Overrides

[`BaseSeriesOption`](BaseSeriesOption.md).[`type`](BaseSeriesOption.md#type)

***

### z?

> `optional` **z**: `number`

Defined in: [render/src/types.ts:1455](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1455)

Z-index of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`z`](BaseSeriesOption.md#z)

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: [render/src/types.ts:1459](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1459)

Z-level of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`zlevel`](BaseSeriesOption.md#zlevel)
