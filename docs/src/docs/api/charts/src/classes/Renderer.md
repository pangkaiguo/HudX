[**HudX API**](../../../README.md)

***

# Class: Renderer

Defined in: render/dist/Renderer.d.ts:15

## Constructors

### Constructor

> **new Renderer**(`dom`, `renderMode?`, `theme?`, `locale?`): `Renderer`

Defined in: render/dist/Renderer.d.ts:28

#### Parameters

##### dom

`HTMLElement`

##### renderMode?

[`RenderMode`](../type-aliases/RenderMode.md)

##### theme?

`string`

##### locale?

`string`

#### Returns

`Renderer`

## Methods

### add()

> **add**(`element`): `this`

Defined in: render/dist/Renderer.d.ts:44

Add element to root group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`this`

***

### dispose()

> **dispose**(): `void`

Defined in: render/dist/Renderer.d.ts:144

Dispose Renderer instance

#### Returns

`void`

***

### flush()

> **flush**(): `this`

Defined in: render/dist/Renderer.d.ts:72

Flush pending paints immediately

#### Returns

`this`

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement` \| `undefined`

Defined in: render/dist/Renderer.d.ts:108

Get canvas element (Canvas mode only)

#### Returns

`HTMLCanvasElement` \| `undefined`

***

### getDataURL()

> **getDataURL**(`opts?`): `string`

Defined in: render/dist/Renderer.d.ts:92

Get data URL

#### Parameters

##### opts?

[`DataURLOpts`](../interfaces/DataURLOpts.md)

#### Returns

`string`

***

### getDom()

> **getDom**(): `HTMLElement`

Defined in: render/dist/Renderer.d.ts:104

Get container DOM element

#### Returns

`HTMLElement`

***

### getElementById()

> **getElementById**(`id`): [`ChartElement`](ChartElement.md) \| `undefined`

Defined in: render/dist/Renderer.d.ts:56

Get element by ID

#### Parameters

##### id

`string`

#### Returns

[`ChartElement`](ChartElement.md) \| `undefined`

***

### getHeight()

> **getHeight**(): `number`

Defined in: render/dist/Renderer.d.ts:100

Get height

#### Returns

`number`

***

### getLocale()

> **getLocale**(): `string`

Defined in: render/dist/Renderer.d.ts:128

Get locale

#### Returns

`string`

***

### getRenderMode()

> **getRenderMode**(): [`RenderMode`](../type-aliases/RenderMode.md)

Defined in: render/dist/Renderer.d.ts:36

Get render mode

#### Returns

[`RenderMode`](../type-aliases/RenderMode.md)

***

### getRoot()

> **getRoot**(): [`Group`](Group.md)

Defined in: render/dist/Renderer.d.ts:60

Get root group

#### Returns

[`Group`](Group.md)

***

### getSVG()

> **getSVG**(): `SVGSVGElement` \| `undefined`

Defined in: render/dist/Renderer.d.ts:112

Get SVG element (SVG mode only)

#### Returns

`SVGSVGElement` \| `undefined`

***

### getTheme()

> **getTheme**(): `string`

Defined in: render/dist/Renderer.d.ts:116

Get theme

#### Returns

`string`

***

### getThemeConfig()

> **getThemeConfig**(): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: render/dist/Renderer.d.ts:124

Get theme configuration

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getWidth()

> **getWidth**(): `number`

Defined in: render/dist/Renderer.d.ts:96

Get width

#### Returns

`number`

***

### isDisposed()

> **isDisposed**(): `boolean`

Defined in: render/dist/Renderer.d.ts:148

Check if Renderer instance is disposed

#### Returns

`boolean`

***

### off()

> **off**(`event?`, `handler?`): `this`

Defined in: render/dist/Renderer.d.ts:84

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

Defined in: render/dist/Renderer.d.ts:80

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

Defined in: render/dist/Renderer.d.ts:68

Refresh/repaint

#### Returns

`this`

***

### remove()

> **remove**(`element`): `this`

Defined in: render/dist/Renderer.d.ts:48

Remove element from root group

#### Parameters

##### element

[`ChartElement`](ChartElement.md)

#### Returns

`this`

***

### removeAll()

> **removeAll**(): `this`

Defined in: render/dist/Renderer.d.ts:52

Remove all elements

#### Returns

`this`

***

### resize()

> **resize**(`width?`, `height?`): `this`

Defined in: render/dist/Renderer.d.ts:64

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

Defined in: render/dist/Renderer.d.ts:76

Set background color

#### Parameters

##### color?

`string` | `null`

#### Returns

`this`

***

### setLocale()

> **setLocale**(`locale`): `this`

Defined in: render/dist/Renderer.d.ts:132

Set locale

#### Parameters

##### locale

`string`

#### Returns

`this`

***

### setRenderMode()

> **setRenderMode**(`renderMode`): `void`

Defined in: render/dist/Renderer.d.ts:40

Switch render mode (requires reinitialization)

#### Parameters

##### renderMode

[`RenderMode`](../type-aliases/RenderMode.md)

#### Returns

`void`

***

### setTheme()

> **setTheme**(`theme`): `this`

Defined in: render/dist/Renderer.d.ts:120

Set theme

#### Parameters

##### theme

`string`

#### Returns

`this`

***

### t()

> **t**(`key`, `defaultValue?`): `string`

Defined in: render/dist/Renderer.d.ts:136

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

Defined in: render/dist/Renderer.d.ts:88

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

> `static` **init**(`dom`, `renderMode?`, `theme?`, `locale?`): `Renderer`

Defined in: render/dist/Renderer.d.ts:32

Initialize Renderer instance

#### Parameters

##### dom

`string` | `HTMLElement`

##### renderMode?

[`RenderMode`](../type-aliases/RenderMode.md)

##### theme?

`string`

##### locale?

`string`

#### Returns

`Renderer`
