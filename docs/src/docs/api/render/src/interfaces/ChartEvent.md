[**HudX API**](../../../README.md)

***

# Interface: ChartEvent

Defined in: [render/src/types.ts:1991](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1991)

Chart event payload (similar to ECharts event params) used by `HChartProps.onEvents`.

Different components/series may populate different fields, but it typically includes:\n
- `seriesType/seriesIndex/seriesName`\n
- `name/dataIndex/value`\n

## Indexable

\[`key`: `string`\]: `any`

## Properties

### componentIndex?

> `optional` **componentIndex**: `number`

Defined in: [render/src/types.ts:2005](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2005)

Component index

***

### componentType?

> `optional` **componentType**: `string`

Defined in: [render/src/types.ts:2003](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2003)

Component type

***

### data?

> `optional` **data**: `any`

Defined in: [render/src/types.ts:2017](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2017)

Data item

***

### dataIndex?

> `optional` **dataIndex**: `number`

Defined in: [render/src/types.ts:2015](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2015)

Data index

***

### event?

> `optional` **event**: `any`

Defined in: [render/src/types.ts:2001](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2001)

Original event object

***

### name?

> `optional` **name**: `string`

Defined in: [render/src/types.ts:2013](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2013)

Data name

***

### seriesIndex?

> `optional` **seriesIndex**: `number`

Defined in: [render/src/types.ts:2009](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2009)

Series index

***

### seriesName?

> `optional` **seriesName**: `string`

Defined in: [render/src/types.ts:2011](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2011)

Series name

***

### seriesType?

> `optional` **seriesType**: `string`

Defined in: [render/src/types.ts:2007](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2007)

Series type

***

### type

> **type**: `string`

Defined in: [render/src/types.ts:1999](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1999)

Event type.

Common values:
- `EVENT_TYPE_SHOW_TIP` ('showTip'): Event for triggering tooltip display
- 'click', 'mousemove', etc.: Native DOM events

***

### value?

> `optional` **value**: `any`

Defined in: [render/src/types.ts:2019](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L2019)

Data value
