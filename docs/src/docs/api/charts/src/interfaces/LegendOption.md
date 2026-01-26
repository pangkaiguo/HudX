[**HudX API**](../../../README.md)

***

# Interface: LegendOption

Defined in: render/dist/types.d.ts:663

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

Defined in: render/dist/types.d.ts:743

Text alignment within the legend item.

***

### animation?

> `optional` **animation**: `boolean`

Defined in: render/dist/types.d.ts:877

Whether to enable animation when switching pages.

***

### animationDurationUpdate?

> `optional` **animationDurationUpdate**: `number`

Defined in: render/dist/types.d.ts:881

Animation duration for legend updates.

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: render/dist/types.d.ts:802

Background color of the legend component.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: render/dist/types.d.ts:806

Border color of the legend component.

***

### borderRadius?

> `optional` **borderRadius**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:814

Border radius of the legend component.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: render/dist/types.d.ts:810

Border width of the legend component.

***

### bottom?

> `optional` **bottom**: `string` \| `number`

Defined in: render/dist/types.d.ts:706

Distance from bottom side of container.

***

### data?

> `optional` **data**: `string`[] \| `object`[]

Defined in: render/dist/types.d.ts:686

Legend data.
- `string[]`: simple list of series names.
- `Object[]`: detailed configuration for each item.
  - `name`: series name.
  - `icon`: icon type for this item.
  - `textStyle`: text style for this item.

***

### formatter?

> `optional` **formatter**: `string` \| (`name`, `item`) => `string` \| `string`[]

Defined in: render/dist/types.d.ts:730

Custom formatter for legend labels.

***

### height?

> `optional` **height**: `string` \| `number`

Defined in: render/dist/types.d.ts:714

Height of the legend component.

***

### icon?

> `optional` **icon**: `string`

Defined in: render/dist/types.d.ts:798

Icon type for legend items.
- 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
- 'image://url' for images.
- 'path://...' for SVG paths.

***

### inactiveColor?

> `optional` **inactiveColor**: `string`

Defined in: render/dist/types.d.ts:776

Color of legend items when they are unselected (inactive).

***

### itemGap?

> `optional` **itemGap**: `number`

Defined in: render/dist/types.d.ts:752

Gap between each legend item.

***

### itemHeight?

> `optional` **itemHeight**: `number`

Defined in: render/dist/types.d.ts:760

Height of the legend symbol (icon).

***

### itemMaxWidth?

> `optional` **itemMaxWidth**: `number`

Defined in: render/dist/types.d.ts:739

Maximum width of a legend item.
Text exceeding this width will be truncated.

***

### itemWidth?

> `optional` **itemWidth**: `number`

Defined in: render/dist/types.d.ts:756

Width of the legend symbol (icon).

***

### left?

> `optional` **left**: `string` \| `number`

Defined in: render/dist/types.d.ts:694

Distance from left side of container.

***

### orient?

> `optional` **orient**: `"horizontal"` \| `"vertical"`

Defined in: render/dist/types.d.ts:720

Layout orientation.
- 'horizontal': Items are arranged horizontally.
- 'vertical': Items are arranged vertically.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:748

Padding around the legend component.
[top, right, bottom, left]

***

### pageButtonGap?

> `optional` **pageButtonGap**: `number`

Defined in: render/dist/types.d.ts:842

Gap between page buttons.

***

### pageButtonItemGap?

> `optional` **pageButtonItemGap**: `number`

Defined in: render/dist/types.d.ts:838

Gap between page buttons and legend items.

***

### pageButtonPosition?

> `optional` **pageButtonPosition**: `"start"` \| `"end"`

Defined in: render/dist/types.d.ts:846

Position of page buttons.

***

### pageFormatter?

> `optional` **pageFormatter**: `string` \| `Function`

Defined in: render/dist/types.d.ts:850

Formatter for page info text (e.g. "1/2").

***

### pageIconColor?

> `optional` **pageIconColor**: `string`

Defined in: render/dist/types.d.ts:861

Color of page buttons.

***

### pageIconInactiveColor?

> `optional` **pageIconInactiveColor**: `string`

Defined in: render/dist/types.d.ts:865

Color of inactive page buttons.

***

### pageIcons?

> `optional` **pageIcons**: `object`

Defined in: render/dist/types.d.ts:854

Icons for page buttons.

#### horizontal?

> `optional` **horizontal**: `string`[]

#### vertical?

> `optional` **vertical**: `string`[]

***

### pageIconSize?

> `optional` **pageIconSize**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:869

Size of page buttons.

***

### pageTextStyle?

> `optional` **pageTextStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:873

Text style for page info.

***

### renderMode?

> `optional` **renderMode**: `"canvas"` \| `"html"`

Defined in: render/dist/types.d.ts:726

Render mode for the legend.
- 'canvas': Drawn on the canvas (default).
- 'html': Rendered as HTML elements (good for accessibility/SEO).

***

### right?

> `optional` **right**: `string` \| `number`

Defined in: render/dist/types.d.ts:702

Distance from right side of container.

***

### scrollDataIndex?

> `optional` **scrollDataIndex**: `number`

Defined in: render/dist/types.d.ts:834

Initial scroll index (for scrollable legends).

***

### selected?

> `optional` **selected**: `object`

Defined in: render/dist/types.d.ts:781

Initial selected state of legend items.
Map of series name to boolean.

#### Index Signature

\[`name`: `string`\]: `boolean`

***

### selectedMode?

> `optional` **selectedMode**: `boolean` \| `"multiple"` \| `"single"`

Defined in: render/dist/types.d.ts:772

Selection mode.
- true: Multiple selection.
- 'single': Single selection (radio button behavior).
- 'multiple': Multiple selection (checkbox behavior).
- false: Selection disabled.

***

### shadowBlur?

> `optional` **shadowBlur**: `number`

Defined in: render/dist/types.d.ts:818

Shadow blur size.

***

### shadowColor?

> `optional` **shadowColor**: `string`

Defined in: render/dist/types.d.ts:822

Shadow color.

***

### shadowOffsetX?

> `optional` **shadowOffsetX**: `number`

Defined in: render/dist/types.d.ts:826

Shadow X offset.

***

### shadowOffsetY?

> `optional` **shadowOffsetY**: `number`

Defined in: render/dist/types.d.ts:830

Shadow Y offset.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:667

Whether to show the legend.

***

### symbolKeepAspect?

> `optional` **symbolKeepAspect**: `boolean`

Defined in: render/dist/types.d.ts:764

Whether to keep the aspect ratio of the legend symbol.

***

### tableHead?

> `optional` **tableHead**: `string`[]

Defined in: render/dist/types.d.ts:734

Table header labels for HTML render mode.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:787

Text style for legend labels.

***

### tooltip?

> `optional` **tooltip**: [`TooltipOption`](TooltipOption.md)

Defined in: render/dist/types.d.ts:791

Tooltip configuration for hovering over legend items.

***

### top?

> `optional` **top**: `string` \| `number`

Defined in: render/dist/types.d.ts:698

Distance from top side of container.

***

### width?

> `optional` **width**: `string` \| `number`

Defined in: render/dist/types.d.ts:710

Width of the legend component.

***

### z?

> `optional` **z**: `number`

Defined in: render/dist/types.d.ts:672

Z-index of the legend component (2nd level).
Controls vertical stacking order relative to other components.

***

### zlevel?

> `optional` **zlevel**: `number`

Defined in: render/dist/types.d.ts:677

Canvas layer z-level (1st level).
Elements with different zlevel are placed in different canvas instances.
