# HudX 使用示例

## 基础示例

### 1. 折线图

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function LineChartExample() {
  const option = {
    title: {
      text: '折线图示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
      lineStyle: {
        color: '#5470c6',
        width: 2
      },
      itemStyle: {
        color: '#5470c6'
      }
    }]
  };

  return (
    <HudXChart
      option={option}
      width={800}
      height={400}
    />
  );
}
```

### 2. 柱状图

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function BarChartExample() {
  const option = {
    title: {
      text: '柱状图示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: {
        color: '#91cc75'
      }
    }]
  };

  return (
    <HudXChart
      option={option}
      width={800}
      height={400}
    />
  );
}
```

### 3. 饼图

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function PieChartExample() {
  const option = {
    title: {
      text: '饼图示例'
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'A', value: 335 },
        { name: 'B', value: 310 },
        { name: 'C', value: 234 },
        { name: 'D', value: 135 },
        { name: 'E', value: 154 }
      ],
      label: {
        show: true,
        formatter: (params: any) => `${params.name}: ${params.percent}%`
      }
    }]
  };

  return (
    <HudXChart
      option={option}
      width={600}
      height={400}
    />
  );
}
```

### 4. 散点图

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function ScatterChartExample() {
  const option = {
    title: {
      text: '散点图示例'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'scatter',
      data: [
        { name: 10, value: 20 },
        { name: 20, value: 30 },
        { name: 30, value: 40 },
        { name: 40, value: 50 },
        { name: 50, value: 60 }
      ],
      itemStyle: {
        color: '#ee6666',
        opacity: 0.8
      }
    }]
  };

  return (
    <HudXChart
      option={option}
      width={800}
      height={400}
    />
  );
}
```

## 高级示例

### 多系列图表

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function MultiSeriesExample() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        name: '系列1',
        data: [120, 200, 150, 80, 70, 110, 130]
      },
      {
        type: 'bar',
        name: '系列2',
        data: [80, 120, 100, 60, 50, 90, 110]
      }
    ]
  };

  return (
    <HudXChart
      option={option}
      width={800}
      height={400}
    />
  );
}
```

### 事件处理

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function EventExample() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    }]
  };

  return (
    <HudXChart
      option={option}
      width={800}
      height={400}
      onEvents={{
        click: (event) => {
          console.log('图表被点击:', event);
        },
        mousemove: (event) => {
          console.log('鼠标移动:', event);
        }
      }}
    />
  );
}
```

### 动态更新

```tsx
import React, { useState, useEffect } from 'react';
import { HudXChart } from '@hudx/charts';

function DynamicUpdateExample() {
  const [data, setData] = useState([120, 200, 150, 80, 70, 110, 130]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(v => v + Math.random() * 20 - 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      data
    }]
  };

  return (
    <HudXChart
      option={option}
      width={800}
      height={400}
      lazyUpdate={true}
    />
  );
}
```

## 直接使用核心 API

### 创建自定义图形

```typescript
import { Renderer, Circle, Rect, Group } from '@hudx/core';

// 初始化
const renderer = Renderer.init('#container');

// 创建组
const group = new Group();

// 创建圆形
const circle = new Circle({
  shape: {
    cx: 100,
    cy: 100,
    r: 50
  },
  style: {
    fill: '#ff0000',
    stroke: '#000000',
    lineWidth: 2
  }
});

// 创建矩形
const rect = new Rect({
  shape: {
    x: 200,
    y: 200,
    width: 100,
    height: 100
  },
  style: {
    fill: '#00ff00'
  }
});

// 添加到组
group.add(circle);
group.add(rect);

// 添加到渲染引擎
renderer.add(group);
```

### 动画示例

```typescript
import { Renderer, Circle, Animation, Easing } from '@hudx/core';

const renderer = Renderer.init('#container');

const circle = new Circle({
  shape: {
    cx: 50,
    cy: 50,
    r: 20
  },
  style: {
    fill: '#5470c6'
  }
});

renderer.add(circle);

// 创建动画
const animation = new Animation(
  circle.shape,
  'cx',
  200, // 目标值
  1000, // 持续时间
  0, // 延迟
  Easing.cubicOut, // 缓动函数
  () => {
    circle.markRedraw();
    renderer.refresh();
  },
  () => {
    console.log('动画完成');
  }
);

animation.start();
```

