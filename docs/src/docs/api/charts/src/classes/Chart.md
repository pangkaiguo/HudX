[**HudX API**](../../../README.md)

***

# Class: Chart

Defined in: render/dist/Chart.d.ts:21

## Extended by

- [`LineChart`](LineChart.md)
- [`BarChart`](BarChart.md)
- [`Bar3DChart`](Bar3DChart.md)
- [`StackBar3DChart`](StackBar3DChart.md)
- [`PieChart`](PieChart.md)
- [`ScatterChart`](ScatterChart.md)
- [`HeatmapChart`](HeatmapChart.md)

## Constructors

### Constructor

> **new Chart**(`dom`, `option?`, `renderMode?`, `theme?`, `locale?`): `Chart`

Defined in: render/dist/Chart.d.ts:43

#### Parameters

##### dom

`HTMLElement`

##### option?

[`ChartOption`](../interfaces/ChartOption.md)

##### renderMode?

[`RenderMode`](../type-aliases/RenderMode.md)

##### theme?

`string`

##### locale?

`string`

#### Returns

`Chart`

## Methods

### batchUpdate()

> **batchUpdate**(`callback`): `this`

Defined in: render/dist/Chart.d.ts:127

#### Parameters

##### callback

(`chart`) => `void`

#### Returns

`this`

***

### beginAnimateShow()

> **beginAnimateShow**(`name`): `void`

Defined in: render/dist/Chart.d.ts:89

#### Parameters

##### name

`string`

#### Returns

`void`

***

### beginSilentHide()

> **beginSilentHide**(): `void`

Defined in: render/dist/Chart.d.ts:88

#### Returns

`void`

***

### clear()

> **clear**(): `this`

Defined in: render/dist/Chart.d.ts:114

#### Returns

`this`

***

### clearAnimationSuppression()

> **clearAnimationSuppression**(): `void`

Defined in: render/dist/Chart.d.ts:86

#### Returns

`void`

***

### convertFromPixel()

> **convertFromPixel**(`coord`): \[`number`, `number`\]

Defined in: render/dist/Chart.d.ts:128

#### Parameters

##### coord

\[`number`, `number`\]

#### Returns

\[`number`, `number`\]

***

### convertToPixel()

> **convertToPixel**(`coord`): \[`number`, `number`\]

Defined in: render/dist/Chart.d.ts:129

#### Parameters

##### coord

\[`number`, `number`\]

#### Returns

\[`number`, `number`\]

***

### dispose()

> **dispose**(): `void`

Defined in: render/dist/Chart.d.ts:111

#### Returns

`void`

***

### endAnimateControl()

> **endAnimateControl**(): `void`

Defined in: render/dist/Chart.d.ts:90

#### Returns

`void`

***

### getAnimator()

> **getAnimator**(): [`Animator`](Animator.md)

Defined in: render/dist/Chart.d.ts:82

#### Returns

[`Animator`](Animator.md)

***

### getBoundingRect()

> **getBoundingRect**(): `DOMRect`

Defined in: render/dist/Chart.d.ts:138

#### Returns

`DOMRect`

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: render/dist/Chart.d.ts:76

#### Parameters

##### opts?

[`DataURLOpts`](../interfaces/DataURLOpts.md)

#### Returns

`string`

***

### getDom()

> **getDom**(): `HTMLElement`

Defined in: render/dist/Chart.d.ts:116

#### Returns

`HTMLElement`

***

### getHeight()

> **getHeight**(): `number`

Defined in: render/dist/Chart.d.ts:78

#### Returns

`number`

***

### getLocale()

> **getLocale**(): `string`

Defined in: render/dist/Chart.d.ts:55

#### Returns

`string`

***

### getOption()

> **getOption**(): [`ChartOption`](../interfaces/ChartOption.md)

Defined in: render/dist/Chart.d.ts:74

#### Returns

[`ChartOption`](../interfaces/ChartOption.md)

***

### getRenderer()

> **getRenderer**(): [`Renderer`](Renderer.md)

Defined in: render/dist/Chart.d.ts:117

#### Returns

[`Renderer`](Renderer.md)

***

### getRenderMode()

