[**HudX API**](../../../README.md)

***

# Interface: AxisTickOption

Defined in: render/dist/types.d.ts:1119

## Properties

### alignWithLabel?

> `optional` **alignWithLabel**: `boolean`

Defined in: render/dist/types.d.ts:1128

Align tick with label.
Useful for category axes where the tick should be between categories.

***

### inside?

> `optional` **inside**: `boolean`

Defined in: render/dist/types.d.ts:1138

Place tick inside the axis line.

***

### interval?

> `optional` **interval**: `number` \| `Function`

Defined in: render/dist/types.d.ts:1134

Tick interval.
- number: Show every Nth tick.
- Function: Custom logic.

***

### length?

> `optional` **length**: `number`

Defined in: render/dist/types.d.ts:1142

Length of the tick line.

***

### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

Defined in: render/dist/types.d.ts:1146

Style of the tick line.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1123

Whether to show axis ticks.
