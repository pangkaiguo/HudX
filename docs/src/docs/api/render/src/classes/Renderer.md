[**HudX API**](../../../README.md)

***

# Class: Renderer

Defined in: [render/src/Renderer.ts:32](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L32)

## Constructors

### Constructor

> **new Renderer**(`dom`, `renderMode`, `theme?`, `locale?`): `Renderer`

Defined in: [render/src/Renderer.ts:46](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L46)

#### Parameters

##### dom

`HTMLElement`

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md) = `'svg'`

##### theme?

`string`

##### locale?

`string` = `'en'`

#### Returns

`Renderer`

## Methods

### add()

> **add**(`element`): `this`

Defined in: [render/src/Renderer.ts:157](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L157)

Add element to root group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`this`

***

### dispose()

> **dispose**(): `void`

Defined in: [render/src/Renderer.ts:391](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L391)

Dispose Renderer instance

#### Returns

`void`

***

### flush()

> **flush**(): `this`

Defined in: [render/src/Renderer.ts:218](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L218)

Flush pending paints immediately

#### Returns

`this`

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement` \| `undefined`

Defined in: [render/src/Renderer.ts:292](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L292)

Get canvas element (Canvas mode only)

#### Returns

`HTMLCanvasElement` \| `undefined`

***

### getDataURL()

> **getDataURL**(`opts`): `string`

Defined in: [render/src/Renderer.ts:259](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L259)

Get data URL

#### Parameters

##### opts

[`DataURLOpts`](../interfaces/DataURLOpts.md) = `{}`

#### Returns

`string`

***

### getDom()

> **getDom**(): `HTMLElement`

Defined in: [render/src/Renderer.ts:285](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L285)

Get container DOM element

#### Returns

`HTMLElement`

***

### getElementById()

> **getElementById**(`id`): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: [render/src/Renderer.ts:188](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L188)

Get element by ID

#### Parameters

##### id

`string`

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [render/src/Renderer.ts:278](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L278)

Get height

#### Returns

`number`

***

### getLocale()

> **getLocale**(): `string`

Defined in: [render/src/Renderer.ts:344](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L344)

Get locale

#### Returns

`string`

***

### getRenderMode()

> **getRenderMode**(): [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: [render/src/Renderer.ts:120](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L120)

Get render mode

#### Returns

[`RenderMode`](../type-aliases/RenderMode.md)

***

### getRoot()

> **getRoot**(): [`Group`](Group.md)

Defined in: [render/src/Renderer.ts:195](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L195)

Get root group

#### Returns

[`Group`](Group.md)

***

### getSVG()

> **getSVG**(): `SVGSVGElement` \| `undefined`

Defined in: [render/src/Renderer.ts:302](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L302)

Get SVG element (SVG mode only)

#### Returns

`SVGSVGElement` \| `undefined`

***

### getTheme()

> **getTheme**(): `string`

Defined in: [render/src/Renderer.ts:312](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L312)

Get theme

#### Returns

`string`

***

### getThemeConfig()

> **getThemeConfig**(): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: [render/src/Renderer.ts:337](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L337)

Get theme configuration

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getWidth()

> **getWidth**(): `number`

Defined in: [render/src/Renderer.ts:271](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L271)

Get width

#### Returns

`number`

***

### isDisposed()

> **isDisposed**(): `boolean`

Defined in: [render/src/Renderer.ts:408](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L408)

Check if Renderer instance is disposed

#### Returns

`boolean`

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: [render/src/Renderer.ts:243](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L243)

Remove event listener

#### Parameters

##### event?

`string`

##### handler?

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

***

### on()

> **on**(`event`, `handler`): `this`

Defined in: [render/src/Renderer.ts:235](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L235)

Add event listener

#### Parameters

##### event

`string`

##### handler

[`EventCallback`](../type-aliases/EventCallback.md)

#### Returns

`this`

***

### refresh()

> **refresh**(): `this`

Defined in: [render/src/Renderer.ts:210](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L210)

Refresh/repaint

#### Returns

`this`

***

### remove()

> **remove**(`element`): `this`

Defined in: [render/src/Renderer.ts:167](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L167)

Remove element from root group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`this`

***

### removeAll()

> **removeAll**(): `this`

Defined in: [render/src/Renderer.ts:177](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L177)

Remove all elements

#### Returns

`this`

***

### resize()

> **resize**(`width?`, `height?`): `this`

Defined in: [render/src/Renderer.ts:202](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L202)

Resize renderer

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`this`

***

### setBackgroundColor()

> **setBackgroundColor**(`color?`): `this`

Defined in: [render/src/Renderer.ts:226](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L226)

Set background color

#### Parameters

##### color?

`string` | `null`

#### Returns

`this`

***

### setLocale()

> **setLocale**(`locale`): `this`

Defined in: [render/src/Renderer.ts:351](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L351)

Set locale

#### Parameters

##### locale

`string`

#### Returns

`this`

***

### setRenderMode()

> **setRenderMode**(`renderMode`): `void`

Defined in: [render/src/Renderer.ts:127](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L127)

Switch render mode (requires reinitialization)

#### Parameters

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md)

#### Returns

`void`

***

### setTheme()

> **setTheme**(`theme`): `this`

Defined in: [render/src/Renderer.ts:319](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L319)

Set theme

#### Parameters

##### theme

`string`

#### Returns

`this`

***

### t()

> **t**(`key`, `defaultValue?`): `string`

Defined in: [render/src/Renderer.ts:363](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L363)

Get translated text

#### Parameters

##### key

`string`

##### defaultValue?

`string`

#### Returns

`string`

***

### trigger()

> **trigger**(`event`, `eventData?`): `this`

Defined in: [render/src/Renderer.ts:251](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L251)

Trigger event

#### Parameters

##### event

`string`

##### eventData?

[`EventData`](../interfaces/EventData.md)

#### Returns

`this`

***

### init()

> `static` **init**(`dom`, `renderMode`, `theme?`, `locale?`): `Renderer`

Defined in: [render/src/Renderer.ts:98](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/Renderer.ts#L98)

Initialize Renderer instance

#### Parameters

##### dom

`string` | `HTMLElement`

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md) = `'svg'`

##### theme?

`string`

##### locale?

`string` = `'en'`

#### Returns

`Renderer`