> **getRenderMode**(): [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: render/dist/Chart.d.ts:47

Get render mode

#### Returns

[`RenderMode`](../type-aliases/RenderMode.md)

***

### getState()

> **getState**(): `object`

Defined in: render/dist/Chart.d.ts:118

#### Returns

`object`

##### height

> **height**: `number`

##### isDisposed

> **isDisposed**: `boolean`

##### isMounted

> **isMounted**: `boolean`

##### locale

> **locale**: `string`

##### renderMode

> **renderMode**: [`RenderMode`](../type-aliases/RenderMode.md)

##### theme

> **theme**: `string`

##### width

> **width**: `number`

***

### getTheme()

> **getTheme**(): `string`

Defined in: render/dist/Chart.d.ts:52

#### Returns

`string`

***

### getThemeConfig()

> **getThemeConfig**(): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: render/dist/Chart.d.ts:54

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/Chart.d.ts:77

#### Returns

`number`

***

### hideLoading()

> **hideLoading**(): `void`

Defined in: render/dist/Chart.d.ts:137

#### Returns

`void`

***

### isDisposed()

> **isDisposed**(): `boolean`

Defined in: render/dist/Chart.d.ts:115

#### Returns

`boolean`

***

### isMounted()

> **isMounted**(): `boolean`

Defined in: render/dist/Chart.d.ts:61

#### Returns

`boolean`

***

### makeResponsive()

> **makeResponsive**(): `this`

Defined in: render/dist/Chart.d.ts:139

#### Returns

`this`

***

### mount()

> **mount**(): `this`

Defined in: render/dist/Chart.d.ts:59

#### Returns

`this`

***

### off()

> **off**(`event?`, `handler?`): `void`

Defined in: render/dist/Chart.d.ts:108

#### Parameters

##### event?

`string`

##### handler?

(`event`) => `void`

#### Returns

`void`

***

### on()

> **on**(`event`, `handler`): `void`

Defined in: render/dist/Chart.d.ts:107

#### Parameters

##### event

`string`

##### handler

(`event`) => `void`

#### Returns

`void`

***

### once()

> **once**(`event`, `handler`): `void`

Defined in: render/dist/Chart.d.ts:109

#### Parameters

##### event

`string`

##### handler

(`event`) => `void`

#### Returns

`void`

***

### pauseAnimation()

> **pauseAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:79

#### Returns

`void`

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: render/dist/Chart.d.ts:75

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`void`

***

### resumeAnimation()

> **resumeAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:80

#### Returns

`void`

***

### setLocale()

> **setLocale**(`locale`): `void`

Defined in: render/dist/Chart.d.ts:56

#### Parameters

##### locale

`string`

#### Returns

`void`

***

### setOption()

> **setOption**(`option`, `notMerge?`, `lazyUpdate?`): `this`

Defined in: render/dist/Chart.d.ts:65

Set chart option with advanced options

#### Parameters

##### option

[`ChartOption`](../interfaces/ChartOption.md)

##### notMerge?

`boolean` | \{ `lazyUpdate?`: `boolean`; `notMerge?`: `boolean`; `silent?`: `boolean`; \}

##### lazyUpdate?

`boolean`

#### Returns

`this`

***

### setRenderMode()

> **setRenderMode**(`renderMode`): `void`

Defined in: render/dist/Chart.d.ts:51

Set render mode

#### Parameters

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md)

#### Returns

`void`

***

### setTheme()

> **setTheme**(`theme`): `void`

Defined in: render/dist/Chart.d.ts:53

#### Parameters

##### theme

`string`

#### Returns

`void`

***

### showLoading()

> **showLoading**(`loadingOpts?`): `void`

Defined in: render/dist/Chart.d.ts:130

#### Parameters

##### loadingOpts?

###### color?

`string`

###### maskColor?

`string`

###### text?

`string`

###### textColor?

`string`

###### zlevel?

`number`

#### Returns

`void`

***

### stopAnimation()

> **stopAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:81

#### Returns

`void`

***

### stopResponsive()

> **stopResponsive**(): `this`

Defined in: render/dist/Chart.d.ts:140

#### Returns

`this`

***

### suppressNextAnimation()

> **suppressNextAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:85

#### Returns

`void`

***

### t()

> **t**(`key`, `defaultValue?`): `string`

Defined in: render/dist/Chart.d.ts:57

#### Parameters

##### key

`string`

##### defaultValue?

`string`

#### Returns

`string`

***

### trigger()

> **trigger**(`eventName`, `data?`): `void`

Defined in: render/dist/Chart.d.ts:110

#### Parameters

##### eventName

`string`

##### data?

`any`

#### Returns

`void`

***

### unmount()

> **unmount**(): `this`

Defined in: render/dist/Chart.d.ts:60

#### Returns

`this`
