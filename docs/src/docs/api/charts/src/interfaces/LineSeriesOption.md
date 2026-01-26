[**HudX API**](../../../README.md)

***

# Interface: LineSeriesOption

Defined in: render/dist/types.d.ts:1309

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

Defined in: render/dist/types.d.ts:1368

Area style configuration (for area charts).

***

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:1264

Series color.
If not set, it will pick from the global palette.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`color`](BaseSeriesOption.md#color)

***

### connectNulls?

> `optional` **connectNulls**: `boolean`

Defined in: render/dist/types.d.ts:1353

Whether to connect points across null values.

***

### cursor?

> `optional` **cursor**: `string`

Defined in: render/dist/types.d.ts:1277

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

Defined in: render/dist/types.d.ts:1298

Series data.
Can be an array of numbers, or objects with `value` property.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`data`](BaseSeriesOption.md#data)

***

### emphasis?

> `optional` **emphasis**: [`EmphasisOption`](EmphasisOption.md)

Defined in: render/dist/types.d.ts:1293

Emphasis state configuration (hover state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`emphasis`](BaseSeriesOption.md#emphasis)

***

### id?

> `optional` **id**: `string`

Defined in: render/dist/types.d.ts:1254

Component ID.
Unique identifier for the series component.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`id`](BaseSeriesOption.md#id)

***

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: render/dist/types.d.ts:1285

Item style configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`itemStyle`](BaseSeriesOption.md#itemstyle)

***

### label?

> `optional` **label**: [`LabelOption`](LabelOption.md)

Defined in: render/dist/types.d.ts:1289

Label configuration (normal state).

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`label`](BaseSeriesOption.md#label)

***

### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

Defined in: render/dist/types.d.ts:1364

Line style configuration.

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1259

Series name.
Used in legend and tooltip.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`name`](BaseSeriesOption.md#name)

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1281

Whether to show the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`show`](BaseSeriesOption.md#show)

***

### showSymbol?

> `optional` **showSymbol**: `boolean`

Defined in: render/dist/types.d.ts:1349

Whether to show symbols on the line.
- true: Always show.
- false: Only show on hover (if emphasis configured).

***

### smooth?

> `optional` **smooth**: `number` \| `boolean`

Defined in: render/dist/types.d.ts:1316

Whether to smooth the line.
- boolean: true/false.
- number: 0 to 1 (degree of smoothness).

***

### step?

> `optional` **step**: `boolean` \| `"start"` \| `"middle"` \| `"end"`

Defined in: render/dist/types.d.ts:1360

Step line type.
- 'start': Step at the start.
- 'middle': Step in the middle.
- 'end': Step at the end.

***

### symbol?

> `optional` **symbol**: `string`

Defined in: render/dist/types.d.ts:1323

Symbol type.
- 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'.
- 'image://url'
- 'path://...'

***

### symbolKeepAspect?

> `optional` **symbolKeepAspect**: `boolean`

Defined in: render/dist/types.d.ts:1338

Whether to keep the aspect ratio of the symbol.

***

### symbolOffset?

> `optional` **symbolOffset**: \[`string` \| `number`, `string` \| `number`\]

Defined in: render/dist/types.d.ts:1343

Symbol offset.
[x, y] in pixels or percentages.

***

### symbolRotate?

> `optional` **symbolRotate**: `number`

Defined in: render/dist/types.d.ts:1334

Symbol rotation in degrees.

***

### symbolSize?

> `optional` **symbolSize**: `number` \| `number`[] \| (`value`, `params`) => `number` \| `number`[]

Defined in: render/dist/types.d.ts:1330

Symbol size.
- number: Single size.
- [width, height]: Separate width and height.
- Function: (value, params) => number | number[]

***

### type

> **type**: `"line"`

Defined in: render/dist/types.d.ts:1310

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

#### Overrides

[`BaseSeriesOption`](BaseSeriesOption.md).[`type`](BaseSeriesOption.md#type)

***

### z?

> `optional` **z**: `number`

Defined in: render/dist/types.d.ts:1268

Z-index of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`z`](BaseSeriesOption.md#z)

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: render/dist/types.d.ts:1272

Z-level of the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`zlevel`](BaseSeriesOption.md#zlevel)
