
import type { DecalObject } from '../types';

const DECAL_PRESETS: Record<string, Partial<DecalObject>> = {
  'diagonal': { symbol: 'line', dashArrayX: [1, 0], dashArrayY: [1, 1], rotation: Math.PI / 4, symbolSize: 1 },
  'diagonal-reverse': { symbol: 'line', dashArrayX: [1, 0], dashArrayY: [1, 1], rotation: -Math.PI / 4, symbolSize: 1 },
  'grid': { symbol: 'cross', dashArrayX: [1, 0], dashArrayY: [1, 0], rotation: 0, symbolSize: 1 },
  'crosshatch': { symbol: 'cross', dashArrayX: [1, 0], dashArrayY: [1, 0], rotation: Math.PI / 4, symbolSize: 1 },
  'checkerboard': { symbol: 'rect', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 1 },
  'dots': { symbol: 'circle', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
  'rect': { symbol: 'rect', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
  'circle': { symbol: 'circle', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
  'triangle': { symbol: 'triangle', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
  'diamond': { symbol: 'diamond', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
  'pin': { symbol: 'pin', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
  'arrow': { symbol: 'arrow', dashArrayX: [1, 1], dashArrayY: [1, 1], rotation: 0, symbolSize: 0.8 },
};

export function createDecalPattern(
  decalObject: DecalObject,
  baseColor: string
): CanvasPattern | null {
  // Apply preset if symbol matches a preset name
  const preset = decalObject.symbol && DECAL_PRESETS[decalObject.symbol];
  const decal = preset ? { ...preset, ...decalObject, symbol: preset.symbol } : decalObject;

  const canvas = document.createElement('canvas');
  const size = 6; // Default tile size (reduced for better density)
  const w = size;
  const h = size;

  // Normalize dash arrays
  const normalizeDash = (dash: number[] | number | undefined): number[] => {
    if (dash === undefined) return [1];
    if (typeof dash === 'number') return [dash];
    return dash.length ? dash : [1];
  };

  const dashX = normalizeDash(decal.dashArrayX);
  const dashY = normalizeDash(decal.dashArrayY);

  const sumDash = (dash: number[]) => dash.reduce((a, b) => a + b, 0);
  let totalW = Math.max(1, sumDash(dashX)) * w;
  let totalH = Math.max(1, sumDash(dashY)) * h;

  if (decal.maxTileWidth && totalW > decal.maxTileWidth) {
    totalW = decal.maxTileWidth;
  }
  if (decal.maxTileHeight && totalH > decal.maxTileHeight) {
    totalH = decal.maxTileHeight;
  }

  canvas.width = totalW;
  canvas.height = totalH;

  const pCtx = canvas.getContext('2d');
  if (!pCtx) return null;

  // Draw background
  if (decal.backgroundColor) {
    pCtx.fillStyle = decal.backgroundColor;
    pCtx.fillRect(0, 0, totalW, totalH);
  } else if (baseColor) {
    pCtx.fillStyle = baseColor;
    pCtx.fillRect(0, 0, totalW, totalH);
  }

  // Draw symbol
  pCtx.fillStyle = decal.color || 'rgba(0, 0, 0, 0.2)';
  pCtx.strokeStyle = decal.color || 'rgba(0, 0, 0, 0.2)';
  pCtx.lineWidth = 1;

  const symbol = decal.symbol || 'circle';
  const symbolSize = (decal.symbolSize || 1) * Math.min(w, h);

  const shouldDraw = (dash: number[], index: number) => {
    let current = 0;
    for (let i = 0; i < dash.length; i++) {
      current += dash[i];
      if (index < current) {
        return i % 2 === 0;
      }
    }
    return false;
  };

  for (let i = 0; i < sumDash(dashX); i++) {
    for (let j = 0; j < sumDash(dashY); j++) {
      if (shouldDraw(dashX, i) && shouldDraw(dashY, j)) {
        pCtx.save();
        pCtx.translate(i * w + w / 2, j * h + h / 2);

        switch (symbol) {
          case 'rect':
            pCtx.fillRect(-symbolSize / 2, -symbolSize / 2, symbolSize, symbolSize);
            break;
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
          case 'arrow':
            pCtx.beginPath();
            pCtx.moveTo(0, -symbolSize / 2);
            pCtx.lineTo(symbolSize / 2, symbolSize / 2);
            pCtx.lineTo(0, symbolSize / 4);
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
            pCtx.moveTo(-symbolSize / 2, 0);
            pCtx.lineTo(symbolSize / 2, 0);
            pCtx.stroke();
            break;
          case 'cross':
            pCtx.beginPath();
            pCtx.moveTo(-symbolSize / 2, 0);
            pCtx.lineTo(symbolSize / 2, 0);
            pCtx.moveTo(0, -symbolSize / 2);
            pCtx.lineTo(0, symbolSize / 2);
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
  }

  const pattern = pCtx.createPattern(canvas, 'repeat');
  if (pattern) {
    (pattern as any)._canvas = canvas;

    if (decal.rotation && typeof DOMMatrix !== 'undefined') {
      const matrix = new DOMMatrix().rotateSelf(decal.rotation * 180 / Math.PI);
      pattern.setTransform(matrix);
    }
  }

  return pattern;
}
