[**HudX API**](../../../README.md)

***

# Variable: toHex()

> `const` **toHex**: (`color`) => `string`

Defined in: render/dist/util/color.d.ts:37

Convert color to hex string
toHex('rgba(255, 153,51,0.5)') // '#ff993380'
toHex('rgb(255, 153,51)') // '#ff9933'
toHex('#ff9933') // '#ff9933' parseColor success, alpha = 1
toHex('unknown') // 'unknown' parseColor failed

## Parameters

### color

`string`

## Returns

`string`
