[**HudX API**](../../../README.md)

***

# Interface: TitleOption

Defined in: render/dist/types.d.ts:321

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

Defined in: render/dist/types.d.ts:338

Horizontal position of the title.
- 'left', 'center', 'right'
- number (pixels from left)
- string (e.g. '20%')

***

### subtext?

> `optional` **subtext**: `string`

Defined in: render/dist/types.d.ts:331

Subtitle text.
Displayed below the main title.

***

### subtextStyle?

> `optional` **subtextStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:353

Style of the subtitle text.

***

### text?

> `optional` **text**: `string`

Defined in: render/dist/types.d.ts:326

Main title text.
Supports `\n` for newlines.

***

### textStyle?

> `optional` **textStyle**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:349

Style of the main title text.

***

### top?

> `optional` **top**: `string` \| `number`

Defined in: render/dist/types.d.ts:345

Vertical position of the title.
- 'top', 'middle', 'bottom'
- number (pixels from top)
- string (e.g. '20%')
