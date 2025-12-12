import React, { useState, lazy, Suspense, useMemo, memo } from 'react';

// Lazy load components for better performance
const BasicLine = lazy(() => import('./examples/BasicLine'));
const BasicBar = lazy(() => import('./examples/BasicBar'));
const BasicPie = lazy(() => import('./examples/BasicPie'));
const LineWithTooltip = lazy(() => import('./examples/LineWithTooltip'));
const BarWithLegend = lazy(() => import('./examples/BarWithLegend'));
const PieWithLegend = lazy(() => import('./examples/PieWithLegend'));
const PerformanceTest = lazy(() => import('./examples/PerformanceTest'));
const ThemeSwitch = lazy(() => import('./examples/ThemeSwitch'));
const CoreAPI = lazy(() => import('./examples/CoreAPI'));
const Animation = lazy(() => import('./examples/Animation'));
const Interaction = lazy(() => import('./examples/Interaction'));
const AdvancedLineChart = lazy(() => import('./examples/AdvancedLineChart'));
const AdvancedBarChart = lazy(() => import('./examples/AdvancedBarChart'));
const AdvancedPieChart = lazy(() => import('./examples/AdvancedPieChart'));
const InteractiveDashboard = lazy(() => import('./examples/InteractiveDashboard'));
const FullFeatureDemo = lazy(() => import('./examples/FullFeatureDemo'));

const examples = [
  { id: 'full-feature', name: '🚀 Full Feature Demo', component: FullFeatureDemo },
  { id: 'dashboard', name: '📊 Interactive Dashboard', component: InteractiveDashboard },
  { id: 'advanced-line', name: '✨ Advanced Line Chart', component: AdvancedLineChart },
  { id: 'advanced-bar', name: '✨ Advanced Bar Chart', component: AdvancedBarChart },
  { id: 'advanced-pie', name: '✨ Advanced Pie Chart', component: AdvancedPieChart },
  { id: 'basic-line', name: 'Basic Line Chart', component: BasicLine },
  { id: 'basic-bar', name: 'Basic Bar Chart', component: BasicBar },
  { id: 'basic-pie', name: 'Basic Pie Chart', component: BasicPie },
  { id: 'line-tooltip', name: 'Line + Tooltip', component: LineWithTooltip },
  { id: 'bar-legend', name: 'Bar + Legend', component: BarWithLegend },
  { id: 'pie-legend', name: 'Pie + Legend', component: PieWithLegend },
  { id: 'theme-switch', name: 'Theme Switch', component: ThemeSwitch },
  { id: 'core-api', name: 'Core API', component: CoreAPI },
  { id: 'animation', name: 'Animation', component: Animation },
  { id: 'interaction', name: 'Interaction', component: Interaction },
  { id: 'performance', name: 'Performance Test', component: PerformanceTest }
];

const App = memo(function App() {
  const [activeExample, setActiveExample] = useState('basic-line');

  const ActiveComponent = useMemo(
    () => examples.find(e => e.id === activeExample)?.component || BasicLine,
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
        {examples.map(example => (
          <button
            key={example.id}
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
