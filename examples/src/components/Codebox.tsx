import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HChart, type ChartOption } from 'hudx-charts';
import { Locale, ThemeManager, Theme, type RenderMode } from 'hudx-render';
import { CodeEditor } from './CodeEditor';
import { getLocaleLabel, t } from '../i18n';
import { EXAMPLES_LOCALES } from '../constants';

interface CodeBoxProps {
  initialCode: string;
  onBack: () => void;
  title?: string;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const buildTsCode = (jsCode: string) => {
  return `import type { ChartOption } from 'hudx';

const ${jsCode.replace('option =', 'option: ChartOption =')}`;
};

const useCodeExport = ({
  code,
  activeTab,
  renderMode,
  chartContainerRef,
  backgroundColor,
}: {
  code: string;
  activeTab: 'JS' | 'TS';
  renderMode: RenderMode;
  chartContainerRef: React.RefObject<HTMLDivElement>;
  backgroundColor: string;
}) => {
  const handleDownload = useCallback(() => {
    const isTs = activeTab === 'TS';
    const content = isTs ? buildTsCode(code) : code;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isTs ? 'chart-option.ts' : 'chart-option.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [activeTab, code]);

  const handleScreenshot = useCallback(
    (type: 'png' | 'jpeg' | 'svg') => {
      if (!chartContainerRef.current) return;

      const canvas = chartContainerRef.current.querySelector('canvas');
      const svg = chartContainerRef.current.querySelector('svg');

      let url = '';

      if (renderMode === 'canvas' && canvas) {
        if (type === 'svg') {
          alert('Cannot download SVG from Canvas mode');
          return;
        }
        url = canvas.toDataURL(`image/${type}`);
      } else if (renderMode === 'svg' && svg) {
        if (type !== 'svg') {
          const serializer = new XMLSerializer();
          const source = serializer.serializeToString(svg);
          const svgBlob = new Blob([source], {
            type: 'image/svg+xml;charset=utf-8',
          });
          const url = URL.createObjectURL(svgBlob);

          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = svg.clientWidth;
            canvas.height = svg.clientHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = backgroundColor;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);

              const a = document.createElement('a');
              a.href = canvas.toDataURL(`image/${type}`);
              a.download = `chart.${type}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
            URL.revokeObjectURL(url);
          };
          img.src = url;
          return;
        } else {
          const serializer = new XMLSerializer();
          const source = serializer.serializeToString(svg);
          const blob = new Blob([source], {
            type: 'image/svg+xml;charset=utf-8',
          });
          url = URL.createObjectURL(blob);
        }
      }

      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `chart.${type}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (type === 'svg') URL.revokeObjectURL(url);
      }
    },
    [backgroundColor, chartContainerRef, renderMode],
  );

  return { handleDownload, handleScreenshot };
};

const useCodeEvaluation = ({
  code,
  activeTab,
}: {
  code: string;
  activeTab: 'JS' | 'TS';
}) => {
  const [option, setOption] = useState<ChartOption>({});
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [errorColumn, setErrorColumn] = useState<number | null>(null);

  const evaluateCodeValue = useCallback((codeValue: string) => {
    const sourceUrl = 'hudx-codebox-input.js';
    try {
      const func = new Function(
        `let option;\n${codeValue}\nreturn option;\n//# sourceURL=${sourceUrl}`,
      );
      const result = func();
      if (result && typeof result === 'object') {
        return {
          option: result as ChartOption,
          error: null,
          errorLine: null,
          errorColumn: null,
        };
      }
      return {
        option: null,
        error: 'Code did not return an "option" object or assign to "option".',
        errorLine: null,
        errorColumn: null,
      };
    } catch (err: any) {
      const stack = String(err?.stack || '');
      const stackLine =
        stack.split('\n').find((line: string) => line.includes(sourceUrl)) ||
        '';
      const match = stackLine.match(/:(\d+):(\d+)/);
      const rawLine = match ? Number(match[1]) : err?.lineNumber;
      const line = Number.isFinite(rawLine) ? rawLine - 1 : null;
      const rawColumn = match ? Number(match[2]) : err?.columnNumber;
      const column = line && Number.isFinite(rawColumn) ? rawColumn : null;
      console.error(err);
      return {
        option: null,
        error: err.message,
        errorLine: line && line > 0 ? line : null,
        errorColumn: column,
      };
    }
  }, []);

  const evaluateCode = useCallback(() => {
    return evaluateCodeValue(code);
  }, [code, evaluateCodeValue]);

  const runCode = useCallback(
    (overrideCode?: string) => {
      const result = overrideCode
        ? evaluateCodeValue(overrideCode)
        : evaluateCodeValue(code);
      if (result.option) {
        setOption(result.option);
        setError(null);
        setErrorLine(null);
        setErrorColumn(null);
        return;
      }
      setError(result.error);
      setErrorLine(result.errorLine);
      setErrorColumn(result.errorColumn);
    },
    [code, evaluateCodeValue],
  );

  const validateCode = useCallback(() => {
    const result = evaluateCodeValue(code);
    if (result.option) {
      setError(null);
      setErrorLine(null);
      setErrorColumn(null);
      return;
    }
    setError(result.error);
    setErrorLine(result.errorLine);
    setErrorColumn(result.errorColumn);
  }, [code, evaluateCodeValue]);

  useEffect(() => {
    runCode();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeTab === 'TS') return;
    const timer = setTimeout(() => {
      validateCode();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab, code, validateCode]);

  return {
    option,
    setOption,
    error,
    errorLine,
    errorColumn,
    runCode,
  };
};

const useDragResize = (initialPercent: number) => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [editorWidth, setEditorWidth] = useState(initialPercent);

  const handleDragStart = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const container = mainContainerRef.current;
      if (!container) return;
      event.preventDefault();
      const rect = container.getBoundingClientRect();
      const minWidth = 200;
      const maxWidth = Math.max(rect.width - 200, minWidth);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      const onMove = (moveEvent: MouseEvent) => {
        const next = Math.min(
          Math.max(moveEvent.clientX - rect.left, minWidth),
          maxWidth,
        );
        setEditorWidth((next / rect.width) * 100);
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [],
  );

  return { mainContainerRef, editorWidth, handleDragStart, setEditorWidth };
};

export const CodeBox: React.FC<CodeBoxProps> = ({
  initialCode,
  onBack,
  title,
  theme,
  onThemeChange,
  locale,
  onLocaleChange,
}) => {
  const themeObj = ThemeManager.getTheme(theme);
  const ui = themeObj.token as any;
  const primary =
    ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const primaryText = ui.colorPrimaryText || themeObj.tooltipTextColor;
  const [code, setCode] = useState(initialCode);
  const [renderMode, setRenderMode] = useState<RenderMode>('svg');
  const [activeTab, setActiveTab] = useState<'JS' | 'TS'>('JS');
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const { option, setOption, error, errorLine, errorColumn, runCode } =
    useCodeEvaluation({ code, activeTab });
  const { mainContainerRef, editorWidth, handleDragStart, setEditorWidth } =
    useDragResize(40);

  const bgColor = ui.colorFillPage || themeObj.backgroundColor;
  const textColor = themeObj.textColor;
  const borderColor = ui.colorBorderSecondary || themeObj.borderColor;
  const toolbarBg = ui.colorFillContainer || themeObj.backgroundColor;
  const toolbarAltBg =
    ui.colorCodeGutterBackground ||
    ui.colorFillContainerAlt ||
    themeObj.gridColor;
  const { handleDownload, handleScreenshot } = useCodeExport({
    code,
    activeTab,
    renderMode,
    chartContainerRef,
    backgroundColor: bgColor,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 50,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            onClick={onBack}
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              fontSize: 16,
              color: textColor,
            }}
          >
            ← {t(locale, 'examples.codebox.back')}
          </button>
          <span style={{ fontWeight: 'bold' }}>
            {title || t(locale, 'examples.codebox.defaultTitle')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div
            style={{
              display: 'flex',
              border: `1px solid ${borderColor}`,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => onThemeChange('light')}
              style={{
                padding: '4px 12px',
                background: theme === 'light' ? primary : 'transparent',
                color: theme === 'light' ? primaryText : textColor,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              {t(locale, 'examples.theme.light')}
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              style={{
                padding: '4px 12px',
                background: theme === 'dark' ? primary : 'transparent',
                color: theme === 'dark' ? primaryText : textColor,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              {t(locale, 'examples.theme.dark')}
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              border: `1px solid ${borderColor}`,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setRenderMode('svg')}
              style={{
                padding: '4px 12px',
                background: renderMode === 'svg' ? primary : 'transparent',
                color: renderMode === 'svg' ? primaryText : textColor,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              {t(locale, 'examples.render.svg')}
            </button>
            <button
              onClick={() => setRenderMode('canvas')}
              style={{
                padding: '4px 12px',
                background: renderMode === 'canvas' ? primary : 'transparent',
                color: renderMode === 'canvas' ? primaryText : textColor,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              {t(locale, 'examples.render.canvas')}
            </button>
          </div>
          <select
            value={locale}
            onChange={(e) => onLocaleChange(e.target.value as Locale)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: `1px solid ${borderColor}`,
              backgroundColor: toolbarBg,
              color: textColor,
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

      {/* Main Content */}
      <div
        ref={mainContainerRef}
        style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
      >
        {/* Left Pane: Editor */}
        <div
          style={{
            width: `${editorWidth}%`,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <div
            style={{
              height: 40,
              borderBottom: `1px solid ${borderColor}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              backgroundColor: toolbarAltBg,
            }}
          >
            <button
              style={{
                padding: '0 15px',
                height: '100%',
                background: activeTab === 'JS' ? toolbarBg : 'transparent',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                fontWeight: activeTab === 'JS' ? 'bold' : 'normal',
              }}
              onClick={() => setActiveTab('JS')}
            >
              JS
            </button>
            <button
              style={{
                padding: '0 15px',
                height: '100%',
                background: activeTab === 'TS' ? toolbarBg : 'transparent',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                fontWeight: activeTab === 'TS' ? 'bold' : 'normal',
              }}
              onClick={() => setActiveTab('TS')}
            >
              TS
            </button>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => runCode()}
              style={{
                padding: '4px 15px',
                background: primary,
                color: primaryText,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 12,
                opacity: activeTab === 'TS' ? 0.5 : 1,
                pointerEvents: activeTab === 'TS' ? 'none' : 'auto',
              }}
            >
              Run
            </button>
            <button
              onClick={() => {
                setCode(initialCode);
                runCode(initialCode);
              }}
              style={{
                marginLeft: 10,
                padding: '4px 15px',
                background: 'transparent',
                border: `1px solid ${borderColor}`,
                color: textColor,
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 12,
                opacity: activeTab === 'TS' ? 0.5 : 1,
                pointerEvents: activeTab === 'TS' ? 'none' : 'auto',
              }}
            >
              Reset
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <CodeEditor
              code={activeTab === 'TS' ? buildTsCode(code) : code}
              onChange={activeTab === 'TS' ? () => {} : setCode}
              theme={theme === 'dark' ? 'dark' : 'light'}
              language={activeTab === 'TS' ? 'ts' : 'js'}
              showVimMode={true}
              errorLine={errorLine}
              errorColumn={errorColumn}
              errorMessage={error}
              readOnly={activeTab === 'TS'}
            />
          </div>
        </div>

        <div
          onMouseDown={handleDragStart}
          style={{
            width: 6,
            cursor: 'col-resize',
            backgroundColor: toolbarAltBg,
            borderLeft: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
          }}
        />

        {/* Right Pane: Preview */}
        <div
          style={{
            flex: 1,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: bgColor,
          }}
        >
          <div
            ref={chartContainerRef}
            style={{
              flex: 1,
              minHeight: 0,
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <HChart
              option={option}
              theme={theme}
              locale={locale}
              renderMode={renderMode}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div
            style={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 10,
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                padding: '5px 10px',
                background: 'none',
                border: `1px solid ${borderColor}`,
                borderRadius: 4,
                color: textColor,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Download Code
            </button>
            <div
              style={{
                display: 'flex',
                border: `1px solid ${borderColor}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => handleScreenshot('png')}
                style={{
                  padding: '5px 10px',
                  background: 'none',
                  borderRight: `1px solid ${borderColor}`,
                  borderTop: 'none',
                  borderBottom: 'none',
                  borderLeft: 'none',
                  color: textColor,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                PNG
              </button>
              <button
                onClick={() => handleScreenshot('jpeg')}
                style={{
                  padding: '5px 10px',
                  background: 'none',
                  borderRight: `1px solid ${borderColor}`,
                  borderTop: 'none',
                  borderBottom: 'none',
                  borderLeft: 'none',
                  color: textColor,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                JPG
              </button>
              <button
                onClick={() => handleScreenshot('svg')}
                style={{
                  padding: '5px 10px',
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: 12,
                  cursor: 'pointer',
                  opacity: renderMode === 'canvas' ? 0.5 : 1,
                  pointerEvents: renderMode === 'canvas' ? 'none' : 'auto',
                }}
              >
                SVG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBox;
