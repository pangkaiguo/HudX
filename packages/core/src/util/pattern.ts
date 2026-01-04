
import type { DecalObject } from '../types';

export function createDecalPattern(
  decal: DecalObject,
  baseColor: string
): CanvasPattern | null {
  const canvas = document.createElement('canvas');
  const size = 20; // Default tile size
  const w = decal.maxTileWidth || size;
  const h = decal.maxTileHeight || size;
  canvas.width = w;
  canvas.height = h;

  const pCtx = canvas.getContext('2d');
  if (!pCtx) return null;

  // Draw background
  if (decal.backgroundColor) {
    pCtx.fillStyle = decal.backgroundColor;
    pCtx.fillRect(0, 0, w, h);
  } else if (baseColor) {
    pCtx.fillStyle = baseColor;
    pCtx.fillRect(0, 0, w, h);
  }

  // Draw symbol
  pCtx.fillStyle = decal.color || 'rgba(0, 0, 0, 0.2)';

  const symbol = decal.symbol || 'circle';
  const symbolSize = (decal.symbolSize || 0.8) * Math.min(w, h);

  pCtx.save();
  pCtx.translate(w / 2, h / 2);
  if (decal.rotation) {
    pCtx.rotate(decal.rotation);
  }

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
    case 'circle':
    default:
      pCtx.beginPath();
      pCtx.arc(0, 0, symbolSize / 2, 0, Math.PI * 2);
      pCtx.fill();
      break;
  }

  pCtx.restore();

  const pattern = pCtx.createPattern(canvas, 'repeat');
  if (pattern) {
    // Attach source canvas for SVG renderer
    (pattern as any)._canvas = canvas;
  }

  return pattern;
}
