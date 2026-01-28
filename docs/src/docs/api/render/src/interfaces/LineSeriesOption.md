[**HudX API**](../../../README.md)

***

# Interface: LineSeriesOption

Defined in: [render/src/types.ts:1497](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1497)

Line series.

## Example

```ts
series: [{ type: 'line', name: 'A', smooth: true, data: [120, 200, 150] }]
```

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### areaStyle?

> `optional` **areaStyle**: [`AreaStyleOption`](AreaStyleOption.md)

Defined in: [render/src/types.ts:1568](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1568)

Area style configuration (for area charts).

***

### color?

> `optional` **color**: `string`

Defined in: [render/src/types.ts:1451](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1451)

Series color.
If not set, it will pick from the global palette.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`color`](BaseSeriesOption.md#color)

***

### connectNulls?

> `optional` **connectNulls**: `boolean`

Defined in: [render/src/types.ts:1553](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1553)

Whether to connect points across null values.

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

Defined in: [render/src/types.ts:1485](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1485)

Series data.
Can be an array of numbers, or objects with `value` property.

#### Inherited from

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

### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

Defined in: [render/src/types.ts:1564](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1564)

Line style configuration.

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

### showSymbol?

> `optional` **showSymbol**: `boolean`

Defined in: [render/src/types.ts:1549](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1549)

Whether to show symbols on the line.
- true: Always show.
- false: Only show on hover (if emphasis configured).

***

### smooth?

> `optional` **smooth**: `number` \| `boolean`

Defined in: [render/src/types.ts:1504](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1504)

Whether to smooth the line.
- boolean: true/false.
- number: 0 to 1 (degree of smoothness).

***

### step?

> `optional` **step**: `boolean` \| `"middle"` \| `"start"` \| `"end"`

Defined in: [render/src/types.ts:1560](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1560)

Step line type.
- 'start': Step at the start.
- 'middle': Step in the middle.
- 'end': Step at the end.

***

### symbol?

> `optional` **symbol**: `string`

Defined in: [render/src/types.ts:1511](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1511)

Symbol type.
- 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'.
- 'image://url'
- 'path://...'

***

### symbolKeepAspect?

> `optional` **symbolKeepAspect**: `boolean`

Defined in: [render/src/types.ts:1538](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1538)

Whether to keep the aspect ratio of the symbol.

***

### symbolOffset?

> `optional` **symbolOffset**: \[`string` \| `number`, `string` \| `number`\]

Defined in: [render/src/types.ts:1543](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1543)

Symbol offset.
[x, y] in pixels or percentages.

***

### symbolRotate?

> `optional` **symbolRotate**: `number`

Defined in: [render/src/types.ts:1534](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1534)

Symbol rotation in degrees.

***

### symbolSize?

> `optional` **symbolSize**: `number` \| `number`[] \| (`value`, `params`) => `number` \| `number`[]

Defined in: [render/src/types.ts:1527](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1527)

Symbol size.
- number: Single size.
- [width, height]: Separate width and height.
- Function: (value, params) => number | number[]

***

### type

> **type**: `"line"`

Defined in: [render/src/types.ts:1498](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1498)

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
