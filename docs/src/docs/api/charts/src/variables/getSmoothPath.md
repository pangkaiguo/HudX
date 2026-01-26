[**HudX API**](../../../README.md)

***

# Variable: getSmoothPath()

> `const` **getSmoothPath**: (`points`, `tension?`, `close?`) => `string`

Defined in: render/dist/util/curve.d.ts:18

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

### tension?

`number`

Tension factor (0-1). 0 is straight lines, 1 is very loose. Default is 0.5.

### close?

`boolean`

Whether to close the path

## Returns

`string`
