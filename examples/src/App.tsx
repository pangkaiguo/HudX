import React, { useState, lazy, Suspense, useMemo, memo } from 'react';

// Lazy load components for better performance
const ShapeExample = lazy(() => import('./examples/ShapeExample'));
const ThemeExample = lazy(() => import('./examples/ThemeExample'));
const InteractionExample = lazy(() => import('./examples/InteractionExample'));
const AnimationExample = lazy(() => import('./examples/AnimationExample'));
const BasicLineExample = lazy(() => import('./examples/BasicLineExample'));
const BasicBarExample = lazy(() => import('./examples/BasicBarExample'));
const BasicPieExample = lazy(() => import('./examples/BasicPieExample'));
const AdvancedLineChartExample = lazy(() => import('./examples/AdvancedLineExample'));
const AdvancedBarChartExample = lazy(() => import('./examples/AdvancedBarExample'));
const AdvancedPieChartExample = lazy(() => import('./examples/AdvancedPieExample'));
const Bar3DExample = lazy(() => import('./examples/Bar3DExample'));
const StackBar3DExample = lazy(() => import('./examples/StackBar3DExample'));
const DoughnutExample = lazy(() => import('./examples/DoughnutExample'));
const HalfDoughnutExample = lazy(() => import('./examples/HalfDoughnutExample'));
const RichTextPieExample = lazy(() => import('./examples/RichTextPieExample'));
const PerformanceExample = lazy(() => import('./examples/PerformanceExample'));

const componentDemos = [
  { id: 'basic-line', name: 'Basic Line', component: BasicLineExample },
  { id: 'basic-bar', name: 'Basic Bar', component: BasicBarExample },
  { id: 'basic-pie', name: 'Basic Pie', component: BasicPieExample },
  { id: 'rich-text-pie', name: 'Rich Text Pie', component: RichTextPieExample },
  { id: 'advanced-line', name: 'Advanced Line', component: AdvancedLineChartExample },
  { id: 'advanced-bar', name: 'Advanced Bar', component: AdvancedBarChartExample },
  { id: 'advanced-pie', name: 'Advanced Pie', component: AdvancedPieChartExample },
  { id: 'bar-3d', name: 'Bar 3D', component: Bar3DExample },
  { id: 'stack-bar-3d', name: 'Stack Bar 3D', component: StackBar3DExample },
  { id: 'doughnut', name: 'Doughnut', component: DoughnutExample },
  { id: 'half-doughnut', name: 'Half Doughnut', component: HalfDoughnutExample },
];

const testDemos = [
  { id: 'shape', name: 'Shape', component: ShapeExample },
  { id: 'themes', name: 'Theme', component: ThemeExample },
  { id: 'interaction', name: 'Interaction', component: InteractionExample },
  { id: 'animation', name: 'Animation', component: AnimationExample },
  { id: 'performance', name: 'Performance', component: PerformanceExample }
];

const allExamples = [...componentDemos, ...testDemos];

const NavButton = ({ example, activeExample, setActiveExample }: { example: any, activeExample: string, setActiveExample: (id: string) => void }) => (
  <button
    onClick={() => setActiveExample(example.id)}
    aria-label={`View ${example.name} example`}
    aria-current={activeExample === example.id ? 'page' : undefined}
    style={{
      display: 'block',
      width: '100%',
      padding: '10px 12px',
      marginBottom: 6,
      border: '2px solid transparent',
      borderRadius: 6,
      backgroundColor: activeExample === example.id ? '#5470c6' : '#fff',
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
        e.currentTarget.style.backgroundColor = '#e8eaf6';
      }
    }}
    onMouseLeave={(e) => {
      if (activeExample !== example.id) {
        e.currentTarget.style.backgroundColor = '#fff';
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

        <h2 style={{ fontSize: 14, fontWeight: 'bold', margin: '20px 0 10px', color: '#666' }}>Component Demos</h2>
        {componentDemos.map(example => (
          <NavButton
            key={example.id}
            example={example}
            activeExample={activeExample}
            setActiveExample={setActiveExample}
          />
        ))}

        <h2 style={{ fontSize: 14, fontWeight: 'bold', margin: '20px 0 10px', color: '#666' }}>Test Demos</h2>
        {testDemos.map(example => (
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
