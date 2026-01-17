import React, { useState, lazy, Suspense, useMemo, memo } from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption } from 'hudx-charts';
import { Theme } from 'hudx-render';
import { Sidebar } from './components/Sidebar';
import { Codebox } from './components/Codebox';
import { examples, Example } from './data/examples';

// Lazy load components for better performance
// Root examples
const AnimationExample = lazy(() => import('./examples/AnimationExample'));
const InteractionExample = lazy(() => import('./examples/InteractionExample'));
const PerformanceExample = lazy(() => import('./examples/PerformanceExample'));
const ShapeExample = lazy(() => import('./examples/ShapeExample'));
const ThemeExample = lazy(() => import('./examples/ThemeExample'));

// Bar charts
const GroupBarChartExample = lazy(
  () => import('./examples/bar/GroupBarExample'),
);
const BasicBarExample = lazy(() => import('./examples/bar/BasicBarExample'));
const StackBarExample = lazy(() => import('./examples/bar/StackBarExample'));
const StackHorizontalBarExample = lazy(
  () => import('./examples/bar/StackHorizontalBarExample'),
);
const Bar3DExample = lazy(() => import('./examples/bar/Bar3DExample'));
const StackBar3DExample = lazy(
  () => import('./examples/bar/StackBar3DExample'),
);

// Line charts
const StackLineChartExample = lazy(
  () => import('./examples/line/StackLineExample'),
);
const BasicLineExample = lazy(() => import('./examples/line/BasicLineExample'));
const AreaLineChartExample = lazy(
  () => import('./examples/line/AreaLineChartExample'),
);

// Pie charts
const AdvancedDoughnutExample = lazy(
  () => import('./examples/pie/AdvancedDoughnutExample'),
);
const AdvancedPieChartExample = lazy(
  () => import('./examples/pie/AdvancedPieExample'),
);
const BasicPieExample = lazy(() => import('./examples/pie/BasicPieExample'));
const DoughnutExample = lazy(() => import('./examples/pie/DoughnutExample'));
const HalfDoughnutExample = lazy(
  () => import('./examples/pie/HalfDoughnutExample'),
);
const RichTextPieExample = lazy(
  () => import('./examples/pie/RichTextPieExample'),
);

// Scatter charts
const ScatterChartExample = lazy(
  () => import('./examples/scatter/ScatterChartExample'),
);

// Axis charts
const AxisLabelExample = lazy(() => import('./examples/axis/AxisLabelExample'));

// New Examples
const TitleExample = lazy(() => import('./examples/TitleExample'));
const LegendExample = lazy(() => import('./examples/LegendExample'));
const TooltipExample = lazy(() => import('./examples/TooltipExample'));

// Bundle examples
const BundleExample = lazy(() => import('./examples/bundle/BundleExample'));
const BundleBarExample = lazy(() => import('./examples/bundle/BundleBarExample'));
const BundleLineExample = lazy(() => import('./examples/bundle/BundleLineExample'));
const BundlePieExample = lazy(() => import('./examples/bundle/BundlePieExample'));

const chartExamples = [
  {
    category: 'Line Charts',
    items: [
      { id: 'basic-line', name: 'Basic Line', component: BasicLineExample },
      {
        id: 'stack-line',
        name: 'Stack Line',
        component: StackLineChartExample,
      },
      { id: 'area-line', name: 'Area Line', component: AreaLineChartExample },
    ],
  },
  {
    category: 'Bar Charts',
    items: [
      { id: 'basic-bar', name: 'Basic Bar', component: BasicBarExample },
      { id: 'stack-bar', name: 'Stack Bar', component: StackBarExample },
      {
        id: 'stack-horizontal-bar',
        name: 'Stack Horizontal Bar',
        component: StackHorizontalBarExample,
      },
      {
        id: 'group-bar',
        name: 'Group Bar',
        component: GroupBarChartExample,
      },
      { id: 'bar-3d', name: 'Bar 3D', component: Bar3DExample },
      {
        id: 'stack-bar-3d',
        name: 'Stack Bar 3D',
        component: StackBar3DExample,
      },
    ],
  },
  {
    category: 'Pie Charts',
    items: [
      { id: 'basic-pie', name: 'Basic Pie', component: BasicPieExample },
      {
        id: 'rich-text-pie',
        name: 'Rich Text Pie',
        component: RichTextPieExample,
      },
      {
        id: 'advanced-pie',
        name: 'Advanced Pie',
        component: AdvancedPieChartExample,
      },
      { id: 'doughnut', name: 'Doughnut', component: DoughnutExample },
      {
        id: 'advanced-doughnut',
        name: 'Advanced Doughnut',
        component: AdvancedDoughnutExample,
      },
      {
        id: 'half-doughnut',
        name: 'Half Doughnut',
        component: HalfDoughnutExample,
      },
    ],
  },
  {
    category: 'Scatter Charts',
    items: [
      {
        id: 'scatter-chart',
        name: 'Scatter Chart',
        component: ScatterChartExample,
      },
    ],
  },
  {
    category: 'Sub Components',
    items: [
      { id: 'axis-label', name: 'Axis Label', component: AxisLabelExample },
      { id: 'title-example', name: 'Title', component: TitleExample },
      { id: 'legend-example', name: 'Legend', component: LegendExample },
      { id: 'tooltip-example', name: 'Tooltip', component: TooltipExample },
    ],
  },
  {
    category: 'Bundle',
    items: [
      { id: 'bundle-test', name: 'Unified Bundle', component: BundleExample },
      { id: 'bundle-bar', name: 'BarChart Import', component: BundleBarExample },
      { id: 'bundle-line', name: 'LineChart Import', component: BundleLineExample },
      { id: 'bundle-pie', name: 'PieChart Import', component: BundlePieExample },
    ],
  },
];

