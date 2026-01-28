[**HudX API**](../../../README.md)

***

# Interface: AxisLabelOption

Defined in: render/dist/types.d.ts:1310

## Indexable

\[`key`: `string`\]: `any`

## Properties

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:1318

Text color of the label.

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: render/dist/types.d.ts:1322

Font size of the label.

***

### formatter?

> `optional` **formatter**: `string` \| (`value`, `index`) => `string`

Defined in: render/dist/types.d.ts:1356

Label formatter.

When `formatter` is a function it receives:
- `value`: tick value
- `index`: tick index

***

### interval?

> `optional` **interval**: `number` \| `"auto"` \| (`index`, `value`) => `boolean`

Defined in: render/dist/types.d.ts:1348

Display interval of the labels.
- number: Show every Nth label.
- 'auto': Automatically hide overlapping labels.
- Function: Custom logic.

***

### lineHeight?

> `optional` **lineHeight**: `number`

Defined in: render/dist/types.d.ts:1341

Line height of the label.

***

### overflow?

> `optional` **overflow**: `"none"` \| `"truncate"` \| `"break"` \| `"breakAll"`

Defined in: render/dist/types.d.ts:1337

Overflow behavior when width is set.
- 'truncate': Truncate with ellipsis.
- 'break': Break words.
- 'breakAll': Break all characters.

***

### rotate?

> `optional` **rotate**: `number`

Defined in: render/dist/types.d.ts:1326

Rotation angle of the label (in degrees).

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1314

Whether to show axis labels.

***

### width?

> `optional` **width**: `number`

Defined in: render/dist/types.d.ts:1330

Width constraint for the label.
