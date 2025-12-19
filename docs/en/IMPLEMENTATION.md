# HudX Implementation Documentation

This document details the implementation logic and design philosophy of HudX.

## Architecture Design

### Overall Architecture

HudX adopts a layered architecture with two main packages:

1. **HudX/core**: Core rendering engine, similar to ZRender, supports both Canvas and SVG rendering modes
2. **HudX/charts**: Chart library, similar to ECharts

### MVC Pattern

The core rendering engine adopts an MVC pattern:

```
┌──────────────┐
│   Renderer    │  ← Main Controller
└──────┬───────┘
       │
   ┌───┴───┐
   │       │
┌──▼──┐ ┌─▼────┐ ┌────────┐
│Storage│ │Painter│ │Handler │
│(Model)│ │ (View) │ │(Controller)│
└───────┘ └──────┘ └────────┘
```

- **Model (Storage)**: Manages storage and hierarchy of graphic elements
- **View (Painter)**: Handles rendering (Canvas or SVG)
- **Controller (Handler)**: Processes user interaction

## Core Implementation

### 1. Renderer Class

Renderer is the main rendering engine responsible for coordinating all modules:

```typescript
class Renderer {
  private _storage: Storage;      // Element storage
  private _painter: IPainter;     // Painter (Canvas or SVG)
  private _handler: Handler;      // Event handler
  private _root: Group;           // Root group
  private _renderMode: RenderMode; // Rendering mode
  private _theme: Theme;          // Theme
  private _locale: Locale;        // Language
}
```

**Main Responsibilities**:

- Initialize all modules
- Manage element lifecycle
- Coordinate rendering and event handling
- Manage themes and languages

### 2. Element Base Class

All graphic elements inherit from Element:

```typescript
class Element extends Eventful {
  id: string;                      // Unique identifier
  zlevel: number;                  // Z-level
  z: number;                       // Order within z-level
  style: Style;                    // Style
  shape: Record<string, any>;      // Shape properties
  transform: Transform;            // Transformation
}
```

**Key Methods**:

- `render(ctx)`: Render element (implemented by subclasses)
- `getBoundingRect()`: Get bounding rectangle
- `contain(x, y)`: Check if point is in element
- `markRedraw()`: Mark for redraw

### 3. Storage Class

Storage manages all graphic elements:

```typescript
class Storage {
  private _roots: Group[];                    // Root groups
  private _elements: Map<string, Element>;   // Element mapping
}
```

**Features**:

- Maintains element tree structure
- Quick element lookup (by ID)
- Elements sorted by zlevel and z

### 4. Painter Classes

#### Canvas Painter

```typescript
class CanvasPainter implements IPainter {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _dirty: boolean;
}
```

**Rendering Pipeline**:

1. Check if redraw needed (dirty flag)
2. Clear canvas
3. Get all elements from Storage
4. Sort by zlevel and z
5. Render each element

**Performance Optimization**:

- Use `requestAnimationFrame` for batch updates
- Only redraw elements marked as dirty
- Support high DPI screens (devicePixelRatio)

#### SVG Painter

```typescript
class SVGPainter implements IPainter {
  private _svg: SVGSVGElement;
  private _elements: Map<string, SVGElement>;
}
```

**Features**:

- Create SVG elements (circle, rect, path, etc.)
- DOM manipulation for updates
- Full SVG transform support

### 5. Handler Class

Handler processes user interactions:

```typescript
class Handler {
  private _painter: Painter;
  private _storage: Storage;
  private _hovered: Element | null;
  private _dragging: Element | null;
}
```

**Event Processing Pipeline**:

1. Listen for native Canvas events
2. Convert coordinates to canvas coordinate system
3. Find target element (traverse from back to front)
4. Trigger element event

**Event Support**:

- Mouse events (mousedown, mousemove, mouseup, click, dblclick, etc.)
- Touch events (touchstart, touchmove, touchend)
- Drag support
- Event bubbling

### 6. Group Class

Group is a container element:

```typescript
class Group extends Element {
  private _children: Element[];
}
```

**Features**:

- Child element management
- Transformation inheritance
- Event bubbling
- Rendering recursion

## Key Design Patterns

### 1. Dirty Flag Pattern

