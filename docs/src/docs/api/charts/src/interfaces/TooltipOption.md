[**HudX API**](../../../README.md)

***

# Interface: TooltipOption

Defined in: render/dist/types.d.ts:376

Tooltip option (similar to ECharts `tooltip`).

HudX tooltip is rendered as DOM by default (`renderMode: 'html'`) and `formatter`
can return an HTML string.

## Example

```ts
const option: ChartOption = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: (params) => {
      const items = Array.isArray(params) ? params : [params];
      return items.map((it) => `${it.seriesName}: ${it.value}`).join('<br/>');
    },
  },
};
```

## Indexable

\[`key`: `string`\]: `any`

## Properties

### alwaysShowContent?

> `optional` **alwaysShowContent**: `boolean`

Defined in: render/dist/types.d.ts:473

Whether to always show the tooltip content.

***

### appendToBody?

> `optional` **appendToBody**: `boolean`

Defined in: render/dist/types.d.ts:449

Whether to append the tooltip DOM to document.body.
Useful when the chart container has overflow:hidden.

***

### axisPointer?

> `optional` **axisPointer**: `object`

Defined in: render/dist/types.d.ts:395

Configuration for the axis pointer (the indicator shown when hovering).

#### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

#### shadowStyle?

> `optional` **shadowStyle**: [`ItemStyleOption`](ItemStyleOption.md)

#### type?

> `optional` **type**: `"none"` \| `"line"` \| `"shadow"`

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: render/dist/types.d.ts:414

Background color of the tooltip container.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: render/dist/types.d.ts:418

Border color of the tooltip container.

***

### borderRadius?

> `optional` **borderRadius**: `number`

Defined in: render/dist/types.d.ts:426

Border radius of the tooltip container.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: render/dist/types.d.ts:422

Border width of the tooltip container.

***

### className?

> `optional` **className**: `string`

Defined in: render/dist/types.d.ts:444

Custom CSS class name for the tooltip container.

***

### confine?

> `optional` **confine**: `boolean`

Defined in: render/dist/types.d.ts:453

Whether to confine the tooltip within the chart container.

***

### enterable?

> `optional` **enterable**: `boolean`

Defined in: render/dist/types.d.ts:493

Whether the mouse can enter the tooltip container.

***

### extraCssText?

> `optional` **extraCssText**: `string`

Defined in: render/dist/types.d.ts:440

Extra CSS text to append to the tooltip's DOM element.
(Only works when renderMode is 'html')

***

### formatter?

> `optional` **formatter**: `string` \| (`params`) => `string`

Defined in: render/dist/types.d.ts:410

Content formatter.
Can be a string template or a callback function.

- With `trigger: 'item'`, `params` is usually a single object.
- With `trigger: 'axis'`, `params` is usually an array (multiple series at the same axis point).

The `params` object typically contains:
`seriesName`, `name` (data name), `value`, `color`, etc.

***

### hideDelay?

> `optional` **hideDelay**: `number`

Defined in: render/dist/types.d.ts:489

Delay before hiding the tooltip (ms).

***

### htmlStyles?

> `optional` **htmlStyles**: `object`

Defined in: render/dist/types.d.ts:512

Custom CSS styles for generated HTML elements.
Allows fine-grained control over internal tooltip structure.

#### blockContainer?

> `optional` **blockContainer**: `string`

Style for the container block in vertical/rich layout

#### label?

> `optional` **label**: `string`

Style for the label text

#### labelContainer?

> `optional` **labelContainer**: `string`

Style for the label container (marker + title)

#### richLabel?

> `optional` **richLabel**: `string`

Style for rich layout label

#### richRow?

> `optional` **richRow**: `string`

Style for rich layout row

#### richValue?

> `optional` **richValue**: `string`

Style for rich layout value

#### row?

> `optional` **row**: `string`

Style for the container of a single item row

#### value?

> `optional` **value**: `string`

Style for the value text

***

### layout?

> `optional` **layout**: `"horizontal"` \| `"vertical"` \| `"rich"`

Defined in: render/dist/types.d.ts:507

Layout mode for tooltip content.

***

### order?

> `optional` **order**: `"seriesAsc"` \| `"seriesDesc"` \| `"valueAsc"` \| `"valueDesc"`

Defined in: render/dist/types.d.ts:503

Sorting order of tooltip items.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:431

Padding of the tooltip container.
[top, right, bottom, left]

***

### position?

> `optional` **position**: `string` \| `number`[] \| (`point`, `params`, `dom`, `rect`, `size`) => `number`[]

Defined in: render/dist/types.d.ts:465

Tooltip position configuration.
- 'top', 'left', 'right', 'bottom', 'inside'
- [x, y] (absolute position)
- Function returning [x, y]

***

### renderMode?

> `optional` **renderMode**: `"html"` \| `"richText"`

Defined in: render/dist/types.d.ts:499

Render mode for the tooltip.
- 'html': Render as HTML DOM (default).
- 'richText': Render using canvas rich text.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:380

Whether to show the tooltip.

***

### showContent?

> `optional` **showContent**: `boolean`

Defined in: render/dist/types.d.ts:469

Whether to show the tooltip content.

***

### showDelay?

> `optional` **showDelay**: `number`

Defined in: render/dist/types.d.ts:485

Delay before showing the tooltip (ms).

***

### size?

> `optional` **size**: `"small"` \| `"medium"` \| `"medium-small"`

Defined in: render/dist/types.d.ts:391

Preset visual size style.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:435

Text style for the tooltip content.

***

### transitionDuration?

> `optional` **transitionDuration**: `number`

Defined in: render/dist/types.d.ts:458

Transition duration for tooltip movement (in seconds).
Note: This might be in seconds or ms depending on implementation, usually 0.4s.

***

### trigger?

> `optional` **trigger**: `"item"` \| `"axis"` \| `"none"`

Defined in: render/dist/types.d.ts:387

Trigger type.
- 'item': Triggered by data items (scatter, pie).
- 'axis': Triggered by axes (line, bar).
- 'none': Not triggered by mouse events.

***

### triggerOn?

> `optional` **triggerOn**: `"none"` \| `"mousemove"` \| `"click"` \| "mousemove\|click"

Defined in: render/dist/types.d.ts:481

Conditions to trigger the tooltip.
- 'mousemove': Trigger on mouse move.
- 'click': Trigger on mouse click.
- 'mousemove|click': Trigger on both.
- 'none': Do not trigger.
