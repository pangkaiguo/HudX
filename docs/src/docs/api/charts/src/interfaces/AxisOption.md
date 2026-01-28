[**HudX API**](../../../README.md)

***

# Interface: AxisOption

Defined in: render/dist/types.d.ts:1109

Axis option (similar to ECharts `xAxis` / `yAxis`).

HudX currently focuses on `value` and `category`. If `type` is omitted but `data`
is provided, some charts may auto-detect it as `category`.

## Example

```ts
const option: ChartOption = {
  xAxis: { type: 'category', data: ['Mon', 'Tue'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [10, 20] }],
};
```

## Indexable

\[`key`: `string`\]: `any`

## Properties

### axisLabel?

> `optional` **axisLabel**: [`AxisLabelOption`](AxisLabelOption.md)

Defined in: render/dist/types.d.ts:1176

Axis label configuration.

***

### axisLine?

> `optional` **axisLine**: [`AxisLineOption`](AxisLineOption.md)

Defined in: render/dist/types.d.ts:1180

Axis line configuration.

***

### axisTick?

> `optional` **axisTick**: [`AxisTickOption`](AxisTickOption.md)

Defined in: render/dist/types.d.ts:1184

Axis tick configuration.

***

### boundaryGap?

> `optional` **boundaryGap**: `boolean` \| \[`string` \| `number`, `string` \| `number`\]

Defined in: render/dist/types.d.ts:1172

Boundary gap.
- For category axis: boolean (true means data is centered in the band).
- For value axis: [min, max] (extend the range).

***

### data?

> `optional` **data**: `any`[]

Defined in: render/dist/types.d.ts:1123

Axis data.
Required for 'category' axis.

#### Example

```ts
['Mon', 'Tue', 'Wed']
```

***

### gridIndex?

> `optional` **gridIndex**: `number`

Defined in: render/dist/types.d.ts:1132

Index of the grid component this axis belongs to.
Useful when there are multiple grids.

***

### interval?

> `optional` **interval**: `number`

Defined in: render/dist/types.d.ts:1242

Compulsory interval between ticks.

***

### inverse?

> `optional` **inverse**: `boolean`

Defined in: render/dist/types.d.ts:1166

Whether to inverse the axis direction.

***

### logBase?

> `optional` **logBase**: `number`

Defined in: render/dist/types.d.ts:1247

Base of logarithm (for type: 'log').

#### Default

```ts
10
```

***

### max?

> `optional` **max**: `number` \| `"dataMax"` \| (`value`) => `number`

Defined in: render/dist/types.d.ts:1217

Maximum value of the axis.
- number: Exact value.
- 'dataMax': Maximum value in data.
- Function: (value) => number.

***

### maxInterval?

> `optional` **maxInterval**: `number`

Defined in: render/dist/types.d.ts:1238

Maximum interval between ticks.

***

### min?

> `optional` **min**: `number` \| `"dataMin"` \| (`value`) => `number`

Defined in: render/dist/types.d.ts:1207

Minimum value of the axis.
- number: Exact value.
- 'dataMin': Minimum value in data.
- Function: (value) => number.

***

### minInterval?

> `optional` **minInterval**: `number`

Defined in: render/dist/types.d.ts:1234

Minimum interval between ticks.

***

### minorSplitLine?

> `optional` **minorSplitLine**: [`SplitLineOption`](SplitLineOption.md)

Defined in: render/dist/types.d.ts:1196

Minor split line configuration.

***

### minorTick?

> `optional` **minorTick**: [`AxisTickOption`](AxisTickOption.md)

Defined in: render/dist/types.d.ts:1188

Minor tick configuration.

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1146

Name of the axis.

***

### nameGap?

> `optional` **nameGap**: `number`

Defined in: render/dist/types.d.ts:1158

Gap between axis name and axis line.

***

### nameLocation?

> `optional` **nameLocation**: `"start"` \| `"middle"` \| `"center"` \| `"end"`

Defined in: render/dist/types.d.ts:1150

Location of the axis name.

***

### nameRotate?

> `optional` **nameRotate**: `number`

Defined in: render/dist/types.d.ts:1162

Rotation of the axis name (in degrees).

***

### nameTextStyle?

> `optional` **nameTextStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:1154

Text style of the axis name.

***

### offset?

> `optional` **offset**: `number`

Defined in: render/dist/types.d.ts:1142

Offset from the default position.

***

### position?

> `optional` **position**: `"top"` \| `"bottom"` \| `"left"` \| `"right"`

Defined in: render/dist/types.d.ts:1138

Axis position.
- 'top' or 'bottom' for x-axis.
- 'left' or 'right' for y-axis.

***

### scale?

> `optional` **scale**: `boolean`

Defined in: render/dist/types.d.ts:1225

Whether to scale the axis to available data.
If true, the axis will not force the zero point to be included.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1127

Whether to show the axis.

***

### silent?

> `optional` **silent**: `boolean`

Defined in: render/dist/types.d.ts:1251

Whether the axis is silent (ignores mouse events).

***

### splitArea?

> `optional` **splitArea**: [`SplitAreaOption`](SplitAreaOption.md)

Defined in: render/dist/types.d.ts:1200

Split area configuration (striped background).

***

### splitLine?

> `optional` **splitLine**: [`SplitLineOption`](SplitLineOption.md)

Defined in: render/dist/types.d.ts:1192

Split line configuration (grid lines).

***

### splitNumber?

> `optional` **splitNumber**: `number`

Defined in: render/dist/types.d.ts:1230

Number of segments to split the axis into.
(Guideline only).

***

### triggerEvent?

> `optional` **triggerEvent**: `boolean`

Defined in: render/dist/types.d.ts:1255

Whether to trigger mouse events on axis labels/name.

***

### type?

> `optional` **type**: `"value"` \| `"category"` \| `"time"` \| `"log"`

Defined in: render/dist/types.d.ts:1117

Axis type.
- 'value': Numerical axis.
- 'category': Category axis (requires `data`).
- 'time': Time axis.
- 'log': Logarithmic axis.

***

### z?

> `optional` **z**: `number`

Defined in: render/dist/types.d.ts:1259

Z-index of the axis.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: render/dist/types.d.ts:1263

Z-level of the axis.
