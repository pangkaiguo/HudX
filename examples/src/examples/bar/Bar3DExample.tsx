import React, { useRef, useState, useMemo } from "react";
import { HChart } from "hux-charts";
import type { ChartOption, HChartRef } from "hux-charts";
import { ThemeManager, Theme } from "hux-core";
import type { RenderMode } from "hux-core";

export const Bar3DExample = ({ theme = "light" }: { theme?: Theme }) => {
  const chartRef = useRef<HChartRef>(null);
  const themeObj = ThemeManager.getTheme(theme);

  const [isDecal, setIsDecal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridTop, setGridTop] = useState(40);
  const [splitNumber, setSplitNumber] = useState(5);
  const [renderMode, setRenderMode] = useState<RenderMode>("canvas");

  const option = useMemo<ChartOption>(
    () => ({
      tooltip: {
        show: true,
        trigger: "item",
        // formatter: '{b}\n{c}'
      },
      legend: {
        show: true,
        orient: "vertical",
        left: "right",
        top: 20,
        icon: "rect",
      },
      grid: {
        left: 60,
        right: 60,
        top: gridTop,
        bottom: 60,
      },
      aria: {
        enabled: true,
        decal: {
          show: isDecal,
          decals: [
            { symbol: "diagonal", color: themeObj.decalColor },
            { symbol: "dots", color: themeObj.decalColor },
            { symbol: "diagonal-reverse", color: themeObj.decalColor },
            { symbol: "checkerboard", color: themeObj.decalColor },
            { symbol: "crosshatch", color: themeObj.decalColor },
          ],
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        show: true,
        splitLine: {
          show: showGrid,
          lineStyle: {
            color: "#eee",
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        show: true,
        splitNumber: splitNumber,
        splitLine: {
          show: showGrid,
          lineStyle: {
            color: "#eee",
          },
        },
      },
      series: [
        {
          name: "Sales",
          type: "bar3D",
          data: [120, 200, 150, 80, 70, 110, 130],
          itemStyle: { color: "#5470c6", borderWidth: 0 },
        },
        {
          name: "Profits",
          type: "bar3D",
          data: [60, 100, 75, 40, 35, 55, 65],
          itemStyle: { color: "#91cc75", borderWidth: 0 },
        },
      ],
      animation: true,
    }),
    [isDecal, showGrid, gridTop, splitNumber, themeObj],
  );

  const handleUpdateSeries = () => {
    const chartInstance = chartRef.current?.getChartInstance();
    if (chartInstance) {
      // Simulate new data
      const newData1 = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      const newData2 = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 200) + 50,
      );
      chartInstance.setOption({
        series: [{ data: newData1 }, { data: newData2 }],
      });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>3D Bar Chart</h2>
      <p style={{ marginBottom: 20, color: "#666", fontSize: 14 }}>
        Pseudo-3D effect using 2.5D projection
      </p>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
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

        <label
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <input
            type="checkbox"
            checked={isDecal}
            onChange={(e) => setIsDecal(e.target.checked)}
          />
          Decal Patterns
        </label>

        <label
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          Show Grid
        </label>

        {showGrid && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>Grid Top: {gridTop}</span>
              <input
                type="range"
                min="20"
                max="100"
                value={gridTop}
                onChange={(e) => setGridTop(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>Y Split: {splitNumber}</span>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={splitNumber}
                onChange={(e) => setSplitNumber(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
          </>
        )}
      </div>

      <HChart
        ref={chartRef}
        option={option}
        theme={theme}
        renderMode={renderMode}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          height: "600px",
        }}
      />

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleUpdateSeries}
          style={{
            padding: "8px 16px",
            backgroundColor: "#5470c6",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Update Data (via getChartInstance)
        </button>
      </div>
    </div>
  );
};

export default Bar3DExample;
