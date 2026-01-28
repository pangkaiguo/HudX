[**HudX API**](../../../README.md)

***

# Interface: CenterLabelOption

Defined in: render/dist/types.d.ts:1578

Pie series.

## Example

```ts
series: [{
  type: 'pie',
  radius: '60%',
  data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }],
}]
```

## Properties

### formatter?

> `optional` **formatter**: `string` \| (`params`) => `string`

Defined in: render/dist/types.d.ts:1593

Label formatter.
Supports string template (e.g., '{b}: {c}') or callback function.

***

### rich?

> `optional` **rich**: `object`

Defined in: render/dist/types.d.ts:1601

Rich text style.

#### Index Signature

\[`key`: `string`\]: [`TextStyle`](TextStyle.md)

***

### show?

> `optional` **show**: `boolean`

Defined in: render/dist/types.d.ts:1582

Whether to show the center label.

***

### style?

> `optional` **style**: [`TextStyle`](TextStyle.md)

Defined in: render/dist/types.d.ts:1597

Text style.

***

### type?

> `optional` **type**: `"text"` \| `"percentage"`

Defined in: render/dist/types.d.ts:1588

Label type.
- 'text': Static text (default).
- 'percentage': Show percentage of the first data item.
