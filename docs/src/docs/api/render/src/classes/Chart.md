[**HudX API**](../../../README.md)

***

# Class: Chart

Defined in: [render/src/Chart.ts:51](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L51)

## Constructors

### Constructor

> **new Chart**(`dom`, `option`, `renderMode`, `theme?`, `locale?`): `Chart`

Defined in: [render/src/Chart.ts:74](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L74)

#### Parameters

##### dom

`HTMLElement`

##### option

[`ChartOption`](../interfaces/ChartOption.md) = `{}`

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md) = `'svg'`

##### theme?

`string`

##### locale?

`string` = `'en'`

#### Returns

`Chart`

## Methods

### batchUpdate()

> **batchUpdate**(`callback`): `this`

Defined in: [render/src/Chart.ts:1124](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1124)

#### Parameters

##### callback

(`chart`) => `void`

#### Returns

`this`

***

### beginAnimateShow()

> **beginAnimateShow**(`name`): `void`

Defined in: [render/src/Chart.ts:392](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L392)

#### Parameters

##### name

`string`

#### Returns

`void`

***

### beginSilentHide()

> **beginSilentHide**(): `void`

Defined in: [render/src/Chart.ts:388](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L388)

#### Returns

`void`

***

### clear()

> **clear**(): `this`

Defined in: [render/src/Chart.ts:1086](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1086)

#### Returns

`this`

***

### clearAnimationSuppression()

> **clearAnimationSuppression**(): `void`

Defined in: [render/src/Chart.ts:375](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L375)

#### Returns

`void`

***

### convertFromPixel()

> **convertFromPixel**(`coord`): \[`number`, `number`\]

Defined in: [render/src/Chart.ts:1136](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1136)

#### Parameters

##### coord

\[`number`, `number`\]

#### Returns

\[`number`, `number`\]

***

### convertToPixel()

> **convertToPixel**(`coord`): \[`number`, `number`\]

Defined in: [render/src/Chart.ts:1141](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1141)

#### Parameters

##### coord

\[`number`, `number`\]

#### Returns

\[`number`, `number`\]

***

### dispose()

> **dispose**(): `void`

Defined in: [render/src/Chart.ts:1055](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1055)

#### Returns

`void`

***

### endAnimateControl()

> **endAnimateControl**(): `void`

Defined in: [render/src/Chart.ts:396](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L396)

#### Returns

`void`

***

### getAnimator()

> **getAnimator**(): [`Animator`](Animator.md)

Defined in: [render/src/Chart.ts:359](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L359)

#### Returns

[`Animator`](Animator.md)

***

### getBoundingRect()

> **getBoundingRect**(): `DOMRect`

Defined in: [render/src/Chart.ts:1170](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1170)

#### Returns

`DOMRect`

***

### getDataURL()

> **getDataURL**(`opts`): `string`

Defined in: [render/src/Chart.ts:326](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L326)

#### Parameters

##### opts

[`DataURLOpts`](../interfaces/DataURLOpts.md) = `{}`

#### Returns

`string`

***

### getDom()

> **getDom**(): `HTMLElement`

Defined in: [render/src/Chart.ts:1096](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1096)

#### Returns

`HTMLElement`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [render/src/Chart.ts:334](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L334)

#### Returns

`number`

***

### getLocale()

> **getLocale**(): `string`

Defined in: [render/src/Chart.ts:125](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L125)

#### Returns

`string`

***

### getOption()

> **getOption**(): [`ChartOption`](../interfaces/ChartOption.md)

Defined in: [render/src/Chart.ts:306](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L306)

#### Returns

[`ChartOption`](../interfaces/ChartOption.md)

***

### getRenderer()

> **getRenderer**(): [`Renderer`](Renderer.md)

Defined in: [render/src/Chart.ts:1100](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1100)

#### Returns

[`Renderer`](Renderer.md)

***

### getRenderMode()

> **getRenderMode**(): [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: [render/src/Chart.ts:91](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L91)

Get render mode

#### Returns

[`RenderMode`](../type-aliases/RenderMode.md)

***

### getState()

> **getState**(): `object`

Defined in: [render/src/Chart.ts:1104](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1104)

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

Defined in: [render/src/Chart.ts:109](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L109)

#### Returns

`string`

***

### getThemeConfig()

> **getThemeConfig**(): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: [render/src/Chart.ts:121](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L121)

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getWidth()

> **getWidth**(): `number`

Defined in: [render/src/Chart.ts:330](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L330)

#### Returns

`number`

***

### hideLoading()

> **hideLoading**(): `void`

Defined in: [render/src/Chart.ts:1166](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1166)

#### Returns

`void`

***

### isDisposed()

> **isDisposed**(): `boolean`

Defined in: [render/src/Chart.ts:1092](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1092)

#### Returns

`boolean`

***

### isMounted()

> **isMounted**(): `boolean`

Defined in: [render/src/Chart.ts:191](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L191)

#### Returns

`boolean`

***

### makeResponsive()

> **makeResponsive**(): `this`

Defined in: [render/src/Chart.ts:1174](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1174)

#### Returns

`this`

***

### mount()

> **mount**(): `this`

Defined in: [render/src/Chart.ts:172](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L172)

#### Returns

`this`

***

### off()

> **off**(`event?`, `handler?`): `void`

Defined in: [render/src/Chart.ts:1032](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1032)

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

Defined in: [render/src/Chart.ts:1028](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1028)

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

Defined in: [render/src/Chart.ts:1036](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1036)

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

Defined in: [render/src/Chart.ts:338](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L338)

#### Returns

`void`

***

### resize()

> **resize**(`width?`, `height?`): `void`

Defined in: [render/src/Chart.ts:310](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L310)

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

Defined in: [render/src/Chart.ts:346](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L346)

#### Returns

`void`

***

### setLocale()

> **setLocale**(`locale`): `void`

Defined in: [render/src/Chart.ts:129](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L129)

#### Parameters

##### locale

`string`

#### Returns

`void`

***

### setOption()

> **setOption**(`option`, `notMerge?`, `lazyUpdate?`): `this`

Defined in: [render/src/Chart.ts:198](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L198)

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

Defined in: [render/src/Chart.ts:98](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L98)

Set render mode

#### Parameters

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md)

#### Returns

`void`

***

### setTheme()

> **setTheme**(`theme`): `void`

Defined in: [render/src/Chart.ts:113](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L113)

#### Parameters

##### theme

`string`

#### Returns

`void`

***

### showLoading()

> **showLoading**(`loadingOpts?`): `void`

Defined in: [render/src/Chart.ts:1146](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1146)

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

Defined in: [render/src/Chart.ts:353](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L353)

#### Returns

`void`

***

### stopResponsive()

> **stopResponsive**(): `this`

Defined in: [render/src/Chart.ts:1203](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1203)

#### Returns

`this`

***

### suppressNextAnimation()

> **suppressNextAnimation**(): `void`

Defined in: [render/src/Chart.ts:371](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L371)

#### Returns

`void`

***

### t()

> **t**(`key`, `defaultValue?`): `string`

Defined in: [render/src/Chart.ts:134](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L134)

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

Defined in: [render/src/Chart.ts:1044](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L1044)

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

Defined in: [render/src/Chart.ts:182](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Chart.ts#L182)

#### Returns

`this`
