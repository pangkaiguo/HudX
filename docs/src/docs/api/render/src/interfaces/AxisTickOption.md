[**HudX API**](../../../README.md)

***

# Interface: AxisTickOption

Defined in: [render/src/types.ts:1287](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1287)

## Properties

### alignWithLabel?

> `optional` **alignWithLabel**: `boolean`

Defined in: [render/src/types.ts:1296](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1296)

Align tick with label.
Useful for category axes where the tick should be between categories.

***

### inside?

> `optional` **inside**: `boolean`

Defined in: [render/src/types.ts:1306](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1306)

Place tick inside the axis line.

***

### interval?

> `optional` **interval**: `number` \| `Function`

Defined in: [render/src/types.ts:1302](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1302)

Tick interval.
- number: Show every Nth tick.
- Function: Custom logic.

***

### length?

> `optional` **length**: `number`

Defined in: [render/src/types.ts:1310](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1310)

Length of the tick line.

***

### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

Defined in: [render/src/types.ts:1314](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1314)

Style of the tick line.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1291](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1291)

Whether to show axis ticks.
