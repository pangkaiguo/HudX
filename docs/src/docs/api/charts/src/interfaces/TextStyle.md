[**HudX API**](../../../README.md)

***

# Interface: TextStyle

Defined in: render/dist/types.d.ts:685

Text style (used by title/legend/axisLabel/label, etc.).

Note: supported fields may vary by component, but common fields such as
`color/fontSize/fontFamily/fontWeight/lineHeight` are widely supported.

## Properties

### align?

> `optional` **align**: `"left"` \| `"right"` \| `"center"`

Defined in: render/dist/types.d.ts:721

Horizontal alignment.
- 'left': Align left.
- 'center': Align center.
- 'right': Align right.

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: render/dist/types.d.ts:780

Background color of the text block.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: render/dist/types.d.ts:784

Border color of the text block.

***

### borderRadius?

> `optional` **borderRadius**: `number`

Defined in: render/dist/types.d.ts:792

Border radius of the text block.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: render/dist/types.d.ts:788

Border width of the text block.

***

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:689

Text fill color.

***

### ellipsis?

> `optional` **ellipsis**: `string`

Defined in: render/dist/types.d.ts:776

String to use for ellipsis when overflow is 'truncate'.

#### Default

```ts
'...'
```

***

### fontFamily?

> `optional` **fontFamily**: `string`

Defined in: render/dist/types.d.ts:710

Font family.

#### Example

```ts
'Arial, Verdana, sans-serif'
```

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: render/dist/types.d.ts:714

Font size in pixels.

***

### fontStyle?

> `optional` **fontStyle**: `"normal"` \| `"italic"` \| `"oblique"`

Defined in: render/dist/types.d.ts:696

Font style.
- 'normal': Standard text.
- 'italic': Italic text.
- 'oblique': Oblique text.

***

### fontWeight?

> `optional` **fontWeight**: `number` \| `"bold"` \| `"normal"` \| `"bolder"` \| `"lighter"`

Defined in: render/dist/types.d.ts:705

Font weight.
- 'normal': Standard weight (400).
- 'bold': Bold weight (700).
- 'bolder': Heavier than inherited.
- 'lighter': Lighter than inherited.
- number: Specific weight (e.g. 100, 200, 300, etc.).

***

### height?

> `optional` **height**: `number`

Defined in: render/dist/types.d.ts:740

Height of the text block.

***

### lineHeight?

> `optional` **lineHeight**: `number`

Defined in: render/dist/types.d.ts:732

Line height in pixels.

***

### overflow?

> `optional` **overflow**: `"truncate"` \| `"break"` \| `"breakAll"`

Defined in: render/dist/types.d.ts:771

Text overflow handling.
- 'truncate': Truncate with ellipsis.
- 'break': Break words.
- 'breakAll': Break all characters.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:797

Padding of the text block.
[top, right, bottom, left] or number.

***

### textBorderColor?

> `optional` **textBorderColor**: `string`

Defined in: render/dist/types.d.ts:744

Color of the text border (stroke).

***

### textBorderWidth?

> `optional` **textBorderWidth**: `number`

Defined in: render/dist/types.d.ts:748

Width of the text border (stroke).

***

### textShadowBlur?

> `optional` **textShadowBlur**: `number`

Defined in: render/dist/types.d.ts:756

Blur radius of the text shadow.

***

### textShadowColor?

> `optional` **textShadowColor**: `string`

Defined in: render/dist/types.d.ts:752

Color of the text shadow.

***

### textShadowOffsetX?

> `optional` **textShadowOffsetX**: `number`

Defined in: render/dist/types.d.ts:760

X offset of the text shadow.

***

### textShadowOffsetY?

> `optional` **textShadowOffsetY**: `number`

Defined in: render/dist/types.d.ts:764

Y offset of the text shadow.

***

### verticalAlign?

> `optional` **verticalAlign**: `"top"` \| `"bottom"` \| `"middle"`

Defined in: render/dist/types.d.ts:728

Vertical alignment.
- 'top': Align top.
- 'middle': Align middle.
- 'bottom': Align bottom.

***

### width?

> `optional` **width**: `number`

Defined in: render/dist/types.d.ts:736

Width of the text block.
