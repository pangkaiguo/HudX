[**HudX API**](../../../README.md)

***

# Interface: TooltipOption

Defined in: [render/src/types.ts:546](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L546)

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

Defined in: [render/src/types.ts:652](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L652)

Whether to always show the tooltip content.

***

### appendToBody?

> `optional` **appendToBody**: `boolean`

Defined in: [render/src/types.ts:619](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L619)

Whether to append the tooltip DOM to document.body.
Useful when the chart container has overflow:hidden.

***

### axisPointer?

> `optional` **axisPointer**: `object`

Defined in: [render/src/types.ts:565](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L565)

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

Defined in: [render/src/types.ts:584](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L584)

Background color of the tooltip container.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: [render/src/types.ts:588](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L588)

Border color of the tooltip container.

***

### borderRadius?

> `optional` **borderRadius**: `number`

Defined in: [render/src/types.ts:596](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L596)

Border radius of the tooltip container.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: [render/src/types.ts:592](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L592)

Border width of the tooltip container.

***

### className?

> `optional` **className**: `string`

Defined in: [render/src/types.ts:614](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L614)

Custom CSS class name for the tooltip container.

***

### confine?

> `optional` **confine**: `boolean`

Defined in: [render/src/types.ts:623](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L623)

Whether to confine the tooltip within the chart container.

***

### enterable?

> `optional` **enterable**: `boolean`

Defined in: [render/src/types.ts:672](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L672)

Whether the mouse can enter the tooltip container.

***

### extraCssText?

> `optional` **extraCssText**: `string`

Defined in: [render/src/types.ts:610](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L610)

Extra CSS text to append to the tooltip's DOM element.
(Only works when renderMode is 'html')

***

### formatter?

> `optional` **formatter**: `string` \| (`params`) => `string`

Defined in: [render/src/types.ts:580](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L580)

Content formatter.
Can be a string template or a callback function.

- With `trigger: 'item'`, `params` is usually a single object.
- With `trigger: 'axis'`, `params` is usually an array (multiple series at the same axis point).

The `params` object typically contains:
`seriesName`, `name` (data name), `value`, `color`, etc.

***

### hideDelay?

> `optional` **hideDelay**: `number`

Defined in: [render/src/types.ts:668](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L668)

Delay before hiding the tooltip (ms).

***

### htmlStyles?

> `optional` **htmlStyles**: `object`

Defined in: [render/src/types.ts:691](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L691)

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

Defined in: [render/src/types.ts:686](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L686)

Layout mode for tooltip content.

***

### order?

> `optional` **order**: `"seriesAsc"` \| `"seriesDesc"` \| `"valueAsc"` \| `"valueDesc"`

Defined in: [render/src/types.ts:682](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L682)

Sorting order of tooltip items.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: [render/src/types.ts:601](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L601)

Padding of the tooltip container.
[top, right, bottom, left]

***

### position?

> `optional` **position**: `string` \| `number`[] \| (`point`, `params`, `dom`, `rect`, `size`) => `number`[]

Defined in: [render/src/types.ts:635](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L635)

Tooltip position configuration.
- 'top', 'left', 'right', 'bottom', 'inside'
- [x, y] (absolute position)
- Function returning [x, y]

***

### renderMode?

> `optional` **renderMode**: `"html"` \| `"richText"`

Defined in: [render/src/types.ts:678](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L678)

Render mode for the tooltip.
- 'html': Render as HTML DOM (default).
- 'richText': Render using canvas rich text.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:550](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L550)

Whether to show the tooltip.

***

### showContent?

> `optional` **showContent**: `boolean`

Defined in: [render/src/types.ts:648](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L648)

Whether to show the tooltip content.

***

### showDelay?

> `optional` **showDelay**: `number`

Defined in: [render/src/types.ts:664](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L664)

Delay before showing the tooltip (ms).

***

### size?

> `optional` **size**: `"medium-small"` \| `"small"` \| `"medium"`

Defined in: [render/src/types.ts:561](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L561)

Preset visual size style.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:605](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L605)

Text style for the tooltip content.

***

### transitionDuration?

> `optional` **transitionDuration**: `number`

Defined in: [render/src/types.ts:628](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L628)

Transition duration for tooltip movement (in seconds).
Note: This might be in seconds or ms depending on implementation, usually 0.4s.

***

### trigger?

> `optional` **trigger**: `"item"` \| `"axis"` \| `"none"`

Defined in: [render/src/types.ts:557](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L557)

Trigger type.
- 'item': Triggered by data items (scatter, pie).
- 'axis': Triggered by axes (line, bar).
- 'none': Not triggered by mouse events.

***

### triggerOn?

> `optional` **triggerOn**: `"none"` \| `"mousemove"` \| `"click"` \| "mousemove\|click"

Defined in: [render/src/types.ts:660](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L660)

Conditions to trigger the tooltip.
- 'mousemove': Trigger on mouse move.
- 'click': Trigger on mouse click.
- 'mousemove|click': Trigger on both.
- 'none': Do not trigger.
