import type { DecalObject } from '../types';

const DECAL_PRESETS: Record<string, Partial<DecalObject>> = {
  diagonal: {
    symbol: 'line',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: Math.PI / 4,
    symbolSize: 0.9,
  },
  'diagonal-reverse': {
    symbol: 'line',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: -Math.PI / 4,
    symbolSize: 0.9,
  },
  grid: {
    symbol: 'cross',
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    symbolSize: 0.85,
  },
  crosshatch: {
    symbol: 'cross',
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: Math.PI / 4,
    symbolSize: 0.85,
  },
  checkerboard: {
    symbol: 'rect',
    dashArrayX: 4,
    dashArrayY: 4,
    rotation: 0,
    symbolSize: 1,
  },
  dots: {
    symbol: 'circle',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.6,
  },
  rect: {
    symbol: 'rect',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.65,
  },
  square: {
    symbol: 'rect',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.65,
  },
  roundRect: {
    symbol: 'roundRect',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.65,
  },
  circle: {
    symbol: 'circle',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.6,
  },
  triangle: {
    symbol: 'triangle',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.65,
  },
  diamond: {
    symbol: 'diamond',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.65,
  },
  pin: {
    symbol: 'pin',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.6,
  },
  pentagon: {
    symbol: 'pentagon',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.65,
  },
  arrow: {
    symbol: 'arrow',
    dashArrayX: 6,
    dashArrayY: 6,
    rotation: 0,
    symbolSize: 0.7,
  },
};

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function parseColor(input: string): { r: number; g: number; b: number; a: number } | null {
  const str = input.trim();
  if (!str) return null;

  const rgbaMatch = str.match(
    /^rgba\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/i,
  );
  if (rgbaMatch) {
    return {
      r: Number(rgbaMatch[1]),
      g: Number(rgbaMatch[2]),
      b: Number(rgbaMatch[3]),
      a: clamp01(Number(rgbaMatch[4])),
    };
  }

  const rgbMatch = str.match(
    /^rgb\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/i,
  );
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
      a: 1,
    };
  }

  const hexMatch = str.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1].toLowerCase();
    const expand = (c: string) => c + c;
    const hasAlpha = hex.length === 8 || hex.length === 4;

    const r = parseInt(hex.length <= 4 ? expand(hex[0]) : hex.slice(0, 2), 16);
    const g = parseInt(hex.length <= 4 ? expand(hex[1]) : hex.slice(2, 4), 16);
    const b = parseInt(hex.length <= 4 ? expand(hex[2]) : hex.slice(4, 6), 16);
    const a = hasAlpha
      ? parseInt(hex.length <= 4 ? expand(hex[3]) : hex.slice(6, 8), 16) / 255
      : 1;

    return { r, g, b, a: clamp01(a) };
  }

  return null;
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function autoForegroundColor(baseColor: string): string {
  const parsed = parseColor(baseColor);
  const lum = parsed ? relativeLuminance(parsed) : 0.5;
  const a = 0.35;
  if (lum < 0.35) {
    return `rgba(255, 255, 255, ${a})`;
  }
  return `rgba(0, 0, 0, ${a})`;
}

function normalizeDash(dash: number[] | number | undefined): number[] {
  if (dash === undefined) return [5, 5];
  if (typeof dash === 'number') return dash > 0 ? [dash, dash] : [5, 5];
  const v = dash.filter((x) => typeof x === 'number' && isFinite(x) && x > 0);
  return v.length ? v : [5, 5];
}

function sumDash(dash: number[]): number {
  return dash.reduce((a, b) => a + b, 0);
}

function getOnSegmentCenters(dash: number[]): number[] {
  const centers: number[] = [];
  let pos = 0;
  for (let i = 0; i < dash.length; i++) {
    const len = Math.max(1, dash[i]);
    if (i % 2 === 0) {
      centers.push(pos + len / 2);
    }
    pos += len;
  }
  return centers;
}

function getUnitSize(dashX: number[], dashY: number[]): number {
  const onX = dashX.filter((_, i) => i % 2 === 0).map((v) => Math.max(1, v));
  const onY = dashY.filter((_, i) => i % 2 === 0).map((v) => Math.max(1, v));
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length);
  return Math.max(1, Math.min(avg(onX), avg(onY)));
}

