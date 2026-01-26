[**HudX API**](../../../README.md)

***

# Interface: ChartEvent

Defined in: render/dist/types.d.ts:1760

Chart event payload (similar to ECharts event params) used by `HChartProps.onEvents`.

Different components/series may populate different fields, but it typically includes:\n
- `seriesType/seriesIndex/seriesName`\n
- `name/dataIndex/value`\n

## Indexable

\[`key`: `string`\]: `any`

## Properties

### componentIndex?

> `optional` **componentIndex**: `number`

Defined in: render/dist/types.d.ts:1774

Component index

***

### componentType?

> `optional` **componentType**: `string`

Defined in: render/dist/types.d.ts:1772

Component type

***

### data?

> `optional` **data**: `any`

Defined in: render/dist/types.d.ts:1786

Data item

***

### dataIndex?

> `optional` **dataIndex**: `number`

Defined in: render/dist/types.d.ts:1784

Data index

***

### event?

> `optional` **event**: `any`

Defined in: render/dist/types.d.ts:1770

Original event object

***

### name?

> `optional` **name**: `string`

Defined in: render/dist/types.d.ts:1782

Data name

***

### seriesIndex?

> `optional` **seriesIndex**: `number`

Defined in: render/dist/types.d.ts:1778

Series index

***

### seriesName?

> `optional` **seriesName**: `string`

Defined in: render/dist/types.d.ts:1780

Series name

***

### seriesType?

> `optional` **seriesType**: `string`

Defined in: render/dist/types.d.ts:1776

Series type

***

### type

> **type**: `string`

Defined in: render/dist/types.d.ts:1768

Event type.

Common values:
- `EVENT_TYPE_SHOW_TIP` ('showTip'): Event for triggering tooltip display
- 'click', 'mousemove', etc.: Native DOM events

***

### value?

> `optional` **value**: `any`

Defined in: render/dist/types.d.ts:1788

Data value
