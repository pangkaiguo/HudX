# Shape Interfaces

This document details the `shape` property interfaces for all graphic elements in `hudx-render`.

## CircleShape

Configuration for Circle shape.

```typescript
interface CircleShape {
  cx: number; // Center x coordinate
  cy: number; // Center y coordinate
  r: number;  // Radius
}
```

## RectShape

Configuration for Rectangle shape.

```typescript
interface RectShape {
  x: number;      // Top-left x coordinate
  y: number;      // Top-left y coordinate
  width: number;  // Width
  height: number; // Height
  r?: number;     // Border radius (optional)
}
```

## TextShape

Configuration for Text shape.

```typescript
interface TextShape {
  x: number;    // Anchor x coordinate
  y: number;    // Anchor y coordinate
  text: string; // Text content
}
```

## LineShape

Configuration for Line shape.

```typescript
interface LineShape {
  x1: number; // Start x coordinate
  y1: number; // Start y coordinate
  x2: number; // End x coordinate
  y2: number; // End y coordinate
}
```

## PolygonShape

Configuration for Polygon shape.

```typescript
interface PolygonShape {
  // Array of vertices, supports object array [{x, y}, ...] or 2D array [[x, y], ...]
  points: Point[] | number[][];
}
```

## PolylineShape

Configuration for Polyline shape.

```typescript
interface PolylineShape {
  // Array of vertices, supports object array [{x, y}, ...] or 2D array [[x, y], ...]
  points: Point[] | number[][];
}
```

## ArcShape

Configuration for Arc shape.

```typescript
interface ArcShape {
  cx: number;             // Center x coordinate
  cy: number;             // Center y coordinate
  r: number;              // Radius
  startAngle: number;     // Start angle (radians)
  endAngle: number;       // End angle (radians)
  anticlockwise?: boolean;// Whether to draw anticlockwise (optional, default false)
}
```

## BezierCurveShape

Configuration for Bezier Curve shape.

```typescript
interface BezierCurveShape {
  x1: number;     // Start x
  y1: number;     // Start y
  x2: number;     // End x
  y2: number;     // End y
  cpx1: number;   // Control point 1 x
  cpy1: number;   // Control point 1 y
  cpx2?: number;  // Control point 2 x (optional, cubic only)
  cpy2?: number;  // Control point 2 y (optional, cubic only)
}
```

## SectorShape

Configuration for Sector (Pie slice) shape.

```typescript
interface SectorShape {
  cx: number;             // Center x coordinate
  cy: number;             // Center y coordinate
  r0: number;             // Inner radius
  r: number;              // Outer radius
  startAngle: number;     // Start angle (radians)
  endAngle: number;       // End angle (radians)
  anticlockwise?: boolean;// Whether to draw anticlockwise (optional, default false)
}
```

## ImageShape

Configuration for Image shape.

```typescript
interface ImageShape {
  x: number;      // Top-left x coordinate
  y: number;      // Top-left y coordinate
  width: number;  // Width
  height: number; // Height
  // Image source, supports HTMLImageElement, HTMLCanvasElement, etc.
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
  sx?: number;    // Source crop x (optional)
  sy?: number;    // Source crop y (optional)
  sWidth?: number;// Source crop width (optional)
  sHeight?: number;// Source crop height (optional)
}
```

## PathShape

Configuration for SVG Path shape.

```typescript
interface PathShape {
  d: string;     // SVG path data string (e.g., "M 10 10 L 20 20")
  path?: Path2D; // Cached Path2D object (internal use, optional)
}
```
