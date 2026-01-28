[**HudX API**](../../../README.md)

***

# Interface: AxisOption

Defined in: [render/src/types.ts:1139](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1139)

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

Defined in: [render/src/types.ts:1206](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1206)

Axis label configuration.

***

### axisLine?

> `optional` **axisLine**: [`AxisLineOption`](AxisLineOption.md)

Defined in: [render/src/types.ts:1210](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1210)

Axis line configuration.

***

### axisTick?

> `optional` **axisTick**: [`AxisTickOption`](AxisTickOption.md)

Defined in: [render/src/types.ts:1214](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1214)

Axis tick configuration.

***

### boundaryGap?

> `optional` **boundaryGap**: `boolean` \| \[`string` \| `number`, `string` \| `number`\]

Defined in: [render/src/types.ts:1202](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1202)

Boundary gap.
- For category axis: boolean (true means data is centered in the band).
- For value axis: [min, max] (extend the range).

***

### data?

> `optional` **data**: `any`[]

Defined in: [render/src/types.ts:1153](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1153)

Axis data.
Required for 'category' axis.

#### Example

```ts
['Mon', 'Tue', 'Wed']
```

***

### gridIndex?

> `optional` **gridIndex**: `number`

Defined in: [render/src/types.ts:1162](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1162)

Index of the grid component this axis belongs to.
Useful when there are multiple grids.

***

### interval?

> `optional` **interval**: `number`

Defined in: [render/src/types.ts:1266](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1266)

Compulsory interval between ticks.

***

### inverse?

> `optional` **inverse**: `boolean`

Defined in: [render/src/types.ts:1196](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1196)

Whether to inverse the axis direction.

***

### logBase?

> `optional` **logBase**: `number`

Defined in: [render/src/types.ts:1271](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1271)

Base of logarithm (for type: 'log').

#### Default

```ts
10
```

***

### max?

> `optional` **max**: `number` \| `"dataMax"` \| (`value`) => `number`

Defined in: [render/src/types.ts:1244](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1244)

Maximum value of the axis.
- number: Exact value.
- 'dataMax': Maximum value in data.
- Function: (value) => number.

***

### maxInterval?

> `optional` **maxInterval**: `number`

Defined in: [render/src/types.ts:1262](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1262)

Maximum interval between ticks.

***

### min?

> `optional` **min**: `number` \| `"dataMin"` \| (`value`) => `number`

Defined in: [render/src/types.ts:1237](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1237)

Minimum value of the axis.
- number: Exact value.
- 'dataMin': Minimum value in data.
- Function: (value) => number.

***

### minInterval?

> `optional` **minInterval**: `number`

Defined in: [render/src/types.ts:1258](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1258)

Minimum interval between ticks.

***

### minorSplitLine?

> `optional` **minorSplitLine**: [`SplitLineOption`](SplitLineOption.md)

Defined in: [render/src/types.ts:1226](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1226)

Minor split line configuration.

***

### minorTick?

> `optional` **minorTick**: [`AxisTickOption`](AxisTickOption.md)

Defined in: [render/src/types.ts:1218](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1218)

Minor tick configuration.

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:1176](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1176)

Name of the axis.

***

### nameGap?

> `optional` **nameGap**: `number`

Defined in: [render/src/types.ts:1188](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1188)

Gap between axis name and axis line.

***

### nameLocation?

> `optional` **nameLocation**: `"center"` \| `"middle"` \| `"start"` \| `"end"`

Defined in: [render/src/types.ts:1180](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1180)

Location of the axis name.

***

### nameRotate?

> `optional` **nameRotate**: `number`

Defined in: [render/src/types.ts:1192](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1192)

Rotation of the axis name (in degrees).

***

### nameTextStyle?

> `optional` **nameTextStyle**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:1184](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1184)

Text style of the axis name.

***

### offset?

> `optional` **offset**: `number`

Defined in: [render/src/types.ts:1172](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1172)

Offset from the default position.

***

### position?

> `optional` **position**: `"left"` \| `"top"` \| `"right"` \| `"bottom"`

Defined in: [render/src/types.ts:1168](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1168)

Axis position.
- 'top' or 'bottom' for x-axis.
- 'left' or 'right' for y-axis.

***

### scale?

> `optional` **scale**: `boolean`

Defined in: [render/src/types.ts:1249](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1249)

Whether to scale the axis to available data.
If true, the axis will not force the zero point to be included.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1157](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1157)

Whether to show the axis.

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [render/src/types.ts:1275](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1275)

Whether the axis is silent (ignores mouse events).

***

### splitArea?

> `optional` **splitArea**: [`SplitAreaOption`](SplitAreaOption.md)

Defined in: [render/src/types.ts:1230](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1230)

Split area configuration (striped background).

***

### splitLine?

> `optional` **splitLine**: [`SplitLineOption`](SplitLineOption.md)

Defined in: [render/src/types.ts:1222](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1222)

Split line configuration (grid lines).

***

### splitNumber?

> `optional` **splitNumber**: `number`

Defined in: [render/src/types.ts:1254](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1254)

Number of segments to split the axis into.
(Guideline only).

***

### triggerEvent?

> `optional` **triggerEvent**: `boolean`

Defined in: [render/src/types.ts:1279](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1279)

Whether to trigger mouse events on axis labels/name.

***

### type?

> `optional` **type**: `"value"` \| `"category"` \| `"time"` \| `"log"`

Defined in: [render/src/types.ts:1147](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1147)

Axis type.
- 'value': Numerical axis.
- 'category': Category axis (requires `data`).
- 'time': Time axis.
- 'log': Logarithmic axis.

***

### z?

> `optional` **z**: `number`

Defined in: [render/src/types.ts:1283](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1283)

Z-index of the axis.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: [render/src/types.ts:1287](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1287)

Z-level of the axis.
