import React, { useEffect, useRef, useMemo } from 'react';
import { EditorState, Compartment, type Extension } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
} from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
} from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { lintGutter } from '@codemirror/lint';
import { ThemeManager } from 'hudx-render';
import {
  setErrorEffect,
  errorStateField,
  errorGutterExtension,
  errorDecorationExtension,
  syntaxLintExtension,
} from './CodeEditorExtensions';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
  language?: 'js' | 'ts';
  showVimMode?: boolean;
  errorLine?: number | null;
  errorColumn?: number | null;
  errorMessage?: string | null;
  readOnly?: boolean;
}

const resolveEditorColors = (themeObj: any) => {
  const ui = themeObj.token as any;
  return {
    editorBg: ui.colorCodeBackground || themeObj.backgroundColor,
    editorText: ui.colorCodeText || themeObj.textColor,
    gutterBg:
      ui.colorCodeGutterBackground ||
      ui.colorBorderSecondary ||
      themeObj.borderColor,
    gutterText:
      ui.colorCodeGutterText || ui.colorTextTertiary || themeObj.axisLabelColor,
  };
};

const createEditorTheme = (
  theme: 'light' | 'dark',
  colors: {
    editorBg: string;
    editorText: string;
    gutterBg: string;
    gutterText: string;
  },
  markerColor: string,
) => {
  const errorLineBg =
    theme === 'dark' ? 'rgba(238, 102, 102, 0.2)' : 'rgba(238, 102, 102, 0.15)';
  const errorRangeBg =
    theme === 'dark'
      ? 'rgba(238, 102, 102, 0.45)'
      : 'rgba(238, 102, 102, 0.35)';

  return EditorView.theme(
    {
      '&': {
        height: '100%',
        backgroundColor: colors.editorBg,
        color: colors.editorText,
      },
      '.cm-scroller': {
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.5',
      },
      '.cm-content': {
        padding: '10px',
      },
      '.cm-gutters': {
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: '12px',
        backgroundColor: colors.gutterBg,
        color: colors.gutterText,
      },
      '.cm-lineNumbers .cm-gutterElement': {
        padding: '0 8px 0 10px',
      },
      '.cm-error-gutter': {
        paddingRight: '6px',
      },
      '.cm-error-marker': {
        color: markerColor,
        fontWeight: 'bold',
        display: 'inline-block',
        width: '12px',
        textAlign: 'center',
      },
      '.cm-error-line': {
        backgroundColor: errorLineBg,
      },
      '.cm-error-range': {
        backgroundColor: errorRangeBg,
      },
    },
    { dark: theme === 'dark' },
  );
};

const resolveErrorStyles = (_theme: 'light' | 'dark', themeObj: any) => {
  return {
    errorBg: 'rgba(238, 102, 102, 0.6)',
    errorBorder: themeObj.seriesColors?.[3] || '#ee6666',
  };
};

const useEditorThemeConfig = (theme: 'light' | 'dark') => {
  const themeObj = ThemeManager.getTheme(theme);
  const colors = useMemo(() => resolveEditorColors(themeObj), [themeObj]);
  const { errorBg, errorBorder } = useMemo(
    () => resolveErrorStyles(theme, themeObj),
    [theme, themeObj],
  );
  const editorTheme = useMemo(
    () => createEditorTheme(theme, colors, errorBorder),
    [theme, colors, errorBorder],
  );
  const codemirrorThemeExtensions = useMemo<Extension[]>(
    () => (theme === 'dark' ? [oneDark] : []),
    [theme],
  );

  return {
    themeObj,
    colors,
    editorTheme,
    codemirrorThemeExtensions,
    errorBg,
    errorBorder,
  };
};

const createBaseExtensions = (): Extension[] => [
  highlightActiveLineGutter(),
  highlightActiveLine(),
  drawSelection(),
  history(),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
  lintGutter(),
  syntaxLintExtension,
];

const useCodeMirrorView = ({
  code,
  onChange,
  language,
  editorTheme,
  codemirrorThemeExtensions,
  readOnly,
  errorLine,
  errorColumn,
}: {
  code: string;
  onChange: (value: string) => void;
  language: 'js' | 'ts';
  editorTheme: ReturnType<typeof EditorView.theme>;
  codemirrorThemeExtensions: Extension[];
  readOnly: boolean;
  errorLine: number | null;
  errorColumn: number | null;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const lineNumberCompartment = useRef(new Compartment()).current;
  const languageCompartment = useRef(new Compartment()).current;
  const themeCompartment = useRef(new Compartment()).current;
  const readOnlyCompartment = useRef(new Compartment()).current;
  const baseExtensions = useMemo(createBaseExtensions, []);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current || viewRef.current) return;

    const startState = EditorState.create({
      doc: code,
      extensions: [
        baseExtensions,
        lineNumberCompartment.of(
          lineNumbers({
            formatNumber: (lineNo) => String(lineNo),
          }),
        ),
        languageCompartment.of(
          javascript({ typescript: language === 'ts', jsx: true }),
        ),
        themeCompartment.of([...codemirrorThemeExtensions, editorTheme]),
        readOnlyCompartment.of([
          EditorState.readOnly.of(readOnly),
          EditorView.editable.of(!readOnly),
        ]),
        errorStateField,
        errorGutterExtension,
        errorDecorationExtension,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    viewRef.current = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [
    baseExtensions,
    lineNumberCompartment,
    languageCompartment,
    themeCompartment,
    readOnlyCompartment,
  ]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== code) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: code },
      });
    }
  }, [code]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: setErrorEffect.of({ line: errorLine, col: errorColumn }),
    });
  }, [errorLine, errorColumn]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: languageCompartment.reconfigure(
        javascript({ typescript: language === 'ts', jsx: true }),
      ),
    });
  }, [language, languageCompartment]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: themeCompartment.reconfigure([
        ...codemirrorThemeExtensions,
        editorTheme,
      ]),
    });
  }, [editorTheme, codemirrorThemeExtensions, themeCompartment]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: readOnlyCompartment.reconfigure([
        EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly),
      ]),
    });
  }, [readOnly, readOnlyCompartment]);

  return containerRef;
};

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  theme = 'light',
  language = 'js',
  errorLine = null,
  errorColumn = null,
  errorMessage = null,
  readOnly = false,
}) => {
  const {
    themeObj,
    colors,
    editorTheme,
    codemirrorThemeExtensions,
    errorBg,
    errorBorder,
  } = useEditorThemeConfig(theme);
  const containerRef = useCodeMirrorView({
    code,
    onChange,
    language,
    editorTheme,
    codemirrorThemeExtensions,
    readOnly,
    errorLine,
    errorColumn,
  });
  const errorDisplay = useMemo(() => {
    if (!errorMessage) return '';
    if (!errorLine && !errorColumn) return errorMessage;
    const parts = [];
    if (errorLine) {
      parts.push(`Line ${errorLine}`);
    }
    if (errorColumn) {
      parts.push(`Column ${errorColumn}`);
    }
    return `${parts.join(', ')}: ${errorMessage}`;
  }, [errorMessage, errorLine, errorColumn]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: colors.editorBg,
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {errorMessage ? (
        <div
          style={{
            position: 'absolute',
            left: 40,
            right: 10,
            bottom: 5,
            padding: '6px 10px',
            fontSize: 12,
            borderRadius: 4,
            backgroundColor: errorBg,
            color: themeObj.textColor,
            border: `1px solid ${errorBorder}`,
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap',
          }}
        >
          {errorDisplay}
        </div>
      ) : null}
    </div>
  );
};

export default CodeEditor;