const featureExamples = [
  { id: 'shape', name: 'Shape', component: ShapeExample },
  { id: 'themes', name: 'Theme', component: ThemeExample },
  { id: 'interaction', name: 'Interaction', component: InteractionExample },
  { id: 'animation', name: 'Animation', component: AnimationExample },
  { id: 'performance', name: 'Performance', component: PerformanceExample },
];

const allExamples: any[] = [
  ...chartExamples.flatMap((c: any) => c.items),
  ...featureExamples,
];

const NavButton = ({
  example,
  activeExample,
  setActiveExample,
}: {
  example: any;
  activeExample: string;
  setActiveExample: (id: string) => void;
}) => (
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
      outline: 'none',
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

const categories = [
  { key: 'line', label: 'Line' },
  { key: 'bar', label: 'Bar' },
  { key: 'pie', label: 'Pie' },
  { key: 'scatter', label: 'Scatter' },
  { key: 'sub-components', label: 'Sub Components' },
  { key: 'bundle', label: 'Bundle' },
];

function parseOption(code: string): ChartOption {
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function(`
      let option;
      ${code}
      return option;
    `);
    return func() || {};
  } catch (e) {
    console.error('Failed to parse option', e);
    return {};
  }
}

const ChartCard = ({
  example,
  onClick,
}: {
  example: Example;
  onClick: () => void;
}) => {
  const option = useMemo(() => parseOption(example.code), [example.code]);

  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ height: 200, padding: 10, backgroundColor: '#f9f9f9' }}>
        <HChart
          option={option}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        />
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14 }}>
          {example.title}
        </div>
        <div style={{ color: '#999', fontSize: 12 }}>{example.subtitle}</div>
      </div>
    </div>
  );
};

