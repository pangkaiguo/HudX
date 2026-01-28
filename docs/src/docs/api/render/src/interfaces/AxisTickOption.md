[**HudX API**](../../../README.md)

***

# Interface: AxisTickOption

Defined in: [render/src/types.ts:1291](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1291)

## Properties

### alignWithLabel?

> `optional` **alignWithLabel**: `boolean`

Defined in: [render/src/types.ts:1300](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1300)

Align tick with label.
Useful for category axes where the tick should be between categories.

***

### inside?

> `optional` **inside**: `boolean`

Defined in: [render/src/types.ts:1310](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1310)

Place tick inside the axis line.

***

### interval?

> `optional` **interval**: `number` \| `Function`

Defined in: [render/src/types.ts:1306](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1306)

Tick interval.
- number: Show every Nth tick.
- Function: Custom logic.

***

### length?

> `optional` **length**: `number`

Defined in: [render/src/types.ts:1314](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1314)

Length of the tick line.

***

### lineStyle?

> `optional` **lineStyle**: [`LineStyleOption`](LineStyleOption.md)

Defined in: [render/src/types.ts:1318](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1318)

Style of the tick line.

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1295](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1295)

Whether to show axis ticks.
