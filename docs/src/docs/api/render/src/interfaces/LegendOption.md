[**HudX API**](../../../README.md)

***

# Interface: LegendOption

Defined in: [render/src/types.ts:844](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L844)

Legend option (similar to ECharts `legend`).

## Example

```ts
const option: ChartOption = {
  legend: { show: true, orient: 'vertical', right: 10, top: 10 },
  series: [{ type: 'line', name: 'A', data: [1, 2, 3] }],
};
```

## Indexable

\[`key`: `string`\]: `any`

## Properties

### align?

> `optional` **align**: `"left"` \| `"center"` \| `"right"`

Defined in: [render/src/types.ts:920](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L920)

Text alignment within the legend item.

***

### animation?

> `optional` **animation**: `boolean`

Defined in: [render/src/types.ts:1052](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1052)

Whether to enable animation when switching pages.

***

### animationDurationUpdate?

> `optional` **animationDurationUpdate**: `number`

Defined in: [render/src/types.ts:1056](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1056)

Animation duration for legend updates.

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [render/src/types.ts:977](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L977)

Background color of the legend component.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: [render/src/types.ts:981](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L981)

Border color of the legend component.

***

### borderRadius?

> `optional` **borderRadius**: `number` \| `number`[]

Defined in: [render/src/types.ts:989](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L989)

Border radius of the legend component.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: [render/src/types.ts:985](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L985)

Border width of the legend component.

***

### bottom?

> `optional` **bottom**: `string` \| `number`

Defined in: [render/src/types.ts:883](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L883)

Distance from bottom side of container.

***

### data?

> `optional` **data**: `string`[] \| `object`[]

Defined in: [render/src/types.ts:867](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L867)

Legend data.
- `string[]`: simple list of series names.
- `Object[]`: detailed configuration for each item.
  - `name`: series name.
  - `icon`: icon type for this item.
  - `textStyle`: text style for this item.

***

### formatter?

> `optional` **formatter**: `string` \| (`name`, `item`) => `string` \| `string`[]

Defined in: [render/src/types.ts:907](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L907)

Custom formatter for legend labels.

***

### height?

> `optional` **height**: `string` \| `number`

Defined in: [render/src/types.ts:891](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L891)

Height of the legend component.

***

### icon?

> `optional` **icon**: `string`

Defined in: [render/src/types.ts:973](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L973)

Icon type for legend items.
- 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
- 'image://url' for images.
- 'path://...' for SVG paths.

***

### inactiveColor?

> `optional` **inactiveColor**: `string`

Defined in: [render/src/types.ts:953](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L953)

Color of legend items when they are unselected (inactive).

***

### itemGap?

> `optional` **itemGap**: `number`

Defined in: [render/src/types.ts:929](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L929)

Gap between each legend item.

***

### itemHeight?

> `optional` **itemHeight**: `number`

Defined in: [render/src/types.ts:937](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L937)

Height of the legend symbol (icon).

***

### itemMaxWidth?

> `optional` **itemMaxWidth**: `number`

Defined in: [render/src/types.ts:916](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L916)

Maximum width of a legend item.
Text exceeding this width will be truncated.

***

### itemWidth?

> `optional` **itemWidth**: `number`

Defined in: [render/src/types.ts:933](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L933)

Width of the legend symbol (icon).

***

### left?

> `optional` **left**: `string` \| `number`

Defined in: [render/src/types.ts:871](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L871)

Distance from left side of container.

***

### orient?

> `optional` **orient**: `"horizontal"` \| `"vertical"`

Defined in: [render/src/types.ts:897](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L897)

Layout orientation.
- 'horizontal': Items are arranged horizontally.
- 'vertical': Items are arranged vertically.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: [render/src/types.ts:925](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L925)

Padding around the legend component.
[top, right, bottom, left]

***

### pageButtonGap?

> `optional` **pageButtonGap**: `number`

Defined in: [render/src/types.ts:1017](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1017)

Gap between page buttons.

***

### pageButtonItemGap?

> `optional` **pageButtonItemGap**: `number`

Defined in: [render/src/types.ts:1013](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1013)

Gap between page buttons and legend items.

***

### pageButtonPosition?

> `optional` **pageButtonPosition**: `"start"` \| `"end"`

