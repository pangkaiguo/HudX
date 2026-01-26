[**HudX API**](../../../README.md)

***

# Class: ThemeManager

Defined in: render/dist/theme/ThemeManager.d.ts:5

## Constructors

### Constructor

> **new ThemeManager**(): `ThemeManager`

#### Returns

`ThemeManager`

## Methods

### getCurrentTheme()

> `static` **getCurrentTheme**(): `string`

Defined in: render/dist/theme/ThemeManager.d.ts:19

#### Returns

`string`

***

### getTheme()

> `static` **getTheme**(`theme?`): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: render/dist/theme/ThemeManager.d.ts:18

Get theme configuration

#### Parameters

##### theme?

`string`

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getThemes()

> `static` **getThemes**(): `string`[]

Defined in: render/dist/theme/ThemeManager.d.ts:29

Get all registered themes

#### Returns

`string`[]

***

### onThemeChange()

> `static` **onThemeChange**(`listener`): () => `void`

Defined in: render/dist/theme/ThemeManager.d.ts:21

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

Defined in: render/dist/theme/ThemeManager.d.ts:14

#### Parameters

##### tokens

`Record`\<`string`, [`ThemeToken`](../interfaces/ThemeToken.md)\>

#### Returns

`void`

***

### registerTheme()

> `static` **registerTheme**(`theme`, `config`): `void`

Defined in: render/dist/theme/ThemeManager.d.ts:25

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

Defined in: render/dist/theme/ThemeManager.d.ts:13

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

Defined in: render/dist/theme/ThemeManager.d.ts:20

#### Parameters

##### theme

`string`

#### Returns

`void`
