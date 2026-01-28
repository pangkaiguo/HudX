[**HudX API**](../../../README.md)

***

# Class: HalfDoughnutChart

Defined in: [charts/src/chart/HalfDoughnutChart.ts:3](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/charts/src/chart/HalfDoughnutChart.ts#L3)

## Extends

- [`PieChart`](PieChart.md)

## Constructors

### Constructor

> **new HalfDoughnutChart**(`dom`, `option?`, `renderMode?`, `theme?`, `locale?`): `HalfDoughnutChart`

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

`HalfDoughnutChart`

#### Inherited from

[`PieChart`](PieChart.md).[`constructor`](PieChart.md#constructor)

## Methods

### batchUpdate()

> **batchUpdate**(`callback`): `this`

Defined in: render/dist/Chart.d.ts:127

#### Parameters

##### callback

(`chart`) => `void`

#### Returns

`this`

#### Inherited from

[`PieChart`](PieChart.md).[`batchUpdate`](PieChart.md#batchupdate)

***

### beginAnimateShow()

> **beginAnimateShow**(`name`): `void`

Defined in: render/dist/Chart.d.ts:89

#### Parameters

##### name

`string`

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`beginAnimateShow`](PieChart.md#beginanimateshow)

***

### beginSilentHide()

> **beginSilentHide**(): `void`

Defined in: render/dist/Chart.d.ts:88

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`beginSilentHide`](PieChart.md#beginsilenthide)

***

### clear()

> **clear**(): `this`

Defined in: render/dist/Chart.d.ts:114

#### Returns

`this`

#### Inherited from

[`PieChart`](PieChart.md).[`clear`](PieChart.md#clear)

***

### clearAnimationSuppression()

> **clearAnimationSuppression**(): `void`

Defined in: render/dist/Chart.d.ts:86

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`clearAnimationSuppression`](PieChart.md#clearanimationsuppression)

***

### convertFromPixel()

> **convertFromPixel**(`coord`): \[`number`, `number`\]

Defined in: render/dist/Chart.d.ts:128

#### Parameters

##### coord

\[`number`, `number`\]

#### Returns

\[`number`, `number`\]

#### Inherited from

[`PieChart`](PieChart.md).[`convertFromPixel`](PieChart.md#convertfrompixel)

***

### convertToPixel()

> **convertToPixel**(`coord`): \[`number`, `number`\]

Defined in: render/dist/Chart.d.ts:129

#### Parameters

##### coord

\[`number`, `number`\]

#### Returns

\[`number`, `number`\]

#### Inherited from

[`PieChart`](PieChart.md).[`convertToPixel`](PieChart.md#converttopixel)

***

### dispose()

> **dispose**(): `void`

Defined in: render/dist/Chart.d.ts:111

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`dispose`](PieChart.md#dispose)

***

### endAnimateControl()

> **endAnimateControl**(): `void`

Defined in: render/dist/Chart.d.ts:90

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`endAnimateControl`](PieChart.md#endanimatecontrol)

***

### getAnimator()

> **getAnimator**(): [`Animator`](Animator.md)

Defined in: render/dist/Chart.d.ts:82

#### Returns

[`Animator`](Animator.md)

#### Inherited from

[`PieChart`](PieChart.md).[`getAnimator`](PieChart.md#getanimator)

***

### getBoundingRect()

> **getBoundingRect**(): `DOMRect`

Defined in: render/dist/Chart.d.ts:138

#### Returns

`DOMRect`

#### Inherited from

[`PieChart`](PieChart.md).[`getBoundingRect`](PieChart.md#getboundingrect)

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: render/dist/Chart.d.ts:76

#### Parameters

##### opts?

[`DataURLOpts`](../interfaces/DataURLOpts.md)

#### Returns

`string`

#### Inherited from

[`PieChart`](PieChart.md).[`getDataURL`](PieChart.md#getdataurl)

***

### getDom()

> **getDom**(): `HTMLElement`

Defined in: render/dist/Chart.d.ts:116

#### Returns

`HTMLElement`

#### Inherited from

[`PieChart`](PieChart.md).[`getDom`](PieChart.md#getdom)

***

### getHeight()

> **getHeight**(): `number`

Defined in: render/dist/Chart.d.ts:78

#### Returns

`number`

#### Inherited from

[`PieChart`](PieChart.md).[`getHeight`](PieChart.md#getheight)

***

### getLocale()

> **getLocale**(): `string`

Defined in: render/dist/Chart.d.ts:55

#### Returns

`string`

#### Inherited from

[`PieChart`](PieChart.md).[`getLocale`](PieChart.md#getlocale)

***

### getOption()

> **getOption**(): [`ChartOption`](../interfaces/ChartOption.md)

Defined in: render/dist/Chart.d.ts:74

#### Returns

[`ChartOption`](../interfaces/ChartOption.md)

#### Inherited from

[`PieChart`](PieChart.md).[`getOption`](PieChart.md#getoption)

***

### getRenderer()

> **getRenderer**(): [`Renderer`](Renderer.md)

Defined in: render/dist/Chart.d.ts:117

#### Returns

[`Renderer`](Renderer.md)

#### Inherited from

[`PieChart`](PieChart.md).[`getRenderer`](PieChart.md#getrenderer)

***

### getRenderMode()

> **getRenderMode**(): [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: render/dist/Chart.d.ts:47

Get render mode

#### Returns

[`RenderMode`](../type-aliases/RenderMode.md)

#### Inherited from

[`PieChart`](PieChart.md).[`getRenderMode`](PieChart.md#getrendermode)

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

#### Inherited from

[`PieChart`](PieChart.md).[`getState`](PieChart.md#getstate)

***

### getTheme()

> **getTheme**(): `string`

Defined in: render/dist/Chart.d.ts:52

#### Returns

`string`

#### Inherited from

[`PieChart`](PieChart.md).[`getTheme`](PieChart.md#gettheme)

***

### getThemeConfig()

> **getThemeConfig**(): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: render/dist/Chart.d.ts:54

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

#### Inherited from

[`PieChart`](PieChart.md).[`getThemeConfig`](PieChart.md#getthemeconfig)

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/Chart.d.ts:77

#### Returns

`number`

#### Inherited from

[`PieChart`](PieChart.md).[`getWidth`](PieChart.md#getwidth)

***

### hideLoading()

> **hideLoading**(): `void`

Defined in: render/dist/Chart.d.ts:137

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`hideLoading`](PieChart.md#hideloading)

***

### isDisposed()

> **isDisposed**(): `boolean`

Defined in: render/dist/Chart.d.ts:115

#### Returns

`boolean`

#### Inherited from

[`PieChart`](PieChart.md).[`isDisposed`](PieChart.md#isdisposed)

***

### isMounted()

> **isMounted**(): `boolean`

Defined in: render/dist/Chart.d.ts:61

#### Returns

`boolean`

#### Inherited from

[`PieChart`](PieChart.md).[`isMounted`](PieChart.md#ismounted)

***

### makeResponsive()

> **makeResponsive**(): `this`

Defined in: render/dist/Chart.d.ts:139

#### Returns

`this`

#### Inherited from

[`PieChart`](PieChart.md).[`makeResponsive`](PieChart.md#makeresponsive)

***

### mount()

> **mount**(): `this`

Defined in: render/dist/Chart.d.ts:59

#### Returns

`this`

#### Inherited from

[`PieChart`](PieChart.md).[`mount`](PieChart.md#mount)

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

#### Inherited from

[`PieChart`](PieChart.md).[`off`](PieChart.md#off)

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

#### Inherited from

[`PieChart`](PieChart.md).[`on`](PieChart.md#on)

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

#### Inherited from

[`PieChart`](PieChart.md).[`once`](PieChart.md#once)

***

### pauseAnimation()

> **pauseAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:79

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`pauseAnimation`](PieChart.md#pauseanimation)

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

#### Inherited from

[`PieChart`](PieChart.md).[`resize`](PieChart.md#resize)

***

### resumeAnimation()

> **resumeAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:80

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`resumeAnimation`](PieChart.md#resumeanimation)

***

### setLocale()

> **setLocale**(`locale`): `void`

Defined in: render/dist/Chart.d.ts:56

#### Parameters

##### locale

`string`

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`setLocale`](PieChart.md#setlocale)

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

#### Inherited from

[`PieChart`](PieChart.md).[`setOption`](PieChart.md#setoption)

***

### setRenderMode()

> **setRenderMode**(`renderMode`): `void`

Defined in: [charts/src/chart/PieChart.ts:90](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/charts/src/chart/PieChart.ts#L90)

Set render mode

#### Parameters

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md)

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`setRenderMode`](PieChart.md#setrendermode)

***

### setTheme()

> **setTheme**(`theme`): `void`

Defined in: render/dist/Chart.d.ts:53

#### Parameters

##### theme

`string`

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`setTheme`](PieChart.md#settheme)

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

#### Inherited from

[`PieChart`](PieChart.md).[`showLoading`](PieChart.md#showloading)

***

### stopAnimation()

> **stopAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:81

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`stopAnimation`](PieChart.md#stopanimation)

***

### stopResponsive()

> **stopResponsive**(): `this`

Defined in: render/dist/Chart.d.ts:140

#### Returns

`this`

#### Inherited from

[`PieChart`](PieChart.md).[`stopResponsive`](PieChart.md#stopresponsive)

***

### suppressNextAnimation()

> **suppressNextAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:85

#### Returns

`void`

#### Inherited from

[`PieChart`](PieChart.md).[`suppressNextAnimation`](PieChart.md#suppressnextanimation)

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

#### Inherited from

[`PieChart`](PieChart.md).[`t`](PieChart.md#t)

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

#### Inherited from

[`PieChart`](PieChart.md).[`trigger`](PieChart.md#trigger)

***

### unmount()

> **unmount**(): `this`

Defined in: render/dist/Chart.d.ts:60

#### Returns

`this`

#### Inherited from

[`PieChart`](PieChart.md).[`unmount`](PieChart.md#unmount)