### 事件处理

```typescript
import { Renderer, Circle } from '@hudx/core';

const renderer = Renderer.init('#container');

const circle = new Circle({
  shape: {
    cx: 100,
    cy: 100,
    r: 50
  },
  style: {
    fill: '#5470c6'
  }
});

// 监听点击事件
circle.on('click', (event) => {
  console.log('圆形被点击:', event);
  circle.attr('style', {
    fill: '#ff0000'
  });
  zr.refresh();
});

// 监听鼠标悬停
circle.on('mouseover', (event) => {
  circle.attr('style', {
    fill: '#91cc75'
  });
  renderer.refresh();
});

circle.on('mouseout', (event) => {
  circle.attr('style', {
    fill: '#5470c6'
  });
  renderer.refresh();
});

renderer.add(circle);
```

### 使用对象池

```typescript
import { Renderer, Circle, ObjectPool } from '@hudx/core';

const renderer = Renderer.init('#container');

// 创建对象池
const pool = new ObjectPool(
  () => new Circle({
    shape: { cx: 0, cy: 0, r: 10 },
    style: { fill: '#5470c6' }
  }),
  (circle) => {
    circle.attr('shape', { cx: 0, cy: 0, r: 10 });
  }
);

// 使用对象池创建元素
for (let i = 0; i < 100; i++) {
  const circle = pool.acquire();
  circle.attr('shape', {
    cx: Math.random() * 800,
    cy: Math.random() * 400,
    r: 10
  });
  renderer.add(circle);
  
  // 使用后归还（示例）
  // pool.release(circle);
}
```

## 性能优化示例

### 批量更新

```typescript
import { Renderer, BatchUpdater, Circle } from '@hudx/core';

const renderer = Renderer.init('#container');
const updater = new BatchUpdater();

// 批量更新多个元素
for (let i = 0; i < 1000; i++) {
  updater.schedule(() => {
    const circle = new Circle({
      shape: {
        cx: Math.random() * 800,
        cy: Math.random() * 400,
        r: 5
      },
      style: {
        fill: '#5470c6'
      }
    });
    renderer.add(circle);
  });
}

// 所有更新会在下一帧批量执行
```

### 延迟更新

```tsx
import React from 'react';
import { HudXChart } from '@hudx/charts';

function LazyUpdateExample() {
  const [option, setOption] = useState({...});

  // 使用 lazyUpdate 延迟更新
  return (
    <HudXChart
      option={option}
      lazyUpdate={true}
      width={800}
      height={400}
    />
  );
}
```

## 自定义图表

### 扩展 Chart 类

```typescript
import Chart from '@hudx/charts/Chart';
import { ChartOption } from '@hudx/charts/types';
import { Rect, Text } from '@hudx/core';

export default class CustomChart extends Chart {
  protected _render(): void {
    super._render();

    const option = this._option;
    const data = option.series?.[0]?.data || [];

    // 自定义渲染逻辑
    data.forEach((item, index) => {
      const rect = new Rect({
        shape: {
          x: index * 50,
          y: 100,
          width: 40,
          height: item.value
        },
        style: {
          fill: '#5470c6'
        }
      });

      this._root.add(rect);
    });

    this._renderer.refresh();
  }
}
```

## 总结

这些示例展示了 HudX 的各种使用方式：

1. **基础图表**: 使用 React 组件快速创建图表
2. **核心 API**: 直接使用核心渲染引擎创建自定义图形
3. **动画**: 使用动画系统创建流畅的交互效果
4. **事件**: 处理用户交互事件
5. **性能优化**: 使用对象池和批量更新提升性能
6. **扩展**: 创建自定义图表类型

更多详细信息请参考 [README.md](../README.md) 和 [IMPLEMENTATION.md](./IMPLEMENTATION.md)。

