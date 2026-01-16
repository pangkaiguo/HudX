# HudX Usage Examples

## Basic Examples

### 1. Line Chart

```tsx
import React from "react";
import { HChart } from "hux-charts";

function LineChartExample() {
  const option = {
    title: {
      text: "Line Chart Example",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: [120, 200, 150, 80, 70, 110, 130],
        lineStyle: {
          color: "#5470c6",
          width: 2,
        },
        itemStyle: {
          color: "#5470c6",
        },
      },
    ],
  };

  return <HChart option={option} width={800} height={400} />;
}
```

### 2. Bar Chart

```tsx
import React from "react";
import { HChart } from "hux-charts";

function BarChartExample() {
  const option = {
    title: {
      text: "Bar Chart Example",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: "#91cc75",
        },
      },
    ],
  };

  return <HChart option={option} width={800} height={400} />;
}
```

### 3. Pie Chart

```tsx
import React from "react";
import { HChart } from "hux-charts";

function PieChartExample() {
  const option = {
    title: {
      text: "Pie Chart Example",
    },
    series: [
      {
        type: "pie",
        data: [
          { name: "A", value: 335 },
          { name: "B", value: 310 },
          { name: "C", value: 234 },
          { name: "D", value: 135 },
          { name: "E", value: 154 },
        ],
        label: {
          show: true,
          formatter: (params: any) => `${params.name}: ${params.percent}%`,
        },
      },
    ],
  };

  return <HChart option={option} width={600} height={400} />;
}
```

### 4. Scatter Chart

```tsx
import React from "react";
import { HChart } from "hux-charts";

function ScatterChartExample() {
  const option = {
    title: {
      text: "Scatter Chart Example",
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "scatter",
        data: [
          { name: 10, value: 20 },
          { name: 20, value: 30 },
          { name: 30, value: 40 },
          { name: 40, value: 50 },
          { name: 50, value: 60 },
        ],
        itemStyle: {
          color: "#ee6666",
          opacity: 0.8,
        },
      },
    ],
  };

  return <HChart option={option} width={800} height={400} />;
}
```

## Advanced Examples

### Multi-Series Chart

```tsx
import React from "react";
import { HChart } from "hux-charts";

function MultiSeriesExample() {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        name: "Series 1",
        data: [120, 200, 150, 80, 70, 110, 130],
      },
      {
        type: "bar",
        name: "Series 2",
        data: [80, 120, 100, 60, 50, 90, 110],
      },
    ],
  };

  return <HChart option={option} width={800} height={400} />;
}
```

### Theme and Locale Configuration

```tsx
import React from "react";
import { HChart } from "hux-charts";

function ConfigurationExample() {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  };

  return (
    <HChart
      option={option}
      width={800}
      height={400}
      renderMode="canvas"
      theme="dark"
      locale="en"
      onEvents={{
        click: (event) => {
          console.log("Element clicked:", event);
        },
      }}
    />
  );
}
```

### Using Core API

```typescript
import { Renderer, Circle, Rect, Group } from "hux-core";

// Initialize renderer
const renderer = Renderer.init("#container", "canvas", "light", "en");

// Create a group
const group = new Group({
  id: "my-group",
});

// Add circle
const circle = new Circle({
  id: "circle1",
  shape: {
    cx: 100,
    cy: 100,
    r: 50,
  },
  style: {
    fill: "#ff0000",
    stroke: "#000000",
    lineWidth: 2,
  },
});

// Add rectangle
const rect = new Rect({
  id: "rect1",
  shape: {
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    r: [5, 5, 0, 0], // rounded corners
  },
  style: {
    fill: "#00ff00",
    stroke: "#0000ff",
    lineWidth: 1,
  },
});

// Add elements to group
group.add(circle);
group.add(rect);

// Add group to renderer
renderer.add(group);

// Event handling
circle.on("click", (event) => {
  console.log("Circle clicked!");
  circle.attr("style", { fill: "#ffff00" });
  renderer.refresh();
});

// Animation
circle.animate("shape", { r: 100 }, 500);
```

### Rendering Mode Switching

```tsx
import React, { useState } from "react";
import { HChart } from "hux-charts";

function RenderingModeExample() {
  const [renderMode, setRenderMode] = useState<"canvas" | "svg">("canvas");

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  };

  return (
    <div>
      <div>
        <button onClick={() => setRenderMode("canvas")}>Canvas Mode</button>
        <button onClick={() => setRenderMode("svg")}>SVG Mode</button>
      </div>
      <HChart
        option={option}
        width={800}
        height={400}
        renderMode={renderMode}
      />
    </div>
  );
}
```

## Tips

1. **Performance**: Use Canvas mode for large datasets
2. **Export**: Use SVG mode for exporting to vector formats
3. **Styling**: Use CSS-in-JS for dynamic styling
4. **Responsive**: Wrap components in responsive containers
5. **Theme**: Switch themes dynamically based on user preference
6. **Locale**: Support multiple languages for global users
