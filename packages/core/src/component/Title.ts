/**
 * Title - Chart title component
 */

import Group from "../Group";
import Text from "../shape/Text";
import Rect from "../shape/Rect";
import { Z_TITLE } from "../constants";
import type { TitleOption } from "../types";

export default class Title extends Group {
  private _option: TitleOption;
  private _containerWidth: number = 0;
  private _containerHeight: number = 0;

  constructor(option: TitleOption = {}) {
    super();
    this._option = {
      show: true,
      text: "",
      subtext: "",
      left: "auto",
      top: "auto",
      right: "auto",
      bottom: "auto",
      backgroundColor: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "sans-serif",
      },
      subtextStyle: {
        fontSize: 12,
        fontWeight: "normal",
        color: "#aaa",
        fontFamily: "sans-serif",
      },
      ...option,
    };
    this.z = Z_TITLE;
  }

  setContainer(width: number, height: number): void {
    this._containerWidth = width;
    this._containerHeight = height;
    this._render();
  }

  updateOption(option: TitleOption): void {
    this._option = { ...this._option, ...option };
    this._render();
  }

  private _render(): void {
    this.removeAll();

    if (this._option.show === false) {
      return;
    }

    // 1. Measure texts
    const textStyle = this._option.textStyle || {};
    const subtextStyle = this._option.subtextStyle || {};
    const itemGap = this._option.itemGap || 10;
    const padding = this._parsePadding(this._option.padding || 5);

    let mainTextEl: Text | null = null;
    let subTextEl: Text | null = null;
    let mainWidth = 0;
    let mainHeight = 0;
    let subWidth = 0;
    let subHeight = 0;

    if (this._option.text) {
      mainTextEl = new Text({
        shape: {
          x: 0,
          y: 0,
          text: this._option.text,
        },
        style: {
          ...textStyle,
          textBaseline: "top",
          textAlign: "left", // Temporarily left, we adjust later
        },
      });
      const rect = mainTextEl.getBoundingRect();
      mainWidth = rect.width;
      mainHeight = rect.height;
    }

    if (this._option.subtext) {
      subTextEl = new Text({
        shape: {
          x: 0,
          y: 0, // Temporarily
          text: this._option.subtext,
        },
        style: {
          ...subtextStyle,
          textBaseline: "top",
          textAlign: "left",
        },
      });
      const rect = subTextEl.getBoundingRect();
      subWidth = rect.width;
      subHeight = rect.height;
    }

    // 2. Calculate group size
    const contentWidth = Math.max(mainWidth, subWidth);
    let contentHeight = mainHeight;
    if (mainTextEl && subTextEl) {
      contentHeight += itemGap + subHeight;
    } else if (subTextEl) {
      contentHeight = subHeight;
    }

    const totalWidth = contentWidth + padding[1] + padding[3];
    const totalHeight = contentHeight + padding[0] + padding[2];

    // 3. Determine Position
    const x = this._calculateX(totalWidth);
    const y = this._calculateY(totalHeight);

    // 4. Render Background
    if (
      this._option.backgroundColor ||
      (this._option.borderWidth && this._option.borderColor)
    ) {
      const rect = new Rect({
        shape: {
          x: x,
          y: y,
          width: totalWidth,
          height: totalHeight,
          r: this._option.borderRadius || 0,
        },
        style: {
          fill: this._option.backgroundColor || "transparent",
          stroke: this._option.borderColor || "transparent",
          lineWidth: this._option.borderWidth || 0,
        },
      });
      this.add(rect);
    }

    // 5. Render Texts
    const contentX = x + padding[3];
    const contentY = y + padding[0];

    // Determine horizontal alignment of text within the box
    // If textAlign is specified in option, use it. Otherwise 'left'.
    // ECharts title.textAlign is global alignment (left/center/right relative to container).
    // But textVerticalAlign is also there.
    // Usually title texts are left aligned relative to each other if not specified.
    // Let's align them left relative to content box for now.
    // To support center alignment of subtext relative to text:
    // We center them in contentWidth.

    if (mainTextEl) {
      const tx = contentX + (contentWidth - mainWidth) / 2; // Center in content box? No, default left?
      // ECharts defaults: left aligned to each other.
      // But let's assume left for simplicity unless we add textAlign option for internal alignment.
      // Actually standard ECharts behavior: if title is centered, text and subtext are centered.

      // Let's infer alignment from 'left' option.
      let align = "left";
      if (this._option.left === "center" || this._option.textAlign === "center")
        align = "center";
      else if (
        this._option.left === "right" ||
        this._option.textAlign === "right"
      )
        align = "right";

      // Re-adjust x based on alignment
      let mx = contentX;
      if (align === "center") mx = contentX + (contentWidth - mainWidth) / 2;
      else if (align === "right") mx = contentX + (contentWidth - mainWidth);

      mainTextEl.shape.x = mx;
      mainTextEl.shape.y = contentY;
      this.add(mainTextEl);
    }

    if (subTextEl) {
      let align = "left";
      if (this._option.left === "center" || this._option.textAlign === "center")
        align = "center";
      else if (
        this._option.left === "right" ||
        this._option.textAlign === "right"
      )
        align = "right";

      let sx = contentX;
      if (align === "center") sx = contentX + (contentWidth - subWidth) / 2;
      else if (align === "right") sx = contentX + (contentWidth - subWidth);

      subTextEl.shape.x = sx;
      subTextEl.shape.y = contentY + (mainTextEl ? mainHeight + itemGap : 0);
      this.add(subTextEl);
    }
  }

  private _calculateX(width: number): number {
    const left = this._option.left;
    const right = this._option.right;

    if (left === "center") {
      return (this._containerWidth - width) / 2;
    }
    if (left === "right") {
      return this._containerWidth - width - (this._parseSize(right) || 0);
    }
    if (right !== undefined && right !== "auto") {
      return this._containerWidth - width - this._parseSize(right);
    }
    return this._parseSize(left) || 0;
  }

  private _calculateY(height: number): number {
    const top = this._option.top;
    const bottom = this._option.bottom;

    if (top === "middle" || top === "center") {
      return (this._containerHeight - height) / 2;
    }
    if (top === "bottom") {
      return this._containerHeight - height - (this._parseSize(bottom) || 0);
    }
    if (bottom !== undefined && bottom !== "auto") {
      return this._containerHeight - height - this._parseSize(bottom);
    }
    return this._parseSize(top) || 0;
  }

  private _parseSize(val: any, defaultVal: number = 0): number {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      if (val.endsWith("%")) {
        return (
          (parseFloat(val) / 100) *
          (val.includes("top") || val.includes("bottom")
            ? this._containerHeight
            : this._containerWidth)
        );
      }
      return parseFloat(val) || defaultVal;
    }
    return defaultVal;
  }

  private _parsePadding(padding: number | number[]): number[] {
    if (typeof padding === "number") {
      return [padding, padding, padding, padding];
    }
    if (Array.isArray(padding)) {
      if (padding.length === 1)
        return [padding[0], padding[0], padding[0], padding[0]];
      if (padding.length === 2)
        return [padding[0], padding[1], padding[0], padding[1]];
      if (padding.length === 4) return padding;
    }
    return [0, 0, 0, 0];
  }
}
