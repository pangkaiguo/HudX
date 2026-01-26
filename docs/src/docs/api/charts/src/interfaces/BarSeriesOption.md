[**HudX API**](../../../README.md)

***

# Interface: BarSeriesOption

Defined in: render/dist/types.d.ts:1378

Bar series.

## Example

```ts
series: [{ type: 'bar', name: 'Sales', data: [120, 200, 150], barGap: '30%' }]
```

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### backgroundStyle?

> `optional` **backgroundStyle**: [`ItemStyleOption`](ItemStyleOption.md)

Defined in: render/dist/types.d.ts:1417

Style of the background.

***

### barCategoryGap?

> `optional` **barCategoryGap**: `string` \| `number`

Defined in: render/dist/types.d.ts:1409

Gap between bar categories.
Defaults to '20%'.

***

### barGap?

> `optional` **barGap**: `string` \| `number`

Defined in: render/dist/types.d.ts:1404

Gap between bars of different series in the same category.
Defaults to '30%'.

***

### barMaxWidth?

> `optional` **barMaxWidth**: `string` \| `number`

Defined in: render/dist/types.d.ts:1394

Maximum bar width.
Useful when bar width is auto-calculated.

***

### barMinHeight?

> `optional` **barMinHeight**: `number`

Defined in: render/dist/types.d.ts:1399

Minimum bar height.
Useful to make small values visible.

***

### barWidth?

> `optional` **barWidth**: `string` \| `number`

Defined in: render/dist/types.d.ts:1389

Bar width.
Can be absolute pixel value or percentage relative to bandwidth.

***

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:1264

Series color.
If not set, it will pick from the global palette.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`color`](BaseSeriesOption.md#color)

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

### showBackground?

> `optional` **showBackground**: `boolean`

Defined in: render/dist/types.d.ts:1413

Whether to show background behind bars.

***

### stack?

> `optional` **stack**: `string`

Defined in: render/dist/types.d.ts:1384

Stack name.
Series with the same stack name will be stacked on top of each other.

***

### type

> **type**: `"bar"`

Defined in: render/dist/types.d.ts:1379

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
