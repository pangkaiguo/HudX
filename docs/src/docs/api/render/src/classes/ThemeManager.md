[**HudX API**](../../../README.md)

***

# Class: ThemeManager

Defined in: [render/src/theme/ThemeManager.ts:103](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L103)

## Constructors

### Constructor

> **new ThemeManager**(): `ThemeManager`

#### Returns

`ThemeManager`

## Methods

### getCurrentTheme()

> `static` **getCurrentTheme**(): `string`

Defined in: [render/src/theme/ThemeManager.ts:337](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L337)

#### Returns

`string`

***

### getTheme()

> `static` **getTheme**(`theme?`): [`ThemeConfig`](../interfaces/ThemeConfig.md)

Defined in: [render/src/theme/ThemeManager.ts:327](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L327)

Get theme configuration

#### Parameters

##### theme?

`string`

#### Returns

[`ThemeConfig`](../interfaces/ThemeConfig.md)

***

### getThemes()

> `static` **getThemes**(): `string`[]

Defined in: [render/src/theme/ThemeManager.ts:368](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L368)

Get all registered themes

#### Returns

`string`[]

***

### onThemeChange()

> `static` **onThemeChange**(`listener`): () => `void`

Defined in: [render/src/theme/ThemeManager.ts:351](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L351)

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

Defined in: [render/src/theme/ThemeManager.ts:318](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L318)

#### Parameters

##### tokens

`Record`\<`string`, [`ThemeToken`](../interfaces/ThemeToken.md)\>

#### Returns

`void`

***

### registerTheme()

> `static` **registerTheme**(`theme`, `config`): `void`

Defined in: [render/src/theme/ThemeManager.ts:361](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L361)

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

Defined in: [render/src/theme/ThemeManager.ts:120](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L120)

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

Defined in: [render/src/theme/ThemeManager.ts:341](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/theme/ThemeManager.ts#L341)

#### Parameters

##### theme

`string`

#### Returns

`void`
