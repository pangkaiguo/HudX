[**HudX API**](../../../README.md)

***

# Function: getSmoothPath()

> **getSmoothPath**(`points`, `tension`, `close`): `string`

Defined in: [render/src/util/curve.ts:19](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/curve.ts#L19)

Calculate smooth line path data using Catmull-Rom spline algorithm (Centripetal or Uniform)
converted to Cubic Bezier for rendering.

Algorithm: Catmull-Rom Spline to Cubic Bezier Conversion

Description:
Converts a set of discrete points into a smooth curve. Uses the Catmull-Rom
spline algorithm to calculate tangents at each point, then converts these tangents
into Cubic Bezier control points (cp1, cp2) for rendering on Canvas/SVG paths.
This matches ECharts style smoothness.

## Parameters

### points

[`Point`](../interfaces/Point.md)[]

Data points

### tension

`number` = `0.5`

Tension factor (0-1). 0 is straight lines, 1 is very loose. Default is 0.5.

### close

`boolean` = `false`

Whether to close the path

## Returns

`string`
