[**HudX API**](../../../README.md)

***

# Interface: ChartEvent

Defined in: render/dist/types.d.ts:1907

Chart event payload (similar to ECharts event params) used by `HChartProps.onEvents`.

Different components/series may populate different fields, but it typically includes:\n
- `seriesType/seriesIndex/seriesName`\n
- `name/dataIndex/value`\n

## Indexable

\[`key`: `string`\]: `any`

## Properties

### componentIndex?

> `optional` **componentIndex**: `number`

Defined in: render/dist/types.d.ts:1921

Component index

***

### componentType?

> `optional` **componentType**: `string`

Defined in: render/dist/types.d.ts:1919

Component type

***

### data?

> `optional` **data**: `any`

Defined in: render/dist/types.d.ts:1933

Data item

***

### dataIndex?

> `optional` **dataIndex**: `number`

Defined in: render/dist/types.d.ts:1931

Data index

***

### event?

> `optional` **event**: `any`

Defined in: render/dist/types.d.ts:1917

Original event object

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1929

Data name

***

### seriesIndex?

> `optional` **seriesIndex**: `number`

Defined in: render/dist/types.d.ts:1925

Series index

***

### seriesName?

> `optional` **seriesName**: `string`

Defined in: render/dist/types.d.ts:1927

Series name

***

### seriesType?

> `optional` **seriesType**: `string`

Defined in: render/dist/types.d.ts:1923

Series type

***

### type

> **type**: `string`

Defined in: render/dist/types.d.ts:1915

Event type.

Common values:
- `EVENT_TYPE_SHOW_TIP` ('showTip'): Event for triggering tooltip display
- 'click', 'mousemove', etc.: Native DOM events

***

### value?

> `optional` **value**: `any`

Defined in: render/dist/types.d.ts:1935

Data value
