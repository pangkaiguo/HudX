[**HudX API**](../../../README.md)

***

# Interface: TextStyle

Defined in: [render/src/types.ts:718](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L718)

Text style (used by title/legend/axisLabel/label, etc.).

Note: supported fields may vary by component, but common fields such as
`color/fontSize/fontFamily/fontWeight/lineHeight` are widely supported.

## Properties

### align?

> `optional` **align**: `"left"` \| `"center"` \| `"right"`

Defined in: [render/src/types.ts:754](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L754)

Horizontal alignment.
- 'left': Align left.
- 'center': Align center.
- 'right': Align right.

***

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [render/src/types.ts:813](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L813)

Background color of the text block.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: [render/src/types.ts:817](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L817)

Border color of the text block.

***

### borderRadius?

> `optional` **borderRadius**: `number`

Defined in: [render/src/types.ts:825](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L825)

Border radius of the text block.

***

### borderWidth?

> `optional` **borderWidth**: `number`

Defined in: [render/src/types.ts:821](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L821)

Border width of the text block.

***

### color?

> `optional` **color**: `string`

Defined in: [render/src/types.ts:722](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L722)

Text fill color.

***

### ellipsis?

> `optional` **ellipsis**: `string`

Defined in: [render/src/types.ts:809](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L809)

String to use for ellipsis when overflow is 'truncate'.

#### Default

```ts
'...'
```

***

### fontFamily?

> `optional` **fontFamily**: `string`

Defined in: [render/src/types.ts:743](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L743)

Font family.

#### Example

```ts
'Arial, Verdana, sans-serif'
```

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [render/src/types.ts:747](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L747)

Font size in pixels.

***

### fontStyle?

> `optional` **fontStyle**: `"normal"` \| `"italic"` \| `"oblique"`

Defined in: [render/src/types.ts:729](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L729)

Font style.
- 'normal': Standard text.
- 'italic': Italic text.
- 'oblique': Oblique text.

***

### fontWeight?

> `optional` **fontWeight**: `number` \| `"normal"` \| `"bold"` \| `"bolder"` \| `"lighter"`

Defined in: [render/src/types.ts:738](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L738)

Font weight.
- 'normal': Standard weight (400).
- 'bold': Bold weight (700).
- 'bolder': Heavier than inherited.
- 'lighter': Lighter than inherited.
- number: Specific weight (e.g. 100, 200, 300, etc.).

***

### height?

> `optional` **height**: `number`

Defined in: [render/src/types.ts:773](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L773)

Height of the text block.

***

### lineHeight?

> `optional` **lineHeight**: `number`

Defined in: [render/src/types.ts:765](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L765)

Line height in pixels.

***

### overflow?

> `optional` **overflow**: `"truncate"` \| `"break"` \| `"breakAll"`

Defined in: [render/src/types.ts:804](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L804)

Text overflow handling.
- 'truncate': Truncate with ellipsis.
- 'break': Break words.
- 'breakAll': Break all characters.

***

### padding?

> `optional` **padding**: `number` \| `number`[]

Defined in: [render/src/types.ts:830](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L830)

Padding of the text block.
[top, right, bottom, left] or number.

***

### textBorderColor?

> `optional` **textBorderColor**: `string`

Defined in: [render/src/types.ts:777](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L777)

Color of the text border (stroke).

***

### textBorderWidth?

> `optional` **textBorderWidth**: `number`

Defined in: [render/src/types.ts:781](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L781)

Width of the text border (stroke).

***

### textShadowBlur?

> `optional` **textShadowBlur**: `number`

Defined in: [render/src/types.ts:789](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L789)

Blur radius of the text shadow.

***

### textShadowColor?

> `optional` **textShadowColor**: `string`

Defined in: [render/src/types.ts:785](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L785)

Color of the text shadow.

***

### textShadowOffsetX?

> `optional` **textShadowOffsetX**: `number`

Defined in: [render/src/types.ts:793](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L793)

X offset of the text shadow.

***

### textShadowOffsetY?

> `optional` **textShadowOffsetY**: `number`

Defined in: [render/src/types.ts:797](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L797)

Y offset of the text shadow.

***

### verticalAlign?

> `optional` **verticalAlign**: `"top"` \| `"middle"` \| `"bottom"`

Defined in: [render/src/types.ts:761](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L761)

Vertical alignment.
- 'top': Align top.
- 'middle': Align middle.
- 'bottom': Align bottom.

***

### width?

> `optional` **width**: `number`

Defined in: [render/src/types.ts:769](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L769)

Width of the text block.
