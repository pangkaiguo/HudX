[**HudX API**](../../../README.md)

***

# Interface: AxisLabelOption

Defined in: [render/src/types.ts:1333](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1333)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### color?

> `optional` **color**: `string`

Defined in: [render/src/types.ts:1341](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1341)

Text color of the label.

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [render/src/types.ts:1345](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1345)

Font size of the label.

***

### formatter?

> `optional` **formatter**: `string` \| (`value`, `index`) => `string`

Defined in: [render/src/types.ts:1379](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1379)

Label formatter.

When `formatter` is a function it receives:
- `value`: tick value
- `index`: tick index

***

### interval?

> `optional` **interval**: `number` \| `"auto"` \| (`index`, `value`) => `boolean`

Defined in: [render/src/types.ts:1371](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1371)

Display interval of the labels.
- number: Show every Nth label.
- 'auto': Automatically hide overlapping labels.
- Function: Custom logic.

***

### lineHeight?

> `optional` **lineHeight**: `number`

Defined in: [render/src/types.ts:1364](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1364)

Line height of the label.

***

### overflow?

> `optional` **overflow**: `"none"` \| `"truncate"` \| `"break"` \| `"breakAll"`

Defined in: [render/src/types.ts:1360](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1360)

Overflow behavior when width is set.
- 'truncate': Truncate with ellipsis.
- 'break': Break words.
- 'breakAll': Break all characters.

***

### rotate?

> `optional` **rotate**: `number`

Defined in: [render/src/types.ts:1349](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1349)

Rotation angle of the label (in degrees).

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1337](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1337)

Whether to show axis labels.

***

### width?

> `optional` **width**: `number`

Defined in: [render/src/types.ts:1353](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1353)

Width constraint for the label.
