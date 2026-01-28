[**HudX API**](../../../README.md)

***

# Interface: AxisTickOption

Defined in: render/dist/types.d.ts:1266

## Properties

### alignWithLabel?

> `optional` **alignWithLabel**: `boolean`

Defined in: render/dist/types.d.ts:1275

Align tick with label.
Useful for category axes where the tick should be between categories.

***

### inside?

> `optional` **inside**: `boolean`

Defined in: render/dist/types.d.ts:1285

Place tick inside the axis line.

***

### interval?

> `optional` **interval**: `number` \| `Function`

Defined in: render/dist/types.d.ts:1281

Tick interval.
- number: Show every Nth tick.
- Function: Custom logic.

***

### length?

> `optional` **length**: `number`

Defined in: render/dist/types.d.ts:1289

Length of the tick line.

***

### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

Defined in: render/dist/types.d.ts:1293

Style of the tick line.

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1270

Whether to show axis ticks.
