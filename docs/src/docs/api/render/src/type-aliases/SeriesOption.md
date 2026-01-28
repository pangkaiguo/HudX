[**HudX API**](../../../README.md)

***

# Type Alias: SeriesOption

> **SeriesOption** = [`LineSeriesOption`](../interfaces/LineSeriesOption.md) \| [`BarSeriesOption`](../interfaces/BarSeriesOption.md) \| [`PieSeriesOption`](../interfaces/PieSeriesOption.md) \| [`ScatterSeriesOption`](../interfaces/ScatterSeriesOption.md) \| [`HeatmapSeriesOption`](../interfaces/HeatmapSeriesOption.md) \| [`Bar3DSeriesOption`](../interfaces/Bar3DSeriesOption.md) \| [`StackBar3DSeriesOption`](../interfaces/StackBar3DSeriesOption.md) \| [`UnknownSeriesOption`](../interfaces/UnknownSeriesOption.md)

Defined in: [render/src/types.ts:1421](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/types.ts#L1421)

Series option (similar to ECharts `series`), modeled as a discriminated union to improve TS IntelliSense.

- When you specify `type: 'bar' | 'line' | 'pie' ...` in an object literal, the editor can prefer the relevant fields.\n
- `UnknownSeriesOption` is kept as a fallback for custom or not-yet-modeled series types.\n
