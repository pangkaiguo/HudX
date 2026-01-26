[**HudX API**](../../../README.md)

***

# Type Alias: SeriesOption

> **SeriesOption** = [`LineSeriesOption`](../interfaces/LineSeriesOption.md) \| [`BarSeriesOption`](../interfaces/BarSeriesOption.md) \| [`PieSeriesOption`](../interfaces/PieSeriesOption.md) \| [`ScatterSeriesOption`](../interfaces/ScatterSeriesOption.md) \| [`HeatmapSeriesOption`](../interfaces/HeatmapSeriesOption.md) \| [`Bar3DSeriesOption`](../interfaces/Bar3DSeriesOption.md) \| [`StackBar3DSeriesOption`](../interfaces/StackBar3DSeriesOption.md) \| [`UnknownSeriesOption`](../interfaces/UnknownSeriesOption.md)

Defined in: [render/src/types.ts:1417](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1417)

Series option (similar to ECharts `series`), modeled as a discriminated union to improve TS IntelliSense.

- When you specify `type: 'bar' | 'line' | 'pie' ...` in an object literal, the editor can prefer the relevant fields.\n
- `UnknownSeriesOption` is kept as a fallback for custom or not-yet-modeled series types.\n
