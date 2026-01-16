import React, { useEffect, useRef, useState } from "react";
import {
  Renderer,
  Circle,
  Rect,
  Line,
  Polyline,
  Polygon,
  Text,
  ThemeManager,
  Theme,
} from "hux-core";
import type { RenderMode } from "hux-core";

export const ShapeExample = ({ theme = "light" }: { theme?: Theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>("canvas");

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = Renderer.init(
      containerRef.current,
      renderMode,
      theme,
      "en",
    );
    const themeObj = ThemeManager.getTheme(theme);
    const normalizedTheme = (theme || "light").toLowerCase();
    const textColor = normalizedTheme === "dark" ? "#eee" : "#333";

    renderer.add(
      new Circle({
        shape: { cx: 100, cy: 100, r: 40 },
        style: {
          fill: themeObj.seriesColors?.[0],
          stroke: textColor === "#eee" ? "#333" : "#fff",
          lineWidth: 2,
        },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: "Circle", x: 100, y: 160 },
        style: { textAlign: "center", fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Rect({
        shape: { x: 200, y: 60, width: 80, height: 80 },
        style: { fill: themeObj.seriesColors?.[1] },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: "Rect", x: 240, y: 160 },
        style: { textAlign: "center", fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Line({
        shape: { x1: 320, y1: 60, x2: 400, y2: 140 },
        style: { stroke: themeObj.seriesColors?.[2], lineWidth: 3 },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: "Line", x: 360, y: 160 },
        style: { textAlign: "center", fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Polyline({
        shape: {
          points: [
            [440, 100],
            [480, 60],
            [520, 100],
            [560, 80],
          ],
        },
        style: { stroke: themeObj.seriesColors?.[3], lineWidth: 2 },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: "Polyline", x: 500, y: 160 },
        style: { textAlign: "center", fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Polygon({
        shape: {
          points: [
            [640, 60],
            [680, 100],
            [660, 140],
            [620, 140],
            [600, 100],
          ],
        },
        style: { fill: themeObj.seriesColors?.[4] },
      }),
    );
    renderer.add(
      new Text({
        shape: { text: "Polygon", x: 640, y: 160 },
        style: { textAlign: "center", fill: textColor, fontSize: 12 },
      }),
    );

    renderer.add(
      new Text({
        shape: { text: "Core API Shapes", x: 400, y: 30 },
        style: {
          textAlign: "center",
          fill: textColor,
          fontSize: 16,
          fontWeight: "bold",
        },
      }),
    );

    renderer.resize(800, 200);
    renderer.flush();

    return () => renderer.dispose();
  }, [renderMode, theme]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Core API Demo</h2>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Render Mode:</span>
          <select
            value={renderMode}
            onChange={(e) => setRenderMode(e.target.value as RenderMode)}
            style={{
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid #ddd",
            }}
          >
            <option value="canvas">Canvas</option>
            <option value="svg">SVG</option>
          </select>
        </label>
      </div>
      <p style={{ marginBottom: 20, color: "#666" }}>
        Demonstrates basic shapes from hux-core
      </p>
      <div
        ref={containerRef}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          width: 800,
          height: 200,
        }}
      />
    </div>
  );
};

export default ShapeExample;
