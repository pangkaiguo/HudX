[**HudX API**](../../../README.md)

***

# Class: LocaleManager

Defined in: [render/src/i18n/LocaleManager.ts:7](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/i18n/LocaleManager.ts#L7)

## Constructors

### Constructor

> **new LocaleManager**(): `LocaleManager`

#### Returns

`LocaleManager`

## Methods

### getLocale()

> `static` **getLocale**(`locale`): [`LocaleConfig`](../interfaces/LocaleConfig.md)

Defined in: [render/src/i18n/LocaleManager.ts:121](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/i18n/LocaleManager.ts#L121)

Get locale configuration

#### Parameters

##### locale

`string`

#### Returns

[`LocaleConfig`](../interfaces/LocaleConfig.md)

***

### getLocales()

> `static` **getLocales**(): `string`[]

Defined in: [render/src/i18n/LocaleManager.ts:156](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/i18n/LocaleManager.ts#L156)

Get all registered locales

#### Returns

`string`[]

***

### registerLocale()

> `static` **registerLocale**(`locale`, `config`): `void`

Defined in: [render/src/i18n/LocaleManager.ts:149](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/i18n/LocaleManager.ts#L149)

Register custom locale

#### Parameters

##### locale

`string`

##### config

[`LocaleConfig`](../interfaces/LocaleConfig.md)

#### Returns

`void`

***

### t()

> `static` **t**(`locale`, `key`, `defaultValue?`): `string`

Defined in: [render/src/i18n/LocaleManager.ts:141](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/i18n/LocaleManager.ts#L141)

Get translated text

#### Parameters

##### locale

`string`

##### key

`string`

##### defaultValue?

`string`

#### Returns

`string`
