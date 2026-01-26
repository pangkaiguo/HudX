# 图形接口定义

本文档详细描述了 `hudx-render` 中所有图形元素的 `shape` 属性接口。

## CircleShape

圆形形状配置。

```typescript
interface CircleShape {
  cx: number; // 圆心 x 坐标
  cy: number; // 圆心 y 坐标
  r: number;  // 半径
}
```

## RectShape

矩形形状配置。

```typescript
interface RectShape {
  x: number;      // 左上角 x 坐标
  y: number;      // 左上角 y 坐标
  width: number;  // 宽度
  height: number; // 高度
  r?: number;     // 圆角半径 (可选)
}
```

## TextShape

文本形状配置。

```typescript
interface TextShape {
  x: number;    // 文本起始 x 坐标
  y: number;    // 文本起始 y 坐标
  text: string; // 文本内容
}
```

## LineShape

直线形状配置。

```typescript
interface LineShape {
  x1: number; // 起点 x 坐标
  y1: number; // 起点 y 坐标
  x2: number; // 终点 x 坐标
  y2: number; // 终点 y 坐标
}
```

## PolygonShape

多边形形状配置。

```typescript
interface PolygonShape {
  // 顶点数组，支持对象数组 [{x, y}, ...] 或二维数组 [[x, y], ...]
  points: Point[] | number[][];
}
```

## PolylineShape

折线形状配置。

```typescript
interface PolylineShape {
  // 顶点数组，支持对象数组 [{x, y}, ...] 或二维数组 [[x, y], ...]
  points: Point[] | number[][];
}
```

## ArcShape

圆弧形状配置。

```typescript
interface ArcShape {
  cx: number;             // 圆心 x 坐标
  cy: number;             // 圆心 y 坐标
  r: number;              // 半径
  startAngle: number;     // 起始角度 (弧度)
  endAngle: number;       // 结束角度 (弧度)
  anticlockwise?: boolean;// 是否逆时针 (可选，默认 false)
}
```

## BezierCurveShape

贝塞尔曲线形状配置。

```typescript
interface BezierCurveShape {
  x1: number;     // 起点 x
  y1: number;     // 起点 y
  x2: number;     // 终点 x
  y2: number;     // 终点 y
  cpx1: number;   // 控制点1 x
  cpy1: number;   // 控制点1 y
  cpx2?: number;  // 控制点2 x (可选，仅三次贝塞尔曲线需要)
  cpy2?: number;  // 控制点2 y (可选，仅三次贝塞尔曲线需要)
}
```

## SectorShape

扇形形状配置。

```typescript
interface SectorShape {
  cx: number;             // 圆心 x 坐标
  cy: number;             // 圆心 y 坐标
  r0: number;             // 内半径
  r: number;              // 外半径
  startAngle: number;     // 起始角度 (弧度)
  endAngle: number;       // 结束角度 (弧度)
  anticlockwise?: boolean;// 是否逆时针 (可选，默认 false)
}
```

## ImageShape

图片形状配置。

```typescript
interface ImageShape {
  x: number;      // 左上角 x 坐标
  y: number;      // 左上角 y 坐标
  width: number;  // 宽度
  height: number; // 高度
  // 图片源，支持 HTMLImageElement, HTMLCanvasElement 等
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
  sx?: number;    // 源图裁剪 x (可选)
  sy?: number;    // 源图裁剪 y (可选)
  sWidth?: number;// 源图裁剪宽度 (可选)
  sHeight?: number;// 源图裁剪高度 (可选)
}
```

## PathShape

SVG 路径形状配置。

```typescript
interface PathShape {
  d: string;     // SVG 路径数据字符串 (如 "M 10 10 L 20 20")
  path?: Path2D; // 缓存的 Path2D 对象 (内部使用，可选)
}
```
