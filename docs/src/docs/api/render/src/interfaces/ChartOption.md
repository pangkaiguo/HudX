[**HudX API**](../../../README.md)

***

# Interface: ChartOption

Defined in: [render/src/types.ts:424](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L424)

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

Defined in: [render/src/types.ts:447](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L447)

Whether to enable animation

***

### animationDuration?

> `optional` **animationDuration**: `number`

Defined in: [render/src/types.ts:449](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L449)

Animation duration in ms

***

### animationEasing?

> `optional` **animationEasing**: `string`

Defined in: [render/src/types.ts:451](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L451)

Animation easing function

***

### aria?

> `optional` **aria**: [`AriaOption`](AriaOption.md)

Defined in: [render/src/types.ts:453](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L453)

Accessibility options

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [render/src/types.ts:445](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L445)

Background color

***

### grid?

> `optional` **grid**: [`GridOption`](GridOption.md)

Defined in: [render/src/types.ts:432](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L432)

Grid configuration

***

### legend?

> `optional` **legend**: [`LegendOption`](LegendOption.md)

Defined in: [render/src/types.ts:430](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L430)

Legend configuration

***

### series?

> `optional` **series**: [`SeriesOption`](../type-aliases/SeriesOption.md)[]

Defined in: [render/src/types.ts:443](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L443)

Series list.

Tip: explicitly set `type` (e.g. `'line' | 'bar' | 'pie'`) to get more accurate
field suggestions for that series.

***

### title?

> `optional` **title**: [`TitleOption`](TitleOption.md)

Defined in: [render/src/types.ts:426](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L426)

Title configuration

***

### tooltip?

> `optional` **tooltip**: [`TooltipOption`](TooltipOption.md)

Defined in: [render/src/types.ts:428](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L428)

Tooltip configuration

***

### xAxis?

> `optional` **xAxis**: [`AxisOption`](AxisOption.md) \| [`AxisOption`](AxisOption.md)[]

Defined in: [render/src/types.ts:434](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L434)

X-axis configuration

***

### yAxis?

> `optional` **yAxis**: [`AxisOption`](AxisOption.md) \| [`AxisOption`](AxisOption.md)[]

Defined in: [render/src/types.ts:436](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L436)

Y-axis configuration