const Dashboard = ({
  activeCategory,
  onSelectExample,
  theme,
  onThemeChange,
}: {
  activeCategory: string;
  onSelectExample: (id: string) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}) => {
  const categoryLabel =
    categories.find((c) => c.key === activeCategory)?.label || activeCategory;
  const filteredExamples = examples.filter(
    (e) => e.category === activeCategory,
  );

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#f5f7fa',
      }}
    >
      <div
        style={{
          padding: '20px 40px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 'normal' }}>
          {categoryLabel}
        </h2>
        <div
          style={{
            display: 'flex',
            border: '1px solid #e0e0e0',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => onThemeChange('light')}
            style={{
              padding: '4px 12px',
              background: theme === 'light' ? '#4096ff' : 'transparent',
              color: theme === 'light' ? '#fff' : '#333',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Light
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            style={{
              padding: '4px 12px',
              background: theme === 'dark' ? '#4096ff' : 'transparent',
              color: theme === 'dark' ? '#fff' : '#333',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Dark
          </button>
        </div>
      </div>
      <div style={{ padding: 40 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {filteredExamples.map((ex) => (
            <ChartCard
              key={ex.id}
              example={ex}
              onClick={() => onSelectExample(ex.id)}
            />
          ))}
          {filteredExamples.length === 0 && (
            <div style={{ color: '#999' }}>
              No examples yet for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OldApp = memo(function OldApp({
  theme,
  setTheme,
  setMode,
}: {
  theme: 'Light' | 'Dark';
  setTheme: (t: 'Light' | 'Dark') => void;
  setMode: (m: 'classic' | 'modern') => void;
}) {
  const [activeExample, setActiveExample] = useState('basic-line');

  const ActiveComponent = useMemo(
    () =>
      allExamples.find((e) => e.id === activeExample)?.component ||
      AdvancedPieChartExample,
    [activeExample],
  );

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: theme === 'Dark' ? '#1a1a1a' : '#fff',
      }}
    >
      <nav
        aria-label='Examples navigation'
        style={{
          width: 280,
          borderRight: `1px solid ${theme === 'Dark' ? '#333' : '#e0e0e0'}`,
          padding: 20,
          overflowY: 'auto',
          backgroundColor: theme === 'Dark' ? '#222' : '#f5f5f5',
          color: theme === 'Dark' ? '#eee' : '#333',
        }}
      >
        <h1
          style={{
            fontSize: 20,
            marginBottom: 10,
            color: theme === 'Dark' ? '#fff' : '#333',
          }}
        >
          HudX Charts
        </h1>
        <div
          style={{
            marginBottom: 20,
            padding: '10px 0',
            borderBottom: `1px solid ${theme === 'Dark' ? '#333' : '#e0e0e0'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 14,
              color: theme === 'Dark' ? '#eee' : '#333',
            }}
          >
            <div
              style={{
                display: 'flex',
                border: `1px solid ${theme === 'Dark' ? '#333' : '#e0e0e0'}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setMode('classic')}
                style={{
                  padding: '4px 12px',
                  background: '#4096ff',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Classic
              </button>
              <button
                onClick={() => setMode('modern')}
                style={{
                  padding: '4px 12px',
                  background: 'transparent',
                  color: theme === 'Dark' ? '#fff' : '#333',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Modern
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                border: `1px solid ${theme === 'Dark' ? '#333' : '#e0e0e0'}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setTheme('Light')}
                style={{
                  padding: '4px 12px',
                  background: theme === 'Light' ? '#4096ff' : 'transparent',
                  color:
                    theme === 'Light'
                      ? '#fff'
                      : theme === 'Dark'
                        ? '#fff'
                        : '#333',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('Dark')}
                style={{
                  padding: '4px 12px',
                  background: theme === 'Dark' ? '#4096ff' : 'transparent',
                  color: theme === 'Dark' ? '#fff' : '#333',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        {chartExamples.map((category) => (
          <React.Fragment key={category.category}>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                margin: '20px 0 10px',
                color: '#666',
              }}
            >
              {category.category}
            </h2>
            {category.items.map((example) => (
              <NavButton
                key={example.id}
                example={example}
                activeExample={activeExample}
                setActiveExample={setActiveExample}
              />
            ))}
          </React.Fragment>
        ))}

        <h2
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            margin: '20px 0 10px',
            color: '#666',
          }}
        >
          Feature Demos
        </h2>
        {featureExamples.map((example) => (
          <NavButton
            key={example.id}
            example={example}
            activeExample={activeExample}
            setActiveExample={setActiveExample}
          />
        ))}
      </nav>
      <main
        role='main'
        aria-label='Example content'
        style={{
          flex: 1,
          padding: 40,
          overflowY: 'auto',
          backgroundColor: theme === 'Dark' ? '#1a1a1a' : '#fff',
          color: theme === 'Dark' ? '#eee' : '#333',
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                color: '#999',
                fontSize: '16px',
                willChange: 'contents',
              }}
            >
              Loading...
            </div>
          }
        >
          <div style={{ contain: 'layout style paint' }}>
            <ActiveComponent theme={theme} />
          </div>
        </Suspense>
      </main>
    </div>
  );
});

const ModernApp = ({
  theme,
  setTheme,
  setMode,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  setMode: (m: 'classic' | 'modern') => void;
}) => {
  const [activeCategory, setActiveCategory] = useState('line');
  const [activeExampleId, setActiveExampleId] = useState<string | null>(null);

  const activeExample = useMemo(
    () => examples.find((e) => e.id === activeExampleId),
    [activeExampleId],
  );

  if (activeExampleId && activeExample) {
    return (
      <Codebox
        initialCode={activeExample.code}
        title={activeExample.title}
        onBack={() => setActiveExampleId(null)}
        theme={theme}
        onThemeChange={setTheme}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              border: '1px solid #e0e0e0',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setMode('classic')}
              style={{
                padding: '4px 12px',
                background: 'transparent',
                color: '#333',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Classic
            </button>
            <button
              onClick={() => setMode('modern')}
              style={{
                padding: '4px 12px',
                background: '#4096ff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Modern
            </button>
          </div>
        </div>
        <Dashboard
          activeCategory={activeCategory}
          onSelectExample={setActiveExampleId}
          theme={theme}
          onThemeChange={setTheme}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<'classic' | 'modern'>('classic');
  const [theme, setTheme] = useState<Theme>('light');

  // Sync theme string case for compatibility
  const normalizedTheme =
    typeof theme === 'string'
      ? theme.toLowerCase() === 'dark'
        ? 'Dark'
        : 'Light'
      : 'Light';
  const setNormalizedTheme = (t: 'Light' | 'Dark') =>
    setTheme(t.toLowerCase() as Theme);

  return mode === 'classic' ? (
    <OldApp
      theme={normalizedTheme}
      setTheme={setNormalizedTheme}
      setMode={setMode}
    />
  ) : (
    <ModernApp theme={theme} setTheme={setTheme} setMode={setMode} />
  );
}
