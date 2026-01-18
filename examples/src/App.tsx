import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  memo,
} from 'react';
import { HChart } from 'hudx-charts';
import type { ChartOption, HChartRef } from 'hudx-charts';
import { Theme, ThemeManager, toRgbaWithOpacity } from 'hudx-render';
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
// const Bar3DExample = lazy(() => import('./examples/bar/Bar3DExample'));
// const StackBar3DExample = lazy(
//   () => import('./examples/bar/StackBar3DExample'),
// );

// Line charts
const StackLineChartExample = lazy(
  () => import('./examples/line/StackLineExample'),
);
const BasicLineExample = lazy(() => import('./examples/line/BasicLineExample'));
const AreaLineChartExample = lazy(
  () => import('./examples/line/AreaLineChartExample'),
);
const SmoothLineExample = lazy(
  () => import('./examples/line/SmoothLineExample'),
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

// Scatter charts
const ScatterChartExample = lazy(
  () => import('./examples/scatter/ScatterChartExample'),
);

// Sub components
const AxisLabelExample = lazy(() => import('./examples/sub-components/AxisLabelExample'));
const TitleExample = lazy(() => import('./examples/sub-components/TitleExample'));
const LegendExample = lazy(() => import('./examples/sub-components/LegendExample'));
const TooltipExample = lazy(() => import('./examples/sub-components/TooltipExample'));
const RichTextExample = lazy(() => import('./examples/sub-components/RichTextExample'));

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
      { id: 'smooth-line', name: 'Smooth Line', component: SmoothLineExample },
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
      // { id: 'bar-3d', name: 'Bar 3D', component: Bar3DExample },
      // {
      //   id: 'stack-bar-3d',
      //   name: 'Stack Bar 3D',
      //   component: StackBar3DExample,
      // },
    ],
  },
  {
    category: 'Pie Charts',
    items: [
      { id: 'basic-pie', name: 'Basic Pie', component: BasicPieExample },
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
      { id: 'tooltip-example', name: 'Tooltip', component: TooltipExample }, {
        id: 'rich-text-example',
        name: 'Rich Text',
        component: RichTextExample,
      },
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
  theme,
}: {
  example: any;
  activeExample: string;
  setActiveExample: (id: string) => void;
  theme: Theme;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const hoverBg = ui.colorFillHover || ui.colorFillContainerAlt || themeObj.gridColor;
  const isActive = activeExample === example.id;

  return (
    <button
      onClick={() => setActiveExample(example.id)}
      aria-label={`View ${example.name} example`}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'block',
        width: '100%',
        padding: '8px 12px',
        marginBottom: 4,
        border: `2px solid ${isFocused ? String(primary) : 'transparent'}`,
        borderRadius: 6,
        backgroundColor: isActive ? primary : isHovered ? String(hoverBg) : 'transparent',
        color: isActive ? primaryText : themeObj.textColor,
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 13,
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.2s',
        outline: 'none',
        boxShadow: isFocused
          ? `0 0 0 3px ${toRgbaWithOpacity(String(primary), 0.2)}`
          : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {example.name}
    </button>
  );
};

const categories = [
  { key: 'line', label: 'Line' },
  { key: 'bar', label: 'Bar' },
  { key: 'pie', label: 'Pie' },
  { key: 'scatter', label: 'Scatter' },
  { key: 'sub-components', label: 'Sub Components' },
  { key: 'bundle', label: 'Bundle' },
];

function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initialValue;
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }, [key, value]);

  return [value, setValue] as const;
}

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

