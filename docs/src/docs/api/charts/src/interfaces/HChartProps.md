[**HudX API**](../../../README.md)

***

# Interface: HChartProps

Defined in: [charts/src/HChart.tsx:30](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L30)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [charts/src/HChart.tsx:50](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L50)

Container className

***

### height?

> `optional` **height**: `number`

Defined in: [charts/src/HChart.tsx:48](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L48)

Chart height (px).

If omitted, the component uses the container element size.

***

### lazyUpdate?

> `optional` **lazyUpdate**: `boolean`

Defined in: [charts/src/HChart.tsx:101](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L101)

Enable lazyUpdate (same meaning as ECharts `setOption` -> `lazyUpdate`).

#### Default

```ts
false
```

***

### locale?

> `optional` **locale**: `string`

Defined in: [charts/src/HChart.tsx:74](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L74)

Locale (affects built-in components such as tooltip/legend and `LocaleManager.t`).

#### Default

```ts
'en'
```

***

### mode?

> `optional` **mode**: `string`

Defined in: [charts/src/HChart.tsx:69](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L69)

Compatibility field for legacy usage: `mode: 'Light' | 'Dark'`.

Internally mapped to `theme: 'light' | 'dark'`.

***

### notMerge?

> `optional` **notMerge**: `boolean`

Defined in: [charts/src/HChart.tsx:96](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L96)

Disable merge (same meaning as ECharts `setOption` -> `notMerge`).

#### Default

```ts
false
```

***

### onEvents?

> `optional` **onEvents**: `object`

Defined in: [charts/src/HChart.tsx:89](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L89)

Event bindings (similar to ECharts `on`).

#### Index Signature

\[`eventName`: `string`\]: (`event`) => `void`

#### Example

```tsx
<HChart
  option={option}
  onEvents={{
    click: (e) => console.log(e.seriesName, e.value),
    mousemove: (e) => {},
  }}
/>
```

***

### option

> **option**: [`ChartOption`](ChartOption.md)

Defined in: [charts/src/HChart.tsx:36](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L36)

Chart option (ECharts-style).

Tip: explicitly set `type` for each series to get more accurate TS IntelliSense.

***

### renderMode?

> `optional` **renderMode**: [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: [charts/src/HChart.tsx:57](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L57)

Render mode.

#### Default

```ts
'svg'
```

***

### style?

> `optional` **style**: `CSSProperties`

Defined in: [charts/src/HChart.tsx:52](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L52)

Container style

***

### theme?

> `optional` **theme**: `string`

Defined in: [charts/src/HChart.tsx:63](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L63)

Theme.

If both `theme` and `mode` are provided, `theme` wins.

***

### width?

> `optional` **width**: `number`

Defined in: [charts/src/HChart.tsx:42](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/charts/src/HChart.tsx#L42)

Chart width (px).

If omitted, the component uses the container element size.
