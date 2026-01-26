[**HudX API**](../../../README.md)

***

# Class: LocaleManager

Defined in: render/dist/i18n/LocaleManager.d.ts:5

## Constructors

### Constructor

> **new LocaleManager**(): `LocaleManager`

#### Returns

`LocaleManager`

## Methods

### getLocale()

> `static` **getLocale**(`locale`): [`LocaleConfig`](../interfaces/LocaleConfig.md)

Defined in: render/dist/i18n/LocaleManager.d.ts:11

Get locale configuration

#### Parameters

##### locale

`string`

#### Returns

[`LocaleConfig`](../interfaces/LocaleConfig.md)

***

### getLocales()

> `static` **getLocales**(): `string`[]

Defined in: render/dist/i18n/LocaleManager.d.ts:23

Get all registered locales

#### Returns

`string`[]

***

### registerLocale()

> `static` **registerLocale**(`locale`, `config`): `void`

Defined in: render/dist/i18n/LocaleManager.d.ts:19

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

Defined in: render/dist/i18n/LocaleManager.d.ts:15

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
