[**HudX API**](../../../README.md)

***

# Function: toHex()

> **toHex**(`color`): `string`

Defined in: [render/src/util/color.ts:165](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/util/color.ts#L165)

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
