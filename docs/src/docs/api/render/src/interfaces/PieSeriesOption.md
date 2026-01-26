[**HudX API**](../../../README.md)

***

# Interface: PieSeriesOption

Defined in: [render/src/types.ts:1655](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1655)

## Extends

- [`BaseSeriesOption`](BaseSeriesOption.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### avoidLabelOverlap?

> `optional` **avoidLabelOverlap**: `boolean`

Defined in: [render/src/types.ts:1684](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1684)

Whether to enable automatic label layout to avoid overlap.

***

### center?

> `optional` **center**: (`string` \| `number`)[]

Defined in: [render/src/types.ts:1669](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1669)

Center position of the pie chart.
[x, y] - can be pixels or percentages.

#### Default

```ts
['50%', '50%']
```

***

### centerLabel?

> `optional` **centerLabel**: [`CenterLabelOption`](CenterLabelOption.md)

Defined in: [render/src/types.ts:1674](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1674)

Center label configuration.
Only valid for doughnut charts.

***

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

### endAngle?

> `optional` **endAngle**: `number`

Defined in: [render/src/types.ts:1698](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1698)

End angle of the pie chart.
Only used if you want a partial pie.

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

### labelLine?

> `optional` **labelLine**: [`LabelLineOption`](LabelLineOption.md)

Defined in: [render/src/types.ts:1707](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1707)

Configuration for the label guide line.

***

### minAngle?

> `optional` **minAngle**: `number`

Defined in: [render/src/types.ts:1703](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1703)

Minimum angle of a sector.
Useful to ensure small values are visible.

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:1442](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1442)

Series name.
Used in legend and tooltip.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`name`](BaseSeriesOption.md#name)

***

### radius?

> `optional` **radius**: `string` \| `number` \| (`string` \| `number`)[]

Defined in: [render/src/types.ts:1663](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1663)

Radius of the pie chart.
- number: Pixel value.
- string: Percentage (e.g. '50%').
- Array: [innerRadius, outerRadius] for doughnut charts.

***

### roseType?

> `optional` **roseType**: `boolean` \| `"radius"` \| `"area"`

Defined in: [render/src/types.ts:1680](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1680)

Whether to display as Nightingale rose chart.
- 'radius': Fan angle is same, radius varies.
- 'area': Fan area varies with value.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1464](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1464)

Whether to show the series.

#### Inherited from

[`BaseSeriesOption`](BaseSeriesOption.md).[`show`](BaseSeriesOption.md#show)

***

### startAngle?

> `optional` **startAngle**: `number`

Defined in: [render/src/types.ts:1693](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1693)

Start angle of the pie chart (in degrees).

#### Default

```ts
90 (12 o'clock)
```

***

### stillShowZeroSum?

> `optional` **stillShowZeroSum**: `boolean`

Defined in: [render/src/types.ts:1688](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1688)

Whether to still show a sector if all data values are zero.

***

### type

> **type**: `"pie"` \| `"doughnut"` \| `"half-doughnut"`

Defined in: [render/src/types.ts:1656](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1656)

Series type (explicitly set it to get more accurate IntelliSense).
e.g., 'line', 'bar', 'pie'.

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
