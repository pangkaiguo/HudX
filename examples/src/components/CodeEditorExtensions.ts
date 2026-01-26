import { StateField, StateEffect, RangeSet } from '@codemirror/state';
import { gutter, GutterMarker, Decoration, EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { linter, type Diagnostic } from '@codemirror/lint';

// --- Runtime Error Extension (Custom "X" Marker) ---

export const setErrorEffect = StateEffect.define<{
  line: number | null;
  col: number | null;
}>();

export const errorStateField = StateField.define<{
  line: number | null;
  col: number | null;
}>({
  create() {
    return { line: null, col: null };
  },
  update(value, tr) {
    for (const effect of tr.effects) {
      if (effect.is(setErrorEffect)) {
        return effect.value;
      }
    }
    return value;
  },
});

const errorMarker = new (class extends GutterMarker {
  toDOM() {
    const span = document.createElement('span');
    span.textContent = '✖';
    span.className = 'cm-error-marker';
    return span;
  }
})();

export const errorGutterExtension = gutter({
  class: 'cm-error-gutter',
  markers: (view) => {
    const { line } = view.state.field(errorStateField);
    if (!line || line < 1 || line > view.state.doc.lines) return RangeSet.empty;
    const lineInfo = view.state.doc.line(line);
    return RangeSet.of([errorMarker.range(lineInfo.from)]);
  },
  initialSpacer: () => errorMarker,
});

export const errorDecorationExtension = EditorView.decorations.compute(
  [errorStateField],
  (state) => {
    const { line, col } = state.field(errorStateField);
    if (!line || line < 1 || line > state.doc.lines) return Decoration.none;

    const lineInfo = state.doc.line(line);
    const decorations = [
      Decoration.line({ class: 'cm-error-line' }).range(lineInfo.from),
    ];

    if (col && lineInfo.length > 0) {
      const maxIndex = Math.max(lineInfo.length - 1, 0);
      const columnIndex = Math.min(Math.max(col - 1, 0), maxIndex);
      const from = lineInfo.from + columnIndex;
      decorations.push(
        Decoration.mark({ class: 'cm-error-range' }).range(from, from + 1),
      );
    }
    return Decoration.set(decorations);
  },
);

// --- Syntax Lint Extension (Native Linter) ---

export const syntaxLintExtension = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  syntaxTree(view.state)
    .cursor()
    .iterate((node) => {
      if (node.type.isError) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: 'error',
          message: 'Syntax error',
        });
      }
    });
  return diagnostics;
});
