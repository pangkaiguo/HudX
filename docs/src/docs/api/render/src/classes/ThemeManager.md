[**HudX API**](../../../README.md)

***

# Class: ThemeManager

Defined in: [render/src/theme/ThemeManager.ts:105](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L105)

## Constructors

### Constructor

> **new ThemeManager**(): `ThemeManager`

#### Returns

`ThemeManager`

## Methods

### getCurrentTheme()

> `static` **getCurrentTheme**(): `string`

Defined in: [render/src/theme/ThemeManager.ts:343](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L343)

#### Returns

`string`

***

### getTheme()

> `static` **getTheme**(`theme?`): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: [render/src/theme/ThemeManager.ts:333](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L333)

Get theme configuration

#### Parameters

##### theme?

`string`

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getThemes()

> `static` **getThemes**(): `string`[]

Defined in: [render/src/theme/ThemeManager.ts:374](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L374)

Get all registered themes

#### Returns

`string`[]

***

### onThemeChange()

> `static` **onThemeChange**(`listener`): () => `void`

Defined in: [render/src/theme/ThemeManager.ts:357](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L357)

#### Parameters

##### listener

(`theme`) => `void`

#### Returns

> (): `void`

##### Returns

`void`

***

### registerHudBaseTokens()

> `static` **registerHudBaseTokens**(`tokens`): `void`

Defined in: [render/src/theme/ThemeManager.ts:324](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L324)

#### Parameters

##### tokens

`Record`\<`string`, [`ThemeToken`](../interfaces/ThemeToken.md)\>

#### Returns

`void`

***

### registerTheme()

> `static` **registerTheme**(`theme`, `config`): `void`

Defined in: [render/src/theme/ThemeManager.ts:367](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L367)

Register custom theme

#### Parameters

##### theme

`string`

##### config

[`ThemeConfig`](../interfaces/ThemeConfig.md)

#### Returns

`void`

***

### registerToken()

> `static` **registerToken**(`theme`, `token`): `void`

Defined in: [render/src/theme/ThemeManager.ts:122](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L122)

Register theme token

#### Parameters

##### theme

`string`

##### token

[`ThemeToken`](../interfaces/ThemeToken.md)

#### Returns

`void`

***

### setCurrentTheme()

> `static` **setCurrentTheme**(`theme`): `void`

Defined in: [render/src/theme/ThemeManager.ts:347](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/theme/ThemeManager.ts#L347)

#### Parameters

##### theme

`string`

#### Returns

`void`
