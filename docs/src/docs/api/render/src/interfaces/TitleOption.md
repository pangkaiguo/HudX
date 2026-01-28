[**HudX API**](../../../README.md)

***

# Interface: TitleOption

Defined in: [render/src/types.ts:490](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L490)

Title option (similar to ECharts `title`).

Supports basic box styles (background/border/padding) and text styles via
`textStyle` / `subtextStyle`.

## Example

```ts
const option: ChartOption = {
  title: { text: 'HudX Charts', subtext: 'Hello', left: 'center', top: 10 },
  series: [],
};
```

## Indexable

\[`key`: `string`\]: `any`

## Properties

### left?

> `optional` **left**: `string` \| `number`

Defined in: [render/src/types.ts:507](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L507)

Horizontal position of the title.
- 'left', 'center', 'right'
- number (pixels from left)
- string (e.g. '20%')

***

### subtext?

> `optional` **subtext**: `string`

Defined in: [render/src/types.ts:500](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L500)

Subtitle text.
Displayed below the main title.

***

### subtextStyle?

> `optional` **subtextStyle**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:522](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L522)

Style of the subtitle text.

***

### text?

> `optional` **text**: `string`

Defined in: [render/src/types.ts:495](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L495)

Main title text.
Supports `\n` for newlines.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:518](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L518)

Style of the main title text.

***

### top?

> `optional` **top**: `string` \| `number`

Defined in: [render/src/types.ts:514](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L514)

Vertical position of the title.
- 'top', 'middle', 'bottom'
- number (pixels from top)
- string (e.g. '20%')
