import React, { useState, useEffect, useCallback } from "react";
import { HChart } from "hux-charts";
import type { ChartOption } from "hux-charts";
import { ThemeManager, Theme } from "hux-core";
import { CodeEditor } from "./CodeEditor";

interface CodeboxProps {
  initialCode: string;
  onBack: () => void;
  title?: string;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const Codebox: React.FC<CodeboxProps> = ({
  initialCode,
  onBack,
  title,
  theme,
  onThemeChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [option, setOption] = useState<ChartOption>({});
  const [error, setError] = useState<string | null>(null);
  const [renderMode, setRenderMode] = useState<"canvas" | "svg">("canvas");
  const [activeTab, setActiveTab] = useState<"JS" | "TS">("JS");
  const chartContainerRef = React.useRef<HTMLDivElement>(null);

  const getTsCode = (jsCode: string) => {
    return `import type { ChartOption } from 'hudx';

const ${jsCode.replace("option =", "option: ChartOption =")}`;
  };

  const handleDownload = () => {
    const isTs = activeTab === "TS";
    const content = isTs ? getTsCode(code) : code;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isTs ? "chart-option.ts" : "chart-option.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScreenshot = (type: "png" | "jpeg" | "svg") => {
    if (!chartContainerRef.current) return;

    const canvas = chartContainerRef.current.querySelector("canvas");
    const svg = chartContainerRef.current.querySelector("svg");

    let url = "";

    if (renderMode === "canvas" && canvas) {
      if (type === "svg") {
        alert("Cannot download SVG from Canvas mode");
        return;
      }
      url = canvas.toDataURL(`image/${type}`);
    } else if (renderMode === "svg" && svg) {
      if (type !== "svg") {
        // Convert SVG to Canvas for PNG/JPEG export
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const svgBlob = new Blob([source], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = svg.clientWidth;
          canvas.height = svg.clientHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = theme === "dark" ? "#100c2a" : "#fff"; // Add background
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const a = document.createElement("a");
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
          type: "image/svg+xml;charset=utf-8",
        });
        url = URL.createObjectURL(blob);
      }
    }

    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `chart.${type}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (type === "svg") URL.revokeObjectURL(url);
    }
  };

  const runCode = useCallback(() => {
    try {
      // Safe-ish eval: we wrap in a function and expect 'option' to be assigned
      // eslint-disable-next-line no-new-func
      const func = new Function(`
        let option;
        ${code}
        return option;
      `);
      const result = func();
      if (result) {
        setOption(result);
        setError(null);
      } else {
        setError(
          'Code did not return an "option" object or assign to "option".',
        );
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }, [code]);

  // Run once on mount
  useEffect(() => {
    runCode();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const bgColor = theme === "dark" ? "#100c2a" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#333";
  const borderColor = theme === "dark" ? "#333" : "#e0e0e0";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 50,
          borderBottom: `1px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={onBack}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: 16,
              color: textColor,
            }}
          >
            ← Back
          </button>
          <span style={{ fontWeight: "bold" }}>{title || "Chart Example"}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div
            style={{
              display: "flex",
              border: `1px solid ${borderColor}`,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => onThemeChange("light")}
              style={{
                padding: "4px 12px",
                background: theme === "light" ? "#4096ff" : "transparent",
                color: theme === "light" ? "#fff" : textColor,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Light
            </button>
            <button
              onClick={() => onThemeChange("dark")}
              style={{
                padding: "4px 12px",
                background: theme === "dark" ? "#4096ff" : "transparent",
                color: theme === "dark" ? "#fff" : textColor,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Dark
            </button>
          </div>
          <div
            style={{
              display: "flex",
              border: `1px solid ${borderColor}`,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setRenderMode("svg")}
              style={{
                padding: "4px 12px",
                background: renderMode === "svg" ? "#4096ff" : "transparent",
                color: renderMode === "svg" ? "#fff" : textColor,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              SVG
            </button>
            <button
              onClick={() => setRenderMode("canvas")}
              style={{
                padding: "4px 12px",
                background: renderMode === "canvas" ? "#4096ff" : "transparent",
                color: renderMode === "canvas" ? "#fff" : textColor,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              CANVAS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Pane: Editor */}
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            borderRight: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              height: 40,
              borderBottom: `1px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              backgroundColor: theme === "dark" ? "#252526" : "#f0f0f0",
            }}
          >
            <button
              style={{
                padding: "0 15px",
                height: "100%",
                background:
                  activeTab === "JS"
                    ? theme === "dark"
                      ? "#1e1e1e"
                      : "#fff"
                    : "transparent",
                border: "none",
                color: textColor,
                cursor: "pointer",
                fontWeight: activeTab === "JS" ? "bold" : "normal",
              }}
              onClick={() => setActiveTab("JS")}
            >
              JS
            </button>
            <button
              style={{
                padding: "0 15px",
                height: "100%",
                background:
                  activeTab === "TS"
                    ? theme === "dark"
                      ? "#1e1e1e"
                      : "#fff"
                    : "transparent",
                border: "none",
                color: textColor,
                cursor: "pointer",
                fontWeight: activeTab === "TS" ? "bold" : "normal",
              }}
              onClick={() => setActiveTab("TS")}
            >
              TS
            </button>
            <div style={{ flex: 1 }} />
            <button
              onClick={runCode}
              style={{
                padding: "4px 15px",
                background: "#4096ff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
                opacity: activeTab === "TS" ? 0.5 : 1,
                pointerEvents: activeTab === "TS" ? "none" : "auto",
              }}
            >
              Run
            </button>
            <button
              onClick={() => {
                setCode(initialCode);
                setOption({});
                setTimeout(() => runCode(), 0);
              }}
              style={{
                marginLeft: 10,
                padding: "4px 15px",
                background: "transparent",
                border: `1px solid ${borderColor}`,
                color: textColor,
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
                opacity: activeTab === "TS" ? 0.5 : 1,
                pointerEvents: activeTab === "TS" ? "none" : "auto",
              }}
            >
              Reset
            </button>
          </div>
          <CodeEditor
            code={activeTab === "TS" ? getTsCode(code) : code}
            onChange={activeTab === "TS" ? () => {} : setCode}
            theme={theme === "dark" ? "dark" : "light"}
          />
          {error && (
            <div
              style={{
                padding: 10,
                color: "red",
                fontSize: 12,
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Right Pane: Preview */}
        <div
          style={{
            flex: 1,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme === "dark" ? "#100c2a" : "#fff",
          }}
        >
          <div
            ref={chartContainerRef}
            style={{
              flex: 1,
              minHeight: 0,
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <HChart
              option={option}
              theme={theme}
              renderMode={renderMode}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 10,
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                padding: "5px 10px",
                background: "none",
                border: `1px solid ${borderColor}`,
                borderRadius: 4,
                color: textColor,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Download Code
            </button>
            <div
              style={{
                display: "flex",
                border: `1px solid ${borderColor}`,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => handleScreenshot("png")}
                style={{
                  padding: "5px 10px",
                  background: "none",
                  borderRight: `1px solid ${borderColor}`,
                  borderTop: "none",
                  borderBottom: "none",
                  borderLeft: "none",
                  color: textColor,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                PNG
              </button>
              <button
                onClick={() => handleScreenshot("jpeg")}
                style={{
                  padding: "5px 10px",
                  background: "none",
                  borderRight: `1px solid ${borderColor}`,
                  borderTop: "none",
                  borderBottom: "none",
                  borderLeft: "none",
                  color: textColor,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                JPG
              </button>
              <button
                onClick={() => handleScreenshot("svg")}
                style={{
                  padding: "5px 10px",
                  background: "none",
                  border: "none",
                  color: textColor,
                  fontSize: 12,
                  cursor: "pointer",
                  opacity: renderMode === "canvas" ? 0.5 : 1,
                  pointerEvents: renderMode === "canvas" ? "none" : "auto",
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