const SegmentedControl = ({
  leftLabel,
  rightLabel,
  value,
  leftValue,
  rightValue,
  onChange,
  theme,
}: {
  leftLabel: string;
  rightLabel: string;
  value: string;
  leftValue: string;
  rightValue: string;
  onChange: (next: string) => void;
  theme?: Theme;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;

  return (
    <div
      style={{
        display: 'flex',
        border: `1px solid ${border}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => onChange(leftValue)}
        style={{
          padding: '4px 12px',
          background: value === leftValue ? primary : 'transparent',
          color: value === leftValue ? primaryText : themeObj.textColor,
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => onChange(rightValue)}
        style={{
          padding: '4px 12px',
          background: value === rightValue ? primary : 'transparent',
          color: value === rightValue ? primaryText : themeObj.textColor,
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        {rightLabel}
      </button>
    </div>
  );
};

const ChartCard = ({
  example,
  onClick,
  theme,
}: {
  example: Example;
  onClick: () => void;
  theme: Theme;
}) => {
  const option = useMemo(() => parseOption(example.code), [example.code]);
  const previewOption = useMemo(
    () => ({
      ...option,
      animation: false,
      animationDuration: 0,
      animationDurationUpdate: 0,
    }),
    [option],
  );
  const chartRef = React.useRef<HChartRef>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const cardBg = ui.colorFillContainer || themeObj.backgroundColor;
  const previewBg = ui.colorFillContainerAlt || themeObj.gridColor;
  const subtitleColor = ui.colorTextTertiary || themeObj.axisLabelColor;

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;

    const capture = () => {
      const chart = chartRef.current?.getChartInstance();
      if (!chart) return;
      setPreviewUrl(
        chart.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: String(previewBg),
        }),
      );
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(capture);
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [previewOption, previewBg, theme]);

  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${border}`,
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        backgroundColor: cardBg,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px ${toRgbaWithOpacity(themeObj.shadowColor, 0.17)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ height: 200, padding: 10, backgroundColor: previewBg }}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={example.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%' }} />
        )}
        <div
          style={{
            position: 'fixed',
            left: -10000,
            top: -10000,
            width: 600,
            height: 400,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <HChart
            ref={chartRef}
            option={previewOption}
            theme={theme}
            renderMode='canvas'
            width={600}
            height={400}
          />
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14 }}>
          {example.title}
        </div>
        <div style={{ color: subtitleColor, fontSize: 12 }}>{example.subtitle}</div>
      </div>
    </div>
  );
};

const Dashboard = ({
  activeCategory,
  onSelectExample,
  theme,
}: {
  activeCategory: string;
  onSelectExample: (id: string) => void;
  theme: Theme;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const pageBg = ui.colorFillPage || themeObj.backgroundColor;
  const hintText = ui.colorTextTertiary || themeObj.axisLabelColor;

  const categoryLabel =
    categories.find((c) => c.key === activeCategory)?.label || activeCategory;
  const filteredExamples = examples.filter(
    (e) => e.category === activeCategory,
  );

  return (
    <div
      style={{
        backgroundColor: pageBg,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: 40 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 'normal' }}>
          {categoryLabel}
        </h2>
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
              theme={theme}
            />
          ))}
          {filteredExamples.length === 0 && (
            <div style={{ color: hintText }}>
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
  activeExample,
  setActiveExample,
}: {
  theme: 'Light' | 'Dark';
  setTheme: (t: 'Light' | 'Dark') => void;
  setMode: (m: 'classic' | 'modern') => void;
  activeExample: string;
  setActiveExample: (id: string) => void;
}) {
  const themeKey = theme.toLowerCase() as Theme;
  const themeObj = ThemeManager.getTheme(themeKey);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const pageBg = ui.colorFillPage || themeObj.backgroundColor;
  const navBg = ui.colorFillContainer || themeObj.backgroundColor;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;
  const textTertiary = ui.colorTextTertiary || themeObj.axisLabelColor;

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
        backgroundColor: pageBg,
      }}
    >
      <nav
        aria-label='Examples navigation'
        style={{
          width: 280,
          borderRight: `1px solid ${border}`,
          padding: 20,
          overflowY: 'auto',
          backgroundColor: navBg,
          color: themeObj.textColor,
        }}
      >
        <h1
          style={{
            fontSize: 20,
            marginBottom: 10,
            color: themeObj.textColor,
          }}
        >
          HudX Charts
        </h1>
        <div
          style={{
            marginBottom: 20,
            padding: '10px 0',
            borderBottom: `1px solid ${border}`,
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
              color: themeObj.textColor,
            }}
          >
            <div
              style={{
                display: 'flex',
                border: `1px solid ${border}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setMode('classic')}
                style={{
                  padding: '4px 12px',
                  background: primary,
                  color: primaryText,
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
                  color: themeObj.textColor,
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
                border: `1px solid ${border}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setTheme('Light')}
                style={{
                  padding: '4px 12px',
                  background: theme === 'Light' ? primary : 'transparent',
                  color:
                    theme === 'Light'
                      ? primaryText
                      : themeObj.textColor,
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
                  background: theme === 'Dark' ? primary : 'transparent',
                  color: theme === 'Dark' ? primaryText : themeObj.textColor,
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
                color: textSecondary,
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
                theme={themeKey}
              />
            ))}
          </React.Fragment>
        ))}

        <h2
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            margin: '20px 0 10px',
            color: textSecondary,
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
            theme={themeKey}
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
          backgroundColor: pageBg,
          color: themeObj.textColor,
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
                color: textTertiary,
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
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const pageBg = ui.colorFillPage || themeObj.backgroundColor;
  const navBg = ui.colorFillContainer || themeObj.backgroundColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const hoverBg = ui.colorFillHover || ui.colorFillContainerAlt || themeObj.gridColor;

  const [activeCategory, setActiveCategory] = useLocalStorageState<string>(
    'hudx.examples.modern.activeCategory',
    'line',
  );
  const [activeExampleId, setActiveExampleId] = useLocalStorageState<string | null>(
    'hudx.examples.modern.activeExampleId',
    null,
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);

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
        backgroundColor: pageBg,
      }}
    >
      <nav
        aria-label='Examples navigation'
        style={{
          width: 280,
          borderRight: `1px solid ${border}`,
          padding: 20,
          overflowY: 'auto',
          backgroundColor: navBg,
          color: themeObj.textColor,
        }}
      >
        <h1
          style={{
            fontSize: 20,
            marginBottom: 10,
            color: themeObj.textColor,
          }}
        >
          HudX Charts
        </h1>
        <div
          style={{
            marginBottom: 20,
            padding: '10px 0',
            borderBottom: `1px solid ${border}`,
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
              color: themeObj.textColor,
            }}
          >
            <SegmentedControl
              leftLabel='Classic'
              rightLabel='Modern'
              value='modern'
              leftValue='classic'
              rightValue='modern'
              onChange={(next) => setMode(next as 'classic' | 'modern')}
              theme={theme}
            />
            <SegmentedControl
              leftLabel='Light'
              rightLabel='Dark'
              value={theme}
              leftValue='light'
              rightValue='dark'
              onChange={(next) => setTheme(next)}
              theme={theme}
            />
          </div>
        </div>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            margin: '20px 0 10px',
            color: textSecondary,
          }}
        >
          Categories
        </h2>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const isHovered = hoveredCategory === cat.key;
          const isFocused = focusedCategory === cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                marginBottom: 4,
                border: `2px solid ${isFocused ? String(primary) : 'transparent'}`,
                borderRadius: 6,
                backgroundColor: isActive
                  ? primary
                  : isHovered
                    ? String(hoverBg)
                    : 'transparent',
                color: isActive ? primaryText : themeObj.textColor,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s',
                outline: 'none',
                boxShadow: isFocused
                  ? `0 0 0 3px ${toRgbaWithOpacity(String(primary), 0.2)}`
                  : 'none',
              }}
              onMouseEnter={() => setHoveredCategory(cat.key)}
              onMouseLeave={() => setHoveredCategory(null)}
              onFocus={() => setFocusedCategory(cat.key)}
              onBlur={() => setFocusedCategory(null)}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>
      <main
        role='main'
        aria-label='Example content'
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: pageBg,
          color: themeObj.textColor,
        }}
      >
        <Dashboard
          activeCategory={activeCategory}
          onSelectExample={setActiveExampleId}
          theme={theme}
        />
      </main>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useLocalStorageState<'classic' | 'modern'>(
    'hudx.examples.mode',
    'classic',
  );
  const [theme, setTheme] = useLocalStorageState<Theme>(
    'hudx.examples.theme',
    'light',
  );
  const [activeClassicExample, setActiveClassicExample] = useLocalStorageState<string>(
    'hudx.examples.classic.activeExample',
    'basic-line',
  );

  ThemeManager.setCurrentTheme(theme);
  const setThemeAndSync = (nextTheme: Theme) => {
    ThemeManager.setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  };

  // Sync theme string case for compatibility
  const normalizedTheme =
    typeof theme === 'string'
      ? theme.toLowerCase() === 'dark'
        ? 'Dark'
        : 'Light'
      : 'Light';
  const setNormalizedTheme = (t: 'Light' | 'Dark') =>
    setThemeAndSync(t.toLowerCase() as Theme);

  return mode === 'classic' ? (
    <OldApp
      theme={normalizedTheme}
      setTheme={setNormalizedTheme}
      setMode={setMode}
      activeExample={activeClassicExample}
      setActiveExample={setActiveClassicExample}
    />
  ) : (
    <ModernApp theme={theme} setTheme={setThemeAndSync} setMode={setMode} />
  );
}
