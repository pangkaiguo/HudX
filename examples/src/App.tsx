import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  memo,
} from 'react';
import { HChart, type ChartOption, type HChartRef } from 'hudx-charts';
import { Locale, Theme, ThemeManager, toRgbaWithOpacity } from 'hudx-render';
import { CodeBox } from './components/CodeBox';
import { examples, Example } from './data/examples';
import { getLocaleLabel, t } from './i18n';
import {
  EXAMPLES_CATEGORIES,
  EXAMPLES_CHART_PREVIEW,
  EXAMPLES_DEFAULTS,
  EXAMPLES_LAYOUT,
  EXAMPLES_LOCALES,
  EXAMPLES_STORAGE_KEYS,
} from './constants';

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
const DivergingHorizontalBarExample = lazy(
  () => import('./examples/bar/DivergingHorizontalBarExample'),
);
const DivergingVerticalBarExample = lazy(
  () => import('./examples/bar/DivergingVerticalBarExample'),
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
const AxisLabelExample = lazy(
  () => import('./examples/sub-components/AxisLabelExample'),
);
const TitleExample = lazy(
  () => import('./examples/sub-components/TitleExample'),
);
const LegendExample = lazy(
  () => import('./examples/sub-components/LegendExample'),
);
const TooltipExample = lazy(
  () => import('./examples/sub-components/TooltipExample'),
);
const RichTextExample = lazy(
  () => import('./examples/sub-components/RichTextExample'),
);

// Bundle examples
const BundleExample = lazy(() => import('./examples/bundle/BundleExample'));
const BundleBarExample = lazy(
  () => import('./examples/bundle/BundleBarExample'),
);
const BundleLineExample = lazy(
  () => import('./examples/bundle/BundleLineExample'),
);
const BundlePieExample = lazy(
  () => import('./examples/bundle/BundlePieExample'),
);

type ClassicExample = { id: string; component: React.ComponentType<any> };
type ClassicSection = { categoryKey: string; items: ClassicExample[] };

const chartExamples: ClassicSection[] = [
  {
    categoryKey: 'bar',
    items: [
      { id: 'basic-bar', component: BasicBarExample },
      {
        id: 'diverging-horizontal-bar',
        component: DivergingHorizontalBarExample,
      },
      { id: 'diverging-vertical-bar', component: DivergingVerticalBarExample },
      { id: 'stack-bar', component: StackBarExample },
      { id: 'stack-horizontal-bar', component: StackHorizontalBarExample },
      { id: 'group-bar', component: GroupBarChartExample },
    ],
  },
  {
    categoryKey: 'line',
    items: [
      { id: 'basic-line', component: BasicLineExample },
      { id: 'stack-line', component: StackLineChartExample },
      { id: 'area-line', component: AreaLineChartExample },
      { id: 'smooth-line', component: SmoothLineExample },
    ],
  },
  {
    categoryKey: 'pie',
    items: [
      { id: 'basic-pie', component: BasicPieExample },
      { id: 'advanced-pie', component: AdvancedPieChartExample },
      { id: 'doughnut', component: DoughnutExample },
      { id: 'advanced-doughnut', component: AdvancedDoughnutExample },
      { id: 'half-doughnut', component: HalfDoughnutExample },
    ],
  },
  {
    categoryKey: 'scatter',
    items: [{ id: 'scatter-chart', component: ScatterChartExample }],
  },
  {
    categoryKey: 'sub-components',
    items: [
      { id: 'axis-label', component: AxisLabelExample },
      { id: 'title-example', component: TitleExample },
      { id: 'legend-example', component: LegendExample },
      { id: 'tooltip-example', component: TooltipExample },
      { id: 'rich-text-example', component: RichTextExample },
    ],
  },
  {
    categoryKey: 'bundle',
    items: [
      { id: 'bundle-test', component: BundleExample },
      { id: 'bundle-bar', component: BundleBarExample },
      { id: 'bundle-line', component: BundleLineExample },
      { id: 'bundle-pie', component: BundlePieExample },
    ],
  },
];

const featureExamples: Array<{
  id: string;
  component: React.ComponentType<any>;
}> = [
  { id: 'shape', component: ShapeExample },
  { id: 'themes', component: ThemeExample },
  { id: 'interaction', component: InteractionExample },
  { id: 'animation', component: AnimationExample },
  { id: 'performance', component: PerformanceExample },
];

const allExamples: ClassicExample[] = [
  ...chartExamples.flatMap((c) => c.items),
  ...featureExamples,
];

const NavButton = ({
  example,
  label,
  activeExample,
  setActiveExample,
  theme,
}: {
  example: { id: string };
  label: string;
  activeExample: string;
  setActiveExample: (id: string) => void;
  theme: Theme;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const primary =
    ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const hoverBg =
    ui.colorFillHover || ui.colorFillContainerAlt || themeObj.gridColor;
  const isActive = activeExample === example.id;

  return (
    <button
      onClick={() => setActiveExample(example.id)}
      aria-label={label}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {label}
    </button>
  );
};

const useLocalStorageState = <T,>(key: string, initialValue: T) => {
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
};

const parseOption = (code: string): ChartOption => {
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
};

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
  const primary =
    ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        border: `1px solid ${border}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => onChange(leftValue)}
        style={{
          flex: 1,
          minWidth: 0,
          padding: '4px 12px',
          background: value === leftValue ? primary : 'transparent',
          color: value === leftValue ? primaryText : themeObj.textColor,
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => onChange(rightValue)}
        style={{
          flex: 1,
          minWidth: 0,
          padding: '4px 12px',
          background: value === rightValue ? primary : 'transparent',
          color: value === rightValue ? primaryText : themeObj.textColor,
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {rightLabel}
      </button>
    </div>
  );
};

const SidebarSettingsCard = ({
  theme,
  mode,
  onModeChange,
  themeValue,
  themeLeftValue,
  themeRightValue,
  onThemeChange,
  locale,
  onLocaleChange,
}: {
  theme: Theme;
  mode: 'classic' | 'modern';
  onModeChange: (mode: 'classic' | 'modern') => void;
  themeValue: string;
  themeLeftValue: string;
  themeRightValue: string;
  onThemeChange: (theme: string) => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const cardBg =
    ui.colorFillContainerAlt ||
    ui.colorFillContainer ||
    themeObj.backgroundColor;
  const inputBg = ui.colorFillContainer || themeObj.backgroundColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;

  return (
    <div
      style={{
        borderRadius: 8,
        padding: 12,
        backgroundColor: cardBg,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '56px 1fr',
          gap: '8px 10px',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 12, color: textSecondary }}>
          {t(locale, 'examples.sidebar.mode', 'Mode')}
        </span>
        <SegmentedControl
          leftLabel={t(locale, 'examples.mode.classic')}
          rightLabel={t(locale, 'examples.mode.modern')}
          value={mode}
          leftValue='classic'
          rightValue='modern'
          onChange={(next) => onModeChange(next as 'classic' | 'modern')}
          theme={theme}
        />

        <span style={{ fontSize: 12, color: textSecondary }}>
          {t(locale, 'examples.sidebar.theme', 'Theme')}
        </span>
        <SegmentedControl
          leftLabel={t(locale, 'examples.theme.light')}
          rightLabel={t(locale, 'examples.theme.dark')}
          value={themeValue}
          leftValue={themeLeftValue}
          rightValue={themeRightValue}
          onChange={(next) => onThemeChange(next)}
          theme={theme}
        />

        <span style={{ fontSize: 12, color: textSecondary }}>
          {t(locale, 'examples.sidebar.locale', 'Locale')}
        </span>
        <select
          value={locale}
          onChange={(e) => onLocaleChange(e.target.value as Locale)}
          style={{
            width: '100%',
            padding: '6px 8px',
            borderRadius: 6,
            border: `1px solid ${border}`,
            backgroundColor: inputBg,
            color: themeObj.textColor,
            fontSize: 12,
            outline: 'none',
          }}
        >
          {EXAMPLES_LOCALES.map((l) => (
            <option key={l} value={l}>
              {getLocaleLabel(l)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SettingsPopover = ({
  open,
  onClose,
  anchorRef,
  theme,
  children,
}: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  theme: Theme;
  children: React.ReactNode;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const cardBg =
    ui.colorFillContainerAlt ||
    ui.colorFillContainer ||
    themeObj.backgroundColor;

  const [pos, setPos] = useState<{
    left: number;
    top: number;
    maxHeight: number;
  }>({
    left: 8,
    top: 8,
    maxHeight: 300,
  });

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      const width = 260;
      const gap = 8;

      const left = rect
        ? Math.min(
            Math.max(gap, rect.right - width),
            window.innerWidth - width - gap,
          )
        : gap;
      const top = rect ? rect.bottom + gap : gap;
      const maxHeight = Math.max(120, window.innerHeight - top - gap);
      setPos({ left, top, maxHeight });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [anchorRef, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <>
      <div
        onMouseDown={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          backgroundColor: 'transparent',
        }}
      />
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          zIndex: 2001,
          left: pos.left,
          top: pos.top,
          width: 260,
          maxHeight: pos.maxHeight,
          overflow: 'auto',
          border: `1px solid ${border}`,
          borderRadius: 10,
          backgroundColor: cardBg,
          boxShadow: `0 10px 30px ${toRgbaWithOpacity(themeObj.shadowColor, 0.22)}`,
          padding: 12,
        }}
      >
        {children}
      </div>
    </>
  );
};

const ChartCard = ({
  example,
  onClick,
  theme,
  locale,
}: {
  example: Example;
  onClick: () => void;
  theme: Theme;
  locale: Locale;
}) => {
  const titleText = t(
    locale,
    `examples.list.${example.id}.title`,
    example.title,
  );
  const subtitleText = t(
    locale,
    `examples.list.${example.id}.subtitle`,
    example.subtitle,
  );
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
            alt={titleText}
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
            width: EXAMPLES_CHART_PREVIEW.width,
            height: EXAMPLES_CHART_PREVIEW.height,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <HChart
            ref={chartRef}
            option={previewOption}
            theme={theme}
            locale={locale}
            renderMode='canvas'
            width={EXAMPLES_CHART_PREVIEW.width}
            height={EXAMPLES_CHART_PREVIEW.height}
          />
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14 }}>
          {titleText}
        </div>
        <div style={{ color: subtitleColor, fontSize: 12 }}>{subtitleText}</div>
      </div>
    </div>
  );
};

const Dashboard = ({
  activeCategory,
  onSelectExample,
  theme,
  locale,
}: {
  activeCategory: string;
  onSelectExample: (id: string) => void;
  theme: Theme;
  locale: Locale;
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const pageBg = ui.colorFillPage || themeObj.backgroundColor;
  const hintText = ui.colorTextTertiary || themeObj.axisLabelColor;

  const categoryLabel = t(
    locale,
    `examples.category.${activeCategory}`,
    activeCategory,
  );
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
      <div style={{ padding: EXAMPLES_LAYOUT.mainPadding }}>
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
              locale={locale}
            />
          ))}
          {filteredExamples.length === 0 && (
            <div style={{ color: hintText }}>
              {t(locale, 'examples.emptyCategory')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OldApp = memo(
  ({
    theme,
    setTheme,
    setMode,
    locale,
    setLocale,
    activeExample,
    setActiveExample,
  }: {
    theme: 'Light' | 'Dark';
    setTheme: (t: 'Light' | 'Dark') => void;
    setMode: (m: 'classic' | 'modern') => void;
    locale: Locale;
    setLocale: (l: Locale) => void;
    activeExample: string;
    setActiveExample: (id: string) => void;
  }) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const settingsButtonRef = React.useRef<HTMLButtonElement>(null);
    const themeKey = theme.toLowerCase() as Theme;
    const themeObj = ThemeManager.getTheme(themeKey);
    const ui = themeObj.token as any;
    const border = ui.colorBorderSecondary || themeObj.borderColor;
    const pageBg = ui.colorFillPage || themeObj.backgroundColor;
    const navBg = ui.colorFillContainer || themeObj.backgroundColor;
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
            width: EXAMPLES_LAYOUT.sidebarWidth,
            borderRight: `1px solid ${border}`,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: navBg,
            color: themeObj.textColor,
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 2,
              backgroundColor: navBg,
              padding: '20px 20px 12px',
              borderBottom: `1px solid ${border}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <h1
                style={{
                  fontSize: 20,
                  margin: 0,
                  color: themeObj.textColor,
                  lineHeight: '24px',
                }}
              >
                {t(locale, 'examples.app.title')}
              </h1>
              <button
                ref={settingsButtonRef}
                onClick={() => setSettingsOpen(true)}
                aria-label={t(locale, 'examples.sidebar.settings', 'Settings')}
                aria-haspopup='dialog'
                aria-expanded={settingsOpen}
                style={{
                  width: 32,
                  height: 32,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  backgroundColor: 'transparent',
                  color: themeObj.textColor,
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: '16px',
                }}
              >
                ⚙︎
              </button>
            </div>
            <SettingsPopover
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              anchorRef={settingsButtonRef}
              theme={themeKey}
            >
              <SidebarSettingsCard
                theme={themeKey}
                mode='classic'
                onModeChange={(next) => {
                  setSettingsOpen(false);
                  setMode(next);
                }}
                themeValue={theme}
                themeLeftValue='Light'
                themeRightValue='Dark'
                onThemeChange={(next) => setTheme(next as 'Light' | 'Dark')}
                locale={locale}
                onLocaleChange={setLocale}
              />
            </SettingsPopover>
          </div>

          <div
            style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 20px' }}
          >
            {chartExamples.map((category) => (
              <React.Fragment key={category.categoryKey}>
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    margin: '20px 0 10px',
                    color: textSecondary,
                  }}
                >
                  {t(
                    locale,
                    `examples.category.${category.categoryKey}`,
                    category.categoryKey,
                  )}
                </h2>
                {category.items.map((example) => (
                  <NavButton
                    key={example.id}
                    example={example}
                    label={t(
                      locale,
                      `examples.list.${example.id}.title`,
                      example.id,
                    )}
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
              {t(locale, 'examples.nav.featureDemos')}
            </h2>
            {featureExamples.map((example) => (
              <NavButton
                key={example.id}
                example={example}
                label={t(locale, `examples.feature.${example.id}`, example.id)}
                activeExample={activeExample}
                setActiveExample={setActiveExample}
                theme={themeKey}
              />
            ))}
          </div>
        </nav>
        <main
          role='main'
          aria-label='Example content'
          style={{
            flex: 1,
            padding: EXAMPLES_LAYOUT.mainPadding,
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
                {t(locale, 'examples.loading')}
              </div>
            }
          >
            <div style={{ contain: 'layout style paint' }}>
              <ActiveComponent theme={theme} locale={locale} />
            </div>
          </Suspense>
        </main>
      </div>
    );
  },
);
OldApp.displayName = 'OldApp';

const ModernApp = ({
  theme,
  setTheme,
  setMode,
  locale,
  setLocale,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  setMode: (m: 'classic' | 'modern') => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsButtonRef = React.useRef<HTMLButtonElement>(null);
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const pageBg = ui.colorFillPage || themeObj.backgroundColor;
  const navBg = ui.colorFillContainer || themeObj.backgroundColor;
  const textSecondary = ui.colorTextSecondary || themeObj.axisLabelColor;
  const primary =
    ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const hoverBg =
    ui.colorFillHover || ui.colorFillContainerAlt || themeObj.gridColor;

  const [activeCategory, setActiveCategory] = useLocalStorageState<string>(
    EXAMPLES_STORAGE_KEYS.modernActiveCategory,
    EXAMPLES_DEFAULTS.modernActiveCategory,
  );
  const [activeExampleId, setActiveExampleId] = useLocalStorageState<
    string | null
  >(
    EXAMPLES_STORAGE_KEYS.modernActiveExampleId,
    EXAMPLES_DEFAULTS.modernActiveExampleId,
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!EXAMPLES_CATEGORIES.includes(activeCategory as any)) {
      setActiveCategory(EXAMPLES_DEFAULTS.modernActiveCategory);
    }
  }, [activeCategory, setActiveCategory]);

  const activeExample = useMemo(
    () => examples.find((e) => e.id === activeExampleId),
    [activeExampleId],
  );

  if (activeExampleId && activeExample) {
    return (
      <CodeBox
        initialCode={activeExample.code}
        title={t(
          locale,
          `examples.list.${activeExample.id}.title`,
          activeExample.title,
        )}
        onBack={() => setActiveExampleId(null)}
        theme={theme}
        onThemeChange={setTheme}
        locale={locale}
        onLocaleChange={setLocale}
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
          width: EXAMPLES_LAYOUT.sidebarWidth,
          borderRight: `1px solid ${border}`,
          backgroundColor: navBg,
          color: themeObj.textColor,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            backgroundColor: navBg,
            padding: '20px 20px 12px',
            borderBottom: `1px solid ${border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <h1
              style={{
                fontSize: 20,
                margin: 0,
                color: themeObj.textColor,
                lineHeight: '24px',
              }}
            >
              {t(locale, 'examples.app.title')}
            </h1>
            <button
              ref={settingsButtonRef}
              onClick={() => setSettingsOpen(true)}
              aria-label={t(locale, 'examples.sidebar.settings', 'Settings')}
              aria-haspopup='dialog'
              aria-expanded={settingsOpen}
              style={{
                width: 32,
                height: 32,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                border: `1px solid ${border}`,
                backgroundColor: 'transparent',
                color: themeObj.textColor,
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: '16px',
              }}
            >
              ⚙︎
            </button>
          </div>
          <SettingsPopover
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            anchorRef={settingsButtonRef}
            theme={theme}
          >
            <SidebarSettingsCard
              theme={theme}
              mode='modern'
              onModeChange={(next) => {
                setSettingsOpen(false);
                setMode(next);
              }}
              themeValue={theme}
              themeLeftValue='light'
              themeRightValue='dark'
              onThemeChange={(next) => setTheme(next as Theme)}
              locale={locale}
              onLocaleChange={setLocale}
            />
          </SettingsPopover>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 20px' }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              margin: '0 0 10px',
              color: textSecondary,
            }}
          >
            {t(locale, 'examples.nav.categories')}
          </h2>
          {EXAMPLES_CATEGORIES.map((categoryKey) => {
            const isActive = activeCategory === categoryKey;
            const isHovered = hoveredCategory === categoryKey;
            const isFocused = focusedCategory === categoryKey;

            return (
              <button
                key={categoryKey}
                onClick={() => setActiveCategory(categoryKey)}
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
                onMouseEnter={() => setHoveredCategory(categoryKey)}
                onMouseLeave={() => setHoveredCategory(null)}
                onFocus={() => setFocusedCategory(categoryKey)}
                onBlur={() => setFocusedCategory(null)}
              >
                {t(locale, `examples.category.${categoryKey}`, categoryKey)}
              </button>
            );
          })}
        </div>
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
          locale={locale}
        />
      </main>
    </div>
  );
};

const App = () => {
  const [mode, setMode] = useLocalStorageState<'classic' | 'modern'>(
    EXAMPLES_STORAGE_KEYS.mode,
    EXAMPLES_DEFAULTS.mode,
  );
  const [theme, setTheme] = useLocalStorageState<Theme>(
    EXAMPLES_STORAGE_KEYS.theme,
    EXAMPLES_DEFAULTS.theme,
  );
  const [locale, setLocale] = useLocalStorageState<Locale>(
    EXAMPLES_STORAGE_KEYS.locale,
    EXAMPLES_DEFAULTS.locale,
  );
  const [activeClassicExample, setActiveClassicExample] =
    useLocalStorageState<string>(
      EXAMPLES_STORAGE_KEYS.classicActiveExample,
      EXAMPLES_DEFAULTS.classicActiveExample,
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
      locale={locale}
      setLocale={setLocale}
      activeExample={activeClassicExample}
      setActiveExample={setActiveClassicExample}
    />
  ) : (
    <ModernApp
      theme={theme}
      setTheme={setThemeAndSync}
      setMode={setMode}
      locale={locale}
      setLocale={setLocale}
    />
  );
};

export default App;
