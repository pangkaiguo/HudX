[**HudX API**](../../../README.md)

***

# Interface: ThemeToken

Defined in: render/dist/types.d.ts:27

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### boxShadowTooltip?

> `optional` **boxShadowTooltip**: `string`

Defined in: render/dist/types.d.ts:109

Tooltip box shadow.
CSS box-shadow value for the tooltip.

***

### colorAxisLabel?

> `optional` **colorAxisLabel**: `string`

Defined in: render/dist/types.d.ts:92

Axis label color.
Used for text labels on axes.

***

### colorAxisLine?

> `optional` **colorAxisLine**: `string`

Defined in: render/dist/types.d.ts:87

Axis line color.
Used for the main axis lines (x-axis, y-axis).

***

### colorBackground?

> `optional` **colorBackground**: `string`

Defined in: render/dist/types.d.ts:47

Base background color.
Typically used for the chart container background.

***

### colorBorder?

> `optional` **colorBorder**: `string`

Defined in: render/dist/types.d.ts:72

Primary border color.
Used for major structural borders.

***

### colorBorderSecondary?

> `optional` **colorBorderSecondary**: `string`

Defined in: render/dist/types.d.ts:77

Secondary border color.
Used for subtle dividers or minor borders.

***

### colorCodeBackground?

> `optional` **colorCodeBackground**: `string`

Defined in: render/dist/types.d.ts:157

Code block background color.

***

### colorCodeGutterBackground?

> `optional` **colorCodeGutterBackground**: `string`

Defined in: render/dist/types.d.ts:161

Code block gutter background color.

***

### colorCodeGutterText?

> `optional` **colorCodeGutterText**: `string`

Defined in: render/dist/types.d.ts:169

Code block gutter text color.

***

### colorCodeText?

> `optional` **colorCodeText**: `string`

Defined in: render/dist/types.d.ts:165

Code block text color.

***

### colorDecal?

> `optional` **colorDecal**: `string`

Defined in: render/dist/types.d.ts:153

Decal color.
Base color for pattern fills (accessibility).

***

### colorFillContainer?

> `optional` **colorFillContainer**: `string`

Defined in: render/dist/types.d.ts:57

Container fill color.
Used for internal containers or panels within the chart.

***

### colorFillContainerAlt?

> `optional` **colorFillContainerAlt**: `string`

Defined in: render/dist/types.d.ts:62

Alternate container fill color.
Used for alternating rows or sections.

***

### colorFillHover?

> `optional` **colorFillHover**: `string`

Defined in: render/dist/types.d.ts:67

Hover fill color.
Used for hover states on interactive elements.

***

### colorFillPage?

> `optional` **colorFillPage**: `string`

Defined in: render/dist/types.d.ts:52

Page fill color.
Used for the overall page background behind the chart.

***

### colorGrid?

> `optional` **colorGrid**: `string`

Defined in: render/dist/types.d.ts:82

Grid line color.
Used for axis grid lines.

***

### colorLegendText?

> `optional` **colorLegendText**: `string`

Defined in: render/dist/types.d.ts:125

Legend text color.

***

### colorMask?

> `optional` **colorMask**: `string`

Defined in: render/dist/types.d.ts:148

Mask color.
Used for overlay masks (e.g., during loading or disabled states).

***

### colorPrimary?

> `optional` **colorPrimary**: `string`

Defined in: render/dist/types.d.ts:134

Primary brand color.
Used for active states, primary buttons, or key highlights.

***

### colorPrimaryText?

> `optional` **colorPrimaryText**: `string`

Defined in: render/dist/types.d.ts:138

Text color on top of primary color backgrounds.

***

### colorShadow?

> `optional` **colorShadow**: `string`

Defined in: render/dist/types.d.ts:143

Shadow color.
Base color for shadows (e.g., drop shadows).

***

### colorText?

> `optional` **colorText**: `string`

Defined in: render/dist/types.d.ts:32

Primary text color.
Used for main content, body text, and primary labels.

***

### colorTextOnSeries?

> `optional` **colorTextOnSeries**: `string`

Defined in: render/dist/types.d.ts:129

Text color for labels placed directly on series elements.

***

### colorTextSecondary?

> `optional` **colorTextSecondary**: `string`

Defined in: render/dist/types.d.ts:37

Secondary text color.
Used for secondary labels, descriptions, and less emphasized text.

***

### colorTextTertiary?

> `optional` **colorTextTertiary**: `string`

Defined in: render/dist/types.d.ts:42

Tertiary text color.
Used for disabled text, placeholders, or subtle hints.

***

### colorTooltipBackground?

> `optional` **colorTooltipBackground**: `string`

Defined in: render/dist/types.d.ts:96

Tooltip background color.

***

### colorTooltipBorder?

> `optional` **colorTooltipBorder**: `string`

Defined in: render/dist/types.d.ts:104

Tooltip border color.

***

### colorTooltipSeriesName?

> `optional` **colorTooltipSeriesName**: `string`

Defined in: render/dist/types.d.ts:113

Color for the series name in tooltips.

***

### colorTooltipSubitemName?

> `optional` **colorTooltipSubitemName**: `string`

Defined in: render/dist/types.d.ts:117

Color for sub-item names in tooltips.

***

### colorTooltipText?

> `optional` **colorTooltipText**: `string`

Defined in: render/dist/types.d.ts:100

Tooltip text color.

***

### colorTooltipValue?

> `optional` **colorTooltipValue**: `string`

Defined in: render/dist/types.d.ts:121

Color for values in tooltips.

***

### fontFamily?

> `optional` **fontFamily**: `string`

Defined in: render/dist/types.d.ts:174

Font family for the entire chart.

#### Example

```ts
'Arial, sans-serif'
```

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: render/dist/types.d.ts:179

Base font size in pixels.

#### Default

```ts
12
```

***

### heatmapColors?

> `optional` **heatmapColors**: `string`[]

Defined in: render/dist/types.d.ts:189

Color gradient for heatmaps.
Usually ordered from low value to high value.

***

### seriesColors?

> `optional` **seriesColors**: `string`[]

Defined in: render/dist/types.d.ts:184

Default color palette for series.
The chart will cycle through these colors for each series.
