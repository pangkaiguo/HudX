[**HudX API**](../../../README.md)

***

# Variable: toRgbaWithOpacity()

> `const` **toRgbaWithOpacity**: (`color`, `opacity`) => `string`

Defined in: render/dist/util/color.d.ts:46

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