Elements are marked dirty when properties change, and only dirty elements are redrawn:

```typescript
element.attr('style', { fill: '#ff0000' });
element.markRedraw();
renderer.refresh();
```

### 2. Event Bubbling

Events bubble up through the element hierarchy:

```typescript
group.add(circle);
circle.on('click', () => console.log('Circle clicked'));
group.on('click', () => console.log('Group clicked'));
// Clicking circle triggers both events
```

### 3. RequestAnimationFrame Batch Updates

Multiple changes are batched for a single render:

```typescript
element1.attr('style', { fill: '#ff0000' });
element2.attr('style', { fill: '#00ff00' });
// Both changes rendered in single frame
renderer.refresh();
```

### 4. Transform Matrix

Transformations are applied through matrix multiplication:

```typescript
const transform = [
  [cos, sin, 0],
  [-sin, cos, 0],
  [x, y, 1]
];
```

## Dual Rendering Implementation

### Canvas Mode (Default)

**Advantages**:

- High performance with large datasets
- Real-time updates capability
- Lower memory usage
- Smooth animations

**Implementation**:

- Direct 2D context drawing
- Element-based rendering
- Coordinate transformation
- Performance optimization

### SVG Mode

**Advantages**:

- Vector graphics (no distortion)
- CSS support
- DOM structure (debuggable)
- Easy to export

**Implementation**:

- SVG element creation
- DOM manipulation
- Transform attribute support
- Style application

## Animation System

### Property-based Animation

```typescript
element.animate('shape', { r: 100 }, {
  duration: 1000,
  easing: 'cubic-in-out',
  onfinish: () => console.log('done')
});
```

### Easing Functions

- Linear
- Quadratic (ease-in, ease-out, ease-in-out)
- Cubic
- Elastic
- Back
- Bounce

## Performance Optimization

### 1. Object Pool

Reuse objects to reduce GC pressure:

```typescript
const pool = new ObjectPool(Vector);
const v = pool.obtain();
// use v
pool.release(v);
```

### 2. Batch Updater

Defer updates for batch processing:

```typescript
const updater = new BatchUpdater();
updater.add(() => element1.refresh());
updater.add(() => element2.refresh());
updater.flush();
```

### 3. Incremental Rendering

Only redraw changed elements using dirty flags.

### 4. High DPI Support

Auto-adjust canvas resolution for high DPI screens:

```typescript
const dpr = window.devicePixelRatio;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
```

## Theme and Localization

### Theme System

```typescript
renderer.setTheme('dark');
const colors = renderer.getThemeConfig();
```

### Localization

```typescript
renderer.setLocale('zh-CN');
const messages = renderer.getLocaleMessages();
```

## Error Handling

- Try-catch for rendering operations
- Graceful degradation
- Console warnings for development
- Performance monitoring

## Code Organization

```
packages/
├── core/
│   ├── Renderer.ts           # Main renderer
│   ├── Element.ts           # Base element class
│   ├── Group.ts             # Container element
│   ├── Storage.ts           # Element storage
│   ├── Handler.ts           # Event handler
│   ├── shape/               # Graphic elements
│   ├── painter/             # Rendering
│   ├── animation/           # Animation system
│   ├── i18n/                # Localization
│   ├── theme/               # Theme management
│   ├── mixin/               # Mixins (Eventful)
│   └── util/                # Utilities
└── charts/
    ├── Chart.ts             # Base chart
    ├── chart/               # Chart implementations
    ├── react/               # React component
    └── util/                # Utilities
```

## Best Practices

1. **Use Dirty Flags** - Mark elements for redraw instead of full refresh
2. **Batch Updates** - Group multiple changes in single frame
3. **Event Delegation** - Use group event handlers instead of individual
4. **Memory Management** - Use object pools for frequently created objects
5. **Performance Monitoring** - Profile rendering performance
6. **Error Handling** - Handle rendering errors gracefully

## Future Improvements

1. **WebGL Rendering** - High-performance 3D rendering
2. **Virtual Scrolling** - Handle very large datasets
3. **Caching** - Render to texture for complex scenes
4. **Progressive Rendering** - Render important elements first
5. **Clustering** - Group nearby elements
