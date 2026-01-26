[**HudX API**](../../../README.md)

***

# Interface: TextStyle

Defined in: render/dist/types.d.ts:538

Text style (used by title/legend/axisLabel/label, etc.).

Note: supported fields may vary by component, but common fields such as
`color/fontSize/fontFamily/fontWeight/lineHeight` are widely supported.

## Properties

### align?

> `optional` **align**: `"left"` \| `"right"` \| `"center"`

Defined in: render/dist/types.d.ts:574

Horizontal alignment.
- 'left': Align left.
- 'center': Align center.
- 'right': Align right.

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: render/dist/types.d.ts:633

Background color of the text block.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: render/dist/types.d.ts:637

Border color of the text block.

***

### borderRadius?

> `optional` **borderRadius**: `number`

Defined in: render/dist/types.d.ts:645

Border radius of the text block.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: render/dist/types.d.ts:641

Border width of the text block.

***

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:542

Text fill color.

***

### ellipsis?

> `optional` **ellipsis**: `string`

Defined in: render/dist/types.d.ts:629

String to use for ellipsis when overflow is 'truncate'.

#### Default

```ts
'...'
```

***

### fontFamily?

> `optional` **fontFamily**: `string`

Defined in: render/dist/types.d.ts:563

Font family.

#### Example

```ts
'Arial, Verdana, sans-serif'
```

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: render/dist/types.d.ts:567

Font size in pixels.

***

### fontStyle?

> `optional` **fontStyle**: `"normal"` \| `"italic"` \| `"oblique"`

Defined in: render/dist/types.d.ts:549

Font style.
- 'normal': Standard text.
- 'italic': Italic text.
- 'oblique': Oblique text.

***

### fontWeight?

> `optional` **fontWeight**: `number` \| `"bold"` \| `"normal"` \| `"bolder"` \| `"lighter"`

Defined in: render/dist/types.d.ts:558

Font weight.
- 'normal': Standard weight (400).
- 'bold': Bold weight (700).
- 'bolder': Heavier than inherited.
- 'lighter': Lighter than inherited.
- number: Specific weight (e.g. 100, 200, 300, etc.).

***

### height?

> `optional` **height**: `number`

Defined in: render/dist/types.d.ts:593

Height of the text block.

***

### lineHeight?

> `optional` **lineHeight**: `number`

Defined in: render/dist/types.d.ts:585

Line height in pixels.

***

### overflow?

> `optional` **overflow**: `"truncate"` \| `"break"` \| `"breakAll"`

Defined in: render/dist/types.d.ts:624

Text overflow handling.
- 'truncate': Truncate with ellipsis.
- 'break': Break words.
- 'breakAll': Break all characters.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: render/dist/types.d.ts:650

Padding of the text block.
[top, right, bottom, left] or number.

***

### textBorderColor?

> `optional` **textBorderColor**: `string`

Defined in: render/dist/types.d.ts:597

Color of the text border (stroke).

***

### textBorderWidth?

> `optional` **textBorderWidth**: `number`

Defined in: render/dist/types.d.ts:601

Width of the text border (stroke).

***

### textShadowBlur?

> `optional` **textShadowBlur**: `number`

Defined in: render/dist/types.d.ts:609

Blur radius of the text shadow.

***

### textShadowColor?

> `optional` **textShadowColor**: `string`

Defined in: render/dist/types.d.ts:605

Color of the text shadow.

***

### textShadowOffsetX?

> `optional` **textShadowOffsetX**: `number`

Defined in: render/dist/types.d.ts:613

X offset of the text shadow.

***

### textShadowOffsetY?

> `optional` **textShadowOffsetY**: `number`

Defined in: render/dist/types.d.ts:617

Y offset of the text shadow.

***

### verticalAlign?

> `optional` **verticalAlign**: `"top"` \| `"bottom"` \| `"middle"`

Defined in: render/dist/types.d.ts:581

Vertical alignment.
- 'top': Align top.
- 'middle': Align middle.
- 'bottom': Align bottom.

***

### width?

> `optional` **width**: `number`

Defined in: render/dist/types.d.ts:589

Width of the text block.
