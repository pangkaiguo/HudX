[**HudX API**](../../../README.md)

***

# Interface: AxisLabelOption

Defined in: render/dist/types.d.ts:1163

## Indexable

\[`key`: `string`\]: `any`

## Properties

### color?

> `optional` **color**: `string`

Defined in: render/dist/types.d.ts:1171

Text color of the label.

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: render/dist/types.d.ts:1175

Font size of the label.

***

### formatter?

> `optional` **formatter**: `string` \| (`value`, `index`) => `string`

Defined in: render/dist/types.d.ts:1209

Label formatter.

When `formatter` is a function it receives:
- `value`: tick value
- `index`: tick index

***

### interval?

> `optional` **interval**: `number` \| `"auto"` \| (`index`, `value`) => `boolean`

Defined in: render/dist/types.d.ts:1201

Display interval of the labels.
- number: Show every Nth label.
- 'auto': Automatically hide overlapping labels.
- Function: Custom logic.

***

### lineHeight?

> `optional` **lineHeight**: `number`

Defined in: render/dist/types.d.ts:1194

Line height of the label.

***

### overflow?

> `optional` **overflow**: `"none"` \| `"truncate"` \| `"break"` \| `"breakAll"`

Defined in: render/dist/types.d.ts:1190

Overflow behavior when width is set.
- 'truncate': Truncate with ellipsis.
- 'break': Break words.
- 'breakAll': Break all characters.

***

### rotate?

> `optional` **rotate**: `number`

Defined in: render/dist/types.d.ts:1179

Rotation angle of the label (in degrees).

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1167

Whether to show axis labels.

***

### width?

> `optional` **width**: `number`

Defined in: render/dist/types.d.ts:1183

Width constraint for the label.
