[**HudX API**](../../../README.md)

***

# Class: PieChart

Defined in: [charts/src/chart/PieChart.ts:70](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/charts/src/chart/PieChart.ts#L70)

## Extends

- [`Chart`](Chart.md)

## Extended by

- [`DoughnutChart`](DoughnutChart.md)
- [`HalfDoughnutChart`](HalfDoughnutChart.md)

## Constructors

### Constructor

> **new PieChart**(`dom`, `option?`, `renderMode?`, `theme?`, `locale?`): `PieChart`

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

`PieChart`

#### Inherited from

[`Chart`](Chart.md).[`constructor`](Chart.md#constructor)

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

[`Chart`](Chart.md).[`batchUpdate`](Chart.md#batchupdate)

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

[`Chart`](Chart.md).[`beginAnimateShow`](Chart.md#beginanimateshow)

***

### beginSilentHide()

> **beginSilentHide**(): `void`

Defined in: render/dist/Chart.d.ts:88

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`beginSilentHide`](Chart.md#beginsilenthide)

***

### clear()

> **clear**(): `this`

Defined in: render/dist/Chart.d.ts:114

#### Returns

`this`

#### Inherited from

[`Chart`](Chart.md).[`clear`](Chart.md#clear)

***

### clearAnimationSuppression()

> **clearAnimationSuppression**(): `void`

Defined in: render/dist/Chart.d.ts:86

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`clearAnimationSuppression`](Chart.md#clearanimationsuppression)

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

[`Chart`](Chart.md).[`convertFromPixel`](Chart.md#convertfrompixel)

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

[`Chart`](Chart.md).[`convertToPixel`](Chart.md#converttopixel)

***

### dispose()

> **dispose**(): `void`

Defined in: render/dist/Chart.d.ts:111

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`dispose`](Chart.md#dispose)

***

### endAnimateControl()

> **endAnimateControl**(): `void`

Defined in: render/dist/Chart.d.ts:90

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`endAnimateControl`](Chart.md#endanimatecontrol)

***

### getAnimator()

> **getAnimator**(): [`Animator`](Animator.md)

Defined in: render/dist/Chart.d.ts:82

#### Returns

[`Animator`](Animator.md)

#### Inherited from

[`Chart`](Chart.md).[`getAnimator`](Chart.md#getanimator)

***

### getBoundingRect()

> **getBoundingRect**(): `DOMRect`

Defined in: render/dist/Chart.d.ts:138

#### Returns

`DOMRect`

#### Inherited from

[`Chart`](Chart.md).[`getBoundingRect`](Chart.md#getboundingrect)

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

[`Chart`](Chart.md).[`getDataURL`](Chart.md#getdataurl)

***

### getDom()

> **getDom**(): `HTMLElement`

Defined in: render/dist/Chart.d.ts:116

#### Returns

`HTMLElement`

#### Inherited from

[`Chart`](Chart.md).[`getDom`](Chart.md#getdom)

***

### getHeight()

> **getHeight**(): `number`

Defined in: render/dist/Chart.d.ts:78

#### Returns

`number`

#### Inherited from

[`Chart`](Chart.md).[`getHeight`](Chart.md#getheight)

***

### getLocale()

> **getLocale**(): `string`

Defined in: render/dist/Chart.d.ts:55

#### Returns

`string`

#### Inherited from

[`Chart`](Chart.md).[`getLocale`](Chart.md#getlocale)

***

### getOption()

> **getOption**(): [`ChartOption`](../interfaces/ChartOption.md)

Defined in: render/dist/Chart.d.ts:74

#### Returns

[`ChartOption`](../interfaces/ChartOption.md)

#### Inherited from

[`Chart`](Chart.md).[`getOption`](Chart.md#getoption)

***

### getRenderer()

> **getRenderer**(): [`Renderer`](Renderer.md)

Defined in: render/dist/Chart.d.ts:117

#### Returns

[`Renderer`](Renderer.md)

#### Inherited from

[`Chart`](Chart.md).[`getRenderer`](Chart.md#getrenderer)

***

### getRenderMode()

> **getRenderMode**(): [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: render/dist/Chart.d.ts:47

Get render mode

#### Returns

[`RenderMode`](../type-aliases/RenderMode.md)

#### Inherited from

[`Chart`](Chart.md).[`getRenderMode`](Chart.md#getrendermode)

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

[`Chart`](Chart.md).[`getState`](Chart.md#getstate)

***

### getTheme()

> **getTheme**(): `string`

Defined in: render/dist/Chart.d.ts:52

#### Returns

`string`

#### Inherited from

[`Chart`](Chart.md).[`getTheme`](Chart.md#gettheme)

***

### getThemeConfig()

> **getThemeConfig**(): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: render/dist/Chart.d.ts:54

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

#### Inherited from

[`Chart`](Chart.md).[`getThemeConfig`](Chart.md#getthemeconfig)

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/Chart.d.ts:77

#### Returns

`number`

#### Inherited from

[`Chart`](Chart.md).[`getWidth`](Chart.md#getwidth)

***

### hideLoading()

> **hideLoading**(): `void`

Defined in: render/dist/Chart.d.ts:137

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`hideLoading`](Chart.md#hideloading)

***

### isDisposed()

> **isDisposed**(): `boolean`

Defined in: render/dist/Chart.d.ts:115

#### Returns

`boolean`

#### Inherited from

[`Chart`](Chart.md).[`isDisposed`](Chart.md#isdisposed)

***

### isMounted()

> **isMounted**(): `boolean`

Defined in: render/dist/Chart.d.ts:61

#### Returns

`boolean`

#### Inherited from

[`Chart`](Chart.md).[`isMounted`](Chart.md#ismounted)

***

### makeResponsive()

> **makeResponsive**(): `this`

Defined in: render/dist/Chart.d.ts:139

#### Returns

`this`

#### Inherited from

[`Chart`](Chart.md).[`makeResponsive`](Chart.md#makeresponsive)

***

### mount()

> **mount**(): `this`

Defined in: render/dist/Chart.d.ts:59

#### Returns

`this`

#### Inherited from

[`Chart`](Chart.md).[`mount`](Chart.md#mount)

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

[`Chart`](Chart.md).[`off`](Chart.md#off)

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

[`Chart`](Chart.md).[`on`](Chart.md#on)

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

[`Chart`](Chart.md).[`once`](Chart.md#once)

***

### pauseAnimation()

> **pauseAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:79

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`pauseAnimation`](Chart.md#pauseanimation)

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

[`Chart`](Chart.md).[`resize`](Chart.md#resize)

***

### resumeAnimation()

> **resumeAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:80

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`resumeAnimation`](Chart.md#resumeanimation)

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

[`Chart`](Chart.md).[`setLocale`](Chart.md#setlocale)

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

[`Chart`](Chart.md).[`setOption`](Chart.md#setoption)

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

#### Overrides

[`Chart`](Chart.md).[`setRenderMode`](Chart.md#setrendermode)

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

[`Chart`](Chart.md).[`setTheme`](Chart.md#settheme)

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

[`Chart`](Chart.md).[`showLoading`](Chart.md#showloading)

***

### stopAnimation()

> **stopAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:81

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`stopAnimation`](Chart.md#stopanimation)

***

### stopResponsive()

> **stopResponsive**(): `this`

Defined in: render/dist/Chart.d.ts:140

#### Returns

`this`

#### Inherited from

[`Chart`](Chart.md).[`stopResponsive`](Chart.md#stopresponsive)

***

### suppressNextAnimation()

> **suppressNextAnimation**(): `void`

Defined in: render/dist/Chart.d.ts:85

#### Returns

`void`

#### Inherited from

[`Chart`](Chart.md).[`suppressNextAnimation`](Chart.md#suppressnextanimation)

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

[`Chart`](Chart.md).[`t`](Chart.md#t)

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

[`Chart`](Chart.md).[`trigger`](Chart.md#trigger)

***

### unmount()

> **unmount**(): `this`

Defined in: render/dist/Chart.d.ts:60

#### Returns

`this`

#### Inherited from

[`Chart`](Chart.md).[`unmount`](Chart.md#unmount)
