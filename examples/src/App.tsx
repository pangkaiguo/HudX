import React, { useState, lazy, Suspense, useMemo, memo } from 'react';

// Lazy load components for better performance
// Root examples
const AnimationExample = lazy(() => import('./examples/AnimationExample'));
const InteractionExample = lazy(() => import('./examples/InteractionExample'));
const PerformanceExample = lazy(() => import('./examples/PerformanceExample'));
const ShapeExample = lazy(() => import('./examples/ShapeExample'));
const ThemeExample = lazy(() => import('./examples/ThemeExample'));

// Bar charts
const AdvancedBarChartExample = lazy(() => import('./examples/bar/AdvancedBarExample'));
const BasicBarExample = lazy(() => import('./examples/bar/BasicBarExample'));
const StackBarExample = lazy(() => import('./examples/bar/StackBarExample'));
const StackHorizontalBarExample = lazy(() => import('./examples/bar/StackHorizontalBarExample'));
const Bar3DExample = lazy(() => import('./examples/bar/Bar3DExample'));
const StackBar3DExample = lazy(() => import('./examples/bar/StackBar3DExample'));

// Line charts
const AdvancedLineChartExample = lazy(() => import('./examples/line/AdvancedLineExample'));
const BasicLineExample = lazy(() => import('./examples/line/BasicLineExample'));

// Pie charts
const AdvancedDoughnutExample = lazy(() => import('./examples/pie/AdvancedDoughnutExample'));
const AdvancedPieChartExample = lazy(() => import('./examples/pie/AdvancedPieExample'));
const BasicPieExample = lazy(() => import('./examples/pie/BasicPieExample'));
const DoughnutExample = lazy(() => import('./examples/pie/DoughnutExample'));
const HalfDoughnutExample = lazy(() => import('./examples/pie/HalfDoughnutExample'));
const RichTextPieExample = lazy(() => import('./examples/pie/RichTextPieExample'));

// Scatter charts
const ScatterChartExample = lazy(() => import('./examples/scatter/ScatterChartExample'));

// Axis charts
const AxisLabelExample = lazy(() => import('./examples/axis/AxisLabelExample'));

const chartExamples = [
  {
    category: 'Axis',
    items: [
      { id: 'axis-label', name: 'Axis Label', component: AxisLabelExample },
    ]
  },
  {
    category: 'Line Charts',
    items: [
      { id: 'basic-line', name: 'Basic Line', component: BasicLineExample },
      { id: 'advanced-line', name: 'Advanced Line', component: AdvancedLineChartExample },
    ]
  },
  {
    category: 'Bar Charts',
    items: [
      { id: 'basic-bar', name: 'Basic Bar', component: BasicBarExample },
      { id: 'stack-bar', name: 'Stack Bar', component: StackBarExample },
      { id: 'stack-horizontal-bar', name: 'Stack Horizontal Bar', component: StackHorizontalBarExample },
      { id: 'advanced-bar', name: 'Advanced Bar', component: AdvancedBarChartExample },
      { id: 'bar-3d', name: 'Bar 3D', component: Bar3DExample },
      { id: 'stack-bar-3d', name: 'Stack Bar 3D', component: StackBar3DExample },
    ]
  },
  {
    category: 'Pie Charts',
    items: [
      { id: 'basic-pie', name: 'Basic Pie', component: BasicPieExample },
      { id: 'rich-text-pie', name: 'Rich Text Pie', component: RichTextPieExample },
      { id: 'advanced-pie', name: 'Advanced Pie', component: AdvancedPieChartExample },
      { id: 'doughnut', name: 'Doughnut', component: DoughnutExample },
      { id: 'advanced-doughnut', name: 'Advanced Doughnut', component: AdvancedDoughnutExample },
      { id: 'half-doughnut', name: 'Half Doughnut', component: HalfDoughnutExample },
    ]
  },
  {
    category: 'Scatter Charts',
    items: [
      { id: 'scatter-chart', name: 'Scatter Chart', component: ScatterChartExample },
    ]
  }
];

const featureExamples = [
  { id: 'shape', name: 'Shape', component: ShapeExample },
  { id: 'themes', name: 'Theme', component: ThemeExample },
  { id: 'interaction', name: 'Interaction', component: InteractionExample },
  { id: 'animation', name: 'Animation', component: AnimationExample },
  { id: 'performance', name: 'Performance', component: PerformanceExample }
];

const allExamples = [
  ...chartExamples.flatMap(c => c.items),
  ...featureExamples
];

const NavButton = ({ example, activeExample, setActiveExample }: { example: any, activeExample: string, setActiveExample: (id: string) => void }) => (
  <button
    onClick={() => setActiveExample(example.id)}
    aria-label={`View ${example.name} example`}
    aria-current={activeExample === example.id ? 'page' : undefined}
    style={{
      display: 'block',
      width: '100%',
      padding: '8px 12px',
      marginBottom: 4,
      border: '2px solid transparent',
      borderRadius: 6,
      backgroundColor: activeExample === example.id ? '#5470c6' : 'transparent',
      color: activeExample === example.id ? '#fff' : '#333',
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: 13,
      fontWeight: activeExample === example.id ? 600 : 400,
      transition: 'all 0.2s',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      if (activeExample !== example.id) {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
      }
    }}
    onMouseLeave={(e) => {
      if (activeExample !== example.id) {
        e.currentTarget.style.backgroundColor = 'transparent';
      }
    }}
    onFocus={(e) => {
      e.currentTarget.style.borderColor = '#5470c6';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(84, 112, 198, 0.2)';
    }}
    onBlur={(e) => {
      e.currentTarget.style.borderColor = 'transparent';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {example.name}
  </button>
);

const App = memo(function App() {
  const [activeExample, setActiveExample] = useState('basic-line');

  const ActiveComponent = useMemo(
    () => allExamples.find(e => e.id === activeExample)?.component || AdvancedPieChartExample,
    [activeExample]
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav
        aria-label="Examples navigation"
        style={{
          width: 280,
          borderRight: '1px solid #e0e0e0',
          padding: 20,
          overflowY: 'auto',
          backgroundColor: '#f5f5f5'
        }}
      >
        <h1 style={{ fontSize: 20, marginBottom: 10, color: '#333' }}>HudX Examples</h1>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>Interactive Charts & Animations</p>

        {chartExamples.map(category => (
          <React.Fragment key={category.category}>
            <h2 style={{ fontSize: 14, fontWeight: 'bold', margin: '20px 0 10px', color: '#666' }}>{category.category}</h2>
            {category.items.map(example => (
              <NavButton
                key={example.id}
                example={example}
                activeExample={activeExample}
                setActiveExample={setActiveExample}
              />
            ))}
          </React.Fragment>
        ))}

        <h2 style={{ fontSize: 14, fontWeight: 'bold', margin: '20px 0 10px', color: '#666' }}>Feature Demos</h2>
        {featureExamples.map(example => (
          <NavButton
            key={example.id}
            example={example}
            activeExample={activeExample}
            setActiveExample={setActiveExample}
          />
        ))}
      </nav>
      <main
        role="main"
        aria-label="Example content"
        style={{ flex: 1, padding: 40, overflowY: 'auto', backgroundColor: '#fff' }}
      >
        <Suspense fallback={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            color: '#999',
            fontSize: '16px',
            willChange: 'contents'
          }}>
            Loading...
          </div>
        }>
          <div style={{ contain: 'layout style paint' }}>
            <ActiveComponent />
          </div>
        </Suspense>
      </main>
    </div>
  );
});

export default App;