Defined in: [render/src/types.ts:1021](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1021)

Position of page buttons.

***

### pageFormatter?

> `optional` **pageFormatter**: `string` \| `Function`

Defined in: [render/src/types.ts:1025](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1025)

Formatter for page info text (e.g. "1/2").

***

### pageIconColor?

> `optional` **pageIconColor**: `string`

Defined in: [render/src/types.ts:1036](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1036)

Color of page buttons.

***

### pageIconInactiveColor?

> `optional` **pageIconInactiveColor**: `string`

Defined in: [render/src/types.ts:1040](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1040)

Color of inactive page buttons.

***

### pageIcons?

> `optional` **pageIcons**: `object`

Defined in: [render/src/types.ts:1029](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1029)

Icons for page buttons.

#### horizontal?

> `optional` **horizontal**: `string`[]

#### vertical?

> `optional` **vertical**: `string`[]

***

### pageIconSize?

> `optional` **pageIconSize**: `number` \| `number`[]

Defined in: [render/src/types.ts:1044](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1044)

Size of page buttons.

***

### pageTextStyle?

> `optional` **pageTextStyle**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:1048](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1048)

Text style for page info.

***

### renderMode?

> `optional` **renderMode**: `"canvas"` \| `"html"`

Defined in: [render/src/types.ts:903](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L903)

Render mode for the legend.
- 'canvas': Drawn on the canvas (default).
- 'html': Rendered as HTML elements (good for accessibility/SEO).

***

### right?

> `optional` **right**: `string` \| `number`

Defined in: [render/src/types.ts:879](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L879)

Distance from right side of container.

***

### scrollDataIndex?

> `optional` **scrollDataIndex**: `number`

Defined in: [render/src/types.ts:1009](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1009)

Initial scroll index (for scrollable legends).

***

### selected?

> `optional` **selected**: `object`

Defined in: [render/src/types.ts:958](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L958)

Initial selected state of legend items.
Map of series name to boolean.

#### Index Signature

\[`name`: `string`\]: `boolean`

***

### selectedMode?

> `optional` **selectedMode**: `boolean` \| `"single"` \| `"multiple"`

Defined in: [render/src/types.ts:949](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L949)

Selection mode.
- true: Multiple selection.
- 'single': Single selection (radio button behavior).
- 'multiple': Multiple selection (checkbox behavior).
- false: Selection disabled.

***

### shadowBlur?

> `optional` **shadowBlur**: `number`

Defined in: [render/src/types.ts:993](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L993)

Shadow blur size.

***

### shadowColor?

> `optional` **shadowColor**: `string`

Defined in: [render/src/types.ts:997](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L997)

Shadow color.

***

### shadowOffsetX?

> `optional` **shadowOffsetX**: `number`

Defined in: [render/src/types.ts:1001](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1001)

Shadow X offset.

***

### shadowOffsetY?

> `optional` **shadowOffsetY**: `number`

Defined in: [render/src/types.ts:1005](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1005)

Shadow Y offset.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:848](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L848)

Whether to show the legend.

***

### symbolKeepAspect?

> `optional` **symbolKeepAspect**: `boolean`

Defined in: [render/src/types.ts:941](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L941)

Whether to keep the aspect ratio of the legend symbol.

***

### tableHead?

> `optional` **tableHead**: `string`[]

Defined in: [render/src/types.ts:911](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L911)

Table header labels for HTML render mode.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:962](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L962)

Text style for legend labels.

***

### tooltip?

> `optional` **tooltip**: [`TooltipOption`](TooltipOption.md)

Defined in: [render/src/types.ts:966](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L966)

Tooltip configuration for hovering over legend items.

***

### top?

> `optional` **top**: `string` \| `number`

Defined in: [render/src/types.ts:875](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L875)

Distance from top side of container.

***

### width?

> `optional` **width**: `string` \| `number`

Defined in: [render/src/types.ts:887](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L887)

Width of the legend component.

***

### z?

> `optional` **z**: `number`

Defined in: [render/src/types.ts:853](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L853)

Z-index of the legend component (2nd level).
Controls vertical stacking order relative to other components.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: [render/src/types.ts:858](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L858)

Canvas layer z-level (1st level).
Elements with different zlevel are placed in different canvas instances.
