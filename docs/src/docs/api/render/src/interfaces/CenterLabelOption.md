[**HudX API**](../../../README.md)

***

# Interface: CenterLabelOption

Defined in: [render/src/types.ts:1629](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1629)

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

Defined in: [render/src/types.ts:1644](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1644)

Label formatter.
Supports string template (e.g., '{b}: {c}') or callback function.

***

### rich?

> `optional` **rich**: `object`

Defined in: [render/src/types.ts:1652](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1652)

Rich text style.

#### Index Signature

\[`key`: `string`\]: [`TextStyle`](TextStyle.md)

***

### show?

> `optional` **show**: `boolean`

Defined in: [render/src/types.ts:1633](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1633)

Whether to show the center label.

***

### style?

> `optional` **style**: [`TextStyle`](TextStyle.md)

Defined in: [render/src/types.ts:1648](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1648)

Text style.

***

### type?

> `optional` **type**: `"text"` \| `"percentage"`

Defined in: [render/src/types.ts:1639](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/types.ts#L1639)

Label type.
- 'text': Static text (default).
- 'percentage': Show percentage of the first data item.
