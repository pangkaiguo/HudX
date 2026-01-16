import React, { useRef, useEffect } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  theme?: "light" | "dark";
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  theme = "light",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const bgColor = theme === "dark" ? "#1e1e1e" : "#f5f5f5";
  const textColor = theme === "dark" ? "#d4d4d4" : "#333";
  const gutterBg = theme === "dark" ? "#252526" : "#e0e0e0";
  const gutterColor = theme === "dark" ? "#858585" : "#999";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        backgroundColor: bgColor,
      }}
    >
      <div
        ref={lineNumbersRef}
        style={{
          width: "40px",
          height: "100%",
          overflow: "hidden",
          backgroundColor: gutterBg,
          color: gutterColor,
          textAlign: "right",
          padding: "10px 5px",
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: "14px",
          lineHeight: "1.5",
          boxSizing: "border-box",
          userSelect: "none",
        }}
      >
        {lineNumbers.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        spellCheck={false}
        style={{
          flex: 1,
          height: "100%",
          resize: "none",
          padding: "10px",
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: "14px",
          lineHeight: "1.5",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: textColor,
          boxSizing: "border-box",
          whiteSpace: "pre",
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const value = e.currentTarget.value;
            const newValue =
              value.substring(0, start) + "  " + value.substring(end);
            onChange(newValue);
            // Need to set selection range after render, but React state update is async.
            // A simple timeout works for this basic editor.
            setTimeout(() => {
              if (textareaRef.current) {
                textareaRef.current.selectionStart =
                  textareaRef.current.selectionEnd = start + 2;
              }
            }, 0);
          }
        }}
      />
    </div>
  );
};
