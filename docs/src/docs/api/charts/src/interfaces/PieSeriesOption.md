[**HudX API**](../../../README.md)

***

# Interface: PieSeriesOption

Defined in: render/dist/types.d.ts:1605

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### avoidLabelOverlap?

> `optional` **avoidLabelOverlap**: `boolean`

Defined in: render/dist/types.d.ts:1634

Whether to enable automatic label layout to avoid overlap.

***

### center?

> `optional` **center**: (`string` \| `number`)[]

Defined in: render/dist/types.d.ts:1619

Center position of the pie chart.
[x, y] - can be pixels or percentages.

#### Default

```ts
['50%', '50%']
```

***

### centerLabel?

> `optional` **centerLabel**: [`CenterLabelOption`](CenterLabelOption.md)

Defined in: render/dist/types.d.ts:1624

Center label configuration.
Only valid for doughnut charts.

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

### endAngle?

> `optional` **endAngle**: `number`

Defined in: render/dist/types.d.ts:1648

End angle of the pie chart.
Only used if you want a partial pie.

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

### labelLine?

> `optional` **labelLine**: [`LabelLineOption`](LabelLineOption.md)

Defined in: render/dist/types.d.ts:1657

Configuration for the label guide line.

***

### minAngle?

> `optional` **minAngle**: `number`

Defined in: render/dist/types.d.ts:1653

Minimum angle of a sector.
Useful to ensure small values are visible.

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1406

Series name.
Used in legend and tooltip.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`name`](BaseSeriesOption.md#name)

***

### radius?

> `optional` **radius**: `string` \| `number` \| (`string` \| `number`)[]

Defined in: render/dist/types.d.ts:1613

Radius of the pie chart.
- number: Pixel value.
- string: Percentage (e.g. '50%').
- Array: [innerRadius, outerRadius] for doughnut charts.

***

### roseType?

> `optional` **roseType**: `boolean` \| `"radius"` \| `"area"`

Defined in: render/dist/types.d.ts:1630

Whether to display as Nightingale rose chart.
- 'radius': Fan angle is same, radius varies.
- 'area': Fan area varies with value.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1428

Whether to show the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`show`](BaseSeriesOption.md#show)

***

### startAngle?

> `optional` **startAngle**: `number`

Defined in: render/dist/types.d.ts:1643

Start angle of the pie chart (in degrees).

#### Default

```ts
90 (12 o'clock)
```

***

### stillShowZeroSum?

> `optional` **stillShowZeroSum**: `boolean`

Defined in: render/dist/types.d.ts:1638

Whether to still show a sector if all data values are zero.

***

### type

> **type**: `"pie"` \| `"doughnut"` \| `"half-doughnut"`

Defined in: render/dist/types.d.ts:1606

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
