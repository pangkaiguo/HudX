# HudX Interactive Features

## Overview

HudX provides a rich set of interactive features including animations, tooltips, legends, and advanced event handling, designed to match ECharts' capabilities.

## 1. Emphasis & Hover Effects

HudX supports high-performance hover effects with configurable animations.

### Scale Animation (`emphasis.scale`)

You can enable scale animation on hover for charts (e.g., Pie, Bar).

```typescript
series: [{
  type: 'pie',
  data: [...],
  emphasis: {
    scale: true,
    scaleSize: 1.1, // Scale up to 110%
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.5)'
    }
  }
}]
```

### Style Transition

Color and opacity transitions are automatically handled using `lerp` (linear interpolation) for smooth visual feedback.

## 2. Event System

### EventHelper

The `EventHelper` utility simplifies binding hover interactions while handling cleanups.

```typescript
import { EventHelper } from "../util/EventHelper";

EventHelper.bindHoverEvents(
  element,
  (evt) => {
    // onMouseOver: animate scale up, show tooltip
  },
  (evt) => {
    // onMouseOut: animate scale down, hide tooltip
  },
);
```

### Supported Events

- `click`, `dblclick`
- `mousedown`, `mousemove`, `mouseup`
- `mouseover`, `mouseout`
- `touchstart`, `touchmove`, `touchend`
- `drag`, `dragend`

## 3. Animation System

The render animation engine (`Animator`) supports complex transitions.

```typescript
import { Animation, Easing } from "hudx-render";

const anim = new Animation(target, "x", 100, 500, 0, Easing.cubicOut);
anim.start();
```

## 4. Components

### Tooltip

Configurable tooltip with HTML content support.

```typescript
tooltip: {
  show: true,
  formatter: '{b}: {c} ({d}%)'
}
```

### Legend

Interactive legend for toggling series visibility.

```typescript
legend: {
  data: ['A', 'B'],
  orient: 'horizontal',
  bottom: 0
}
```