export function createDecalPattern(
  decalObject: DecalObject,
  baseColor: string,
): CanvasPattern | null {
  // Apply preset if symbol matches a preset name
  const preset =
    typeof decalObject.symbol === 'string' && DECAL_PRESETS[decalObject.symbol];
  const decal = preset
    ? { ...preset, ...decalObject, symbol: preset.symbol }
    : decalObject;

  const symbol = decal.symbol || 'circle';
  if (symbol === 'none') {
    return null;
  }

  const canvas = document.createElement('canvas');
  let dashX = normalizeDash(decal.dashArrayX).map((v) => Math.max(1, v));
  let dashY = normalizeDash(decal.dashArrayY).map((v) => Math.max(1, v));

  let totalW = Math.max(1, sumDash(dashX));
  let totalH = Math.max(1, sumDash(dashY));

  if (decal.maxTileWidth && totalW > decal.maxTileWidth) {
    const k = decal.maxTileWidth / totalW;
    dashX = dashX.map((v) => v * k);
    totalW = decal.maxTileWidth;
  }
  if (decal.maxTileHeight && totalH > decal.maxTileHeight) {
    const k = decal.maxTileHeight / totalH;
    dashY = dashY.map((v) => v * k);
    totalH = decal.maxTileHeight;
  }

  const dpr =
    typeof window !== 'undefined' && window.devicePixelRatio
      ? window.devicePixelRatio
      : 1;
  canvas.width = Math.max(1, Math.round(totalW * dpr));
  canvas.height = Math.max(1, Math.round(totalH * dpr));

  const pCtx = canvas.getContext('2d');
  if (!pCtx) return null;
  if (dpr !== 1) {
    pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Draw background
  if (decal.backgroundColor) {
    pCtx.fillStyle = decal.backgroundColor;
    pCtx.fillRect(0, 0, totalW, totalH);
  } else if (baseColor) {
    pCtx.fillStyle = baseColor;
    pCtx.fillRect(0, 0, totalW, totalH);
  }

  // Draw symbol
  const fgColor = decal.color || autoForegroundColor(baseColor);
  pCtx.fillStyle = fgColor;
  pCtx.strokeStyle = fgColor;
  pCtx.lineCap = 'square';
  pCtx.lineJoin = 'miter';

  const unitSize = getUnitSize(dashX, dashY);
  const symbolSize = clamp01(decal.symbolSize ?? 1) * unitSize;
  const lineWidth =
    symbol === 'line' || symbol === 'cross'
      ? Math.max(1, Math.round(Math.min(unitSize, symbolSize) * 0.28))
      : 1;
  pCtx.lineWidth = lineWidth;

  const centersX = getOnSegmentCenters(dashX);
  const centersY = getOnSegmentCenters(dashY);

  for (const cx of centersX) {
    for (const cy of centersY) {
      pCtx.save();
      pCtx.translate(cx, cy);

      switch (symbol) {
        case 'rect':
        case 'square':
          pCtx.fillRect(
            -symbolSize / 2,
            -symbolSize / 2,
            symbolSize,
            symbolSize,
          );
          break;
        case 'roundRect': {
          const r = Math.min(2, symbolSize / 4);
          const x = -symbolSize / 2;
          const y = -symbolSize / 2;
          const w = symbolSize;
          const h = symbolSize;
          pCtx.beginPath();
          pCtx.moveTo(x + r, y);
          pCtx.arcTo(x + w, y, x + w, y + h, r);
          pCtx.arcTo(x + w, y + h, x, y + h, r);
          pCtx.arcTo(x, y + h, x, y, r);
          pCtx.arcTo(x, y, x + w, y, r);
          pCtx.closePath();
          pCtx.fill();
          break;
        }
        case 'triangle':
          pCtx.beginPath();
          pCtx.moveTo(0, -symbolSize / 2);
          pCtx.lineTo(symbolSize / 2, symbolSize / 2);
          pCtx.lineTo(-symbolSize / 2, symbolSize / 2);
          pCtx.closePath();
          pCtx.fill();
          break;
        case 'diamond':
          pCtx.beginPath();
          pCtx.moveTo(0, -symbolSize / 2);
          pCtx.lineTo(symbolSize / 2, 0);
          pCtx.lineTo(0, symbolSize / 2);
          pCtx.lineTo(-symbolSize / 2, 0);
          pCtx.closePath();
          pCtx.fill();
          break;
        case 'pentagon': {
          const r = symbolSize / 2;
          pCtx.beginPath();
          for (let k = 0; k < 5; k++) {
            const ang = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
            const px = r * Math.cos(ang);
            const py = r * Math.sin(ang);
            if (k === 0) pCtx.moveTo(px, py);
            else pCtx.lineTo(px, py);
          }
          pCtx.closePath();
          pCtx.fill();
          break;
        }
        case 'arrow':
          pCtx.beginPath();
          pCtx.moveTo(0, -symbolSize / 2);
          pCtx.lineTo(symbolSize / 2, symbolSize / 2);
          pCtx.lineTo(0, symbolSize * 0.18);
          pCtx.lineTo(-symbolSize / 2, symbolSize / 2);
          pCtx.closePath();
          pCtx.fill();
          break;
        case 'pin':
          pCtx.beginPath();
          pCtx.arc(0, 0, symbolSize / 2, 0, Math.PI * 2);
          pCtx.fill();
          break;
        case 'line':
          pCtx.beginPath();
          pCtx.moveTo(-unitSize / 2, 0);
          pCtx.lineTo(unitSize / 2, 0);
          pCtx.stroke();
          break;
        case 'cross':
          pCtx.beginPath();
          pCtx.moveTo(-unitSize / 2, 0);
          pCtx.lineTo(unitSize / 2, 0);
          pCtx.moveTo(0, -unitSize / 2);
          pCtx.lineTo(0, unitSize / 2);
          pCtx.stroke();
          break;
        case 'circle':
        default:
          pCtx.beginPath();
          pCtx.arc(0, 0, symbolSize / 2, 0, Math.PI * 2);
          pCtx.fill();
          break;
      }

      pCtx.restore();
    }
  }

  const pattern = pCtx.createPattern(canvas, 'repeat');
  if (pattern) {
    (pattern as any)._canvas = canvas;
    // Store rotation for SVG painter or other renderers
    (pattern as any)._rotation = decal.rotation || 0;
    (pattern as any)._dpr = dpr;
    (pattern as any)._tileWidth = totalW;
    (pattern as any)._tileHeight = totalH;
    (pattern as any)._decalMeta = {
      baseColor,
      fgColor,
      symbol,
      unitSize,
      symbolSize,
      lineWidth,
      dashX,
      dashY,
      centersX,
      centersY,
      tileWidth: totalW,
      tileHeight: totalH,
      rotation: decal.rotation || 0,
    };

    if ((decal.rotation || dpr !== 1) && typeof DOMMatrix !== 'undefined') {
      const matrix = new DOMMatrix();
      if (dpr !== 1) {
        matrix.scaleSelf(1 / dpr, 1 / dpr);
      }
      if (decal.rotation) {
        matrix.rotateSelf((decal.rotation * 180) / Math.PI);
      }
      pattern.setTransform(matrix);
    }
  }

  return pattern;
}
