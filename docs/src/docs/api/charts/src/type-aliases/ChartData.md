[**HudX API**](../../../README.md)

***

# Type Alias: ChartData

> **ChartData** = `number` \| `number`[] \| \{\[`key`: `string`\]: `any`; `itemStyle?`: [`ItemStyleOption`](../interfaces/ItemStyleOption.md); `label?`: [`LabelOption`](../interfaces/LabelOption.md); `name?`: `string`; `value`: `any`; \}

Defined in: render/dist/types.d.ts:1742

Common `series.data` shapes (similar to ECharts).

- `number`: single numeric value\n
- `number[]`: multi-dimensional values (e.g. scatter `[x, y]`)\n
- object: supports `name/value/itemStyle/label` etc.\n

## Type Declaration

`number`

`number`[]

\{\[`key`: `string`\]: `any`; `itemStyle?`: [`ItemStyleOption`](../interfaces/ItemStyleOption.md); `label?`: [`LabelOption`](../interfaces/LabelOption.md); `name?`: `string`; `value`: `any`; \}

## Index Signature

\[`key`: `string`\]: `any`

### itemStyle?

> `optional` **itemStyle**: [`ItemStyleOption`](../interfaces/ItemStyleOption.md)

Item style

### label?

> `optional` **label**: [`LabelOption`](../interfaces/LabelOption.md)

Label

### name?

> `optional` **name**: `string`

Data name

### value

> **value**: `any`

Data value

## Example

```ts
// Bar/Line
series: [{ type: 'bar', data: [120, 200, 150] }]

// Scatter
series: [{ type: 'scatter', data: [[10, 20], [15, 35]] }]

// With name/value
series: [{ type: 'pie', data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }] }]
```
