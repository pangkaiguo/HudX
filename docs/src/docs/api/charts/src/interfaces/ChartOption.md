[**HudX API**](../../../README.md)

***

# Interface: ChartOption

Defined in: render/dist/types.d.ts:409

HudX chart option (ECharts-style).

This type is used directly by `hudx-charts`' `HChart` (`option` prop) and is the
primary surface for TS IntelliSense.

## Example

```ts
import type { ChartOption } from 'hudx-charts';

const option: ChartOption = {
  title: { text: 'Sales' },
  tooltip: { show: true, trigger: 'axis' },
  legend: { show: true },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', name: 'Sales', data: [120, 200, 150] }],
};
```

## Indexable

\[`key`: `string`\]: `any`

## Properties

### animation?

> `optional` **animation**: `boolean`

Defined in: render/dist/types.d.ts:432

Whether to enable animation

***

### animationDuration?

> `optional` **animationDuration**: `number`

Defined in: render/dist/types.d.ts:434

Animation duration in ms

***

### animationEasing?

> `optional` **animationEasing**: `string`

Defined in: render/dist/types.d.ts:436

Animation easing function

***

### aria?

> `optional` **aria**: [`AriaOption`](AriaOption.md)

Defined in: render/dist/types.d.ts:438

Accessibility options

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: render/dist/types.d.ts:430

Background color

***

### grid?

> `optional` **grid**: [`GridOption`](GridOption.md)

Defined in: render/dist/types.d.ts:417

Grid configuration

***

### legend?

> `optional` **legend**: [`LegendOption`](LegendOption.md)

Defined in: render/dist/types.d.ts:415

Legend configuration

***

### series?

> `optional` **series**: [`SeriesOption`](../type-aliases/SeriesOption.md)[]

Defined in: render/dist/types.d.ts:428

Series list.

Tip: explicitly set `type` (e.g. `'line' | 'bar' | 'pie'`) to get more accurate
field suggestions for that series.

***

### title?

> `optional` **title**: [`TitleOption`](TitleOption.md)

Defined in: render/dist/types.d.ts:411

Title configuration

***

### tooltip?

> `optional` **tooltip**: [`TooltipOption`](TooltipOption.md)

Defined in: render/dist/types.d.ts:413

Tooltip configuration

***

### xAxis?

> `optional` **xAxis**: [`AxisOption`](AxisOption.md) \| [`AxisOption`](AxisOption.md)[]

Defined in: render/dist/types.d.ts:419

X-axis configuration

***

### yAxis?

> `optional` **yAxis**: [`AxisOption`](AxisOption.md) \| [`AxisOption`](AxisOption.md)[]

Defined in: render/dist/types.d.ts:421

Y-axis configuration
