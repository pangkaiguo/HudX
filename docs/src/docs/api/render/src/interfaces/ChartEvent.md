[**HudX API**](../../../README.md)

***

# Interface: ChartEvent

Defined in: [render/src/types.ts:1995](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1995)

Chart event payload (similar to ECharts event params) used by `HChartProps.onEvents`.

Different components/series may populate different fields, but it typically includes:\n
- `seriesType/seriesIndex/seriesName`\n
- `name/dataIndex/value`\n

## Indexable

\[`key`: `string`\]: `any`

## Properties

### componentIndex?

> `optional` **componentIndex**: `number`

Defined in: [render/src/types.ts:2009](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2009)

Component index

***

### componentType?

> `optional` **componentType**: `string`

Defined in: [render/src/types.ts:2007](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2007)

Component type

***

### data?

> `optional` **data**: `any`

Defined in: [render/src/types.ts:2021](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2021)

Data item

***

### dataIndex?

> `optional` **dataIndex**: `number`

Defined in: [render/src/types.ts:2019](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2019)

Data index

***

### event?

> `optional` **event**: `any`

Defined in: [render/src/types.ts:2005](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2005)

Original event object

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:2017](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2017)

Data name

***

### seriesIndex?

> `optional` **seriesIndex**: `number`

Defined in: [render/src/types.ts:2013](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2013)

Series index

***

### seriesName?

> `optional` **seriesName**: `string`

Defined in: [render/src/types.ts:2015](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2015)

Series name

***

### seriesType?

> `optional` **seriesType**: `string`

Defined in: [render/src/types.ts:2011](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2011)

Series type

***

### type

> **type**: `string`

Defined in: [render/src/types.ts:2003](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2003)

Event type.

Common values:
- `EVENT_TYPE_SHOW_TIP` ('showTip'): Event for triggering tooltip display
- 'click', 'mousemove', etc.: Native DOM events

***

### value?

> `optional` **value**: `any`

Defined in: [render/src/types.ts:2023](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L2023)

Data value
