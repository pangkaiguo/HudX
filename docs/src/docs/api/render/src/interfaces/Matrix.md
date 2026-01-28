[**HudX API**](../../../README.md)

***

# Interface: Matrix

Defined in: [render/src/util/matrix.ts:13](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L13)

Matrix utilities for transformations

Algorithm: 2D Affine Transformations

Description:
Implements 3x3 matrix operations for 2D geometry (Translation, Rotation, Scaling, Skewing).
Uses homogeneous coordinates [x, y, 1] implicitly.
x' = ax + cy + e
y' = bx + dy + f

## Properties

### a

> **a**: `number`

Defined in: [render/src/util/matrix.ts:14](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L14)

***

### b

> **b**: `number`

Defined in: [render/src/util/matrix.ts:15](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L15)

***

### c

> **c**: `number`

Defined in: [render/src/util/matrix.ts:16](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L16)

***

### d

> **d**: `number`

Defined in: [render/src/util/matrix.ts:17](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L17)

***

### e

> **e**: `number`

Defined in: [render/src/util/matrix.ts:18](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L18)

***

### f

> **f**: `number`

Defined in: [render/src/util/matrix.ts:19](https://github.com/pangkaiguo/HudX/blob/2231bfb72b0675f521ece07b0c55e6a4ee11805d/packages/render/src/util/matrix.ts#L19)
