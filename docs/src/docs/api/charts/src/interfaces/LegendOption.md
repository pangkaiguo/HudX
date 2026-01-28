[**HudX API**](../../../README.md)

***

# Interface: LegendOption

Defined in: render/dist/types.d.ts:810

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

> `optional` **align**: `"left"` \| `"right"` \| `"center"`

Defined in: render/dist/types.d.ts:890

Text alignment within the legend item.

***

### animation?

> `optional` **animation**: `boolean`

Defined in: render/dist/types.d.ts:1024

Whether to enable animation when switching pages.

***

### animationDurationUpdate?

> `optional` **animationDurationUpdate**: `number`

Defined in: render/dist/types.d.ts:1028

Animation duration for legend updates.

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: render/dist/types.d.ts:949

Background color of the legend component.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: render/dist/types.d.ts:953

Border color of the legend component.

***

### borderRadius?

> `optional` **borderRadius**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:961

Border radius of the legend component.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: render/dist/types.d.ts:957

Border width of the legend component.

***

### bottom?

> `optional` **bottom**: `string` \| `number`

Defined in: render/dist/types.d.ts:853

Distance from bottom side of container.

***

### data?

> `optional` **data**: `string`[] \| `object`[]

Defined in: render/dist/types.d.ts:833

Legend data.
- `string[]`: simple list of series names.
- `Object[]`: detailed configuration for each item.
  - `name`: series name.
  - `icon`: icon type for this item.
  - `textStyle`: text style for this item.

***

### formatter?

> `optional` **formatter**: `string` \| (`name`, `item`) => `string` \| `string`[]

Defined in: render/dist/types.d.ts:877

Custom formatter for legend labels.

***

### height?

> `optional` **height**: `string` \| `number`

Defined in: render/dist/types.d.ts:861

Height of the legend component.

***

### icon?

> `optional` **icon**: `string`

Defined in: render/dist/types.d.ts:945

Icon type for legend items.
- 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
- 'image://url' for images.
- 'path://...' for SVG paths.

***

### inactiveColor?

> `optional` **inactiveColor**: `string`

Defined in: render/dist/types.d.ts:923

Color of legend items when they are unselected (inactive).

***

### itemGap?

> `optional` **itemGap**: `number`

Defined in: render/dist/types.d.ts:899

Gap between each legend item.

***

### itemHeight?

> `optional` **itemHeight**: `number`

Defined in: render/dist/types.d.ts:907

Height of the legend symbol (icon).

***

### itemMaxWidth?

> `optional` **itemMaxWidth**: `number`

Defined in: render/dist/types.d.ts:886

Maximum width of a legend item.
Text exceeding this width will be truncated.

***

### itemWidth?

> `optional` **itemWidth**: `number`

Defined in: render/dist/types.d.ts:903

Width of the legend symbol (icon).

***

### left?

> `optional` **left**: `string` \| `number`

Defined in: render/dist/types.d.ts:841

Distance from left side of container.

***

### orient?

> `optional` **orient**: `"horizontal"` \| `"vertical"`

Defined in: render/dist/types.d.ts:867

Layout orientation.
- 'horizontal': Items are arranged horizontally.
- 'vertical': Items are arranged vertically.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:895

Padding around the legend component.
[top, right, bottom, left]

***

### pageButtonGap?

> `optional` **pageButtonGap**: `number`

Defined in: render/dist/types.d.ts:989

Gap between page buttons.

***

### pageButtonItemGap?

> `optional` **pageButtonItemGap**: `number`

Defined in: render/dist/types.d.ts:985

Gap between page buttons and legend items.

***

### pageButtonPosition?

> `optional` **pageButtonPosition**: `"start"` \| `"end"`

Defined in: render/dist/types.d.ts:993

Position of page buttons.

***

### pageFormatter?

> `optional` **pageFormatter**: `string` \| `Function`

Defined in: render/dist/types.d.ts:997

Formatter for page info text (e.g. "1/2").

***

### pageIconColor?

> `optional` **pageIconColor**: `string`

Defined in: render/dist/types.d.ts:1008

Color of page buttons.

***

### pageIconInactiveColor?

> `optional` **pageIconInactiveColor**: `string`

Defined in: render/dist/types.d.ts:1012

Color of inactive page buttons.

***

### pageIcons?

> `optional` **pageIcons**: `object`

Defined in: render/dist/types.d.ts:1001

Icons for page buttons.

#### horizontal?

> `optional` **horizontal**: `string`[]

#### vertical?

> `optional` **vertical**: `string`[]

***

### pageIconSize?

> `optional` **pageIconSize**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:1016

Size of page buttons.

***

### pageTextStyle?

> `optional` **pageTextStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:1020

Text style for page info.

***

### renderMode?

> `optional` **renderMode**: `"canvas"` \| `"html"`

Defined in: render/dist/types.d.ts:873

Render mode for the legend.
- 'canvas': Drawn on the canvas (default).
- 'html': Rendered as HTML elements (good for accessibility/SEO).

***

### right?

> `optional` **right**: `string` \| `number`

Defined in: render/dist/types.d.ts:849

Distance from right side of container.

***

### scrollDataIndex?

> `optional` **scrollDataIndex**: `number`

Defined in: render/dist/types.d.ts:981

Initial scroll index (for scrollable legends).

***

### selected?

> `optional` **selected**: `object`

Defined in: render/dist/types.d.ts:928

Initial selected state of legend items.
Map of series name to boolean.

#### Index Signature

\[`name`: `string`\]: `boolean`

***

### selectedMode?

> `optional` **selectedMode**: `boolean` \| `"multiple"` \| `"single"`

Defined in: render/dist/types.d.ts:919

Selection mode.
- true: Multiple selection.
- 'single': Single selection (radio button behavior).
- 'multiple': Multiple selection (checkbox behavior).
- false: Selection disabled.

***

### shadowBlur?

> `optional` **shadowBlur**: `number`

Defined in: render/dist/types.d.ts:965

Shadow blur size.

***

### shadowColor?

> `optional` **shadowColor**: `string`

Defined in: render/dist/types.d.ts:969

Shadow color.

***

### shadowOffsetX?

> `optional` **shadowOffsetX**: `number`

Defined in: render/dist/types.d.ts:973

Shadow X offset.

***

### shadowOffsetY?

> `optional` **shadowOffsetY**: `number`

Defined in: render/dist/types.d.ts:977

Shadow Y offset.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:814

Whether to show the legend.

***

### symbolKeepAspect?

> `optional` **symbolKeepAspect**: `boolean`

Defined in: render/dist/types.d.ts:911

Whether to keep the aspect ratio of the legend symbol.

***

### tableHead?

> `optional` **tableHead**: `string`[]

Defined in: render/dist/types.d.ts:881

Table header labels for HTML render mode.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:934

Text style for legend labels.

***

### tooltip?

> `optional` **tooltip**: [`TooltipOption`](TooltipOption.md)

Defined in: render/dist/types.d.ts:938

Tooltip configuration for hovering over legend items.

***

### top?

> `optional` **top**: `string` \| `number`

Defined in: render/dist/types.d.ts:845

Distance from top side of container.

***

### width?

> `optional` **width**: `string` \| `number`

Defined in: render/dist/types.d.ts:857

Width of the legend component.

***

### z?

> `optional` **z**: `number`

Defined in: render/dist/types.d.ts:819

Z-index of the legend component (2nd level).
Controls vertical stacking order relative to other components.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: render/dist/types.d.ts:824

Canvas layer z-level (1st level).
Elements with different zlevel are placed in different canvas instances.
