[**HudX API**](../../../README.md)

***

# Function: toRgbaWithOpacity()

> **toRgbaWithOpacity**(`color`, `opacity`): `string`

Defined in: [render/src/util/color.ts:191](https://github.com/pangkaiguo/HudX/blob/5318c1432ccbb01469da04d48c3f66df5dc53246/packages/render/src/util/color.ts#L191)

Parse color with opacity
toRgbaWithOpacity('#ff9933', 0.6) // 'rgba(255, 153, 51, 0.6)'
toRgbaWithOpacity('rgba(255, 153, 51, 0.5)', 0.6) // 'rgba(255, 153, 51, 0.6)'
toRgbaWithOpacity('rgb(255, 153, 51)', 0.6) // 'rgba(255, 153, 51, 0.6)'
toRgbaWithOpacity('unknown', 0.6) // 'unknown' parseColor failed
toRgbaWithOpacity('red', 0.6) // 'rgba(255, 0, 0, 0.6)'

## Parameters

### color

`string`

### opacity

`number`

## Returns

`string`
